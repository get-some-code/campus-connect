"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Skill } from "@/types";

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
};

const courses = [
  { title: "System Design Primer & Microservices", duration: "4 hrs", badge: "Certificate" },
  { title: "FastAPI & Async Python Mastery", duration: "3 hrs", badge: "Certificate" },
  { title: "Docker & Container Orchestration", duration: "2.5 hrs", badge: "Badge" },
  { title: "AWS Cloud Fundamentals", duration: "5 hrs", badge: "Certificate" },
];

export default function SkillGapAnalysisPage() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    api.getSkills().then(setSkills);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header>
        <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Skill Gap Analysis Engine</h1>
        <p className="text-body-md" style={{ color: "#464555" }}>
          Real-time diagnostic comparison calculated from your active skill profile against target job role benchmarks.
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
        {/* Gap chart */}
        <div style={{ ...card, gridColumn: "span 2" }}>
          <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "1rem" }}>
            Software & Cloud Engineering Role Benchmark
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {skills.length === 0 ? (
              <p style={{ color: "#464555" }}>Loading skill benchmarks...</p>
            ) : (
              skills.map((item) => {
                const pct = Math.round((item.currentLevel / item.targetLevel) * 100);
                const isGap = pct < 60 || item.status === "Priority Gap";
                return (
                  <div key={item.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <div>
                        <p className="text-body-md font-label-md" style={{ color: "#141b2b", fontWeight: 500 }}>{item.name}</p>
                        {isGap && <p className="text-label-sm" style={{ color: "#ba1a1a" }}>⚠️ Priority Skill Gap Detected</p>}
                      </div>
                      <span
                        className="text-label-sm font-label-sm"
                        style={{
                          padding: "3px 10px", borderRadius: "999px", whiteSpace: "nowrap",
                          background: isGap ? "#ffdad6" : "rgba(233,221,255,0.5)",
                          color: isGap ? "#93000a" : "#3525cd",
                        }}
                      >
                        {pct}% Level Alignment
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
              })
            )}
          </div>
        </div>

        {/* Recommended Upskilling Courses */}
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
            style={{ padding: "0.625rem", background: "#3525cd", textAlign: "center" }}
          >
            Explore Aligned Opportunities
          </Link>
        </div>
      </div>
    </div>
  );
}
