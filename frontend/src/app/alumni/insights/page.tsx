"use client";

import Link from "next/link";
import { MOCK_INDUSTRY_INSIGHTS } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function AlumniInsightsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Industry &amp; Career Insights</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>
            Real-time hiring trends, emerging technology demands, and skill recommendations for campus developers.
          </p>
        </div>
      </header>

      {/* Visual Analytics Overview Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
        <div style={{ ...cardStyle, borderLeft: "4px solid #3525cd", background: "#f8fafc" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", margin: 0 }}>FastAPI &amp; Async Microservices</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#3525cd", margin: "4px 0 0 0" }}>+48% Demand</p>
          <p style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 600, marginTop: "4px", margin: 0 }}>Highest growth in backend engineering</p>
        </div>

        <div style={{ ...cardStyle, borderLeft: "4px solid #16a34a", background: "#f8fafc" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", margin: 0 }}>Docker &amp; Kubernetes Adoption</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#16a34a", margin: "4px 0 0 0" }}>62% Required</p>
          <p style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 600, marginTop: "4px", margin: 0 }}>Standard across junior &amp; intern postings</p>
        </div>

        <div style={{ ...cardStyle, borderLeft: "4px solid #6b38d4", background: "#f8fafc" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", margin: 0 }}>Generative AI &amp; RAG Stack</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#6b38d4", margin: "4px 0 0 0" }}>+75% Surge</p>
          <p style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 600, marginTop: "4px", margin: 0 }}>Vector DB &amp; Groq/OpenAI integrations</p>
        </div>
      </div>

      {/* Insight Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {MOCK_INDUSTRY_INSIGHTS.map((ins) => (
          <div key={ins.id} style={{ ...cardStyle, borderLeft: "4px solid #3525cd" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
                {ins.category}
              </span>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#16a34a" }}>{ins.growthPct}</span>
            </div>

            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.35rem" }}>
              {ins.title}
            </h2>

            <p style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.5, marginBottom: "1rem" }}>
              {ins.description}
            </p>

            <div style={{ background: "#f8fafc", padding: "0.85rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#3525cd", marginBottom: "4px" }}>
                💡 Recommended Action for Campus Students:
              </p>
              <ul style={{ paddingLeft: "1.25rem", margin: 0, fontSize: "0.82rem", color: "#475569" }}>
                {ins.recommendedActions.map((act, idx) => (
                  <li key={idx}>{act}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
