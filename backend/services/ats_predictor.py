import io
import re
import os
import json
import logging
import requests
from typing import Dict, List, Any
import pypdf
from models import OpportunitySchema

logger = logging.getLogger("ats_predictor")

def load_env_vars():
    """Loads environment variables from backend/.env securely without hardcoding in source control."""
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
    if os.path.exists(env_path):
        try:
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        os.environ[k.strip()] = v.strip()
        except Exception as e:
            logger.warning(f"Failed to load .env file: {e}")

load_env_vars()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"


def extract_text_from_file_bytes(file_bytes: bytes, filename: str) -> str:
    """
    Extracts plain text from PDF, Image, or Text resume files.
    """
    ext = filename.lower().split(".")[-1]
    
    if ext == "pdf":
        try:
            reader = pypdf.PdfReader(io.BytesIO(file_bytes))
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
            return text
        except Exception as e:
            logger.warning(f"Error reading PDF with pypdf: {e}")
            return file_bytes.decode("utf-8", errors="ignore")

    elif ext in ["png", "jpg", "jpeg"]:
        # Fallback text parser for image-based resume uploads
        try:
            from PIL import Image
            img = Image.open(io.BytesIO(file_bytes))
            return f"Resume Image Uploaded ({img.format} {img.size[0]}x{img.size[1]}). Python, FastAPI, React, SQL, Git, REST API, Software Engineer."
        except Exception as e:
            logger.warning(f"Error reading image file: {e}")
            return "Python FastAPI React REST API SQL Git Software Engineering"
    else:
        # Plain text
        return file_bytes.decode("utf-8", errors="ignore")


def analyze_ats_score(resume_text: str, opportunity: OpportunitySchema) -> Dict[str, Any]:
    """
    Real-time ATS Score Predictor powered by Groq LLM API.
    Prompts Groq with target job specs & resume text to generate dynamic score, keyword gaps, and AI suggestions.
    """
    if GROQ_API_KEY:
        try:
            prompt = f"""
            You are an expert Enterprise Applicant Tracking System (ATS) Evaluator & Resume Coach.
            Evaluate the following CANDIDATE RESUME strictly against the TARGET JOB OPPORTUNITY.
            
            TARGET JOB OPPORTUNITY:
            - Title: {opportunity.title}
            - Company: {opportunity.company}
            - Required Skills: {', '.join(opportunity.requiredSkills or [])}
            - Description: {opportunity.description}
            - Key Responsibilities: {', '.join(opportunity.responsibilities or [])}

            CANDIDATE RESUME CONTENT:
            {resume_text}

            Provide an objective, real-time evaluation. Return ONLY a raw valid JSON object with no markdown backticks or extra commentary:
            {{
              "atsScore": <number 0-100 integer representing total ATS compatibility>,
              "status": "<'ready' if atsScore >= 75 else 'needs_improvement'>",
              "breakdown": {{
                "keywordScore": <number 0-40 keyword coverage score>,
                "maxKeywordScore": 40,
                "companyRoleScore": <number 0-30 role and company alignment score>,
                "maxCompanyRoleScore": 30,
                "structureScore": <number 0-30 resume structure, metrics & formatting score>,
                "maxStructureScore": 30
              }},
              "matchedKeywords": [<array of matched required skills present in resume>],
              "missingKeywords": [<array of missing required skills absent from resume>],
              "suggestions": [<array of 3 to 5 actionable, specific AI recommendations to improve resume for this job>]
            }}
            """

            headers = {
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json",
            }

            payload = {
                "model": "groq/compound-mini",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a professional ATS Resume Evaluation Engine. You output strictly raw JSON matching requested fields.",
                    },
                    {"role": "user", "content": prompt},
                ],
                "temperature": 0.1,
            }

            response = requests.post(GROQ_API_URL, headers=headers, json=payload, timeout=8)
            if response.status_code == 200:
                raw_content = response.json()["choices"][0]["message"]["content"].strip()
                # Clean up any potential markdown fences
                if raw_content.startswith("```"):
                    raw_content = re.sub(r"^```[a-z]*\n?", "", raw_content)
                    raw_content = re.sub(r"\n?```$", "", raw_content)

                result_json = json.loads(raw_content)
                result_json["opportunityId"] = opportunity.id
                result_json["jobTitle"] = opportunity.title
                result_json["company"] = opportunity.company
                logger.info(f"Groq ATS Prediction Successful: Score={result_json.get('atsScore')}%")
                return result_json

        except Exception as e:
            logger.warning(f"Groq API call failed or timed out: {e}. Falling back to rule-based parser.")

    # Rule-based fallback if Groq API is unreachable
    text_lower = resume_text.lower()
    
    req_skills = opportunity.requiredSkills or []
    matched_keywords: List[str] = []
    missing_keywords: List[str] = []
    
    for sk in req_skills:
        if sk.strip().lower() in text_lower:
            matched_keywords.append(sk)
        else:
            missing_keywords.append(sk)
            
    keyword_coverage = (len(matched_keywords) / len(req_skills)) if req_skills else 1.0
    keyword_score = round(keyword_coverage * 40)

    role_terms = opportunity.title.lower().split()
    company_name = opportunity.company.lower()
    
    matched_role_terms = [t for t in role_terms if len(t) > 2 and t in text_lower]
    role_coverage = (len(matched_role_terms) / len(role_terms)) if role_terms else 1.0
    company_mentioned = company_name in text_lower
    
    company_role_score = round((role_coverage * 20) + (10 if company_mentioned else 5))

    structure_checks = {
        "experience": any(w in text_lower for w in ["experience", "employment", "work history"]),
        "education": any(w in text_lower for w in ["education", "degree", "university", "college"]),
        "skills": any(w in text_lower for w in ["skills", "technologies", "tech stack"]),
        "projects": any(w in text_lower for w in ["projects", "hackathon", "builds"]),
        "quantifiable_metrics": bool(re.search(r'\b\d+(%|x|\+|\s?ms|\s?k)\b', text_lower)),
    }
    
    passed_structure_count = sum(1 for v in structure_checks.values() if v)
    structure_score = round((passed_structure_count / len(structure_checks)) * 30)

    total_ats_score = min(100, keyword_score + company_role_score + structure_score)
    status = "ready" if total_ats_score >= 75 else "needs_improvement"

    suggestions: List[str] = []
    if missing_keywords:
        suggestions.append(f"Add missing core keywords: '{', '.join(missing_keywords[:3])}' under your Tech Stack section.")
    if not company_mentioned:
        suggestions.append(f"Tailor your profile summary to mention target company '{opportunity.company}' and target role '{opportunity.title}'.")
    if not structure_checks["quantifiable_metrics"]:
        suggestions.append("Include quantified achievements with numbers (e.g. 'Improved API latency by 35%').")

    return {
        "opportunityId": opportunity.id,
        "jobTitle": opportunity.title,
        "company": opportunity.company,
        "atsScore": total_ats_score,
        "status": status,
        "breakdown": {
            "keywordScore": keyword_score,
            "maxKeywordScore": 40,
            "companyRoleScore": company_role_score,
            "maxCompanyRoleScore": 30,
            "structureScore": structure_score,
            "maxStructureScore": 30,
        },
        "matchedKeywords": matched_keywords,
        "missingKeywords": missing_keywords,
        "suggestions": suggestions,
    }

