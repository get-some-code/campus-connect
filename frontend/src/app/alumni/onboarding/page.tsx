"use client";

import { useState } from "react";
import Link from "next/link";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.875rem",
  padding: "2rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
};

export default function AlumniOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  return (
    <div style={{ maxWidth: "680px", margin: "2rem auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Stepper Header */}
      <div style={{ textAlign: "center" }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd", textTransform: "uppercase" }}>
          ALUMNI WELCOME WIZARD &bull; STEP {currentStep} OF {totalSteps}
        </span>
        <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b", marginTop: "4px" }}>
          Welcome to the CampusConnect Alumni Portal!
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#464555", marginTop: "2px" }}>
          Set up your verified career profile to mentor students, share experiences, and recruit campus talent.
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ width: "100%", height: "6px", background: "#e9edff", borderRadius: "999px", overflow: "hidden" }}>
        <div style={{ width: `${(currentStep / totalSteps) * 100}%`, height: "100%", background: "linear-gradient(90deg, #3525cd, #4f46e5)", borderRadius: "999px", transition: "width 0.3s ease" }} />
      </div>

      {/* Step Card Content */}
      <div style={cardStyle}>
        {currentStep === 1 && (
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem" }}>1. Verify Graduation Information</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Graduation Year *</label>
                <input type="number" defaultValue={2023} style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Degree &amp; Department *</label>
                <input type="text" defaultValue="B.Tech Computer Science & Engineering" style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem" }}>2. Current Career Details</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Current Company *</label>
                <input type="text" defaultValue="TechNova Systems" style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Current Role *</label>
                <input type="text" defaultValue="Senior Software Engineer" style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem" }}>3. Tech Stack &amp; Core Skills</h2>
            <p style={{ fontSize: "0.85rem", color: "#464555", marginBottom: "0.85rem" }}>Select the primary technologies you use daily in industry.</p>
            <input type="text" defaultValue="Python, FastAPI, React, Docker, Redis, PostgreSQL" style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem" }}>4. Industry &amp; Primary Domain</h2>
            <select style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem", background: "#fff" }}>
              <option>Enterprise SaaS & Cloud Infrastructure</option>
              <option>Fintech & Financial Systems</option>
              <option>Artificial Intelligence & Deep Learning</option>
              <option>E-Commerce & High-Concurrency Systems</option>
            </select>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem" }}>5. Career Interests &amp; Executive Focus</h2>
            <input type="text" defaultValue="Backend Systems, Distributed Systems, Cloud Architecture" style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
          </div>
        )}

        {currentStep === 6 && (
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem" }}>6. Mentorship Topics Preference</h2>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", fontWeight: 600, color: "#141b2b", marginBottom: "1rem" }}>
              <input type="checkbox" defaultChecked style={{ accentColor: "#3525cd", width: "18px", height: "18px" }} />
              I would like to offer 1-on-1 mentorship to campus students
            </label>
            <input type="text" defaultValue="System Design, Mock Coding Interviews, Resume Reviews" style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
          </div>
        )}

        {currentStep === 7 && (
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem" }}>7. Mentorship Weekly Availability</h2>
            <select style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem", background: "#fff" }}>
              <option>1-2 Hours per Week (Weekends)</option>
              <option>3-5 Hours per Week</option>
              <option>Async Code & Resume Reviews Only</option>
            </select>
          </div>
        )}

        {currentStep === 8 && (
          <div style={{ textAlign: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "56px", color: "#16a34a" }}>verified</span>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#166534", marginTop: "8px" }}>Your Alumni Profile is Ready!</h2>
            <p style={{ fontSize: "0.88rem", color: "#464555", marginTop: "4px", lineHeight: 1.5 }}>
              Thank you for giving back to the CampusConnect student community. Choose a next action to get started:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "1.5rem" }}>
              <Link href="/alumni/profile" style={{ padding: "0.625rem", border: "1px solid #c7c4d8", borderRadius: "0.5rem", color: "#141b2b", textDecoration: "none", fontWeight: 600, fontSize: "0.85rem" }}>
                Complete Career Profile
              </Link>
              <Link href="/alumni/mentorship" style={{ padding: "0.625rem", background: "#3525cd", color: "#fff", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600, fontSize: "0.85rem" }}>
                Offer Mentorship
              </Link>
              <Link href="/alumni/experiences" style={{ padding: "0.625rem", background: "#4f46e5", color: "#fff", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600, fontSize: "0.85rem" }}>
                Share Career Experience
              </Link>
              <Link href="/alumni/opportunities" style={{ padding: "0.625rem", background: "#16a34a", color: "#fff", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600, fontSize: "0.85rem" }}>
                Explore Opportunities
              </Link>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {currentStep < 8 && (
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e9edff", paddingTop: "1rem", marginTop: "1.5rem" }}>
            <button
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              style={{ padding: "0.5rem 1rem", border: "1px solid #c7c4d8", background: "#fff", borderRadius: "0.375rem", opacity: currentStep === 1 ? 0.5 : 1 }}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
              style={{ padding: "0.5rem 1.25rem", background: "#3525cd", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600 }}
            >
              Next Step &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
