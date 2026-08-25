"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_ALUMNI_NOTIFICATIONS, AlumniNotification } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function AlumniNotificationsPage() {
  const [notifications, setNotifications] = useState<AlumniNotification[]>(MOCK_ALUMNI_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Alumni Notifications</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>
            Updates on student mentorship requests, mock interviews, and hiring pipeline activity.
          </p>
        </div>
        <button onClick={markAllRead} style={{ fontSize: "0.8rem", color: "#3525cd", background: "none", border: "none", fontWeight: 600, cursor: "pointer" }}>
          Mark all as read
        </button>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {notifications.map((n) => (
          <div key={n.id} style={{ ...cardStyle, background: n.isRead ? "#fff" : "#f0f0ff", borderLeft: n.isRead ? "1px solid #c7c4d8" : "4px solid #3525cd" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>{n.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#475569", marginTop: "2px", margin: 0 }}>{n.description}</p>
                <span style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "6px", display: "inline-block" }}>{n.timestamp}</span>
              </div>
              {n.actionUrl && (
                <Link href={n.actionUrl} style={{ fontSize: "0.78rem", fontWeight: 700, color: "#3525cd", textDecoration: "none" }}>
                  View &rarr;
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
