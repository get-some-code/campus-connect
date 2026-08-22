"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#f9f9ff" }}>
      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(249,249,255,0.9)", backdropFilter: "blur(12px)", borderColor: "#c7c4d8" }}
      >
        <div className="max-w-7xl mx-auto px-lg h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-xs">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "#3525cd" }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "16px", color: "#fff", fontVariationSettings: "'FILL' 1" }}
              >
                rocket_launch
              </span>
            </div>
            <span className="text-headline-md font-headline-md font-bold" style={{ color: "#3525cd" }}>
              CampusConnect
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-xl text-body-sm font-label-md" style={{ color: "#464555" }}>
            <a href="#features" className="hover:text-primary transition-colors" style={{ color: "#464555" }}>Features</a>
            <a href="#how" className="hover:text-primary transition-colors" style={{ color: "#464555" }}>How it works</a>
          </div>

          <div className="flex items-center gap-sm">
            <Link
              href="/login"
              className="px-md py-sm rounded-lg text-label-md font-label-md transition-all"
              style={{ color: "#464555" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e9edff")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-md py-sm rounded-lg text-label-md font-label-md shadow-sm transition-all text-white"
              style={{ background: "#3525cd" }}
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section
        className="w-full"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 15% 20%, rgba(53,37,205,0.07) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 85% 75%, rgba(107,56,212,0.05) 0%, transparent 55%), #f9f9ff",
          padding: "80px 24px",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-xs px-md py-xs rounded-full border mb-xl text-label-sm font-label-sm"
            style={{ background: "rgba(233,221,255,0.5)", borderColor: "#d0bcff", color: "#3525cd" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "13px", color: "#6b38d4", fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            Next-Gen Campus Placement Platform
          </div>

          {/* Headline */}
          <h1
            className="font-bold mb-lg"
            style={{ fontSize: "3.5rem", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#141b2b" }}
          >
            Bridge the gap between{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3525cd 0%, #8455ef 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              campus learning
            </span>
            {" "}&amp; industry expectations.
          </h1>

          {/* Sub */}
          <p className="text-body-lg font-body-lg mb-2xl mx-auto" style={{ color: "#464555", maxWidth: "600px" }}>
            Empower your career with AI-powered skill analysis, targeted assessments, and smart
            opportunity matching — built for students, trusted by recruiters.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-md justify-center items-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-xs px-xl py-md rounded-xl text-label-md font-label-md text-white shadow-md transition-all"
              style={{ background: "linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)" }}
            >
              Explore Dashboard
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
            </Link>
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-xs px-xl py-md rounded-xl text-label-md font-label-md border transition-all"
              style={{ background: "#fff", borderColor: "#c7c4d8", color: "#141b2b" }}
            >
              View Opportunities
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center gap-md mt-2xl">
            {[
              { icon: "school", text: "500+ Campuses" },
              { icon: "work", text: "10k+ Opportunities" },
              { icon: "star", text: "4.9★ Student Rating" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-xs px-md py-sm rounded-full border text-body-sm"
                style={{ background: "#fff", borderColor: "#c7c4d8", color: "#464555" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "#3525cd", fontVariationSettings: "'FILL' 1" }}>
                  {item.icon}
                </span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section id="features" className="border-t" style={{ borderColor: "#c7c4d8", background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-lg py-3xl">
          <div className="text-center mb-2xl">
            <h2 className="text-headline-lg font-headline-lg mb-sm" style={{ color: "#141b2b" }}>
              Everything you need to land your dream role
            </h2>
            <p className="text-body-lg mx-auto" style={{ color: "#464555", maxWidth: "520px" }}>
              From skill gap analysis to application tracking — one platform, end-to-end.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {[
              { icon: "terminal", title: "Skills Diagnostic", desc: "Quantify your coding, analytical, and soft skill benchmarks against real hiring requirements.", bg: "rgba(235,233,255,0.5)" },
              { icon: "work", title: "Matched Jobs", desc: "Receive job and internship recommendations calculated based on your verified skill match score.", bg: "rgba(233,221,255,0.4)" },
              { icon: "analytics", title: "Pipeline Tracker", desc: "Manage your applications in a streamlined Kanban workflow from initial submission to final offer.", bg: "rgba(235,233,255,0.5)" },
            ].map((feat, i) => (
              <div
                key={feat.title}
                className="feature-card rounded-2xl border p-xl flex flex-col gap-md"
                style={{
                  background: "#f9f9ff",
                  borderColor: "#c7c4d8",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: feat.bg }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "24px", color: "#3525cd", fontVariationSettings: "'FILL' 1" }}>
                    {feat.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-headline-md font-headline-md mb-xs" style={{ color: "#141b2b" }}>{feat.title}</h3>
                  <p className="text-body-md" style={{ color: "#464555", lineHeight: 1.7 }}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────── */}
      <section style={{ background: "#3525cd" }}>
        <div className="max-w-5xl mx-auto px-lg py-2xl flex flex-col sm:flex-row items-center justify-between gap-lg">
          <div>
            <h2 className="text-headline-lg font-headline-lg mb-xs" style={{ color: "#fff" }}>
              Ready to launch your career?
            </h2>
            <p className="text-body-md" style={{ color: "rgba(255,255,255,0.8)" }}>
              Join thousands of students already using CampusConnect.
            </p>
          </div>
          <Link
            href="/signup"
            className="shrink-0 inline-flex items-center gap-xs px-xl py-md rounded-xl text-label-md font-label-md shadow-md transition-all"
            style={{ background: "#fff", color: "#3525cd" }}
          >
            Get Started Free
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t py-lg px-lg" style={{ borderColor: "#c7c4d8", background: "#f9f9ff" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-md">
          <div className="flex items-center gap-xs">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#3525cd" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "13px", color: "#fff", fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
            </div>
            <span className="text-label-md font-label-md font-bold" style={{ color: "#141b2b" }}>CampusConnect</span>
          </div>
          <p className="text-body-sm text-center" style={{ color: "#464555" }}>
            © 2026 CampusConnect. Built with Next.js, Tailwind CSS &amp; FastAPI.
          </p>
          <div className="flex items-center gap-lg text-body-sm" style={{ color: "#464555" }}>
            <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
            <Link href="/signup" className="hover:text-primary transition-colors">Sign Up</Link>
            <Link href="/opportunities" className="hover:text-primary transition-colors">Jobs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
