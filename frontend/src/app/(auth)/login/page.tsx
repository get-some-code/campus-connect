"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-lg"
      style={{ background: "#f9f9ff", color: "#141b2b" }}
    >
      <div
        className="w-full rounded-2xl border shadow-sm"
        style={{ maxWidth: "420px", background: "#fff", borderColor: "#c7c4d8", padding: "2rem" }}
      >
        {/* Logo */}
        <div className="text-center mb-xl">
          <Link href="/" className="inline-flex items-center gap-xs mb-md">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#3525cd" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#fff", fontVariationSettings: "'FILL' 1" }}>
                rocket_launch
              </span>
            </div>
            <span className="text-headline-md font-headline-md font-bold" style={{ color: "#3525cd" }}>CampusConnect</span>
          </Link>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Welcome back</h1>
          <p className="text-body-sm mt-xs" style={{ color: "#464555" }}>Log in to access your student dashboard.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-md">
          <div>
            <label className="block text-label-md font-label-md mb-xs" style={{ color: "#141b2b" }}>Email Address</label>
            <input
              type="email"
              required
              defaultValue="alex.mercer@university.edu"
              className="w-full rounded-lg text-body-md outline-none transition-all"
              style={{ padding: "0.5rem 0.875rem", background: "#f1f3ff", border: "1.5px solid #c7c4d8", color: "#141b2b" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#3525cd"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(53,37,205,0.1)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#c7c4d8"; e.currentTarget.style.boxShadow = ""; }}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-xs">
              <label className="text-label-md font-label-md" style={{ color: "#141b2b" }}>Password</label>
              <Link href="/reset-password" className="text-label-sm hover:underline" style={{ color: "#3525cd" }}>Forgot password?</Link>
            </div>
            <input
              type="password"
              required
              defaultValue="password123"
              className="w-full rounded-lg text-body-md outline-none transition-all"
              style={{ padding: "0.5rem 0.875rem", background: "#f1f3ff", border: "1.5px solid #c7c4d8", color: "#141b2b" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#3525cd"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(53,37,205,0.1)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#c7c4d8"; e.currentTarget.style.boxShadow = ""; }}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg text-label-md font-label-md text-white transition-all"
            style={{ padding: "0.625rem", background: "#3525cd" }}
          >
            Log In
          </button>
        </form>

        <div className="mt-xl pt-md text-center text-body-sm" style={{ borderTop: "1px solid #c7c4d8", color: "#464555" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold hover:underline" style={{ color: "#3525cd" }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
