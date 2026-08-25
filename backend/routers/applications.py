from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel
from models import ApplicationSchema, ApplicationDocument
from services.job_aggregator import fetch_aggregated_jobs

router = APIRouter(prefix="/api/v1", tags=["Applications"])

MOCK_APPLICATIONS: List[ApplicationSchema] = [
    ApplicationSchema(
        id="app-1",
        opportunityId="linkedin-2",
        opportunityTitle="Frontend Engineer (React / Next.js)",
        companyName="Razorpay",
        companyLogo="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
        stage="Interview",
        appliedDate="2026-08-15",
        lastUpdated="2026-08-22",
        interviewDate="2026-08-28T14:00:00Z",
        interviewNotes="Technical Round 1: React State Management & Next.js SSR Architecture",
        documents=[
            ApplicationDocument(name="Alex_Morgan_Resume.pdf", size="240 KB", type="application/pdf")
        ],
    ),
    ApplicationSchema(
        id="app-2",
        opportunityId="internshala-1",
        opportunityTitle="Backend Development Intern (Python / FastAPI)",
        companyName="TechCorp Innovations",
        companyLogo="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150",
        stage="Under Review",
        appliedDate="2026-08-18",
        lastUpdated="2026-08-19",
        documents=[
            ApplicationDocument(name="Alex_Morgan_Resume.pdf", size="240 KB", type="application/pdf")
        ],
    ),
]

class CreateApplicationRequest(BaseModel):
    opportunityId: str

@router.get("/applications", response_model=List[ApplicationSchema])
async def list_applications():
    """Returns all active job applications for the student."""
    return MOCK_APPLICATIONS

@router.get("/applications/{app_id}", response_model=ApplicationSchema)
async def get_application(app_id: str):
    """Returns details for a specific job application."""
    app = next((a for a in MOCK_APPLICATIONS if a.id == app_id), None)
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app

@router.post("/applications", response_model=ApplicationSchema)
async def apply_to_opportunity(req: CreateApplicationRequest):
    """Submits a new job application for the given opportunity ID."""
    jobs = fetch_aggregated_jobs()
    job = next((j for j in jobs if j.id == req.opportunityId), None)
    
    if not job:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    
    # Check if already applied
    existing = next((a for a in MOCK_APPLICATIONS if a.opportunityId == req.opportunityId), None)
    if existing:
        return existing

    new_app = ApplicationSchema(
        id=f"app-{len(MOCK_APPLICATIONS) + 1}",
        opportunityId=job.id,
        opportunityTitle=job.title,
        companyName=job.company,
        companyLogo=job.companyLogo,
        stage="Applied",
        appliedDate="2026-08-25",
        lastUpdated="2026-08-25",
        documents=[
            ApplicationDocument(name="Alex_Morgan_Resume.pdf", size="240 KB", type="application/pdf")
        ],
    )
    MOCK_APPLICATIONS.insert(0, new_app)
    return new_app
