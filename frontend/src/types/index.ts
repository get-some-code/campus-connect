export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'recruiter' | 'admin';
  institution?: string;
  gradYear?: string;
  degree?: string;
  targetRole?: string;
  profileStrength: number;
  avatarUrl?: string;
  skillsMastered: number;
  activeApplicationsCount: number;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Technical' | 'Soft' | 'Domain';
  currentLevel: number; // 1 to 5
  targetLevel: number; // 1 to 5
  categoryLabel?: string;
  status?: 'Target Met' | 'In Progress' | 'Priority Gap';
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract';
  workMode: 'Remote' | 'On-site' | 'Hybrid';
  salaryOrStipend: string;
  matchScore: number; // percentage
  requiredSkills: string[];
  missingSkills?: string[];
  deadline: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  isSaved?: boolean;
}

export interface Application {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  companyName: string;
  companyLogo: string;
  stage: 'Applied' | 'Under Review' | 'Interview' | 'Selected' | 'Rejected';
  appliedDate: string;
  lastUpdated: string;
  interviewDate?: string;
  interviewNotes?: string;
  documents?: { name: string; size: string; type: string }[];
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
}

export interface AssessmentResult {
  id: string;
  title: string;
  score: number; // 0 to 100
  percentile: number;
  strengths: string[];
  focusAreas: string[];
  completedAt: string;
}
