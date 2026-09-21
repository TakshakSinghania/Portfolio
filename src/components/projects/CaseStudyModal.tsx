"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/data/projects";
import { X, ExternalLink, Github, CheckCircle, ShieldCheck, ArrowRight } from "lucide-react";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onJumpToArchitecture?: () => void;
}

export default function CaseStudyModal({
  project,
  onClose,
  onJumpToArchitecture,
}: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isSentosa = project.id === "sentosa";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 overflow-y-auto bg-black/90 backdrop-blur-xl">
        {/* Backdrop dismiss */}
        <div
          className="fixed inset-0 cursor-pointer"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto rounded-none md:rounded-lg bg-surface border border-surface-border-bright p-6 md:p-10 shadow-2xl z-10"
          style={isSentosa ? { borderColor: "rgba(100, 146, 179, 0.4)" } : {}}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-surface-border">
            <div className="flex items-center space-x-3 text-xs font-mono tracking-widest text-text-muted">
              <span className="text-white font-bold">{project.number}</span>
              <span>/</span>
              <span>{project.category}</span>
              <span>/</span>
              <span>{project.year}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-surface-border hover:border-white text-text-muted hover:text-white transition-all focus:outline-none"
              aria-label="Close Case Study"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Header */}
          <div className="py-8 space-y-4">
            <div className="text-xs font-mono tracking-widest text-emerald-400">
              {project.status}
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              {project.title}
            </h2>

            <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black rounded text-xs font-mono tracking-wider transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>VIEW REPOSITORY</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              {isSentosa && onJumpToArchitecture && (
                <button
                  onClick={() => {
                    onClose();
                    onJumpToArchitecture();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-sentosa-blue hover:bg-sentosa-deep text-white rounded text-xs font-mono tracking-wider transition-all"
                >
                  <span>INTERACTIVE ARCHITECTURE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Sentosa Stroll Illustration Banner if applicable */}
          {isSentosa && (
            <div className="relative w-full rounded bg-sentosa-paper p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-sentosa-border">
              <div className="space-y-2 text-sentosa-charcoal">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-sentosa-deep">
                  AUTHENTIC BRAND IDENTITY
                </span>
                <h4 className="text-xl font-serif font-semibold">
                  Sentosa — The Coffee Unit
                </h4>
                <p className="text-xs text-sentosa-taupe max-w-md">
                  Quiet, tactile restaurant craft meets modern tabletop technology. Warm paper textures, phone OTP checkout, and instant WebSocket kitchen ticket synchronization.
                </p>
              </div>

              <div className="relative w-32 h-28 flex-shrink-0">
                <Image
                  src="/sentosa/character-stroll.png"
                  alt="Sentosa character strolling"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Content Sections */}
          <div className="space-y-10 py-6 border-t border-surface-border text-sm leading-relaxed text-text-muted">
            {/* 01 Overview */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono tracking-widest text-text-main uppercase">
                01 // OVERVIEW
              </h3>
              <p>{project.overview}</p>
            </div>

            {/* 02 Problem Statement */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono tracking-widest text-text-main uppercase">
                02 // PROBLEM STATEMENT
              </h3>
              <p>{project.problem}</p>
            </div>

            {/* 03 System Architecture */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono tracking-widest text-text-main uppercase">
                03 // ARCHITECTURE HIGHLIGHTS
              </h3>
              <ul className="space-y-2.5">
                {project.architecture.map((arch, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <span className="text-white font-mono text-xs mt-0.5">•</span>
                    <span>{arch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 04 Technical Decisions */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono tracking-widest text-text-main uppercase">
                04 // TECHNICAL DECISIONS & RATIONALE
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.technicalDecisions.map((tech, i) => (
                  <div
                    key={i}
                    className="p-4 rounded bg-surface-elevated border border-surface-border space-y-1.5"
                  >
                    <div className="font-semibold text-white text-xs">
                      {tech.decision}
                    </div>
                    <p className="text-xs text-text-muted">{tech.rationale}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 05 Verified Results & Evidence */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono tracking-widest text-text-main uppercase">
                05 // VERIFIED RESULTS & METRICS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.results.map((res, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded bg-black/40 border border-surface-border flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[11px] text-text-muted font-mono">
                        {res.label}
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        {res.value}
                      </div>
                    </div>
                    {res.verified && (
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack List */}
            <div className="space-y-3 pt-4 border-t border-surface-border">
              <h3 className="text-xs font-mono tracking-widest text-text-main uppercase">
                TECH STACK
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded bg-surface-elevated border border-surface-border text-xs font-mono text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-6 border-t border-surface-border flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-surface-border hover:border-white text-white rounded text-xs font-mono tracking-wider transition-all"
            >
              CLOSE CASE STUDY
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
