"use client";

import { use, useState } from "react";
import Link from "next/link";
import { MOCK_ALUMNI_DIRECTORY, AlumniProfile, MOCK_MENTORSHIP_REQUESTS, MentorshipRequest } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function StudentAlumniDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const alm: AlumniProfile = MOCK_ALUMNI_DIRECTORY.find((a) => a.id === id) || MOCK_ALUMNI_DIRECTORY[0];

  const [showModal, setShowModal] = useState(false);
  const [topic, setTopic] = useState("System Design & Architecture");
  const [preferredDate, setPreferredDate] = useState("Aug 29, 2026 at 4:00 PM IST");
  const [format, setFormat] = useState("1-on-1 Video Call (Google Meet)");
  const [message, setMessage] = useState(`Hi ${alm.name.split(" ")[0]}! I saw your career journey at ${alm.currentCompany}. I would love to request a mentorship session to get guidance on my backend and system design skills.`);
  const [successToast, setSuccessToast] = useState(false);

  const handleSendMentorshipRequest = (e: React.FormEvent) => {
    e.preventDefault();

    const newRequest: MentorshipRequest = {
      id: `mr-${Date.now()}`,
      studentName: "Alex Morgan",
      studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      studentEmail: "alex.morgan@campusconnect.edu",
      studentPhone: "+1 (555) 234-8901",
      linkedinUrl: "https://linkedin.com/in/alex-morgan-dev",
      githubUrl: "https://github.com/alexmorgan-code",
      portfolioUrl: "https://alexmorgan.dev",
      resumeUrl: "https://campusconnect.edu/resumes/alex_morgan_resume.pdf",
      gpa: "3.9 / 4.0",
      degree: "B.Tech Computer Science & Engineering",
      department: "School of Engineering",
      gradYear: 2027,
      careerGoal: "Backend Engineer @ Tier-1 Tech Company",
      skills: ["Python", "FastAPI", "React", "TypeScript", "SQL", "PostgreSQL"],
      skillGaps: ["Redis", "Microservices Architecture", "Docker", "AWS"],
      certifications: [
        { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2025" },
        { name: "PostgreSQL Database Administrator Fundamentals", issuer: "Coursera / Stanford", year: "2024" },
      ],
      experiences: [
        {
          role: "Software Engineering Intern",
          organization: "NexusTech Labs",
          duration: "May 2025 – Aug 2025 (4 mos)",
          description: "Built async FastAPI REST endpoints for user authentication and real-time activity tracking.",
        },
      ],
      projects: [
        {
          title: "CampusConnect Career & ATS Portal",
          tech: ["Next.js", "FastAPI", "PostgreSQL", "Tailwind"],
          description: "Full-stack placement portal with resume matching score algorithm.",
          githubLink: "https://github.com/alexmorgan-code/campus-connect",
        },
      ],
      requestedTopic: topic,
      message: message,
      requestedDate: preferredDate,
      preferredFormat: format,
      status: "pending",
    };

    MOCK_MENTORSHIP_REQUESTS.unshift(newRequest);
    setShowModal(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 5000);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Toast Notification */}
      {successToast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            background: "#16a34a",
            color: "#fff",
            padding: "1rem 1.25rem",
            borderRadius: "0.5rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>check_circle</span>
          <div>
            <p style={{ margin: 0, fontWeight: 700 }}>Mentorship Request Sent!</p>
            <p style={{ margin: 0, fontSize: "0.8rem", opacity: 0.9 }}>Your request has been submitted to {alm.name}.</p>
          </div>
        </div>
      )}

      {/* Back button */}
      <Link href="/alumni-directory" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.85rem", color: "#3525cd", fontWeight: 600, textDecoration: "none" }}>
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
        Back to Alumni Directory
      </Link>

      {/* Header Profile Card */}
      <section style={{ ...cardStyle, borderLeft: "5px solid #3525cd" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1.5rem" }}>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            <img src={alm.avatar} alt={alm.name} style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", border: "3px solid #3525cd" }} />
            <div>
              <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "4px" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
                  Class of {alm.gradYear}
                </span>
                {alm.isMentoringAvailable && (
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#dcfce7", color: "#15803d" }}>
                    Available for Mentorship
                  </span>
                )}
                {alm.isHiring && (
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#fef3c7", color: "#b45309" }}>
                    Actively Hiring
                  </span>
                )}
              </div>

              <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b", margin: 0 }}>
                {alm.name}
              </h1>
              <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#3525cd", margin: "2px 0 0 0" }}>
                {alm.currentRole} &bull; {alm.currentCompany}
              </p>
              <p style={{ fontSize: "0.85rem", color: "#475569", margin: "2px 0 0 0" }}>
                📍 {alm.location} &bull; 🎓 {alm.degree} ({alm.institution})
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: "0.65rem 1.5rem",
              background: "#3525cd",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 4px 12px rgba(53, 37, 205, 0.25)",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>school</span>
            Request Mentorship
          </button>
        </div>

        <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.6, marginTop: "1.25rem", margin: "1.25rem 0 0 0" }}>
          {alm.bio}
        </p>

        {/* Professional Links */}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
          {alm.professionalLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#3525cd",
                padding: "0.35rem 0.85rem",
                background: "#f1f3ff",
                borderRadius: "0.375rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {/* Grid Details */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        {/* Left Column: Career Journey & Advice */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Career Journey */}
          {alm.careerJourney && alm.careerJourney.length > 0 && (
            <section style={cardStyle}>
              <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "1rem" }}>
                Career Journey Timeline
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", position: "relative", paddingLeft: "1.5rem", borderLeft: "2px dashed #c7c4d8" }}>
                {alm.careerJourney.map((cj) => (
                  <div key={cj.id} style={{ position: "relative" }}>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        position: "absolute",
                        left: "-2rem",
                        top: "0",
                        background: "#ebe9ff",
                        color: "#3525cd",
                        borderRadius: "50%",
                        padding: "4px",
                        fontSize: "16px",
                      }}
                    >
                      {cj.icon}
                    </span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b" }}>{cj.duration}</span>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", margin: "2px 0 0 0" }}>
                      {cj.role} @ {cj.organization}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#334155", margin: "4px 0 0 0", lineHeight: 1.5 }}>
                      {cj.keyAchievement}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Advice for Students */}
          <section style={{ ...cardStyle, background: "#f8fafc" }}>
            <h2 className="text-headline-md font-headline-md" style={{ color: "#3525cd", marginBottom: "0.5rem" }}>
              💡 Advice for Campus Connect Students
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
              "{alm.adviceForStudents}"
            </p>
          </section>
        </div>

        {/* Right Column: Skills & Mentorship Topics */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Skills */}
          <section style={cardStyle}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.75rem" }}>Technical Stack &amp; Skills</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {alm.skills.map((s) => (
                <span key={s} style={{ fontSize: "0.78rem", padding: "4px 10px", background: "#f1f3ff", color: "#3525cd", borderRadius: "0.375rem", fontWeight: 600 }}>
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Preferred Mentorship Topics */}
          <section style={cardStyle}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.75rem" }}>Mentorship Topics Offered</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {alm.preferredMentorshipTopics.map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "#334155", fontWeight: 600 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#16a34a" }}>check_circle</span>
                  {t}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
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
              maxWidth: "580px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>
                  Request Mentorship from {alm.name}
                </h2>
                <p style={{ fontSize: "0.8rem", color: "#475569", margin: 0 }}>
                  {alm.currentRole} &bull; {alm.currentCompany}
                </p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer" }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSendMentorshipRequest} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                  Mentorship Topic / Focus Area *
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.85rem", background: "#fff" }}
                  required
                >
                  <option value="System Design & Architecture">System Design &amp; Architecture Review</option>
                  <option value="Backend & Full Stack Coding">Backend &amp; Coding Practice</option>
                  <option value="Resume Review & First Job Transition">Resume Review &amp; Portfolio Feedback</option>
                  <option value="DevOps Career Roadmap & Docker Guidance">DevOps &amp; Cloud Infrastructure Roadmap</option>
                  <option value="General Career Guidance & Referral Advice">General Career Guidance &amp; Referral Advice</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                    Preferred Slot *
                  </label>
                  <input
                    type="text"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    style={{ width: "100%", padding: "0.6rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.85rem" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                    Format *
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    style={{ width: "100%", padding: "0.6rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.85rem", background: "#fff" }}
                    required
                  >
                    <option value="1-on-1 Video Call (Google Meet)">1-on-1 Video Call (Google Meet)</option>
                    <option value="Async Text & Code Review">Async Code &amp; Resume Review</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                  Message to Alumni *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.85rem" }}
                  required
                />
              </div>

              <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 800, color: "#3525cd", margin: "0 0 6px 0", textTransform: "uppercase" }}>
                  📎 Auto-Attached Student Profile &amp; Credentials
                </p>
                <p style={{ fontSize: "0.82rem", color: "#334155", margin: 0, fontWeight: 600 }}>
                  Alex Morgan &bull; B.Tech Computer Science (GPA 3.9) &bull; Class of 2027
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                  <span style={{ fontSize: "0.72rem", padding: "2px 8px", background: "#e0e7ff", color: "#3730a3", borderRadius: "4px", fontWeight: 600 }}>
                    🔗 LinkedIn: alex-morgan-dev
                  </span>
                  <span style={{ fontSize: "0.72rem", padding: "2px 8px", background: "#f3f4f6", color: "#1f2937", borderRadius: "4px", fontWeight: 600 }}>
                    💻 GitHub: alexmorgan-code
                  </span>
                  <span style={{ fontSize: "0.72rem", padding: "2px 8px", background: "#dcfce7", color: "#15803d", borderRadius: "4px", fontWeight: 600 }}>
                    📜 AWS Certified Practitioner
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: "0.6rem 1.25rem", border: "1px solid #c7c4d8", background: "#fff", color: "#475569", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "0.6rem 1.5rem", background: "#3525cd", color: "#fff", border: "none", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>send</span>
                  Send Mentorship Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
