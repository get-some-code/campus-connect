export interface InterviewQuestion {
  id: string;
  companyId: string;
  companyName: string;
  role: string;
  domain: "DSA & Algorithms" | "System Design" | "SQL & Databases" | "Core CS Fundamentals" | "Aptitude & Reasoning" | "HR & Behavioral";
  round: "Online Assessment" | "Technical Round 1" | "Technical Round 2" | "System Design" | "HR & Behavioral" | "Managerial Round";
  difficulty: "Easy" | "Medium" | "Hard";
  title: string;
  questionText: string;
  codeSnippet?: string;
  sampleSolution: string;
  keyConcepts: string[];
  expectedPoints: string[];
  contributorBatch?: string;
  contributorRole?: string;
  isAlumniContributed: boolean;
  contributedDate: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  brandColor: string;
  category: "Big Tech" | "Consulting & Finance" | "Services & Enterprise" | "E-Commerce & Retail";
  roles: string[];
  difficultySummary: "Mixed" | "Intermediate" | "Advanced";
  description: string;
}

export const COMPANIES: Company[] = [
  {
    id: "google",
    name: "Google",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=120&q=80",
    brandColor: "#4285F4",
    category: "Big Tech",
    roles: ["Software Engineer", "Site Reliability Engineer", "ML Engineer"],
    difficultySummary: "Advanced",
    description: "Focuses heavily on Data Structures & Algorithms, Graph Traversals, Dynamic Programming, and Scalable System Design.",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=120&q=80",
    brandColor: "#00A4EF",
    category: "Big Tech",
    roles: ["Software Engineer (SDE)", "Cloud Solution Architect", "Data Engineer"],
    difficultySummary: "Advanced",
    description: "Evaluates Object-Oriented Design, Trees, System Architecture, Azure integration, and clean modular code.",
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=120&q=80",
    brandColor: "#FF9900",
    category: "Big Tech",
    roles: ["SDE I / SDE II", "Front End Engineer", "DevOps Engineer"],
    difficultySummary: "Advanced",
    description: "Focuses on Leadership Principles (LP), Slidings Windows, Trees & Graphs, and High-Throughput System Design.",
  },
  {
    id: "apple",
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=120&q=80",
    brandColor: "#555555",
    category: "Big Tech",
    roles: ["Software Systems Engineer", "iOS / Swift Engineer", "Core OS Engineer"],
    difficultySummary: "Advanced",
    description: "Tests low-level memory management, concurrency, C++/Swift DSA, and operating system internals.",
  },
  {
    id: "meta",
    name: "Meta",
    logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=120&q=80",
    brandColor: "#0668E1",
    category: "Big Tech",
    roles: ["Production Engineer", "Full Stack Engineer", "Backend SDE"],
    difficultySummary: "Advanced",
    description: "Places extreme emphasis on speed and accuracy in LeetCode Medium/Hard algorithmic coding and distributed systems design.",
  },
  {
    id: "adobe",
    name: "Adobe",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=120&q=80",
    brandColor: "#FF0000",
    category: "Big Tech",
    roles: ["Computer Scientist I", "Full Stack Developer", "C++ Graphics Engineer"],
    difficultySummary: "Advanced",
    description: "Tests Trees, Matrix algorithms, C++ Object-Oriented Design, and PDF/Cloud rendering pipelines.",
  },
  {
    id: "oracle",
    name: "Oracle",
    logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=120&q=80",
    brandColor: "#F80000",
    category: "Big Tech",
    roles: ["Member of Technical Staff (MTS)", "Cloud Database Engineer"],
    difficultySummary: "Intermediate",
    description: "Focuses on Database Internals, SQL Query Tuning, Java Multithreading, and Distributed Cloud Services.",
  },
  {
    id: "ibm",
    name: "IBM",
    logo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=120&q=80",
    brandColor: "#052FAD",
    category: "Big Tech",
    roles: ["Associate Software Developer", "Quantum / Cloud Engineer"],
    difficultySummary: "Intermediate",
    description: "Evaluates Docker/Kubernetes container basics, Microservices, Python, and Enterprise Cloud Architectures.",
  },
  {
    id: "accenture",
    name: "Accenture",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80",
    brandColor: "#A100FF",
    category: "Services & Enterprise",
    roles: ["Advanced Application Engineering Analyst", "Associate Software Engineer"],
    difficultySummary: "Intermediate",
    description: "Covers Cognitive Aptitude, Pseudo Code Debugging, SQL Window Functions, and Client Communication.",
  },
  {
    id: "deloitte",
    name: "Deloitte",
    logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=120&q=80",
    brandColor: "#86BC25",
    category: "Consulting & Finance",
    roles: ["Technology Analyst", "Solution Advisor", "Data Risk Consultant"],
    difficultySummary: "Intermediate",
    description: "Combines Case Study Reasoning, SQL Analysis, Data Modeling, and Managerial Behavioral Rounds.",
  },
  {
    id: "tcs",
    name: "TCS",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80",
    brandColor: "#1B365D",
    category: "Services & Enterprise",
    roles: ["Digital Developer", "Ninja Developer", "System Engineer"],
    difficultySummary: "Intermediate",
    description: "Focuses on TCS NQT Aptitude, Arrays/Strings manipulation in C++/Java, DBMS basics, and SDLC.",
  },
  {
    id: "infosys",
    name: "Infosys",
    logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=120&q=80",
    brandColor: "#007CC3",
    category: "Services & Enterprise",
    roles: ["Specialist Programmer (SP)", "Digital Specialist Engineer (DSE)"],
    difficultySummary: "Intermediate",
    description: "Features HackWithInfy coding questions (DP, Greedy, Graphs) and core Java/Python OOP technical rounds.",
  },
  {
    id: "wipro",
    name: "Wipro",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=120&q=80",
    brandColor: "#0066B2",
    category: "Services & Enterprise",
    roles: ["Project Engineer", "Turbo Developer"],
    difficultySummary: "Intermediate",
    description: "Covers Elite NTH assessment, string parsing, basic data structures, and HR cultural fit questions.",
  },
  {
    id: "cognizant",
    name: "Cognizant",
    logo: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=120&q=80",
    brandColor: "#003366",
    category: "Services & Enterprise",
    roles: ["GenC Next Developer", "GenC Elevate Engineer"],
    difficultySummary: "Intermediate",
    description: "Evaluates SQL Join queries, React/Web basics, Array/String logic, and problem-solving reasoning.",
  },
  {
    id: "capgemini",
    name: "Capgemini",
    logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&q=80",
    brandColor: "#0070AD",
    category: "Services & Enterprise",
    roles: ["Senior Software Analyst", "Cloud & Microservices Developer"],
    difficultySummary: "Intermediate",
    description: "Focuses on Pseudo-code analysis, English business communication, Java/Python DSA, and Behavioral rounds.",
  },
  {
    id: "jpmorgan",
    name: "JPMorgan Chase",
    logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80",
    brandColor: "#111111",
    category: "Consulting & Finance",
    roles: ["Software Engineer (SEP)", "Quant Developer", "Cloud Security Engineer"],
    difficultySummary: "Advanced",
    description: "Focuses on Code For Good hackathons, low-latency Java/Spring Boot backend, SQL transactions, and concurrency.",
  },
  {
    id: "goldmansachs",
    name: "Goldman Sachs",
    logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=120&q=80",
    brandColor: "#7399C6",
    category: "Consulting & Finance",
    roles: ["Engineering Analyst", "Quantitative Analyst", "Risk Tech Engineer"],
    difficultySummary: "Advanced",
    description: "Rigorous math/probability screening, Graph algorithms, Dynamic Programming, and System Design.",
  },
  {
    id: "walmart",
    name: "Walmart Global Tech",
    logo: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=120&q=80",
    brandColor: "#0071CE",
    category: "E-Commerce & Retail",
    roles: ["Software Engineer II", "Data Engineer", "Cloud Engineer"],
    difficultySummary: "Advanced",
    description: "Evaluates high-concurrency e-commerce order routing, Kafka event streams, Redis caching, and Trees.",
  },
  {
    id: "flipkart",
    name: "Flipkart",
    logo: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=120&q=80",
    brandColor: "#2874F0",
    category: "E-Commerce & Retail",
    roles: ["SDE-1", "Machine Learning Engineer", "Frontend SDE"],
    difficultySummary: "Advanced",
    description: "Machine Coding round (building working code in 90 mins), Low-Level Design (LLD), and DSA Hard problems.",
  },
  {
    id: "cisco",
    name: "Cisco",
    logo: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=120&q=80",
    brandColor: "#1BA0D7",
    category: "Big Tech",
    roles: ["Software Engineer (Networks)", "Cloud Security SDE", "Systems Software Engineer"],
    difficultySummary: "Intermediate",
    description: "Focuses on TCP/IP Networking, Bit Manipulation, Operating Systems, C/Python, and Subnetting logic.",
  },
];

export const INITIAL_QUESTIONS: InterviewQuestion[] = [
  // ===================== AMAZON =====================
  {
    id: "q-amz-1",
    companyId: "amazon",
    companyName: "Amazon",
    role: "SDE I (Backend)",
    domain: "DSA & Algorithms",
    round: "Technical Round 1",
    difficulty: "Medium",
    title: "Sliding Window Maximum (Item Fulfillment Speed)",
    questionText: "Given an array of customer order processing times `nums` and a sliding window size `k`, find the maximum processing time in each window as it slides from left to right across the fulfillment pipeline.",
    codeSnippet: `def max_sliding_window(nums: list[int], k: int) -> list[int]:
    # Write your solution here
    pass`,
    sampleSolution: `from collections import deque

def max_sliding_window(nums: list[int], k: int) -> list[int]:
    d = deque()
    res = []
    for i, n in enumerate(nums):
        while d and nums[d[-1]] < n:
            d.pop()
        d.append(i)
        if d[0] == i - k:
            d.popleft()
        if i >= k - 1:
            res.append(nums[d[0]])
    return res`,
    keyConcepts: ["Monotonic Deque", "Sliding Window", "O(N) Time Complexity"],
    expectedPoints: [
      "Use a Monotonic Decreasing Deque to store indices in non-increasing order.",
      "Pop elements from the back of deque if current number is greater.",
      "Remove expired index from front of deque when window moves past `i - k`.",
      "Achieve linear O(N) time complexity instead of naive O(N*K).",
    ],
    contributorBatch: "Class of 2024 Alumni @ Amazon",
    contributorRole: "SDE I",
    isAlumniContributed: true,
    contributedDate: "Aug 15, 2026",
  },
  {
    id: "q-amz-2",
    companyId: "amazon",
    companyName: "Amazon",
    role: "SDE I / Backend",
    domain: "System Design",
    round: "System Design",
    difficulty: "Hard",
    title: "Design a High-Throughput Notification Dispatcher",
    questionText: "Design a scalable Notification System that supports sending millions of order status updates per minute via Push Notifications, SMS, and Email with at-least-once delivery guarantees.",
    sampleSolution: `Key Architecture Blueprint:
1. API Gateway: Receives notification trigger events from order services.
2. Amazon SQS / Apache Kafka: Decouples publishers from consumers using partitioned topic queues.
3. Worker Nodes (Python/Go): Consumes messages with exponential backoff retries and idempotent message IDs.
4. Redis Cache: Deduplicates message IDs within a 24-hour sliding window.
5. Third-Party Integrations: AWS SNS (Push), Twilio (SMS), SendGrid (Email).`,
    keyConcepts: ["Message Queue Decoupling", "At-Least-Once Delivery", "Rate Limiting & Retries", "Idempotency"],
    expectedPoints: [
      "Clarify non-functional requirements: throughput, latency tolerance, delivery guarantees.",
      "Explain message queue buffering with Kafka/SQS to absorb flash sale spikes.",
      "Detail idempotency key strategy in Redis to prevent duplicate push notifications.",
      "Discuss Dead Letter Queue (DLQ) handling for failed third-party provider calls.",
    ],
    contributorBatch: "Class of 2023 Alumni @ Amazon",
    contributorRole: "SDE II",
    isAlumniContributed: true,
    contributedDate: "Jul 28, 2026",
  },
  {
    id: "q-amz-3",
    companyId: "amazon",
    companyName: "Amazon",
    role: "SDE I",
    domain: "SQL & Databases",
    round: "Technical Round 2",
    difficulty: "Medium",
    title: "Find Top 3 Best-Selling Products per Category",
    questionText: "Write a SQL query using Window Functions to identify the top 3 products with highest total revenue in each product category over the last quarter.",
    codeSnippet: `SELECT category_id, product_id, total_revenue
FROM (
    -- Fill in Window Function logic
) rank_summary;`,
    sampleSolution: `WITH MonthlyRevenue AS (
    SELECT 
        p.category_id,
        p.product_id,
        SUM(o.quantity * o.unit_price) AS total_revenue,
        DENSE_RANK() OVER (
            PARTITION BY p.category_id 
            ORDER BY SUM(o.quantity * o.unit_price) DESC
        ) AS rnk
    FROM products p
    JOIN order_items o ON p.product_id = o.product_id
    WHERE o.created_at >= NOW() - INTERVAL '90 days'
    GROUP BY p.category_id, p.product_id
)
SELECT category_id, product_id, total_revenue
FROM MonthlyRevenue
WHERE rnk <= 3;`,
    keyConcepts: ["DENSE_RANK()", "PARTITION BY", "SQL Aggregation", "Subquery / CTE"],
    expectedPoints: [
      "Use CTE or subquery to generate DENSE_RANK() partitioned by `category_id`.",
      "Order inside window function by `SUM(quantity * unit_price) DESC`.",
      "Filter `WHERE rnk <= 3` in the outer query.",
    ],
    contributorBatch: "Class of 2024 Alumni @ Amazon",
    contributorRole: "SDE I",
    isAlumniContributed: true,
    contributedDate: "Aug 02, 2026",
  },
  {
    id: "q-amz-4",
    companyId: "amazon",
    companyName: "Amazon",
    role: "SDE I",
    domain: "Core CS Fundamentals",
    round: "Online Assessment",
    difficulty: "Easy",
    title: "Explain Process vs Thread & Race Condition Prevention",
    questionText: "Compare OS Processes and Threads in terms of memory sharing. Explain how a Race Condition occurs in multithreaded order processing and how to prevent it.",
    sampleSolution: `1. Process vs Thread:
- A Process is an independent executing program with its own isolated virtual address space (Heap, Code, Stack).
- A Thread is the smallest unit of CPU execution inside a process; threads share Heap memory and global variables but have separate execution Stacks.

2. Race Condition:
- Occurs when two or more threads concurrently modify shared data (e.g., inventory count) without synchronization, leading to inconsistent state.

3. Prevention:
- Use Mutex Locks / Semaphores / Synchronized Blocks.
- Use Atomic Variables (e.g., AtomicInteger) for incrementing inventory counters.`,
    keyConcepts: ["Shared Memory Heap", "Thread Stacks", "Mutex / Locks", "Atomic Operations"],
    expectedPoints: [
      "Differentiate memory isolation between processes and memory sharing among threads.",
      "Define race condition with a clear concurrency example.",
      "Name synchronization primitives: Mutex, Semaphore, ReentrantLock, or Atomic types.",
    ],
    contributorBatch: "Class of 2025 Alumni @ Amazon",
    contributorRole: "SDE Intern",
    isAlumniContributed: true,
    contributedDate: "Jun 10, 2026",
  },
  {
    id: "q-amz-5",
    companyId: "amazon",
    companyName: "Amazon",
    role: "SDE I",
    domain: "HR & Behavioral",
    round: "HR & Behavioral",
    difficulty: "Medium",
    title: "Amazon LP: Customer Obsession & Customer-Centric Tradeoff",
    questionText: "Describe a situation where you had to make a technical compromise or prioritize a feature specifically to improve user experience. How did you handle disagreement within your team?",
    sampleSolution: `STAR Method Response Structure:
- Situation: During my web project development, our team planned to add complex animation features that increased mobile load time by 3.2 seconds.
- Task: As the developer focused on user experience, I needed to persuade the team to optimize page performance for low-bandwidth users.
- Action: I ran benchmark tests, gathered loading metrics, and presented data showing a 25% drop in user conversion for every extra second of delay. I proposed an optimized CSS micro-animation approach.
- Result: Page load time dropped from 4.2s to 1.1s, resulting in positive user feedback and seamless navigation.`,
    keyConcepts: ["STAR Method", "Data-Driven Persuasion", "Customer Obsession LP", "Bias for Action"],
    expectedPoints: [
      "Follow STAR format (Situation, Task, Action, Result).",
      "Demonstrate Amazon LP 'Customer Obsession' over personal preferences.",
      "Show data-driven decision making when convincing team members.",
    ],
    contributorBatch: "Class of 2024 Alumni @ Amazon",
    contributorRole: "SDE I",
    isAlumniContributed: true,
    contributedDate: "May 18, 2026",
  },

  // ===================== GOOGLE =====================
  {
    id: "q-goog-1",
    companyId: "google",
    companyName: "Google",
    role: "Software Engineer (SWE)",
    domain: "DSA & Algorithms",
    round: "Technical Round 1",
    difficulty: "Hard",
    title: "Lowest Common Ancestor in Binary Tree with Parent Pointers",
    questionText: "Given two nodes `p` and `q` in a binary tree where each node contains a pointer to its parent node, find their Lowest Common Ancestor (LCA) in O(H) time and O(1) extra space.",
    codeSnippet: `class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None
        self.parent = None

def lowest_common_ancestor(p: TreeNode, q: TreeNode) -> TreeNode:
    # Implement LCA using two pointers
    pass`,
    sampleSolution: `def lowest_common_ancestor(p: TreeNode, q: TreeNode) -> TreeNode:
    a, b = p, q
    while a != b:
        a = a.parent if a else q
        b = b.parent if b else p
    return a`,
    keyConcepts: ["Two-Pointer Intersection", "Linked List Cycle Concept", "O(1) Space", "Tree Traversal"],
    expectedPoints: [
      "Use two pointers initialized at `p` and `q`.",
      "When a pointer reaches `None` (root's parent), switch it to the start of the opposite node.",
      "Pointers traverse equal combined path lengths `depth(p) + depth(q)` and meet at LCA.",
      "Achieve O(H) time complexity and O(1) space complexity.",
    ],
    contributorBatch: "Class of 2023 Alumni @ Google",
    contributorRole: "SWE II",
    isAlumniContributed: true,
    contributedDate: "Aug 10, 2026",
  },
  {
    id: "q-goog-2",
    companyId: "google",
    companyName: "Google",
    role: "Software Engineer (SWE)",
    domain: "System Design",
    round: "System Design",
    difficulty: "Hard",
    title: "Design Google Auto-Complete Search Suggestions",
    questionText: "Design a real-time prefix search auto-complete system that returns top 5 trending search queries matching a user's typed prefix within 50ms latency.",
    sampleSolution: `Key Architecture:
1. Trie Data Structure: Store search query strings in a Distributed Trie where each node caches top 5 ranked queries.
2. Trie Partitioning / Sharding: Partition Trie nodes alphabetically (A-Z) across memory clusters.
3. Redis Cache Layer: Cache top 100,000 frequent prefix queries to bypass Trie lookup.
4. Offline MapReduce Pipeline: Compute query frequencies from search log streams every hour.`,
    keyConcepts: ["Distributed Trie", "Prefix Search", "InMemory Caching", "Top-K Heavy Hitters"],
    expectedPoints: [
      "Discuss Trie structure storing cached top 5 suggestions at every node.",
      "Address scale: 5B queries/day requires memory sharding and caching.",
      "Explain asynchronous log collection via Kafka and MapReduce for updating weights.",
    ],
    contributorBatch: "Class of 2023 Alumni @ Google",
    contributorRole: "SWE II",
    isAlumniContributed: true,
    contributedDate: "Jul 15, 2026",
  },
  {
    id: "q-goog-3",
    companyId: "google",
    companyName: "Google",
    role: "SWE / Cloud",
    domain: "Core CS Fundamentals",
    round: "Technical Round 2",
    difficulty: "Medium",
    title: "Explain Virtual Memory, Page Faults, and TLB Caching",
    questionText: "How does Virtual Memory map virtual address spaces to physical RAM? Explain what happens when a Page Fault occurs and how Translation Lookaside Buffer (TLB) accelerates translation.",
    sampleSolution: `1. Virtual Memory:
- Provides memory isolation and abstract contiguous address spaces to processes via Page Tables.

2. Page Fault Sequence:
- CPU checks Page Table; if valid bit = 0, Page Fault Exception triggers OS trap.
- OS locates missing page on Disk/Swap space.
- OS allocates physical RAM frame, reads page from disk into RAM, updates Page Table, and resumes execution.

3. TLB (Translation Lookaside Buffer):
- Hardware MMU cache storing recent Virtual-to-Physical page address mappings, bypassing 2-level Page Table lookups.`,
    keyConcepts: ["Virtual-to-Physical Address", "MMU & TLB", "Page Table Lookup", "OS Trap & Swap File"],
    expectedPoints: [
      "Explain role of MMU (Memory Management Unit) and Page Table.",
      "Trace step-by-step Page Fault resolution handling by OS.",
      "Describe TLB as a fast hardware cache that minimizes memory bus access.",
    ],
    contributorBatch: "Class of 2024 Alumni @ Google",
    contributorRole: "Software Engineer",
    isAlumniContributed: true,
    contributedDate: "Jun 22, 2026",
  },
  {
    id: "q-goog-4",
    companyId: "google",
    companyName: "Google",
    role: "SWE",
    domain: "SQL & Databases",
    round: "Online Assessment",
    difficulty: "Medium",
    title: "Detect Consecutive User Logins (SQL Window Functions)",
    questionText: "Given a `user_logins(user_id, login_date)` table, write SQL to find users who logged in for 3 or more consecutive days.",
    sampleSolution: `WITH RankedLogins AS (
    SELECT DISTINCT user_id, login_date,
           DENSE_RANK() OVER (PARTITION BY user_id ORDER BY login_date) as rnk
    FROM user_logins
),
GroupedLogins AS (
    SELECT user_id,
           login_date - (rnk * INTERVAL '1 day') AS grp
    FROM RankedLogins
)
SELECT user_id
FROM GroupedLogins
GROUP BY user_id, grp
HAVING COUNT(*) >= 3;`,
    keyConcepts: ["DENSE_RANK()", "Date Subtraction Grouping", "HAVING COUNT(*)"],
    expectedPoints: [
      "Deduplicate login dates per user using `DISTINCT`.",
      "Subtract `DENSE_RANK()` days from `login_date` to produce a constant group key for consecutive dates.",
      "Group by `user_id, grp` and filter `HAVING COUNT(*) >= 3`.",
    ],
    contributorBatch: "Class of 2024 Alumni @ Google",
    contributorRole: "Software Engineer",
    isAlumniContributed: true,
    contributedDate: "Jul 05, 2026",
  },
  {
    id: "q-goog-5",
    companyId: "google",
    companyName: "Google",
    role: "SWE",
    domain: "HR & Behavioral",
    round: "HR & Behavioral",
    difficulty: "Medium",
    title: "Googleliness: Handling Ambiguous Technical Requirements",
    questionText: "Give an example of a project where requirements were vague or constantly changing. How did you create clarity and drive technical progress?",
    sampleSolution: `Key Points:
- Google values 'Googleliness' and comfort with ambiguity.
- Break down vague goals into measurable milestones.
- Build rapid POC (Proof of Concept) prototypes to gather feedback.
- Document assumptions clearly and align stakeholders through RFCs (Request for Comments).`,
    keyConcepts: ["Googleliness", "RFC Documentation", "Iterative POC", "Stakeholder Alignment"],
    expectedPoints: [
      "Emphasize proactive problem ownership without waiting for step-by-step instructions.",
      "Describe writing technical RFCs or design documents.",
      "Show measurable outcome and team alignment.",
    ],
    contributorBatch: "Class of 2024 Alumni @ Google",
    contributorRole: "Software Engineer",
    isAlumniContributed: true,
    contributedDate: "May 01, 2026",
  },

  // ===================== MICROSOFT =====================
  {
    id: "q-msft-1",
    companyId: "microsoft",
    companyName: "Microsoft",
    role: "SDE (Full Stack / Cloud)",
    domain: "DSA & Algorithms",
    round: "Technical Round 1",
    difficulty: "Medium",
    title: "Serialize & Deserialize a Binary Tree (Azure Cloud Sync)",
    questionText: "Design an algorithm to serialize a binary tree into a string and deserialize that string back into the original tree structure for Azure cloud state synchronization.",
    codeSnippet: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Codec:
    def serialize(self, root: TreeNode) -> str:
        pass
    def deserialize(self, data: str) -> TreeNode:
        pass`,
    sampleSolution: `class Codec:
    def serialize(self, root: TreeNode) -> str:
        vals = []
        def dfs(node):
            if not node:
                vals.append("#")
                return
            vals.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ",".join(vals)

    def deserialize(self, data: str) -> TreeNode:
        vals = iter(data.split(","))
        def dfs():
            val = next(vals)
            if val == "#":
                return None
            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node
        return dfs()`,
    keyConcepts: ["Pre-order Traversal", "DFS Recursion", "String Delimiters", "Null Marker"],
    expectedPoints: [
      "Use Pre-order DFS to encode nodes and sentinel markers (`#`) for `None` children.",
      "Use string delimiter (e.g. comma) to separate multi-digit integer values.",
      "Use an iterator during deserialization to reconstruct tree in linear time.",
    ],
    contributorBatch: "Class of 2023 Alumni @ Microsoft",
    contributorRole: "Software Engineer",
    isAlumniContributed: true,
    contributedDate: "Aug 12, 2026",
  },
  {
    id: "q-msft-2",
    companyId: "microsoft",
    companyName: "Microsoft",
    role: "SDE",
    domain: "System Design",
    round: "System Design",
    difficulty: "Hard",
    title: "Design Microsoft Teams Collaborative Document Editing",
    questionText: "Architect a real-time collaborative document editor (like Word Online / Teams Docs) allowing 50 concurrent users to edit text simultaneously without operational conflicts.",
    sampleSolution: `System Components:
1. Operational Transformation (OT) / CRDT (Conflict-Free Replicated Data Types): Resolves simultaneous character insertions/deletions.
2. WebSockets / Azure SignalR Service: Maintains persistent full-duplex connection for low-latency delta updates.
3. Event Sourcing Engine: Appends document edit operations to an immutable ledger log.
4. Snapshot Storage: Periodically saves document state snapshots in Azure Blob Storage.`,
    keyConcepts: ["CRDT / OT Algorithm", "WebSockets / SignalR", "Event Sourcing", "Document Snapshots"],
    expectedPoints: [
      "Explain conflict resolution algorithms: CRDT vs OT.",
      "Describe WebSocket connection management for multi-user channels.",
      "Detail snapshotting strategy for fast document loading.",
    ],
    contributorBatch: "Class of 2023 Alumni @ Microsoft",
    contributorRole: "Senior Software Engineer",
    isAlumniContributed: true,
    contributedDate: "Jul 19, 2026",
  },
  {
    id: "q-msft-3",
    companyId: "microsoft",
    companyName: "Microsoft",
    role: "SDE",
    domain: "Core CS Fundamentals",
    round: "Online Assessment",
    difficulty: "Medium",
    title: "Explain SOLID Principles with C# / Java Examples",
    questionText: "Define each of the 5 SOLID Object-Oriented Design principles and give a real-world software refactoring example for Single Responsibility and Dependency Inversion.",
    sampleSolution: `SOLID Breakdown:
1. Single Responsibility Principle (SRP): A class should have only one reason to change.
2. Open/Closed Principle (OCP): Software entities should be open for extension, closed for modification.
3. Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types.
4. Interface Segregation Principle (ISP): Clients should not be forced to depend on methods they don't use.
5. Dependency Inversion Principle (DIP): High-level modules should depend on abstractions (interfaces), not concrete implementations.`,
    keyConcepts: ["SRP", "OCP", "LSP", "ISP", "DIP", "Loose Coupling"],
    expectedPoints: [
      "List all 5 acronym letters accurately.",
      "Provide clean example of separating business logic from notification sending (SRP).",
      "Demonstrate interface injection / Dependency Injection container (DIP).",
    ],
    contributorBatch: "Class of 2024 Alumni @ Microsoft",
    contributorRole: "Software Engineer",
    isAlumniContributed: true,
    contributedDate: "Jun 04, 2026",
  },
  {
    id: "q-msft-4",
    companyId: "microsoft",
    companyName: "Microsoft",
    role: "SDE",
    domain: "SQL & Databases",
    round: "Technical Round 2",
    difficulty: "Medium",
    title: "SQL Index Types: Clustered vs Non-Clustered Indexes",
    questionText: "Explain how SQL B-Tree indexes work. Compare Clustered vs Non-Clustered indexes in SQL Server / Azure SQL and when indexing slows down writes.",
    sampleSolution: `1. Clustered Index:
- Dictates physical order of data rows on disk. Only ONE clustered index per table (typically Primary Key).
- Leaf nodes contain actual data rows.

2. Non-Clustered Index:
- Separate index structure referencing row pointers / clustered key. Can have MULTIPLE non-clustered indexes.
- Leaf nodes contain index keys + pointers to data.

3. Write Overhead:
- Every INSERT/UPDATE/DELETE requires updating B-Tree nodes, causing page splits and write overhead if over-indexed.`,
    keyConcepts: ["B-Tree Indexing", "Clustered Physical Order", "Non-Clustered Pointer Lookup", "Page Splits"],
    expectedPoints: [
      "Highlight that clustered index dictates physical row ordering.",
      "Explain non-clustered index as an auxiliary lookup table.",
      "Discuss index maintenance trade-off during high INSERT/UPDATE workloads.",
    ],
    contributorBatch: "Class of 2024 Alumni @ Microsoft",
    contributorRole: "Software Engineer",
    isAlumniContributed: true,
    contributedDate: "Jul 11, 2026",
  },
  {
    id: "q-msft-5",
    companyId: "microsoft",
    companyName: "Microsoft",
    role: "SDE",
    domain: "HR & Behavioral",
    round: "HR & Behavioral",
    difficulty: "Easy",
    title: "Microsoft Culture: Growth Mindset & Learning From Failure",
    questionText: "Describe a project or technical attempt that failed or didn't meet initial targets. What did you learn and how did you apply that Growth Mindset?",
    sampleSolution: `Key Points:
- Microsoft places 'Growth Mindset' at the center of company culture.
- Acknowledge mistake openly (e.g. selecting an unscalable database without load testing).
- Outline immediate corrective steps taken.
- Share long-term technical takeaway applied to subsequent projects.`,
    keyConcepts: ["Growth Mindset", "Ownership", "Post-Mortem Analysis", "Continuous Learning"],
    expectedPoints: [
      "Demonstrate honesty and self-awareness.",
      "Explain root cause analysis without shifting blame.",
      "Connect outcome to Satya Nadella's 'Learn-It-All' culture.",
    ],
    contributorBatch: "Class of 2024 Alumni @ Microsoft",
    contributorRole: "Software Engineer",
    isAlumniContributed: true,
    contributedDate: "May 29, 2026",
  },

  // ===================== JPMORGAN =====================
  {
    id: "q-jpm-1",
    companyId: "jpmorgan",
    companyName: "JPMorgan Chase",
    role: "Software Engineer (SEP)",
    domain: "DSA & Algorithms",
    round: "Technical Round 1",
    difficulty: "Medium",
    title: "Transaction Reconciler (Subarray Sum Equals K)",
    questionText: "Given an array of financial transaction amounts `nums` (positive and negative) and a target amount `k`, return the total number of continuous subsegment transactions that sum exactly to `k`.",
    codeSnippet: `def subarray_sum(nums: list[int], k: int) -> int:
    pass`,
    sampleSolution: `def subarray_sum(nums: list[int], k: int) -> int:
    prefix_counts = {0: 1}
    curr_sum = 0
    count = 0
    for num in nums:
        curr_sum += num
        if (curr_sum - k) in prefix_counts:
            count += prefix_counts[curr_sum - k]
        prefix_counts[curr_sum] = prefix_counts.get(curr_sum, 0) + 1
    return count`,
    keyConcepts: ["Prefix Sum", "Hash Map Caching", "O(N) Time Complexity"],
    expectedPoints: [
      "Use Hash Map to store frequency of prefix sums encountered.",
      "Check if `curr_sum - k` exists in prefix map to find matching subsegments.",
      "Achieve O(N) time and O(N) space instead of O(N^2) brute force.",
    ],
    contributorBatch: "Class of 2024 Alumni @ JPMorgan Chase",
    contributorRole: "Software Engineer",
    isAlumniContributed: true,
    contributedDate: "Aug 01, 2026",
  },
  {
    id: "q-jpm-2",
    companyId: "jpmorgan",
    companyName: "JPMorgan Chase",
    role: "Software Engineer",
    domain: "SQL & Databases",
    round: "Technical Round 2",
    difficulty: "Medium",
    title: "Financial Ledger ACID Properties & Transaction Isolation",
    questionText: "Explain ACID properties in banking databases. Compare `READ COMMITTED`, `REPEATABLE READ`, and `SERIALIZABLE` isolation levels and explain Dirty Reads vs Phantom Reads.",
    sampleSolution: `1. ACID Properties:
- Atomicity: All or nothing execution of transaction batch.
- Consistency: Database moves from one valid state to another.
- Isolation: Concurrent transactions do not interfere with each other.
- Durability: Committed transactions persist even during power failure.

2. Isolation Anomaly Types:
- Dirty Read: Reading uncommitted changes of another transaction.
- Non-Repeatable Read: Re-reading same row gives different value due to another committed update.
- Phantom Read: Re-running query returns new rows inserted by another committed transaction.

3. Levels:
- READ COMMITTED: Prevents Dirty Reads.
- REPEATABLE READ: Prevents Dirty & Non-Repeatable Reads.
- SERIALIZABLE: Prevents all anomalies including Phantom Reads (uses locking/MVCC).`,
    keyConcepts: ["ACID Properties", "Dirty Read", "Phantom Read", "Transaction Isolation Levels"],
    expectedPoints: [
      "Define all 4 ACID principles clearly in banking context.",
      "Explain Dirty Read vs Phantom Read difference.",
      "Identify SERIALIZABLE as strictest isolation level.",
    ],
    contributorBatch: "Class of 2023 Alumni @ JPMorgan Chase",
    contributorRole: "Software Engineer",
    isAlumniContributed: true,
    contributedDate: "Jul 09, 2026",
  },
  {
    id: "q-jpm-3",
    companyId: "jpmorgan",
    companyName: "JPMorgan Chase",
    role: "Software Engineer",
    domain: "Core CS Fundamentals",
    round: "Online Assessment",
    difficulty: "Medium",
    title: "Java Garbage Collection Algorithms & JVM Memory Regions",
    questionText: "Explain JVM Memory structure (Heap, Stack, Metaspace, Young/Old Gen) and how Garbage Collection (G1GC / ZGC) reclaims unreferenced objects.",
    sampleSolution: `JVM Structure:
1. Heap: Stores objects and arrays. Divided into Young Generation (Eden, Survivor S0/S1) and Old Generation.
2. Stack: Stores primitive variables and method call stack frames.
3. Metaspace: Stores class metadata and method bytecodes.

Garbage Collection:
- Minor GC reclaims short-lived objects from Eden to Survivor/Old Gen.
- Major/Full GC reclaims long-lived objects from Old Gen.
- G1GC partitions heap into equal regions and prioritizes regions with most garbage (Garbage First).`,
    keyConcepts: ["Heap vs Stack", "Young vs Old Generation", "Minor GC vs Major GC", "G1GC Collector"],
    expectedPoints: [
      "Distinguish Heap memory from Stack frame execution.",
      "Explain Eden, Survivor, and Tenured (Old) generations.",
      "Describe G1GC region-based collection.",
    ],
    contributorBatch: "Class of 2024 Alumni @ JPMorgan Chase",
    contributorRole: "Software Engineer",
    isAlumniContributed: true,
    contributedDate: "Jun 14, 2026",
  },
  {
    id: "q-jpm-4",
    companyId: "jpmorgan",
    companyName: "JPMorgan Chase",
    role: "Software Engineer",
    domain: "Aptitude & Reasoning",
    round: "Online Assessment",
    difficulty: "Easy",
    title: "Probability of Stock Price Movement",
    questionText: "A stock price increases by 10% on Day 1 and decreases by 10% on Day 2. If the initial stock price is $100, what is the final price and net percentage change?",
    sampleSolution: `Calculation:
- Initial Price = $100
- Day 1 (+10%): $100 * 1.10 = $110
- Day 2 (-10%): $110 * 0.90 = $99

Net Result:
- Final Price = $99
- Net Change = -1% decrease (Loss of $1 from initial $100)`,
    keyConcepts: ["Compound Percentage", "Base Value Shift", "Quantitative Aptitude"],
    expectedPoints: [
      "Calculate step-by-step price shift.",
      "Point out common trap: +10% followed by -10% does NOT return to 0% net change.",
      "State final answer: $99 (-1%).",
    ],
    contributorBatch: "Class of 2025 Alumni @ JPMorgan Chase",
    contributorRole: "SEP Intern",
    isAlumniContributed: true,
    contributedDate: "May 20, 2026",
  },
  {
    id: "q-jpm-5",
    companyId: "jpmorgan",
    companyName: "JPMorgan Chase",
    role: "Software Engineer",
    domain: "HR & Behavioral",
    round: "HR & Behavioral",
    difficulty: "Medium",
    title: "Code For Good Hackathon Collaboration & Ethics",
    questionText: "How do you work under tight hackathon deadlines with team members from different technical backgrounds? Give an example of prioritizing tasks.",
    sampleSolution: `Key Points:
- Divide responsibilities based on individual strengths (Frontend, API Backend, Pitch Deck).
- Establish simple Git branching conventions to avoid merge conflicts.
- Focus on building Minimum Viable Product (MVP) core flow first before adding extra features.`,
    keyConcepts: ["Code For Good", "MVP Prioritization", "Cross-Functional Collaboration"],
    expectedPoints: [
      "Highlight clear task delegation.",
      "Emphasize building functional MVP under time constraint.",
      "Show empathy and clear communication.",
    ],
    contributorBatch: "Class of 2024 Alumni @ JPMorgan Chase",
    contributorRole: "Software Engineer",
    isAlumniContributed: true,
    contributedDate: "Apr 28, 2026",
  },

  // ===================== WALMART =====================
  {
    id: "q-wal-1",
    companyId: "walmart",
    companyName: "Walmart Global Tech",
    role: "Software Engineer II",
    domain: "DSA & Algorithms",
    round: "Technical Round 1",
    difficulty: "Medium",
    title: "Find K Closest Fulfillment Centers (K Closest Points to Origin)",
    questionText: "Given an array of fulfillment center coordinates `points[i] = [x, y]` and an integer `k`, return the `k` closest centers to the origin `(0, 0)` using Euclidean distance.",
    codeSnippet: `import heapq

def k_closest(points: list[list[int]], k: int) -> list[list[int]]:
    pass`,
    sampleSolution: `import heapq

def k_closest(points: list[list[int]], k: int) -> list[list[int]]:
    # Max-heap to keep k smallest distances
    max_heap = []
    for x, y in points:
        dist = -(x*x + y*y)
        if len(max_heap) < k:
            heapq.heappush(max_heap, (dist, [x, y]))
        else:
            heapq.heappushpop(max_heap, (dist, [x, y]))
    return [pt for dist, pt in max_heap]`,
    keyConcepts: ["Max-Heap Priority Queue", "Euclidean Distance Squared", "O(N log K) Time"],
    expectedPoints: [
      "Avoid floating point `sqrt()` calculation; compare `x^2 + y^2` directly.",
      "Use Max-Heap of size `k` to maintain `k` smallest elements.",
      "Achieve O(N log K) time complexity.",
    ],
    contributorBatch: "Class of 2024 Alumni @ Walmart",
    contributorRole: "Software Engineer II",
    isAlumniContributed: true,
    contributedDate: "Aug 05, 2026",
  },
  {
    id: "q-wal-2",
    companyId: "walmart",
    companyName: "Walmart Global Tech",
    role: "Software Engineer II",
    domain: "System Design",
    round: "System Design",
    difficulty: "Hard",
    title: "Design Inventory Management & Flash Sale Lock Engine",
    questionText: "Design an inventory reservation engine for Black Friday flash sales that prevents overselling items when 100,000 requests hit the checkout button concurrently.",
    sampleSolution: `Key Architecture:
1. Redis Distributed Lock / Lua Scripting: Atomically decrements item stock key using \`DECRBY\` in Redis.
2. Order Reservation Queue (Kafka): Pushes valid reservation payloads into Kafka for async DB persistence.
3. TTL Expiration Timer: Held inventory reservations expire after 10 minutes if payment is incomplete.
4. Relational Database (PostgreSQL): Final authority updated asynchronously by Kafka consumer workers.`,
    keyConcepts: ["Atomic Redis Lua Scripting", "Distributed Locks", "Kafka Queue Buffering", "Inventory TTL"],
    expectedPoints: [
      "Address overselling prevention using atomic Redis operations (`DECRBY` / Lua scripts).",
      "Decouple checkout API from SQL database using Kafka.",
      "Explain reservation TTL timeout handling.",
    ],
    contributorBatch: "Class of 2023 Alumni @ Walmart",
    contributorRole: "Software Engineer II",
    isAlumniContributed: true,
    contributedDate: "Jul 22, 2026",
  },
  {
    id: "q-wal-3",
    companyId: "walmart",
    companyName: "Walmart Global Tech",
    role: "Software Engineer II",
    domain: "SQL & Databases",
    round: "Technical Round 2",
    difficulty: "Medium",
    title: "Warehouse Inventory Turnover & Out-of-Stock Duration",
    questionText: "Write a SQL query to calculate the total out-of-stock hours for each store warehouse location in the last month.",
    sampleSolution: `SELECT store_id, 
       SUM(EXTRACT(EPOCH FROM (restock_time - out_of_stock_time))/3600) AS out_of_stock_hours
FROM warehouse_stock_events
WHERE out_of_stock_time >= NOW() - INTERVAL '30 days'
GROUP BY store_id
ORDER BY out_of_stock_hours DESC;`,
    keyConcepts: ["Timestamp Interval", "EXTRACT(EPOCH)", "SUM() Aggregation"],
    expectedPoints: [
      "Use timestamp arithmetic (`restock_time - out_of_stock_time`).",
      "Convert seconds to hours using `EXTRACT(EPOCH ...)/3600`.",
      "Group by `store_id` and sort descending.",
    ],
    contributorBatch: "Class of 2024 Alumni @ Walmart",
    contributorRole: "Software Engineer",
    isAlumniContributed: true,
    contributedDate: "Jun 18, 2026",
  },
  {
    id: "q-wal-4",
    companyId: "walmart",
    companyName: "Walmart Global Tech",
    role: "Software Engineer II",
    domain: "Core CS Fundamentals",
    round: "Online Assessment",
    difficulty: "Easy",
    title: "Explain RESTful API Constraints & HTTP Status Codes",
    questionText: "List the 6 Architectural Constraints of RESTful APIs. Explain when to return HTTP 201, 400, 401, 403, 404, 429, and 503 status codes.",
    sampleSolution: `REST Constraints:
1. Client-Server Architecture
2. Statelessness
3. Cacheability
4. Uniform Interface
5. Layered System
6. Code on Demand (Optional)

HTTP Codes:
- 201 Created: Resource created successfully.
- 400 Bad Request: Client sent invalid JSON schema / parameters.
- 401 Unauthorized: Missing or invalid authentication token.
- 403 Forbidden: Authenticated user lacks permission.
- 404 Not Found: Endpoint or ID does not exist.
- 429 Too Many Requests: Rate limit exceeded.
- 503 Service Unavailable: Server overloaded or undergoing maintenance.`,
    keyConcepts: ["Statelessness", "Client-Server", "HTTP Status Codes", "REST Principles"],
    expectedPoints: [
      "List key REST constraints (Stateless, Client-Server, Cacheable).",
      "Correctly differentiate 401 (Unauthenticated) vs 403 (Unauthorized/Forbidden).",
      "Explain 429 (Rate Limit) and 201 (Created).",
    ],
    contributorBatch: "Class of 2025 Alumni @ Walmart",
    contributorRole: "Software Intern",
    isAlumniContributed: true,
    contributedDate: "May 14, 2026",
  },
  {
    id: "q-wal-5",
    companyId: "walmart",
    companyName: "Walmart Global Tech",
    role: "Software Engineer II",
    domain: "HR & Behavioral",
    round: "HR & Behavioral",
    difficulty: "Medium",
    title: "Handling High Pressure Production Incidents",
    questionText: "Tell me about a time an unexpected production bug or server downtime occurred. How did you triage the issue under pressure?",
    sampleSolution: `Key Points:
- Triage & Containment: Revert bad release / activate circuit breaker immediately.
- Communication: Notify incident manager and update status dashboard.
- Root Cause Analysis (RCA): Conduct blameless post-mortem review and add automated regression test.`,
    keyConcepts: ["Incident Triage", "Circuit Breakers", "Blameless Post-Mortem"],
    expectedPoints: [
      "Demonstrate calm problem containment first.",
      "Show clear stakeholder communication.",
      "Describe permanent preventive fix.",
    ],
    contributorBatch: "Class of 2024 Alumni @ Walmart",
    contributorRole: "Software Engineer II",
    isAlumniContributed: true,
    contributedDate: "Apr 19, 2026",
  },

  // ===================== TCS =====================
  {
    id: "q-tcs-1",
    companyId: "tcs",
    companyName: "TCS",
    role: "Digital Developer",
    domain: "DSA & Algorithms",
    round: "Technical Round 1",
    difficulty: "Easy",
    title: "Check String Anagram & Character Frequency Count",
    questionText: "Given two strings `s1` and `s2`, write a C++/Java program to determine if `s2` is an anagram of `s1` ignoring spaces and case.",
    codeSnippet: `def is_anagram(s1: str, s2: str) -> bool:
    pass`,
    sampleSolution: `from collections import Counter

def is_anagram(s1: str, s2: str) -> bool:
    clean_s1 = [c.lower() for c in s1 if c.isalnum()]
    clean_s2 = [c.lower() for c in s2 if c.isalnum()]
    return Counter(clean_s1) == Counter(clean_s2)`,
    keyConcepts: ["Hash Map / Frequency Array", "String Sanitization", "O(N) Time"],
    expectedPoints: [
      "Sanitize string by stripping whitespace and non-alphanumeric characters.",
      "Use frequency array of size 26 or Hash Map.",
      "Return True if all character frequencies match.",
    ],
    contributorBatch: "Class of 2025 Alumni @ TCS Digital",
    contributorRole: "Digital Developer",
    isAlumniContributed: true,
    contributedDate: "Jul 30, 2026",
  },
  {
    id: "q-tcs-2",
    companyId: "tcs",
    companyName: "TCS",
    role: "Digital Developer",
    domain: "SQL & Databases",
    round: "Technical Round 2",
    difficulty: "Easy",
    title: "SQL Joins: INNER, LEFT, RIGHT, FULL OUTER Comparison",
    questionText: "Explain the visual and logical difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN with employee and department table examples.",
    sampleSolution: `1. INNER JOIN: Returns only matching rows present in BOTH tables.
2. LEFT JOIN: Returns ALL rows from left table + matching rows from right table (NULL for non-matches).
3. RIGHT JOIN: Returns ALL rows from right table + matching rows from left table.
4. FULL OUTER JOIN: Returns ALL rows when there is a match in EITHER left or right table.`,
    keyConcepts: ["SQL Joins", "Venn Diagram Logic", "NULL Handling"],
    expectedPoints: [
      "Define each of the 4 Join types clearly.",
      "Explain handling of non-matching records (NULL values).",
    ],
    contributorBatch: "Class of 2025 Alumni @ TCS",
    contributorRole: "Ninja Developer",
    isAlumniContributed: true,
    contributedDate: "Jun 16, 2026",
  },
  {
    id: "q-tcs-3",
    companyId: "tcs",
    companyName: "TCS",
    role: "Digital Developer",
    domain: "Aptitude & Reasoning",
    round: "Online Assessment",
    difficulty: "Easy",
    title: "TCS NQT Numerical Aptitude: Speed, Distance & Time",
    questionText: "A train running at a speed of 72 km/hr crosses a pole in 9 seconds. What is the length of the train in meters?",
    sampleSolution: `Calculation:
- Speed in m/s = 72 * (5 / 18) = 20 m/s
- Time = 9 seconds
- Length of Train = Speed * Time = 20 m/s * 9 s = 180 meters`,
    keyConcepts: ["Km/hr to m/s Conversion (5/18)", "Distance = Speed * Time"],
    expectedPoints: [
      "Convert km/hr to m/s multiplying by 5/18.",
      "Apply Distance formula.",
      "Final Answer: 180 meters.",
    ],
    contributorBatch: "Class of 2025 Alumni @ TCS",
    contributorRole: "Digital Developer",
    isAlumniContributed: true,
    contributedDate: "May 25, 2026",
  },
  {
    id: "q-tcs-4",
    companyId: "tcs",
    companyName: "TCS",
    role: "Digital Developer",
    domain: "Core CS Fundamentals",
    round: "Technical Round 1",
    difficulty: "Easy",
    title: "SDLC Models: Waterfall vs Agile Methodology",
    questionText: "Compare Waterfall and Agile software development models. Why do modern IT teams prefer Agile for client projects?",
    sampleSolution: `1. Waterfall: Linear sequential phases (Requirements -> Design -> Code -> Test -> Deploy). Rigid, difficult to modify requirements later.
2. Agile: Iterative sprint cycles (2-4 weeks). Continuous integration, frequent client feedback, and adaptable scope.`,
    keyConcepts: ["Waterfall Sequential", "Agile Sprints", "Continuous Feedback"],
    expectedPoints: [
      "Define sequential phases of Waterfall.",
      "Explain iterative sprint cycles in Agile.",
      "Highlight client adaptability in Agile.",
    ],
    contributorBatch: "Class of 2024 Alumni @ TCS",
    contributorRole: "System Engineer",
    isAlumniContributed: true,
    contributedDate: "Apr 11, 2026",
  },
  {
    id: "q-tcs-5",
    companyId: "tcs",
    companyName: "TCS",
    role: "Digital Developer",
    domain: "HR & Behavioral",
    round: "HR & Behavioral",
    difficulty: "Easy",
    title: "Flexibility & Willingness to Relocate / Shift Work",
    questionText: "Are you comfortable working in night shifts or relocating to different client project locations based on business needs?",
    sampleSolution: `Key Points:
- Express positive enthusiasm and flexibility for learning opportunities.
- Highlight adaptability to new technologies and client environments.`,
    keyConcepts: ["Flexibility", "Adaptability", "Client Readiness"],
    expectedPoints: [
      "Show willingness and positive attitude towards business travel/relocation.",
      "Demonstrate enthusiasm for learning new tech stacks.",
    ],
    contributorBatch: "Class of 2025 Alumni @ TCS",
    contributorRole: "Ninja Developer",
    isAlumniContributed: true,
    contributedDate: "Mar 19, 2026",
  },

  // ===================== INFOSYS =====================
  {
    id: "q-inf-1",
    companyId: "infosys",
    companyName: "Infosys",
    role: "Specialist Programmer (SP)",
    domain: "DSA & Algorithms",
    round: "Technical Round 1",
    difficulty: "Hard",
    title: "HackWithInfy: Coin Change Minimum Coins (Dynamic Programming)",
    questionText: "Given an array of coin denominations `coins` and a total amount `amount`, compute the fewest number of coins needed to make up that amount using Dynamic Programming.",
    codeSnippet: `def coin_change(coins: list[int], amount: int) -> int:
    pass`,
    sampleSolution: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
    keyConcepts: ["Bottom-up DP", "Unbounded Knapsack", "O(N * Amount)"],
    expectedPoints: [
      "Initialize DP array of size `amount + 1` with infinity.",
      "Set base case `dp[0] = 0`.",
      "Iterate bottom-up and update `dp[x] = min(dp[x], dp[x - coin] + 1)`.",
    ],
    contributorBatch: "Class of 2024 Alumni @ Infosys SP",
    contributorRole: "Specialist Programmer",
    isAlumniContributed: true,
    contributedDate: "Aug 08, 2026",
  },
  {
    id: "q-inf-2",
    companyId: "infosys",
    companyName: "Infosys",
    role: "Digital Specialist Engineer",
    domain: "Core CS Fundamentals",
    round: "Technical Round 2",
    difficulty: "Medium",
    title: "Java Exception Handling: Final, Finally, and Finalize",
    questionText: "Compare `final`, `finally`, and `finalize()` in Java with clean code examples.",
    sampleSolution: `1. final: Keyword used to declare constants (unmodifiable variables), prevent method overriding, or prevent class inheritance.
2. finally: Block following try-catch that ALWAYS executes (used for closing DB connections / file streams).
3. finalize(): Deprecated Object method invoked by Garbage Collector before reclaiming memory.`,
    keyConcepts: ["final Keyword", "finally Block", "finalize() GC Method"],
    expectedPoints: [
      "Explain `final` for variables, methods, and classes.",
      "Explain `finally` for resource cleanup execution.",
      "Note deprecation of `finalize()`.",
    ],
    contributorBatch: "Class of 2024 Alumni @ Infosys",
    contributorRole: "DSE Engineer",
    isAlumniContributed: true,
    contributedDate: "Jul 01, 2026",
  },
  {
    id: "q-inf-3",
    companyId: "infosys",
    companyName: "Infosys",
    role: "Digital Specialist Engineer",
    domain: "SQL & Databases",
    round: "Technical Round 1",
    difficulty: "Medium",
    title: "Find Second Highest Salary (Without TOP/LIMIT)",
    questionText: "Write a standard SQL query to find the 2nd highest salary from an `employees` table without using `LIMIT` or `TOP` keywords.",
    sampleSolution: `SELECT MAX(salary) AS SecondHighestSalary
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);`,
    keyConcepts: ["Subquery", "MAX() Aggregation", "Nested Filter"],
    expectedPoints: [
      "Use inner subquery to find absolute MAX salary.",
      "Filter `salary < (MAX salary)` in outer query and select `MAX()` again.",
    ],
    contributorBatch: "Class of 2024 Alumni @ Infosys",
    contributorRole: "DSE Engineer",
    isAlumniContributed: true,
    contributedDate: "Jun 09, 2026",
  },
  {
    id: "q-inf-4",
    companyId: "infosys",
    companyName: "Infosys",
    role: "Systems Engineer",
    domain: "Aptitude & Reasoning",
    round: "Online Assessment",
    difficulty: "Easy",
    title: "Logical Reasoning: Syllogisms & Venn Diagrams",
    questionText: "Statements: All cars are vehicles. All vehicles have wheels. Conclusion I: All cars have wheels. Conclusion II: Some wheels are cars. Evaluate conclusions.",
    sampleSolution: `Evaluation:
- Statement 1: Cars ⊂ Vehicles
- Statement 2: Vehicles ⊂ Wheels
- Therefore: Cars ⊂ Vehicles ⊂ Wheels.
- Conclusion I is TRUE (All cars have wheels).
- Conclusion II is TRUE (Some wheels belong to cars).
- Answer: Both Conclusion I and II follow.`,
    keyConcepts: ["Syllogisms", "Venn Euler Diagrams", "Logical Deduction"],
    expectedPoints: [
      "Construct subset relations.",
      "Verify validity of both conclusions.",
    ],
    contributorBatch: "Class of 2025 Alumni @ Infosys",
    contributorRole: "Systems Engineer",
    isAlumniContributed: true,
    contributedDate: "May 03, 2026",
  },
  {
    id: "q-inf-5",
    companyId: "infosys",
    companyName: "Infosys",
    role: "Specialist Programmer",
    domain: "HR & Behavioral",
    round: "HR & Behavioral",
    difficulty: "Easy",
    title: "Handling Team Conflicts During Project Delivery",
    questionText: "How do you handle a situation where a teammate is not completing their assigned module on time?",
    sampleSolution: `Key Points:
- Reach out privately to understand blockers (technical difficulties, personal emergency).
- Offer technical assistance or pair program to clear bottlenecks.
- Inform team lead transparently if timeline requires reallocation.`,
    keyConcepts: ["Empathy", "Proactive Assistance", "Transparent Communication"],
    expectedPoints: [
      "Emphasize private constructive dialogue.",
      "Show willingness to help clear technical bottlenecks.",
    ],
    contributorBatch: "Class of 2024 Alumni @ Infosys",
    contributorRole: "Specialist Programmer",
    isAlumniContributed: true,
    contributedDate: "Apr 07, 2026",
  },
];

// LocalStorage Persistence Helper Functions
const STORAGE_KEY = "campus_connect_contributed_questions";

export function getStoredQuestions(): InterviewQuestion[] {
  if (typeof window === "undefined") return INITIAL_QUESTIONS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return INITIAL_QUESTIONS;
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_QUESTIONS;
  } catch (e) {
    return INITIAL_QUESTIONS;
  }
}

export function saveQuestion(newQuestion: InterviewQuestion): InterviewQuestion[] {
  const current = getStoredQuestions();
  const updated = [newQuestion, ...current];
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save question to localStorage", e);
    }
  }
  return updated;
}

export function getQuestionsForCompany(companyId: string): InterviewQuestion[] {
  const all = getStoredQuestions();
  return all.filter((q) => q.companyId.toLowerCase() === companyId.toLowerCase());
}

export function getCompanyById(companyId: string): Company | undefined {
  return COMPANIES.find((c) => c.id.toLowerCase() === companyId.toLowerCase());
}
