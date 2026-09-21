"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface HindiEnglishNameProps {
  className?: string;
  onNavigateTop?: () => void;
}

export default function HindiEnglishName({
  className = "",
  onNavigateTop,
}: HindiEnglishNameProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateTop) {
      onNavigateTop();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e as any);
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative text-left select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded px-1 py-0.5 cursor-pointer ${className}`}
      aria-label="Takshak Singhania — Brand Home Link"
      title="Takshak Singhania / तक्षक सिंघानिया"
    >
      <div className="relative h-[34px] w-[130px] overflow-hidden flex flex-col justify-center">
        {/* English Version (Primary / Default State) */}
        <motion.div
          animate={{
            y: isHovered ? -22 : 0,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{
            duration: 0.32,
            ease: [0.16, 1, 0.3, 1], // Critically damped Apple spring curve
          }}
          className="absolute inset-0 flex flex-col justify-center text-[11px] font-semibold tracking-[0.14em] uppercase leading-[1.25]"
        >
          <span className="block text-[#F5F5F7]">TAKSHAK</span>
          <span className="block text-text-muted">SINGHANIA</span>
        </motion.div>

        {/* Hindi Version (Hover State) */}
        <motion.div
          animate={{
            y: isHovered ? 0 : 22,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.32,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0 flex flex-col justify-center text-[12px] font-medium tracking-[0.06em] leading-[1.25]"
        >
          <span className="block font-sans text-text-muted">तक्षक</span>
          <span className="block font-sans text-[#F5F5F7]">सिंघानिया</span>
        </motion.div>
      </div>

      <span className="sr-only">Takshak Singhania Home</span>
    </button>
  );
}
