"use client";
import { ProjectRow } from "./ProjectRow";

const PROJECTS = [
  {
    id: "p1",
    index: "01",
    title: "REMAL PROP-TECH",
    category: "Fullstack Platform",
    year: "2026",
    description: "Prop-tech dashboard with real-time vector queries and data layouts.",
    imageSrc: "/textures/p1_design.png",
    figmaSrc: "/textures/p1_design.png",
    archSrc: "/textures/p1_code.png",
  },
  {
    id: "p2",
    index: "02",
    title: "SYNAPSE SYSTEM",
    category: "Creative Interface",
    year: "2025",
    description: "Crystalline network visualizer powered by D3 force velocity Verlet engines.",
    imageSrc: "/textures/p2_design.png",
    figmaSrc: "/textures/p2_design.png",
    archSrc: "/textures/p2_code.png",
  },
  {
    id: "p3",
    index: "03",
    title: "MÖBIUS GALLERY",
    category: "WebGL Art Exhibit",
    year: "2025",
    description: "Parametric Torus knots floating in Unrealbloom film grain layouts.",
    imageSrc: "/textures/p3_design.png",
    figmaSrc: "/textures/p3_design.png",
    archSrc: "/textures/p3_code.png",
  },
];

export function ProjectsList() {
  return (
    <section className="relative flex flex-col justify-center py-32 px-6 md:px-12 w-full bg-[var(--c-base)] border-t border-[var(--c-border)] z-10" aria-label="Selected Works">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-[var(--c-border)] pb-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-[var(--c-text-primary)]">
            SELECTED WORKS
          </h2>
          <span className="text-mono text-xs text-zinc-500 font-semibold mb-1">
            [ 03 COMPLETED / SHIPMENT ]
          </span>
        </div>

        <div className="flex flex-col w-full">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.id} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default ProjectsList;
