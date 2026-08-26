export interface CareerStage {
  id: string;
  stageName: string;
  organization: string;
  role: string;
  duration: string;
  keyAchievement: string;
  skillsDeveloped: string[];
  icon: string;
}

export interface AlumniProfile {
  id: string;
  name: string;
  avatar: string;
  gradYear: number;
  degree: string;
  department: string;
  institution: string;
  currentCompany: string;
  companyLogo: string;
  currentRole: string;
  location: string;
  bio: string;
  summary: string;
  careerJourney: CareerStage[];
  skills: string[];
  experienceYears: number;
  education: { degree: string; institution: string; year: string }[];
  certifications: string[];
  achievements: string[];
  professionalLinks: { label: string; url: string; icon: string }[];
  careerInterests: string[];
  industries: string[];
  isMentoringAvailable: boolean;
  preferredMentorshipTopics: string[];
  isHiring: boolean;
  adviceForStudents: string;
}

export interface StudentCertification {
  name: string;
  issuer: string;
  year: string;
}

export interface StudentExperience {
  role: string;
  organization: string;
  duration: string;
  description: string;
}

export interface StudentProject {
  title: string;
  tech: string[];
  description: string;
  githubLink?: string;
}

export interface MentorshipRequest {
  id: string;
  studentName: string;
  studentAvatar: string;
  studentEmail?: string;
  studentPhone?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  gpa?: string;
  degree: string;
  department: string;
  gradYear: number;
  careerGoal: string;
  skills: string[];
  skillGaps: string[];
  certifications?: StudentCertification[];
  experiences?: StudentExperience[];
  projects?: StudentProject[];
  requestedTopic: string;
  message: string;
  requestedDate: string;
  preferredFormat: string;
  status: "pending" | "active" | "upcoming" | "completed" | "declined";
  scheduledTime?: string;
  meetingUrl?: string;
}

export interface MockInterviewRequest {
  id: string;
  studentName: string;
  studentAvatar: string;
  targetCompany: string;
  targetRole: string;
  interviewType: "Technical" | "Behavioral" | "System Design" | "HR";
  requestedDate: string;
  message: string;
  status: "pending" | "scheduled" | "completed";
}

export interface CareerExperience {
  id: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorAvatar: string;
  experienceType: "Interview" | "Hiring Process" | "First Job" | "Promotion" | "Career Transition";
  title: string;
  companyName: string;
  companyLogo: string;
  summary: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  publishedDate: string;
  skillsTested: string[];
  sections: {
    overview: string;
    hiringProcess: string[];
    assessmentRounds: { roundName: string; description: string; keyQuestions: string[] }[];
    preparationStrategy: string;
    mistakesToAvoid: string[];
    finalAdvice: string;
  };
  likes: number;
  commentsCount: number;
}

export interface CompanyExperienceGuide {
  companyName: string;
  companyLogo: string;
  industry: string;
  headquarters: string;
  hiringOverview: string;
  rounds: { roundNumber: number; title: string; focus: string; description: string }[];
  commonlyTestedSkills: string[];
  preparationResources: string[];
  adviceFromAlumni: string[];
  totalExperiencesCount: number;
}

export interface IndustryInsight {
  id: string;
  title: string;
  category: "Trending Skills" | "Hiring Demand" | "Technology Shift" | "Career Advice";
  growthPct: string;
  summary: string;
  description: string;
  recommendedActions: string[];
}

export interface RecommendedStudent {
  id: string;
  name: string;
  avatar: string;
  degree: string;
  department: string;
  gradYear: number;
  careerGoal: string;
  readinessScore: number;
  topSkills: string[];
  projectsCount: number;
  resumeUrl: string;
  matchReason: string;
  isRecommended: boolean;
}

export interface CandidateApplicant {
  id: string;
  studentName: string;
  studentAvatar: string;
  opportunityTitle: string;
  appliedDate: string;
  matchScore: number;
  skills: string[];
  education: string;
  experience: string;
  projects: string[];
  stage: "Applicants" | "Shortlisted" | "Interview" | "Selected" | "Rejected";
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorAvatar: string;
  category: "Career Advice" | "Hiring" | "Interview Tips" | "Achievement" | "Learning Resource";
  content: string;
  publishedDate: string;
  likes: number;
  commentsCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  tags: string[];
}

export interface AlumniNotification {
  id: string;
  type: "mentorship_request" | "mentorship_accepted" | "mock_interview" | "hiring_update" | "insight";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

// ==========================================
// MOCK DATA INSTANCES
// ==========================================

export const CURRENT_ALUMNI_PROFILE: AlumniProfile = {
  id: "alm-1",
  name: "Aarav Mehta",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  gradYear: 2023,
  degree: "B.Tech Computer Science & Engineering",
  department: "School of Engineering & Technology",
  institution: "Stanford University / IIT Campus",
  currentCompany: "TechNova Systems",
  companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
  currentRole: "Senior Software Engineer (Backend)",
  location: "San Francisco, CA (Hybrid)",
  bio: "Software Engineer with 3+ years of experience in high-concurrency microservices, Python/FastAPI, Redis caching, and cloud infrastructure. Passionate about guiding university students into tier-1 tech careers.",
  summary: "Building scalable backend services powering 2M+ daily active users. Active campus mentor and tech interviewer at TechNova.",
  experienceYears: 3,
  careerJourney: [
    {
      id: "cj-1",
      stageName: "University",
      organization: "Stanford University / IIT Campus",
      role: "B.Tech Computer Science Student",
      duration: "2019 – 2023",
      keyAchievement: "Graduated with 3.9 GPA. Led Campus Web Development Club and won national SIH hackathon.",
      skillsDeveloped: ["C++", "Python", "Data Structures", "Algorithms", "React"],
      icon: "school",
    },
    {
      id: "cj-2",
      stageName: "Internship",
      organization: "CloudGrid Inc.",
      role: "Backend Engineering Intern",
      duration: "Summer 2022 (6 mos)",
      keyAchievement: "Architected real-time WebSocket telemetry service reducing dashboard latency by 45%.",
      skillsDeveloped: ["FastAPI", "Docker", "WebSockets", "PostgreSQL"],
      icon: "work_history",
    },
    {
      id: "cj-3",
      stageName: "First Job",
      organization: "TechNova Systems",
      role: "Associate Software Engineer",
      duration: "2023 – 2024",
      keyAchievement: "Implemented distributed Redis cache layer processing 80,000 requests/sec with 99.99% uptime.",
      skillsDeveloped: ["Redis", "Microservices", "Kafka", "AWS EKS"],
      icon: "badge",
    },
    {
      id: "cj-4",
      stageName: "Promotion",
      organization: "TechNova Systems",
      role: "Software Engineer II",
      duration: "2024 – 2025",
      keyAchievement: "Promoted early for leading multi-region database migration with zero downtime.",
      skillsDeveloped: ["System Design", "Database Sharding", "Terraform", "CI/CD"],
      icon: "trending_up",
    },
    {
      id: "cj-5",
      stageName: "Current Role",
      organization: "TechNova Systems",
      role: "Senior Software Engineer (Backend)",
      duration: "2025 – Present",
      keyAchievement: "Leading core payments team & mentoring 12 junior engineers and university interns.",
      skillsDeveloped: ["Engineering Leadership", "Distributed Systems", "Kubernetes"],
      icon: "stars",
    },
  ],
  skills: ["Python", "FastAPI", "React", "TypeScript", "Redis", "Docker", "Kubernetes", "PostgreSQL", "System Design", "AWS"],
  education: [
    { degree: "B.Tech in Computer Science & Engineering", institution: "Stanford University / Campus Connect", year: "2019 - 2023" },
  ],
  certifications: [
    "AWS Certified Solutions Architect – Associate",
    "Certified Kubernetes Application Developer (CKAD)",
  ],
  achievements: [
    "Winner - National Smart India Hackathon (SIH) 2022",
    "Top Rated Tech Interviewer @ TechNova Systems 2025",
    "Mentored 12+ students into software engineering roles",
  ],
  professionalLinks: [
    { label: "LinkedIn", url: "https://linkedin.com", icon: "link" },
    { label: "GitHub", url: "https://github.com", icon: "code" },
    { label: "Portfolio", url: "https://aaravmehta.dev", icon: "language" },
  ],
  careerInterests: ["Backend Systems", "Distributed Systems", "Cloud Computing", "AI Infrastructure"],
  industries: ["Enterprise Software", "FinTech", "Cloud Infrastructure"],
  isMentoringAvailable: true,
  preferredMentorshipTopics: ["System Design", "Backend Coding Interviews", "Resume Review", "Mock Interviews", "First Job Transition"],
  isHiring: true,
  adviceForStudents: "Focus deeply on core fundamentals: Data Structures, Operating Systems, and System Design patterns. Build real-world projects that solve actual bottlenecks rather than tutorial clones.",
};

export const MOCK_ALUMNI_DIRECTORY: AlumniProfile[] = [
  CURRENT_ALUMNI_PROFILE,
  {
    id: "alm-2",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
    gradYear: 2022,
    degree: "B.Tech Information Technology",
    department: "Department of IT",
    institution: "Campus Connect University",
    currentCompany: "CloudGrid Inc.",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80",
    currentRole: "Lead DevOps & Cloud Engineer",
    location: "Bengaluru, KA (Remote)",
    bio: "DevOps Engineer specializing in Kubernetes orchestration, Terraform Infrastructure as Code, and automated CI/CD pipelines.",
    summary: "Cloud architect managing multi-region AWS and Kubernetes clusters.",
    experienceYears: 4,
    careerJourney: [],
    skills: ["Docker", "Kubernetes", "AWS", "Terraform", "Python", "CI/CD", "Go"],
    education: [{ degree: "B.Tech IT", institution: "Campus Connect", year: "2018 - 2022" }],
    certifications: ["AWS Solutions Architect Professional", "HashiCorp Certified Terraform Associate"],
    achievements: ["Automated deployment pipeline cutting deploy times by 80%"],
    professionalLinks: [{ label: "LinkedIn", url: "https://linkedin.com", icon: "link" }],
    careerInterests: ["Cloud Infrastructure", "DevOps", "Site Reliability"],
    industries: ["Cloud Computing", "SaaS"],
    isMentoringAvailable: true,
    preferredMentorshipTopics: ["DevOps Career Track", "Kubernetes & Docker", "AWS Certification Prep"],
    isHiring: true,
    adviceForStudents: "Get hands-on with containerization and cloud architectures early. Being able to deploy and monitor code is as crucial as writing it.",
  },
  {
    id: "alm-3",
    name: "Vikramaditya Rao",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    gradYear: 2021,
    degree: "B.Tech Computer Engineering",
    department: "School of Engineering",
    institution: "Campus Connect University",
    currentCompany: "Microsoft",
    companyLogo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=120&q=80",
    currentRole: "Senior Software Engineer (Full Stack)",
    location: "Bengaluru, KA (Hybrid)",
    bio: "Full stack engineer passionate about Next.js, React, Microservices, and AI-driven developer tooling.",
    summary: "Building AI-powered collaboration tools at Microsoft.",
    experienceYears: 5,
    careerJourney: [],
    skills: ["React", "TypeScript", "Next.js", "C#", ".NET Core", "Azure", "GraphQL"],
    education: [{ degree: "B.Tech Computer Engineering", institution: "Campus Connect", year: "2017 - 2021" }],
    certifications: ["Microsoft Certified Azure Developer"],
    achievements: ["Speaker at React Summit 2024"],
    professionalLinks: [{ label: "LinkedIn", url: "https://linkedin.com", icon: "link" }],
    careerInterests: ["Full Stack", "AI Integration", "Web Performance"],
    industries: ["Big Tech", "Enterprise Productivity"],
    isMentoringAvailable: true,
    preferredMentorshipTopics: ["Full Stack Development", "System Architecture", "Cracking Tier-1 Tech Interviews"],
    isHiring: false,
    adviceForStudents: "Master TypeScript and asynchronous frontend state management. Technical depth in fundamental Web Standards stands out during interviews.",
  },
  {
    id: "alm-4",
    name: "Neha Gupta",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80",
    gradYear: 2023,
    degree: "M.Tech Data Science",
    department: "Department of AI & Data Science",
    institution: "Campus Connect University",
    currentCompany: "DataSphere AI",
    companyLogo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&q=80",
    currentRole: "AI / ML Scientist",
    location: "Hyderabad, TS",
    bio: "Machine learning research scientist focusing on LLM fine-tuning, PyTorch, RAG architectures, and MLOps pipelines.",
    summary: "Developing generative AI agents and enterprise search systems.",
    experienceYears: 3,
    careerJourney: [],
    skills: ["Python", "PyTorch", "TensorFlow", "NLP", "FastAPI", "Docker", "MLOps"],
    education: [{ degree: "M.Tech AI & Data Science", institution: "Campus Connect", year: "2021 - 2023" }],
    certifications: ["Google Cloud Professional Data Engineer"],
    achievements: ["Published 2 ACL research papers on RAG optimization"],
    professionalLinks: [{ label: "LinkedIn", url: "https://linkedin.com", icon: "link" }],
    careerInterests: ["Generative AI", "NLP", "ML Infrastructure"],
    industries: ["Artificial Intelligence", "Analytics"],
    isMentoringAvailable: true,
    preferredMentorshipTopics: ["AI/ML Career Guidance", "PyTorch & Deep Learning", "Research to Production"],
    isHiring: true,
    adviceForStudents: "Solid foundation in linear algebra and probability is mandatory for AI roles. Don't just import libraries—understand loss functions and gradient flow.",
  },
  {
    id: "alm-5",
    name: "Rahul Verma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    gradYear: 2020,
    degree: "B.Tech Computer Science",
    department: "School of Engineering",
    institution: "Campus Connect University",
    currentCompany: "FinEdge Systems",
    companyLogo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80",
    currentRole: "Lead Fintech Architect",
    location: "Mumbai, MH (Hybrid)",
    bio: "Fintech specialist architecting low-latency payment gateways, ledger engines, and fraud detection microservices.",
    summary: "Architecting high-frequency payment pipelines processing $10M+ daily.",
    experienceYears: 6,
    careerJourney: [],
    skills: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "Distributed Systems"],
    education: [{ degree: "B.Tech CS", institution: "Campus Connect", year: "2016 - 2020" }],
    certifications: ["Oracle Certified Professional Java SE 17"],
    achievements: ["Architected zero-loss payment gateway"],
    professionalLinks: [{ label: "LinkedIn", url: "https://linkedin.com", icon: "link" }],
    careerInterests: ["Fintech", "Payment Gateways", "Event-Driven Systems"],
    industries: ["Financial Services", "Banking"],
    isMentoringAvailable: false,
    preferredMentorshipTopics: ["Java & Spring Boot", "Financial Systems Architecture"],
    isHiring: true,
    adviceForStudents: "Understanding transaction consistency and idempotency is key for fintech engineering.",
  },
];

export const MOCK_MENTORSHIP_REQUESTS: MentorshipRequest[] = [
  {
    id: "mr-1",
    studentName: "Alex Morgan",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    studentEmail: "alex.morgan@campusconnect.edu",
    studentPhone: "+1 (555) 234-8901",
    linkedinUrl: "https://linkedin.com/in/alex-morgan-dev",
    githubUrl: "https://github.com/alexmorgan-code",
    portfolioUrl: "https://alexmorgan.dev",
    resumeUrl: "https://campusconnect.edu/resumes/alex_morgan_resume.pdf",
    gpa: "3.9 / 4.0",
    degree: "B.Tech Computer Science & Engineering",
    department: "School of Engineering",
    gradYear: 2027,
    careerGoal: "Backend Engineer @ Tier-1 Tech Company",
    skills: ["Python", "FastAPI", "React", "TypeScript", "SQL", "PostgreSQL"],
    skillGaps: ["Redis", "Microservices Architecture", "Docker", "AWS"],
    certifications: [
      { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2025" },
      { name: "PostgreSQL Database Administrator Fundamentals", issuer: "Coursera / Stanford", year: "2024" },
    ],
    experiences: [
      {
        role: "Software Engineering Intern",
        organization: "NexusTech Labs",
        duration: "May 2025 – Aug 2025 (4 mos)",
        description: "Built async FastAPI REST endpoints for user authentication and real-time activity tracking.",
      },
      {
        role: "Lead Campus Web Developer",
        organization: "CampusConnect Developer Guild",
        duration: "Sep 2024 – Present",
        description: "Organized 5 hackathons and led a team of 8 student developers building campus portals.",
      },
    ],
    projects: [
      {
        title: "CampusConnect Career & ATS Portal",
        tech: ["Next.js", "FastAPI", "PostgreSQL", "Tailwind"],
        description: "Full-stack placement portal with resume matching score algorithm and skill gap analysis.",
        githubLink: "https://github.com/alexmorgan-code/campus-connect",
      },
      {
        title: "Distributed Rate-Limiter Engine",
        tech: ["Python", "Redis", "FastAPI"],
        description: "Implemented sliding window token bucket algorithm for API rate limiting.",
        githubLink: "https://github.com/alexmorgan-code/rate-limiter",
      },
    ],
    requestedTopic: "System Design & Mock Interview",
    message: "Hi Aarav! I saw your career journey at TechNova. I'm preparing for backend developer intern interviews and would love feedback on system design and mock technical coding.",
    requestedDate: "Aug 28, 2026 at 4:00 PM IST",
    preferredFormat: "1-on-1 Video Call (Google Meet)",
    status: "pending",
  },
  {
    id: "mr-2",
    studentName: "Rohan Das",
    studentAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    studentEmail: "rohan.das@campusconnect.edu",
    studentPhone: "+91 98765 43210",
    linkedinUrl: "https://linkedin.com/in/rohan-das-devops",
    githubUrl: "https://github.com/rohandas-cloud",
    portfolioUrl: "https://rohandas.tech",
    resumeUrl: "https://campusconnect.edu/resumes/rohan_das_devops.pdf",
    gpa: "3.75 / 4.0",
    degree: "B.Tech Information Technology",
    department: "Department of IT",
    gradYear: 2027,
    careerGoal: "DevOps & Cloud Engineer",
    skills: ["Docker", "Linux Shell", "Python", "Git", "GitHub Actions", "Nginx"],
    skillGaps: ["Kubernetes", "Terraform", "CI/CD Pipeline Automation"],
    certifications: [
      { name: "Docker Certified Associate (DCA)", issuer: "Mirantis / Docker", year: "2025" },
      { name: "Linux System Administration (LFCS Prep)", issuer: "Linux Foundation", year: "2024" },
    ],
    experiences: [
      {
        role: "Cloud Infrastructure Assistant",
        organization: "University Cloud Lab",
        duration: "Jan 2025 – Present",
        description: "Managed Linux server instances, set up automated backup scripts, and maintained Nginx reverse proxies.",
      },
    ],
    projects: [
      {
        title: "Automated Microservices Deployer",
        tech: ["Docker", "Bash", "GitHub Actions", "Python"],
        description: "Created CI/CD pipeline script automating multi-stage container builds and push to Docker Hub.",
        githubLink: "https://github.com/rohandas-cloud/auto-deployer",
      },
    ],
    requestedTopic: "DevOps Career Roadmap & Docker Guidance",
    message: "Respected Senior, I am building my DevOps portfolio. Could you guide me on container orchestration best practices and how to structure my resume?",
    requestedDate: "Aug 29, 2026 at 6:30 PM IST",
    preferredFormat: "1-on-1 Video Call (Google Meet)",
    status: "pending",
  },
  {
    id: "mr-3",
    studentName: "Ananya Roy",
    studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    studentEmail: "ananya.roy@campusconnect.edu",
    studentPhone: "+91 98123 65478",
    linkedinUrl: "https://linkedin.com/in/ananya-roy-ai",
    githubUrl: "https://github.com/ananyaroy-code",
    portfolioUrl: "https://ananyaroy.dev",
    resumeUrl: "https://campusconnect.edu/resumes/ananya_roy_resume.pdf",
    gpa: "3.92 / 4.0",
    degree: "B.Tech AI & Data Science",
    department: "Department of AI",
    gradYear: 2026,
    careerGoal: "Full Stack Engineer (React + Python)",
    skills: ["React", "TypeScript", "Next.js", "Python", "FastAPI", "PyTorch"],
    skillGaps: ["System Design", "AWS Deployment", "Microservices"],
    certifications: [
      { name: "Meta Front-End Developer Professional Certificate", issuer: "Meta / Coursera", year: "2025" },
      { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2024" },
    ],
    experiences: [
      {
        role: "Frontend Development Intern",
        organization: "PixelCraft Tech",
        duration: "Jun 2025 – Aug 2025",
        description: "Developed responsive React UI components with TypeScript and Tailwind CSS.",
      },
    ],
    projects: [
      {
        title: "AI Document Search Engine (RAG)",
        tech: ["Next.js", "FastAPI", "PyTorch", "Pinecone"],
        description: "Generative AI application for querying PDF academic documents using vector embeddings.",
        githubLink: "https://github.com/ananyaroy-code/ai-doc-search",
      },
    ],
    requestedTopic: "Resume Review & First Job Transition",
    message: "Hello Aarav! I am applying for associate software engineer roles at TechNova and Razorpay. Would you mind reviewing my resume and portfolio projects?",
    requestedDate: "Aug 30, 2026 at 5:00 PM IST",
    preferredFormat: "Async Text & Code Review",
    status: "active",
    scheduledTime: "Aug 30, 2026 at 5:00 PM IST",
    meetingUrl: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "mr-4",
    studentName: "Karthik Subramanian",
    studentAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    studentEmail: "karthik.s@campusconnect.edu",
    studentPhone: "+91 97654 12309",
    linkedinUrl: "https://linkedin.com/in/karthik-subramanian-cs",
    githubUrl: "https://github.com/karthik-subramanian",
    portfolioUrl: "https://karthik.dev",
    resumeUrl: "https://campusconnect.edu/resumes/karthik_s_resume.pdf",
    gpa: "3.88 / 4.0",
    degree: "B.Tech Computer Science",
    department: "School of Engineering",
    gradYear: 2026,
    careerGoal: "Backend Developer @ Microsoft",
    skills: ["Python", "FastAPI", "SQL", "Git", "C++", "Data Structures"],
    skillGaps: ["Microservices", "Redis Caching"],
    certifications: [
      { name: "Algorithms Specialization", issuer: "Stanford University", year: "2024" },
    ],
    experiences: [
      {
        role: "Backend Intern",
        organization: "FinFlow Startup",
        duration: "May 2025 – Jul 2025",
        description: "Optimized database queries and built financial ledger REST services.",
      },
    ],
    projects: [
      {
        title: "High Throughput Payment Gateway Engine",
        tech: ["Python", "FastAPI", "PostgreSQL"],
        description: "Simulated payment processing backend supporting concurrent webhook callbacks.",
        githubLink: "https://github.com/karthik-subramanian/payment-gateway",
      },
    ],
    requestedTopic: "Backend Coding & Database Optimization",
    message: "Completed our first session! Thanks for the Redis caching tips.",
    requestedDate: "Aug 22, 2026",
    preferredFormat: "1-on-1 Video Call",
    status: "completed",
  },
];

export const MOCK_INTERVIEW_REQUESTS: MockInterviewRequest[] = [
  {
    id: "mi-1",
    studentName: "Alex Morgan",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    targetCompany: "Microsoft",
    targetRole: "Associate Software Engineer (Backend)",
    interviewType: "Technical",
    requestedDate: "Aug 29, 2026 at 5:00 PM",
    message: "I have an upcoming interview round at Microsoft focusing on Data Structures, Python/FastAPI REST APIs, and SQL query tuning.",
    status: "pending",
  },
  {
    id: "mi-2",
    studentName: "Siddharth Malhotra",
    studentAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    targetCompany: "Swiggy",
    targetRole: "Backend Developer Intern",
    interviewType: "System Design",
    requestedDate: "Aug 31, 2026 at 7:00 PM",
    message: "Would love a mock session on designing a high-concurrency food delivery tracking service.",
    status: "scheduled",
  },
];

export const MOCK_CAREER_EXPERIENCES: CareerExperience[] = [
  {
    id: "exp-1",
    authorName: "Aarav Mehta",
    authorRole: "Senior Software Engineer",
    authorCompany: "TechNova Systems",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    experienceType: "Interview",
    title: "How I Cracked My Software Engineer Role at TechNova: Complete Round-by-Round Breakdown",
    companyName: "TechNova Systems",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    summary: "Detailed insight into TechNova's 4-round technical hiring process for backend engineers, including coding challenges, system design, and behavioral questions.",
    readTime: "6 min read",
    difficulty: "Intermediate",
    publishedDate: "Aug 15, 2026",
    skillsTested: ["Python", "FastAPI", "Redis", "Data Structures", "System Design"],
    sections: {
      overview: "TechNova looks heavily for practical system engineering skills over pure theoretical rote learning. They evaluate your ability to handle real-world API latency, error handling, and database optimization.",
      hiringProcess: [
        "Round 1: Online Technical Assessment (2 LeetCode Mediums + 5 SQL Queries)",
        "Round 2: Live Backend Coding & API Building (Building a mini FastAPI service with Redis)",
        "Round 3: System Design & Architecture (Designing a Rate Limiter & Notification Service)",
        "Round 4: Engineering Manager & Cultural Fit Round",
      ],
      assessmentRounds: [
        {
          roundName: "Round 1: Online Coding & SQL Assessment",
          description: "90 minutes timed environment. Evaluated array manipulation, hash map caching, and SQL window functions.",
          keyQuestions: ["Given an array of timestamp logs, find top K active users", "Write SQL query with DENSE_RANK() for top salaries by department"],
        },
        {
          roundName: "Round 2: Live Live API Pair Programming",
          description: "Built a FastAPI microservice with Redis caching in 60 minutes while sharing screen.",
          keyQuestions: ["Implement sliding window rate limiting middleware", "Write unit tests with pytest"],
        },
        {
          roundName: "Round 3: System Design",
          description: "Designed scalable Notification Dispatcher supporting SMS, Push, and Email.",
          keyQuestions: ["How do you ensure at-least-once message delivery?", "Explain Kafka consumer groups"],
        },
      ],
      preparationStrategy: "Focus on building hands-on microservices with FastAPI and Docker. Practice designing rate limiters, LRU caches, and pub/sub message queues.",
      mistakesToAvoid: [
        "Don't jump straight into code without clarifying API requirements and edge cases first.",
        "Avoid ignoring error handling and non-happy path HTTP status codes.",
      ],
      finalAdvice: "Be transparent when you don't know something. TechNova interviewers respect candidate reasoning and open problem-solving discussions.",
    },
    likes: 42,
    commentsCount: 12,
  },
  {
    id: "exp-2",
    authorName: "Vikramaditya Rao",
    authorRole: "Senior Software Engineer",
    authorCompany: "Microsoft",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    experienceType: "Interview",
    title: "Cracking Microsoft's Backend & Cloud Engineer Onsite: Tips & DSA Strategy",
    companyName: "Microsoft",
    companyLogo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=120&q=80",
    summary: "A step-by-step guide to clearing Microsoft's 4-round onsite interview for Associate Software Engineer roles.",
    readTime: "8 min read",
    difficulty: "Advanced",
    publishedDate: "Jul 28, 2026",
    skillsTested: ["C# / Java", "Data Structures", "Azure", "SQL", "System Design"],
    sections: {
      overview: "Microsoft places deep emphasis on clean code structure, concurrency fundamentals, and collaborative communication.",
      hiringProcess: [
        "Round 1: Codility Technical Screening",
        "Round 2: Data Structures & Algorithms Onsite",
        "Round 3: Object-Oriented Design & Microservices",
        "Round 4: AA (As-Appropriate / Hiring Manager) Round",
      ],
      assessmentRounds: [
        {
          roundName: "Round 2: DSA Deep Dive",
          description: "Tree traversal and dynamic programming optimization.",
          keyQuestions: ["Lowest Common Ancestor in Binary Tree", "Coin Change DP formulation"],
        },
      ],
      preparationStrategy: "Master binary trees, graphs, and system design patterns like Circuit Breakers and Load Balancing.",
      mistakesToAvoid: [
        "Failing to discuss time and space complexity before coding.",
        "Ignoring clean code variable naming and modular functions.",
      ],
      finalAdvice: "Communicate your thought process out loud constantly during coding.",
    },
    likes: 89,
    commentsCount: 24,
  },
  {
    id: "exp-3",
    authorName: "Priya Sharma",
    authorRole: "Lead DevOps Engineer",
    authorCompany: "CloudGrid Inc.",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
    experienceType: "First Job",
    title: "Transitioning From College Graduate to Lead Cloud Engineer in 3 Years",
    companyName: "CloudGrid Inc.",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80",
    summary: "Practical advice on mastering Docker, Kubernetes, Terraform, and CI/CD pipelines as a junior engineer.",
    readTime: "5 min read",
    difficulty: "Intermediate",
    publishedDate: "Jun 14, 2026",
    skillsTested: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
    sections: {
      overview: "DevOps requires understanding software development lifecycle as well as infrastructure automation.",
      hiringProcess: ["Portfolio Review", "Live Debugging Scenario", "System Architecture"],
      assessmentRounds: [],
      preparationStrategy: "Build personal projects hosted on cloud free tiers with automated GitHub Actions CI/CD pipelines.",
      mistakesToAvoid: ["Relying exclusively on cloud UI consoles instead of Infrastructure as Code."],
      finalAdvice: "Learn Linux shell scripting and network protocols deeply.",
    },
    likes: 67,
    commentsCount: 15,
  },
];

export const MOCK_COMPANY_GUIDES: Record<string, CompanyExperienceGuide> = {
  TechNova: {
    companyName: "TechNova Systems",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    industry: "Enterprise SaaS & Cloud Infrastructure",
    headquarters: "San Francisco, CA & Bengaluru, IN",
    hiringOverview: "TechNova evaluates candidates on practical backend engineering, REST API performance, Redis caching, and real-world system design.",
    rounds: [
      { roundNumber: 1, title: "Online Technical Assessment", focus: "DSA & SQL", description: "90-minute test with 2 coding problems and 5 complex SQL window query questions." },
      { roundNumber: 2, title: "Live API Pair Programming", focus: "FastAPI / Node.js & Redis", description: "60-minute live screen share building an API microservice with rate limiting." },
      { roundNumber: 3, title: "System Design & Architecture", focus: "Distributed Systems", description: "Designing scalable pub/sub messaging and notification dispatchers." },
      { roundNumber: 4, title: "Cultural Fit & Engineering Leadership", focus: "Behavioral & Growth", description: "Evaluating team collaboration, past project challenges, and adaptability." },
    ],
    commonlyTestedSkills: ["Python", "FastAPI", "Redis", "SQL", "Docker", "System Design"],
    preparationResources: [
      "FastAPI Official Async Guide",
      "Redis Caching & Eviction Policies Masterclass",
      "LeetCode Top 100 Medium Questions",
    ],
    adviceFromAlumni: [
      "Always explain your API status code choices (e.g. 429 Too Many Requests vs 400 Bad Request).",
      "Demonstrate clean modular project file structure.",
    ],
    totalExperiencesCount: 5,
  },
  Microsoft: {
    companyName: "Microsoft",
    companyLogo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=120&q=80",
    industry: "Big Tech & Cloud Software",
    headquarters: "Redmond, WA & Bengaluru, IN",
    hiringOverview: "Microsoft focuses heavily on core Data Structures, Algorithms, Object-Oriented Design, and Azure cloud alignment.",
    rounds: [
      { roundNumber: 1, title: "Codility Screening", focus: "DSA Coding", description: "2 coding questions in 60 minutes." },
      { roundNumber: 2, title: "Data Structures Onsite", focus: "Trees, Graphs & DP", description: "Deep dive into binary tree traversals and dynamic programming optimization." },
      { roundNumber: 3, title: "Low Level & High Level Design", focus: "OOD & System Design", description: "Designing scalable desktop/cloud software services." },
      { roundNumber: 4, title: "As-Appropriate (AA) Round", focus: "Engineering Principles & Culture", description: "Final interview with Principal Engineer or Director." },
    ],
    commonlyTestedSkills: ["Python", "FastAPI", "C#", "Azure", "SQL", "Microservices"],
    preparationResources: [
      "Cracking the Coding Interview - Trees & Graphs",
      "Designing Data-Intensive Applications by Martin Kleppmann",
    ],
    adviceFromAlumni: [
      "Dry run your code with edge cases before claiming you are finished.",
      "Highlight teamwork and cross-functional communication.",
    ],
    totalExperiencesCount: 8,
  },
};

export const MOCK_INDUSTRY_INSIGHTS: IndustryInsight[] = [
  {
    id: "ins-1",
    title: "FastAPI & Async Microservices Demand Surges by 48%",
    category: "Trending Skills",
    growthPct: "+48%",
    summary: "Product companies are shifting heavily from legacy synchronous frameworks to Python FastAPI and Node.js async engines.",
    description: "High-concurrency backend services requiring sub-50ms API response times have driven rapid adoption of FastAPI and Redis caching. Master asyncio, Pydantic, and Starlette middleware.",
    recommendedActions: [
      "Build a multi-service FastAPI project with Docker Compose.",
      "Add Redis sliding-window rate limiting to your resume backend project.",
    ],
  },
  {
    id: "ins-2",
    title: "Containerization & Kubernetes Now Baseline for Junior Roles",
    category: "Hiring Demand",
    growthPct: "+62%",
    summary: "Over 60% of backend & DevOps postings require hands-on Docker and CI/CD experience even for entry-level candidates.",
    description: "Employers no longer expect candidates to learn containerization on the job. Demonstrating multi-stage Docker builds and automated GitHub Actions CI/CD provides a competitive edge.",
    recommendedActions: [
      "Containerize your full-stack projects using multi-stage Dockerfiles.",
      "Set up GitHub Actions to run automated pytest / unit tests on pull requests.",
    ],
  },
  {
    id: "ins-3",
    title: "Generative AI & Vector Search Integration Across SaaS Applications",
    category: "Technology Shift",
    growthPct: "+75%",
    summary: "SaaS platforms are embedding AI RAG pipelines into standard customer workflows.",
    description: "Knowing how to integrate LLM APIs (Groq, OpenAI, LangChain) with vector databases (Pinecone, Qdrant) is becoming a high-demand skill for software engineers.",
    recommendedActions: [
      "Integrate an AI assistant or document QA bot into your next Web project.",
    ],
  },
];

export const MOCK_RECOMMENDED_STUDENTS: RecommendedStudent[] = [
  {
    id: "rec-1",
    name: "Alex Morgan",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    degree: "B.Tech Computer Science",
    department: "School of Engineering",
    gradYear: 2027,
    careerGoal: "Backend Software Engineer",
    readinessScore: 88,
    topSkills: ["Python", "FastAPI", "React", "PostgreSQL", "Docker"],
    projectsCount: 4,
    resumeUrl: "/resume-sample.pdf",
    matchReason: "Top 5% student in FastAPI and Python backend benchmarks with 88% readiness index.",
    isRecommended: false,
  },
  {
    id: "rec-2",
    name: "Ananya Roy",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    degree: "B.Tech AI & Data Science",
    department: "Department of AI",
    gradYear: 2026,
    careerGoal: "Full Stack AI Developer",
    readinessScore: 84,
    topSkills: ["React", "TypeScript", "Python", "PyTorch", "FastAPI"],
    projectsCount: 5,
    resumeUrl: "/resume-sample.pdf",
    matchReason: "Strong full-stack experience with high performance in React & Next.js frontend benchmarks.",
    isRecommended: true,
  },
  {
    id: "rec-3",
    name: "Rohan Das",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    degree: "B.Tech Information Technology",
    department: "Department of IT",
    gradYear: 2027,
    careerGoal: "DevOps & Cloud Engineer",
    readinessScore: 79,
    topSkills: ["Docker", "Linux", "Python", "Git", "AWS"],
    projectsCount: 3,
    resumeUrl: "/resume-sample.pdf",
    matchReason: "Demonstrated strong containerization portfolio with Docker & Linux shell automation.",
    isRecommended: false,
  },
];

export const MOCK_APPLICANTS_PIPELINE: CandidateApplicant[] = [
  {
    id: "app-101",
    studentName: "Alex Morgan",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    opportunityTitle: "Full Stack / Backend Engineer Intern",
    appliedDate: "Aug 24, 2026",
    matchScore: 88,
    skills: ["Python", "FastAPI", "React", "PostgreSQL", "Docker"],
    education: "B.Tech CS (Class of 2027) - GPA 3.9",
    experience: "SIH Hackathon Winner & Open Source Contributor",
    projects: ["CampusConnect Career Portal", "Real-Time ATS Resume Predictor"],
    stage: "Interview",
  },
  {
    id: "app-102",
    studentName: "Ananya Roy",
    studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    opportunityTitle: "Full Stack / Backend Engineer Intern",
    appliedDate: "Aug 23, 2026",
    matchScore: 84,
    skills: ["React", "TypeScript", "Python", "FastAPI"],
    education: "B.Tech AI & Data Science (Class of 2026)",
    experience: "Web Development Club Lead",
    projects: ["AI Document Search Engine"],
    stage: "Shortlisted",
  },
  {
    id: "app-103",
    studentName: "Rohan Das",
    studentAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    opportunityTitle: "DevOps & Cloud Engineer Intern",
    appliedDate: "Aug 22, 2026",
    matchScore: 79,
    skills: ["Docker", "Linux", "Python", "AWS"],
    education: "B.Tech IT (Class of 2027)",
    experience: "Cloud Lab Assistant",
    projects: ["Automated Kubernetes Deployment Scripts"],
    stage: "Applicants",
  },
  {
    id: "app-104",
    studentName: "Karthik Subramanian",
    studentAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    opportunityTitle: "Full Stack / Backend Engineer Intern",
    appliedDate: "Aug 20, 2026",
    matchScore: 92,
    skills: ["Python", "FastAPI", "SQL", "Redis"],
    education: "B.Tech CS (Class of 2026)",
    experience: "Backend Intern @ Local Startup",
    projects: ["High Throughput Payment Gateway"],
    stage: "Selected",
  },
];

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    authorName: "Aarav Mehta",
    authorRole: "Senior Software Engineer @ TechNova",
    authorCompany: "TechNova Systems",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    category: "Career Advice",
    content: "To all 3rd and 4th year computer science students preparing for placement season: Stop grinding 500+ LeetCode problems blindly. Instead, focus on 75 curated core problems and master explaining your memory complexity out loud. Most interviewers care far more about how you communicate your debugging steps than getting an immediate 100% optimal solution on minute one.",
    publishedDate: "2 hours ago",
    likes: 124,
    commentsCount: 38,
    isLiked: true,
    tags: ["InterviewTips", "CareerGrowth", "Backend"],
  },
  {
    id: "post-2",
    authorName: "Priya Sharma",
    authorRole: "Lead DevOps Engineer @ CloudGrid",
    authorCompany: "CloudGrid Inc.",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
    category: "Hiring",
    content: "We are hiring 3 Backend & Cloud Engineering Interns at CloudGrid Inc. for Spring 2027! Looking for students with hands-on experience in Docker, Python/FastAPI, and PostgreSQL. Referrals available for CampusConnect students who complete our benchmark skill assessment.",
    publishedDate: "5 hours ago",
    likes: 210,
    commentsCount: 56,
    tags: ["HiringAlert", "Internship", "CloudGrid"],
  },
  {
    id: "post-3",
    authorName: "Vikramaditya Rao",
    authorRole: "Senior Software Engineer @ Microsoft",
    authorCompany: "Microsoft",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    category: "Interview Tips",
    content: "When asked 'Design a Rate Limiter' in a system design interview, start by asking clarification questions: What is the traffic volume? Is it per user or per IP? Should it return 429 status code? Then introduce Sliding Window algorithm with Redis before jumping into multi-region architecture.",
    publishedDate: "1 day ago",
    likes: 185,
    commentsCount: 29,
    tags: ["SystemDesign", "Microsoft", "Architecture"],
  },
];

export const MOCK_ALUMNI_NOTIFICATIONS: AlumniNotification[] = [
  {
    id: "notif-1",
    type: "mentorship_request",
    title: "New Mentorship Request",
    description: "Alex Morgan requested a 1-on-1 session on 'System Design & Mock Interview'.",
    timestamp: "10 mins ago",
    isRead: false,
    actionUrl: "/alumni/mentorship",
  },
  {
    id: "notif-2",
    type: "mock_interview",
    title: "Mock Interview Request",
    description: "Siddharth Malhotra requested a mock technical interview for Swiggy.",
    timestamp: "1 hour ago",
    isRead: false,
    actionUrl: "/alumni/mentorship",
  },
  {
    id: "notif-3",
    type: "hiring_update",
    title: "New Application Received",
    description: "Alex Morgan applied for 'Full Stack / Backend Engineer Intern'.",
    timestamp: "3 hours ago",
    isRead: true,
    actionUrl: "/alumni/applications",
  },
  {
    id: "notif-4",
    type: "insight",
    title: "Trending Skill Alert",
    description: "FastAPI and Redis demand increased by 48% in backend roles this month.",
    timestamp: "1 day ago",
    isRead: true,
    actionUrl: "/alumni/insights",
  },
];
