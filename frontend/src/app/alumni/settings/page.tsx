"use client";

import { useState } from "react";
import { CURRENT_ALUMNI_PROFILE } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function AlumniSettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "career" | "mentorship" | "notifications" | "privacy">("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header>
        <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Alumni Portal Settings</h1>
        <p className="text-body-md" style={{ color: "#464555" }}>
          Manage your career profile details, mentorship availability, and notification preferences.
        </p>
      </header>

      {/* Tabs Header */}
      <div style={{ display: "flex", gap: "6px", background: "#f1f3ff", padding: "4px", borderRadius: "0.5rem", border: "1px solid #c7c4d8", width: "fit-content", flexWrap: "wrap" }}>
        {(["profile", "career", "mentorship", "notifications", "privacy"] as const).map((tab) => (
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
              textTransform: "capitalize",
            }}
          >
            {tab} Settings
          </button>
        ))}
      </div>

      {saved && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.85rem", fontWeight: 600 }}>
          ✓ Alumni Preferences Saved Successfully!
        </div>
      )}

      <form onSubmit={handleSave} style={cardStyle}>
        {activeTab === "profile" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>Public Career Profile Details</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Full Name</label>
                <input type="text" defaultValue={CURRENT_ALUMNI_PROFILE.name} style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Graduation Year</label>
                <input type="number" defaultValue={CURRENT_ALUMNI_PROFILE.gradYear} style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Current Company</label>
                <input type="text" defaultValue={CURRENT_ALUMNI_PROFILE.currentCompany} style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Current Role</label>
                <input type="text" defaultValue={CURRENT_ALUMNI_PROFILE.currentRole} style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Professional Bio</label>
              <textarea rows={3} defaultValue={CURRENT_ALUMNI_PROFILE.bio} style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
            </div>
          </div>
        )}

        {activeTab === "mentorship" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>Mentorship Availability &amp; Preferences</h2>
            
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", fontWeight: 600, color: "#141b2b", cursor: "pointer" }}>
              <input type="checkbox" defaultChecked={CURRENT_ALUMNI_PROFILE.isMentoringAvailable} style={{ accentColor: "#3525cd", width: "18px", height: "18px" }} />
              Active &amp; Available for Student Mentorship Requests
            </label>

            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Preferred Topics (comma separated)</label>
              <input type="text" defaultValue={CURRENT_ALUMNI_PROFILE.preferredMentorshipTopics.join(", ")} style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }} />
            </div>

            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", display: "block", marginBottom: "4px" }}>Weekly Time Commitment</label>
              <select style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem", background: "#fff" }}>
                <option>1-2 Hours / Week</option>
                <option>3-5 Hours / Week</option>
                <option>Async Text Reviews Only</option>
              </select>
            </div>
          </div>
        )}

        {activeTab !== "profile" && activeTab !== "mentorship" && (
          <div style={{ padding: "1rem", color: "#64748b", fontSize: "0.88rem" }}>
            Configure your {activeTab} preference settings.
          </div>
        )}

        <div style={{ borderTop: "1px solid #e9edff", paddingTop: "1rem", marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" style={{ padding: "0.5rem 1.5rem", background: "#3525cd", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
