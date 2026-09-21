"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Project, PROJECTS } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface CircularCarouselProps {
  onSelectProject: (project: Project) => void;
  onOpenCaseStudy: (project: Project) => void;
}

export default function CircularCarousel({
  onSelectProject,
  onOpenCaseStudy,
}: CircularCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const total = PROJECTS.length;

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextCard();
      if (e.key === "ArrowLeft") prevCard();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextCard, prevCard]);

  // Pointer drag handling with velocity awareness
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diffX = e.clientX - startX.current;

    // Swipe threshold
    if (diffX < -50) {
      nextCard();
    } else if (diffX > 50) {
      prevCard();
    }
  };

  // Wheel scroll rotation with debounce
  const lastWheelTime = useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 250) return;

    if (Math.abs(e.deltaX) > 30 || Math.abs(e.deltaY) > 30) {
      if (e.deltaX > 30 || e.deltaY > 30) {
        nextCard();
        lastWheelTime.current = now;
      } else if (e.deltaX < -30 || e.deltaY < -30) {
        prevCard();
        lastWheelTime.current = now;
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="relative w-full py-12 md:py-20 flex flex-col items-center justify-center overflow-hidden select-none"
      data-cursor="DRAG"
    >
      {/* 3D Orbit Stage */}
      <div className="relative w-full max-w-5xl h-[460px] md:h-[520px] flex items-center justify-center perspective-1200">
        <div className="relative w-full h-full flex items-center justify-center preserve-3d">
          {PROJECTS.map((project, index) => {
            // Calculate circular offset relative to activeIndex
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isActive = offset === 0;
            const isImmediate = Math.abs(offset) === 1;
            const isVisible = Math.abs(offset) <= 2;

            // Compute 3D transforms for desktop & mobile
            const xPosDesktop = offset * 320;
            const zPosDesktop = isActive ? 80 : -Math.abs(offset) * 110;
            const rotateYDesktop = offset * -28;
            const scale = isActive ? 1.04 : isImmediate ? 0.88 : 0.72;
            const opacity = isActive ? 1 : isImmediate ? 0.6 : 0.2;

            if (!isVisible) return null;

            return (
              <motion.div
                key={project.id}
                animate={{
                  x: xPosDesktop,
                  z: zPosDesktop,
                  rotateY: rotateYDesktop,
                  scale,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  damping: 26,
                  stiffness: 220,
                  mass: 0.9,
                }}
                style={{
                  position: "absolute",
                  width: "min(340px, 80vw)",
                  zIndex: 20 - Math.abs(offset) * 5,
                  transformStyle: "preserve-3d",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isActive) {
                    onOpenCaseStudy(project);
                  } else {
                    setActiveIndex(index);
                    onSelectProject(project);
                  }
                }}
              >
                <ProjectCard
                  project={project}
                  isActive={isActive}
                  onSelect={() => {
                    setActiveIndex(index);
                    onSelectProject(project);
                  }}
                  onOpenCaseStudy={() => onOpenCaseStudy(project)}
                  variant="carousel"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Orbit Navigation Controls & Pagination */}
      <div className="flex items-center space-x-6 mt-6 z-20">
        <button
          onClick={prevCard}
          className="p-2 rounded-full border border-surface-border text-text-muted hover:text-white hover:border-white/30 transition-all focus:outline-none"
          aria-label="Previous Project"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Indicator Dots */}
        <div className="flex items-center space-x-2">
          {PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === activeIndex
                  ? "w-7 bg-white"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to project ${proj.title}`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          className="p-2 rounded-full border border-surface-border text-text-muted hover:text-white hover:border-white/30 transition-all focus:outline-none"
          aria-label="Next Project"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Active Project Quick Details Bar */}
      <div className="mt-4 text-center">
        <span className="text-[11px] font-mono tracking-widest text-text-muted">
          CLICK ACTIVE CARD TO EXPAND CASE STUDY
        </span>
      </div>
    </div>
  );
}
