"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { User } from "@/types";

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
};

export default function StudentProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => { api.getUser().then(setUser); }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header>
        <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Student Profile</h1>
        <p className="text-body-md" style={{ color: "#464555" }}>Manage your portfolio, academic credentials, and career preferences.</p>
      </header>

      {/* Profile Card */}
      <div style={{ ...card, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.5rem" }}>
        <img
          src={user?.avatarUrl || "https://ui-avatars.com/api/?name=Alex+Mercer&background=ebe9ff&color=3525cd&size=96"}
          alt="Profile Avatar"
          style={{ width: "88px", height: "88px", borderRadius: "50%", objectFit: "cover", border: "3px solid #3525cd", flexShrink: 0 }}
        />
        <div>
          <h2 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>{user?.name ?? "Alex Mercer"}</h2>
          <p className="text-body-md" style={{ color: "#464555" }}>{user?.email ?? "alex.mercer@university.edu"}</p>
          <p className="text-body-sm" style={{ color: "#3525cd", marginTop: "4px", fontWeight: 500 }}>
            {user?.degree ?? "B.Tech Computer Science"} &bull; Class of {user?.gradYear ?? "2026"}
          </p>
        </div>
        <button
          className="text-label-md font-label-md text-white rounded-lg"
          style={{ marginLeft: "auto", padding: "0.5rem 1.25rem", background: "#3525cd" }}
        >
          Edit Profile
        </button>
      </div>

      {/* Detail Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
        {/* Academic */}
        <section style={card}>
          <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.875rem" }}>Academic Details</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              ["Institution", user?.institution ?? "Indian Institute of Technology"],
              ["Degree",      user?.degree      ?? "B.Tech Computer Science"],
              ["Target Role", user?.targetRole  ?? "Software Engineer"],
              ["Graduating",  user?.gradYear    ? `Class of ${user.gradYear}` : "Class of 2026"],
            ].map(([key, val]) => (
              <div key={key} style={{ display: "flex", gap: "0.5rem" }}>
                <span className="text-body-sm" style={{ color: "#464555", minWidth: "110px", flexShrink: 0, fontWeight: 600 }}>{key}:</span>
                <span className="text-body-sm" style={{ color: "#141b2b" }}>{val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Docs */}
        <section style={card}>
          <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.875rem" }}>Verified Documents</h3>
          <div style={{ border: "1px solid #c7c4d8", borderRadius: "0.5rem", padding: "0.875rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "22px", color: "#ba1a1a" }}>picture_as_pdf</span>
              <div>
                <p className="text-body-sm" style={{ fontWeight: 600, color: "#141b2b" }}>Alex_Mercer_Resume.pdf</p>
                <p className="text-label-sm" style={{ color: "#464555" }}>Verified &bull; 1.2 MB</p>
              </div>
            </div>
            <button className="text-label-sm font-label-sm" style={{ color: "#3525cd" }}>Update</button>
          </div>
          <button
            className="w-full text-label-md font-label-md rounded-lg"
            style={{ marginTop: "0.75rem", padding: "0.5rem", border: "1.5px dashed #c7c4d8", color: "#464555", background: "transparent" }}
          >
            + Upload Document
          </button>
        </section>
      </div>
    </div>
  );
}
