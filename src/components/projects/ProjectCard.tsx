"use client";

import React from "react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

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
}: ProjectCardProps) {
  return (
    <article
      onClick={() => {
        if (isActive && onOpenCaseStudy) {
          onOpenCaseStudy();
        } else if (onSelect) {
          onSelect();
        }
      }}
      className={`relative w-full rounded p-4 bg-surface border transition-all duration-300 cursor-pointer select-none group ${
        isActive
          ? "border-beige/50 shadow-tactile-hover"
          : "border-surface-border hover:border-beige/30"
      } ${className}`}
    >
      {/* Top Meta Bar: Clean Project Number */}
      <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-text-muted mb-3">
        <span className="text-beige font-bold tracking-widest">{project.number}</span>
        <span className="text-[9px] text-text-subtle uppercase">{project.year}</span>
      </div>

      {/* Image Preview Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded bg-black mb-4 filter grayscale contrast-125 transition-all duration-500 group-hover:contrast-100">
        <Image
          src={project.image}
          alt={project.title}
          fill
          unoptimized={project.image.endsWith(".svg")}
          sizes="(max-width: 768px) 300px, 420px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Hover Action Pill */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center space-x-1 px-2.5 py-1 bg-beige text-black text-[9px] font-mono font-semibold tracking-widest uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span>{isActive ? "EXPLORE" : "SELECT"}</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-1.5">
        <div className="text-[10px] font-mono tracking-widest text-text-subtle uppercase">
          {project.category}
        </div>

        <h3 className="text-lg font-bold text-text-main tracking-tight group-hover:text-beige transition-colors">
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
              className="text-[9px] font-mono px-2 py-0.5 bg-black/60 border border-beige/15 text-beige/80 rounded"
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
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-beige/25 to-transparent" />
    </article>
  );
}
