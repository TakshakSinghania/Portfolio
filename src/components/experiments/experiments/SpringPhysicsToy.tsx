"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function SpringPhysicsToy() {
  const [dampingRatio, setDampingRatio] = useState<number>(0.8);
  const [response, setResponse] = useState<number>(0.35);
  const [boxPosition, setBoxPosition] = useState<number>(0);

  // Map damping ratio and response to mass, stiffness, damping
  // response = 2 * pi * sqrt(m / k) -> k = m * (2 * pi / response)^2
  // dampingRatio = c / (2 * sqrt(m * k)) -> c = 2 * dampingRatio * sqrt(m * k)
  const mass = 1;
  const stiffness = mass * Math.pow((2 * Math.PI) / Math.max(0.1, response), 2);
  const damping = 2 * dampingRatio * Math.sqrt(mass * stiffness);

  const toggleTarget = () => {
    setBoxPosition((prev) => (prev === 0 ? 180 : 0));
  };

  return (
    <div className="w-full space-y-4 select-none">
      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 rounded bg-black/60 border border-surface-border text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-text-muted">DAMPING RATIO (ζ):</span>
            <span className="text-white font-bold">{dampingRatio.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.4"
            max="1.4"
            step="0.05"
            value={dampingRatio}
            onChange={(e) => setDampingRatio(parseFloat(e.target.value))}
            className="w-full accent-white"
          />
          <div className="flex justify-between text-[9px] text-text-subtle">
            <span>BOUNCY (0.4)</span>
            <span>CRITICAL (1.0)</span>
            <span>OVERDAMPED</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-text-muted">RESPONSE TIME:</span>
            <span className="text-white font-bold">{response.toFixed(2)}s</span>
          </div>
          <input
            type="range"
            min="0.15"
            max="0.8"
            step="0.05"
            value={response}
            onChange={(e) => setResponse(parseFloat(e.target.value))}
            className="w-full accent-white"
          />
          <div className="flex justify-between text-[9px] text-text-subtle">
            <span>SNAPPY (0.15s)</span>
            <span>LEISURELY (0.8s)</span>
          </div>
        </div>
      </div>

      {/* Physics Stage */}
      <div className="relative h-24 p-4 rounded bg-black/40 border border-surface-border flex items-center overflow-hidden">
        {/* Track Line */}
        <div className="absolute left-6 right-6 h-[1px] bg-neutral-800" />

        {/* Moving Spring Element */}
        <motion.div
          animate={{ x: boxPosition }}
          transition={{
            type: "spring",
            mass,
            stiffness,
            damping,
          }}
          className="relative z-10 w-16 h-14 rounded bg-white text-black font-mono font-bold text-xs flex items-center justify-center shadow-tactile cursor-pointer"
          onClick={toggleTarget}
        >
          DRAG
        </motion.div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={toggleTarget}
          className="flex items-center space-x-2 px-3.5 py-1.5 bg-white text-black font-semibold rounded text-xs font-mono hover:bg-neutral-200 transition-colors"
        >
          <Play className="w-3 h-3" />
          <span>FIRE SPRING IMPULSE</span>
        </button>

        <span className="text-[10px] font-mono text-text-subtle">
          WWDC FLUID INTERFACES SIMULATOR
        </span>
      </div>
    </div>
  );
}
