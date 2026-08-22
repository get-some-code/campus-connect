"use client";

import Link from "next/link";

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
};

const skills = [
  { name: "Frontend Architecture", score: 88, label: "Advanced" },
  { name: "Backend REST API & FastAPI", score: 82, label: "Proficient" },
  { name: "System Design", score: 65, label: "Intermediate" },
  { name: "TypeScript & React", score: 91, label: "Advanced" },
];

export default function ReadinessPortalPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header>
        <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Readiness Portal</h1>
        <p className="text-body-md" style={{ color: "#464555" }}>Real-time candidate diagnostic telemetry &amp; skill metrics.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
        {/* Skill Diagnostics */}
        <div style={{ ...card, gridColumn: "span 2" }}>
          <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "1rem" }}>Skill Assessment Diagnostics</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {skills.map((sk) => (
              <div key={sk.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span className="text-body-sm" style={{ color: "#141b2b" }}>{sk.name}</span>
                  <span className="text-body-sm font-label-md" style={{ color: "#3525cd", fontWeight: 600 }}>
                    {sk.score}% ({sk.label})
                  </span>
                </div>
                <div style={{ width: "100%", height: "8px", background: "#e9edff", borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ width: `${sk.score}%`, height: "100%", background: "linear-gradient(90deg,#3525cd,#4f46e5)", borderRadius: "999px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={card}>
          <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "1rem" }}>Quick Actions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Link
              href="/skills/assessment"
              className="flex items-center justify-center gap-xs text-label-md font-label-md text-white rounded-lg"
              style={{ padding: "0.625rem", background: "#3525cd" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>quiz</span>
              Start Assessment
            </Link>
            <Link
              href="/skills/gap-analysis"
              className="flex items-center justify-center gap-xs text-label-md font-label-md rounded-lg"
              style={{ padding: "0.625rem", border: "1px solid #c7c4d8", color: "#141b2b" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>analytics</span>
              Run Gap Analysis
            </Link>
            <Link
              href="/opportunities"
              className="flex items-center justify-center gap-xs text-label-md font-label-md rounded-lg"
              style={{ padding: "0.625rem", border: "1px solid #c7c4d8", color: "#141b2b" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>work</span>
              Browse Opportunities
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
