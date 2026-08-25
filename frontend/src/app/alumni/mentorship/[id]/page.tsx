"use client";

import { use, useState } from "react";
import Link from "next/link";
import { MOCK_MENTORSHIP_REQUESTS } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function MentorshipRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const req = MOCK_MENTORSHIP_REQUESTS.find((r) => r.id === id) || MOCK_MENTORSHIP_REQUESTS[0];
  const [status, setStatus] = useState(req.status);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Link href="/alumni/mentorship" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.85rem", color: "#3525cd", fontWeight: 600, textDecoration: "none" }}>
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
        Back to Mentorship Center
      </Link>

      <section style={{ ...cardStyle, borderLeft: "5px solid #3525cd" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <img src={req.studentAvatar} alt={req.studentName} style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: "2px solid #3525cd" }} />
            <div>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
                STUDENT MENTORSHIP REQUEST
              </span>
              <h1 className="text-headline-md font-headline-md" style={{ color: "#141b2b", margin: "2px 0 0 0" }}>
                {req.studentName}
              </h1>
              <p style={{ fontSize: "0.85rem", color: "#475569", margin: 0 }}>
                {req.degree} ({req.department}) &bull; Class of {req.gradYear}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setStatus("declined")}
              style={{ padding: "0.5rem 1rem", border: "1px solid #c7c4d8", background: "#fff", color: "#dc2626", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.85rem" }}
            >
              Decline
            </button>
            <button
              onClick={() => { setStatus("active"); setShowScheduleModal(true); }}
              style={{ padding: "0.5rem 1.25rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.85rem" }}
            >
              Accept &amp; Schedule
            </button>
          </div>
        </div>

        <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", marginBottom: "1.25rem" }}>
          <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#3525cd", marginBottom: "4px" }}>
            Topic Requested: {req.requestedTopic}
          </p>
          <p style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.6, margin: 0 }}>
            "{req.message}"
          </p>
        </div>

        {/* Student Profile Analysis */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#777587", textTransform: "uppercase", marginBottom: "6px" }}>Career Target</p>
            <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>{req.careerGoal}</p>
          </div>

          <div>
            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#777587", textTransform: "uppercase", marginBottom: "6px" }}>Preferred Slot</p>
            <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>{req.requestedDate}</p>
          </div>
        </div>
      </section>

      {/* Skill Gaps Analysis */}
      <section style={cardStyle}>
        <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.75rem" }}>
          Student Skill Matrix &amp; Focus Gaps
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#16a34a", marginBottom: "4px" }}>✅ Active Skills</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {req.skills.map((s) => (
                <span key={s} style={{ fontSize: "0.75rem", padding: "2px 8px", background: "#dcfce7", color: "#15803d", borderRadius: "4px", fontWeight: 600 }}>{s}</span>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#dc2626", marginBottom: "4px" }}>⚠️ Priority Skill Gaps to Mentor</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {req.skillGaps.map((g) => (
                <span key={g} style={{ fontSize: "0.75rem", padding: "2px 8px", background: "#fee2e2", color: "#b91c1c", borderRadius: "4px", fontWeight: 600 }}>{g}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

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
            <input type="text" defaultValue="https://meet.google.com/abc-defg-hij" style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem", marginBottom: "1rem" }} />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button onClick={() => setShowScheduleModal(false)} style={{ padding: "0.5rem 1rem", border: "1px solid #c7c4d8", background: "#fff", borderRadius: "0.375rem" }}>Cancel</button>
              <button onClick={() => setShowScheduleModal(false)} style={{ padding: "0.5rem 1rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600 }}>Confirm &amp; Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
