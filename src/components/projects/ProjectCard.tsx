"use client";

import React from "react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  isActive?: boolean;
  onSelect?: () => void;
  onOpenCaseStudy?: () => void;
  className?: string;
  variant?: "carousel" | "grid";
}

export default function ProjectCard({
  project,
  isActive = false,
  onSelect,
  onOpenCaseStudy,
  className = "",
  variant = "carousel",
}: ProjectCardProps) {
  const isConcept = project.status === "CONCEPT / IN DEVELOPMENT";

  return (
    <article
      onClick={() => {
        if (isActive && onOpenCaseStudy) {
          onOpenCaseStudy();
        } else if (onSelect) {
          onSelect();
        }
      }}
      data-cursor={isActive ? "EXPAND" : "VIEW"}
      className={`relative w-full rounded p-4 bg-surface border transition-all duration-300 cursor-pointer select-none group ${
        isActive
          ? "border-white/40 shadow-tactile-hover"
          : "border-surface-border hover:border-surface-border-bright"
      } ${className}`}
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-text-muted mb-3">
        <span className="text-text-main font-bold">{project.number}</span>
        
        <div className="flex items-center space-x-1.5">
          {isConcept ? (
            <span className="flex items-center space-x-1 px-2 py-0.5 rounded text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertCircle className="w-2.5 h-2.5" />
              <span>CONCEPT</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1 px-2 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>{project.status}</span>
            </span>
          )}
        </div>
      </div>

      {/* Image Preview Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded bg-black mb-4 filter grayscale contrast-125 transition-all duration-500 group-hover:contrast-100">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 300px, 420px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Sentosa Specific Badge if applicable */}
        {project.id === "sentosa" && (
          <div className="absolute top-2.5 left-2.5 px-2 py-1 bg-sentosa-blue/80 backdrop-blur-md rounded text-[9px] font-mono tracking-widest text-white">
            FLAGSHIP // CAFÉ POS
          </div>
        )}

        {/* Hover Action Pill */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center space-x-1 px-2.5 py-1 bg-white/90 text-black text-[9px] font-mono tracking-widest uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span>{isActive ? "EXPLORE" : "SELECT"}</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-1.5">
        <div className="text-[10px] font-mono tracking-widest text-text-subtle">
          {project.category}
        </div>

        <h3 className="text-lg font-bold text-text-main tracking-tight group-hover:text-white transition-colors">
          {project.title}
        </h3>

        <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* Tech Stack Chips */}
        <div className="pt-2 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-mono px-2 py-0.5 bg-black/60 border border-surface-border text-text-muted rounded"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="text-[9px] font-mono px-1.5 py-0.5 text-text-subtle">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Border top sheen */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </article>
  );
}
