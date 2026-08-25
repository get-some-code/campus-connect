"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AlumniSidebarProps {
  mobileOpen?: boolean;
  onCloseMobileDrawer?: () => void;
}

const alumniNavLinks = [
  { label: "Alumni Dashboard", href: "/alumni/dashboard",    icon: "dashboard" },
  { label: "Profile & Journey",href: "/alumni/profile",      icon: "person" },
  { label: "Alumni Directory", href: "/alumni/network",      icon: "group" },
  { label: "Mentorship Center",href: "/alumni/mentorship",   icon: "school" },
  { label: "Career Experiences",href: "/alumni/experiences", icon: "auto_stories" },
  { label: "Opportunities",   href: "/alumni/opportunities", icon: "work" },
  { label: "Hiring Pipeline",  href: "/alumni/applications",  icon: "how_to_reg" },
  { label: "Industry Insights",href: "/alumni/insights",      icon: "insights" },
  { label: "Community Feed",   href: "/alumni/community",     icon: "forum" },
  { label: "Settings",        href: "/alumni/settings",      icon: "settings" },
];

export default function AlumniSidebar({ mobileOpen = false, onCloseMobileDrawer }: AlumniSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (pathname === href) return true;

    const exactMatchExists = alumniNavLinks.some((link) => link.href === pathname);
    if (exactMatchExists) return false;

    const longerPrefixExists = alumniNavLinks.some(
      (link) => link.href !== href && link.href.length > href.length && pathname.startsWith(link.href)
    );
    if (longerPrefixExists) return false;

    return pathname.startsWith(href + "/");
  };

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
        {/* Mobile media query CSS */}
        <style>{`
          @media (max-width: 767px) {
            .alumni-sidebar-aside { transform: ${mobileOpen ? "translateX(0)" : "translateX(-100%)"}; }
          }
          @media (min-width: 768px) {
            .alumni-sidebar-aside { transform: translateX(0) !important; }
          }
        `}</style>

        {/* Logo header */}
        <div className="flex items-center justify-between mb-lg px-sm">
          <div>
            <Link href="/alumni/dashboard" className="block">
              <div className="flex items-center gap-xs">
                <span className="text-headline-md font-headline-md font-bold" style={{ color: "#3525cd" }}>
                  CampusConnect
                </span>
                <span style={{ fontSize: "0.65rem", fontWeight: 800, padding: "1px 6px", borderRadius: "4px", background: "#3525cd", color: "#fff", textTransform: "uppercase" }}>
                  ALUMNI
                </span>
              </div>
            </Link>
            <p className="text-label-sm font-label-sm" style={{ color: "#464555", marginTop: "2px" }}>
              Career Network &amp; Mentorship
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

        {/* Navigation links */}
        <nav className="flex-1 flex flex-col gap-xs overflow-y-auto no-scrollbar">
          {alumniNavLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onCloseMobileDrawer}
                className="flex items-center gap-md rounded-lg text-label-md font-label-md transition-all"
                style={{
                  padding: "0.48rem 0.75rem",
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

        {/* Switch to Student View */}
        <div className="pt-xs" style={{ borderTop: "1px solid #c7c4d8" }}>
          <Link
            href="/dashboard"
            className="flex items-center gap-md rounded-lg text-label-md font-label-md transition-all"
            style={{ padding: "0.5rem 0.75rem", color: "#3525cd", background: "#f0f0ff", fontWeight: 600 }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#3525cd" }}>
              swap_horiz
            </span>
            <span>Switch to Student View</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
