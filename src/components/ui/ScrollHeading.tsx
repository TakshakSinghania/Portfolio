"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface ScrollHeadingLine {
  text: React.ReactNode;
  direction?: "left" | "right" | "rotate" | "none";
  className?: string;
}

export interface ScrollHeadingProps {
  lines: ScrollHeadingLine[];
  as?: "h1" | "h2" | "h3" | "div";
  className?: string;
  inline?: boolean;
  isHero?: boolean;
  isMonumental?: boolean;
  fadeOnScroll?: boolean;
  targetRef?: React.RefObject<HTMLElement | null>;
  initial?: any;
  animate?: any;
  transition?: any;
}

export default function ScrollHeading({
  lines,
  as = "div",
  className = "",
  inline = false,
  isHero = false,
  isMonumental = false,
  fadeOnScroll = false,
  targetRef,
  initial,
  animate,
  transition,
}: ScrollHeadingProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const effectiveTarget = targetRef || localRef;

  const [dist, setDist] = useState(isMonumental ? 60 : 35);
  const [rot, setRot] = useState(isMonumental ? -3 : -2);

  useEffect(() => {
    const updateDist = () => {
      const isMobile = window.innerWidth < 768;
      setDist(isMobile ? (isMonumental ? 30 : 18) : isMonumental ? 60 : 35);
      setRot(isMobile ? (isMonumental ? -2 : -1.5) : isMonumental ? -3 : -2);
    };
    updateDist();
    window.addEventListener("resize", updateDist);
    return () => window.removeEventListener("resize", updateDist);
  }, [isMonumental]);

  // Use the exact scroll calculation from the architecture transition
  const { scrollYProgress } = useScroll({
    target: effectiveTarget,
    offset: isHero ? ["start start", "end start"] : ["start end", "end start"],
  });

  const shiftLeft = useTransform(
    scrollYProgress,
    isHero ? [0, 0.4] : [0.1, 0.45],
    [0, -dist]
  );
  const shiftRight = useTransform(
    scrollYProgress,
    isHero ? [0, 0.4] : [0.1, 0.45],
    [0, dist]
  );
  const wordRotate = useTransform(
    scrollYProgress,
    isHero ? [0, 0.4] : [0.1, 0.45],
    [0, rot]
  );
  const opacityFade = useTransform(
    scrollYProgress,
    isHero ? [0.4, 0.6] : [0.35, 0.5],
    [1, fadeOnScroll ? 0.2 : 1]
  );

  const Component =
    as === "h2"
      ? motion.h2
      : as === "h1"
      ? motion.h1
      : as === "h3"
      ? motion.h3
      : motion.div;

  const containerStyle = fadeOnScroll ? { opacity: opacityFade } : undefined;

  return (
    <Component
      ref={targetRef ? undefined : (localRef as any)}
      initial={initial}
      animate={animate}
      transition={transition}
      style={containerStyle}
      className={className}
    >
      {lines.map((line, index) => {
        let style = {};
        if (line.direction === "left") {
          style = { x: shiftLeft };
        } else if (line.direction === "right") {
          style = { x: shiftRight };
        } else if (line.direction === "rotate") {
          style = { rotate: wordRotate };
        }

        return (
          <motion.span
            key={index}
            style={style}
            className={`${inline ? "inline-block" : "block"} ${
              inline && index < lines.length - 1 ? "mr-3 md:mr-4" : ""
            } ${line.className || ""}`}
          >
            {line.text}
          </motion.span>
        );
      })}
    </Component>
  );
}
