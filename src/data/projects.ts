export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  year: string;
  status: "PRODUCTION" | "CORE SYSTEM" | "ALGORITHM ENGINE" | "CONCEPT / IN DEVELOPMENT";
  featured: boolean;
  github?: string;
  demoUrl?: string;
  stack: string[];
  image: string;
  color?: string; // only used inside case study modal
  overview: string;
  problem: string;
  architecture: string[];
  technicalDecisions: {
    decision: string;
    rationale: string;
  }[];
  security?: string[];
  results: {
    label: string;
    value: string;
    verified: boolean;
  }[];
  interactiveDemoType?: "architecture" | "payment" | "graph" | "diff";
}

export const PROJECTS: Project[] = [
  {
    id: "sentosa",
    number: "01",
    title: "Sentosa — The Coffee Unit",
    subtitle: "Tabletop QR Ordering, Live Kitchen KDS & POS Platform",
    tagline: "High-throughput restaurant ordering with authoritative server pricing and WebSocket kitchen synchronization.",
    category: "FULL-STACK / REAL-TIME / PAYMENTS",
    year: "2024–2025",
    status: "PRODUCTION",
    featured: true,
    github: "https://github.com/TakshakSinghania/sentosa-qr-ordering",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Socket.IO",
      "Razorpay",
      "Tailwind CSS",
    ],
    image: "/images/projects/sentosa.jpg",
    color: "#6492b3",
    overview:
      "Sentosa is a full-stack, real-world restaurant QR ordering and kitchen operations platform combining tabletop QR resolution, mobile phone OTP authentication, table-specific popular recommendations ('Guests here often order…'), item customization, instant checkout, and live WebSocket kitchen ticket synchronization.",
    problem:
      "Traditional cafés face table turn bottlenecks during peak hours, waiter call delays, and high vulnerability to client-side order tampering when relying on basic client-side carts. If pricing is calculated in untrusted browser state, customers can modify quantities or unit prices before checkout.",
    architecture: [
      "Client Layer: Mobile-first React/TypeScript PWA optimized for instantaneous tabletop scans with zero app download required.",
      "Security Perimeter: 16-character cryptographic table tokens scoped per physical dining session to prevent unauthorized cross-table order tampering.",
      "Authoritative Pricing Engine: PostgreSQL + Prisma ORM recalculates subtotals, multi-group modifiers (e.g. oat milk, extra espresso shots), and 5% GST directly on the server to completely eliminate client-side price manipulation.",
      "Kitchen Dispatch: Full-duplex WebSocket dispatch via Socket.IO with room scoping and live audio alerts for kitchen display systems (KDS).",
      "Payment & Webhooks: Razorpay gateway integrated with constant-time HMAC-SHA256 signature verification and idempotent webhook processing.",
    ],
    technicalDecisions: [
      {
        decision: "Server-Authoritative Price Calculation",
        rationale:
          "Rather than trusting cart totals sent by client browsers, the backend validates every item ID against current database pricing and computes tax (5% GST) and modifiers server-side.",
      },
      {
        decision: "Room-Scoped WebSockets (Socket.IO)",
        rationale:
          "Separated staff, kitchen, and customer channels into isolated rooms, preventing customer devices from receiving kitchen dispatch events.",
      },
      {
        decision: "16-Character Cryptographic Session Tokens",
        rationale:
          "Generated securely on table QR resolution to tie orders to active dining sessions without requiring complex account creation.",
      },
    ],
    security: [
      "2-Role RBAC verified across 37 permission endpoints",
      "HMAC-SHA256 signature verification on payment webhooks",
      "Cryptographic session tokens preventing cross-table tampering",
    ],
    results: [
      { label: "Automated Test Suite", value: "63 unit & integration tests", verified: true },
      { label: "Client Price Manipulation", value: "0% permitted (server authoritative)", verified: true },
      { label: "Protected Endpoints", value: "37 RBAC verified routes", verified: true },
      { label: "Kitchen Ticket Latency", value: "<150ms WebSocket dispatch", verified: true },
    ],
    interactiveDemoType: "architecture",
  },
  {
    id: "payflow",
    number: "02",
    title: "PayFlow",
    subtitle: "Payment Lifecycle Engine & Distributed Asynchronous Queue",
    tagline: "PostgreSQL row-level locking engine with Redis BullMQ webhook delivery retries.",
    category: "BACKEND SYSTEMS / DISTRIBUTED QUEUES",
    year: "2025",
    status: "CORE SYSTEM",
    featured: true,
    github: "https://github.com/TakshakSinghania/Payflow",
    stack: [
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Docker",
    ],
    image: "/images/projects/payflow.svg",
    overview:
      "A high-reliability payment lifecycle engine and distributed webhook delivery system engineered to prevent race conditions across concurrent capture and refund requests while ensuring guaranteed asynchronous event delivery.",
    problem:
      "Payment systems frequently suffer from double-capture anomalies when two requests arrive simultaneously, state divergence between gateway webhooks and internal database states, and lost webhook notifications during third-party endpoint downtime.",
    architecture: [
      "6-State Lifecycle Machine: Strict state transitions (CREATED, AUTHORIZED, CAPTURED, REFUNDED, FAILED, VOIDED) enforced at database level.",
      "Row-Level Concurrency Control: Utilizes PostgreSQL transactions and SELECT FOR UPDATE locks to serialize concurrent payment operations on identical payment IDs.",
      "Distributed Idempotency: SHA-256 request hashing paired with PostgreSQL unique constraint indexing to gracefully absorb duplicate submissions and resolve error 23505 race conditions without 500 crashes.",
      "Resilient Webhook Dispatch: Redis and BullMQ job queue featuring 5-tier exponential backoff retries and constant-time HMAC-SHA256 payload signing.",
    ],
    technicalDecisions: [
      {
        decision: "Row-Level Locking (SELECT FOR UPDATE)",
        rationale:
          "Ensures only a single transaction can mutate a payment record at any millisecond, eliminating phantom captures during rapid user double-taps.",
      },
      {
        decision: "Redis BullMQ Asynchronous Queues",
        rationale:
          "Decouples core payment processing from slow merchant webhook endpoints, preventing downstream HTTP delays from blocking API threads.",
      },
      {
        decision: "5-Tier Exponential Backoff Retries",
        rationale:
          "Gives external webhook receivers ample recovery time (1m, 5m, 15m, 1h, 6h) before dead-lettering failed payloads.",
      },
    ],
    results: [
      { label: "Automated Tests", value: "58 unit & integration tests", verified: true },
      { label: "Concurrent Race Duplication", value: "0 double captures", verified: true },
      { label: "Retry Hierarchy", value: "5-tier exponential backoff", verified: true },
      { label: "Database Safety", value: "Zero unhandled 23505 errors", verified: true },
    ],
    interactiveDemoType: "payment",
  },
  {
    id: "routewise",
    number: "03",
    title: "Routewise",
    subtitle: "In-Memory Spatial Graph Engine & 2-Opt Tour Optimizer",
    tagline: "Accelerated A* and Dijkstra pathfinding with MinHeap priority queues on OpenStreetMap road networks.",
    category: "ALGORITHMS / GRAPH SYSTEMS",
    year: "2024",
    status: "ALGORITHM ENGINE",
    featured: true,
    github: "https://github.com/TakshakSinghania/Routewise",
    stack: [
      "React",
      "Node.js",
      "Express",
      "JavaScript",
      "OpenStreetMap Vector Data",
    ],
    image: "/images/projects/routewise.svg",
    overview:
      "A spatial routing and graph computation engine built on OpenStreetMap vector data across 5 global downtown districts, capable of modeling 14,000+ street nodes and computing optimal multi-stop delivery tours.",
    problem:
      "Standard naive Dijkstra implementations on large spatial graphs suffer from O(V²) runtime complexity, causing noticeable browser freeze. Furthermore, multi-stop delivery planning (Travelling Salesperson Problem) scales at O(N!), becoming unsolvable through brute force.",
    architecture: [
      "Vector Graph Ingestion: Parses raw OSM XML/JSON road segments into memory-efficient adjacency lists calculating great-circle distances via the Haversine formula.",
      "Custom Binary MinHeap: Replaces array-based priority queues with a binary MinHeap, accelerating frontier node extraction to O(log V).",
      "Heuristic Optimization (Nearest Neighbor + 2-Opt): Solves multi-waypoint tours by constructing an initial greedy path and iteratively untangling crossing edges through 2-Opt pairwise node swaps.",
      "Interactive Algorithm Benchmarker: Side-by-side runtime profiler contrasting heuristic approximations against exact brute-force solvers.",
    ],
    technicalDecisions: [
      {
        decision: "Custom Binary MinHeap Priority Queue",
        rationale:
          "Reduced vertex extraction time from O(V) to O(log V), dramatically increasing pathfinding frame rates during animated explorations.",
      },
      {
        decision: "2-Opt Local Search Heuristic",
        rationale:
          "Eliminates crossing path intersections across up to 10 waypoints in sub-millisecond runtimes compared to seconds for factorial permutation.",
      },
      {
        decision: "Haversine Great-Circle Geodesy",
        rationale:
          "Computes accurate spherical surface distances across latitude/longitude coordinates without projection distortions.",
      },
    ],
    results: [
      { label: "Spatial Graph Scale", value: "14,000+ street nodes modeled", verified: true },
      { label: "Frontier Extraction", value: "O(log V) MinHeap priority queue", verified: true },
      { label: "Global Downtowns", value: "5 cities indexed", verified: true },
      { label: "Automated Benchmarks", value: "10 automated test suites", verified: true },
    ],
    interactiveDemoType: "graph",
  },
  {
    id: "ai-code-review",
    number: "04",
    title: "AI Code Review Platform",
    subtitle: "Automated Semantic Diff Analysis & Security Scanner",
    tagline: "Intelligent GitHub PR review agent analyzing AST structures and vulnerability heuristics.",
    category: "AI / DEVELOPER TOOLING",
    year: "2025",
    status: "CONCEPT / IN DEVELOPMENT",
    featured: false,
    stack: ["TypeScript", "Next.js", "Gemini API", "GitHub Apps", "Babel AST Parser"],
    image: "/images/projects/ai-code-review.svg",
    overview:
      "A developer tooling concept engineered to automate code reviews on GitHub Pull Requests by combining AST diff parsing with LLM context windows to catch anti-patterns and memory leaks.",
    problem:
      "Engineering teams spend hours reviewing boilerplate changes, often missing subtle edge cases such as missing database index hints or unhandled async rejections in Express route handlers.",
    architecture: [
      "Webhook Listener: Captures `pull_request.opened` and `synchronize` events from GitHub Apps.",
      "Semantic Diff Extractor: Uses AST parsers to isolate modified syntax trees and dependency graphs rather than raw line diffs.",
      "Contextual LLM Evaluation: Formulates targeted prompts passing function signatures and git commit contexts to highlight edge-case security risks.",
    ],
    technicalDecisions: [
      {
        decision: "AST-Based Diff Extraction",
        rationale: "Prevents false positives on whitespace, formatting, or comment-only changes.",
      },
      {
        decision: "Structured JSON Output Schema",
        rationale: "Enforces strict machine-readable lint feedback for direct line-level GitHub inline review comments.",
      },
    ],
    results: [
      { label: "Project Status", value: "Concept / In Active Development", verified: true },
      { label: "Target Review Latency", value: "<10s per Pull Request (Metric to measure)", verified: false },
      { label: "Security Heuristics", value: "SQL injection & race condition detectors (Planned)", verified: false },
    ],
    interactiveDemoType: "diff",
  },
  {
    id: "ai-document-intelligence",
    number: "05",
    title: "AI Document Intelligence",
    subtitle: "Hybrid Vector Search & Technical RFC Retrieval Pipeline",
    tagline: "Retrieval-augmented generation over dense technical specifications and system architectures.",
    category: "AI / VECTOR SEARCH / RAG",
    year: "2025",
    status: "CONCEPT / IN DEVELOPMENT",
    featured: false,
    stack: ["Python", "TypeScript", "FastAPI", "pgvector", "PostgreSQL", "LangChain"],
    image: "/images/projects/ai-document-intelligence.svg",
    overview:
      "An asynchronous document indexing and hybrid retrieval system built to answer engineering queries across RFC documents, API specs, and technical system runbooks with exact paragraph citations.",
    problem:
      "Naive semantic search often hallucinates version numbers, port numbers, or exact command-line arguments because vector proximity overlooks exact keyword matches.",
    architecture: [
      "Hybrid Retrieval: Blends PostgreSQL Full-Text Search (tsvector BM25) with pgvector cosine similarity embeddings.",
      "Hierarchical Chunking: Preserves markdown header hierarchies and code block boundaries during document chunking.",
      "Citation Anchor Engine: Returns exact source byte offsets and line ranges alongside generated answers.",
    ],
    technicalDecisions: [
      {
        decision: "Hybrid Keyword + Dense Vector Indexing",
        rationale: "Ensures precise recall for exact symbols (like error codes or port 5432) while retaining semantic concept matching.",
      },
      {
        decision: "Asynchronous Background Ingestion",
        rationale: "Offloads heavy PDF OCR and embedding generation to worker processes.",
      },
    ],
    results: [
      { label: "Project Status", value: "Concept / In Active Development", verified: true },
      { label: "Hybrid Search Engine", value: "BM25 + pgvector Reciprocal Rank Fusion (Planned)", verified: false },
      { label: "Document Ingestion", value: "Hierarchical chunking pipeline (Prototype)", verified: false },
    ],
  },
];
