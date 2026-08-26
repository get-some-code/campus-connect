"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { COMPANIES, Company, getStoredQuestions, InterviewQuestion } from "@/lib/companyQuestionsData";

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

export default function StudentCompanyPrepHubPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [allQuestions, setAllQuestions] = useState<InterviewQuestion[]>([]);

  useEffect(() => {
    setAllQuestions(getStoredQuestions());
  }, []);

  const getQuestionCountForCompany = (compId: string) => {
    return allQuestions.filter((q) => q.companyId.toLowerCase() === compId.toLowerCase()).length;
  };

  const alumniContributedCount = allQuestions.filter((q) => q.isAlumniContributed).length;

  const filteredCompanies = COMPANIES.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.roles.some((r) => r.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || comp.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
              STUDENT PREPARATION PORTAL
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Company-Wise Interview Preparation</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>
            Practice real, alumni-contributed interview questions categorized by company, role, and technical round.
          </p>
        </div>

        <Link
          href="/alumni/interview-questions"
          style={{
            padding: "0.5rem 1rem",
            background: "#f1f3ff",
            color: "#3525cd",
            borderRadius: "0.5rem",
            fontWeight: 700,
            fontSize: "0.85rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>add_circle</span>
          Contribute a Question (Alumni View) →
        </Link>
      </header>

      {/* Metrics Banner */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        <div style={{ ...cardStyle, textAlign: "center", background: "#f8fafc" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", margin: 0 }}>Target Companies</p>
          <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#3525cd", margin: "4px 0 0 0" }}>20 Top Companies</p>
        </div>

        <div style={{ ...cardStyle, textAlign: "center", background: "#f8fafc" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", margin: 0 }}>Practice Questions</p>
          <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#16a34a", margin: "4px 0 0 0" }}>
            {allQuestions.length} Questions
          </p>
        </div>

        <div style={{ ...cardStyle, textAlign: "center", background: "#f8fafc" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", margin: 0 }}>Alumni Contributions</p>
          <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#6b38d4", margin: "4px 0 0 0" }}>
            {alumniContributedCount} Alumni Questions
          </p>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <section style={{ ...cardStyle, padding: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
          <span className="material-symbols-outlined" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#777587", fontSize: "18px" }}>
            search
          </span>
          <input
            type="text"
            placeholder="Search company (Amazon, Google, Microsoft) or role (SDE, DevOps)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "0.45rem 0.75rem 0.45rem 2.25rem",
              borderRadius: "0.5rem",
              border: "1.5px solid #c7c4d8",
              fontSize: "0.85rem",
              outline: "none",
            }}
          />
        </div>

        {/* Category Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {["All", "Big Tech", "Consulting & Finance", "Services & Enterprise", "E-Commerce & Retail"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: "0.375rem",
                border: "none",
                background: selectedCategory === cat ? "#3525cd" : "#f1f3ff",
                color: selectedCategory === cat ? "#fff" : "#464555",
                fontWeight: selectedCategory === cat ? 700 : 500,
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Companies Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "1.25rem" }}>
        {filteredCompanies.map((comp) => {
          const qCount = getQuestionCountForCompany(comp.id);
          const hasAlumniContrib = allQuestions.some(
            (q) => q.companyId.toLowerCase() === comp.id.toLowerCase() && q.isAlumniContributed
          );

          return (
            <div key={comp.id} style={cardStyle}>
              <div>
                {/* Top Badge Row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", background: "#f1f3ff", color: "#3525cd" }}>
                    {comp.category}
                  </span>

                  <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#dcfce7", color: "#15803d" }}>
                    {qCount} Questions
                  </span>
                </div>

                {/* Header */}
                <div style={{ display: "flex", gap: "0.875rem", alignItems: "center", marginBottom: "0.85rem" }}>
                  <img
                    src={comp.logo}
                    alt={comp.name}
                    style={{ width: "48px", height: "48px", borderRadius: "0.5rem", objectFit: "cover", border: "1px solid #e2e8f0", flexShrink: 0 }}
                  />
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#141b2b", margin: 0 }}>
                      {comp.name}
                    </h3>
                    <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "2px 0 0 0", fontWeight: 600 }}>
                      Difficulty: <span style={{ color: "#3525cd" }}>{comp.difficultySummary}</span>
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.4, marginBottom: "0.85rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {comp.description}
                </p>

                {/* Roles Tags */}
                <div style={{ marginBottom: "1rem" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {comp.roles.map((r) => (
                      <span key={r} style={{ fontSize: "0.7rem", padding: "2px 6px", background: "#f8fafc", color: "#334155", border: "1px solid #e2e8f0", borderRadius: "4px", fontWeight: 600 }}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Alumni Attribution Notice */}
                {hasAlumniContrib && (
                  <div style={{ background: "#f0fdf4", padding: "6px 8px", borderRadius: "4px", border: "1px solid #bbf7d0", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#16a34a" }}>verified</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#15803d" }}>Includes Alumni-Contributed Questions</span>
                  </div>
                )}
              </div>

              {/* Start Practice Action */}
              <div style={{ borderTop: "1px solid #e9edff", paddingTop: "0.75rem" }}>
                <Link
                  href={`/interview-prep/${comp.id}`}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.55rem",
                    background: "#3525cd",
                    borderRadius: "0.375rem",
                    textAlign: "center",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#fff",
                    textDecoration: "none",
                    boxShadow: "0 2px 6px rgba(53, 37, 205, 0.2)",
                  }}
                >
                  Start Practice ({qCount} Qs) →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
