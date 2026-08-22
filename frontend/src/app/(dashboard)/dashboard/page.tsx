"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { User, Opportunity, Application } from "@/types";

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
};

export default function StudentDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    async function load() {
      const [u, o, a] = await Promise.all([api.getUser(), api.getOpportunities(), api.getApplications()]);
      setUser(u); setOpportunities(o); setApplications(a);
    }
    load();
  }, []);

  const profileStrength = user?.profileStrength ?? 85;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* ── Welcome Banner ─────────────────────────────────────── */}
      <section
        style={{
          ...card,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          background: "linear-gradient(135deg, #ebe9ff 0%, #fff 60%)",
        }}
      >
        <div>
          <span
            className="text-label-sm font-label-sm"
            style={{ color: "#3525cd", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}
          >
            Student Dashboard
          </span>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b", marginTop: "4px" }}>
            Welcome back, {user?.name ?? "Alex"}!
          </h1>
          <p className="text-body-md" style={{ color: "#464555", marginTop: "4px" }}>
            Targeting: <strong style={{ color: "#141b2b" }}>{user?.targetRole ?? "Software Engineer"}</strong>
            {user?.degree && <> &bull; {user.degree}</>}
          </p>
        </div>
        <Link
          href="/skills/assessment"
          className="inline-flex items-center gap-xs text-label-md font-label-md text-white rounded-lg shadow-sm"
          style={{ padding: "0.5rem 1.25rem", background: "#3525cd", whiteSpace: "nowrap" }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>quiz</span>
          Take Assessment
        </Link>
      </section>

      {/* ── Stat Cards ─────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        {/* Profile Strength */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
            <div>
              <p className="text-label-sm font-label-sm" style={{ color: "#464555", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Profile Strength
              </p>
              <p className="text-display font-display" style={{ color: "#3525cd", marginTop: "4px" }}>
                {profileStrength}%
              </p>
            </div>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(233,221,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#3525cd" }}>person</span>
            </div>
          </div>
          <div style={{ width: "100%", height: "6px", background: "#e9edff", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: `${profileStrength}%`, height: "100%", background: "linear-gradient(90deg,#3525cd,#4f46e5)", borderRadius: "999px", transition: "width 0.6s ease" }} />
          </div>
          <p className="text-label-sm font-label-sm" style={{ color: "#464555", marginTop: "6px" }}>Strong candidate readiness profile</p>
        </div>

        {/* Skills Mastered */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
            <div>
              <p className="text-label-sm font-label-sm" style={{ color: "#464555", textTransform: "uppercase", letterSpacing: "0.06em" }}>Skills Mastered</p>
              <p className="text-display font-display" style={{ color: "#141b2b", marginTop: "4px" }}>{user?.skillsMastered ?? 12}</p>
            </div>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#e9edff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#464555" }}>terminal</span>
            </div>
          </div>
          <Link href="/skills" className="inline-flex items-center gap-xs text-label-md font-label-md" style={{ color: "#3525cd" }}>
            View Skills Matrix <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
          </Link>
        </div>

        {/* Active Applications */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
            <div>
              <p className="text-label-sm font-label-sm" style={{ color: "#464555", textTransform: "uppercase", letterSpacing: "0.06em" }}>Active Applications</p>
              <p className="text-display font-display" style={{ color: "#141b2b", marginTop: "4px" }}>{applications.length}</p>
            </div>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#e9edff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#464555" }}>description</span>
            </div>
          </div>
          <Link href="/applications" className="inline-flex items-center gap-xs text-label-md font-label-md" style={{ color: "#3525cd" }}>
            Track Kanban Board <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* ── Matched Opportunities ──────────────────────────────── */}
      <section style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", borderBottom: "1px solid #c7c4d8", marginBottom: "1rem" }}>
          <div>
            <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b" }}>Top Matched Opportunities</h2>
            <p className="text-body-sm" style={{ color: "#464555" }}>Recommended based on your target skills matrix.</p>
          </div>
          <Link href="/opportunities" className="inline-flex items-center gap-xs text-label-md font-label-md" style={{ color: "#3525cd", whiteSpace: "nowrap" }}>
            See All <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
          </Link>
        </div>

        {opportunities.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "#464555" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "40px", color: "#c7c4d8" }}>work_outline</span>
            <p className="text-body-sm" style={{ marginTop: "8px" }}>No opportunities loaded yet.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.75rem" }}>
            {opportunities.slice(0, 4).map((opp) => (
              <div
                key={opp.id}
                style={{ border: "1px solid #c7c4d8", borderRadius: "0.625rem", padding: "1rem", transition: "border-color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4f46e5")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#c7c4d8")}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "0.5rem", border: "1px solid #c7c4d8", overflow: "hidden", background: "#fff", flexShrink: 0 }}>
                    <img src={opp.companyLogo} alt={opp.company} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }} />
                  </div>
                  <div>
                    <h3 className="text-label-md font-label-md" style={{ color: "#141b2b", fontWeight: 600 }}>
                      <Link href={`/opportunities/${opp.id}`}>{opp.title}</Link>
                    </h3>
                    <p className="text-body-sm" style={{ color: "#464555" }}>{opp.company} &bull; {opp.location}</p>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem", borderTop: "1px solid #e9edff" }}>
                  <span className="text-label-sm font-label-sm" style={{ color: "#3525cd", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>bolt</span>
                    {opp.matchScore}% Match
                  </span>
                  <Link href={`/opportunities/${opp.id}`} className="text-label-sm" style={{ color: "#464555" }}>
                    View Role →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
