"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface HindiEnglishNameProps {
  className?: string;
  onNavigateTop?: () => void;
  isScrolled?: boolean;
}

export default function HindiEnglishName({
  className = "",
  onNavigateTop,
  isScrolled = false,
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

  const primaryTextColor = isScrolled ? "text-[#F5F5F7]" : "text-[#0A0A0A]";
  const secondaryTextColor = isScrolled ? "text-text-muted" : "text-[#0A0A0A]/60";

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative text-left select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-black/40 rounded px-1 py-0.5 cursor-pointer ${className}`}
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
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0 flex flex-col justify-center text-[11px] font-semibold tracking-[0.14em] uppercase leading-[1.25]"
        >
          <span className={`block font-bold ${primaryTextColor}`}>TAKSHAK</span>
          <span className={`block ${secondaryTextColor}`}>SINGHANIA</span>
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
          <span className={`block font-sans ${secondaryTextColor}`}>तक्षक</span>
          <span className={`block font-sans font-bold ${primaryTextColor}`}>सिंघानिया</span>
        </motion.div>
      </div>

      <span className="sr-only">Takshak Singhania Home</span>
    </button>
  );
}
