"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_MENTORSHIP_REQUESTS, MentorshipRequest } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function AlumniMentorshipPage() {
  const [activeTab, setActiveTab] = useState<"requests" | "active" | "upcoming" | "completed">("requests");
  const [requests, setRequests] = useState<MentorshipRequest[]>(MOCK_MENTORSHIP_REQUESTS);
  const [selectedStudentRequest, setSelectedStudentRequest] = useState<MentorshipRequest | null>(null);

  // Scheduling Modal
  const [schedulingRequest, setSchedulingRequest] = useState<MentorshipRequest | null>(null);
  const [meetingLink, setMeetingLink] = useState("https://meet.google.com/abc-defg-hij");

  const handleAction = (id: string, newStatus: "active" | "declined") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleConfirmSchedule = () => {
    if (schedulingRequest) {
      handleAction(schedulingRequest.id, "active");
      setSchedulingRequest(null);
    }
  };

  const filteredRequests = requests.filter((r) => {
    if (activeTab === "requests") return r.status === "pending";
    if (activeTab === "active") return r.status === "active";
    if (activeTab === "upcoming") return r.status === "active";
    if (activeTab === "completed") return r.status === "completed";
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "1px 6px", borderRadius: "4px", background: "#3525cd", color: "#fff", textTransform: "uppercase" }}>
              ALUMNI PORTAL
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Mentorship Requests &amp; Guidance</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>
            Review student mentorship requests, view complete student profiles (skills, certifications, experience, LinkedIn, GitHub), and schedule 1-on-1 sessions.
          </p>
        </div>

        <Link
          href="/alumni/mentorship/mock-interviews"
          style={{
            padding: "0.5rem 1.25rem",
            background: "#6b38d4",
            color: "#fff",
            borderRadius: "0.5rem",
            fontWeight: 600,
            fontSize: "0.85rem",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>quiz</span>
          Mock Interview Center
        </Link>
      </header>

      {/* Metrics Banner */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <div style={{ ...cardStyle, textAlign: "center", background: "#f8fafc" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", margin: 0 }}>Pending Student Requests</p>
          <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#3525cd", margin: "4px 0 0 0" }}>
            {requests.filter((r) => r.status === "pending").length}
          </p>
        </div>
        <div style={{ ...cardStyle, textAlign: "center", background: "#f8fafc" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", margin: 0 }}>Active Mentees</p>
          <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#16a34a", margin: "4px 0 0 0" }}>
            {requests.filter((r) => r.status === "active").length}
          </p>
        </div>
        <div style={{ ...cardStyle, textAlign: "center", background: "#f8fafc" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", margin: 0 }}>Upcoming Sessions</p>
          <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#6b38d4", margin: "4px 0 0 0" }}>
            {requests.filter((r) => r.status === "active").length}
          </p>
        </div>
        <div style={{ ...cardStyle, textAlign: "center", background: "#f8fafc" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", margin: 0 }}>Completed Sessions</p>
          <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#334155", margin: "4px 0 0 0" }}>18</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "6px", background: "#f1f3ff", padding: "4px", borderRadius: "0.5rem", border: "1px solid #c7c4d8", width: "fit-content" }}>
        {(["requests", "active", "upcoming", "completed"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              background: activeTab === tab ? "#fff" : "transparent",
              color: activeTab === tab ? "#3525cd" : "#464555",
              fontWeight: activeTab === tab ? 700 : 500,
              fontSize: "0.85rem",
              cursor: "pointer",
              boxShadow: activeTab === tab ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              textTransform: "capitalize",
            }}
          >
            {tab === "requests" ? "Pending Requests" : tab === "active" ? "Active Mentorships" : tab === "upcoming" ? "Upcoming Sessions" : "Completed"}
          </button>
        ))}
      </div>

      {/* List of Requests */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filteredRequests.length === 0 ? (
          <div style={{ ...cardStyle, textAlign: "center", padding: "3rem", color: "#64748b" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#c7c4d8" }}>inbox</span>
            <p style={{ fontSize: "0.95rem", fontWeight: 600, marginTop: "8px" }}>No {activeTab} mentorship items right now.</p>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>When students request guidance from the directory, they will appear in this tab.</p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div key={req.id} style={{ ...cardStyle, borderLeft: "4px solid #3525cd" }}>
              {/* Card Header */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", gap: "0.85rem", alignItems: "center" }}>
                  <img src={req.studentAvatar} alt={req.studentName} style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: "2px solid #3525cd" }} />
                  <div>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>
                        {req.studentName}
                      </h3>
                      <span style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600 }}>
                        &bull; {req.degree} (Class of {req.gradYear})
                      </span>
                    </div>

                    <p style={{ fontSize: "0.82rem", color: "#3525cd", fontWeight: 600, margin: "2px 0 0 0" }}>
                      🎯 Career Goal: {req.careerGoal} {req.gpa ? `(GPA ${req.gpa})` : ""}
                    </p>

                    {/* Social & Contact Links */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                      {req.linkedinUrl && (
                        <a
                          href={req.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ fontSize: "0.72rem", padding: "1px 6px", background: "#0a66c2", color: "#fff", borderRadius: "4px", textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "3px" }}
                        >
                          LinkedIn ↗
                        </a>
                      )}
                      {req.githubUrl && (
                        <a
                          href={req.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ fontSize: "0.72rem", padding: "1px 6px", background: "#24292e", color: "#fff", borderRadius: "4px", textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "3px" }}
                        >
                          GitHub ↗
                        </a>
                      )}
                      {req.portfolioUrl && (
                        <a
                          href={req.portfolioUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ fontSize: "0.72rem", padding: "1px 6px", background: "#6b21a8", color: "#fff", borderRadius: "4px", textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "3px" }}
                        >
                          Portfolio ↗
                        </a>
                      )}
                      {req.resumeUrl && (
                        <a
                          href={req.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ fontSize: "0.72rem", padding: "1px 6px", background: "#dc2626", color: "#fff", borderRadius: "4px", textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "3px" }}
                        >
                          Resume PDF ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", background: "#ebe9ff", color: "#3525cd" }}>
                  Topic: {req.requestedTopic}
                </span>
              </div>

              {/* Message */}
              <div style={{ background: "#f8fafc", padding: "0.85rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", marginBottom: "0.85rem" }}>
                <p style={{ fontSize: "0.85rem", color: "#334155", margin: 0, lineHeight: 1.5 }}>
                  "{req.message}"
                </p>
                <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "6px", margin: 0 }}>
                  📅 Preferred Slot: <strong>{req.requestedDate}</strong> &bull; Format: {req.preferredFormat}
                </p>
              </div>

              {/* Skills & Certifications summary */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 700 }}>Skills:</span>
                {req.skills.slice(0, 5).map((sk) => (
                  <span key={sk} style={{ fontSize: "0.72rem", padding: "2px 8px", background: "#e2e8f0", color: "#334155", borderRadius: "4px", fontWeight: 600 }}>
                    {sk}
                  </span>
                ))}

                {req.certifications && req.certifications.length > 0 && (
                  <>
                    <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 700, marginLeft: "8px" }}>Certifications:</span>
                    {req.certifications.map((c) => (
                      <span key={c.name} style={{ fontSize: "0.72rem", padding: "2px 8px", background: "#dcfce7", color: "#15803d", borderRadius: "4px", fontWeight: 600 }}>
                        📜 {c.name}
                      </span>
                    ))}
                  </>
                )}
              </div>

              {/* Actions & Profile Drawer trigger */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e9edff", paddingTop: "0.75rem", gap: "0.5rem" }}>
                <button
                  onClick={() => setSelectedStudentRequest(req)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#3525cd",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>account_box</span>
                  View Full Student Profile &amp; Credentials &rarr;
                </button>

                {req.status === "pending" && (
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => handleAction(req.id, "declined")}
                      style={{ padding: "0.45rem 0.85rem", border: "1px solid #c7c4d8", background: "#fff", color: "#dc2626", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => setSchedulingRequest(req)}
                      style={{ padding: "0.45rem 1rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>check_circle</span>
                      Accept &amp; Schedule
                    </button>
                  </div>
                )}

                {req.status === "active" && (
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#16a34a" }}>
                      ✓ Mentorship Active
                    </span>
                    <a
                      href={req.meetingUrl || "https://meet.google.com/abc-defg-hij"}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: "0.78rem", padding: "0.3rem 0.75rem", background: "#16a34a", color: "#fff", borderRadius: "0.375rem", textDecoration: "none", fontWeight: 600 }}
                    >
                      Join Meeting ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* STUDENT PROFILE INSPECTOR MODAL */}
      {selectedStudentRequest && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "0.75rem",
              maxWidth: "760px",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Header */}
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <img
                  src={selectedStudentRequest.studentAvatar}
                  alt={selectedStudentRequest.studentName}
                  style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", border: "3px solid #3525cd" }}
                />
                <div>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#141b2b", margin: 0 }}>
                      {selectedStudentRequest.studentName}
                    </h2>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
                      Class of {selectedStudentRequest.gradYear}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#475569", margin: "2px 0 0 0" }}>
                    {selectedStudentRequest.degree} &bull; {selectedStudentRequest.department}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudentRequest(null)}
                style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", padding: "4px" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Direct Links Row */}
              <div style={{ background: "#f1f3ff", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #c7c4d8", display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "0.78rem", fontWeight: 800, color: "#3525cd", textTransform: "uppercase", margin: 0 }}>
                    Verified Links &amp; Profiles
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "#475569", margin: "2px 0 0 0" }}>
                    All student profiles &amp; repos linked directly below
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {selectedStudentRequest.linkedinUrl && (
                    <a
                      href={selectedStudentRequest.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ padding: "0.45rem 0.85rem", background: "#0a66c2", color: "#fff", borderRadius: "0.375rem", textDecoration: "none", fontWeight: 700, fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "4px" }}
                    >
                      LinkedIn Profile ↗
                    </a>
                  )}
                  {selectedStudentRequest.githubUrl && (
                    <a
                      href={selectedStudentRequest.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ padding: "0.45rem 0.85rem", background: "#24292e", color: "#fff", borderRadius: "0.375rem", textDecoration: "none", fontWeight: 700, fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "4px" }}
                    >
                      GitHub Profile ↗
                    </a>
                  )}
                  {selectedStudentRequest.portfolioUrl && (
                    <a
                      href={selectedStudentRequest.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ padding: "0.45rem 0.85rem", background: "#6b21a8", color: "#fff", borderRadius: "0.375rem", textDecoration: "none", fontWeight: 700, fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "4px" }}
                    >
                      Portfolio Site ↗
                    </a>
                  )}
                  {selectedStudentRequest.resumeUrl && (
                    <a
                      href={selectedStudentRequest.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ padding: "0.45rem 0.85rem", background: "#dc2626", color: "#fff", borderRadius: "0.375rem", textDecoration: "none", fontWeight: 700, fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "4px" }}
                    >
                      Resume PDF ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Mentorship Request Note */}
              <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", borderLeft: "4px solid #3525cd" }}>
                <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#3525cd", margin: "0 0 4px 0" }}>
                  Mentorship Request: {selectedStudentRequest.requestedTopic}
                </p>
                <p style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.5, margin: 0 }}>
                  "{selectedStudentRequest.message}"
                </p>
                <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "6px 0 0 0" }}>
                  📅 Requested Slot: <strong>{selectedStudentRequest.requestedDate}</strong> &bull; Format: {selectedStudentRequest.preferredFormat}
                </p>
              </div>

              {/* Career Goal & Academics */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ ...cardStyle, background: "#fafafa" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", margin: 0 }}>Target Career Goal</p>
                  <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", margin: "2px 0 0 0" }}>{selectedStudentRequest.careerGoal}</p>
                </div>
                <div style={{ ...cardStyle, background: "#fafafa" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", margin: 0 }}>Academic Standing</p>
                  <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", margin: "2px 0 0 0" }}>Cumulative GPA: {selectedStudentRequest.gpa || "3.9 / 4.0"}</p>
                </div>
              </div>

              {/* Skills & Skill Gaps */}
              <div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem" }}>
                  Student Skill Matrix &amp; Focus Gaps
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ background: "#f0fdf4", padding: "0.85rem", borderRadius: "0.5rem", border: "1px solid #bbf7d0" }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#15803d", margin: "0 0 6px 0" }}>✅ Verified Mastered Skills</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {selectedStudentRequest.skills.map((s) => (
                        <span key={s} style={{ fontSize: "0.75rem", padding: "2px 8px", background: "#dcfce7", color: "#15803d", borderRadius: "4px", fontWeight: 600 }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: "#fef2f2", padding: "0.85rem", borderRadius: "0.5rem", border: "1px solid #fecaca" }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#b91c1c", margin: "0 0 6px 0" }}>⚠️ Priority Skill Gaps to Mentor</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {selectedStudentRequest.skillGaps.map((g) => (
                        <span key={g} style={{ fontSize: "0.75rem", padding: "2px 8px", background: "#fee2e2", color: "#b91c1c", borderRadius: "4px", fontWeight: 600 }}>{g}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Certifications */}
              {selectedStudentRequest.certifications && selectedStudentRequest.certifications.length > 0 && (
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem" }}>
                    Verified Certifications &amp; Credentials
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {selectedStudentRequest.certifications.map((cert) => (
                      <div key={cert.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0.85rem", background: "#f8fafc", borderRadius: "0.375rem", border: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span className="material-symbols-outlined" style={{ color: "#16a34a", fontSize: "18px" }}>verified</span>
                          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#141b2b" }}>{cert.name}</span>
                        </div>
                        <span style={{ fontSize: "0.78rem", color: "#64748b" }}>{cert.issuer} ({cert.year})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {selectedStudentRequest.experiences && selectedStudentRequest.experiences.length > 0 && (
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem" }}>
                    Internships &amp; Practical Experience
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {selectedStudentRequest.experiences.map((exp) => (
                      <div key={exp.role} style={{ padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "0.375rem", border: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>
                            {exp.role} @ {exp.organization}
                          </h4>
                          <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>{exp.duration}</span>
                        </div>
                        <p style={{ fontSize: "0.82rem", color: "#334155", margin: "4px 0 0 0", lineHeight: 1.4 }}>
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {selectedStudentRequest.projects && selectedStudentRequest.projects.length > 0 && (
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem" }}>
                    Key Student Projects &amp; Repositories
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {selectedStudentRequest.projects.map((proj) => (
                      <div key={proj.title} style={{ padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "0.375rem", border: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>
                            {proj.title}
                          </h4>
                          {proj.githubLink && (
                            <a href={proj.githubLink} target="_blank" rel="noreferrer" style={{ fontSize: "0.75rem", fontWeight: 700, color: "#3525cd", textDecoration: "none" }}>
                              View Code ↗
                            </a>
                          )}
                        </div>
                        <p style={{ fontSize: "0.82rem", color: "#334155", margin: "4px 0 6px 0" }}>{proj.description}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                          {proj.tech.map((t) => (
                            <span key={t} style={{ fontSize: "0.7rem", padding: "1px 6px", background: "#e2e8f0", color: "#334155", borderRadius: "4px", fontWeight: 600 }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                onClick={() => {
                  handleAction(selectedStudentRequest.id, "declined");
                  setSelectedStudentRequest(null);
                }}
                style={{ padding: "0.6rem 1.25rem", border: "1px solid #c7c4d8", background: "#fff", color: "#dc2626", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}
              >
                Decline Request
              </button>

              <button
                onClick={() => {
                  const reqToSchedule = selectedStudentRequest;
                  setSelectedStudentRequest(null);
                  setSchedulingRequest(reqToSchedule);
                }}
                style={{ padding: "0.6rem 1.5rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>check_circle</span>
                Accept Mentorship &amp; Schedule Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULING CONFIRMATION MODAL */}
      {schedulingRequest && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(15,23,42,0.65)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "#fff", borderRadius: "0.75rem", padding: "1.5rem", maxWidth: "500px", width: "100%", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#141b2b", marginBottom: "0.5rem" }}>
              Confirm Mentorship Invitation for {schedulingRequest.studentName}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#464555", marginBottom: "1rem", lineHeight: 1.5 }}>
              Accepting this request schedules a 1-on-1 session for <strong>{schedulingRequest.requestedTopic}</strong> on <strong>{schedulingRequest.requestedDate}</strong>.
            </p>

            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
              Google Meet Video Call Link
            </label>
            <input
              type="text"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              style={{ width: "100%", padding: "0.65rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem", marginBottom: "1.25rem" }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button onClick={() => setSchedulingRequest(null)} style={{ padding: "0.55rem 1rem", border: "1px solid #c7c4d8", background: "#fff", color: "#475569", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.85rem" }}>
                Cancel
              </button>
              <button onClick={handleConfirmSchedule} style={{ padding: "0.55rem 1.25rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
                Confirm &amp; Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
