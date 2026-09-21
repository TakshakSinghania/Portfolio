"use client";

import React, { useRef } from "react";
import ScrollHeading from "@/components/ui/ScrollHeading";

export default function ArchitectureSection() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      id="architecture-transition"
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-surface-border overflow-hidden select-none"
    >
      {/* Unnumbered Editorial Label */}
      <div className="text-[11px] font-mono tracking-widest text-text-muted mb-6">
        {"//"} SYSTEMS &amp; ARCHITECTURAL THINKING
      </div>

      {/* Monumental Editorial Headline with Physical Scroll Motion */}
      <ScrollHeading
        targetRef={containerRef}
        isMonumental
        fadeOnScroll
        className="editorial-headline text-white font-bold leading-[0.88] tracking-tighter"
        lines={[
          { text: "BACKEND?", direction: "left" },
          { text: "THAT'S A", direction: "rotate", className: "text-text-muted" },
          { text: "TOMORROW", direction: "right" },
          {
            text: "PROBLEM.",
            direction: "left",
            className:
              "text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-600",
          },
        ]}
      />

      {/* Technology Strips Directly Underneath */}
      <div className="mt-12 md:mt-16 flex flex-wrap gap-3">
        {components.map((comp) => (
          <div
            key={comp.name}
            className="px-4 py-2.5 rounded bg-surface border border-surface-border text-xs font-mono transition-colors hover:border-surface-border-bright"
          >
            <span className="text-white font-bold">{comp.name}</span>
            <span className="text-text-subtle ml-2 font-normal">
              {"//"} {comp.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
