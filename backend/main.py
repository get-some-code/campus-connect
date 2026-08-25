import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import student, opportunities, applications, ats

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

app = FastAPI(
    title="Campus Connect - SIH Hackathon Backend API",
    description="Backend for Student Input/Output Skill Engine, Multi-Platform Job Aggregator, and Real-Time ATS Score Predictor",
    version="1.0.0",
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(student.router)
app.include_router(opportunities.router)
app.include_router(applications.router)
app.include_router(ats.router)

@app.get("/", tags=["Health"])
async def root():
    return {
        "status": "online",
        "service": "Campus Connect SIH Backend Engine",
        "docs": "http://localhost:8000/docs",
        "features": ["Student Profile", "LinkedIn/Indeed/Internshala Job Aggregator", "Real-Time ATS Score Predictor"],
    }

@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
