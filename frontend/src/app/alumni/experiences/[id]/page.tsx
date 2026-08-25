"use client";

import { use } from "react";
import Link from "next/link";
import { MOCK_CAREER_EXPERIENCES } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function CareerExperienceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const exp = MOCK_CAREER_EXPERIENCES.find((e) => e.id === id) || MOCK_CAREER_EXPERIENCES[0];

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Link href="/alumni/experiences" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.85rem", color: "#3525cd", fontWeight: 600, textDecoration: "none" }}>
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
        Back to All Experiences
      </Link>

      {/* Header */}
      <section style={{ ...cardStyle, borderLeft: "5px solid #3525cd" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 800, padding: "3px 10px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
            {exp.experienceType} GUIDE
          </span>
          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{exp.readTime} &bull; Published {exp.publishedDate}</span>
        </div>

        <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b", marginBottom: "1rem" }}>
          {exp.title}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", borderTop: "1px solid #e9edff", paddingTop: "0.85rem" }}>
          <img src={exp.authorAvatar} alt={exp.authorName} style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid #3525cd" }} />
          <div>
            <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>{exp.authorName}</p>
            <p style={{ fontSize: "0.8rem", color: "#475569", margin: 0 }}>
              {exp.authorRole} @ <strong>{exp.companyName}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Overview */}
      <section style={cardStyle}>
        <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.5rem" }}>
          Overview &amp; Expectations
        </h2>
        <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.6, margin: 0 }}>
          {exp.sections.overview}
        </p>
      </section>

      {/* Section 2: Hiring Process */}
      <section style={cardStyle}>
        <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>
          Hiring Process Breakdown
        </h2>
        <ul style={{ paddingLeft: "1.25rem", margin: 0, fontSize: "0.9rem", color: "#334155" }}>
          {exp.sections.hiringProcess.map((round, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem", lineHeight: 1.5 }}>
              <strong>{round}</strong>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 3: Assessment & Technical Rounds */}
      {exp.sections.assessmentRounds && exp.sections.assessmentRounds.length > 0 && (
        <section style={cardStyle}>
          <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "1rem" }}>
            Technical &amp; Coding Round Deep Dive
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {exp.sections.assessmentRounds.map((rnd, idx) => (
              <div key={idx} style={{ background: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#3525cd", margin: "0 0 4px 0" }}>{rnd.roundName}</h3>
                <p style={{ fontSize: "0.85rem", color: "#334155", margin: "0 0 8px 0" }}>{rnd.description}</p>
                <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#141b2b", margin: "0 0 4px 0" }}>Sample Questions Asked:</p>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, fontSize: "0.82rem", color: "#475569" }}>
                  {rnd.keyQuestions.map((q, qIdx) => (
                    <li key={qIdx}>{q}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 4: Preparation & Advice */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        <div style={cardStyle}>
          <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.5rem" }}>
            Preparation Strategy
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#334155", lineHeight: 1.5, margin: 0 }}>
            {exp.sections.preparationStrategy}
          </p>
        </div>

        <div style={cardStyle}>
          <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.5rem" }}>
            Mistakes to Avoid
          </h3>
          <ul style={{ paddingLeft: "1.25rem", margin: 0, fontSize: "0.82rem", color: "#dc2626" }}>
            {exp.sections.mistakesToAvoid.map((m, idx) => (
              <li key={idx} style={{ marginBottom: "4px" }}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
