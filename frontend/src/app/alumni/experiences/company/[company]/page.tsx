"use client";

import { use } from "react";
import Link from "next/link";
import { MOCK_COMPANY_GUIDES } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function CompanyExperienceGuidePage({ params }: { params: Promise<{ company: string }> }) {
  const { company } = use(params);
  const formattedKey = Object.keys(MOCK_COMPANY_GUIDES).find(
    (k) => k.toLowerCase() === company.toLowerCase()
  ) || "TechNova";
  const guide = MOCK_COMPANY_GUIDES[formattedKey];

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Link href="/alumni/experiences" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.85rem", color: "#3525cd", fontWeight: 600, textDecoration: "none" }}>
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
        Back to Experiences Hub
      </Link>

      {/* Header Banner */}
      <section style={{ ...cardStyle, background: "linear-gradient(135deg, #ebe9ff 0%, #ffffff 60%)", borderLeft: "5px solid #3525cd" }}>
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
          <img src={guide.companyLogo} alt={guide.companyName} style={{ width: "64px", height: "64px", borderRadius: "0.625rem", objectFit: "cover", border: "2px solid #3525cd" }} />
          <div>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#3525cd", color: "#fff" }}>
              COMPANY HIRING GUIDE &bull; MOCK DATA DEMO
            </span>
            <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b", margin: "2px 0 0 0" }}>
              {guide.companyName}
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#475569", margin: "2px 0 0 0" }}>
              Industry: {guide.industry} &bull; HQ: {guide.headquarters}
            </p>
          </div>
        </div>

        <p style={{ fontSize: "0.88rem", color: "#334155", marginTop: "1rem", lineHeight: 1.5 }}>
          {guide.hiringOverview}
        </p>
      </section>

      {/* Hiring Rounds */}
      <section style={cardStyle}>
        <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "1rem" }}>
          Standard Hiring Round Process ({guide.rounds.length} Rounds)
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {guide.rounds.map((rnd) => (
            <div key={rnd.roundNumber} style={{ background: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#3525cd", color: "#fff", fontWeight: 800, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                R{rnd.roundNumber}
              </div>
              <div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>{rnd.title}</h3>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 6px", background: "#e0e7ff", color: "#3525cd", borderRadius: "4px" }}>
                    Focus: {rnd.focus}
                  </span>
                </div>
                <p style={{ fontSize: "0.82rem", color: "#475569", marginTop: "4px", margin: 0, lineHeight: 1.4 }}>
                  {rnd.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commonly Tested Skills & Advice */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        <div style={cardStyle}>
          <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>
            Commonly Tested Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {guide.commonlyTestedSkills.map((s) => (
              <span key={s} style={{ fontSize: "0.8rem", padding: "4px 10px", background: "#f1f3ff", color: "#3525cd", borderRadius: "4px", fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>
            Key Advice From Alumni
          </h3>
          <ul style={{ paddingLeft: "1.25rem", margin: 0, fontSize: "0.85rem", color: "#334155" }}>
            {guide.adviceFromAlumni.map((adv, idx) => (
              <li key={idx} style={{ marginBottom: "4px" }}>{adv}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
