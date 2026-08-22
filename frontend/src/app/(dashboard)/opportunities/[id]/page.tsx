"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Opportunity } from "@/types";

const card: React.CSSProperties = {
  background: "#fff", border: "1px solid #c7c4d8", borderRadius: "0.75rem",
  padding: "1.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
};

export default function OpportunityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [opp, setOpp] = useState<Opportunity | null>(null);

  useEffect(() => { api.getOpportunityById(id).then((o) => setOpp(o || null)); }, [id]);

  if (!opp) {
    return <div style={{ padding: "2rem", textAlign: "center", color: "#464555" }}>Loading opportunity details...</div>;
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Back */}
      <Link href="/opportunities" className="inline-flex items-center gap-xs text-label-md font-label-md" style={{ color: "#3525cd" }}>
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
        Back to Marketplace
      </Link>

      {/* Header card */}
      <header
        style={{
          ...card,
          display: "flex", flexWrap: "wrap", alignItems: "center",
          justifyContent: "space-between", gap: "1rem",
          borderLeft: "4px solid #4f46e5",
          background: "linear-gradient(135deg, #ebe9ff 0%, #fff 50%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "0.625rem", border: "1px solid #c7c4d8", overflow: "hidden", background: "#fff", flexShrink: 0 }}>
            <img src={opp.companyLogo} alt={opp.company} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "6px" }} />
          </div>
          <div>
            <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>{opp.title}</h1>
            <p className="text-body-md" style={{ color: "#464555" }}>
              {opp.company} &bull; {opp.location} &bull; {opp.salaryOrStipend}
            </p>
          </div>
        </div>
        <Link
          href="/applications"
          className="inline-flex items-center gap-xs text-label-md font-label-md text-white rounded-lg"
          style={{ padding: "0.625rem 1.5rem", background: "#3525cd", whiteSpace: "nowrap" }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>send</span>
          Apply Now
        </Link>
      </header>

      {/* Content grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "start" }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: 0 }}>
          <section style={card}>
            <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>Overview</h2>
            <p className="text-body-md" style={{ color: "#464555", lineHeight: 1.7 }}>{opp.description}</p>
          </section>

          <section style={card}>
            <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>Responsibilities</h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {opp.responsibilities.map((resp, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "#3525cd", marginTop: "2px", flexShrink: 0, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-body-md" style={{ color: "#464555" }}>{resp}</span>
                </li>
              ))}
            </ul>
          </section>

          <section style={card}>
            <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>Required Skills</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {opp.requiredSkills.map((sk) => (
                <span key={sk} className="text-body-sm" style={{ padding: "4px 12px", background: "#e9edff", borderRadius: "999px", color: "#3525cd" }}>{sk}</span>
              ))}
            </div>
          </section>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "220px", flexShrink: 0 }}>
          <section style={{ ...card, textAlign: "center" }}>
            <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.5rem" }}>Skill Match</h2>
            <p className="text-display font-display" style={{ color: "#3525cd" }}>{opp.matchScore}%</p>
            <p className="text-body-sm" style={{ color: "#464555", marginTop: "4px" }}>Your profile matches this role.</p>
            <Link href="/skills/gap-analysis" className="block text-label-sm font-label-sm" style={{ color: "#3525cd", marginTop: "0.75rem" }}>
              Run Gap Diagnostic →
            </Link>
          </section>

          <section style={card}>
            <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>Details</h2>
            {[
              ["Type",     opp.type],
              ["Deadline", opp.deadline ?? "Rolling"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                <span className="text-label-sm" style={{ color: "#777587" }}>{k}</span>
                <span className="text-label-sm font-label-sm" style={{ color: "#141b2b" }}>{v}</span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
