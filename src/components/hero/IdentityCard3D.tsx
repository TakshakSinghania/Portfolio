"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function IdentityCard3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [specular, setSpecular] = useState({ x: 50, y: 50, opacity: 0 });

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);

  // Smooth Apple-grade spring physics for mouse tilt
  const springRotX = useSpring(rotX, { damping: 24, stiffness: 220 });
  const springRotY = useSpring(rotY, { damping: 24, stiffness: 220 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    rotY.set(normX * 12);
    rotX.set(-normY * 12);

    setSpecular({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handlePointerLeave = () => {
    rotX.set(0);
    rotY.set(0);
    setSpecular((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="perspective-1000 select-none flex items-center justify-center p-2"
    >
      <motion.div
        ref={cardRef}
        onClick={handleFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleFlip();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Personal identity card. Click to flip between English and Hindi."
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-56 sm:w-64 h-32 sm:h-36 rounded-lg bg-gradient-to-br from-[#161514] via-[#0F0E0D] to-[#080707] border border-beige/15 shadow-2xl overflow-hidden cursor-pointer transition-[border-color,box-shadow] duration-300 hover:border-beige/35 hover:shadow-tactile-hover focus:outline-none focus-visible:ring-1 focus-visible:ring-beige"
      >
        {/* Dynamic Specular Sheen */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${specular.x}% ${specular.y}%, rgba(231,224,210,${specular.opacity}), transparent 60%)`,
          }}
        />

        {/* Top Edge Refraction Catch */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-beige/30 to-transparent" />

        {/* 3D Flipping Content Wrapper */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full h-full"
        >
          {/* Front Face: English TAKSHAK SINGHANIA */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
            <div className="text-sm sm:text-base font-bold tracking-[0.18em] text-[#F5F5F5] uppercase font-sans">
              TAKSHAK
            </div>
            <div className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-white uppercase font-sans mt-0.5">
              SINGHANIA
            </div>
            <div className="text-[9px] font-mono tracking-widest text-text-subtle mt-2 opacity-60">
              CLICK TO FLIP
            </div>
          </div>

          {/* Back Face: Hindi तक्षक सिंघानिया */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="text-base sm:text-lg font-bold tracking-wider text-white">
              तक्षक
            </div>
            <div className="text-sm sm:text-base font-medium tracking-wider text-[#F5F5F5] mt-0.5">
              सिंघानिया
            </div>
            <div className="text-[9px] font-mono tracking-widest text-text-subtle mt-2 opacity-60">
              CLICK TO FLIP
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
