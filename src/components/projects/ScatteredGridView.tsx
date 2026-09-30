"use client";

import React from "react";
import { motion } from "framer-motion";
import { Project, PROJECTS } from "@/data/projects";
import ProjectCard from "./ProjectCard";

interface ScatteredGridViewProps {
  onOpenCaseStudy: (project: Project) => void;
}

export default function ScatteredGridView({
  onOpenCaseStudy,
}: ScatteredGridViewProps) {
  // Intentional editorial offsets & subtle physical angles
  const scatteredSpecs = [
    { colSpan: "md:col-span-7", offset: "md:translate-x-2", rotate: -1.2 },
    { colSpan: "md:col-span-5", offset: "md:translate-y-8 md:-translate-x-2", rotate: 1.5 },
    { colSpan: "md:col-span-5", offset: "md:translate-y-4 md:translate-x-4", rotate: 1 },
    { colSpan: "md:col-span-7", offset: "md:-translate-y-4 md:-translate-x-2", rotate: -1.5 },
    { colSpan: "md:col-span-8 md:col-start-3", offset: "md:translate-y-2", rotate: 0.8 },
  ];

  return (
    <div className="w-full py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        {PROJECTS.map((project, index) => {
          const spec = scatteredSpecs[index] || {
            colSpan: "md:col-span-6",
            offset: "",
            rotate: 0,
          };

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                transform: `rotate(${spec.rotate}deg)`,
              }}
              className={`${spec.colSpan} ${spec.offset} transition-transform duration-300 hover:rotate-0`}
            >
              <ProjectCard
                project={project}
                isActive={true}
                onSelect={() => onOpenCaseStudy(project)}
                onOpenCaseStudy={() => onOpenCaseStudy(project)}
                variant="grid"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
