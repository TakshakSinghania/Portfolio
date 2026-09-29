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
  color?: string; // used inside modal
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
    demoUrl: "https://sentosa-qr-ordering-client.vercel.app",
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
    color: "#8C8275",
    overview:
      "Sentosa is a production full-stack restaurant operations and tabletop QR ordering platform. It couples zero-download mobile ordering with an authoritative server-side pricing engine, tabletop cryptographic session scoping, live WebSocket kitchen ticket feeds (KDS), and idempotent payment verification.",
    problem:
      "Cafés and high-turnover restaurants suffer from front-of-house bottlenecking during rush periods and remain vulnerable to client-side cart tampering if prices, item options, or GST taxes are calculated in mutable browser state.",
    architecture: [
      "Client Layer: Mobile-first React/TypeScript PWA designed for instantaneous tabletop QR resolution with zero app installation.",
      "Security Perimeter: 16-character cryptographic table session tokens scoped per dining party to prevent unauthorized cross-table orders.",
      "Authoritative Pricing: PostgreSQL + Prisma schema recalculates subtotal, modifiers, and 5% GST entirely server-side to neutralize tampering.",
      "Kitchen Dispatch: Full-duplex WebSocket dispatch via Socket.IO with isolated kitchen rooms and audible chime alerts for kitchen display systems (KDS).",
      "Payment & Webhooks: Razorpay gateway integrated with constant-time HMAC-SHA256 signature validation and deduplicated webhook processing.",
    ],
    technicalDecisions: [
      {
        decision: "Server-Authoritative Price Calculation",
        rationale:
          "Validates item IDs against live database prices and computes modifiers and taxes server-side, eliminating client-side price modification.",
      },
      {
        decision: "Room-Scoped WebSockets (Socket.IO)",
        rationale:
          "Isolates staff, kitchen, and customer channels into distinct namespaces, preventing customer devices from intercepting internal kitchen telemetry.",
      },
      {
        decision: "16-Character Cryptographic Session Tokens",
        rationale:
          "Generates ephemeral dining tokens upon QR scan to link cart items to physical tables securely without requiring friction-heavy accounts.",
      },
    ],
    security: [
      "2-Role RBAC verified across 37 permission endpoints",
      "HMAC-SHA256 signature verification on payment webhooks",
      "Cryptographic session tokens preventing cross-table tampering",
    ],
    results: [
      { label: "Automated Test Suite", value: "63 unit & integration tests", verified: true },
      { label: "Price Manipulation", value: "0% permitted (server authoritative)", verified: true },
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
    color: "#8C8275",
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
    security: [
      "Strict 6-state finite state machine validations",
      "HMAC-SHA256 signature generation on all dispatched webhook payloads",
      "Unique constraint index guards on idempotency keys",
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
    github: "https://github.com/TakshakSinghania/routewise",
    demoUrl: "https://routewise-seven.vercel.app",
    stack: [
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "OpenStreetMap Vector Data",
    ],
    image: "/images/projects/routewise.svg",
    color: "#8C8275",
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
    id: "ghosttyper",
    number: "04",
    title: "GhostTyper Pro",
    subtitle: "Autonomous Keystroke Synthesizer & Human Cadence Engine",
    tagline: "Background code streaming with zero-clipboard tampering and Gaussian cadence timing emulation.",
    category: "SYSTEM TOOLING / WEBSOCKET DAEMONS",
    year: "2024–2025",
    status: "CORE SYSTEM",
    featured: true,
    github: "https://github.com/TakshakSinghania/ghosttyper-pro",
    stack: [
      "JavaScript",
      "Node.js",
      "Express",
      "WebSocket (ws)",
      "Jest",
    ],
    image: "/images/projects/ghosttyper.svg",
    color: "#8C8275",
    overview:
      "An autonomous background keystroke synthesizer and developer productivity tool. It emulates natural human typing cadences with Gaussian timing jitter, allowing code streaming into background browser tabs or desktop IDEs without overwriting or interfering with the system clipboard.",
    problem:
      "Automated code injection or typing tools typically overwrite system clipboards (interfering with user multitasking) or emit rigid deterministic keystroke delays that trigger anti-automation heuristics in remote desktop and browser environments.",
    architecture: [
      "Zero-Clipboard Architecture: Synthesizes direct OS keystroke events rather than pasting through clipboard buffers, preserving clipboard contents completely.",
      "Gaussian Jitter Engine: Simulates natural human dwell times (60ms–110ms) and inter-key transitions based on keyboard physical distance heuristics.",
      "Full-Duplex WS Control Daemon: Node.js and WebSocket engine providing real-time cadence adjustments, pause/resume, and typing stream controls.",
      "CAD-Style Control Board: Precision tactile UI displaying real-time WPM telemetry, injection progress, and active target buffer state.",
    ],
    technicalDecisions: [
      {
        decision: "Zero-Clipboard Event Synthesis",
        rationale:
          "Prevents the synthesizer from colliding with user copy/paste workflows while multitasking on the host machine.",
      },
      {
        decision: "Gaussian Latency Modeling",
        rationale:
          "Generates realistic human keystroke variance, eliminating robotic uniform typing pulses.",
      },
      {
        decision: "Lightweight WebSocket Streamer",
        rationale:
          "Maintains sub-millisecond control dispatch for pause, speed throttle, and buffer reload.",
      },
    ],
    results: [
      { label: "Clipboard Collisions", value: "0 (zero-clipboard architecture)", verified: true },
      { label: "Dwell Time Jitter", value: "60ms–110ms Gaussian distribution", verified: true },
      { label: "WebSocket Latency", value: "<5ms bidirectional telemetry", verified: true },
      { label: "Test Coverage", value: "Jest automated test suite", verified: true },
    ],
  },
];
