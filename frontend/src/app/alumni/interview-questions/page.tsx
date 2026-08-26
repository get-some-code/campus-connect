"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  COMPANIES,
  InterviewQuestion,
  getStoredQuestions,
  saveQuestion,
} from "@/lib/companyQuestionsData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function AlumniInterviewQuestionsPage() {
  const [activeTab, setActiveTab] = useState<"contribute" | "history">("contribute");
  const [questionsList, setQuestionsList] = useState<InterviewQuestion[]>([]);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Form State
  const [companyId, setCompanyId] = useState("amazon");
  const [customRole, setCustomRole] = useState("Software Engineer (SDE)");
  const [domain, setDomain] = useState<InterviewQuestion["domain"]>("DSA & Algorithms");
  const [round, setRound] = useState<InterviewQuestion["round"]>("Technical Round 1");
  const [difficulty, setDifficulty] = useState<InterviewQuestion["difficulty"]>("Medium");
  const [title, setTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [keyConcepts, setKeyConcepts] = useState("");
  const [sampleSolution, setSampleSolution] = useState("");

  useEffect(() => {
    setQuestionsList(getStoredQuestions());
  }, []);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedComp = COMPANIES.find((c) => c.id === companyId) || COMPANIES[0];

    const conceptsArray = keyConcepts
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const newQuestion: InterviewQuestion = {
      id: `q-contrib-${Date.now()}`,
      companyId: selectedComp.id,
      companyName: selectedComp.name,
      role: customRole || "Software Engineer",
      domain: domain,
      round: round,
      difficulty: difficulty,
      title: title || `${selectedComp.name} ${round} Question`,
      questionText: questionText,
      codeSnippet: codeSnippet || undefined,
      sampleSolution: sampleSolution || "No sample solution provided.",
      keyConcepts: conceptsArray.length > 0 ? conceptsArray : ["Core Concepts", "Problem Solving"],
      expectedPoints: [
        "Structure logic clearly before coding.",
        "Consider edge cases and time/space complexity.",
      ],
      contributorBatch: "Class of 2024 Alumni @ " + selectedComp.name,
      contributorRole: customRole || "Software Engineer",
      isAlumniContributed: true,
      contributedDate: "Just now",
    };

    const updated = saveQuestion(newQuestion);
    setQuestionsList(updated);

    // Reset Form
    setTitle("");
    setQuestionText("");
    setCodeSnippet("");
    setKeyConcepts("");
    setSampleSolution("");

    // Success Banner
    setSuccessBanner("Question contributed successfully. Students preparing for this company can now practice it.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const alumniHistory = questionsList.filter((q) => q.isAlumniContributed);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Success Notification Banner */}
      {successBanner && (
        <div
          style={{
            background: "#16a34a",
            color: "#fff",
            padding: "1.25rem 1.5rem",
            borderRadius: "0.75rem",
            boxShadow: "0 10px 25px rgba(22, 163, 74, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>check_circle</span>
            <div>
              <p style={{ margin: 0, fontWeight: 800, fontSize: "1rem" }}>Submission Successful!</p>
              <p style={{ margin: "2px 0 0 0", fontSize: "0.88rem", opacity: 0.95 }}>{successBanner}</p>
            </div>
          </div>
          <button
            onClick={() => setSuccessBanner(null)}
            style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: "0.85rem", fontWeight: 700 }}
          >
            Dismiss ✕
          </button>
        </div>
      )}

      {/* Header */}
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "1px 6px", borderRadius: "4px", background: "#3525cd", color: "#fff", textTransform: "uppercase" }}>
              ALUMNI CONTRIBUTIONS
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Interview Question Repository</h1>
          <p className="text-body-md" style={{ color: "#464555" }}>
            Share real interview questions you faced during campus recruitment. Help students practice company-specific interview rounds.
          </p>
        </div>

        <Link
          href="/dashboard"
          style={{
            padding: "0.5rem 1rem",
            background: "#f1f3ff",
            color: "#3525cd",
            borderRadius: "0.5rem",
            fontWeight: 700,
            fontSize: "0.85rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>visibility</span>
          View Student Prep Hub →
        </Link>
      </header>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "6px", background: "#f1f3ff", padding: "4px", borderRadius: "0.5rem", border: "1px solid #c7c4d8", width: "fit-content" }}>
        <button
          onClick={() => setActiveTab("contribute")}
          style={{
            padding: "0.45rem 1.25rem",
            borderRadius: "0.375rem",
            border: "none",
            background: activeTab === "contribute" ? "#fff" : "transparent",
            color: activeTab === "contribute" ? "#3525cd" : "#464555",
            fontWeight: activeTab === "contribute" ? 700 : 500,
            fontSize: "0.85rem",
            cursor: "pointer",
            boxShadow: activeTab === "contribute" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
          }}
        >
          ✍️ Contribute New Question
        </button>

        <button
          onClick={() => setActiveTab("history")}
          style={{
            padding: "0.45rem 1.25rem",
            borderRadius: "0.375rem",
            border: "none",
            background: activeTab === "history" ? "#fff" : "transparent",
            color: activeTab === "history" ? "#3525cd" : "#464555",
            fontWeight: activeTab === "history" ? 700 : 500,
            fontSize: "0.85rem",
            cursor: "pointer",
            boxShadow: activeTab === "history" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
          }}
        >
          📜 My Contributions ({alumniHistory.length})
        </button>
      </div>

      {/* TAB 1: FORM */}
      {activeTab === "contribute" && (
        <section style={{ ...cardStyle, borderTop: "4px solid #3525cd" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#141b2b", marginBottom: "0.25rem" }}>
            Contribute an Interview Question
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "1.5rem" }}>
            Fill in the details below. Your contribution will be made instantly available to students preparing for this company.
          </p>

          <form onSubmit={handleSubmitQuestion} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Company & Role Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                  Select Company *
                </label>
                <select
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.88rem", background: "#fff" }}
                  required
                >
                  {COMPANIES.map((comp) => (
                    <option key={comp.id} value={comp.id}>
                      {comp.name} ({comp.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                  Job Role / Designation *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer II (Backend)"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.88rem" }}
                  required
                />
              </div>
            </div>

            {/* Round & Domain & Difficulty Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                  Interview Round *
                </label>
                <select
                  value={round}
                  onChange={(e) => setRound(e.target.value as any)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.88rem", background: "#fff" }}
                  required
                >
                  <option value="Online Assessment">Online Assessment</option>
                  <option value="Technical Round 1">Technical Round 1</option>
                  <option value="Technical Round 2">Technical Round 2</option>
                  <option value="System Design">System Design</option>
                  <option value="HR & Behavioral">HR &amp; Behavioral</option>
                  <option value="Managerial Round">Managerial Round</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                  Domain Category *
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value as any)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.88rem", background: "#fff" }}
                  required
                >
                  <option value="DSA & Algorithms">DSA &amp; Algorithms</option>
                  <option value="System Design">System Design</option>
                  <option value="SQL & Databases">SQL &amp; Databases</option>
                  <option value="Core CS Fundamentals">Core CS Fundamentals</option>
                  <option value="Aptitude & Reasoning">Aptitude &amp; Reasoning</option>
                  <option value="HR & Behavioral">HR &amp; Behavioral</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                  Difficulty Level *
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.88rem", background: "#fff" }}
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Question Title */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                Question Title / Topic Headline *
              </label>
              <input
                type="text"
                placeholder="e.g. Find Kth Smallest Element in Sorted Matrix"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.88rem" }}
                required
              />
            </div>

            {/* Question Description */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                Full Question Text / Scenario Description *
              </label>
              <textarea
                rows={4}
                placeholder="Describe the problem, input/output constraints, or scenario presented by the interviewer..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.88rem", outline: "none" }}
                required
              />
            </div>

            {/* Optional Code Snippet */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                Starter Code / Function Signature (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="def find_kth(matrix: list[list[int]], k: int) -> int:"
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.85rem", fontFamily: "monospace", background: "#f8fafc" }}
              />
            </div>

            {/* Key Concepts */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                Key Concepts / Evaluation Criteria (Comma Separated) *
              </label>
              <input
                type="text"
                placeholder="Binary Search, Heap, O(N log K) Time Complexity"
                value={keyConcepts}
                onChange={(e) => setKeyConcepts(e.target.value)}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.88rem" }}
                required
              />
            </div>

            {/* Sample Solution / Explanation */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#141b2b", marginBottom: "4px" }}>
                Sample Solution / Explanation / Expected Key Points *
              </label>
              <textarea
                rows={5}
                placeholder="Provide standard solution code or key bullet points expected in a strong candidate answer..."
                value={sampleSolution}
                onChange={(e) => setSampleSolution(e.target.value)}
                style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1.5px solid #c7c4d8", fontSize: "0.88rem", outline: "none" }}
                required
              />
            </div>

            {/* Submit CTA */}
            <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
              <button
                type="submit"
                style={{
                  padding: "0.75rem 2rem",
                  background: "#3525cd",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 4px 14px rgba(53, 37, 205, 0.25)",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>send</span>
                Submit &amp; Publish Question
              </button>
            </div>
          </form>
        </section>
      )}

      {/* TAB 2: HISTORY */}
      {activeTab === "history" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {alumniHistory.length === 0 ? (
            <div style={{ ...cardStyle, textAlign: "center", padding: "3rem", color: "#64748b" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#c7c4d8" }}>history_edu</span>
              <p style={{ fontSize: "0.95rem", fontWeight: 600, marginTop: "8px" }}>No contributed questions found in history.</p>
              <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Submit your first interview question using the form tab above!</p>
            </div>
          ) : (
            alumniHistory.map((q) => (
              <div key={q.id} style={{ ...cardStyle, borderLeft: "5px solid #16a34a" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#dcfce7", color: "#15803d" }}>
                      Contributed by You
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>
                      🏢 {q.companyName} &bull; {q.round}
                    </span>
                  </div>

                  <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
                    {q.difficulty} Difficulty
                  </span>
                </div>

                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#141b2b", margin: "4px 0" }}>
                  {q.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#334155", lineHeight: 1.5, margin: "0 0 0.85rem 0" }}>
                  {q.questionText}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {q.keyConcepts.map((c) => (
                    <span key={c} style={{ fontSize: "0.72rem", padding: "2px 8px", background: "#f1f3ff", color: "#3525cd", borderRadius: "4px", fontWeight: 600 }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
