"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, type Variants } from "framer-motion";

interface Skiper8Props {
  onComplete?: () => void;
}

const WORDS = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "Hallo",
];

const BEZIER_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export function Skiper8({ onComplete }: Skiper8Props) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    const updateDimensions = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Prevent body scroll while preloader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("resize", updateDimensions);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Check reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Cycle through greetings sequence exactly like original Skiper8 / Dennis Snellenberg
  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        if (!hasFinishedRef.current) {
          hasFinishedRef.current = true;
          onComplete?.();
        }
      }, 500);
      return () => clearTimeout(timer);
    }

    if (index === WORDS.length - 1) {
      const exitTimer = setTimeout(() => {
        if (!hasFinishedRef.current) {
          hasFinishedRef.current = true;
          onComplete?.();
        }
      }, 350);
      return () => clearTimeout(exitTimer);
    }

    const nextTimer = setTimeout(
      () => {
        setIndex((prev) => prev + 1);
      },
      index === 0 ? 1000 : 150
    );

    return () => clearTimeout(nextTimer);
  }, [index, prefersReducedMotion, onComplete]);

  // SVG curved path calculation for signature Dennis Snellenberg / Skiper8 exit
  const width = dimension.width || 1920;
  const height = dimension.height || 1080;

  const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${
    height + 300
  } 0 ${height} L0 0`;
  const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;

  const slideUp: Variants = {
    initial: {
      top: 0,
    },
    exit: {
      top: "-100vh",
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.85,
        ease: BEZIER_EASE,
        delay: 0.15,
      },
    },
  };

  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: BEZIER_EASE },
    },
    exit: {
      d: targetPath,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.75,
        ease: BEZIER_EASE,
        delay: 0.2,
      },
    },
  };

  const textOpacity: Variants = {
    initial: {
      opacity: 0,
      y: 8,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
    },
  };

  return (
    <motion.aside
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-x-0 top-0 h-screen z-[9999] flex items-center justify-center bg-[#F5F3EE] select-none cursor-wait overflow-hidden"
      aria-label="Loading greetings"
      role="status"
    >
      {dimension.width > 0 && (
        <>
          {/* Centered Multilingual Greetings Cycle */}
          <div className="relative z-10 flex items-center justify-center px-6">
            <motion.p
              variants={textOpacity}
              initial="initial"
              animate="enter"
              className="flex items-center text-3xl sm:text-5xl md:text-6xl font-sans font-medium tracking-tight text-[#0A0A0A]"
            >
              <span className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#0A0A0A] mr-3 sm:mr-4 shrink-0" />
              <span>{WORDS[index]}</span>
            </motion.p>
          </div>

          {/* Dennis Snellenberg curved SVG exit mask matching hero background */}
          <svg
            className="absolute top-0 left-0 w-full pointer-events-none"
            style={{ height: "calc(100% + 300px)" }}
            aria-hidden="true"
          >
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill="#F5F3EE"
            />
          </svg>
        </>
      )}
    </motion.aside>
  );
}

export default Skiper8;
