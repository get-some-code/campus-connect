from fastapi import APIRouter, HTTPException
from typing import List
from models import (
    UserSchema,
    SkillSchema,
    SkillCreateSchema,
    SkillExtractRequest,
    SkillExtractResponse,
    AssessmentResultSchema,
)

router = APIRouter(prefix="/api/v1", tags=["Student Profile & Skills"])

# In-memory store for prototype speed
CURRENT_USER = UserSchema()

INITIAL_SKILLS: List[SkillSchema] = [
    SkillSchema(id="sk-1", name="Python", category="Technical", currentLevel=4, targetLevel=5, categoryLabel="Backend", status="Target Met"),
    SkillSchema(id="sk-2", name="FastAPI", category="Technical", currentLevel=4, targetLevel=5, categoryLabel="Backend", status="Target Met"),
    SkillSchema(id="sk-3", name="React", category="Technical", currentLevel=3, targetLevel=5, categoryLabel="Frontend", status="In Progress"),
    SkillSchema(id="sk-4", name="TypeScript", category="Technical", currentLevel=3, targetLevel=4, categoryLabel="Frontend", status="In Progress"),
    SkillSchema(id="sk-5", name="SQL", category="Technical", currentLevel=4, targetLevel=4, categoryLabel="Database", status="Target Met"),
    SkillSchema(id="sk-6", name="Docker", category="Technical", currentLevel=2, targetLevel=4, categoryLabel="DevOps", status="Priority Gap"),
    SkillSchema(id="sk-7", name="AWS", category="Technical", currentLevel=1, targetLevel=4, categoryLabel="Cloud", status="Priority Gap"),
]

STUDENT_SKILLS: List[SkillSchema] = [s.model_copy(deep=True) for s in INITIAL_SKILLS]

# Predefined dictionary of tech skills for extraction
TECH_KEYWORDS = [
    "Python", "FastAPI", "React", "TypeScript", "JavaScript", "Next.js", "Node.js",
    "Express", "SQL", "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes",
    "AWS", "Azure", "GCP", "Git", "GitHub", "CI/CD", "Machine Learning", "PyTorch",
    "TensorFlow", "Pandas", "NumPy", "Tailwind CSS", "HTML", "CSS", "REST API", "GraphQL"
]

@router.get("/user/me", response_model=UserSchema)
async def get_user_me():
    """Returns the current student's profile."""
    # Dynamic computation of profile stats
    CURRENT_USER.skillsMastered = len([s for s in STUDENT_SKILLS if s.currentLevel >= 4])
    return CURRENT_USER

@router.put("/user/me", response_model=UserSchema)
async def update_user_me(updated_user: UserSchema):
    """Updates student profile fields."""
    global CURRENT_USER
    CURRENT_USER = updated_user
    return CURRENT_USER

@router.get("/skills", response_model=List[SkillSchema])
async def get_skills():
    """Returns all current skills for the student."""
    return STUDENT_SKILLS

@router.post("/skills", response_model=SkillSchema)
async def add_skill(skill_in: SkillCreateSchema):
    """Adds or updates a student skill."""
    # Check if skill already exists
    existing = next((s for s in STUDENT_SKILLS if s.name.lower() == skill_in.name.lower()), None)
    if existing:
        existing.currentLevel = skill_in.currentLevel
        existing.targetLevel = skill_in.targetLevel
        existing.category = skill_in.category
        existing.status = "Target Met" if existing.currentLevel >= existing.targetLevel else "In Progress"
        return existing

    status = "Target Met" if skill_in.currentLevel >= skill_in.targetLevel else "In Progress"
    new_skill = SkillSchema(
        id=f"sk-{len(STUDENT_SKILLS) + 1}",
        name=skill_in.name,
        category=skill_in.category,
        currentLevel=skill_in.currentLevel,
        targetLevel=skill_in.targetLevel,
        categoryLabel="User Skill",
        status=status,
    )
    STUDENT_SKILLS.append(new_skill)
    return new_skill

@router.delete("/skills/{skill_id}")
async def delete_skill(skill_id: str):
    """Deletes a skill from student profile."""
    global STUDENT_SKILLS
    STUDENT_SKILLS = [s for s in STUDENT_SKILLS if s.id != skill_id]
    return {"message": "Skill removed successfully"}

@router.post("/student/extract-skills", response_model=SkillExtractResponse)
async def extract_skills_from_text(req: SkillExtractRequest):
    """
    NLP / Keyword skill extractor for student input text or resume content.
    Extracts matching skills and adds them to profile gaps.
    """
    text_lower = req.text.lower()
    extracted: List[str] = []

    for kw in TECH_KEYWORDS:
        if kw.lower() in text_lower:
            extracted.append(kw)

    return SkillExtractResponse(
        extractedSkills=extracted,
        matchedCategories=list(set(["Technical" for _ in extracted]))
    )

from pydantic import BaseModel

class AssessmentSubmitRequest(BaseModel):
    skillName: str
    score: int


@router.get("/assessments/result", response_model=AssessmentResultSchema)
async def get_assessment_result():
    """Returns benchmark assessment results for skill gap evaluation."""
    return AssessmentResultSchema()


@router.post("/assessments/submit")
async def submit_assessment(req: AssessmentSubmitRequest):
    """
    Submits skill test result. If score >= 80%, increases currentLevel of skill by +1 in profile
    and marks status as Target Met, updating the student readiness portal.
    """
    skill = next((s for s in STUDENT_SKILLS if s.name.lower() == req.skillName.lower()), None)
    
    if not skill:
        skill = SkillSchema(
            id=f"sk-{len(STUDENT_SKILLS) + 1}",
            name=req.skillName,
            category="Technical",
            currentLevel=3 if req.score >= 80 else 2,
            targetLevel=5,
            categoryLabel="Evaluated Skill",
            status="Target Met" if req.score >= 80 else "In Progress"
        )
        STUDENT_SKILLS.append(skill)
    else:
        if req.score >= 80 and skill.currentLevel < skill.targetLevel:
            skill.currentLevel = min(skill.targetLevel, skill.currentLevel + 1)
        if skill.currentLevel >= skill.targetLevel:
            skill.status = "Target Met"
        else:
            skill.status = "In Progress"

    CURRENT_USER.skillsMastered = len([s for s in STUDENT_SKILLS if s.currentLevel >= 4])
    return {
        "success": True,
        "skillName": skill.name,
        "currentLevel": skill.currentLevel,
        "targetLevel": skill.targetLevel,
        "status": skill.status,
        "score": req.score
    }

