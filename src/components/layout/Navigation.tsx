"use client";

import React, { useState, useEffect } from "react";
import HindiEnglishName from "./HindiEnglishName";
import { ArrowUpRight, Menu, X } from "lucide-react";

interface NavigationProps {
  onOpenResume?: () => void;
}

export default function Navigation({ onOpenResume }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "ABOUT", id: "about" },
    { label: "PROJECTS", id: "projects" },
    { label: "CONTACT", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-base/80 backdrop-blur-md border-b border-surface-border py-4"
          : "bg-transparent py-7"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Signature Brand Name */}
        <HindiEnglishName
          onNavigateTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        {/* Right: Desktop Editorial Navigation */}
        <nav
          className="hidden md:flex items-center space-x-7 text-[11px] font-mono tracking-widest text-text-muted"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="relative text-text-muted hover:text-text-main transition-colors duration-200 py-1 focus:outline-none focus-visible:text-text-main group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full" />
            </button>
          ))}

          <button
            onClick={onOpenResume}
            className="flex items-center space-x-1 text-text-main hover:text-white px-2.5 py-1 border border-surface-border hover:border-surface-border-bright rounded transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
            aria-label="View Takshak Singhania Resume"
          >
            <span>RESUME</span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={onOpenResume}
            className="text-[10px] font-mono px-2 py-1 border border-surface-border text-text-main rounded"
          >
            RESUME ↗
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-text-main hover:text-white focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Refined Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-surface-border px-6 py-6 transition-all">
          <div className="flex flex-col space-y-4 text-xs font-mono tracking-widest">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-text-muted hover:text-white py-1 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
