"use client";

import React from "react";
import ScrollHeading from "@/components/ui/ScrollHeading";
import { RESUME_DATA } from "@/data/resume";
import { ArrowUpRight, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="w-full py-24 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 border-t border-surface-border">
      {/* Monumental Editorial Headline */}
      <div className="py-12 select-none">
        <div className="text-[11px] font-mono tracking-widest text-text-muted mb-4">
          03 // CONTACT &amp; COLLABORATION
        </div>

        <ScrollHeading
          isMonumental
          className="editorial-headline text-white font-bold leading-[0.88] tracking-tighter"
          lines={[
            { text: "LET'S", direction: "left" },
            { text: "BUILD", direction: "rotate", className: "text-text-muted" },
            {
              text: "SOMETHING.",
              direction: "right",
              className:
                "text-transparent bg-clip-text bg-gradient-to-r from-white via-beige to-text-muted",
            },
          ]}
        />
      </div>

      {/* Verified Contact Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 pb-16 border-t border-surface-border font-mono text-xs">
        <a
          href={`mailto:${RESUME_DATA.contact.email}`}
          className="p-5 rounded bg-surface border border-surface-border hover:border-beige/40 transition-all group flex flex-col justify-between h-32"
        >
          <div className="text-[10px] text-text-subtle tracking-widest uppercase">
            EMAIL DIRECT
          </div>
          <div className="flex items-center justify-between text-white font-bold group-hover:text-beige transition-colors">
            <span className="truncate">{RESUME_DATA.contact.email}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 ml-1 text-beige" />
          </div>
        </a>

        <a
          href={RESUME_DATA.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded bg-surface border border-surface-border hover:border-beige/40 transition-all group flex flex-col justify-between h-32"
        >
          <div className="text-[10px] text-text-subtle tracking-widest uppercase">
            GITHUB PROFILE
          </div>
          <div className="flex items-center justify-between text-white font-bold group-hover:text-beige transition-colors">
            <span>TakshakSinghania</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-beige" />
          </div>
        </a>

        <a
          href={RESUME_DATA.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded bg-surface border border-surface-border hover:border-beige/40 transition-all group flex flex-col justify-between h-32"
        >
          <div className="text-[10px] text-text-subtle tracking-widest uppercase">
            LINKEDIN NETWORK
          </div>
          <div className="flex items-center justify-between text-white font-bold group-hover:text-beige transition-colors">
            <span className="truncate">takshak-singhania-a67661292</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 ml-1 text-beige" />
          </div>
        </a>

        <a
          href={RESUME_DATA.contact.codechef}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded bg-surface border border-surface-border hover:border-beige/40 transition-all group flex flex-col justify-between h-32"
        >
          <div className="text-[10px] text-text-subtle tracking-widest uppercase">
            CODECHEF 3-STAR
          </div>
          <div className="flex items-center justify-between text-white font-bold group-hover:text-beige transition-colors">
            <span>takshak19</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-beige" />
          </div>
        </a>
      </div>

      {/* Sub-Footer Identity Bar */}
      <div className="pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-text-muted">
        <div className="flex items-center space-x-3">
          <span className="text-white font-bold">तक्षक सिंघानिया</span>
          <span className="text-text-subtle">/</span>
          <span className="text-beige/90">TAKSHAK SINGHANIA</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center space-x-2 text-text-main hover:text-beige transition-colors cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-beige" />
        </button>
      </div>
    </footer>
  );
}
