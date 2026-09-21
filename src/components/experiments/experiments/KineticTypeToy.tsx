"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, RotateCcw } from "lucide-react";

export default function KineticTypeToy() {
  const [scattered, setScattered] = useState(false);
  const text = "SWISS // SYSTEMS // EXPERIMENT";
  const letters = text.split("");

  const triggerScatter = () => {
    setScattered(true);
    setTimeout(() => setScattered(false), 800);
  };

  return (
    <div className="w-full space-y-4 select-none">
      {/* Canvas */}
      <div className="h-28 p-4 rounded bg-black/60 border border-surface-border flex items-center justify-center overflow-hidden">
        <div className="flex flex-wrap justify-center items-center gap-1.5 font-mono text-sm sm:text-base font-bold text-white tracking-widest">
          {letters.map((char, index) => {
            if (char === " ") {
              return <span key={index} className="w-2" />;
            }

            // Calculate random displacement when scattered
            const randX = (Math.sin(index * 99) * 60);
            const randY = (Math.cos(index * 77) * 40);
            const randRot = (Math.sin(index * 33) * 45);

            return (
              <motion.span
                key={index}
                animate={{
                  x: scattered ? randX : 0,
                  y: scattered ? randY : 0,
                  rotate: scattered ? randRot : 0,
                  color: scattered ? "#6492b3" : "#F5F5F7",
                }}
                whileHover={{
                  y: -10,
                  color: "#FFFFFF",
                  scale: 1.25,
                }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 300,
                }}
                className="inline-block cursor-pointer p-0.5"
              >
                {char}
              </motion.span>
            );
          })}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={triggerScatter}
          className="flex items-center space-x-2 px-3.5 py-1.5 bg-white text-black font-semibold rounded text-xs font-mono hover:bg-neutral-200 transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span>SCATTER LETTERS</span>
        </button>

        <span className="text-[10px] font-mono text-text-subtle">
          MAGNETIC SPRING REASSEMBLY
        </span>
      </div>
    </div>
  );
}
