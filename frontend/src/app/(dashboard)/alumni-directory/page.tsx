"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_ALUMNI_DIRECTORY, AlumniProfile, MOCK_MENTORSHIP_REQUESTS, MentorshipRequest } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export default function StudentAlumniDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [mentorshipOnly, setMentorshipOnly] = useState(false);
  const [hiringOnly, setHiringOnly] = useState(false);

  // Mentorship Modal State
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);
  const [topic, setTopic] = useState("System Design & Mock Interview");
  const [preferredDate, setPreferredDate] = useState("Aug 29, 2026 at 4:00 PM IST");
  const [format, setFormat] = useState("1-on-1 Video Call (Google Meet)");
  const [message, setMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);

  const alumniList: AlumniProfile[] = MOCK_ALUMNI_DIRECTORY.filter((alm) => {
    const matchesSearch =
      alm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alm.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alm.currentRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alm.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCompany = companyFilter === "all" || alm.currentCompany.toLowerCase() === companyFilter.toLowerCase();
    const matchesMentorship = !mentorshipOnly || alm.isMentoringAvailable;
    const matchesHiring = !hiringOnly || alm.isHiring;

    return matchesSearch && matchesCompany && matchesMentorship && matchesHiring;
  });

  const handleOpenMentorshipModal = (alm: AlumniProfile) => {
    setSelectedAlumni(alm);
    setMessage(`Hi ${alm.name.split(" ")[0]}! I noticed your experience as ${alm.currentRole} at ${alm.currentCompany}. I would love to request a mentorship session to get guidance on my career preparation.`);
  };

  const handleSendMentorshipRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlumni) return;

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
    setSelectedAlumni(null);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 5000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
            <p style={{ margin: 0, fontWeight: 700 }}>Mentorship Request Submitted!</p>
            <p style={{ margin: 0, fontSize: "0.8rem", opacity: 0.9 }}>Your request has been sent to the alumni. They will review your full profile &amp; respond soon.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
              STUDENT PORTAL
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Alumni Network Directory</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>
            Connect with verified campus alumni working at tier-1 tech companies. View career journeys and request 1-on-1 mentorship.
          </p>
        </div>
      </header>

      {/* Search & Filter Bar */}
      <section style={{ ...cardStyle, padding: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
        {/* Search Input */}
        <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
          <span className="material-symbols-outlined" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#777587", fontSize: "18px" }}>
            search
          </span>
          <input
            type="text"
            placeholder="Search by alumni name, company (TechNova, Microsoft), role, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "0.45rem 0.75rem 0.45rem 2.25rem",
              borderRadius: "0.5rem",
              border: "1.5px solid #c7c4d8",
              fontSize: "0.85rem",
              outline: "none",
            }}
          />
        </div>

        {/* Company Dropdown */}
        <select
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          style={{ padding: "0.45rem 0.75rem", borderRadius: "0.5rem", border: "1px solid #c7c4d8", fontSize: "0.85rem", background: "#fff", cursor: "pointer" }}
        >
          <option value="all">All Companies</option>
          <option value="technova systems">TechNova Systems</option>
          <option value="microsoft">Microsoft</option>
          <option value="cloudgrid inc.">CloudGrid Inc.</option>
          <option value="datasphere ai">DataSphere AI</option>
          <option value="finedge systems">FinEdge Systems</option>
        </select>

        {/* Checkbox Toggles */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: 600, color: "#141b2b", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={mentorshipOnly}
              onChange={(e) => setMentorshipOnly(e.target.checked)}
              style={{ accentColor: "#3525cd" }}
            />
            Available for Mentorship
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: 600, color: "#141b2b", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={hiringOnly}
              onChange={(e) => setHiringOnly(e.target.checked)}
              style={{ accentColor: "#16a34a" }}
            />
            Actively Hiring
          </label>
        </div>
      </section>

      {/* Directory Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
        {alumniList.map((alm) => (
          <div key={alm.id} style={cardStyle}>
            <div>
              {/* Header Badges */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
                  Class of {alm.gradYear}
                </span>

                <div style={{ display: "flex", gap: "4px" }}>
                  {alm.isMentoringAvailable && (
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", background: "#dcfce7", color: "#15803d" }}>
                      Mentor Available
                    </span>
                  )}
                  {alm.isHiring && (
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", background: "#fef3c7", color: "#b45309" }}>
                      Hiring
                    </span>
                  )}
                </div>
              </div>

              {/* Profile Details */}
              <div style={{ display: "flex", gap: "0.875rem", marginBottom: "0.85rem" }}>
                <img
                  src={alm.avatar}
                  alt={alm.name}
                  style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", border: "2px solid #3525cd", flexShrink: 0 }}
                />
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>
                    <Link href={`/alumni-directory/${alm.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      {alm.name}
                    </Link>
                  </h3>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#3525cd", margin: "2px 0 0 0" }}>
                    {alm.currentRole}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#475569", margin: 0 }}>
                    🏢 {alm.currentCompany} &bull; 📍 {alm.location}
                  </p>
                </div>
              </div>

              <p style={{ fontSize: "0.8rem", color: "#475569", lineHeight: 1.4, marginBottom: "0.85rem" }}>
                {alm.summary}
              </p>

              {/* Skills */}
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {alm.skills.slice(0, 4).map((sk) => (
                    <span key={sk} style={{ fontSize: "0.72rem", padding: "2px 8px", background: "#f1f3ff", color: "#3525cd", borderRadius: "4px", fontWeight: 600 }}>
                      {sk}
                    </span>
                  ))}
                  {alm.skills.length > 4 && (
                    <span style={{ fontSize: "0.72rem", padding: "2px 6px", color: "#64748b" }}>
                      +{alm.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ borderTop: "1px solid #e9edff", paddingTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
              <Link
                href={`/alumni-directory/${alm.id}`}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "1px solid #c7c4d8",
                  borderRadius: "0.375rem",
                  textAlign: "center",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#141b2b",
                  textDecoration: "none",
                }}
              >
                View Profile
              </Link>
              <button
                onClick={() => handleOpenMentorshipModal(alm)}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  background: alm.isMentoringAvailable ? "#3525cd" : "#64748b",
                  borderRadius: "0.375rem",
                  textAlign: "center",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>school</span>
                Request Mentorship
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* REQUEST MENTORSHIP MODAL */}
      {selectedAlumni && (
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
            {/* Modal Header */}
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <img src={selectedAlumni.avatar} alt={selectedAlumni.name} style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid #3525cd" }} />
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>
                    Request Mentorship from {selectedAlumni.name}
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: "#475569", margin: 0 }}>
                    {selectedAlumni.currentRole} &bull; {selectedAlumni.currentCompany}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAlumni(null)}
                style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", padding: "4px" }}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSendMentorshipRequest} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Topic Select */}
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
                  <option value="System Design & Mock Interview">System Design &amp; Architecture Review</option>
                  <option value="Backend & Full Stack Coding">Backend &amp; Coding Practice</option>
                  <option value="Resume Review & First Job Transition">Resume Review &amp; Portfolio Feedback</option>
                  <option value="DevOps Career Roadmap & Docker Guidance">DevOps &amp; Cloud Infrastructure Roadmap</option>
                  <option value="General Career Guidance & Referral Advice">General Career Guidance &amp; Referral Advice</option>
                </select>
              </div>

              {/* Slot & Format */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                    Preferred Date / Slot *
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

              {/* Message */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                  Message to Alumni *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.85rem", outline: "none" }}
                  required
                />
              </div>

              {/* Auto-Attached Profile Card */}
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
                <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "6px 0 0 0" }}>
                  The alumni will be able to review your full profile, projects, skills, LinkedIn, and GitHub links directly without searching.
                </p>
              </div>

              {/* Modal Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setSelectedAlumni(null)}
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
