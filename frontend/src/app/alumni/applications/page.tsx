"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_APPLICANTS_PIPELINE, CandidateApplicant } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

const STAGES = ["Applicants", "Shortlisted", "Interview", "Selected", "Rejected"] as const;

export default function AlumniApplicationsPage() {
  const [pipeline, setPipeline] = useState<CandidateApplicant[]>(MOCK_APPLICANTS_PIPELINE);

  const moveStage = (id: string, newStage: typeof STAGES[number]) => {
    setPipeline((prev) =>
      prev.map((c) => (c.id === id ? { ...c, stage: newStage } : c))
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Hiring Pipeline &amp; Candidate Management</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>
            Track campus applicants, review student skill benchmarks, and manage your hiring referral pipeline.
          </p>
        </div>

        <Link
          href="/alumni/recommendations"
          style={{
            padding: "0.5rem 1rem",
            background: "#3525cd",
            color: "#fff",
            borderRadius: "0.5rem",
            fontWeight: 600,
            fontSize: "0.85rem",
            textDecoration: "none",
          }}
        >
          Discover Recommended Students
        </Link>
      </header>

      {/* Kanban Board */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
        {STAGES.map((stage) => {
          const items = pipeline.filter((c) => c.stage === stage);
          return (
            <div key={stage} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "0.75rem", padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {/* Column Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.5rem", borderBottom: "2px solid #cbd5e1" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#141b2b" }}>{stage}</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, padding: "2px 6px", borderRadius: "999px", background: "#e2e8f0", color: "#334155" }}>
                  {items.length}
                </span>
              </div>

              {/* Candidate Cards */}
              {items.length === 0 ? (
                <div style={{ padding: "1.5rem", textAlign: "center", color: "#94a3b8", fontSize: "0.78rem", border: "1px dashed #cbd5e1", borderRadius: "0.5rem" }}>
                  No candidates in {stage}
                </div>
              ) : (
                items.map((cand) => (
                  <div key={cand.id} style={cardStyle}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#16a34a", padding: "2px 6px", background: "#dcfce7", borderRadius: "4px" }}>
                        {cand.matchScore}% Skill Match
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>{cand.appliedDate}</span>
                    </div>

                    <div style={{ display: "flex", gap: "0.625rem", alignItems: "center", marginBottom: "0.625rem" }}>
                      <img src={cand.studentAvatar} alt={cand.studentName} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} />
                      <div>
                        <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>{cand.studentName}</h4>
                        <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}>{cand.education}</p>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "0.75rem" }}>
                      {cand.skills.slice(0, 3).map((s) => (
                        <span key={s} style={{ fontSize: "0.7rem", padding: "2px 6px", background: "#f1f3ff", color: "#3525cd", borderRadius: "4px", fontWeight: 600 }}>{s}</span>
                      ))}
                    </div>

                    {/* Move Controls */}
                    <div style={{ borderTop: "1px solid #e9edff", paddingTop: "0.5rem", display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {stage !== "Shortlisted" && stage !== "Selected" && (
                        <button onClick={() => moveStage(cand.id, "Shortlisted")} style={{ fontSize: "0.7rem", padding: "2px 6px", background: "#3525cd", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" }}>Shortlist</button>
                      )}
                      {stage !== "Interview" && stage !== "Selected" && (
                        <button onClick={() => moveStage(cand.id, "Interview")} style={{ fontSize: "0.7rem", padding: "2px 6px", background: "#6b38d4", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" }}>Interview</button>
                      )}
                      {stage !== "Selected" && (
                        <button onClick={() => moveStage(cand.id, "Selected")} style={{ fontSize: "0.7rem", padding: "2px 6px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" }}>Select</button>
                      )}
                      {stage !== "Rejected" && (
                        <button onClick={() => moveStage(cand.id, "Rejected")} style={{ fontSize: "0.7rem", padding: "2px 6px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "3px", cursor: "pointer" }}>Reject</button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
