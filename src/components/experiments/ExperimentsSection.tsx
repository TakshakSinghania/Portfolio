"use client";

import React from "react";
import { EXPERIMENTS } from "@/data/experiments";
import CardDepthToy from "./experiments/CardDepthToy";
import DijkstraVisualizer from "./experiments/DijkstraVisualizer";
import IdempotencyEngine from "./experiments/IdempotencyEngine";
import SocketStreamer from "./experiments/SocketStreamer";
import SpringPhysicsToy from "./experiments/SpringPhysicsToy";
import KineticTypeToy from "./experiments/KineticTypeToy";
import { FlaskConical } from "lucide-react";

export default function ExperimentsSection() {
  const renderToy = (id: string) => {
    switch (id) {
      case "card-depth":
        return <CardDepthToy />;
      case "dijkstra-graph":
        return <DijkstraVisualizer />;
      case "payment-state-machine":
        return <IdempotencyEngine />;
      case "socket-ping":
        return <SocketStreamer />;
      case "spring-tuner":
        return <SpringPhysicsToy />;
      case "kinetic-type":
        return <KineticTypeToy />;
      default:
        return null;
    }
  };

  return (
    <section
      id="experiments"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-surface-border"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-surface-border gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-text-muted mb-2">
            <FlaskConical className="w-3.5 h-3.5 text-sentosa-blue" />
            <span>03 // EXPERIMENTAL ARCHIVE</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            CREATIVE CODING &amp; LAB
          </h2>
        </div>

        <p className="text-xs font-mono text-text-muted max-w-md">
          A sandbox of micro-interactions, algorithmic visualizers, distributed state machines, and Apple-inspired spring physics experiments.
        </p>
      </div>

      {/* Experiments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12">
        {EXPERIMENTS.map((exp) => (
          <div
            key={exp.id}
            className="p-6 rounded bg-surface border border-surface-border hover:border-surface-border-bright transition-all space-y-5"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-mono tracking-widest text-text-subtle">
                  {exp.number} {"//"} {exp.category}
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {exp.title}
                </h3>
              </div>

              <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/10 text-white">
                INTERACTIVE
              </span>
            </div>

            <p className="text-xs text-text-muted leading-relaxed">
              {exp.description}
            </p>

            {/* Embedded Interactive Sandbox */}
            <div className="pt-2">{renderToy(exp.id)}</div>

            {/* Tag Pills */}
            <div className="pt-4 border-t border-surface-border flex flex-wrap gap-1.5">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-mono px-2 py-0.5 bg-black/40 border border-surface-border text-text-subtle rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
