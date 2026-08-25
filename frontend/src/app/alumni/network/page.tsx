"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_ALUMNI_DIRECTORY, AlumniProfile } from "@/lib/alumniMockData";

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

export default function AlumniDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [mentorshipOnly, setMentorshipOnly] = useState(false);
  const [hiringOnly, setHiringOnly] = useState(false);

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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Alumni Network Directory</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>
            Connect with verified campus alumni working across tier-1 tech companies, startups, and research labs.
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
                      Mentor
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
                    <Link href={`/alumni/network/${alm.id}`} style={{ textDecoration: "none", color: "inherit" }}>
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
                href={`/alumni/network/${alm.id}`}
                style={{
                  flex: 1,
                  padding: "0.45rem",
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
              <Link
                href="/alumni/mentorship"
                style={{
                  flex: 1,
                  padding: "0.45rem",
                  background: "#3525cd",
                  borderRadius: "0.375rem",
                  textAlign: "center",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Request Mentorship
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
