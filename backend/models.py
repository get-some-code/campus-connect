from typing import List, Optional
from pydantic import BaseModel, Field

# --- Pydantic Schemas for Frontend API Compatibility ---

class SkillSchema(BaseModel):
    id: str
    name: str
    category: str = "Technical"  # Technical | Soft | Domain
    currentLevel: int = 3       # 1 to 5
    targetLevel: int = 5        # 1 to 5
    categoryLabel: Optional[str] = "Backend & Engineering"
    status: Optional[str] = "In Progress"  # Target Met | In Progress | Priority Gap

class SkillCreateSchema(BaseModel):
    name: str
    category: str = "Technical"
    currentLevel: int = 3
    targetLevel: int = 5

class UserSchema(BaseModel):
    id: str = "user-1"
    name: str = "Alex Morgan"
    email: str = "alex.morgan@university.edu"
    role: str = "student"
    institution: Optional[str] = "Stanford University"
    gradYear: Optional[str] = "2025"
    degree: Optional[str] = "B.S. Computer Science"
    targetRole: Optional[str] = "Full Stack Engineer"
    profileStrength: int = 85
    avatarUrl: Optional[str] = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    skillsMastered: int = 12
    activeApplicationsCount: int = 3

class OpportunitySchema(BaseModel):
    id: str
    title: str
    company: str
    companyLogo: str
    location: str
    type: str = "Full-time"  # Full-time | Internship | Contract
    workMode: str = "Hybrid" # Remote | On-site | Hybrid
    salaryOrStipend: str
    matchScore: int = 0
    requiredSkills: List[str] = []
    missingSkills: List[str] = []
    deadline: str = "2026-09-30"
    description: str = ""
    responsibilities: List[str] = []
    requirements: List[str] = []
    isSaved: bool = False
    source: str = "LinkedIn"  # LinkedIn | Indeed | Internshala | Direct
    jobUrl: Optional[str] = "https://linkedin.com"

class ApplicationDocument(BaseModel):
    name: str
    size: str
    type: str

class ApplicationSchema(BaseModel):
    id: str
    opportunityId: str
    opportunityTitle: str
    companyName: str
    companyLogo: str
    stage: str = "Applied"  # Applied | Under Review | Interview | Selected | Rejected
    appliedDate: str
    lastUpdated: str
    interviewDate: Optional[str] = None
    interviewNotes: Optional[str] = None
    documents: List[ApplicationDocument] = []

class AssessmentResultSchema(BaseModel):
    id: str = "assess-1"
    title: str = "Full-Stack Software Engineering Benchmark"
    score: int = 88
    percentile: int = 92
    strengths: List[str] = ["Python API Development", "React & Next.js", "Database Design"]
    focusAreas: List[str] = ["System Architecture", "GraphQL", "CI/CD Pipelines"]
    completedAt: str = "2026-08-20"

class SkillExtractRequest(BaseModel):
    text: str

class SkillExtractResponse(BaseModel):
    extractedSkills: List[str]
    matchedCategories: List[str]
