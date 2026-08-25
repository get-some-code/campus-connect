"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import AlumniSidebar from "@/components/layout/AlumniSidebar";

export default function AlumniLayout({ children }: { children: React.ReactNode }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ background: "#f9f9ff", color: "#141b2b" }}>
      <AlumniSidebar mobileOpen={mobileDrawerOpen} onCloseMobileDrawer={() => setMobileDrawerOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: "0" }}>
        <style>{`@media (min-width: 768px) { .alumni-content-area { margin-left: 256px; } }`}</style>
        <div className="alumni-content-area flex-1 flex flex-col min-h-screen">
          <Navbar onToggleMobileDrawer={() => setMobileDrawerOpen((p) => !p)} />
          <main style={{ flex: 1, padding: "1.5rem", maxWidth: "1440px", width: "100%", margin: "0 auto" }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
