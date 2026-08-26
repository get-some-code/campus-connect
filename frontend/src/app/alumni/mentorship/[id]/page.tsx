"use client";

import { use, useState } from "react";
import Link from "next/link";
import { MOCK_MENTORSHIP_REQUESTS, MentorshipRequest } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function MentorshipRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const initialReq: MentorshipRequest = MOCK_MENTORSHIP_REQUESTS.find((r) => r.id === id) || MOCK_MENTORSHIP_REQUESTS[0];
  const [req, setReq] = useState<MentorshipRequest>(initialReq);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState(req.meetingUrl || "https://meet.google.com/abc-defg-hij");

  const handleStatusChange = (newStatus: MentorshipRequest["status"]) => {
    setReq((prev) => ({ ...prev, status: newStatus }));
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Link href="/alumni/mentorship" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.85rem", color: "#3525cd", fontWeight: 600, textDecoration: "none" }}>
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
        Back to Mentorship Center
      </Link>

      {/* Profile & Request Header */}
      <section style={{ ...cardStyle, borderLeft: "5px solid #3525cd" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <img src={req.studentAvatar} alt={req.studentName} style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: "3px solid #3525cd" }} />
            <div>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
                  STUDENT MENTORSHIP REQUEST
                </span>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b" }}>
                  Class of {req.gradYear}
                </span>
              </div>
              <h1 className="text-headline-md font-headline-md" style={{ color: "#141b2b", margin: "2px 0 0 0" }}>
                {req.studentName}
              </h1>
              <p style={{ fontSize: "0.85rem", color: "#475569", margin: 0 }}>
                {req.degree} ({req.department}) &bull; GPA: {req.gpa || "3.9 / 4.0"}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {req.status === "pending" && (
              <>
                <button
                  onClick={() => handleStatusChange("declined")}
                  style={{ padding: "0.5rem 1rem", border: "1px solid #c7c4d8", background: "#fff", color: "#dc2626", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Decline
                </button>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  style={{ padding: "0.5rem 1.25rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Accept &amp; Schedule
                </button>
              </>
            )}
            {req.status === "active" && (
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#16a34a", padding: "0.5rem 1rem", background: "#dcfce7", borderRadius: "0.5rem" }}>
                ✓ Mentorship Active
              </span>
            )}
          </div>
        </div>

        {/* Links bar */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", background: "#f1f3ff", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #c7c4d8", marginBottom: "1rem" }}>
          {req.linkedinUrl && (
            <a href={req.linkedinUrl} target="_blank" rel="noreferrer" style={{ fontSize: "0.78rem", padding: "4px 10px", background: "#0a66c2", color: "#fff", borderRadius: "4px", textDecoration: "none", fontWeight: 700 }}>
              LinkedIn ↗
            </a>
          )}
          {req.githubUrl && (
            <a href={req.githubUrl} target="_blank" rel="noreferrer" style={{ fontSize: "0.78rem", padding: "4px 10px", background: "#24292e", color: "#fff", borderRadius: "4px", textDecoration: "none", fontWeight: 700 }}>
              GitHub ↗
            </a>
          )}
          {req.portfolioUrl && (
            <a href={req.portfolioUrl} target="_blank" rel="noreferrer" style={{ fontSize: "0.78rem", padding: "4px 10px", background: "#6b21a8", color: "#fff", borderRadius: "4px", textDecoration: "none", fontWeight: 700 }}>
              Portfolio ↗
            </a>
          )}
          {req.resumeUrl && (
            <a href={req.resumeUrl} target="_blank" rel="noreferrer" style={{ fontSize: "0.78rem", padding: "4px 10px", background: "#dc2626", color: "#fff", borderRadius: "4px", textDecoration: "none", fontWeight: 700 }}>
              Resume PDF ↗
            </a>
          )}
        </div>

        {/* Message */}
        <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
          <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#3525cd", marginBottom: "4px" }}>
            Requested Topic: {req.requestedTopic}
          </p>
          <p style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.6, margin: 0 }}>
            "{req.message}"
          </p>
          <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "8px 0 0 0" }}>
            📅 Slot: <strong>{req.requestedDate}</strong> &bull; Format: {req.preferredFormat}
          </p>
        </div>
      </section>

      {/* Skill Gaps & Focus */}
      <section style={cardStyle}>
        <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>
          Student Skill Matrix &amp; Focus Gaps
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div style={{ background: "#f0fdf4", padding: "0.85rem", borderRadius: "0.5rem", border: "1px solid #bbf7d0" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#16a34a", marginBottom: "6px" }}>✅ Verified Active Skills</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {req.skills.map((s) => (
                <span key={s} style={{ fontSize: "0.75rem", padding: "2px 8px", background: "#dcfce7", color: "#15803d", borderRadius: "4px", fontWeight: 600 }}>{s}</span>
              ))}
            </div>
          </div>

          <div style={{ background: "#fef2f2", padding: "0.85rem", borderRadius: "0.5rem", border: "1px solid #fecaca" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#dc2626", marginBottom: "6px" }}>⚠️ Priority Skill Gaps to Mentor</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {req.skillGaps.map((g) => (
                <span key={g} style={{ fontSize: "0.75rem", padding: "2px 8px", background: "#fee2e2", color: "#b91c1c", borderRadius: "4px", fontWeight: 600 }}>{g}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Experiences */}
      {req.certifications && req.certifications.length > 0 && (
        <section style={cardStyle}>
          <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>
            Verified Certifications
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {req.certifications.map((c) => (
              <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0.85rem", background: "#f8fafc", borderRadius: "0.375rem", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#141b2b" }}>📜 {c.name}</span>
                <span style={{ fontSize: "0.78rem", color: "#64748b" }}>{c.issuer} ({c.year})</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {req.projects && req.projects.length > 0 && (
        <section style={cardStyle}>
          <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>
            Student Projects Showcase
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {req.projects.map((p) => (
              <div key={p.title} style={{ padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "0.375rem", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>{p.title}</h3>
                  {p.githubLink && (
                    <a href={p.githubLink} target="_blank" rel="noreferrer" style={{ fontSize: "0.75rem", fontWeight: 700, color: "#3525cd", textDecoration: "none" }}>
                      GitHub Repo ↗
                    </a>
                  )}
                </div>
                <p style={{ fontSize: "0.82rem", color: "#334155", margin: "4px 0 6px 0" }}>{p.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {p.tech.map((t) => (
                    <span key={t} style={{ fontSize: "0.7rem", padding: "1px 6px", background: "#e2e8f0", color: "#334155", borderRadius: "4px", fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(15,23,42,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "#fff", borderRadius: "0.75rem", padding: "1.5rem", maxWidth: "480px", width: "100%" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem" }}>
              Confirm Mentorship Meeting Link
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#464555", marginBottom: "1rem" }}>
              Generates calendar invitation and sends Google Meet video link to {req.studentName}.
            </p>
            <input
              type="text"
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem", marginBottom: "1rem" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button onClick={() => setShowScheduleModal(false)} style={{ padding: "0.5rem 1rem", border: "1px solid #c7c4d8", background: "#fff", borderRadius: "0.375rem" }}>Cancel</button>
              <button
                onClick={() => {
                  handleStatusChange("active");
                  setShowScheduleModal(false);
                }}
                style={{ padding: "0.5rem 1rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600 }}
              >
                Confirm &amp; Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
