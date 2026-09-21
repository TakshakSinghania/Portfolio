"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function IdentityCard3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [specular, setSpecular] = useState({ x: 50, y: 50, opacity: 0 });

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);

  // Smooth Apple-grade spring physics
  const springRotX = useSpring(rotX, { damping: 24, stiffness: 220 });
  const springRotY = useSpring(rotY, { damping: 24, stiffness: 220 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    rotY.set(normX * 14);
    rotX.set(-normY * 14);

    setSpecular({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.3,
    });
  };

  const handlePointerLeave = () => {
    rotX.set(0);
    rotY.set(0);
    setSpecular((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="perspective-1000 select-none flex items-center justify-center p-2"
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-52 sm:w-64 h-32 sm:h-36 rounded-lg p-6 bg-gradient-to-br from-[#141416] via-[#0d0d0f] to-[#060608] border border-white/15 shadow-2xl flex flex-col justify-center items-center overflow-hidden transition-all duration-300 hover:border-white/30"
      >
        {/* Dynamic Specular Sheen */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${specular.x}% ${specular.y}%, rgba(255,255,255,${specular.opacity}), transparent 60%)`,
          }}
        />

        {/* Top Edge Refraction Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Pure Personal Identity Typography */}
        <div className="text-center relative z-10 space-y-1">
          <div className="text-sm sm:text-base font-bold tracking-[0.18em] text-white uppercase font-sans">
            TAKSHAK
          </div>
          <div className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-neutral-400 uppercase font-sans">
            SINGHANIA
          </div>
        </div>
      </motion.div>
    </div>
  );
}
