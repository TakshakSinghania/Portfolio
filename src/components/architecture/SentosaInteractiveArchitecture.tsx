"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Server,
  Database,
  Radio,
  ChefHat,
  CreditCard,
  Play,
  CheckCircle2,
  Lock,
  Code2,
  Activity,
  ArrowRight,
} from "lucide-react";

interface ArchNode {
  id: string;
  name: string;
  tag: string;
  icon: React.ElementType;
  tech: string;
  responsibility: string;
  rationale: string;
  codeSnippet: string;
}

const ARCH_NODES: ArchNode[] = [
  {
    id: "client",
    name: "Customer QR Client",
    tag: "EDGE DEVICE",
    icon: Smartphone,
    tech: "React 18 + Vite + TypeScript PWA",
    responsibility:
      "Instant tabletop QR resolution (Table 05), item customization (modifiers), local cart caching, phone OTP checkout flow.",
    rationale:
      "Lightweight PWA loads in <1.2s on mobile 4G with zero app store install friction. Ties order to a 16-character cryptographic session token.",
    codeSnippet: `// Session token generation & table isolation
const sessionToken = crypto.randomBytes(8).toString('hex'); // 16-char
const payload = {
  tableNumber: "Table 05",
  sessionToken,
  items: [{ itemId: "cappuccino-hot", modifiers: ["oat-milk", "double-shot"] }]
};`,
  },
  {
    id: "api",
    name: "Express API Gateway",
    tag: "BACKEND ROUTER",
    icon: Server,
    tech: "Node.js + Express + TypeScript",
    responsibility:
      "Validates session cryptographic tokens, enforces 2-role RBAC across 37 endpoints, and executes authoritative server-side price recalculation.",
    rationale:
      "Client browser totals are completely untrusted. The backend recalculates item base prices, modifier add-ons, and 5% GST directly to eliminate price tampering.",
    codeSnippet: `// Authoritative Server-Side Price Verification
let subtotal = 0;
for (const item of order.items) {
  const dbItem = await prisma.menuItem.findUniqueOrThrow({ where: { id: item.id } });
  const modTotal = item.modifiers.reduce((sum, m) => sum + m.price, 0);
  subtotal += (dbItem.price + modTotal) * item.quantity;
}
const gstTax = Math.round(subtotal * 0.05); // 5% GST
const finalAuthoritativeTotal = subtotal + gstTax;`,
  },
  {
    id: "db",
    name: "PostgreSQL Database",
    tag: "PERSISTENCE & LOCKING",
    icon: Database,
    tech: "PostgreSQL + Prisma ORM",
    responsibility:
      "ACID relational transactions, order status lifecycle management, and row-level serialization for high-volume kitchen peaks.",
    rationale:
      "Relational integrity ensures orders, items, modifier groups, and payments never desynchronize. Row-level transaction prevents duplicate fulfillment.",
    codeSnippet: `// Prisma schema definition excerpt
model Order {
  id            String       @id @default(cuid())
  tableNumber   String
  status        OrderStatus  @default(CONFIRMED) // CONFIRMED -> PREPARING -> READY
  totalAmount   Int          // Server computed in paise / cents
  sessionToken  String
  createdAt     DateTime     @default(now())
  orderItems    OrderItem[]
  payment       Payment?
}`,
  },
  {
    id: "socket",
    name: "Socket.IO Dispatcher",
    tag: "REAL-TIME WEBSOCKET",
    icon: Radio,
    tech: "Socket.IO Full-Duplex Engine",
    responsibility:
      "Dispatches real-time kitchen order tickets and status updates with room-scoped isolation.",
    rationale:
      "Separates staff and kitchen channels into private rooms, broadcasting order tickets in <150ms without polling database tables.",
    codeSnippet: `// Room-scoped WebSocket broadcast
io.to("kitchen-indiranagar").emit("order:new", {
  orderId: newOrder.id,
  table: "Table 05",
  items: newOrder.orderItems,
  timestamp: new Date().toISOString()
});`,
  },
  {
    id: "kds",
    name: "Kitchen KDS Display",
    tag: "OPERATIONAL UI",
    icon: ChefHat,
    tech: "React Live Kitchen Dashboard",
    responsibility:
      "Real-time ticket display with audio bell alerts, modifier pill indicators, and one-tap state changes (CONFIRMED → PREPARING → READY).",
    rationale:
      "High-contrast kitchen display visible from 10 feet away. Staff can acknowledge tickets instantly, syncing status back to customer screens.",
    codeSnippet: `// Status transition handler in Kitchen Display
async function markPreparing(orderId: string) {
  socket.emit("order:status:update", {
    orderId,
    newStatus: "PREPARING",
    updatedBy: "Kitchen Station 1"
  });
}`,
  },
  {
    id: "payments",
    name: "Razorpay Payment Gateway",
    tag: "SETTLEMENT & WEBHOOKS",
    icon: CreditCard,
    tech: "Razorpay Node SDK + HMAC-SHA256",
    responsibility:
      "UPI / Card payments, signature validation, and idempotent webhook handling.",
    rationale:
      "Constant-time HMAC comparison prevents timing attacks. Webhook deduplication ensures no payment is credited or refunded twice.",
    codeSnippet: `// HMAC-SHA256 Payment Signature Verification
const generatedSignature = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
  .update(orderId + "|" + paymentId)
  .digest('hex');

if (crypto.timingSafeEqual(Buffer.from(generatedSignature), Buffer.from(signature))) {
  await markOrderPaid(orderId);
}`,
  },
];

export default function SentosaInteractiveArchitecture() {
  const [selectedNode, setSelectedNode] = useState<ArchNode>(ARCH_NODES[0]);
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState<number>(-1);

  const simulationSteps = [
    {
      nodeId: "client",
      title: "Step 1: Table 05 QR Scan & Order Placement",
      detail: "Customer orders Hot Cappuccino (Oat Milk + Double Shot) on mobile client.",
    },
    {
      nodeId: "api",
      title: "Step 2: API Gateway Token & Price Integrity",
      detail: "Express verifies 16-char session token, computes 5% GST, and validates pricing.",
    },
    {
      nodeId: "db",
      title: "Step 3: PostgreSQL Transaction Commit",
      detail: "Order #105 committed to database with status CONFIRMED inside ACID transaction.",
    },
    {
      nodeId: "socket",
      title: "Step 4: WebSocket Dispatch",
      detail: "Socket.IO pushes order:new event to the room 'kitchen-indiranagar'.",
    },
    {
      nodeId: "kds",
      title: "Step 5: Kitchen KDS Receipt & Live State Change",
      detail: "Kitchen receives ticket, plays audio chime, and updates status pill to PREPARING.",
    },
    {
      nodeId: "payments",
      title: "Step 6: Razorpay Webhook Confirmation",
      detail: "HMAC-SHA256 signature verified; payment settled idempotently.",
    },
  ];

  const runSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setSimStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < simulationSteps.length) {
        setSimStep(step);
        const nextNode = ARCH_NODES.find((n) => n.id === simulationSteps[step].nodeId);
        if (nextNode) setSelectedNode(nextNode);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setSimulating(false);
          setSimStep(-1);
        }, 1200);
      }
    }, 1500);
  };

  return (
    <div className="w-full py-8 space-y-8">
      {/* Simulation Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded bg-surface border border-surface-border">
        <div className="flex items-center space-x-3">
          <Activity className={`w-5 h-5 ${simulating ? "text-sentosa-blue animate-spin" : "text-text-muted"}`} />
          <div>
            <div className="text-xs font-mono font-bold text-white tracking-wider">
              REAL-TIME ARCHITECTURE INTERACTION
            </div>
            <div className="text-[11px] text-text-muted">
              Click any node to inspect schemas, or trigger the live packet simulator.
            </div>
          </div>
        </div>

        <button
          onClick={runSimulation}
          disabled={simulating}
          className={`flex items-center space-x-2 px-4 py-2 rounded text-xs font-mono tracking-wider font-semibold transition-all ${
            simulating
              ? "bg-sentosa-blue/20 text-sentosa-blue cursor-not-allowed border border-sentosa-blue/40"
              : "bg-white text-black hover:bg-neutral-200 shadow-md cursor-pointer"
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${simulating ? "animate-pulse" : ""}`} />
          <span>{simulating ? "SIMULATING EVENT..." : "SIMULATE ORDER EVENT"}</span>
        </button>
      </div>

      {/* Simulation Status Callout */}
      {simulating && simStep >= 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded bg-sentosa-blue/10 border border-sentosa-blue/30 text-xs font-mono text-sentosa-blue flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-sentosa-blue animate-ping" />
            <span className="font-bold">{simulationSteps[simStep].title}:</span>
            <span className="text-white/80">{simulationSteps[simStep].detail}</span>
          </div>
          <span className="text-[10px] text-sentosa-blue/60">
            {simStep + 1} / {simulationSteps.length}
          </span>
        </motion.div>
      )}

      {/* System Diagram Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {ARCH_NODES.map((node, index) => {
          const Icon = node.icon;
          const isSelected = selectedNode.id === node.id;
          const isCurrentSim =
            simulating && simulationSteps[simStep]?.nodeId === node.id;

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`relative text-left p-3.5 rounded transition-all duration-300 border flex flex-col justify-between min-h-[140px] focus:outline-none ${
                isCurrentSim
                  ? "bg-sentosa-blue/20 border-sentosa-blue ring-2 ring-sentosa-blue/50 scale-105 z-10"
                  : isSelected
                  ? "bg-surface-elevated border-white text-white shadow-lg"
                  : "bg-surface border-surface-border text-text-muted hover:border-surface-border-bright hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Icon
                  className={`w-5 h-5 ${
                    isCurrentSim || isSelected ? "text-sentosa-blue" : "text-text-subtle"
                  }`}
                />
                <span className="text-[9px] font-mono text-text-subtle font-bold">
                  0{index + 1}
                </span>
              </div>

              <div className="mt-4">
                <div className="text-[9px] font-mono tracking-wider text-text-subtle uppercase">
                  {node.tag}
                </div>
                <div className="text-xs font-bold text-white mt-0.5 leading-snug">
                  {node.name}
                </div>
              </div>

              {/* Active Indicator Bar */}
              {isSelected && (
                <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-sentosa-blue rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Deep Node Inspector Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="p-6 md:p-8 rounded bg-surface border border-surface-border grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Column: Responsibilities & Decisions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-sentosa-blue">
                <span>NODE INSPECTOR</span>
                <span>/</span>
                <span>{selectedNode.tag}</span>
              </div>
              <h4 className="text-2xl font-bold text-white">
                {selectedNode.name}
              </h4>
              <div className="text-xs font-mono text-text-muted">
                Technology: <span className="text-white">{selectedNode.tech}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
                Core Responsibility
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                {selectedNode.responsibility}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
                Engineering Rationale
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                {selectedNode.rationale}
              </p>
            </div>
          </div>

          {/* Right Column: Code / Schema Snippet */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-black/60 rounded border border-surface-border p-4 font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-surface-border text-[10px] text-text-subtle">
              <div className="flex items-center space-x-2">
                <Code2 className="w-3.5 h-3.5 text-sentosa-blue" />
                <span>ARCHITECTURAL IMPLEMENTATION</span>
              </div>
              <span>TYPESCRIPT // PRISMA</span>
            </div>

            <pre className="py-4 overflow-x-auto text-[11px] text-neutral-300 leading-relaxed font-mono">
              <code>{selectedNode.codeSnippet}</code>
            </pre>

            <div className="pt-2 border-t border-surface-border text-[10px] text-text-subtle flex items-center justify-between">
              <span>Verified from sentosa-qr-ordering</span>
              <span className="text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Zero client price tampering</span>
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
