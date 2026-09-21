"use client";

import React, { useState } from "react";
import { Project } from "@/data/projects";
import CircularCarousel from "./CircularCarousel";
import ScatteredGridView from "./ScatteredGridView";
import CaseStudyModal from "./CaseStudyModal";
import ScrollHeading from "@/components/ui/ScrollHeading";
import { Orbit, Grid3X3 } from "lucide-react";

export default function ProjectsSection() {
  const [viewMode, setViewMode] = useState<"orbit" | "scattered">("orbit");
  const [, setSelectedProject] = useState<Project | null>(null);
  const [caseStudyProject, setCaseStudyProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-surface-border">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-surface-border gap-6">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-text-muted mb-2">
            01 // SELECTED PROJECTS
          </div>
          <ScrollHeading
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white leading-[0.92]"
            lines={[
              { text: "SELECTED", direction: "left" },
              {
                text: "PROJECTS",
                direction: "right",
                className: "pl-6 sm:pl-12 md:pl-20 text-neutral-300",
              },
            ]}
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-1 p-1 bg-surface rounded border border-surface-border w-fit">
          <button
            onClick={() => setViewMode("orbit")}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all cursor-pointer ${
              viewMode === "orbit"
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
            aria-label="Switch to 3D Orbit View"
          >
            <Orbit className="w-3.5 h-3.5" />
            <span>3D ORBIT</span>
          </button>

          <button
            onClick={() => setViewMode("scattered")}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all cursor-pointer ${
              viewMode === "scattered"
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
            aria-label="Switch to Scattered Grid View"
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>SCATTERED GRID</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      {viewMode === "orbit" ? (
        <CircularCarousel
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenCaseStudy={(proj) => setCaseStudyProject(proj)}
        />
      ) : (
        <ScatteredGridView
          onOpenCaseStudy={(proj) => setCaseStudyProject(proj)}
        />
      )}

      {/* Case Study Deep Dive Modal */}
      <CaseStudyModal
        project={caseStudyProject}
        onClose={() => setCaseStudyProject(null)}
      />
    </section>
  );
}
