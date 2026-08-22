"use client";

import Link from "next/link";

interface NavbarProps {
  onToggleMobileDrawer?: () => void;
}

export default function Navbar({ onToggleMobileDrawer }: NavbarProps) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between"
      style={{
        height: "64px",
        padding: "0 1.5rem",
        background: "rgba(249,249,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #c7c4d8",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Left: hamburger + logo */}
      <div className="flex items-center gap-sm">
        {onToggleMobileDrawer && (
          <button
            onClick={onToggleMobileDrawer}
            aria-label="Toggle Navigation"
            className="md:hidden rounded-lg transition-colors"
            style={{ padding: "6px", color: "#464555" }}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}
        <Link href="/" className="flex items-center gap-xs">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "#3525cd" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "#fff", fontVariationSettings: "'FILL' 1" }}>
              rocket_launch
            </span>
          </div>
          <span className="hidden sm:block text-label-md font-label-md font-bold" style={{ color: "#3525cd" }}>CampusConnect</span>
        </Link>
      </div>

      {/* Center: search */}
      <div className="hidden md:flex flex-1 mx-8" style={{ maxWidth: "400px" }}>
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2" style={{ fontSize: "18px", color: "#777587" }}>
            search
          </span>
          <input
            type="text"
            placeholder="Search roles, skills, or applications..."
            className="w-full rounded-lg text-body-sm outline-none transition-all"
            style={{
              paddingLeft: "2.25rem",
              paddingRight: "0.875rem",
              paddingTop: "0.4rem",
              paddingBottom: "0.4rem",
              background: "#f1f3ff",
              border: "1.5px solid #c7c4d8",
              color: "#141b2b",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#3525cd"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(53,37,205,0.1)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#c7c4d8"; e.currentTarget.style.boxShadow = ""; }}
          />
        </div>
      </div>

      {/* Right: bookmark + avatar */}
      <div className="flex items-center gap-xs">
        <Link
          href="/empty-states"
          className="rounded-full flex items-center justify-center transition-colors"
          style={{ width: "36px", height: "36px", color: "#464555", position: "relative" }}
          title="Notifications"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>notifications</span>
          <span style={{ position: "absolute", top: "4px", right: "4px", width: "8px", height: "8px", borderRadius: "50%", background: "#3525cd", border: "2px solid #f9f9ff" }} />
        </Link>
        <Link
          href="/profile"
          className="rounded-full flex items-center justify-center transition-colors"
          style={{ width: "36px", height: "36px", color: "#464555" }}
          title="My Profile"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>account_circle</span>
        </Link>
      </div>
    </header>
  );
}
