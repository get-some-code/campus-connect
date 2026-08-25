from typing import List, Tuple
from models import OpportunitySchema, SkillSchema

# Common tech skill synonym map for smart normalization
SKILL_ALIASES = {
    "js": "javascript",
    "ts": "typescript",
    "py": "python",
    "react.js": "react",
    "nextjs": "next.js",
    "fastapi": "fastapi",
    "postgres": "postgresql",
    "aws": "amazon web services",
    "ml": "machine learning",
    "ai": "artificial intelligence",
}

def normalize_skill(skill_name: str) -> str:
    cleaned = skill_name.strip().lower()
    return SKILL_ALIASES.get(cleaned, cleaned)

def calculate_job_alignment(
    job: OpportunitySchema, student_skills: List[SkillSchema]
) -> OpportunitySchema:
    """
    Computes matchScore %, matching skills, and missingSkills gap list for a given job.
    """
    # Extract student skill names and normalize them
    student_skill_names = {normalize_skill(s.name) for s in student_skills}
    
    if not job.requiredSkills:
        job.matchScore = 100
        job.missingSkills = []
        return job

    normalized_reqs = [normalize_skill(req) for req in job.requiredSkills]
    
    matched_count = 0
    missing_list: List[str] = []

    for idx, raw_req in enumerate(job.requiredSkills):
        norm_req = normalized_reqs[idx]
        # Check direct or partial match
        if any(norm_req == st or norm_req in st or st in norm_req for st in student_skill_names):
            matched_count += 1
        else:
            missing_list.append(raw_req)

    total_reqs = len(job.requiredSkills)
    match_percentage = int((matched_count / total_reqs) * 100) if total_reqs > 0 else 0
    
    # Update job object
    job.matchScore = max(10, min(100, match_percentage))  # floor at 10% for realistic UX
    job.missingSkills = missing_list
    return job

def align_and_rank_opportunities(
    jobs: List[OpportunitySchema], student_skills: List[SkillSchema]
) -> List[OpportunitySchema]:
    """
    Aligns student skills against all job opportunities and sorts them by matchScore descending.
    """
    aligned_jobs = [calculate_job_alignment(job, student_skills) for job in jobs]
    # Sort by highest matchScore first
    aligned_jobs.sort(key=lambda j: j.matchScore, reverse=True)
    return aligned_jobs
