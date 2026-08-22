import { User, Opportunity, Application, Skill, AssessmentResult } from "@/types";

export const MOCK_USER: User = {
  id: "usr_101",
  name: "Alex Mercer",
  email: "alex.mercer@university.edu",
  role: "student",
  institution: "University of California",
  gradYear: "2024",
  degree: "B.S. Computer Science",
  targetRole: "Software Engineer",
  profileStrength: 85,
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxh_M7R9phK4wPoZCmtFt5w4n09-oDtcutJn4BycpILpkr1_JGS7Su269POIiPyk8A6vpNWSSrYLal3McphTopYtQjofxdkC4RL_ep8C5KSMrNZX8wjEpo5RU9Rjh0zO7Gn6gaY4lBXR1xwelECo1ZAuGJsOiHNpzwBa8bJYbyu9eakq8Z-YEEehGVXvNoTY6Oo4v3YeyhhPqnT88GS0t4Cv5G1i2a3KS3A63-H7PBW1afEbqbA8v8qA",
  skillsMastered: 12,
  activeApplicationsCount: 3,
};

export const MOCK_SKILLS: Skill[] = [
  { id: "sk_1", name: "JavaScript / TypeScript", category: "Technical", currentLevel: 4, targetLevel: 5, categoryLabel: "Frontend & Node.js" },
  { id: "sk_2", name: "React & Ecosystem", category: "Technical", currentLevel: 3, targetLevel: 4, categoryLabel: "Hooks, Redux, Next.js" },
  { id: "sk_3", name: "System Design", category: "Technical", currentLevel: 2, targetLevel: 4, categoryLabel: "Architecture, Scalability", status: "Priority Gap" },
  { id: "sk_4", name: "Python / FastAPI", category: "Technical", currentLevel: 4, targetLevel: 5, categoryLabel: "Backend APIs" },
  { id: "sk_5", name: "Communication", category: "Soft", currentLevel: 3, targetLevel: 4 },
  { id: "sk_6", name: "Team Collaboration", category: "Soft", currentLevel: 4, targetLevel: 4, status: "Target Met" },
];

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp_1",
    title: "Software Engineering Intern",
    company: "TechNova",
    companyLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMSeCfH_5aS_3bMR0WbSr7IU0ho5RMEMTVrv8d2dwESMapSKZ5wCNPBCtkrx9kssXCFvLMruaEVCuxP8jPjQFgnkc0HV43SnD-pafTUG_yDDcgWcTpd6PwFYb_ljiDepIY5JOw17RJqeq7r6EVO7wa3WMOtJp8yZdHr_UjHQVkvrVIFnFS33U8px9JUeVY3LXuWpehvwIBNKqwqSQJl36Bi1nfJ70xfu-9Xj04Mu2NRyDdBd5P6W2epA",
    location: "Bangalore, India",
    type: "Internship",
    workMode: "Hybrid",
    salaryOrStipend: "$1,200/mo",
    matchScore: 92,
    requiredSkills: ["React", "TypeScript", "Node.js"],
    missingSkills: ["GraphQL"],
    deadline: "Oct 15, 2026",
    description: "TechNova is seeking a motivated Software Engineering Intern to join our core platform team.",
    responsibilities: [
      "Develop and maintain RESTful APIs using Python and FastAPI.",
      "Optimize SQL queries and database schemas for performance.",
      "Collaborate with frontend team to integrate web interfaces."
    ],
    requirements: [
      "Currently pursuing B.S. or M.S. in Computer Science.",
      "Strong foundation in Python and React.",
      "Basic understanding of Git and version control."
    ],
    isSaved: true,
  },
  {
    id: "opp_2",
    title: "Frontend Developer",
    company: "CloudStream",
    companyLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHhLPncSLPrFENHglJpn4Qb9p46waXuPy6Gt6pDkdIHJYbsG2PiQqUTT_Z9aujHHkKimstByWm2N0xKjUQ0bEpsgXnHlC960iUmV4M9AprrifJzYDSXkY5gPSCaU7GjwhdpqhfIgvdgcMrrLtOuLRBnRUrq0kpaMTY4KSpSFZDIpn9fCH6RrDiDriYR339AF4pszZqABjqZfUO-GN1PuacJD6nk8MCEg45smxImhmiJ8So3De16I-58A",
    location: "Remote",
    type: "Full-time",
    workMode: "Remote",
    salaryOrStipend: "$85,000 - $110,000/yr",
    matchScore: 85,
    requiredSkills: ["Vue.js", "CSS/Tailwind", "Figma"],
    missingSkills: ["Nuxt.js", "Jest"],
    deadline: "Nov 01, 2026",
    description: "CloudStream is hiring a passionate Frontend Developer to build Next-gen SaaS dashboards.",
    responsibilities: [
      "Build high-performance web components using modern CSS & React/Vue.",
      "Work closely with UX designers to convert Figma mockups."
    ],
    requirements: [
      "Proficient with Tailwind CSS and responsive design.",
      "1+ years of web application experience."
    ],
    isSaved: true,
  },
  {
    id: "opp_3",
    title: "Data Analyst Intern",
    company: "DataFlow",
    companyLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfT3oXf7cnZTCoFF2Jrj3_SK93rpNm0rqph9EtG4elVf2JbXIQMw-MTEBUa0RR-viiWmei0Hl6MzB3f8y4DB-P9knUVuguDO41gTx5gC3LEjci2FTlzM4X_cIlQWpMnsleTwRkGWrvlrLJBL--yJYXGAU6qVkWjbq8leccbLouXARIze-3J-ncIxn4LHtjvgqOIMkwEtqa6Vl9HkEsX9UlLr2iNuqRkm1wqNME8nhg6Jqbb8AwCPVStQ",
    location: "Pune, India",
    type: "Internship",
    workMode: "On-site",
    salaryOrStipend: "$1,000/mo",
    matchScore: 98,
    requiredSkills: ["Python", "SQL", "Tableau"],
    missingSkills: [],
    deadline: "Oct 28, 2026",
    description: "Analyze large dataset pipelines and present business intelligence reports to key stakeholders.",
    responsibilities: ["Write SQL queries", "Build Tableau dashboards"],
    requirements: ["Strong analytical background"],
    isSaved: true,
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: "app_1",
    opportunityId: "opp_stripe",
    opportunityTitle: "Software Engineer, Backend",
    companyName: "Stripe",
    companyLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCV8RN-faCwm7og3KWOxpekJjJVzkqU3oODTtGPdGcreoNKXyNviBIsUOL_PdZD8dU2ghfW-0c-Dvg_RcyZFlbEpPaKtbGM3zlYOMvNqt2NUfeA5B_FHnDbc_nU9CYopVF4WAke4aiNSqJ4VETT-x6kp2MAwute6VtBGCJoUAFNO5T64UHu12fz9fpwliq_iKNjtouqZpMN_toMUfzzW3dALuAQVGqwoJmm2mYEJRyY9gh0jdMTguf_eQ",
    stage: "Interview",
    appliedDate: "Sep 20, 2026",
    lastUpdated: "Oct 02, 2026",
    interviewDate: "Oct 12, 2026 • 10:00 AM PST",
    interviewNotes: "System Design & Architecture technical interview with Sarah Jenkins.",
    documents: [
      { name: "Resume_Backend_Eng.pdf", size: "1.2 MB", type: "pdf" },
      { name: "Cover_Letter_Stripe.pdf", size: "0.8 MB", type: "pdf" }
    ]
  },
  {
    id: "app_2",
    opportunityId: "opp_vercel",
    opportunityTitle: "Frontend Intern",
    companyName: "Vercel",
    companyLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDH9g26aIBR9gmpn-eSKwufE1Oqp2M7yvEM9MEwpUXwdg6yimLyr-LS2UCVRxQh0mYbjW523_Ox3cWGIWaM02EloNeh8wK_5G68WDZZnL3b_lQYYplwduNZXB4d25hO991r64K8K00q6eBOXIlTs6caS_yC7m3M6iVbpfWry-6mcvM_tJwdXsb6ohZud52Y7T7Tpjqm3UbF0QBur7y4i0_j7dx6XepdbFXOHa-fB7a9lOKL3RkXKlEUw",
    stage: "Under Review",
    appliedDate: "Sep 25, 2026",
    lastUpdated: "2 days ago"
  },
  {
    id: "app_3",
    opportunityId: "opp_notion",
    opportunityTitle: "Product Design Intern",
    companyName: "Notion",
    companyLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2ac-BGFfGU9l1r7OaEK549xa2bZKJ5gxoEAqpybwFzT7iAoytsZf-CU80Ab5eprO_JZ6bcQd5KP61Bwq9nHM4cEAHFtsS7mysUD3RRGzqcbKs9LApGWu6SrY7MDFfBXVRXgISGYNYKxaCONWfoEeCUdhbeQ3aHhP5G4G8Gk9eUjsaTz8hpXEiwuu653LAd9UW66r0UOSGFx-BYZWIp_1mQAUZnFvjqzLpI07cDVCEsbJ1enLdy0NSzw",
    stage: "Applied",
    appliedDate: "Oct 01, 2026",
    lastUpdated: "Oct 01, 2026"
  }
];

export const MOCK_ASSESSMENT_RESULT: AssessmentResult = {
  id: "ast_01",
  title: "Advanced Front-End Architecture",
  score: 85,
  percentile: 88,
  strengths: [
    "State Management: Excellent grasp of complex state trees.",
    "Performance Tuning: Strong understanding of render optimization."
  ],
  focusAreas: [
    "Web Worker Integration for heavy background computation.",
    "Advanced Accessibility (a11y) ARIA attributes."
  ],
  completedAt: "Just now"
};
