"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobileDrawer?: () => void;
}

const navLinks = [
  { label: "Dashboard",       href: "/dashboard",           icon: "dashboard" },
  { label: "Readiness Portal",href: "/dashboard-v2",        icon: "monitoring" },
  { label: "Profile",         href: "/profile",             icon: "person" },
  { label: "Skills Matrix",   href: "/skills",              icon: "terminal" },
  { label: "Skill Assessment",href: "/skills/assessment",   icon: "quiz" },
  { label: "Gap Analysis",    href: "/skills/gap-analysis", icon: "analytics" },
  { label: "Opportunities",   href: "/opportunities",       icon: "work" },
  { label: "Saved Jobs",      href: "/opportunities/saved", icon: "bookmark" },
  { label: "Applications",    href: "/applications",        icon: "description" },
  { label: "Notifications",  href: "/empty-states",        icon: "notifications" },
];

export default function Sidebar({ mobileOpen = false, onCloseMobileDrawer }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === href || pathname?.startsWith(href + "/");

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobileDrawer}
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(20,27,43,0.4)", backdropFilter: "blur(2px)" }}
        />
      )}

      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-screen z-50 flex flex-col"
        style={{
          width: "256px",
          background: "#ffffff",
          borderRight: "1px solid #c7c4d8",
          padding: "1.25rem 0.75rem",
          transform: mobileOpen ? "translateX(0)" : undefined,
          transition: "transform 0.3s ease",
        }}
      >
        {/* Hide on mobile unless open */}
        <style>{`
          @media (max-width: 767px) {
            .sidebar-aside { transform: ${mobileOpen ? "translateX(0)" : "translateX(-100%)"}; }
          }
          @media (min-width: 768px) {
            .sidebar-aside { transform: translateX(0) !important; }
          }
        `}</style>

        {/* Logo header */}
        <div className="flex items-center justify-between mb-xl px-sm">
          <div>
            <Link href="/" className="block">
              <span className="text-headline-md font-headline-md font-bold" style={{ color: "#3525cd" }}>
                CampusConnect
              </span>
            </Link>
            <p className="text-label-sm font-label-sm" style={{ color: "#464555", marginTop: "2px" }}>
              Career Readiness Platform
            </p>
          </div>
          <button
            onClick={onCloseMobileDrawer}
            className="md:hidden rounded-lg p-1 transition-colors"
            style={{ color: "#464555" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>close</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-xs overflow-y-auto no-scrollbar">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onCloseMobileDrawer}
                className="flex items-center gap-md rounded-lg text-label-md font-label-md transition-all"
                style={{
                  padding: "0.5rem 0.75rem",
                  color: active ? "#3525cd" : "#464555",
                  background: active ? "#ebe9ff" : "transparent",
                  fontWeight: active ? 600 : 500,
                  borderRight: active ? "3px solid #3525cd" : "3px solid transparent",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "20px",
                    fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
                    color: active ? "#3525cd" : "#777587",
                  }}
                >
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Log out */}
        <div className="pt-md" style={{ borderTop: "1px solid #c7c4d8" }}>
          <Link
            href="/login"
            className="flex items-center gap-md rounded-lg text-label-md font-label-md transition-all"
            style={{ padding: "0.5rem 0.75rem", color: "#464555" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#777587" }}>logout</span>
            <span>Log Out</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
