"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SentosaInteractiveArchitecture from "./SentosaInteractiveArchitecture";

export default function ArchitectureSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Typography word displacement transformations
  const shiftLeft = useTransform(scrollYProgress, [0.1, 0.45], [0, -60]);
  const shiftRight = useTransform(scrollYProgress, [0.1, 0.45], [0, 60]);
  const wordRotate = useTransform(scrollYProgress, [0.1, 0.45], [0, -3]);
  const opacityFade = useTransform(scrollYProgress, [0.35, 0.5], [1, 0.2]);

  const components = [
    { name: "REST API", desc: "Express Gateway" },
    { name: "POSTGRESQL", desc: "ACID & Row Locks" },
    { name: "REDIS", desc: "BullMQ Job Cache" },
    { name: "SOCKET.IO", desc: "Real-Time KDS" },
    { name: "RAZORPAY", desc: "HMAC Webhooks" },
    { name: "DOCKER", desc: "Containerized Sprints" },
  ];

  return (
    <section
      id="architecture"
      ref={containerRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-surface-border overflow-hidden"
    >
      {/* Editorial Monumental Typography Transition */}
      <div className="py-16 select-none">
        <div className="text-[11px] font-mono tracking-widest text-text-muted mb-4">
          02 // SYSTEMS & ARCHITECTURAL THINKING
        </div>

        <motion.div
          style={{ opacity: opacityFade }}
          className="editorial-headline text-white font-bold leading-[0.88] tracking-tighter"
        >
          <motion.span style={{ x: shiftLeft }} className="block">
            BACKEND?
          </motion.span>
          <motion.span style={{ rotate: wordRotate }} className="block text-text-muted">
            THAT&apos;S A
          </motion.span>
          <motion.span style={{ x: shiftRight }} className="block">
            TOMORROW
          </motion.span>
          <motion.span style={{ x: shiftLeft }} className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-600">
            PROBLEM.
          </motion.span>
        </motion.div>

        {/* Morphing into System Component Chips */}
        <div className="mt-12 flex flex-wrap gap-3">
          {components.map((comp) => (
            <div
              key={comp.name}
              className="px-3.5 py-2 rounded bg-surface border border-surface-border text-xs font-mono"
            >
              <span className="text-white font-bold">{comp.name}</span>
              <span className="text-text-subtle ml-2">{"//"} {comp.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flagship Case Study Interactive Architecture Diagram */}
      <div className="pt-12">
        <div className="mb-6 space-y-1">
          <div className="text-[10px] font-mono tracking-widest text-sentosa-blue uppercase font-semibold">
            FLAGSHIP ARCHITECTURE VISUALIZATION
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Sentosa QR Ordering & Kitchen WebSocket Pipeline
          </h3>
          <p className="text-sm text-text-muted max-w-2xl">
            A production-grade restaurant engine handling tabletop QR token generation, authoritative server pricing, and real-time kitchen display dispatch.
          </p>
        </div>

        <SentosaInteractiveArchitecture />
      </div>
    </section>
  );
}
