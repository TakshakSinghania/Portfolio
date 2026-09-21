"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "action">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for cursor follower
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Listen for custom cursor data attributes
    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (target) {
        const text = target.getAttribute("data-cursor") || "";
        setCursorText(text);
        setCursorVariant("action");
      } else {
        const isClickable = (e.target as HTMLElement)?.closest("a, button, [role='button']");
        if (isClickable) {
          setCursorText("");
          setCursorVariant("hover");
        } else {
          setCursorText("");
          setCursorVariant("default");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorVariant === "action" ? 1 : cursorVariant === "hover" ? 1.4 : 1,
          width: cursorVariant === "action" ? "auto" : 12,
          height: cursorVariant === "action" ? 30 : 12,
          backgroundColor: cursorVariant === "action" ? "rgba(245, 245, 247, 0.95)" : "#F5F5F7",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className={`flex items-center justify-center rounded-full mix-blend-difference ${
          cursorVariant === "action" ? "px-3 shadow-lg" : ""
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-semibold tracking-wider text-black select-none uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}
