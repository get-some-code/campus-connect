"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_RECOMMENDED_STUDENTS, RecommendedStudent } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export default function StudentRecommendationsPage() {
  const [students, setStudents] = useState<RecommendedStudent[]>(MOCK_RECOMMENDED_STUDENTS);

  const toggleRecommend = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isRecommended: !s.isRecommended } : s))
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Top Campus Talent &amp; Referrals</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>
            High-readiness students benchmarked by test scores and project contributions, eligible for alumni referrals.
          </p>
        </div>

        <Link href="/alumni/opportunities" style={{ fontSize: "0.85rem", fontWeight: 600, color: "#3525cd", textDecoration: "none" }}>
          &larr; Back to Opportunities
        </Link>
      </header>

      {/* Student Referral Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
        {students.map((st) => (
          <div key={st.id} style={cardStyle}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#dcfce7", color: "#15803d" }}>
                  {st.readinessScore}% Readiness Index
                </span>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Class of {st.gradYear}</span>
              </div>

              <div style={{ display: "flex", gap: "0.85rem", alignItems: "center", marginBottom: "0.85rem" }}>
                <img src={st.avatar} alt={st.name} style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: "2px solid #3525cd" }} />
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>{st.name}</h3>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#3525cd", margin: "2px 0 0 0" }}>{st.careerGoal}</p>
                  <p style={{ fontSize: "0.78rem", color: "#64748b", margin: 0 }}>{st.degree}</p>
                </div>
              </div>

              <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", marginBottom: "0.85rem" }}>
                <p style={{ fontSize: "0.8rem", color: "#334155", margin: 0, lineHeight: 1.4 }}>
                  <strong>Benchmark Highlight:</strong> {st.matchReason}
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "1rem" }}>
                {st.topSkills.map((sk) => (
                  <span key={sk} style={{ fontSize: "0.72rem", padding: "2px 8px", background: "#f1f3ff", color: "#3525cd", borderRadius: "4px", fontWeight: 600 }}>{sk}</span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: "1px solid #e9edff", paddingTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => toggleRecommend(st.id)}
                style={{
                  flex: 1,
                  padding: "0.45rem",
                  background: st.isRecommended ? "#16a34a" : "#3525cd",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.375rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {st.isRecommended ? "✓ Recommended for Referral" : "Recommend Candidate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
