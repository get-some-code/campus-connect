import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusConnect – Career Readiness & Opportunity Platform",
  description:
    "Bridge the gap between academic learning and industry expectations with AI-powered skill analysis, opportunity matching, and application tracking.",
  keywords: ["campus placement", "career readiness", "skill assessment", "internships", "jobs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
