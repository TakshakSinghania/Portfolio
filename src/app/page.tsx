"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Skiper8 } from "@/components/ui/skiper-ui/skiper8";
import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/hero/Hero";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ArchitectureSection from "@/components/architecture/ArchitectureSection";
import AboutSection from "@/components/about/AboutSection";
import Footer from "@/components/layout/Footer";
import ResumeViewer from "@/components/about/ResumeViewer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      {/* Site-Level Fullscreen Skiper8 Words Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Skiper8
            key="skiper8-preloader"
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      <main className="relative bg-base text-text-main min-h-screen overflow-x-hidden selection:bg-white selection:text-black">
        {/* Persistent Minimal Header */}
        <Navigation onOpenResume={() => setResumeOpen(true)} />

        {/* Monumental Hero with 3D Identity Card & Full-Width Crowd */}
        <Hero />

        {/* Section 01: 3D Orbital Projects & Scattered Grid */}
        <ProjectsSection />

        {/* Standalone Editorial Transition: "BACKEND? THAT'S A TOMORROW PROBLEM." */}
        <ArchitectureSection />

        {/* Section 02: Profile, Education, LeetCode, CodeChef & Technical Taxonomy */}
        <AboutSection onOpenResume={() => setResumeOpen(true)} />

        {/* Section 03: Minimalist Editorial Contact Footer */}
        <Footer />

        {/* In-Page Resume PDF Viewer Modal */}
        <ResumeViewer
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </main>
    </>
  );
}
