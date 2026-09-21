"use client";

import React from "react";
import { motion } from "framer-motion";
import SpatialPhotoCards from "./SpatialPhotoCards";
import IdentityCard3D from "./IdentityCard3D";
import ScrollHeading from "@/components/ui/ScrollHeading";
import { RESUME_DATA } from "@/data/resume";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Top Metadata Row */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-text-muted border-b border-surface-border pb-4"
      >
        <div className="flex items-center space-x-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-text-main font-semibold">AVAILABLE FOR SDE ROLES</span>
          <span className="text-text-subtle">/</span>
          <span>FULL-STACK &amp; SYSTEMS</span>
        </div>
      </motion.div>

      {/* Main Compositional Center */}
      <div className="relative my-auto py-8 md:py-12">
        {/* Layer 1: Monumental Typography with Counterweight 3D Identity Card */}
        <div className="relative z-0 select-none flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <ScrollHeading
            isHero
            isMonumental
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="editorial-headline text-text-main font-bold tracking-tighter"
            lines={[
              { text: "SOFTWARE", direction: "left", className: "leading-[0.88]" },
              {
                text: "ENGINEER",
                direction: "right",
                className:
                  "leading-[0.88] text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500",
              },
            ]}
          />

          {/* 3D Minimal Identity Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="self-start sm:self-auto lg:self-center lg:mr-6"
          >
            <IdentityCard3D />
          </motion.div>
        </div>

        {/* Layer 2: 3D Spatial Photo Cards (Floating Across the Center) */}
        <div className="relative z-10 -mt-10 sm:-mt-16 md:-mt-24">
          <SpatialPhotoCards />
        </div>

        {/* Layer 3: Secondary Capabilities Taxonomy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="relative z-20 mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono tracking-widest text-text-muted"
        >
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>FULL-STACK PRODUCTS</span>
            <span className="text-text-subtle">•</span>
            <span>BACKEND SYSTEMS</span>
            <span className="text-text-subtle">•</span>
            <span>DISTRIBUTED QUEUES</span>
            <span className="text-text-subtle">•</span>
            <span>INTERACTION</span>
          </div>

          <div className="text-[11px] text-text-subtle font-mono hidden md:block">
            01 / 05 SELECTED WORK
          </div>
        </motion.div>
      </div>

      {/* Bottom Row: Editorial Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="flex items-center justify-between pt-6 border-t border-surface-border text-[10px] font-mono tracking-widest text-text-muted"
      >
        <button
          onClick={scrollToProjects}
          className="group flex items-center space-x-2 text-text-main hover:text-white transition-colors cursor-pointer focus:outline-none"
        >
          <span>EXPLORE PROJECTS</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
        </button>
      </motion.div>
    </section>
  );
}
