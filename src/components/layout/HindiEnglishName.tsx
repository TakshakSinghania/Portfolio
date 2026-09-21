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
  const [isEnglish, setIsEnglish] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // If on mobile/touch, toggle name state
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      setIsEnglish((prev) => !prev);
    } else {
      if (onNavigateTop) {
        e.preventDefault();
        onNavigateTop();
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsEnglish((prev) => !prev);
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsEnglish(true)}
      onMouseLeave={() => setIsEnglish(false)}
      className={`group relative text-left select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded px-1 py-0.5 cursor-pointer ${className}`}
      aria-label="Takshak Singhania — Brand Home Link (Hover or tap to toggle Hindi and English)"
      title="तक्षक सिंघानिया / Takshak Singhania"
    >
      <div className="relative h-[34px] w-[130px] overflow-hidden flex flex-col justify-center">
        {/* Hindi Version */}
        <motion.div
          animate={{
            y: isEnglish ? -24 : 0,
            opacity: isEnglish ? 0 : 1,
          }}
          transition={{
            duration: 0.38,
            ease: [0.16, 1, 0.3, 1], // Critically damped Apple curve
          }}
          className="absolute inset-0 flex flex-col justify-center text-[12px] font-medium tracking-[0.06em] text-text-main leading-[1.25]"
        >
          <span className="block font-sans">तक्षक</span>
          <span className="block font-sans text-text-muted">सिंघानिया</span>
        </motion.div>

        {/* English Version */}
        <motion.div
          animate={{
            y: isEnglish ? 0 : 24,
            opacity: isEnglish ? 1 : 0,
          }}
          transition={{
            duration: 0.38,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0 flex flex-col justify-center text-[11px] font-semibold tracking-[0.14em] uppercase text-text-main leading-[1.25]"
        >
          <span className="block">TAKSHAK</span>
          <span className="block text-text-muted">SINGHANIA</span>
        </motion.div>
      </div>

      <span className="sr-only">Takshak Singhania Home</span>
    </button>
  );
}
