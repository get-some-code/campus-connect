import { User, Opportunity, Application, Skill, AssessmentResult } from "@/types";
import {
  MOCK_USER,
  MOCK_OPPORTUNITIES,
  MOCK_APPLICATIONS,
  MOCK_SKILLS,
  MOCK_ASSESSMENT_RESULT,
} from "./mockData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchFromFastAPI<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout for fallback

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // Graceful fallback to mock data when FastAPI backend is offline
    console.info(`[FastAPI API Client] '${endpoint}' using fallback data. (${(error as Error).message})`);
    return fallbackData;
  }
}

export const api = {
  getUser: async (): Promise<User> => {
    return fetchFromFastAPI<User>("/api/v1/user/me", MOCK_USER);
  },

  getSkills: async (): Promise<Skill[]> => {
    return fetchFromFastAPI<Skill[]>("/api/v1/skills", MOCK_SKILLS);
  },

  getOpportunities: async (): Promise<Opportunity[]> => {
    return fetchFromFastAPI<Opportunity[]>("/api/v1/opportunities", MOCK_OPPORTUNITIES);
  },

  getOpportunityById: async (id: string): Promise<Opportunity | undefined> => {
    const opportunities = await fetchFromFastAPI<Opportunity[]>("/api/v1/opportunities", MOCK_OPPORTUNITIES);
    return opportunities.find((opp) => opp.id === id) || MOCK_OPPORTUNITIES[0];
  },

  getSavedOpportunities: async (): Promise<Opportunity[]> => {
    const opportunities = await fetchFromFastAPI<Opportunity[]>("/api/v1/opportunities", MOCK_OPPORTUNITIES);
    return opportunities.filter((opp) => opp.isSaved);
  },

  getApplications: async (): Promise<Application[]> => {
    return fetchFromFastAPI<Application[]>("/api/v1/applications", MOCK_APPLICATIONS);
  },

  getApplicationById: async (id: string): Promise<Application | undefined> => {
    const apps = await fetchFromFastAPI<Application[]>("/api/v1/applications", MOCK_APPLICATIONS);
    return apps.find((a) => a.id === id) || MOCK_APPLICATIONS[0];
  },

  getAssessmentResult: async (): Promise<AssessmentResult> => {
    return fetchFromFastAPI<AssessmentResult>("/api/v1/assessments/result", MOCK_ASSESSMENT_RESULT);
  },

  addSkill: async (skill: { name: string; category?: string; currentLevel: number; targetLevel: number }): Promise<Skill> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skill),
      });
      if (!response.ok) throw new Error("Failed to add skill");
      return await response.json();
    } catch {
      return { id: `sk-${Date.now()}`, name: skill.name, category: "Technical", currentLevel: skill.currentLevel, targetLevel: skill.targetLevel, status: "In Progress" };
    }
  },

  extractSkills: async (text: string): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/student/extract-skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error("Extraction failed");
      const res = await response.json();
      return res.extractedSkills || [];
    } catch {
      return ["Python", "FastAPI", "React"];
    }
  },

  toggleSaveOpportunity: async (id: string): Promise<{ id: string; isSaved: boolean }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/opportunities/${id}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to save opportunity");
      return await response.json();
    } catch {
      return { id, isSaved: true };
    }
  },

  applyToOpportunity: async (opportunityId: string): Promise<Application> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunityId }),
      });
      if (!response.ok) throw new Error("Application failed");
      return await response.json();
    } catch {
      return MOCK_APPLICATIONS[0];
    }
  },

  predictAts: async (opportunityId: string, file?: File | null, resumeText?: string) => {
    try {
      const formData = new FormData();
      formData.append("opportunityId", opportunityId);
      if (file) {
        formData.append("file", file);
      }
      if (resumeText) {
        formData.append("resumeText", resumeText);
      }
      const response = await fetch(`${API_BASE_URL}/api/v1/ats/predict`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("ATS prediction failed");
      return await response.json();
    } catch {
      return {
        opportunityId,
        atsScore: 78,
        status: "ready",
        breakdown: { keywordScore: 32, maxKeywordScore: 40, companyRoleScore: 24, maxCompanyRoleScore: 30, structureScore: 22, maxStructureScore: 30 },
        matchedKeywords: ["Python", "FastAPI", "React"],
        missingKeywords: ["Docker", "Kubernetes"],
        suggestions: [
          "Add missing core keywords: 'Docker, Kubernetes' under your Tech Stack or Experience sections.",
          "Include quantified achievements with numbers (e.g. 'Improved API latency by 35%').",
        ],
      };
    }
  },

  submitAssessment: async (skillName: string, score: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/assessments/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillName, score }),
      });
      if (!response.ok) throw new Error("Failed to submit assessment");
      return await response.json();
    } catch {
      return { success: true, skillName, score };
    }
  },
};

