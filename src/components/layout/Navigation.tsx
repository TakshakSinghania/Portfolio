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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full ${
        isScrolled
          ? "bg-[#060606]/90 backdrop-blur-md border-b border-surface-border py-4"
          : "bg-transparent py-6 border-b border-[#0A0A0A]/10"
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 flex items-center justify-between">
        {/* Left: Signature Brand Name */}
        <HindiEnglishName
          isScrolled={isScrolled}
          onNavigateTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        {/* Right: Desktop Editorial Navigation */}
        <nav
          className="hidden md:flex items-center space-x-8 text-[11px] font-mono tracking-widest"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative py-1 focus:outline-none group transition-colors duration-200 ${
                isScrolled
                  ? "text-text-muted hover:text-beige"
                  : "text-[#0A0A0A]/70 hover:text-[#0A0A0A] font-semibold"
              }`}
            >
              <span>{link.label}</span>
              <span
                className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-200 group-hover:w-full ${
                  isScrolled ? "bg-beige" : "bg-[#0A0A0A]"
                }`}
              />
            </button>
          ))}

          <button
            onClick={onOpenResume}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded transition-all duration-200 font-semibold focus:outline-none ${
              isScrolled
                ? "text-beige hover:text-white border border-beige/25 hover:border-beige/50"
                : "text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F5F3EE] border border-[#0A0A0A]/25"
            }`}
            aria-label="View Takshak Singhania Resume"
          >
            <span>RESUME</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={onOpenResume}
            className={`text-[10px] font-mono px-2 py-1 rounded border font-semibold ${
              isScrolled
                ? "border-surface-border text-beige"
                : "border-[#0A0A0A]/25 text-[#0A0A0A]"
            }`}
          >
            RESUME ↗
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 focus:outline-none ${
              isScrolled ? "text-white" : "text-[#0A0A0A]"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Refined Mobile Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-6 py-6 border-b transition-all ${
            isScrolled
              ? "bg-[#0D0D0E]/95 backdrop-blur-xl border-surface-border"
              : "bg-[#F5F3EE] border-[#0A0A0A]/10 text-[#0A0A0A]"
          }`}
        >
          <div className="flex flex-col space-y-4 text-xs font-mono tracking-widest">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left py-1 transition-colors ${
                  isScrolled
                    ? "text-text-muted hover:text-white"
                    : "text-[#0A0A0A]/80 hover:text-[#0A0A0A] font-semibold"
                }`}
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
