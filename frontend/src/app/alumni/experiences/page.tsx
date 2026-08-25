"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_CAREER_EXPERIENCES, MOCK_COMPANY_GUIDES } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function AlumniExperiencesPage() {
  const [filterType, setFilterType] = useState("all");
  const companyKeys = Object.keys(MOCK_COMPANY_GUIDES);

  const filteredExperiences = MOCK_CAREER_EXPERIENCES.filter((exp) => {
    if (filterType === "all") return true;
    return exp.experienceType.toLowerCase() === filterType.toLowerCase();
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Alumni Career Experiences &amp; Guides</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>
            Real interview round breakdowns, preparation strategies, and career transition stories shared by alumni.
          </p>
        </div>
      </header>

      {/* Company Guides Spotlight Bar */}
      <section style={cardStyle}>
        <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>
          Company Hiring Guides &amp; Process Guides
        </h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {companyKeys.map((compKey) => {
            const guide = MOCK_COMPANY_GUIDES[compKey];
            return (
              <Link
                key={compKey}
                href={`/alumni/experiences/company/${compKey}`}
                style={{
                  flex: "1 1 240px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.625rem",
                  padding: "1rem",
                  textDecoration: "none",
                  color: "#141b2b",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  transition: "border-color 0.15s ease",
                }}
              >
                <img src={guide.companyLogo} alt={guide.companyName} style={{ width: "42px", height: "42px", borderRadius: "0.5rem", objectFit: "cover" }} />
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0, color: "#141b2b" }}>{guide.companyName}</h3>
                  <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "2px 0 0 0" }}>
                    {guide.rounds.length} Hiring Rounds &bull; {guide.totalExperiencesCount} Stories
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {["all", "interview", "hiring process", "first job", "promotion"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "0.5rem",
              border: `1px solid ${filterType === type ? "#3525cd" : "#c7c4d8"}`,
              background: filterType === type ? "#3525cd" : "#fff",
              color: filterType === type ? "#fff" : "#141b2b",
              fontWeight: filterType === type ? 700 : 500,
              fontSize: "0.82rem",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {type === "all" ? "All Stories" : type}
          </button>
        ))}
      </div>

      {/* Experiences Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
        {filteredExperiences.map((exp) => (
          <div key={exp.id} style={{ ...cardStyle, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
                  {exp.experienceType}
                </span>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{exp.readTime}</span>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem" }}>
                <img src={exp.companyLogo} alt={exp.companyName} style={{ width: "36px", height: "36px", borderRadius: "0.375rem", objectFit: "cover" }} />
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>{exp.companyName}</p>
                  <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}>Difficulty: {exp.difficulty}</p>
                </div>
              </div>

              <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem", lineHeight: 1.4 }}>
                <Link href={`/alumni/experiences/${exp.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {exp.title}
                </Link>
              </h2>

              <p style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.5, marginBottom: "1rem" }}>
                {exp.summary}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "1rem" }}>
                {exp.skillsTested.map((s) => (
                  <span key={s} style={{ fontSize: "0.72rem", padding: "2px 6px", background: "#f1f3ff", color: "#3525cd", borderRadius: "4px", fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: "1px solid #e9edff", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <img src={exp.authorAvatar} alt={exp.authorName} style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover" }} />
                <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#334155" }}>{exp.authorName}</span>
              </div>

              <Link href={`/alumni/experiences/${exp.id}`} style={{ fontSize: "0.8rem", fontWeight: 700, color: "#3525cd", textDecoration: "none" }}>
                Read Experience &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
