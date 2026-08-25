"use client";

import Link from "next/link";
import { CURRENT_ALUMNI_PROFILE } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function AlumniProfilePage() {
  const profile = CURRENT_ALUMNI_PROFILE;

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header Profile Card */}
      <section style={{ ...cardStyle, background: "linear-gradient(135deg, #ebe9ff 0%, #ffffff 50%)", borderLeft: "5px solid #3525cd" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "1.25rem" }}>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}>
            <img
              src={profile.avatar}
              alt={profile.name}
              style={{ width: "96px", height: "96px", borderRadius: "50%", objectFit: "cover", border: "3px solid #3525cd", flexShrink: 0 }}
            />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "4px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#3525cd", color: "#fff" }}>
                  ALUMNI &bull; CLASS OF {profile.gradYear}
                </span>
                {profile.isMentoringAvailable && (
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", background: "#dcfce7", color: "#15803d", border: "1px solid #86efac" }}>
                    ✓ Mentorship Available
                  </span>
                )}
                {profile.isHiring && (
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", background: "#fef3c7", color: "#b45309", border: "1px solid #fde68a" }}>
                    💼 Hiring for TechNova
                  </span>
                )}
              </div>

              <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b", margin: 0 }}>
                {profile.name}
              </h1>
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "#3525cd", marginTop: "2px" }}>
                {profile.currentRole} @ {profile.currentCompany}
              </p>
              <p style={{ fontSize: "0.85rem", color: "#464555", marginTop: "2px" }}>
                📍 {profile.location} &bull; 🎓 {profile.degree} ({profile.institution})
              </p>
            </div>
          </div>

          <Link
            href="/alumni/settings"
            style={{
              padding: "0.5rem 1rem",
              background: "#fff",
              border: "1px solid #c7c4d8",
              borderRadius: "0.5rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#141b2b",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>edit</span>
            Edit Profile
          </Link>
        </div>

        <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.6, marginTop: "1rem", borderTop: "1px solid #c7c4d8", paddingTop: "0.75rem" }}>
          {profile.bio}
        </p>
      </section>

      {/* VISUAL CAREER JOURNEY TIMELINE */}
      <section style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div>
            <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", margin: 0 }}>
              Visual Career Journey
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#464555", marginTop: "2px" }}>
              Progression timeline from university degree to Senior Software Engineer.
            </p>
          </div>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", background: "#f0f0ff", color: "#3525cd" }}>
            {profile.experienceYears} Years Total Experience
          </span>
        </div>

        {/* Timeline Horizontal Stepper / Vertical Chain */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", position: "relative", paddingLeft: "1.5rem", borderLeft: "3px solid #ebe9ff" }}>
          {profile.careerJourney.map((stage, idx) => (
            <div key={stage.id} style={{ position: "relative" }}>
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: "-2rem",
                  top: "4px",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: idx === profile.careerJourney.length - 1 ? "#3525cd" : "#fff",
                  border: "3px solid #3525cd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: idx === profile.careerJourney.length - 1 ? "#fff" : "#3525cd",
                  fontSize: "14px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>{stage.icon}</span>
              </div>

              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "0.625rem", padding: "1rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#3525cd", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Stage {idx + 1}: {stage.stageName}
                    </span>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>
                      {stage.role} &bull; <span style={{ color: "#475569" }}>{stage.organization}</span>
                    </h3>
                  </div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, padding: "2px 8px", background: "#fff", border: "1px solid #cbd5e1", borderRadius: "4px", color: "#475569" }}>
                    {stage.duration}
                  </span>
                </div>

                <p style={{ fontSize: "0.85rem", color: "#334155", marginTop: "6px", marginBottom: "0.625rem", lineHeight: 1.5 }}>
                  <strong>Key Milestone:</strong> {stage.keyAchievement}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {stage.skillsDeveloped.map((sk) => (
                    <span key={sk} style={{ fontSize: "0.72rem", padding: "2px 8px", background: "#e2e8f0", color: "#334155", borderRadius: "4px", fontWeight: 600 }}>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid: Left Skills & Interests | Right Mentorship Topics & Advice */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        
        {/* Left: Skills & Certifications */}
        <div style={cardStyle}>
          <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>
            Technical Expertise &amp; Certifications
          </h3>

          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#777587", textTransform: "uppercase", marginBottom: "6px" }}>Tech Stack</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {profile.skills.map((sk) => (
                <span key={sk} style={{ fontSize: "0.8rem", padding: "4px 10px", background: "#e9edff", color: "#3525cd", borderRadius: "999px", fontWeight: 600 }}>
                  {sk}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#777587", textTransform: "uppercase", marginBottom: "6px" }}>Certifications</p>
            <ul style={{ paddingLeft: "1.25rem", margin: 0, fontSize: "0.85rem", color: "#334155" }}>
              {profile.certifications.map((cert) => (
                <li key={cert} style={{ marginBottom: "4px" }}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Preferred Mentorship Topics & Advice */}
        <div style={cardStyle}>
          <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>
            Mentorship &amp; Advice for Students
          </h3>

          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#777587", textTransform: "uppercase", marginBottom: "6px" }}>Preferred Topics</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {profile.preferredMentorshipTopics.map((top) => (
                <span key={top} style={{ fontSize: "0.8rem", padding: "4px 10px", background: "#fef3c7", color: "#b45309", borderRadius: "999px", fontWeight: 600 }}>
                  {top}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: "#f8fafc", padding: "0.85rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
            <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#3525cd", marginBottom: "4px" }}>
              💡 Message to Campus Students:
            </p>
            <p style={{ fontSize: "0.82rem", color: "#334155", fontStyle: "italic", margin: 0, lineHeight: 1.5 }}>
              "{profile.adviceForStudents}"
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
