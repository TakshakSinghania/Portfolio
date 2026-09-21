export interface Experiment {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

export const EXPERIMENTS: Experiment[] = [
  {
    id: "card-depth",
    number: "01",
    title: "Card Depth & Specular Reflection",
    category: "SPATIAL UI / CSS 3D",
    description: "Pointer-coupled perspective transform with real-time radial specular light sheen and elevation drop.",
    tags: ["CSS 3D", "Pointer Events", "Matrix Transforms"],
  },
  {
    id: "dijkstra-graph",
    number: "02",
    title: "Dijkstra Graph Explorer",
    category: "ALGORITHMS / VISUALIZATION",
    description: "Interactive node grid demonstrating priority-queue frontier exploration and obstacle avoidance.",
    tags: ["MinHeap", "Dijkstra", "A* Search", "Haversine Concept"],
  },
  {
    id: "payment-state-machine",
    number: "03",
    title: "Payment State Machine & Row Lock",
    category: "DISTRIBUTED SYSTEMS / SIMULATION",
    description: "Interactive 6-state lifecycle simulator demonstrating SELECT FOR UPDATE serialization and idempotency.",
    tags: ["State Machine", "PostgreSQL Locks", "Idempotency"],
  },
  {
    id: "socket-ping",
    number: "04",
    title: "WebSocket Packet Ping Streamer",
    category: "NETWORKING / REAL-TIME",
    description: "Live round-trip latency stream graphing simulated socket event dispatch and acknowledgment jitter.",
    tags: ["Socket.IO", "Event Loop", "Latency Jitter"],
  },
  {
    id: "spring-tuner",
    number: "05",
    title: "Apple Spring Physics Tuner",
    category: "INTERACTION DESIGN / PHYSICS",
    description: "WWDC fluid interface spring parameter tester with adjustable damping ratio and response times.",
    tags: ["Spring Physics", "Damping", "WWDC 2018"],
  },
  {
    id: "kinetic-type",
    number: "06",
    title: "Kinetic Editorial Type",
    category: "CREATIVE CODING / TYPOGRAPHY",
    description: "Magnetic letter displacement engine that scatters on hover and snaps back into Swiss alignment.",
    tags: ["Kinetic Typography", "Magnetic Force", "Spring Return"],
  },
];
