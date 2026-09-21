"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CardDepthToy() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [specular, setSpecular] = useState({ x: 50, y: 50, opacity: 0 });

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);

  const springRotX = useSpring(rotX, { damping: 20, stiffness: 200 });
  const springRotY = useSpring(rotY, { damping: 20, stiffness: 200 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    rotY.set(normX * 18);
    rotX.set(-normY * 18);

    setSpecular({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
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
      className="w-full h-72 flex items-center justify-center perspective-1000 p-4 select-none"
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-64 h-40 rounded-xl p-5 bg-gradient-to-br from-neutral-900 to-black border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Dynamic Specular Sheen */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${specular.x}% ${specular.y}%, rgba(255,255,255,${specular.opacity}), transparent 60%)`,
          }}
        />

        {/* Card Header */}
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-white/50">
          <span>SPATIAL TENSOR</span>
          <span>CSS 3D MATRIX</span>
        </div>

        {/* Center Hologram Mark */}
        <div className="text-center">
          <div className="text-xs font-mono font-bold tracking-widest text-white">
            TAKSHAK SINGHANIA
          </div>
          <div className="text-[9px] font-mono text-white/40 mt-0.5">
            23.2599° N // 77.4126° E
          </div>
        </div>

        {/* Card Bottom */}
        <div className="flex justify-between items-center text-[9px] font-mono text-white/60">
          <span>DAMPING: 20</span>
          <span>STIFFNESS: 200</span>
        </div>
      </motion.div>
    </div>
  );
}
