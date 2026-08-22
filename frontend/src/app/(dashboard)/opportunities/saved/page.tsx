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
};

export default function SavedOpportunitiesPage() {
  const [savedJobs, setSavedJobs] = useState<Opportunity[]>([]);
  useEffect(() => { api.getSavedOpportunities().then(setSavedJobs); }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header>
        <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Saved Opportunities</h1>
        <p className="text-body-md" style={{ color: "#464555" }}>Manage and track roles you bookmarked for later application.</p>
      </header>

      {savedJobs.length === 0 ? (
        <div style={{ ...card, textAlign: "center", padding: "3rem" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#c7c4d8" }}>bookmark_border</span>
          <p className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginTop: "1rem" }}>No saved opportunities yet</p>
          <p className="text-body-md" style={{ color: "#464555", marginTop: "4px", marginBottom: "1.25rem" }}>Bookmark jobs to keep track of deadlines and requirements.</p>
          <Link href="/opportunities" className="inline-flex items-center gap-xs text-label-md font-label-md text-white rounded-lg" style={{ padding: "0.625rem 1.5rem", background: "#3525cd" }}>
            Browse Opportunities
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {savedJobs.map((job) => (
            <div
              key={job.id}
              style={{ ...card, transition: "box-shadow 0.2s ease, border-color 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(53,37,205,0.1)"; e.currentTarget.style.borderColor = "#4f46e5"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = card.boxShadow as string; e.currentTarget.style.borderColor = "#c7c4d8"; }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.875rem" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "0.5rem", border: "1px solid #c7c4d8", overflow: "hidden", background: "#fff", flexShrink: 0 }}>
                  <img src={job.companyLogo} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }} />
                </div>
                <div>
                  <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b" }}>
                    <Link href={`/opportunities/${job.id}`}>{job.title}</Link>
                  </h3>
                  <p className="text-body-sm" style={{ color: "#464555" }}>{job.company} &bull; {job.location}</p>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid #e9edff" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 8px", borderRadius: "999px", background: "rgba(233,221,255,0.5)" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "12px", color: "#3525cd" }}>bolt</span>
                  <span className="text-label-sm font-label-sm" style={{ color: "#3525cd" }}>{job.matchScore}% Match</span>
                </div>
                <Link href={`/opportunities/${job.id}`} className="text-label-md font-label-md" style={{ color: "#3525cd" }}>Apply Now →</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
