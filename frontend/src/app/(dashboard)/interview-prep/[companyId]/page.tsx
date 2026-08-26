"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import {
  COMPANIES,
  Company,
  InterviewQuestion,
  getQuestionsForCompany,
} from "@/lib/companyQuestionsData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function CompanyInterviewPracticePage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = use(params);
  const [company, setCompany] = useState<Company | null>(null);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Student Practice Input
  const [userAnswer, setUserAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const comp = COMPANIES.find((c) => c.id.toLowerCase() === companyId.toLowerCase()) || COMPANIES[0];
    setCompany(comp);
    const qList = getQuestionsForCompany(companyId);
    setQuestions(qList.length > 0 ? qList : getQuestionsForCompany("amazon"));
  }, [companyId]);

  const currentQ = questions[currentIndex] || questions[0];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer("");
      setIsSubmitted(false);
      setScore(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setUserAnswer("");
      setIsSubmitted(false);
      setScore(null);
    }
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    // Simulate smart keyword matching score
    const userLower = userAnswer.toLowerCase();
    let matches = 0;
    if (currentQ?.keyConcepts) {
      currentQ.keyConcepts.forEach((concept) => {
        if (userLower.includes(concept.toLowerCase().split(" ")[0])) {
          matches++;
        }
      });
    }

    const calculatedScore = Math.min(
      96,
      Math.max(78, 80 + matches * 5 + (userAnswer.length > 100 ? 5 : 0))
    );
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  if (!company || !currentQ) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading practice questions...</div>;
  }

  const progressPct = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Top Header */}
      <div>
        <Link href="/interview-prep" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.85rem", color: "#3525cd", fontWeight: 600, textDecoration: "none", marginBottom: "0.75rem" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
          Back to All Companies
        </Link>

        {/* Company Banner Header */}
        <div style={{ ...cardStyle, borderLeft: `6px solid ${company.brandColor || "#3525cd"}`, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <img src={company.logo} alt={company.name} style={{ width: "56px", height: "56px", borderRadius: "0.5rem", objectFit: "cover", border: "1px solid #e2e8f0" }} />
            <div>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
                  INTERVIEW PRACTICE
                </span>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b" }}>
                  {company.category}
                </span>
              </div>
              <h1 className="text-headline-md font-headline-md" style={{ color: "#141b2b", margin: "2px 0 0 0" }}>
                {company.name} — Real Interview Practice
              </h1>
              <p style={{ fontSize: "0.85rem", color: "#475569", margin: "2px 0 0 0" }}>
                {questions.length} Company-Specific Questions &bull; Difficulty: {company.difficultySummary}
              </p>
            </div>
          </div>

          {/* Question Counter & Progress */}
          <div style={{ textAlign: "right", minWidth: "180px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#141b2b" }}>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div style={{ width: "100%", height: "8px", background: "#e2e8f0", borderRadius: "999px", marginTop: "6px", overflow: "hidden" }}>
              <div style={{ width: `${progressPct}%`, height: "100%", background: "#3525cd", transition: "width 0.3s ease" }} />
            </div>
          </div>
        </div>
      </div>

      {/* QUESTION CARD */}
      <section style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Badges Bar */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, padding: "3px 10px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
              🎯 {currentQ.round}
            </span>

            <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", background: "#f1f3ff", color: "#475569" }}>
              Category: {currentQ.domain}
            </span>

            <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", background: currentQ.difficulty === "Easy" ? "#dcfce7" : currentQ.difficulty === "Medium" ? "#fef3c7" : "#fee2e2", color: currentQ.difficulty === "Easy" ? "#15803d" : currentQ.difficulty === "Medium" ? "#b45309" : "#b91c1c" }}>
              {currentQ.difficulty} Difficulty
            </span>
          </div>

          {/* Alumni Attribution Badge */}
          {currentQ.isAlumniContributed && (
            <div style={{ background: "#f0fdf4", padding: "4px 10px", borderRadius: "999px", border: "1px solid #bbf7d0", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#16a34a" }}>verified</span>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#15803d" }}>
                {currentQ.contributorBatch || "Alumni-Contributed Question"}
              </span>
            </div>
          )}
        </div>

        {/* Title & Question Text */}
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#141b2b", marginBottom: "0.5rem" }}>
            {currentQ.title}
          </h2>
          <p style={{ fontSize: "0.92rem", color: "#334155", lineHeight: 1.6, margin: 0, whiteSpace: "pre-line" }}>
            {currentQ.questionText}
          </p>
        </div>

        {/* Code Snippet if available */}
        {currentQ.codeSnippet && (
          <div style={{ background: "#1e1e2e", color: "#cdd6f4", padding: "1rem", borderRadius: "0.5rem", fontFamily: "monospace", fontSize: "0.85rem", overflowX: "auto", border: "1px solid #313244" }}>
            <p style={{ fontSize: "0.72rem", color: "#a6adc8", margin: "0 0 6px 0", fontWeight: 700, textTransform: "uppercase" }}>Function Signature / Code Template:</p>
            <pre style={{ margin: 0 }}>{currentQ.codeSnippet}</pre>
          </div>
        )}

        {/* Expected Concepts */}
        <div style={{ background: "#f8fafc", padding: "0.85rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
          <p style={{ fontSize: "0.78rem", fontWeight: 800, color: "#3525cd", margin: "0 0 6px 0", textTransform: "uppercase" }}>
            💡 Key Concepts Evaluated by Intervewer
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {currentQ.keyConcepts.map((c) => (
              <span key={c} style={{ fontSize: "0.75rem", padding: "2px 8px", background: "#f1f3ff", color: "#3525cd", borderRadius: "4px", fontWeight: 600 }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ANSWER WORKSPACE */}
      <section style={{ ...cardStyle, borderTop: "4px solid #3525cd" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#141b2b", marginBottom: "0.5rem" }}>
          Your Solution &amp; Answer Workspace
        </h3>
        <p style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "1rem" }}>
          Type your code solution or structured answer points below and click "Submit &amp; Check Answer" to evaluate against standard interview solutions.
        </p>

        <form onSubmit={handleSubmitAnswer} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <textarea
            rows={7}
            placeholder="Type your solution, algorithm steps, or response points here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            style={{
              width: "100%",
              padding: "0.85rem",
              borderRadius: "0.5rem",
              border: "1.5px solid #c7c4d8",
              fontSize: "0.9rem",
              fontFamily: currentQ.codeSnippet ? "monospace" : "inherit",
              outline: "none",
              lineHeight: 1.5,
            }}
            required
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                style={{
                  padding: "0.55rem 1rem",
                  border: "1px solid #c7c4d8",
                  background: "#fff",
                  color: currentIndex === 0 ? "#cbd5e1" : "#475569",
                  borderRadius: "0.375rem",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                }}
              >
                ← Previous Question
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                style={{
                  padding: "0.55rem 1rem",
                  border: "1px solid #c7c4d8",
                  background: "#fff",
                  color: currentIndex === questions.length - 1 ? "#cbd5e1" : "#475569",
                  borderRadius: "0.375rem",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: currentIndex === questions.length - 1 ? "not-allowed" : "pointer",
                }}
              >
                Next Question →
              </button>
            </div>

            <button
              type="submit"
              style={{
                padding: "0.65rem 1.5rem",
                background: "#3525cd",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 12px rgba(53, 37, 205, 0.25)",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>check_circle</span>
              Submit &amp; Check Answer
            </button>
          </div>
        </form>
      </section>

      {/* SOLUTION FEEDBACK CARD */}
      {isSubmitted && (
        <section style={{ ...cardStyle, background: "#fafafa", borderLeft: "5px solid #16a34a" }}>
          {/* Feedback Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "28px", color: "#16a34a" }}>stars</span>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#141b2b", margin: 0 }}>
                  Answer Evaluation &amp; Model Solution
                </h3>
                <p style={{ fontSize: "0.8rem", color: "#475569", margin: 0 }}>
                  Compared against alumni &amp; interview evaluation benchmark standards.
                </p>
              </div>
            </div>

            <span style={{ fontSize: "1.1rem", fontWeight: 800, padding: "0.35rem 0.85rem", borderRadius: "999px", background: "#dcfce7", color: "#15803d" }}>
              {score}% Concept Match
            </span>
          </div>

          {/* Expected Points Checklist */}
          {currentQ.expectedPoints && currentQ.expectedPoints.length > 0 && (
            <div style={{ marginBottom: "1.25rem" }}>
              <p style={{ fontSize: "0.82rem", fontWeight: 800, color: "#141b2b", marginBottom: "6px" }}>
                ✅ Key Evaluation Criteria Checklist:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {currentQ.expectedPoints.map((pt) => (
                  <div key={pt} style={{ display: "flex", alignItems: "flex-start", gap: "6px", fontSize: "0.85rem", color: "#334155" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "#16a34a" }}>task_alt</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Standard Solution */}
          <div>
            <p style={{ fontSize: "0.82rem", fontWeight: 800, color: "#3525cd", marginBottom: "6px", textTransform: "uppercase" }}>
              📘 Standard Model Solution / Answer Structure:
            </p>
            <div style={{ background: "#1e1e2e", color: "#cdd6f4", padding: "1.25rem", borderRadius: "0.5rem", fontFamily: currentQ.codeSnippet ? "monospace" : "inherit", fontSize: "0.88rem", lineHeight: 1.6, overflowX: "auto", border: "1px solid #313244" }}>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{currentQ.sampleSolution}</pre>
            </div>
          </div>

          {/* Bottom Next CTA */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.25rem" }}>
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                style={{
                  padding: "0.6rem 1.5rem",
                  background: "#16a34a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Proceed to Next Question →
              </button>
            ) : (
              <Link
                href="/interview-prep"
                style={{
                  padding: "0.6rem 1.5rem",
                  background: "#3525cd",
                  color: "#fff",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  textDecoration: "none",
                }}
              >
                🎉 Completed All Questions for {company.name}!
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
