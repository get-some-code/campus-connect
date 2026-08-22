"use client";

import Link from "next/link";

const gapData = [
  { name: "FastAPI & Async Python",            yours: 90, target: 100, status: "good" },
  { name: "Frontend Architecture (React/Next)", yours: 88, target: 100, status: "good" },
  { name: "System Design & Distributed Caching",yours: 45, target: 85,  status: "gap"  },
  { name: "SQL & Database Indexing",            yours: 60, target: 80,  status: "gap"  },
];

const courses = [
  { title: "System Design Primer", duration: "4 hrs", badge: "Certificate" },
  { title: "Advanced SQL Mastery",  duration: "3 hrs", badge: "Certificate" },
  { title: "Redis & Caching Strategies", duration: "2 hrs", badge: "Badge" },
];

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
};

export default function SkillGapAnalysisPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header>
        <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Skill Gap Analysis</h1>
        <p className="text-body-md" style={{ color: "#464555" }}>Diagnostic comparison between your current profile and target job roles.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
        {/* Gap chart */}
        <div style={{ ...card, gridColumn: "span 2" }}>
          <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "1rem" }}>Software Engineering Role Benchmark</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {gapData.map((item) => {
              const isGap = item.status === "gap";
              const pct = Math.round((item.yours / item.target) * 100);
              return (
                <div key={item.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <div>
                      <p className="text-body-md font-label-md" style={{ color: "#141b2b", fontWeight: 500 }}>{item.name}</p>
                      {isGap && <p className="text-label-sm" style={{ color: "#ba1a1a" }}>⚠ Priority Gap Detected</p>}
                    </div>
                    <span
                      className="text-label-sm font-label-sm"
                      style={{
                        padding: "3px 10px", borderRadius: "999px", whiteSpace: "nowrap",
                        background: isGap ? "#ffdad6" : "rgba(233,221,255,0.5)",
                        color: isGap ? "#93000a" : "#3525cd",
                      }}
                    >
                      {pct}% Match
                    </span>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "#e9edff", borderRadius: "999px", overflow: "hidden" }}>
                    <div style={{
                      width: `${pct}%`, height: "100%", borderRadius: "999px",
                      background: isGap ? "linear-gradient(90deg,#ba1a1a,#ef4444)" : "linear-gradient(90deg,#3525cd,#4f46e5)",
                      transition: "width 0.6s ease",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Courses */}
        <div style={card}>
          <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "4px" }}>Recommended Courses</h2>
          <p className="text-body-sm" style={{ color: "#464555", marginBottom: "1rem" }}>Curated modules to close your priority skill gaps.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1rem" }}>
            {courses.map((c) => (
              <div key={c.title} style={{ padding: "0.75rem", border: "1px solid #c7c4d8", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p className="text-label-md font-label-md" style={{ color: "#141b2b", fontWeight: 600 }}>{c.title}</p>
                  <p className="text-label-sm" style={{ color: "#464555" }}>Est. {c.duration} &bull; {c.badge}</p>
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#777587" }}>chevron_right</span>
              </div>
            ))}
          </div>
          <Link
            href="/opportunities"
            className="flex items-center justify-center gap-xs text-label-md font-label-md text-white rounded-lg"
            style={{ padding: "0.625rem", background: "#3525cd" }}
          >
            Explore Opportunities
          </Link>
        </div>
      </div>
    </div>
  );
}
