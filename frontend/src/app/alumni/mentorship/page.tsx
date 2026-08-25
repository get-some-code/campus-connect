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

  const handleAction = (id: string, newStatus: "active" | "declined") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
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
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Mentorship Center</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>
            Guide student career goals, review mentorship requests, and conduct 1-on-1 mock interviews.
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        <div style={{ ...cardStyle, textAlign: "center", background: "#f8fafc" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", margin: 0 }}>Pending Requests</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#3525cd", margin: "4px 0 0 0" }}>
            {requests.filter((r) => r.status === "pending").length}
          </p>
        </div>
        <div style={{ ...cardStyle, textAlign: "center", background: "#f8fafc" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", margin: 0 }}>Active Mentees</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#16a34a", margin: "4px 0 0 0" }}>
            {requests.filter((r) => r.status === "active").length}
          </p>
        </div>
        <div style={{ ...cardStyle, textAlign: "center", background: "#f8fafc" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", margin: 0 }}>Upcoming Sessions</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#6b38d4", margin: "4px 0 0 0" }}>1</p>
        </div>
        <div style={{ ...cardStyle, textAlign: "center", background: "#f8fafc" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", margin: 0 }}>Completed Sessions</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#334155", margin: "4px 0 0 0" }}>18</p>
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
            <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>When students request guidance, they will appear in this tab.</p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div key={req.id} style={{ ...cardStyle, borderLeft: "4px solid #3525cd" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", gap: "0.85rem", alignItems: "center" }}>
                  <img src={req.studentAvatar} alt={req.studentName} style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid #3525cd" }} />
                  <div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>
                      {req.studentName} &bull; <span style={{ color: "#475569", fontWeight: 500 }}>Class of {req.gradYear}</span>
                    </h3>
                    <p style={{ fontSize: "0.82rem", color: "#3525cd", fontWeight: 600, margin: "2px 0 0 0" }}>
                      Target Goal: {req.careerGoal}
                    </p>
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

              {/* Skills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 700, alignSelf: "center", marginRight: "4px" }}>Student Tech Stack:</span>
                {req.skills.map((sk) => (
                  <span key={sk} style={{ fontSize: "0.72rem", padding: "2px 8px", background: "#e2e8f0", color: "#334155", borderRadius: "4px", fontWeight: 600 }}>
                    {sk}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e9edff", paddingTop: "0.75rem" }}>
                <Link href={`/alumni/mentorship/${req.id}`} style={{ fontSize: "0.82rem", fontWeight: 700, color: "#3525cd", textDecoration: "none" }}>
                  View Full Request Details &rarr;
                </Link>

                {req.status === "pending" && (
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => handleAction(req.id, "declined")}
                      style={{ padding: "0.45rem 0.85rem", border: "1px solid #c7c4d8", background: "#fff", color: "#dc2626", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleAction(req.id, "active")}
                      style={{ padding: "0.45rem 1rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}
                    >
                      Accept Mentorship Request
                    </button>
                  </div>
                )}

                {req.status === "active" && (
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#16a34a" }}>
                    ✓ Active Mentorship Session Scheduled
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
