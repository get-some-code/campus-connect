"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Application } from "@/types";

const STAGES = ["Applied", "Under Review", "Interview", "Selected"] as const;
type Stage = typeof STAGES[number];

const stageColors: Record<Stage, { bg: string; color: string; dot: string }> = {
  "Applied":      { bg: "#e9edff", color: "#3525cd", dot: "#777587" },
  "Under Review": { bg: "#fff3e0", color: "#7a4e00", dot: "#f59e0b" },
  "Interview":    { bg: "rgba(233,221,255,0.6)", color: "#6b38d4", dot: "#6b38d4" },
  "Selected":     { bg: "#c8f4d9", color: "#1a6e43", dot: "#10b981" },
};

export default function ApplicationTrackerPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  useEffect(() => { api.getApplications().then(setApplications); }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "0.75rem" }}>
        <div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Application Tracker</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>Track candidate interview stages and active pipeline status.</p>
        </div>
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-xs text-label-md font-label-md text-white rounded-lg"
          style={{ padding: "0.5rem 1.25rem", background: "#3525cd", whiteSpace: "nowrap" }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>add</span>
          Find New Roles
        </Link>
      </header>

      {/* Kanban board — horizontal scroll */}
      <div style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "1rem" }}>
        {STAGES.map((stage) => {
          const stageApps = applications.filter((a) => a.stage === stage);
          const col = stageColors[stage];
          return (
            <div
              key={stage}
              style={{ minWidth: "280px", width: "300px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}
            >
              {/* Column header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "2px solid #e9edff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: col.dot, display: "inline-block" }} />
                  <span className="text-label-md font-label-md" style={{ color: "#141b2b" }}>{stage}</span>
                </div>
                <span
                  className="text-label-sm font-label-sm"
                  style={{ padding: "1px 8px", borderRadius: "999px", background: col.bg, color: col.color }}
                >
                  {stageApps.length}
                </span>
              </div>

              {/* Cards */}
              {stageApps.length > 0 ? stageApps.map((app) => (
                <div
                  key={app.id}
                  style={{
                    background: "#fff", border: "1px solid #c7c4d8", borderRadius: "0.625rem",
                    padding: "0.875rem", display: "flex", flexDirection: "column", gap: "0.5rem",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)", transition: "box-shadow 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)")}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "0.5rem", border: "1px solid #c7c4d8", overflow: "hidden", background: "#fff" }}>
                      <img src={app.companyLogo} alt={app.companyName} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }} />
                    </div>
                    <span
                      className="text-label-sm font-label-sm"
                      style={{ padding: "2px 8px", borderRadius: "4px", background: col.bg, color: col.color, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" }}
                    >
                      {app.stage}
                    </span>
                  </div>
                  <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b" }}>
                    <Link href={`/applications/${app.id}`} style={{ color: "inherit" }}>{app.opportunityTitle}</Link>
                  </h3>
                  <p className="text-body-sm" style={{ color: "#464555" }}>{app.companyName}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem", borderTop: "1px solid #e9edff" }}>
                    <span className="text-label-sm" style={{ color: "#777587" }}>Applied: {app.appliedDate}</span>
                    <Link href={`/applications/${app.id}`} className="text-label-sm font-label-sm" style={{ color: "#3525cd" }}>Details →</Link>
                  </div>
                </div>
              )) : (
                <div style={{ border: "2px dashed #c7c4d8", borderRadius: "0.625rem", minHeight: "100px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#777587" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "24px", marginBottom: "4px", opacity: 0.5 }}>inbox</span>
                  <p className="text-label-sm">No roles here</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
