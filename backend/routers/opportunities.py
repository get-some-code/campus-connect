from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional
from models import OpportunitySchema
from services.job_aggregator import fetch_aggregated_jobs
from services.matcher import align_and_rank_opportunities
from routers.student import STUDENT_SKILLS

router = APIRouter(prefix="/api/v1", tags=["Job Opportunities"])

# Persistent state cache for saved state toggle
SAVED_JOB_IDS = {"linkedin-2"}

@router.get("/opportunities", response_model=List[OpportunitySchema])
async def list_opportunities(
    source: Optional[str] = Query(None, description="Filter by source platform: linkedin, indeed, internshala"),
    type: Optional[str] = Query(None, description="Filter by job type: internship, fulltime, contract"),
    search: Optional[str] = Query(None, description="Search term for title or company"),
):
    """
    Returns skill-aligned job listings aggregated from LinkedIn, Indeed, and Internshala.
    Calculates dynamic match score % and missing skill gaps based on the student's skills.
    """
    raw_jobs = fetch_aggregated_jobs()
    
    # Run Skill Alignment Engine against current student skills
    aligned_jobs = align_and_rank_opportunities(raw_jobs, STUDENT_SKILLS)
    
    # Update isSaved state
    for job in aligned_jobs:
        if job.id in SAVED_JOB_IDS:
            job.isSaved = True
        else:
            job.isSaved = False

    # Apply platform source filter
    if source:
        src_lower = source.strip().lower()
        aligned_jobs = [j for j in aligned_jobs if j.source.lower() == src_lower]

    # Apply job type filter
    if type:
        type_lower = type.strip().lower()
        if type_lower == "internship":
            aligned_jobs = [j for j in aligned_jobs if j.type.lower() == "internship"]
        elif type_lower == "fulltime" or type_lower == "full-time":
            aligned_jobs = [j for j in aligned_jobs if j.type.lower() == "full-time"]

    # Apply search text query
    if search:
        s_lower = search.strip().lower()
        aligned_jobs = [
            j for j in aligned_jobs
            if s_lower in j.title.lower() or s_lower in j.company.lower() or any(s_lower in sk.lower() for sk in j.requiredSkills)
        ]

    return aligned_jobs

@router.get("/opportunities/{opp_id}", response_model=OpportunitySchema)
async def get_opportunity(opp_id: str):
    """Returns details for a single job opportunity with calculated match score."""
    raw_jobs = fetch_aggregated_jobs()
    aligned_jobs = align_and_rank_opportunities(raw_jobs, STUDENT_SKILLS)
    
    match = next((j for j in aligned_jobs if j.id == opp_id), None)
    if not match:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    
    match.isSaved = match.id in SAVED_JOB_IDS
    return match

@router.post("/opportunities/{opp_id}/save")
async def toggle_save_opportunity(opp_id: str):
    """Toggles saved state for an opportunity."""
    if opp_id in SAVED_JOB_IDS:
        SAVED_JOB_IDS.remove(opp_id)
        is_saved = False
    else:
        SAVED_JOB_IDS.add(opp_id)
        is_saved = True
    return {"id": opp_id, "isSaved": is_saved}
