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
};
