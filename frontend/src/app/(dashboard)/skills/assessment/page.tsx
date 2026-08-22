"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: 1,
    question: "Which hook should be used for side-effects in React Client Components?",
    options: [
      "useEffect — runs after render on the client side",
      "useMemo — runs synchronously during render",
      "useState — triggers re-render on state change",
      "useLayoutEffect — runs before browser paint",
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "In Python FastAPI, how do you define an asynchronous request handler?",
    options: [
      "async def get_items(): ...",
      "def async get_items(): ...",
      "@async.route('/items')",
      "function async get_items(): ...",
    ],
    correctIndex: 0,
  },
  {
    id: 3,
    question: "What does the 'O' in SOLID principles stand for?",
    options: [
      "Open/Closed Principle",
      "Object Composition Principle",
      "Overloading Principle",
      "Orthogonality Principle",
    ],
    correctIndex: 0,
  },
];

export default function SkillAssessmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);

  const q = questions[step];
  const score = Math.round(
    (Object.entries(answers).filter(([i, a]) => questions[parseInt(i)].correctIndex === a).length / questions.length) * 100
  );

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "0.875rem", borderBottom: "1px solid #c7c4d8" }}>
        <div>
          <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Skill Assessment</h1>
          <p className="text-body-sm" style={{ color: "#464555" }}>Front-End &amp; FastAPI Benchmark Evaluation</p>
        </div>
        <Link href="/skills" className="text-label-md font-label-md" style={{ color: "#3525cd" }}>Cancel</Link>
      </header>

      {!completed ? (
        <div style={{ background: "#fff", border: "1px solid #c7c4d8", borderRadius: "0.875rem", padding: "1.75rem", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          {/* Progress */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span className="text-label-sm font-label-sm" style={{ color: "#464555" }}>Question {step + 1} of {questions.length}</span>
            <span className="text-label-sm font-label-sm" style={{ color: "#464555" }}>{Math.round(((step + 1) / questions.length) * 100)}% complete</span>
          </div>
          <div style={{ width: "100%", height: "6px", background: "#e9edff", borderRadius: "999px", marginBottom: "1.5rem", overflow: "hidden" }}>
            <div style={{ width: `${((step + 1) / questions.length) * 100}%`, height: "100%", background: "linear-gradient(90deg,#3525cd,#4f46e5)", borderRadius: "999px", transition: "width 0.3s ease" }} />
          </div>

          {/* Question */}
          <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "1.25rem" }}>{q.question}</h2>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
            {q.options.map((opt, idx) => {
              const selected = answers[step] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setAnswers({ ...answers, [step]: idx })}
                  className="w-full text-left text-body-md rounded-lg"
                  style={{
                    padding: "0.875rem 1rem",
                    border: `2px solid ${selected ? "#3525cd" : "#c7c4d8"}`,
                    background: selected ? "rgba(53,37,205,0.05)" : "#fff",
                    color: selected ? "#3525cd" : "#141b2b",
                    fontWeight: selected ? 500 : 400,
                    transition: "all 0.15s ease",
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => step < questions.length - 1 ? setStep(step + 1) : setCompleted(true)}
              disabled={answers[step] === undefined}
              className="inline-flex items-center gap-xs text-label-md font-label-md text-white rounded-lg"
              style={{
                padding: "0.625rem 1.5rem",
                background: answers[step] !== undefined ? "#3525cd" : "#c7c4d8",
                cursor: answers[step] !== undefined ? "pointer" : "not-allowed",
                transition: "background 0.15s ease",
              }}
            >
              {step < questions.length - 1 ? "Next Question" : "Submit Assessment"}
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
            </button>
          </div>
        </div>
      ) : (
        /* Completion */
        <div style={{ background: "#fff", border: "1px solid #c7c4d8", borderRadius: "0.875rem", padding: "2.5rem", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(233,221,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "36px", color: "#3525cd", fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
          </div>
          <h2 className="text-display font-display" style={{ color: "#141b2b", marginBottom: "0.5rem" }}>Assessment Complete!</h2>
          <p className="text-body-md" style={{ color: "#464555", marginBottom: "1.5rem" }}>
            You scored <strong style={{ color: "#3525cd" }}>{score}%</strong> on the Frontend &amp; FastAPI benchmark.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/skills/gap-analysis" className="inline-flex items-center gap-xs text-label-md font-label-md text-white rounded-lg" style={{ padding: "0.625rem 1.5rem", background: "#3525cd" }}>
              View Gap Analysis
            </Link>
            <Link href="/opportunities" className="inline-flex items-center gap-xs text-label-md font-label-md rounded-lg" style={{ padding: "0.625rem 1.5rem", border: "1px solid #c7c4d8", color: "#141b2b" }}>
              Matched Opportunities
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
