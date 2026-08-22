"use client";

import Link from "next/link";
import { useState } from "react";

type FilterType = "all" | "application" | "match" | "skill" | "reminder";

interface Notification {
  id: string;
  type: "application" | "match" | "skill" | "reminder";
  title: string;
  body: string;
  time: string;
  read: boolean;
  href?: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

const notifications: Notification[] = [
  {
    id: "n1",
    type: "application",
    title: "Application Advanced to Interview",
    body: "Your application for Software Engineer at Google has moved to the Interview stage.",
    time: "2 hours ago",
    read: false,
    href: "/applications/app_1",
    icon: "trending_up",
    iconBg: "rgba(233,221,255,0.6)",
    iconColor: "#3525cd",
  },
  {
    id: "n2",
    type: "match",
    title: "5 New Matched Opportunities",
    body: "Based on your updated skill matrix, 5 new roles matched your profile with 80%+ compatibility.",
    time: "5 hours ago",
    read: false,
    href: "/opportunities",
    icon: "bolt",
    iconBg: "rgba(233,221,255,0.5)",
    iconColor: "#6b38d4",
  },
  {
    id: "n3",
    type: "skill",
    title: "Skill Assessment Completed",
    body: "You scored 88% in Frontend Architecture — 88th percentile among all students.",
    time: "Yesterday",
    read: false,
    href: "/skills",
    icon: "workspace_premium",
    iconBg: "rgba(200,244,217,0.6)",
    iconColor: "#1a6e43",
  },
  {
    id: "n4",
    type: "reminder",
    title: "Interview Reminder — Tomorrow",
    body: "Technical interview for Software Engineer II at Meta is scheduled for tomorrow at 10:00 AM IST.",
    time: "Yesterday",
    read: true,
    href: "/applications/app_2",
    icon: "event",
    iconBg: "rgba(255,243,224,0.8)",
    iconColor: "#7a4e00",
  },
  {
    id: "n5",
    type: "application",
    title: "Application Submitted Successfully",
    body: "Your application for Full Stack Developer at Atlassian was received. Deadline: Oct 18.",
    time: "2 days ago",
    read: true,
    href: "/applications",
    icon: "check_circle",
    iconBg: "rgba(200,244,217,0.5)",
    iconColor: "#1a6e43",
  },
  {
    id: "n6",
    type: "skill",
    title: "Priority Gap Detected",
    body: "System Design is identified as a critical skill gap for your target role. Closing it improves match by 23%.",
    time: "3 days ago",
    read: true,
    href: "/skills/gap-analysis",
    icon: "warning",
    iconBg: "rgba(255,218,214,0.6)",
    iconColor: "#93000a",
  },
  {
    id: "n7",
    type: "match",
    title: "Saved Job Deadline Approaching",
    body: "Amazon SDE Internship you bookmarked closes in 3 days. Don't miss the deadline!",
    time: "4 days ago",
    read: true,
    href: "/opportunities/saved",
    icon: "bookmark_alert",
    iconBg: "rgba(255,243,224,0.8)",
    iconColor: "#7a4e00",
  },
];

const filterLabels: { key: FilterType; label: string; icon: string }[] = [
  { key: "all",         label: "All",          icon: "inbox" },
  { key: "application", label: "Applications",  icon: "description" },
  { key: "match",       label: "Job Matches",   icon: "bolt" },
  { key: "skill",       label: "Skills",        icon: "terminal" },
  { key: "reminder",    label: "Reminders",     icon: "event" },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [items, setItems] = useState(notifications);

  const filtered = filter === "all" ? items : items.filter((n) => n.type === filter);
  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
        <div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Notifications
            {unreadCount > 0 && (
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "26px", height: "26px", borderRadius: "50%", background: "#3525cd", color: "#fff", fontSize: "12px", fontWeight: 700 }}>
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-body-md" style={{ color: "#464555" }}>Activity updates across your applications, skills, and job matches.</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-xs text-label-md font-label-md rounded-lg"
            style={{ padding: "0.5rem 1rem", border: "1px solid #c7c4d8", color: "#3525cd", background: "#fff" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>done_all</span>
            Mark all as read
          </button>
        )}
      </header>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "4px", overflowX: "auto", paddingBottom: "4px" }}>
        {filterLabels.map((f) => {
          const active = filter === f.key;
          const count = f.key === "all" ? items.filter((n) => !n.read).length : items.filter((n) => n.type === f.key && !n.read).length;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="inline-flex items-center gap-xs text-label-md font-label-md rounded-lg"
              style={{
                padding: "0.4rem 0.875rem",
                background: active ? "#3525cd" : "#fff",
                color: active ? "#fff" : "#464555",
                border: `1px solid ${active ? "#3525cd" : "#c7c4d8"}`,
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>{f.icon}</span>
              {f.label}
              {count > 0 && (
                <span style={{ background: active ? "rgba(255,255,255,0.3)" : "#e9edff", color: active ? "#fff" : "#3525cd", borderRadius: "999px", padding: "0 6px", fontSize: "11px", fontWeight: 700 }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Notification list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {filtered.length === 0 ? (
          <div style={{ background: "#fff", border: "1px solid #c7c4d8", borderRadius: "0.75rem", padding: "3rem", textAlign: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#c7c4d8" }}>notifications_off</span>
            <p className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginTop: "1rem" }}>All caught up!</p>
            <p className="text-body-sm" style={{ color: "#464555", marginTop: "4px" }}>No notifications in this category.</p>
          </div>
        ) : filtered.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markRead(notif.id)}
            style={{
              background: notif.read ? "#fff" : "rgba(235,233,255,0.3)",
              border: `1px solid ${notif.read ? "#c7c4d8" : "#d0bcff"}`,
              borderRadius: "0.75rem",
              padding: "1rem 1.25rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
              cursor: "pointer",
              transition: "box-shadow 0.15s ease, background 0.15s ease",
              position: "relative",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(53,37,205,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            {/* Unread dot */}
            {!notif.read && (
              <span style={{ position: "absolute", top: "14px", right: "14px", width: "8px", height: "8px", borderRadius: "50%", background: "#3525cd" }} />
            )}

            {/* Icon */}
            <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: notif.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: "20px", color: notif.iconColor, fontVariationSettings: "'FILL' 1" }}>
                {notif.icon}
              </span>
            </div>

            {/* Body */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", flexWrap: "wrap" }}>
                <p className="text-label-md font-label-md" style={{ color: "#141b2b", fontWeight: notif.read ? 500 : 700 }}>
                  {notif.title}
                </p>
                <span className="text-label-sm" style={{ color: "#777587", flexShrink: 0 }}>{notif.time}</span>
              </div>
              <p className="text-body-sm" style={{ color: "#464555", marginTop: "2px", lineHeight: 1.6 }}>{notif.body}</p>
              {notif.href && (
                <Link
                  href={notif.href}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-xs text-label-sm font-label-sm"
                  style={{ color: "#3525cd", marginTop: "6px" }}
                >
                  View Details
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>arrow_forward</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
