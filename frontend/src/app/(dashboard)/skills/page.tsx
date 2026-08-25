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
  const [showAddForm, setShowAddForm] = useState(false);
  const [showExtractor, setShowExtractor] = useState(false);

  // New Skill form state
  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState<"Technical" | "Soft" | "Domain">("Technical");
  const [currentLevel, setCurrentLevel] = useState(3);
  const [targetLevel, setTargetLevel] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Skill extractor state
  const [resumeText, setResumeText] = useState("");
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);

  const loadSkills = async () => {
    const data = await api.getSkills();
    setSkills(data);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;
    setIsSubmitting(true);
    await api.addSkill({
      name: skillName.trim(),
      category,
      currentLevel,
      targetLevel,
    });
    setSkillName("");
    setIsSubmitting(false);
    setShowAddForm(false);
    await loadSkills();
  };

  const handleExtractSkills = async () => {
    if (!resumeText.trim()) return;
    setIsExtracting(true);
    const found = await api.extractSkills(resumeText);
    setExtractedSkills(found);
    setIsExtracting(false);

    // Auto-add extracted skills to profile
    for (const sk of found) {
      await api.addSkill({ name: sk, category: "Technical", currentLevel: 3, targetLevel: 5 });
    }
    await loadSkills();
  };

  const isPriorityGap = (sk: Skill) => sk.status === "Priority Gap" || (sk.currentLevel / sk.targetLevel) < 0.6;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "0.75rem" }}>
        <div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Skills Matrix & Profile Input</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>
            Add skills or extract them from your resume to dynamically align with job opportunities.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            onClick={() => { setShowAddForm(!showAddForm); setShowExtractor(false); }}
            className="inline-flex items-center gap-xs text-label-md font-label-md text-white rounded-lg"
            style={{ padding: "0.5rem 1rem", background: "#3525cd", cursor: "pointer", border: "none" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>add</span>
            + Add Skill
          </button>
          <button
            onClick={() => { setShowExtractor(!showExtractor); setShowAddForm(false); }}
            className="inline-flex items-center gap-xs text-label-md font-label-md rounded-lg"
            style={{ padding: "0.5rem 1rem", border: "1px solid #3525cd", color: "#3525cd", background: "#f1f3ff", cursor: "pointer" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>document_scanner</span>
            Extract from Resume
          </button>
          <Link
            href="/skills/gap-analysis"
            className="inline-flex items-center gap-xs text-label-md font-label-md rounded-lg"
            style={{ padding: "0.5rem 1rem", border: "1px solid #c7c4d8", color: "#141b2b" }}
          >
            Run Gap Analysis
          </Link>
        </div>
      </header>

      {/* Add Skill Form Panel */}
      {showAddForm && (
        <div style={{ ...card, background: "#f8fafc", border: "2px solid #3525cd" }}>
          <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>
            Add New Skill to Benchmark
          </h3>
          <form onSubmit={handleAddSkill} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#141b2b", marginBottom: "4px" }}>Skill Name</label>
              <input
                type="text"
                placeholder="e.g. Docker, PyTorch, GraphQL"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8" }}
                required
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#141b2b", marginBottom: "4px" }}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8" }}
              >
                <option value="Technical">Technical</option>
                <option value="Soft">Soft Skill</option>
                <option value="Domain">Domain Knowledge</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#141b2b", marginBottom: "4px" }}>Current Level (1 to 5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={currentLevel}
                onChange={(e) => setCurrentLevel(parseInt(e.target.value))}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#141b2b", marginBottom: "4px" }}>Target Level (1 to 5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={targetLevel}
                onChange={(e) => setTargetLevel(parseInt(e.target.value))}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8" }}
              />
            </div>
            <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                style={{ padding: "0.5rem 1rem", border: "1px solid #c7c4d8", borderRadius: "0.375rem", background: "#fff", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ padding: "0.5rem 1.25rem", background: "#3525cd", color: "#fff", border: "none", borderRadius: "0.375rem", cursor: "pointer", fontWeight: 600 }}
              >
                {isSubmitting ? "Saving..." : "Save Skill"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Resume Skill Extractor Panel */}
      {showExtractor && (
        <div style={{ ...card, background: "#fdf8ff", border: "2px solid #a855f7" }}>
          <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.5rem" }}>
            Paste Bio or Resume Text to Auto-Extract Skills
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#464555", marginBottom: "0.75rem" }}>
            Our NLP backend engine will parse your input text, identify technical skills, and automatically update your profile benchmark.
          </p>
          <textarea
            rows={4}
            placeholder="Paste resume content, project descriptions, or bio... e.g. Experienced in building microservices with Python, FastAPI, Docker, and AWS."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            style={{ width: "100%", padding: "0.75rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", marginBottom: "0.75rem" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {extractedSkills.length > 0 ? (
              <p style={{ fontSize: "0.85rem", color: "#16a34a", fontWeight: 600 }}>
                ✅ Auto-extracted & added: {extractedSkills.join(", ")}
              </p>
            ) : <div />}
            <button
              type="button"
              onClick={handleExtractSkills}
              disabled={isExtracting}
              style={{ padding: "0.5rem 1.25rem", background: "#a855f7", color: "#fff", border: "none", borderRadius: "0.375rem", cursor: "pointer", fontWeight: 600 }}
            >
              {isExtracting ? "Extracting..." : "Run Skill Extractor"}
            </button>
          </div>
        </div>
      )}

      {/* Skill cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {skills.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", color: "#464555" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#c7c4d8" }}>terminal</span>
            <p className="text-body-md" style={{ marginTop: "8px" }}>Loading skills from FastAPI backend...</p>
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
                  <span className="text-label-sm" style={{ color: "#464555" }}>Level {skill.currentLevel} of {skill.targetLevel}</span>
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
