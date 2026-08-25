"use client";

import { useState } from "react";
import { api } from "@/lib/api";

interface AtsScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunityId: string;
  jobTitle: string;
  company: string;
}

export default function AtsScannerModal({
  isOpen,
  onClose,
  opportunityId,
  jobTitle,
  company,
}: AtsScannerModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [atsResult, setAtsResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleRunScan = async () => {
    setIsScanning(true);
    const res = await api.predictAts(opportunityId, selectedFile, resumeText);
    setAtsResult(res);
    setIsScanning(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "1rem",
          maxWidth: "680px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "1.5rem",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          position: "relative",
          border: "1px solid #c7c4d8",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#4f46e5",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                document_scanner
              </span>
              AI ATS Resume Predictor
            </span>
            <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginTop: "2px" }}>
              Scan Resume for {jobTitle} @ {company}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#f1f5f9",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#64748b",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
              close
            </span>
          </button>
        </div>

        {/* Input area */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          {/* File input */}
          <div style={{ border: "2px dashed #c7c4d8", borderRadius: "0.5rem", padding: "1rem", textAlign: "center", background: "#f8fafc" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "32px", color: "#6366f1", marginBottom: "4px" }}>
              upload_file
            </span>
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#141b2b" }}>Upload Resume PDF or PNG</p>
            <p style={{ fontSize: "0.75rem", color: "#777587", marginBottom: "0.5rem" }}>PDF / Image parser</p>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.txt"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              style={{ fontSize: "0.8rem", width: "100%" }}
            />
            {selectedFile && (
              <p style={{ fontSize: "0.8rem", color: "#16a34a", marginTop: "6px", fontWeight: 600 }}>
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          {/* Text input */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#141b2b", marginBottom: "4px" }}>
              Or Paste Resume Text:
            </label>
            <textarea
              rows={4}
              placeholder="Paste resume content or project bullet points..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              style={{ width: "100%", flex: 1, padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.85rem" }}
            />
          </div>
        </div>

        {/* Trigger button */}
        <button
          onClick={handleRunScan}
          disabled={isScanning}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
            analytics
          </span>
          {isScanning ? "Processing File & Computing ATS Score..." : "Calculate ATS Match Score & AI Suggestions"}
        </button>

        {/* Results */}
        {atsResult && (
          <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Score header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1rem", borderRadius: "0.5rem", background: atsResult.status === "ready" ? "#dcfce7" : "#fee2e2", border: `1px solid ${atsResult.status === "ready" ? "#86efac" : "#fca5a5"}` }}>
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: atsResult.status === "ready" ? "#166534" : "#991b1b" }}>
                  ATS Match Result
                </p>
                <p style={{ fontSize: "0.75rem", color: atsResult.status === "ready" ? "#15803d" : "#b91c1c" }}>
                  Target: {atsResult.jobTitle || jobTitle} @ {atsResult.company || company}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "1.75rem", fontWeight: 800, color: atsResult.status === "ready" ? "#15803d" : "#dc2626", margin: 0, lineHeight: 1 }}>
                  {atsResult.atsScore}%
                </p>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", padding: "1px 6px", borderRadius: "3px", background: "#fff", color: atsResult.status === "ready" ? "#15803d" : "#dc2626" }}>
                  {atsResult.status === "ready" ? "READY" : "NEEDS IMPROVEMENT"}
                </span>
              </div>
            </div>

            {/* Score breakdown metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
              <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", textAlign: "center" }}>
                <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}>Keyword Match</p>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#3525cd", margin: "2px 0 0 0" }}>
                  {atsResult.breakdown?.keywordScore} / {atsResult.breakdown?.maxKeywordScore || 40} pts
                </p>
              </div>
              <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", textAlign: "center" }}>
                <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}>Target Alignment</p>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#3525cd", margin: "2px 0 0 0" }}>
                  {atsResult.breakdown?.companyRoleScore} / {atsResult.breakdown?.maxCompanyRoleScore || 30} pts
                </p>
              </div>
              <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", textAlign: "center" }}>
                <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}>Structure & Metrics</p>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#3525cd", margin: "2px 0 0 0" }}>
                  {atsResult.breakdown?.structureScore} / {atsResult.breakdown?.maxStructureScore || 30} pts
                </p>
              </div>
            </div>

            {/* Keywords */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#16a34a", marginBottom: "4px" }}>
                  ✅ Matched Keywords ({atsResult.matchedKeywords?.length || 0}):
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {atsResult.matchedKeywords?.map((kw: string) => (
                    <span key={kw} style={{ fontSize: "0.75rem", padding: "2px 8px", background: "#dcfce7", color: "#15803d", borderRadius: "4px", fontWeight: 600 }}>
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#dc2626", marginBottom: "4px" }}>
                  ❌ Missing Target Keywords ({atsResult.missingKeywords?.length || 0}):
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {atsResult.missingKeywords?.map((kw: string) => (
                    <span key={kw} style={{ fontSize: "0.75rem", padding: "2px 8px", background: "#fee2e2", color: "#b91c1c", borderRadius: "4px", fontWeight: 600 }}>
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            {atsResult.suggestions && atsResult.suggestions.length > 0 && (
              <div style={{ background: "#fefce8", padding: "0.85rem", borderRadius: "0.5rem", border: "1px solid #fef08a" }}>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#854d0e", marginBottom: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    lightbulb
                  </span>
                  AI Optimization Suggestions:
                </p>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, fontSize: "0.85rem", color: "#713f12" }}>
                  {atsResult.suggestions.map((sugg: string, idx: number) => (
                    <li key={idx} style={{ marginBottom: "4px" }}>{sugg}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
