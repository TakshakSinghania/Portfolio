"use client";

import React from "react";
import { RESUME_DATA } from "@/data/resume";
import { ArrowUpRight, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-surface-border">
      {/* Monumental Editorial Headline */}
      <div className="py-12 select-none">
        <div className="text-[11px] font-mono tracking-widest text-text-muted mb-4">
          05 // CONTACT &amp; COLLABORATION
        </div>

        <div className="editorial-headline text-white font-bold leading-[0.88] tracking-tighter">
          <span className="block">LET&apos;S</span>
          <span className="block">BUILD</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
            SOMETHING.
          </span>
        </div>
      </div>

      {/* Verified Contact Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 pb-16 border-t border-surface-border font-mono text-xs">
        <a
          href={`mailto:${RESUME_DATA.contact.email}`}
          className="p-5 rounded bg-surface border border-surface-border hover:border-white transition-all group flex flex-col justify-between h-32"
        >
          <div className="text-[10px] text-text-subtle tracking-widest uppercase">
            EMAIL DIRECT
          </div>
          <div className="flex items-center justify-between text-white font-bold group-hover:text-white">
            <span className="truncate">{RESUME_DATA.contact.email}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 ml-1" />
          </div>
        </a>

        <a
          href={RESUME_DATA.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded bg-surface border border-surface-border hover:border-white transition-all group flex flex-col justify-between h-32"
        >
          <div className="text-[10px] text-text-subtle tracking-widest uppercase">
            GITHUB PROFILE
          </div>
          <div className="flex items-center justify-between text-white font-bold">
            <span>TakshakSinghania</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </a>

        <a
          href={RESUME_DATA.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded bg-surface border border-surface-border hover:border-white transition-all group flex flex-col justify-between h-32"
        >
          <div className="text-[10px] text-text-subtle tracking-widest uppercase">
            LINKEDIN NETWORK
          </div>
          <div className="flex items-center justify-between text-white font-bold">
            <span>takshak-singhania</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </a>

        <a
          href={RESUME_DATA.contact.codechef}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded bg-surface border border-surface-border hover:border-white transition-all group flex flex-col justify-between h-32"
        >
          <div className="text-[10px] text-text-subtle tracking-widest uppercase">
            CODECHEF 3-STAR
          </div>
          <div className="flex items-center justify-between text-white font-bold">
            <span>takshak19</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </a>
      </div>

      {/* Sub-Footer Identity Bar */}
      <div className="pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-text-muted">
        <div className="flex items-center space-x-3">
          <span className="text-white font-bold">तक्षक सिंघानिया</span>
          <span className="text-text-subtle">/</span>
          <span>TAKSHAK SINGHANIA</span>
          <span className="text-text-subtle">•</span>
          <span>EST. 2024–2027</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center space-x-2 text-text-main hover:text-white transition-colors cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
