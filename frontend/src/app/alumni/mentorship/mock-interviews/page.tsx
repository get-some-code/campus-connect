"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_INTERVIEW_REQUESTS } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function MockInterviewCenterPage() {
  const [requests, setRequests] = useState(MOCK_INTERVIEW_REQUESTS);
  const [selectedForFeedback, setSelectedForFeedback] = useState<string | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Feedback form state
  const [ratings, setRatings] = useState({
    technicalKnowledge: 4,
    problemSolving: 4,
    communication: 5,
    confidence: 4,
    roleReadiness: 4,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "1000px", margin: "0 auto" }}>
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Mock Interview Center</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>
            Conduct simulated company technical rounds and provide feedback ratings for university candidates.
          </p>
        </div>
        <Link href="/alumni/mentorship" style={{ fontSize: "0.85rem", fontWeight: 600, color: "#3525cd", textDecoration: "none" }}>
          &larr; Back to Mentorship Center
        </Link>
      </header>

      {/* Available Requests */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b" }}>
          Available Mock Technical Requests ({requests.length})
        </h2>

        {requests.map((req) => (
          <div key={req.id} style={{ ...cardStyle, borderLeft: "4px solid #6b38d4" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", gap: "0.85rem", alignItems: "center" }}>
                <img src={req.studentAvatar} alt={req.studentName} style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid #6b38d4" }} />
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>
                    {req.studentName}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "#6b38d4", fontWeight: 600, margin: "2px 0 0 0" }}>
                    Target Role: <strong>{req.targetRole}</strong> @ {req.targetCompany}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "3px 10px", borderRadius: "4px", background: "#f3e8ff", color: "#6b38d4", textTransform: "uppercase" }}>
                  {req.interviewType} Interview
                </span>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", background: "#f1f3ff", color: "#3525cd" }}>
                  {req.status}
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.85rem", color: "#334155", background: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", margin: "0 0 0.85rem 0" }}>
              "{req.message}" &bull; Requested Date: {req.requestedDate}
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button
                onClick={() => setSelectedForFeedback(req.id)}
                style={{ padding: "0.45rem 1rem", background: "#6b38d4", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}
              >
                Provide Interview Feedback UI
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* FEEDBACK EVALUATION FORM UI (MODAL) */}
      {selectedForFeedback && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(15,23,42,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", overflowY: "auto" }}>
          <div style={{ background: "#fff", borderRadius: "0.875rem", padding: "1.75rem", maxWidth: "620px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#6b38d4", textTransform: "uppercase" }}>Post-Interview Evaluation</span>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>Candidate Feedback Scorecard</h2>
              </div>
              <button onClick={() => setSelectedForFeedback(null)} style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b" }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {feedbackSubmitted ? (
              <div style={{ textAlign: "center", padding: "2rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "0.5rem" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#16a34a" }}>check_circle</span>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#166534", marginTop: "8px" }}>Feedback Scorecard Saved!</h3>
                <p style={{ fontSize: "0.85rem", color: "#15803d" }}>The detailed evaluation report has been shared with the student and synced with their Readiness Portal index.</p>
                <button onClick={() => { setFeedbackSubmitted(false); setSelectedForFeedback(null); }} style={{ padding: "0.5rem 1.25rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600, marginTop: "1rem" }}>Close Scorecard</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Rating Sliders */}
                {[
                  { key: "technicalKnowledge", label: "Technical Knowledge & Code Quality" },
                  { key: "problemSolving", label: "Problem Solving & Algorithmic Thinking" },
                  { key: "communication", label: "Communication & Clarifying Questions" },
                  { key: "confidence", label: "Confidence & Poise Under Pressure" },
                  { key: "roleReadiness", label: "Overall Role Readiness Index" },
                ].map((item) => (
                  <div key={item.key} style={{ background: "#f8fafc", padding: "0.75rem 1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b" }}>{item.label}</span>
                      <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#6b38d4" }}>
                        {(ratings as any)[item.key]} / 5 Stars
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={(ratings as any)[item.key]}
                      onChange={(e) => setRatings({ ...ratings, [item.key]: parseInt(e.target.value) })}
                      style={{ width: "100%", accentColor: "#6b38d4" }}
                    />
                  </div>
                ))}

                {/* Text Feedback */}
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Core Strengths</label>
                  <textarea rows={2} defaultValue="Excellent understanding of REST APIs, FastAPI status codes, and clean modular code." style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
                </div>

                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Areas for Improvement</label>
                  <textarea rows={2} defaultValue="Need to practice dry running array index boundary conditions before typing code." style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <button onClick={() => setSelectedForFeedback(null)} style={{ padding: "0.5rem 1rem", border: "1px solid #c7c4d8", background: "#fff", borderRadius: "0.375rem" }}>Cancel</button>
                  <button onClick={() => setFeedbackSubmitted(true)} style={{ padding: "0.5rem 1.25rem", background: "#6b38d4", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600 }}>Submit Evaluation Report</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
