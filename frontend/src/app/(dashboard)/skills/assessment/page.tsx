"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Skill } from "@/types";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface TopicAssessment {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  description: string;
  timeLimitMinutes: number;
  questions: Question[];
}

const ASSESSMENT_TOPICS: TopicAssessment[] = [
  {
    id: "js",
    name: "JavaScript Core & Event Loop",
    category: "Frontend & Core",
    icon: "javascript",
    color: "#f7df1e",
    description: "Closures, Event Loop microtasks vs macrotasks, coercion, debounce/throttle, and async patterns.",
    timeLimitMinutes: 5,
    questions: [
      {
        id: 1,
        question: "What is the output of typeof NaN and NaN === NaN in JavaScript?",
        options: [
          "'number' and false",
          "'undefined' and true",
          "'NaN' and true",
          "'object' and false",
        ],
        correctIndex: 0,
        explanation: "In JavaScript, typeof NaN is 'number'. NaN is never equal to any value, including itself, so NaN === NaN evaluates to false.",
      },
      {
        id: 2,
        question: "How does the JavaScript Event Loop prioritize Promise callbacks vs setTimeout callbacks?",
        options: [
          "Promise callbacks execute in the Microtask Queue (higher priority) before the Macrotask Queue (setTimeout)",
          "setTimeout callbacks execute first because they are native timer events",
          "Both queues execute synchronously on the Call Stack",
          "Promise callbacks are executed by background V8 worker threads",
        ],
        correctIndex: 0,
        explanation: "Microtasks (Promises, process.nextTick) are drained completely right after the current execution frame before picking macrotasks (setTimeout/setInterval).",
      },
      {
        id: 3,
        question: "What is a Closure in JavaScript and how is it used in production apps?",
        options: [
          "A function bundled with references to its outer lexical environment, preserving variables even after outer execution ends",
          "A mechanism to forcibly terminate asynchronous event loops",
          "An ES6 syntax extension for class properties",
          "A wrapper for handling try/catch block exceptions",
        ],
        correctIndex: 0,
        explanation: "Closures allow inner functions to retain access to outer scope variables. Useful for data privacy, currying, and memoization.",
      },
      {
        id: 4,
        question: "What does [1, 2, 3] + [4, 5, 6] evaluate to in JavaScript?",
        options: [
          "'1,2,34,5,6'",
          "[1, 2, 3, 4, 5, 6]",
          "21",
          "TypeError",
        ],
        correctIndex: 0,
        explanation: "The + operator coerces both arrays into string primitives ('1,2,3' + '4,5,6'), concatenating them into '1,2,34,5,6'.",
      },
      {
        id: 5,
        question: "What is the main difference between debounce and throttle functions in UI performance optimization?",
        options: [
          "Debounce delays execution until N ms after the last call; Throttle enforces maximum 1 execution per N ms interval",
          "Throttle cancels previous pending calls; Debounce executes immediately on initial trigger",
          "Debounce uses web workers; Throttle runs on main UI thread",
          "They are identical functions in Lodash",
        ],
        correctIndex: 0,
        explanation: "Debounce is optimal for search input typing (waits for pause). Throttle is optimal for scroll/resize listeners (limits execution rate).",
      },
    ],
  },
  {
    id: "react",
    name: "React & Next.js Ecosystem",
    category: "Frontend",
    icon: "code",
    color: "#61dafb",
    description: "Fiber reconciliation, RSC server components, useCallback memoization, and Server Actions.",
    timeLimitMinutes: 5,
    questions: [
      {
        id: 1,
        question: "Why should React key props avoid using array indices when rendering dynamic lists?",
        options: [
          "Using array indices as keys can cause subtle component state bugs and re-render glitches when list order changes",
          "React throws a fatal runtime compilation error if an array index key is passed",
          "Array index keys consume exponential memory in Fiber reconciliation",
          "Keys must always be UUID v4 strings",
        ],
        correctIndex: 0,
        explanation: "React relies on keys to track item identity. When items reorder or delete, index keys cause React to incorrectly reuse component state.",
      },
      {
        id: 2,
        question: "In Next.js App Router (v13+), what is the default rendering model for components in the app/ directory?",
        options: [
          "React Server Components (RSC)",
          "Client-Side Rendered (CSR) Components",
          "Static HTML Files with jQuery",
          "Single Page Application Client Bundles",
        ],
        correctIndex: 0,
        explanation: "App Router components default to React Server Components (RSC), reducing client JavaScript bundle size and enabling direct server access.",
      },
      {
        id: 3,
        question: "How does React's useCallback hook optimize component performance?",
        options: [
          "It returns a memoized function instance between renders to prevent unnecessary re-creations when passed to memoized children",
          "It automatically moves heavy calculations to a Web Worker thread",
          "It replaces useEffect for fetching REST API endpoints",
          "It caches HTTP responses in browser memory",
        ],
        correctIndex: 0,
        explanation: "useCallback caches function reference across re-renders unless dependency array values change, preserving child memoization.",
      },
      {
        id: 4,
        question: "What happens during React Virtual DOM Reconciliation?",
        options: [
          "React compares the new Virtual DOM tree against the previous tree using an O(N) heuristic to update only modified real DOM nodes",
          "React recompiles JS code into WebAssembly binaries",
          "React replaces the entire document.body HTML string on every state change",
          "React bypasses the browser DOM API entirely",
        ],
        correctIndex: 0,
        explanation: "React uses a fiber diffing algorithm to calculate minimal DOM operations required to update UI to match current state.",
      },
      {
        id: 5,
        question: "In Next.js, what is the primary purpose of Server Actions ('use server')?",
        options: [
          "To define asynchronous server-side functions executed securely on the server directly from client UI forms or buttons",
          "To handle client-side mouse hover event listeners",
          "To render CSS keyframe animations",
          "To inject analytics scripts",
        ],
        correctIndex: 0,
        explanation: "Server Actions allow client components to invoke server-side logic directly without manually creating separate API route boilerplate.",
      },
    ],
  },
  {
    id: "node",
    name: "Node.js & Backend Architecture",
    category: "Backend",
    icon: "dns",
    color: "#68a063",
    description: "Event Loop phases, libuv thread pool, streams backpressure, and cluster process scaling.",
    timeLimitMinutes: 5,
    questions: [
      {
        id: 1,
        question: "How does Node.js handle high concurrency I/O operations with a single-threaded Event Loop?",
        options: [
          "By offloading blocking I/O operations (filesystem, network, crypto) to the C++ libuv thread pool",
          "By spawning a brand new OS process for every incoming HTTP request",
          "By using multi-threaded JavaScript execution on the main thread",
          "By compiling JavaScript into multi-threaded Java bytecode",
        ],
        correctIndex: 0,
        explanation: "Node.js delegates asynchronous I/O tasks to libuv background thread pool or OS kernel, invoking JS callbacks upon completion.",
      },
      {
        id: 2,
        question: "What is the difference between process.nextTick() and setImmediate() in Node.js?",
        options: [
          "process.nextTick executes immediately after current operation completes before event loop advances; setImmediate runs on the Check phase",
          "setImmediate runs synchronously; process.nextTick runs after 1000ms",
          "process.nextTick is deprecated in modern Node.js",
          "setImmediate runs before Promise microtasks",
        ],
        correctIndex: 0,
        explanation: "process.nextTick callbacks run at the end of the current operation before the Event Loop moves to next phase.",
      },
      {
        id: 3,
        question: "In Node.js Streams, what critical problem does Backpressure solve?",
        options: [
          "Prevents fast Writable streams or memory buffers from overflowing when Readable stream produces data faster than consumer can process",
          "Prevents database connection pool exhaustion",
          "Enforces TLS encryption on TCP sockets",
          "Automatically compresses HTTP response payloads",
        ],
        correctIndex: 0,
        explanation: "Backpressure signals data producers to pause reading when downstream consumer buffers are full, preventing RAM spikes.",
      },
      {
        id: 4,
        question: "How does the Node.js cluster module scale application throughput across multi-core server CPUs?",
        options: [
          "By forking multiple worker Node processes that share the same server IP/port via master IPC socket distribution",
          "By creating multi-threaded JS objects inside a single V8 instance",
          "By routing requests solely through external Nginx proxies",
          "By expanding V8 engine heap size automatically",
        ],
        correctIndex: 0,
        explanation: "The cluster module forks N worker processes matching CPU core count, allowing Node to utilize all server cores.",
      },
      {
        id: 5,
        question: "What vulnerability does rate limiting middleware (express-rate-limit) protect against?",
        options: [
          "Denial of Service (DoS) and Brute-Force API spamming",
          "SQL Injection attacks",
          "Cross-Site Scripting (XSS)",
          "Cross-Origin Resource Sharing (CORS) blocks",
        ],
        correctIndex: 0,
        explanation: "Rate limiting caps the number of requests an IP can send within a window, defending APIs from automated abuse.",
      },
    ],
  },
  {
    id: "python",
    name: "Python & FastAPI Microservices",
    category: "Backend",
    icon: "terminal",
    color: "#3776ab",
    description: "Pydantic validation, async def path handlers, Python GIL, and lazy generator evaluation.",
    timeLimitMinutes: 5,
    questions: [
      {
        id: 1,
        question: "In Python FastAPI, how does Pydantic provide type validation and request body parsing?",
        options: [
          "Pydantic schemas enforce type hints at runtime, automatically parsing JSON requests into validated Python objects",
          "Pydantic compiles Python code into C extensions at build time",
          "Pydantic requires manual SQL queries to parse JSON strings",
          "Pydantic is an async database ORM like SQLAlchemy",
        ],
        correctIndex: 0,
        explanation: "FastAPI uses Pydantic model type annotations to parse, validate, and document incoming JSON payloads automatically.",
      },
      {
        id: 2,
        question: "How does async def in FastAPI differ from standard def route functions?",
        options: [
          "async def runs directly on the main asyncio event loop; standard def runs inside an external Starlette thread pool",
          "def operations cannot return JSON responses",
          "async def bypasses ASGI server specification",
          "def operations are always faster than async def",
        ],
        correctIndex: 0,
        explanation: "FastAPI runs synchronous def routes in a background thread pool to prevent blocking the main asyncio loop.",
      },
      {
        id: 3,
        question: "What is Python's Global Interpreter Lock (GIL) and how does it impact execution?",
        options: [
          "A mutex that allows only one thread to execute CPython bytecode at a time, limiting CPU-bound multi-threading",
          "A memory manager for garbage collection",
          "A security sandbox for untrusted code",
          "A compiler optimization for loop unrolling",
        ],
        correctIndex: 0,
        explanation: "The GIL ensures thread safety in CPython, requiring multiprocessing or async I/O to achieve CPU-bound parallel execution.",
      },
      {
        id: 4,
        question: "In FastAPI, what is a key architectural benefit of the Dependency Injection system (Depends())?",
        options: [
          "Reusable shared logic (auth, DB sessions, rate limits) with clean lifecycle management and easy testing mocks",
          "Automatic creation of database migration scripts",
          "Network traffic encryption",
          "Faster string concatenation",
        ],
        correctIndex: 0,
        explanation: "FastAPI's Depends system lets you inject database sessions and authentication checks across endpoints cleanly.",
      },
      {
        id: 5,
        question: "How do Python Generators (yield) optimize memory when processing large datasets?",
        options: [
          "Generators evaluate items lazily one at a time on demand rather than loading the entire list into RAM",
          "Generators compress lists into binary byte arrays",
          "Generators store data in Redis cache automatically",
          "Generators execute code in parallel across all GPU cores",
        ],
        correctIndex: 0,
        explanation: "Yielding items lazily ensures memory footprint remains constant (O(1)) even when processing gigabytes of data.",
      },
    ],
  },
  {
    id: "docker",
    name: "Docker & Containerization",
    category: "DevOps & Cloud",
    icon: "widgets",
    color: "#2496ed",
    description: "Kernel process isolation, multi-stage builds, container networking, and HEALTHCHECK directives.",
    timeLimitMinutes: 5,
    questions: [
      {
        id: 1,
        question: "What is the fundamental architectural difference between Docker Containers and Virtual Machines?",
        options: [
          "Containers share host OS kernel and isolate processes; VMs run full guest OS on top of a hypervisor",
          "Containers require dedicated virtualized CPUs; VMs run inside Docker Engine",
          "VMs load faster than Containers",
          "Containers cannot run Linux binaries",
        ],
        correctIndex: 0,
        explanation: "Containers are lightweight OS process isolations sharing host kernel, eliminating hypervisor OS overhead.",
      },
      {
        id: 2,
        question: "Why are Multi-Stage Docker Builds recommended for production microservices?",
        options: [
          "They drastically shrink final image size by separating build tools/compilers from final runtime image",
          "They build Docker images in parallel across multiple cloud regions",
          "They automatically test code coverage before deployment",
          "They encrypt container layer filesystem",
        ],
        correctIndex: 0,
        explanation: "Multi-stage builds compile binaries in build stages and copy only final artifacts into lean runtime base images.",
      },
      {
        id: 3,
        question: "What is the primary purpose of the .dockerignore file in a repository?",
        options: [
          "Excludes non-essential files (node_modules, .git, .env) from build context, speeding up builds and preventing secret leaks",
          "Ignores failed Docker container runtime errors",
          "Prevents Docker Engine from starting automatically",
          "Configures container CPU allocation limits",
        ],
        correctIndex: 0,
        explanation: ".dockerignore prevents sending bloated directories to Docker daemon, improving build performance and security.",
      },
      {
        id: 4,
        question: "In Docker Networking, how do containers on the same user-defined bridge network communicate?",
        options: [
          "By container service names using built-in Docker DNS resolution",
          "By public internet IP addresses",
          "By SSH tunnel keys",
          "Containers cannot communicate over bridge networks",
        ],
        correctIndex: 0,
        explanation: "User-defined bridge networks include embedded DNS that maps container names (e.g. 'web' connecting to 'db') automatically.",
      },
      {
        id: 5,
        question: "What does the Docker HEALTHCHECK instruction do inside a container?",
        options: [
          "Periodically runs a command (e.g. curl localhost:8000/health) inside container to monitor readiness status",
          "Scans Dockerfile for security vulnerabilities",
          "Measures host machine RAM usage",
          "Restarts container whenever CPU reaches 100%",
        ],
        correctIndex: 0,
        explanation: "HEALTHCHECK tests container health status, allowing orchestrators (Kubernetes/Docker Swarm) to manage pod lifecycles.",
      },
    ],
  },
  {
    id: "redis",
    name: "Redis & Distributed Caching",
    category: "Database & In-Memory",
    icon: "memory",
    color: "#dc382d",
    description: "In-memory data structures, Cache-Aside pattern, LRU eviction policies, and Pub/Sub messaging.",
    timeLimitMinutes: 5,
    questions: [
      {
        id: 1,
        question: "Why is Redis extremely fast for in-memory caching operations?",
        options: [
          "Data is stored in RAM with a single-threaded non-blocking event loop avoiding lock contention",
          "Redis compiles Python scripts into C binary code",
          "Redis reads data directly from SSD NVMe hardware",
          "Redis uses multi-threaded relational tables",
        ],
        correctIndex: 0,
        explanation: "In-memory RAM storage coupled with non-blocking event loop enables Redis to serve 100k+ QPS with sub-ms latency.",
      },
      {
        id: 2,
        question: "What is the difference between Cache-Aside (Lazy Loading) and Write-Through caching patterns?",
        options: [
          "Cache-Aside reads from cache first and populates on miss; Write-Through updates DB & Cache simultaneously on write",
          "Cache-Aside writes to cache only; Write-Through deletes cache on write",
          "Write-Through is used for offline mobile apps only",
          "They are identical cache invalidation algorithms",
        ],
        correctIndex: 0,
        explanation: "Cache-Aside loads cache on demand after missing. Write-Through updates cache inline during database writes.",
      },
      {
        id: 3,
        question: "What Redis eviction policy should be used when configuring Redis as an API response cache?",
        options: [
          "allkeys-lru — evicts least recently used keys when memory limit is reached",
          "noeviction — throws error when memory limit is reached",
          "volatile-ttl — deletes random keys regardless of usage",
          "allkeys-random — deletes newest keys first",
        ],
        correctIndex: 0,
        explanation: "allkeys-lru automatically discards cold unused cache items to free up space for active hot queries.",
      },
      {
        id: 4,
        question: "What is Redis Pub/Sub used for in real-time system design?",
        options: [
          "Lightweight messaging system for broadcasting real-time events to multiple subscribed clients or microservices",
          "Long-term relational storage for financial transactions",
          "Encrypting user passwords in database",
          "Compressing PDF document uploads",
        ],
        correctIndex: 0,
        explanation: "Redis Pub/Sub enables instant event broadcasting across microservices and WebSocket cluster nodes.",
      },
      {
        id: 5,
        question: "How does Redis handle data persistence across container or server restarts?",
        options: [
          "RDB snapshots (point-in-time disk dumps) and AOF (Append-Only File write logs)",
          "Syncing data to Google Cloud Drive",
          "Storing keys in browser LocalStorage",
          "Redis data is strictly lost on restart and cannot persist",
        ],
        correctIndex: 0,
        explanation: "Redis provides RDB (snapshot dumps) and AOF (append log of writes) for high-performance durability.",
      },
    ],
  },
  {
    id: "sql",
    name: "SQL & Database Engineering",
    category: "Database",
    icon: "database",
    color: "#336791",
    description: "B-Tree indexes, WHERE vs HAVING, ACID transaction isolation, and deadlock detection.",
    timeLimitMinutes: 5,
    questions: [
      {
        id: 1,
        question: "What is the main difference between WHERE and HAVING clauses in SQL queries?",
        options: [
          "WHERE filters individual rows before aggregation; HAVING filters aggregated group results after GROUP BY",
          "HAVING filters rows before join; WHERE filters after join",
          "WHERE works only on text columns; HAVING works on numbers",
          "They are completely interchangeable synonyms in SQL",
        ],
        correctIndex: 0,
        explanation: "WHERE filters raw table rows prior to grouping. HAVING filters aggregated data produced by GROUP BY (e.g. HAVING COUNT(*) > 5).",
      },
      {
        id: 2,
        question: "How does a B-Tree Database Index improve SQL SELECT query performance?",
        options: [
          "Reduces lookup complexity from full table scan O(N) to balanced logarithmic search O(log N)",
          "Compresses text columns into 8-bit integers",
          "Stores table data in GPU memory",
          "Prevents duplicate primary keys",
        ],
        correctIndex: 0,
        explanation: "B-Tree indexes maintain sorted tree structures, allowing DBMS to locate rows in logarithmic O(log N) time.",
      },
      {
        id: 3,
        question: "What does the ACID properties acronym stand for in Relational Database Management Systems?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Authentication, Concurrency, Indexing, Decoupling",
          "Allocation, Compression, Integration, Duplication",
          "Asynchronous, Cached, Idempotent, Distributed",
        ],
        correctIndex: 0,
        explanation: "ACID guarantees database transaction integrity: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrency), Durability (persisted).",
      },
      {
        id: 4,
        question: "What is Database Normalization (1NF, 2NF, 3NF) and why is it applied?",
        options: [
          "Structuring tables to eliminate data redundancy and prevent insertion/update/deletion anomalies",
          "Converting SQL database to NoSQL JSON document store",
          "Encrypting sensitive credit card columns",
          "Merging all database tables into one single large master table",
        ],
        correctIndex: 0,
        explanation: "Normalization organizes fields and tables to minimize duplicate data and maintain relational dependencies.",
      },
      {
        id: 5,
        question: "In PostgreSQL/MySQL, what is a Database Deadlock during concurrent transactions?",
        options: [
          "Two or more transactions mutually wait for locks held by each other, blocking further progress until DBMS aborts one",
          "Server running out of hard drive storage space",
          "Database password expiration error",
          "Corrupted index header file",
        ],
        correctIndex: 0,
        explanation: "Deadlocks occur when transaction A waits for resource held by B, while B waits for resource held by A. DBMS deadlock detector breaks the cycle.",
      },
    ],
  },
  {
    id: "system-design",
    name: "System Design & Distributed Architecture",
    category: "Architecture",
    icon: "architecture",
    color: "#a855f7",
    description: "CAP Theorem, CDN edge caching, vertical vs horizontal scaling, and Circuit Breaker resilience.",
    timeLimitMinutes: 5,
    questions: [
      {
        id: 1,
        question: "In Distributed Systems Design, what trade-off is enforced by the CAP Theorem during network partitions?",
        options: [
          "Under network partition (P), a system must choose between Consistency (C) or Availability (A)",
          "CPU speed vs RAM allocation",
          "Frontend bundle size vs HTTP load speed",
          "Encryption strength vs network latency",
        ],
        correctIndex: 0,
        explanation: "CAP theorem proves that when network partitions occur, a distributed database must pick Consistency (CP) or Availability (AP).",
      },
      {
        id: 2,
        question: "How does a Content Delivery Network (CDN) reduce global web application latency?",
        options: [
          "Caching static assets (JS, CSS, media) on edge server nodes geographically closer to users",
          "Compressing database SQL query strings",
          "Running backend Python API code on user browser",
          "Translating web pages into multiple languages",
        ],
        correctIndex: 0,
        explanation: "CDNs cache static content at edge Points of Presence worldwide, serving users with minimal network hop latency.",
      },
      {
        id: 3,
        question: "What is the difference between Vertical Scaling (Scale Up) and Horizontal Scaling (Scale Out)?",
        options: [
          "Vertical adding CPU/RAM to single server; Horizontal adding more server instances behind a Load Balancer",
          "Horizontal increasing disk space; Vertical upgrading network bandwidth",
          "Vertical scaling is used for microservices only",
          "Horizontal scaling removes database replication",
        ],
        correctIndex: 0,
        explanation: "Horizontal scaling adds commodity servers to distribute traffic load, providing high availability and elasticity.",
      },
      {
        id: 4,
        question: "In Microservices Architecture, what is the primary purpose of the Circuit Breaker Pattern?",
        options: [
          "Prevents cascading failures by halting calls to a failing downstream service and returning fallback responses",
          "Automatically restarts crashed Docker containers",
          "Encrypts HTTPS TLS certificates",
          "Limits database row insertions",
        ],
        correctIndex: 0,
        explanation: "Circuit breakers isolate failing microservices, preventing thread pool exhaustion across dependent upstream services.",
      },
      {
        id: 5,
        question: "What is an Idempotent API operation in RESTful web services?",
        options: [
          "An operation that produces the exact same server state result regardless of how many times it is executed (GET, PUT, DELETE)",
          "An API endpoint that executes in under 10ms",
          "A POST endpoint that creates a new database row on every call",
          "An endpoint requiring OAuth2 authentication",
        ],
        correctIndex: 0,
        explanation: "Idempotent HTTP methods (GET, PUT, DELETE) produce identical side-effects regardless of how many times repeated.",
      },
    ],
  },
];

export default function SkillAssessmentPage() {
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<TopicAssessment | null>(null);

  // Test Execution State
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(300); // 5 mins
  const [isTestActive, setIsTestActive] = useState(false);
  const [completedReport, setCompletedReport] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.getSkills().then(setUserSkills);
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    if (!isTestActive || completedReport) return;

    if (timeLeftSeconds <= 0) {
      handleFinalSubmission();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTestActive, timeLeftSeconds, completedReport]);

  const handleStartTest = (topic: TopicAssessment) => {
    setSelectedTopic(topic);
    setCurrentStep(0);
    setAnswers({});
    setTimeLeftSeconds(topic.timeLimitMinutes * 60);
    setCompletedReport(null);
    setIsTestActive(true);
  };

  const handleFinalSubmission = async () => {
    if (!selectedTopic) return;
    setIsTestActive(false);
    setIsSubmitting(true);

    let correctCount = 0;
    selectedTopic.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / selectedTopic.questions.length) * 100);

    // Call backend API to update student Skill Matrix & Readiness Portal
    const updateRes = await api.submitAssessment(selectedTopic.name, scorePct);

    setCompletedReport({
      topicName: selectedTopic.name,
      scorePct,
      correctCount,
      totalQuestions: selectedTopic.questions.length,
      passed: scorePct >= 80,
      updateResult: updateRes,
      questions: selectedTopic.questions,
      answers,
    });
    setIsSubmitting(false);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // 1. Topic Selection Overview View
  if (!selectedTopic && !isTestActive && !completedReport) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Skill Assessment Portal</h1>
            <p className="text-body-md" style={{ color: "#464555" }}>
              Timed benchmark tests featuring 5 frequently asked interview questions from top <strong>Product-Based</strong> and <strong>Service-Based</strong> companies.
            </p>
          </div>
          <Link href="/skills" className="inline-flex items-center gap-xs text-label-md font-label-md rounded-lg" style={{ padding: "0.5rem 1rem", border: "1px solid #c7c4d8", color: "#141b2b" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
            Back to Skills Matrix
          </Link>
        </header>

        {/* User Skills Matrix Banner */}
        <section style={{ background: "linear-gradient(135deg, #ebe9ff 0%, #ffffff 100%)", border: "1px solid #c7c4d8", borderLeft: "4px solid #3525cd", borderRadius: "0.75rem", padding: "1.25rem" }}>
          <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.35rem" }}>
            Profile Benchmark Status ({userSkills.length} Active Skills)
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#464555", marginBottom: "0.75rem" }}>
            Completing an assessment test with &ge; 80% score automatically levels up your skill benchmark and updates your <strong>Readiness Portal</strong> index.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {userSkills.map((sk) => (
              <span key={sk.id} style={{ padding: "4px 10px", borderRadius: "999px", background: "#fff", border: "1px solid #c7c4d8", fontSize: "0.78rem", fontWeight: 600, color: "#3525cd" }}>
                {sk.name} (Lvl {sk.currentLevel}/{sk.targetLevel})
              </span>
            ))}
          </div>
        </section>

        {/* Skill Assessment Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
          {ASSESSMENT_TOPICS.map((topic) => (
            <div
              key={topic.id}
              style={{
                background: "#fff",
                border: "1px solid #c7c4d8",
                borderRadius: "0.75rem",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                transition: "all 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "0.5rem", background: "rgba(233,221,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "22px", color: "#3525cd" }}>
                      {topic.icon}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", background: "#f1f3ff", color: "#3525cd", textTransform: "uppercase" }}>
                    {topic.category}
                  </span>
                </div>

                <h3 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "0.35rem", fontSize: "1.05rem" }}>
                  {topic.name}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#464555", lineHeight: 1.5, marginBottom: "1rem" }}>
                  {topic.description}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.78rem", color: "#777587", marginBottom: "1rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>help</span>
                    5 Interview Questions
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>timer</span>
                    {topic.timeLimitMinutes} Mins Test
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleStartTest(topic)}
                style={{
                  width: "100%",
                  padding: "0.625rem",
                  background: "#3525cd",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "background 0.15s ease",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>play_arrow</span>
                Start Timed Test
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. Active Test View
  if (selectedTopic && isTestActive && !completedReport) {
    const q = selectedTopic.questions[currentStep];
    const isLastQuestion = currentStep === selectedTopic.questions.length - 1;

    return (
      <div style={{ maxWidth: "780px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Test Header with Live Timer */}
        <header style={{ background: "#fff", border: "1px solid #c7c4d8", borderRadius: "0.75rem", padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#3525cd", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Official Skill Assessment
            </span>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>
              {selectedTopic.name}
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              background: timeLeftSeconds < 60 ? "#fee2e2" : "#ebe9ff",
              border: `1px solid ${timeLeftSeconds < 60 ? "#fca5a5" : "#c7c4d8"}`,
              color: timeLeftSeconds < 60 ? "#dc2626" : "#3525cd",
              fontWeight: 800,
              fontSize: "1.1rem",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>timer</span>
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>
        </header>

        {/* Question Card */}
        <div style={{ background: "#fff", border: "1px solid #c7c4d8", borderRadius: "0.875rem", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          {/* Stepper Progress */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#464555" }}>
              Question {currentStep + 1} of {selectedTopic.questions.length}
            </span>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#3525cd" }}>
              {Math.round(((currentStep + 1) / selectedTopic.questions.length) * 100)}% Complete
            </span>
          </div>
          <div style={{ width: "100%", height: "6px", background: "#e9edff", borderRadius: "999px", marginBottom: "1.5rem", overflow: "hidden" }}>
            <div style={{ width: `${((currentStep + 1) / selectedTopic.questions.length) * 100}%`, height: "100%", background: "linear-gradient(90deg,#3525cd,#4f46e5)", borderRadius: "999px", transition: "width 0.3s ease" }} />
          </div>

          {/* Question Title */}
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#141b2b", marginBottom: "1.25rem", lineHeight: 1.4 }}>
            {q.question}
          </h2>

          {/* MCQ Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.75rem" }}>
            {q.options.map((optionText, idx) => {
              const isSelected = answers[currentStep] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setAnswers({ ...answers, [currentStep]: idx })}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.875rem 1rem",
                    borderRadius: "0.5rem",
                    border: `2px solid ${isSelected ? "#3525cd" : "#c7c4d8"}`,
                    background: isSelected ? "rgba(53,37,205,0.06)" : "#fff",
                    color: isSelected ? "#3525cd" : "#141b2b",
                    fontWeight: isSelected ? 600 : 400,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      border: `2px solid ${isSelected ? "#3525cd" : "#777587"}`,
                      background: isSelected ? "#3525cd" : "transparent",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{optionText}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #c7c4d8",
                borderRadius: "0.5rem",
                background: "#fff",
                color: "#464555",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: currentStep === 0 ? "not-allowed" : "pointer",
                opacity: currentStep === 0 ? 0.5 : 1,
              }}
            >
              Previous
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleFinalSubmission}
                disabled={answers[currentStep] === undefined}
                style={{
                  padding: "0.625rem 1.5rem",
                  background: answers[currentStep] !== undefined ? "#16a34a" : "#c7c4d8",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: answers[currentStep] !== undefined ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Submit Test &amp; View Report
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>check_circle</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                disabled={answers[currentStep] === undefined}
                style={{
                  padding: "0.625rem 1.5rem",
                  background: answers[currentStep] !== undefined ? "#3525cd" : "#c7c4d8",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: answers[currentStep] !== undefined ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Next Question
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. Completed Assessment Report View
  if (completedReport) {
    return (
      <div style={{ maxWidth: "840px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Report Banner Header */}
        <section
          style={{
            background: completedReport.passed ? "linear-gradient(135deg, #dcfce7 0%, #ffffff 100%)" : "linear-gradient(135deg, #fee2e2 0%, #ffffff 100%)",
            border: `1px solid ${completedReport.passed ? "#86efac" : "#fca5a5"}`,
            borderLeft: `5px solid ${completedReport.passed ? "#16a34a" : "#dc2626"}`,
            borderRadius: "0.875rem",
            padding: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: completedReport.passed ? "#15803d" : "#b91c1c", textTransform: "uppercase" }}>
              Assessment Evaluation Report
            </span>
            <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b", marginTop: "2px" }}>
              {completedReport.topicName}
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#464555", marginTop: "4px" }}>
              {completedReport.passed
                ? "🎉 Congratulations! You achieved benchmark mastery and upgraded your profile readiness level."
                : "⚠️ Benchmark Not Met (< 80%). Review question takeaways below to strengthen key concepts."}
            </p>
          </div>

          <div style={{ textAlign: "right", padding: "0.75rem 1.25rem", background: "#fff", borderRadius: "0.625rem", border: "1px solid #c7c4d8" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#777587", margin: 0 }}>Final Score</p>
            <p style={{ fontSize: "2rem", fontWeight: 800, color: completedReport.passed ? "#16a34a" : "#dc2626", margin: 0, lineHeight: 1 }}>
              {completedReport.scorePct}%
            </p>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: completedReport.passed ? "#15803d" : "#b91c1c" }}>
              {completedReport.correctCount} / {completedReport.totalQuestions} Correct
            </span>
          </div>
        </section>

        {/* Profile Sync Notification */}
        {completedReport.updateResult && (
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "0.85rem 1rem", borderRadius: "0.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "22px", color: "#16a34a" }}>sync</span>
            <div>
              <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#166534", margin: 0 }}>
                Profile &amp; Readiness Portal Updated Live!
              </p>
              <p style={{ fontSize: "0.8rem", color: "#15803d", margin: 0 }}>
                Skill <strong>{completedReport.updateResult.skillName}</strong> benchmark updated to Level {completedReport.updateResult.currentLevel} of {completedReport.updateResult.targetLevel} (Status: {completedReport.updateResult.status}).
              </p>
            </div>
          </div>
        )}

        {/* Detailed Question Review */}
        <section style={{ background: "#fff", border: "1px solid #c7c4d8", borderRadius: "0.875rem", padding: "1.5rem" }}>
          <h2 className="text-headline-md font-headline-md" style={{ color: "#141b2b", marginBottom: "1rem" }}>
            Question-by-Question Technical Review
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {completedReport.questions.map((q: Question, idx: number) => {
              const selectedIdx = completedReport.answers[idx];
              const isCorrect = selectedIdx === q.correctIndex;

              return (
                <div
                  key={q.id}
                  style={{
                    border: `1px solid ${isCorrect ? "#bbf7d0" : "#fca5a5"}`,
                    background: isCorrect ? "#f0fdf4" : "#fef2f2",
                    borderRadius: "0.625rem",
                    padding: "1rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b" }}>
                      Q{idx + 1}: {q.question}
                    </h3>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", background: isCorrect ? "#dcfce7" : "#fee2e2", color: isCorrect ? "#15803d" : "#b91c1c", flexShrink: 0 }}>
                      {isCorrect ? "Correct ✓" : "Incorrect ✗"}
                    </span>
                  </div>

                  <div style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "4px", marginBottom: "0.75rem" }}>
                    <p style={{ color: isCorrect ? "#166534" : "#991b1b", margin: 0 }}>
                      <strong>Your Answer:</strong> {selectedIdx !== undefined ? q.options[selectedIdx] : "Not answered"}
                    </p>
                    {!isCorrect && (
                      <p style={{ color: "#15803d", fontWeight: 600, margin: 0 }}>
                        <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                      </p>
                    )}
                  </div>

                  <div style={{ background: "#fff", padding: "0.75rem", borderRadius: "0.375rem", border: "1px solid #e2e8f0" }}>
                    <p style={{ fontSize: "0.82rem", color: "#334155", margin: 0, lineHeight: 1.5 }}>
                      <strong>💡 Top Company Interview Takeaway:</strong> {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTAs */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <button
            onClick={() => {
              setSelectedTopic(null);
              setCompletedReport(null);
              setIsTestActive(false);
            }}
            style={{
              padding: "0.625rem 1.25rem",
              background: "#3525cd",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Take Another Assessment
          </button>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link href="/skills/gap-analysis" className="inline-flex items-center gap-xs text-label-md font-label-md rounded-lg" style={{ padding: "0.625rem 1.25rem", border: "1px solid #c7c4d8", color: "#141b2b" }}>
              View Gap Diagnostic →
            </Link>
            <Link href="/opportunities" className="inline-flex items-center gap-xs text-label-md font-label-md text-white rounded-lg" style={{ padding: "0.625rem 1.25rem", background: "#4f46e5" }}>
              Explore Matched Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
