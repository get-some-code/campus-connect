from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from services.job_aggregator import fetch_aggregated_jobs
from services.ats_predictor import extract_text_from_file_bytes, analyze_ats_score

router = APIRouter(prefix="/api/v1/ats", tags=["ATS Score Predictor"])

class AtsPredictJsonRequest(BaseModel):
    opportunityId: str
    resumeText: str

@router.post("/predict")
async def predict_ats(
    opportunityId: str = Form(...),
    resumeText: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
):
    """
    Real-time ATS Predictor endpoint. Accepts a PDF/PNG/Text file OR raw resume text,
    analyzes compatibility against a specific target job opportunity ID, and returns
    the score, keyword breakdown, and AI improvement suggestions.
    """
    jobs = fetch_aggregated_jobs()
    opp = next((j for j in jobs if j.id == opportunityId), None)
    
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    text_to_analyze = ""
    
    if file and file.filename:
        file_bytes = await file.read()
        text_to_analyze = extract_text_from_file_bytes(file_bytes, file.filename)
    elif resumeText:
        text_to_analyze = resumeText
    else:
        # Default fallback sample resume
        text_to_analyze = "Python Developer with experience in FastAPI, SQL, Git, and React. Built web apps and REST APIs."

    return analyze_ats_score(text_to_analyze, opp)

@router.post("/predict-json")
async def predict_ats_json(payload: AtsPredictJsonRequest):
    """JSON alternative endpoint for ATS prediction."""
    jobs = fetch_aggregated_jobs()
    opp = next((j for j in jobs if j.id == payload.opportunityId), None)
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    return analyze_ats_score(payload.resumeText, opp)
