"use client";

import { useState } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-lg"
      style={{ background: "#f9f9ff", color: "#141b2b" }}
    >
      <div
        className="w-full rounded-2xl border shadow-sm"
        style={{ maxWidth: "420px", background: "#fff", borderColor: "#c7c4d8", padding: "2rem" }}
      >
        <div className="text-center mb-xl">
          <Link href="/" className="inline-flex items-center gap-xs mb-md">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#3525cd" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#fff", fontVariationSettings: "'FILL' 1" }}>
                rocket_launch
              </span>
            </div>
            <span className="text-headline-md font-headline-md font-bold" style={{ color: "#3525cd" }}>CampusConnect</span>
          </Link>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Reset Password</h1>
          <p className="text-body-sm mt-xs" style={{ color: "#464555" }}>
            {submitted ? "Check your email for reset instructions." : "Enter your account email to receive a reset link."}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-md">
            <div>
              <label className="block text-label-md font-label-md mb-xs" style={{ color: "#141b2b" }}>Email Address</label>
              <input
                type="email"
                required
                placeholder="alex@university.edu"
                className="w-full rounded-lg text-body-md outline-none transition-all"
                style={{ padding: "0.5rem 0.875rem", background: "#f1f3ff", border: "1.5px solid #c7c4d8", color: "#141b2b" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#3525cd"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(53,37,205,0.1)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#c7c4d8"; e.currentTarget.style.boxShadow = ""; }}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg text-label-md font-label-md text-white"
              style={{ padding: "0.625rem", background: "#3525cd" }}
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center py-md space-y-md">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
              style={{ background: "rgba(233,221,255,0.5)" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "28px", color: "#3525cd" }}>mark_email_read</span>
            </div>
            <p className="text-body-md" style={{ color: "#141b2b" }}>Instructions sent! Check your inbox.</p>
          </div>
        )}

        <div className="mt-xl pt-md text-center text-body-sm" style={{ borderTop: "1px solid #c7c4d8", color: "#464555" }}>
          Remember your password?{" "}
          <Link href="/login" className="font-semibold hover:underline" style={{ color: "#3525cd" }}>Back to login</Link>
        </div>
      </div>
    </div>
  );
}
