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

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => { api.getSkills().then(setSkills); }, []);

  const isPriorityGap = (sk: Skill) => sk.status === "Priority Gap" || (sk.currentLevel / sk.targetLevel) < 0.6;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "0.75rem" }}>
        <div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Skills Matrix</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>Benchmark your technical capabilities against industry standards.</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link
            href="/skills/assessment"
            className="inline-flex items-center gap-xs text-label-md font-label-md text-white rounded-lg"
            style={{ padding: "0.5rem 1rem", background: "#3525cd" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>quiz</span>
            Take Skill Test
          </Link>
          <Link
            href="/skills/gap-analysis"
            className="inline-flex items-center gap-xs text-label-md font-label-md rounded-lg"
            style={{ padding: "0.5rem 1rem", border: "1px solid #c7c4d8", color: "#141b2b" }}
          >
            Run Gap Analysis
          </Link>
        </div>
      </header>

      {/* Skill cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {skills.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", color: "#464555" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#c7c4d8" }}>terminal</span>
            <p className="text-body-md" style={{ marginTop: "8px" }}>Loading skills...</p>
          </div>
        ) : skills.map((skill) => {
          const pct = Math.round((skill.currentLevel / skill.targetLevel) * 100);
          const gap = isPriorityGap(skill);
          return (
            <div key={skill.id} style={{ ...card, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b" }}>{skill.name}</h3>
                  <p className="text-body-sm" style={{ color: "#464555" }}>{skill.categoryLabel ?? skill.category}</p>
                </div>
                <span
                  className="text-label-sm font-label-sm"
                  style={{
                    padding: "3px 10px",
                    borderRadius: "999px",
                    background: gap ? "#ffdad6" : "rgba(233,221,255,0.5)",
                    color: gap ? "#93000a" : "#3525cd",
                    whiteSpace: "nowrap",
                  }}
                >
                  {skill.status ?? `Lv ${skill.currentLevel}/${skill.targetLevel}`}
                </span>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span className="text-label-sm" style={{ color: "#464555" }}>Progress</span>
                  <span className="text-label-sm font-label-sm" style={{ color: gap ? "#ba1a1a" : "#3525cd" }}>{pct}%</span>
                </div>
                <div style={{ width: "100%", height: "8px", background: "#e9edff", borderRadius: "999px", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${pct}%`, height: "100%", borderRadius: "999px",
                      background: gap ? "linear-gradient(90deg,#ba1a1a,#ef4444)" : "linear-gradient(90deg,#3525cd,#4f46e5)",
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
