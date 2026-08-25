"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Opportunity } from "@/types";
import AtsScannerModal from "@/components/ats/AtsScannerModal";

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

type ExtendedOpportunity = Opportunity & {
  source?: string;
  jobUrl?: string;
};

export default function OpportunitiesMarketplace() {
  const [opportunities, setOpportunities] = useState<ExtendedOpportunity[]>([]);
  const [typeFilter, setTypeFilter] = useState<"all" | "internship" | "fulltime">("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | "linkedin" | "indeed" | "internshala">("all");
  const [atsModalOpp, setAtsModalOpp] = useState<ExtendedOpportunity | null>(null);

  useEffect(() => {
    api.getOpportunities().then((data) => setOpportunities(data as ExtendedOpportunity[]));
  }, []);

  const filtered = opportunities.filter((o) => {
    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "internship" ? o.type === "Internship" : o.type === "Full-time");
    
    const matchesSource =
      sourceFilter === "all" ||
      (o.source && o.source.toLowerCase() === sourceFilter.toLowerCase());

    return matchesType && matchesSource;
  });

  const getSourceBadgeStyle = (src?: string) => {
    const s = src?.toLowerCase();
    if (s === "linkedin") return { background: "#e8f4fd", color: "#0a66c2", border: "1px solid #70b5f9" };
    if (s === "indeed") return { background: "#f0f0ff", color: "#2557a7", border: "1px solid #a3b8f0" };
    if (s === "internshala") return { background: "#fff5e6", color: "#008bdc", border: "1px solid #ffa500" };
    return { background: "#e9edff", color: "#3525cd", border: "1px solid #c7c4d8" };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <header style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Title & Action Button */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Opportunity Marketplace</h1>
            <p className="text-body-md" style={{ color: "#464555", marginTop: "2px" }}>
              Aggregated live listings from <strong>LinkedIn</strong>, <strong>Indeed</strong>, and <strong>Internshala</strong> aligned with your skill profile.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAtsModalOpp(opportunities[0] || null)}
            style={{
              padding: "0.625rem 1.25rem",
              background: "#3525cd",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 2px 6px rgba(53, 37, 205, 0.2)",
              whiteSpace: "nowrap",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>document_scanner</span>
            Scan Resume with ATS
          </button>
        </div>

        {/* Filter Tabs Row */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
          {/* Source Tabs */}
          <div style={{ display: "flex", gap: "4px", background: "#f1f3ff", borderRadius: "0.5rem", padding: "4px", border: "1px solid #c7c4d8" }}>
            {(["all", "linkedin", "indeed", "internshala"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSourceFilter(s)}
                className="text-label-sm font-label-sm rounded-md"
                style={{
                  padding: "0.35rem 0.85rem",
                  background: sourceFilter === s ? "#fff" : "transparent",
                  color: sourceFilter === s ? "#3525cd" : "#464555",
                  fontWeight: sourceFilter === s ? 600 : 400,
                  boxShadow: sourceFilter === s ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s ease",
                  textTransform: "capitalize",
                }}
              >
                {s === "all" ? "All Platforms" : s}
              </button>
            ))}
          </div>

          {/* Type Tabs */}
          <div style={{ display: "flex", gap: "4px", background: "#e9edff", borderRadius: "0.5rem", padding: "4px" }}>
            {(["all", "internship", "fulltime"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className="text-label-sm font-label-sm rounded-md"
                style={{
                  padding: "0.35rem 0.85rem",
                  background: typeFilter === f ? "#fff" : "transparent",
                  color: typeFilter === f ? "#3525cd" : "#464555",
                  boxShadow: typeFilter === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                {f === "all" ? "All Types" : f === "internship" ? "Internships" : "Full-Time"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "1rem" }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", color: "#464555" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#c7c4d8" }}>work_outline</span>
            <p className="text-body-md" style={{ marginTop: "8px" }}>No opportunities match the selected filters.</p>
          </div>
        ) : filtered.map((opp) => (
          <article
            key={opp.id}
            style={{ ...card, transition: "box-shadow 0.2s ease, border-color 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(53,37,205,0.1)"; e.currentTarget.style.borderColor = "#4f46e5"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = card.boxShadow as string; e.currentTarget.style.borderColor = "#c7c4d8"; }}
          >
            {/* Top Header */}
            <div>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.5rem" }}>
                {/* Platform Badge */}
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    ...getSourceBadgeStyle(opp.source),
                  }}
                >
                  {opp.source || "Aggregated"}
                </span>
                
                {/* Match Score Badge */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 8px", borderRadius: "999px", background: "rgba(233,221,255,0.8)" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "13px", color: "#3525cd" }}>bolt</span>
                  <span className="text-label-sm font-label-sm" style={{ color: "#3525cd", fontWeight: 700 }}>{opp.matchScore}% Match</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.875rem", marginTop: "0.5rem" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "0.5rem", border: "1px solid #c7c4d8", overflow: "hidden", background: "#fff", flexShrink: 0 }}>
                  <img src={opp.companyLogo} alt={opp.company} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", lineHeight: 1.3, fontSize: "1.05rem" }}>
                    <Link href={`/opportunities/${opp.id}`}>{opp.title}</Link>
                  </h3>
                  <p className="text-body-sm" style={{ color: "#464555", marginTop: "2px" }}>{opp.company} &bull; {opp.location}</p>
                </div>
              </div>

              {/* Compensation */}
              <p style={{ fontSize: "0.85rem", color: "#16a34a", fontWeight: 600, marginBottom: "0.75rem" }}>
                💰 {opp.salaryOrStipend}
              </p>

              {/* Skills & Gaps */}
              <div style={{ marginBottom: "0.875rem" }}>
                <span className="text-label-sm" style={{ color: "#777587", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>Required Skills</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {opp.requiredSkills.slice(0, 5).map((sk) => (
                    <span key={sk} className="text-body-sm" style={{ padding: "2px 8px", background: "#e9edff", borderRadius: "4px", color: "#141b2b", fontSize: "0.78rem" }}>{sk}</span>
                  ))}
                </div>

                {opp.missingSkills && opp.missingSkills.length > 0 && (
                  <div style={{ marginTop: "8px" }}>
                    <span className="text-label-sm" style={{ color: "#dc2626", fontSize: "0.72rem", fontWeight: 600 }}>
                      ⚠️ Missing Skill Gaps: {opp.missingSkills.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div style={{ borderTop: "1px solid #e9edff", paddingTop: "0.75rem" }}>
              <Link
                href={`/opportunities/${opp.id}`}
                className="flex items-center justify-center gap-xs text-label-md font-label-md rounded-lg w-full"
                style={{ padding: "0.5rem", border: "1px solid #c7c4d8", color: "#141b2b", transition: "background 0.15s ease", textAlign: "center" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f3ff")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Global ATS Modal */}
      {atsModalOpp && (
        <AtsScannerModal
          isOpen={!!atsModalOpp}
          onClose={() => setAtsModalOpp(null)}
          opportunityId={atsModalOpp.id}
          jobTitle={atsModalOpp.title}
          company={atsModalOpp.company}
        />
      )}
    </div>
  );
}
