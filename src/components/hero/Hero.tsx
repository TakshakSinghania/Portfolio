"use client";

import React from "react";
import { motion } from "framer-motion";
import CrowdCanvas from "./CrowdCanvas";
import IdentityCard3D from "./IdentityCard3D";
import ScrollHeading from "@/components/ui/ScrollHeading";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-[96vh] flex flex-col justify-between bg-[#F5F3EE] text-[#0A0A0A] overflow-hidden pt-24 md:pt-28 select-none">
      {/* Top Metadata Row: Full-width with controlled padding */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-6 md:px-12 lg:px-16 xl:px-20 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-widest text-[#0A0A0A]/60 border-b border-[#0A0A0A]/10 pb-4"
      >
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="text-[#0A0A0A] font-semibold tracking-wider">AVAILABLE FOR SDE ROLES</span>
          <span className="text-[#0A0A0A]/30">/</span>
          <span className="text-[#0A0A0A]/80">FULL-STACK &amp; SYSTEMS</span>
        </div>
      </motion.div>

      {/* ZONE A: Primary Hero Typography & Identity (Completely Above Crowd) */}
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 pt-8 sm:pt-10 md:pt-14 pb-4">
        {/* Editorial Greeting Prefix */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-5 md:mb-7 text-[11px] font-mono tracking-widest text-[#0A0A0A]/70 uppercase"
        >
          <span className="px-3 py-1 rounded border border-[#0A0A0A]/20 bg-white/70 backdrop-blur-sm text-[#0A0A0A] font-bold shadow-sm">
            HELLO WORLD
          </span>
          <span className="text-[#0A0A0A]/30">•</span>
          <span className="text-[#0A0A0A]/80 font-semibold">I&apos;M</span>
        </motion.div>

        {/* Primary Title Row: Solid Black Monumental Typography + 3D Identity Card */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12">
          <ScrollHeading
            isHero
            isMonumental
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="editorial-headline text-[#0A0A0A] font-bold tracking-tighter"
            lines={[
              { text: "SOFTWARE", direction: "left", className: "leading-[0.88] text-[#0A0A0A]" },
              {
                text: "ENGINEER",
                direction: "right",
                className:
                  "leading-[0.88] text-transparent bg-clip-text bg-gradient-to-r from-[#0A0A0A] via-[#1F1E1B] to-[#453F37]",
              },
            ]}
          />

          {/* 3D Minimal Identity Card (Preserved Flip Card Counterweight) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="self-start sm:self-auto lg:self-center shrink-0"
          >
            <IdentityCard3D />
          </motion.div>
        </div>
      </div>

      {/* DELIBERATE VERTICAL BREATHING SPACE BETWEEN TITLE & CROWD */}
      <div className="w-full h-8 sm:h-12 md:h-16 flex-shrink-0" />

      {/* ZONE B: Dedicated Lower Crowd Region (Occupies lower 36–40% of hero, full viewport width) */}
      <div className="relative w-full h-[32vh] sm:h-[36vh] md:h-[40vh] min-h-[240px] max-h-[380px] overflow-hidden select-none bg-[#F5F3EE]">
        {/* Crowd Walking Canvas: Solid Black Line Art Characters against Warm Ivory */}
        <CrowdCanvas
          src="/images/peeps/all-peeps.png"
          rows={15}
          cols={7}
          className="w-full h-full"
        />
      </div>

      {/* Bottom Bar: Explore Projects & Editorial Status */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-full px-6 md:px-12 lg:px-16 xl:px-20 py-4 border-t border-[#0A0A0A]/10 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#0A0A0A]/70 bg-[#F5F3EE]"
      >
        <button
          onClick={scrollToProjects}
          className="group flex items-center space-x-2 text-[#0A0A0A] hover:text-[#453F37] font-semibold transition-colors cursor-pointer focus:outline-none"
        >
          <span>EXPLORE PROJECTS</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1 text-[#0A0A0A]" />
        </button>

        <div className="text-[#0A0A0A]/50 font-mono text-[10px] hidden sm:block">
          PRECISION CRAFT / MONOCHROME EDITORIAL
        </div>
      </motion.div>
    </section>
  );
}
