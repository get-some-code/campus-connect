"use client";

import Link from "next/link";
import {
  CURRENT_ALUMNI_PROFILE,
  MOCK_MENTORSHIP_REQUESTS,
  MOCK_CAREER_EXPERIENCES,
  MOCK_INDUSTRY_INSIGHTS,
  MOCK_APPLICANTS_PIPELINE,
} from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function AlumniDashboardPage() {
  const profile = CURRENT_ALUMNI_PROFILE;
  const pendingMentorships = MOCK_MENTORSHIP_REQUESTS.filter((r) => r.status === "pending");
  const upcomingMentorships = MOCK_MENTORSHIP_REQUESTS.filter((r) => r.status === "active");
  const applicants = MOCK_APPLICANTS_PIPELINE;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Welcome Banner */}
      <section
        style={{
          ...cardStyle,
          background: "linear-gradient(135deg, #ebe9ff 0%, #ffffff 60%, #f0f0ff 100%)",
          borderLeft: "5px solid #3525cd",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <img
            src={profile.avatar}
            alt={profile.name}
            style={{ width: "68px", height: "68px", borderRadius: "50%", objectFit: "cover", border: "2px solid #3525cd" }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#3525cd", color: "#fff" }}>
                ALUMNI MENTOR &amp; RECRUITER
              </span>
              <span style={{ fontSize: "0.8rem", color: "#464555", fontWeight: 600 }}>
                Class of {profile.gradYear}
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b", margin: 0 }}>
              Welcome back, {profile.name}!
            </h1>
            <p className="text-body-md" style={{ color: "#464555", marginTop: "2px" }}>
              {profile.currentRole} @ <strong>{profile.currentCompany}</strong> &bull; {profile.institution}
            </p>
          </div>
        </div>

        {/* Profile Completion Indicator */}
        <div style={{ background: "#fff", border: "1px solid #c7c4d8", padding: "0.85rem 1.25rem", borderRadius: "0.625rem", minWidth: "220px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#141b2b" }}>Profile Strength</span>
            <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#3525cd" }}>85% Complete</span>
          </div>
          <div style={{ width: "100%", height: "6px", background: "#e9edff", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: "85%", height: "100%", background: "#3525cd", borderRadius: "999px" }} />
          </div>
          <Link href="/alumni/profile" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#3525cd", display: "inline-block", marginTop: "6px" }}>
            Complete Career Profile &rarr;
          </Link>
        </div>
      </section>

      {/* Quick Action Bar */}
      <section style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
        {[
          { label: "Contribute Questions", href: "/alumni/interview-questions", icon: "quiz", color: "#6b38d4" },
          { label: "Offer Mentorship", href: "/alumni/mentorship", icon: "school", color: "#3525cd" },
          { label: "Conduct Mock Interview", href: "/alumni/mentorship/mock-interviews", icon: "psychology", color: "#008bdc" },
          { label: "Share Experience", href: "/alumni/experiences", icon: "edit_note", color: "#4f46e5" },
          { label: "Post Opportunity", href: "/alumni/opportunities/post", icon: "add_circle", color: "#16a34a" },
          { label: "Recommend Student", href: "/alumni/recommendations", icon: "recommend", color: "#d97706" },
        ].map((act) => (
          <Link
            key={act.label}
            href={act.href}
            style={{
              flex: "1 1 160px",
              background: "#fff",
              border: "1px solid #c7c4d8",
              borderRadius: "0.625rem",
              padding: "0.75rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              textDecoration: "none",
              color: "#141b2b",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              transition: "transform 0.15s ease, border-color 0.15s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = act.color; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#c7c4d8"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ width: "32px", height: "32px", borderRadius: "0.375rem", background: `${act.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px", color: act.color }}>{act.icon}</span>
            </div>
            <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>{act.label}</span>
          </Link>
        ))}
      </section>

      {/* CORE PILLARS GRID: 1. GROW | 2. MENTOR | 3. HIRE */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
        
        {/* PILLAR 1: GROW */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", borderBottom: "2px solid #e9edff", paddingBottom: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "#3525cd" }}>trending_up</span>
              </div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>1. GROW</h2>
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", background: "#e0e7ff", color: "#3525cd" }}>
              Career &amp; Learning
            </span>
          </div>

          <p style={{ fontSize: "0.82rem", color: "#464555", marginBottom: "1rem" }}>
            Continue your professional development, monitor tech trends, and expand your executive network.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {MOCK_INDUSTRY_INSIGHTS.slice(0, 2).map((ins) => (
              <div key={ins.id} style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#3525cd" }}>{ins.category}</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#16a34a" }}>{ins.growthPct}</span>
                </div>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>{ins.title}</p>
                <p style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "2px", margin: 0 }}>{ins.summary}</p>
              </div>
            ))}
          </div>

          <Link
            href="/alumni/insights"
            style={{ display: "block", textAlign: "center", marginTop: "1rem", fontSize: "0.82rem", fontWeight: 700, color: "#3525cd", textDecoration: "none" }}
          >
            Explore Industry Insights &rarr;
          </Link>
        </div>

        {/* PILLAR 2: MENTOR */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", borderBottom: "2px solid #fef3c7", paddingBottom: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "#d97706" }}>school</span>
              </div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>2. MENTOR</h2>
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", background: "#fef3c7", color: "#b45309" }}>
              Give Back &amp; Guide
            </span>
          </div>

          {/* Metric cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginBottom: "1rem" }}>
            <div style={{ background: "#fff8f0", padding: "0.625rem", borderRadius: "0.5rem", textAlign: "center", border: "1px solid #fed7aa" }}>
              <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#c2410c", margin: 0 }}>12</p>
              <p style={{ fontSize: "0.7rem", color: "#7c2d12", margin: 0 }}>Students Mentored</p>
            </div>
            <div style={{ background: "#fff8f0", padding: "0.625rem", borderRadius: "0.5rem", textAlign: "center", border: "1px solid #fed7aa" }}>
              <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#c2410c", margin: 0 }}>24</p>
              <p style={{ fontSize: "0.7rem", color: "#7c2d12", margin: 0 }}>Sessions Held</p>
            </div>
            <div style={{ background: "#fff8f0", padding: "0.625rem", borderRadius: "0.5rem", textAlign: "center", border: "1px solid #fed7aa" }}>
              <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#c2410c", margin: 0 }}>8</p>
              <p style={{ fontSize: "0.7rem", color: "#7c2d12", margin: 0 }}>Mock Interviews</p>
            </div>
          </div>

          {/* Pending requests */}
          <div style={{ marginBottom: "0.85rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#141b2b" }}>Pending Student Requests ({pendingMentorships.length})</span>
              <Link href="/alumni/mentorship" style={{ fontSize: "0.75rem", color: "#3525cd", fontWeight: 600 }}>View All</Link>
            </div>

            {pendingMentorships.slice(0, 2).map((req) => (
              <div key={req.id} style={{ background: "#fff", border: "1px solid #c7c4d8", padding: "0.75rem", borderRadius: "0.5rem", marginBottom: "6px", display: "flex", gap: "0.625rem", alignItems: "center" }}>
                <img src={req.studentAvatar} alt={req.studentName} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", margin: 0, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    {req.studentName} &bull; {req.gradYear}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#464555", margin: 0, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    Topic: {req.requestedTopic}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/alumni/mentorship"
            style={{ display: "block", textAlign: "center", marginTop: "0.5rem", fontSize: "0.82rem", fontWeight: 700, color: "#3525cd", textDecoration: "none" }}
          >
            Manage Mentorship Requests &rarr;
          </Link>
        </div>

        {/* PILLAR 3: HIRE */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", borderBottom: "2px solid #dcfce7", paddingBottom: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "#16a34a" }}>work</span>
              </div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>3. HIRE</h2>
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", background: "#dcfce7", color: "#15803d" }}>
              Recruit &amp; Refer
            </span>
          </div>

          <p style={{ fontSize: "0.82rem", color: "#464555", marginBottom: "1rem" }}>
            Post jobs, refer campus talent to TechNova, and review candidate applicant pipelines.
          </p>

          {/* Hiring pipeline summary */}
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "0.75rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#166534" }}>Active Opportunity Candidates</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#15803d" }}>{applicants.length} Total</span>
            </div>
            <div style={{ display: "flex", gap: "4px", fontSize: "0.75rem", fontWeight: 600, color: "#166534" }}>
              <span>Shortlisted: 2</span> &bull; <span>Interviewing: 1</span> &bull; <span>Selected: 1</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link
              href="/alumni/opportunities/post"
              style={{ flex: 1, padding: "0.5rem", background: "#16a34a", color: "#fff", borderRadius: "0.375rem", textAlign: "center", fontWeight: 600, fontSize: "0.8rem", textDecoration: "none" }}
            >
              Post Opportunity
            </Link>
            <Link
              href="/alumni/applications"
              style={{ flex: 1, padding: "0.5rem", border: "1px solid #c7c4d8", color: "#141b2b", borderRadius: "0.375rem", textAlign: "center", fontWeight: 600, fontSize: "0.8rem", textDecoration: "none" }}
            >
              View Pipeline
            </Link>
          </div>
        </div>

      </div>

      {/* Featured Community & Experiences Feed Preview */}
      <section style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div>
            <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", margin: 0 }}>
              Recent Alumni Career Experiences &amp; Guides
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#464555", marginTop: "2px" }}>
              Read interview breakdowns and preparation guides shared by university alumni.
            </p>
          </div>
          <Link href="/alumni/experiences" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#3525cd", textDecoration: "none" }}>
            View All Guides &rarr;
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
          {MOCK_CAREER_EXPERIENCES.map((exp) => (
            <div key={exp.id} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "0.625rem", padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
                    {exp.experienceType}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{exp.readTime}</span>
                </div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.35rem" }}>
                  <Link href={`/alumni/experiences/${exp.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {exp.title}
                  </Link>
                </h3>
                <p style={{ fontSize: "0.8rem", color: "#475569", lineHeight: 1.4, margin: 0 }}>
                  {exp.summary}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.85rem", paddingTop: "0.5rem", borderTop: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#334155" }}>
                  By {exp.authorName} ({exp.authorCompany})
                </span>
                <Link href={`/alumni/experiences/${exp.id}`} style={{ fontSize: "0.78rem", fontWeight: 700, color: "#3525cd" }}>
                  Read Story &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
