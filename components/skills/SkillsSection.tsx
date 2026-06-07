"use client";
import { useLazyWebGL } from "@/hooks/useLazyWebGL";
import { ConstellationGraph, SkillNode, SkillLink } from "./ConstellationGraph";

const SKILL_NODES: SkillNode[] = [
  // Frontend
  { id: "ts", name: "TypeScript", domain: "frontend", level: 3, years: 5 },
  { id: "react", name: "React / Next.js", domain: "frontend", level: 3, years: 5 },
  { id: "gsap", name: "GSAP / Motion", domain: "frontend", level: 3, years: 4 },
  { id: "three", name: "Three.js / WebGL", domain: "frontend", level: 2, years: 3 },
  { id: "tailwind", name: "Tailwind CSS", domain: "frontend", level: 3, years: 6 },
  // Backend
  { id: "node", name: "Node.js", domain: "backend", level: 3, years: 5 },
  { id: "postgres", name: "PostgreSQL", domain: "backend", level: 2, years: 4 },
  { id: "graphql", name: "GraphQL", domain: "backend", level: 2, years: 3 },
  { id: "redis", name: "Redis", domain: "backend", level: 1, years: 2 },
  // Design
  { id: "figma", name: "Figma UX", domain: "design", level: 3, years: 5 },
  { id: "motion", name: "Motion Design", domain: "design", level: 2, years: 3 },
  { id: "branding", name: "Brand Identity", domain: "design", level: 2, years: 4 },
  // DevOps
  { id: "docker", name: "Docker", domain: "devops", level: 2, years: 3 },
  { id: "aws", name: "AWS Cloud", domain: "devops", level: 2, years: 4 },
  { id: "ci", name: "GitHub Actions", domain: "devops", level: 3, years: 4 },
];

const SKILL_LINKS: SkillLink[] = [
  { source: "react", target: "ts" },
  { source: "react", target: "gsap" },
  { source: "react", target: "three" },
  { source: "react", target: "tailwind" },
  { source: "node", target: "ts" },
  { source: "node", target: "postgres" },
  { source: "node", target: "graphql" },
  { source: "node", target: "redis" },
  { source: "figma", target: "motion" },
  { source: "figma", target: "branding" },
  { source: "figma", target: "tailwind" },
  { source: "docker", target: "aws" },
  { source: "docker", target: "node" },
  { source: "ci", target: "docker" },
  { source: "ci", target: "aws" },
];

export function SkillsSection() {
  const { ref, isReady } = useLazyWebGL(0.05);

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-center py-32 px-6 md:px-12 w-full bg-[var(--c-base)] border-t border-[var(--c-border)] z-10"
      aria-label="Skills & tools of the craft"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center">
        
        <div className="flex justify-between items-end w-full mb-16 border-b border-[var(--c-border)] pb-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-[var(--c-text-primary)]">
            CRAFT CONSTELLATION
          </h2>
          <span className="text-mono text-xs text-zinc-500 font-semibold mb-1">
            [ 15 COMPLETED NODES ]
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-[10px] font-mono tracking-widest text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5DADE2]" />
            <span>FRONTEND</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8FA5F]" />
            <span>BACKEND</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF8C42]" />
            <span>DESIGN</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A66CFF]" />
            <span>DEVOPS</span>
          </div>
        </div>

        {isReady ? (
          <ConstellationGraph nodes={SKILL_NODES} links={SKILL_LINKS} />
        ) : (
          <div
            className="w-full h-[450px] bg-zinc-950/20 border border-[var(--c-border)] rounded-xl flex items-center justify-center text-zinc-600 font-mono text-xs tracking-wider"
            aria-busy="true"
            aria-live="polite"
          >
            HYDRATING CONSTELLATION MESH...
          </div>
        )}
      </div>
    </section>
  );
}
export default SkillsSection;
