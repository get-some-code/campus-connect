"use client";

import { use, useState } from "react";
import Link from "next/link";
import { MOCK_ALUMNI_DIRECTORY, AlumniProfile } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function AlumniProfileDiscoveryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const alm = MOCK_ALUMNI_DIRECTORY.find((a) => a.id === id) || MOCK_ALUMNI_DIRECTORY[0];
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectionSent, setConnectionSent] = useState(false);

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Back Link */}
      <Link href="/alumni/network" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.85rem", color: "#3525cd", fontWeight: 600, textDecoration: "none" }}>
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
        Back to Alumni Directory
      </Link>

      {/* Header Profile Card */}
      <section style={{ ...cardStyle, background: "linear-gradient(135deg, #ebe9ff 0%, #ffffff 50%)", borderLeft: "5px solid #3525cd" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1.25rem" }}>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            <img src={alm.avatar} alt={alm.name} style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover", border: "3px solid #3525cd", flexShrink: 0 }} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "4px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#3525cd", color: "#fff" }}>
                  Class of {alm.gradYear}
                </span>
                {alm.isMentoringAvailable && (
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", background: "#dcfce7", color: "#15803d" }}>
                    ✓ Mentorship Available
                  </span>
                )}
              </div>
              <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b", margin: 0 }}>
                {alm.name}
              </h1>
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "#3525cd", marginTop: "2px" }}>
                {alm.currentRole} @ {alm.currentCompany}
              </p>
              <p style={{ fontSize: "0.85rem", color: "#464555", marginTop: "2px" }}>
                📍 {alm.location} &bull; 🎓 {alm.degree}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setShowConnectModal(true)}
              style={{ padding: "0.5rem 1rem", background: connectionSent ? "#16a34a" : "#3525cd", color: "#fff", border: "none", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}
            >
              {connectionSent ? "✓ Connected" : "Connect"}
            </button>
            <Link
              href="/alumni/mentorship"
              style={{ padding: "0.5rem 1rem", border: "1px solid #c7c4d8", background: "#fff", color: "#141b2b", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}
            >
              Request Mentorship
            </Link>
          </div>
        </div>

        <p style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.6, marginTop: "1rem", borderTop: "1px solid #c7c4d8", paddingTop: "0.75rem" }}>
          {alm.bio}
        </p>
      </section>

      {/* Career Journey Timeline */}
      {alm.careerJourney && alm.careerJourney.length > 0 && (
        <section style={cardStyle}>
          <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "1rem" }}>
            Career Journey &amp; Milestones
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", borderLeft: "3px solid #ebe9ff", paddingLeft: "1.25rem" }}>
            {alm.careerJourney.map((stage, idx) => (
              <div key={stage.id} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "0.5rem", padding: "0.85rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#3525cd" }}>
                    Stage {idx + 1}: {stage.stageName}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{stage.duration}</span>
                </div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>
                  {stage.role} &bull; {stage.organization}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#475569", marginTop: "4px", margin: 0 }}>
                  {stage.keyAchievement}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Advice & Mentorship Topics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        <div style={cardStyle}>
          <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>
            Preferred Mentorship Topics
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {alm.preferredMentorshipTopics.map((top) => (
              <span key={top} style={{ fontSize: "0.8rem", padding: "4px 10px", background: "#fef3c7", color: "#b45309", borderRadius: "999px", fontWeight: 600 }}>
                {top}
              </span>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>
            Advice for Students
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#334155", lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>
            "{alm.adviceForStudents}"
          </p>
        </div>
      </div>

      {/* Connection Modal */}
      {showConnectModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(15,23,42,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "#fff", borderRadius: "0.75rem", padding: "1.5rem", maxWidth: "480px", width: "100%" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem" }}>
              Connect with {alm.name}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#464555", marginBottom: "1rem" }}>
              Include a personalized note to introduce yourself and state why you'd like to connect.
            </p>
            <textarea rows={3} placeholder="Hi Aarav, I am a 3rd year CS student at CampusConnect interested in backend engineering..." style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem", marginBottom: "1rem" }} />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button onClick={() => setShowConnectModal(false)} style={{ padding: "0.5rem 1rem", border: "1px solid #c7c4d8", background: "#fff", borderRadius: "0.375rem" }}>Cancel</button>
              <button onClick={() => { setConnectionSent(true); setShowConnectModal(false); }} style={{ padding: "0.5rem 1rem", background: "#3525cd", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600 }}>Send Connection Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
