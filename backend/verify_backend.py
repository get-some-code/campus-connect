import sys
import os

# Set stdout/stderr encoding to UTF-8 for Windows console support
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def run_backend_verification():
    print("==================================================")
    print("    SIH HACKATHON BACKEND PROTOTYPE VERIFICATION  ")
    print("==================================================")

    # 1. Healthcheck
    resp = client.get("/")
    assert resp.status_code == 200, f"Root healthcheck failed: {resp.status_code}"
    print("[OK] [1/7] GET / -> Root Health Check OK:", resp.json()["service"])

    # 2. Get User Profile
    resp = client.get("/api/v1/user/me")
    assert resp.status_code == 200
    user_data = resp.json()
    print("[OK] [2/7] GET /api/v1/user/me -> Student Profile OK:", user_data["name"], f"({user_data['institution']})")

    # 3. Get Student Skills
    resp = client.get("/api/v1/skills")
    assert resp.status_code == 200
    skills = resp.json()
    print(f"[OK] [3/7] GET /api/v1/skills -> Found {len(skills)} Student Skills:", [s['name'] for s in skills[:4]], "...")

    # 4. Extract Skills from Resume / Text
    extract_payload = {"text": "I am a Full Stack Developer skilled in Python, FastAPI, React, Docker, and AWS."}
    resp = client.post("/api/v1/student/extract-skills", json=extract_payload)
    assert resp.status_code == 200
    extracted = resp.json()
    print("[OK] [4/7] POST /api/v1/student/extract-skills -> Extracted Skills:", extracted["extractedSkills"])

    # 5. Add New Skill
    new_skill_payload = {"name": "Kubernetes", "category": "Technical", "currentLevel": 3, "targetLevel": 4}
    resp = client.post("/api/v1/skills", json=new_skill_payload)
    assert resp.status_code == 200
    print("[OK] [5/7] POST /api/v1/skills -> Added Skill:", resp.json()["name"])

    # 6. Fetch Aggregated Jobs & Verify Skill Alignment Engine
    resp = client.get("/api/v1/opportunities")
    assert resp.status_code == 200
    jobs = resp.json()
    print(f"\n[OK] [6/7] GET /api/v1/opportunities -> Aggregated {len(jobs)} Jobs from LinkedIn, Indeed, Internshala:")
    print("-" * 75)
    for j in jobs[:5]:
        print(f" * [{j['source'].upper()}] {j['title']} @ {j['company']} ({j['location']})")
        print(f"   | Match: {j['matchScore']}% | Required: {', '.join(j['requiredSkills'][:3])} | Missing Gaps: {j['missingSkills']}")
    print("-" * 75)

    # Filter test by source
    linkedin_jobs = client.get("/api/v1/opportunities?source=linkedin").json()
    internshala_jobs = client.get("/api/v1/opportunities?source=internshala").json()
    indeed_jobs = client.get("/api/v1/opportunities?source=indeed").json()
    print(f"   | Source Breakdown: LinkedIn ({len(linkedin_jobs)}), Indeed ({len(indeed_jobs)}), Internshala ({len(internshala_jobs)})")

    # 7. Applications API
    resp = client.get("/api/v1/applications")
    assert resp.status_code == 200
    apps = resp.json()
    print(f"\n[OK] [7/7] GET /api/v1/applications -> {len(apps)} Active Student Applications Tracked.")

    print("\n==================================================")
    print(" ALL BACKEND API ENDPOINTS VERIFIED SUCCESSFULLY! ")
    print("==================================================")

if __name__ == "__main__":
    run_backend_verification()
