"use client";

import Link from "next/link";
import { MOCK_APPLICANTS_PIPELINE } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function AlumniOpportunitiesPage() {
  const postedJobs = [
    {
      id: "job-1",
      title: "Full Stack / Backend Engineer Intern",
      company: "TechNova Systems",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
      location: "San Francisco, CA (Hybrid)",
      type: "Internship",
      stipend: "$4,500 / mo",
      postedDate: "Aug 20, 2026",
      skills: ["Python", "FastAPI", "React", "Docker"],
      applicantsCount: MOCK_APPLICANTS_PIPELINE.length,
      status: "Active",
    },
    {
      id: "job-2",
      title: "Lead Cloud & DevOps Engineer",
      company: "CloudGrid Inc.",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80",
      location: "Bengaluru, KA (Remote)",
      type: "Full-Time",
      stipend: "₹18 - ₹24 LPA",
      postedDate: "Aug 18, 2026",
      skills: ["Kubernetes", "AWS", "Terraform"],
      applicantsCount: 6,
      status: "Active",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Alumni Opportunities &amp; Referrals</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>
            Post internal job referrals, hire campus talent, and review active candidate application pipelines.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link
            href="/alumni/recommendations"
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #c7c4d8",
              background: "#fff",
              color: "#141b2b",
              borderRadius: "0.5rem",
              fontWeight: 600,
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            Recommend Student
          </Link>

          <Link
            href="/alumni/opportunities/post"
            style={{
              padding: "0.5rem 1.25rem",
              background: "#16a34a",
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
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>add_circle</span>
            Post New Opportunity
          </Link>
        </div>
      </header>

      {/* Posted Listings */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.25rem" }}>
        {postedJobs.map((job) => (
          <div key={job.id} style={{ ...cardStyle, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#dcfce7", color: "#15803d" }}>
                  {job.type}
                </span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", background: "#f1f3ff", color: "#3525cd" }}>
                  {job.status}
                </span>
              </div>

              <div style={{ display: "flex", gap: "0.85rem", alignItems: "center", marginBottom: "0.85rem" }}>
                <img src={job.logo} alt={job.company} style={{ width: "42px", height: "42px", borderRadius: "0.5rem", objectFit: "cover" }} />
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>{job.title}</h3>
                  <p style={{ fontSize: "0.82rem", color: "#475569", margin: "2px 0 0 0" }}>
                    {job.company} &bull; 📍 {job.location}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "1rem" }}>
                {job.skills.map((sk) => (
                  <span key={sk} style={{ fontSize: "0.72rem", padding: "2px 8px", background: "#f1f3ff", color: "#3525cd", borderRadius: "4px", fontWeight: 600 }}>{sk}</span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: "1px solid #e9edff", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#166534" }}>
                👥 {job.applicantsCount} Applicants
              </span>

              <Link href="/alumni/applications" style={{ fontSize: "0.8rem", fontWeight: 700, color: "#3525cd", textDecoration: "none" }}>
                Manage Hiring Pipeline &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
