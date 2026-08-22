"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Application } from "@/types";

const STAGES = ["Applied", "Under Review", "Interview", "Selected"] as const;

const card: React.CSSProperties = {
  background: "#fff", border: "1px solid #c7c4d8", borderRadius: "0.75rem",
  padding: "1.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
};

export default function ApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [app, setApp] = useState<Application | null>(null);

  useEffect(() => { api.getApplicationById(id).then((a) => setApp(a || null)); }, [id]);

  if (!app) {
    return <div style={{ padding: "2rem", textAlign: "center", color: "#464555" }}>Loading application details...</div>;
  }

  const currentStageIdx = STAGES.indexOf(app.stage as typeof STAGES[number]);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Back */}
      <Link href="/applications" className="inline-flex items-center gap-xs text-label-md font-label-md" style={{ color: "#3525cd" }}>
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
        Back to Application Tracker
      </Link>

      {/* Header */}
      <header style={{ ...card, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", background: "linear-gradient(135deg,#ebe9ff 0%,#fff 60%)", borderLeft: "4px solid #4f46e5" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "0.625rem", border: "1px solid #c7c4d8", overflow: "hidden", background: "#fff", flexShrink: 0 }}>
            <img src={app.companyLogo} alt={app.companyName} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "6px" }} />
          </div>
          <div>
            <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>{app.opportunityTitle}</h1>
            <p className="text-body-md" style={{ color: "#464555" }}>{app.companyName}</p>
          </div>
        </div>
        <span
          className="text-label-md font-label-md"
          style={{ padding: "0.375rem 1rem", borderRadius: "999px", background: "rgba(233,221,255,0.6)", color: "#3525cd", fontWeight: 600 }}
        >
          {app.stage} Phase
        </span>
      </header>

      {/* Stage tracker */}
      <section style={card}>
        <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "1rem" }}>Application Progress</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
          {STAGES.map((stage, idx) => {
            const done = idx <= currentStageIdx;
            const active = idx === currentStageIdx;
            return (
              <div key={stage} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                {/* Connector line */}
                {idx > 0 && (
                  <div style={{
                    position: "absolute", top: "15px", left: "-50%", width: "100%", height: "3px",
                    background: done ? "#3525cd" : "#e9edff", zIndex: 0,
                  }} />
                )}
                {/* Dot */}
                <div style={{
                  width: "30px", height: "30px", borderRadius: "50%", zIndex: 1,
                  background: done ? "#3525cd" : "#e9edff",
                  border: active ? "3px solid #3525cd" : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {done && <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#fff", fontVariationSettings: "'FILL' 1" }}>check</span>}
                </div>
                <span className="text-label-sm font-label-sm" style={{ marginTop: "6px", color: done ? "#3525cd" : "#777587", textAlign: "center", fontSize: "11px" }}>
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Details grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
        {/* Timeline */}
        <section style={card}>
          <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "1rem" }}>Timeline</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[
              { label: "Application Submitted", date: app.appliedDate, done: true },
              { label: "Interview Scheduled",   date: app.interviewDate ?? "Oct 12, 2026", done: currentStageIdx >= 2 },
              { label: "Decision Expected",     date: "Nov 1, 2026", done: currentStageIdx >= 3 },
            ].map(({ label, date, done }) => (
              <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: done ? "#3525cd" : "#c7c4d8", marginTop: "4px", flexShrink: 0 }} />
                <div>
                  <p className="text-body-sm font-label-md" style={{ color: "#141b2b", fontWeight: 600 }}>{label}</p>
                  <p className="text-label-sm" style={{ color: "#464555" }}>{date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interview prep */}
        <section style={{ ...card, gridColumn: "span 1" }}>
          <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>Interview Preparation Notes</h2>
          <p className="text-body-md" style={{ color: "#464555", lineHeight: 1.7 }}>
            {app.interviewNotes ?? "Technical screen focusing on REST API design, database indexing, and System Architecture. Prepare LC Medium-level problems."}
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Link
              href="/skills/assessment"
              className="inline-flex items-center gap-xs text-label-md font-label-md text-white rounded-lg"
              style={{ padding: "0.5rem 1.25rem", background: "#3525cd" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>quiz</span>
              Practice Assessment
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
