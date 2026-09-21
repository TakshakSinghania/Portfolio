"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText } from "lucide-react";

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      const scrollY = window.scrollY;

      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.stop();
      }

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);

        const savedTop = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        const y = parseInt(savedTop || "0", 10) * -1;
        window.scrollTo(0, y);

        const currentLenis = (window as any).__lenis;
        if (currentLenis) {
          currentLenis.start();
          currentLenis.scrollTo(y, { immediate: true });
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-xl overflow-hidden">
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
          aria-hidden="true"
        />

        <motion.div
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl h-[90vh] rounded bg-surface border border-surface-border flex flex-col z-10 overflow-hidden shadow-2xl"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
            <div className="flex items-center space-x-2 text-xs font-mono text-white">
              <FileText className="w-4 h-4 text-text-muted" />
              <span className="font-bold">Takshak_Singhania_Resume.pdf</span>
              <span className="text-text-subtle text-[10px] hidden sm:inline">
                {"//"} IIIT BHOPAL
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href="/resume.pdf"
                download="Takshak_Singhania_Resume.pdf"
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-white text-black hover:bg-neutral-200 rounded text-xs font-mono font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD</span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 border border-surface-border text-text-muted hover:text-white rounded transition-colors hidden sm:block"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="p-1.5 border border-surface-border text-text-muted hover:text-white rounded transition-colors cursor-pointer"
                aria-label="Close resume viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Embedded PDF Viewer */}
          <div className="flex-1 w-full bg-neutral-900 overflow-hidden">
            <iframe
              src="/resume.pdf#toolbar=0&navpanes=0"
              className="w-full h-full border-0"
              title="Takshak Singhania Resume"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
