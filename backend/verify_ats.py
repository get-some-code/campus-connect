import sys
import os

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def run_ats_verification():
    print("==================================================")
    print("       REAL-TIME ATS PREDICTOR API TEST           ")
    print("==================================================")

    # 1. Test ATS Predictor on Microsoft Backend Role (linkedin-1) with non-optimized resume
    sample_text_unoptimized = """
    Alex Morgan - Software Student
    Skills: HTML, CSS, JavaScript, Basic Python.
    Education: BS Computer Science 2025.
    Worked on personal website project.
    """
    
    resp = client.post("/api/v1/ats/predict-json", json={
        "opportunityId": "linkedin-1",
        "resumeText": sample_text_unoptimized
    })
    assert resp.status_code == 200
    res_low = resp.json()
    print(f"[OK] Test Unoptimized Resume @ Microsoft (Backend Role):")
    print(f"   ↳ Target: {res_low['jobTitle']} @ {res_low['company']}")
    print(f"   ↳ ATS Score: {res_low['atsScore']}% | Status: {res_low['status'].upper()}")
    print(f"   ↳ Missing Keywords: {res_low['missingKeywords']}")
    print(f"   ↳ AI Improvement Suggestions ({len(res_low['suggestions'])}):")
    for sug in res_low['suggestions']:
        print(f"      • {sug}")

    print("-" * 75)

    # 2. Test ATS Predictor with highly optimized resume
    sample_text_optimized = """
    Alex Morgan - Backend Software Engineer at Microsoft Target
    Experience:
    - Built RESTful microservices using Python, FastAPI, SQL, Docker, and Azure cloud infrastructure.
    - Improved database API throughput by 42% and reduced query latency across high-scale endpoints.
    Education: B.S. Computer Science 2025.
    Skills: Python, FastAPI, SQL, Docker, Azure, Microservices, Git, React.
    Projects: High-throughput API gateway with Docker containerization.
    """

    resp = client.post("/api/v1/ats/predict-json", json={
        "opportunityId": "linkedin-1",
        "resumeText": sample_text_optimized
    })
    assert resp.status_code == 200
    res_high = resp.json()
    print(f"[OK] Test Optimized Resume @ Microsoft (Backend Role):")
    print(f"   ↳ Target: {res_high['jobTitle']} @ {res_high['company']}")
    print(f"   ↳ ATS Score: {res_high['atsScore']}% | Status: {res_high['status'].upper()}")
    print(f"   ↳ Matched Keywords: {res_high['matchedKeywords']}")
    print(f"   ↳ Status Ready: {res_high['status'] == 'ready'}")

    print("\n==================================================")
    print(" 🎉 REAL-TIME ATS PREDICTOR API TEST PASSED!      ")
    print("==================================================")

if __name__ == "__main__":
    run_ats_verification()
