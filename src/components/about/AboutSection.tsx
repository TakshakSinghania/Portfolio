"use client";

import React from "react";
import ScrollHeading from "@/components/ui/ScrollHeading";
import { RESUME_DATA } from "@/data/resume";
import { ArrowUpRight, Award, GraduationCap, Download, Code } from "lucide-react";

interface AboutSectionProps {
  onOpenResume: () => void;
}

export default function AboutSection({ onOpenResume }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="w-full py-24 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 border-t border-surface-border"
    >
      {/* Section Header */}
      <div className="pb-8 border-b border-surface-border">
        <div className="text-[11px] font-mono tracking-widest text-text-muted mb-2">
          02 // PROFILE &amp; BACKGROUND
        </div>
        <ScrollHeading
          as="h2"
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white leading-[0.92]"
          lines={[
            { text: "ABOUT", direction: "left" },
            {
              text: "& EXPERIENCE",
              direction: "right",
              className: "pl-6 sm:pl-12 md:pl-20 text-beige",
            },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
        {/* Left Column: Bio & Core Focus */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Takshak Singhania
            </h3>
            <p className="text-base text-text-muted leading-relaxed">
              {RESUME_DATA.summary}
            </p>
          </div>

          {/* Education */}
            <div className="p-6 rounded bg-surface border border-surface-border space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-text-muted">
                <GraduationCap className="w-4 h-4 text-beige" />
                <span>EDUCATION</span>
              </div>
              <div className="text-base font-bold text-white">
                {RESUME_DATA.education[0].institution}
              </div>
              <div className="text-xs text-text-muted">
                {RESUME_DATA.education[0].degree}
              </div>
              <div className="text-[11px] font-mono text-text-subtle">
                {RESUME_DATA.education[0].period}
              </div>
              <div className="pt-2 text-xs text-text-muted">
                <span className="font-semibold text-beige">Coursework:</span>{" "}
                {RESUME_DATA.education[0].coursework.join(", ")}
              </div>
            </div>

            {/* Resume Actions */}
            <div className="flex items-center space-x-4 pt-2">
              <button
                onClick={onOpenResume}
                className="flex items-center space-x-2 px-4 py-2 bg-beige text-black font-semibold rounded text-xs font-mono tracking-wider hover:bg-beige-warm transition-colors"
              >
                <span>VIEW RESUME</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="/resume.pdf"
                download="Takshak_Singhania_Resume.pdf"
                className="flex items-center space-x-2 px-4 py-2 border border-surface-border hover:border-beige text-text-main rounded text-xs font-mono tracking-wider transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-beige" />
                <span>DOWNLOAD RESUME</span>
              </a>
            </div>
        </div>

        {/* Right Column: Skills Matrix & Achievements */}
        <div className="lg:col-span-6 space-y-8">
          {/* Competitive Achievements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RESUME_DATA.achievements.map((ach) => (
              <div
                key={ach.platform}
                className="p-5 rounded bg-surface border border-surface-border space-y-2"
              >
                <div className="flex items-center space-x-1.5 text-xs font-mono text-amber-400">
                  <Award className="w-3.5 h-3.5" />
                  <span>{ach.platform}</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {ach.headline}
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {ach.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Technical Skills Hierarchy */}
          <div className="p-6 rounded bg-surface border border-surface-border space-y-6">
            <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-text-muted">
              <Code className="w-4 h-4 text-white" />
              <span>TECHNICAL TAXONOMY</span>
            </div>

            <div className="space-y-5">
              {RESUME_DATA.skills.map((cat) => (
                <div key={cat.title} className="space-y-2">
                  <div className="text-[10px] font-mono tracking-widest text-text-subtle uppercase">
                    {cat.title}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((sk) => (
                      <span
                        key={sk}
                        className="px-2.5 py-1 rounded bg-black/60 border border-surface-border text-xs font-mono text-neutral-300"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
