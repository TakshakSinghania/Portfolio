"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

interface CardSpec {
  id: string;
  title: string;
  category: string;
  src: string;
  aspect: string;
  initialRotate: number;
  initialX: number;
  initialY: number;
  zIndex: number;
  depth: number;
}

const CARDS: CardSpec[] = [
  {
    id: "photo-1",
    title: "STRUCTURE // 01",
    category: "BRUTALIST CONCRETE",
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    aspect: "aspect-[3/4]",
    initialRotate: -5,
    initialX: -140,
    initialY: -20,
    zIndex: 1,
    depth: 30,
  },
  {
    id: "photo-2",
    title: "SILICON // 02",
    category: "SYSTEM HARDWARE",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    aspect: "aspect-[4/5]",
    initialRotate: 3,
    initialX: 30,
    initialY: 40,
    zIndex: 3,
    depth: 65,
  },
  {
    id: "photo-3",
    title: "SENTOSA // 03",
    category: "TACTILE CRAFT",
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
    aspect: "aspect-[3/4]",
    initialRotate: 8,
    initialX: 180,
    initialY: -60,
    zIndex: 2,
    depth: 45,
  },
];

export default function SpatialPhotoCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apple-grade critically damped spring for parallax
  const springX = useSpring(mouseX, { damping: 25, stiffness: 180 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 180 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize between -1 and 1
      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = (e.clientY - centerY) / (rect.height / 2);

      // Restrain tilt to max ±5 degrees
      mouseX.set(Math.max(-1, Math.min(1, normX)) * 5);
      mouseY.set(Math.max(-1, Math.min(1, normY)) * -5);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] md:h-[540px] flex items-center justify-center perspective-1200 select-none pointer-events-auto"
      data-cursor="TILT"
    >
      <motion.div
        style={{
          rotateY: springX,
          rotateX: springY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-[300px] md:w-[380px] h-[360px] md:h-[440px] flex items-center justify-center"
      >
        {CARDS.map((card, index) => {
          const isHovered = hoveredCard === card.id;

          return (
            <motion.div
              key={card.id}
              initial={{
                opacity: 0,
                y: 80,
                scale: 0.9,
                rotateZ: card.initialRotate * 1.5,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateZ: card.initialRotate,
              }}
              transition={{
                duration: 1.1,
                delay: 0.3 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                x: card.initialX,
                y: card.initialY,
                zIndex: isHovered ? 20 : card.zIndex,
                transform: `translateZ(${isHovered ? card.depth + 40 : card.depth}px)`,
                transformStyle: "preserve-3d",
              }}
              className="absolute w-[180px] sm:w-[220px] md:w-[260px] rounded-sm p-2 bg-[#0d0d0d] border border-white/10 shadow-tactile transition-all duration-300 hover:border-white/25 cursor-grab active:cursor-grabbing group"
            >
              {/* Image Frame with Specular Top Edge */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-black rounded-[2px] filter grayscale contrast-125 transition-all duration-500 group-hover:contrast-110">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 220px, 260px"
                  className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={index === 1}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                
                {/* Miniature label embedded in photograph */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-end text-[9px] font-mono tracking-widest text-white/80">
                  <span>{card.title}</span>
                  <span className="text-white/40">{card.category}</span>
                </div>
              </div>

              {/* Physical Border Sheen */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
