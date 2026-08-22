"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Opportunity } from "@/types";

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

export default function OpportunitiesMarketplace() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filter, setFilter] = useState<"all" | "internship" | "fulltime">("all");

  useEffect(() => { api.getOpportunities().then(setOpportunities); }, []);

  const filtered = opportunities.filter(
    (o) => filter === "all" || (filter === "internship" ? o.type === "Internship" : o.type === "Full-time")
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "0.75rem" }}>
        <div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Opportunity Marketplace</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>Find full-time jobs and internships tailored to your skill benchmarks.</p>
        </div>
        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: "4px", background: "#e9edff", borderRadius: "0.5rem", padding: "4px" }}>
          {(["all", "internship", "fulltime"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-label-sm font-label-sm rounded-md"
              style={{
                padding: "0.3rem 0.875rem",
                background: filter === f ? "#fff" : "transparent",
                color: filter === f ? "#3525cd" : "#464555",
                boxShadow: filter === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              {f === "all" ? "All" : f === "internship" ? "Internships" : "Full-Time"}
            </button>
          ))}
        </div>
      </header>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1rem" }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", color: "#464555" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#c7c4d8" }}>work_outline</span>
            <p className="text-body-md" style={{ marginTop: "8px" }}>No opportunities found.</p>
          </div>
        ) : filtered.map((opp) => (
          <article
            key={opp.id}
            style={{ ...card, transition: "box-shadow 0.2s ease, border-color 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(53,37,205,0.1)"; e.currentTarget.style.borderColor = "#4f46e5"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = card.boxShadow as string; e.currentTarget.style.borderColor = "#c7c4d8"; }}
          >
            {/* Top */}
            <div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.875rem" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "0.5rem", border: "1px solid #c7c4d8", overflow: "hidden", background: "#fff", flexShrink: 0 }}>
                  <img src={opp.companyLogo} alt={opp.company} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", lineHeight: 1.3 }}>
                    <Link href={`/opportunities/${opp.id}`}>{opp.title}</Link>
                  </h3>
                  <p className="text-body-sm" style={{ color: "#464555" }}>{opp.company} &bull; {opp.location}</p>
                </div>
              </div>

              {/* Match badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 10px", borderRadius: "999px", background: "rgba(233,221,255,0.5)", marginBottom: "0.875rem" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "13px", color: "#3525cd" }}>bolt</span>
                <span className="text-label-sm font-label-sm" style={{ color: "#3525cd" }}>{opp.matchScore}% Match</span>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: "0.875rem" }}>
                <span className="text-label-sm" style={{ color: "#777587", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>Required Skills</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {opp.requiredSkills.slice(0, 4).map((sk) => (
                    <span key={sk} className="text-body-sm" style={{ padding: "2px 8px", background: "#e9edff", borderRadius: "4px", color: "#141b2b" }}>{sk}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ borderTop: "1px solid #e9edff", paddingTop: "0.75rem" }}>
              <Link
                href={`/opportunities/${opp.id}`}
                className="flex items-center justify-center gap-xs text-label-md font-label-md rounded-lg w-full"
                style={{ padding: "0.5rem", border: "1px solid #c7c4d8", color: "#141b2b", transition: "background 0.15s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f3ff")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                View Details
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
