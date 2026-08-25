"use client";

import { useState } from "react";
import Link from "next/link";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function PostOpportunityPage() {
  const [opportunityType, setOpportunityType] = useState("Job");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Link href="/alumni/opportunities" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.85rem", color: "#3525cd", fontWeight: 600, textDecoration: "none" }}>
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
        Back to Opportunities
      </Link>

      <header>
        <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#dcfce7", color: "#15803d", textTransform: "uppercase" }}>
          ALUMNI RECRUITER &bull; UI MOCK FORM
        </span>
        <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b", margin: "4px 0 0 0" }}>
          Post Campus Opportunity or Referral
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#464555", marginTop: "2px" }}>
          Publish open positions directly to top-performing CampusConnect students and mentees.
        </p>
      </header>

      {submitted ? (
        <div style={{ ...cardStyle, textAlign: "center", padding: "3rem", background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "56px", color: "#16a34a" }}>check_circle</span>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#166534", marginTop: "8px" }}>Opportunity Published Successfully!</h2>
          <p style={{ fontSize: "0.88rem", color: "#15803d" }}>Your listing is now visible to CampusConnect students. You can track applicant resumes in your Hiring Pipeline.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1.5rem" }}>
            <button onClick={() => setSubmitted(false)} style={{ padding: "0.5rem 1.25rem", border: "1px solid #c7c4d8", background: "#fff", borderRadius: "0.375rem" }}>Post Another</button>
            <Link href="/alumni/applications" style={{ padding: "0.5rem 1.25rem", background: "#16a34a", color: "#fff", borderRadius: "0.375rem", textDecoration: "none", fontWeight: 600 }}>View Hiring Pipeline</Link>
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={cardStyle}>
          {/* Opportunity Type Select */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "6px" }}>Opportunity Type</label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["Job", "Internship", "Referral Opportunity", "Mentorship Spot"].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setOpportunityType(t)}
                  style={{
                    padding: "0.45rem 1rem",
                    borderRadius: "0.375rem",
                    border: `1px solid ${opportunityType === t ? "#16a34a" : "#c7c4d8"}`,
                    background: opportunityType === t ? "#dcfce7" : "#fff",
                    color: opportunityType === t ? "#15803d" : "#141b2b",
                    fontWeight: opportunityType === t ? 700 : 500,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Role Title *</label>
              <input required type="text" defaultValue="Associate Backend Developer" style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
            </div>

            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Company Name *</label>
              <input required type="text" defaultValue="TechNova Systems" style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
            </div>

            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Location *</label>
              <input required type="text" defaultValue="San Francisco, CA / Remote" style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
            </div>

            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Work Mode *</label>
              <select style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem", background: "#fff" }}>
                <option>Hybrid</option>
                <option>Remote</option>
                <option>On-site</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Required Skills (comma separated) *</label>
            <input type="text" defaultValue="Python, FastAPI, Redis, Docker, SQL" style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Role Description &amp; Responsibilities *</label>
            <textarea rows={4} defaultValue="Building high-concurrency microservices with FastAPI and Redis caching. Looking for candidates who completed the CampusConnect backend assessment with >= 80% score." style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", borderTop: "1px solid #e9edff", paddingTop: "1rem" }}>
            <Link href="/alumni/opportunities" style={{ padding: "0.5rem 1rem", border: "1px solid #c7c4d8", borderRadius: "0.375rem", color: "#464555", textDecoration: "none", fontSize: "0.85rem" }}>Cancel</Link>
            <button type="submit" style={{ padding: "0.5rem 1.5rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>
              Publish Opportunity UI
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
