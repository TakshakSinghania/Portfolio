"use client";

import React, { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import CustomCursor from "@/components/layout/CustomCursor";
import Hero from "@/components/hero/Hero";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ArchitectureSection from "@/components/architecture/ArchitectureSection";
import ExperimentsSection from "@/components/experiments/ExperimentsSection";
import AboutSection from "@/components/about/AboutSection";
import Footer from "@/components/layout/Footer";
import ResumeViewer from "@/components/about/ResumeViewer";

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);

  const jumpToArchitecture = () => {
    const el = document.getElementById("architecture");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative bg-base text-text-main min-h-screen overflow-x-hidden selection:bg-white selection:text-black">
      {/* Desktop Contextual Cursor */}
      <CustomCursor />

      {/* Persistent Minimal Header */}
      <Navigation onOpenResume={() => setResumeOpen(true)} />

      {/* Section 01: Monumental Hero */}
      <Hero />

      {/* Section 02: 3D Orbital Projects & Scattered Grid */}
      <ProjectsSection onJumpToArchitecture={jumpToArchitecture} />

      {/* Section 03: Editorial Typography Transition & Interactive Architecture */}
      <ArchitectureSection />

      {/* Section 04: Creative Coding Experiments Archive */}
      <ExperimentsSection />

      {/* Section 05: Profile, Leadership & Technical Taxonomy */}
      <AboutSection onOpenResume={() => setResumeOpen(true)} />

      {/* Section 06: Minimalist Editorial Footer */}
      <Footer />

      {/* In-Page Resume PDF Viewer Modal */}
      <ResumeViewer
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </main>
  );
}
