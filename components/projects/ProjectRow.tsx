"use client";
import { useRef, useState, useCallback } from "react";
import { oglManager } from "@/lib/webgl/OGLManager";
import { motion } from "framer-motion";

interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  imageSrc: string;
  figmaSrc: string;
  archSrc: string;
}

export function ProjectRow({ project, i }: { project: Project; i: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [view, setView] = useState<"design" | "code">("design");

  const handleMouseEnter = useCallback(async () => {
    setIsHovered(true);
    if (!canvasContainerRef.current) return;

    const canvas = canvasContainerRef.current.querySelector("canvas");
    if (!canvas) return;

    // Attach the single WebGL context to this row's canvas
    oglManager.attach(canvas);

    // Swap GPU texture to current project design/code
    const src = view === "design" ? project.figmaSrc : project.archSrc;
    await oglManager.swapTexture(src);
  }, [project, view]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y for GL textures
    oglManager.updateMouse(x, y);
  }, []);

  const toggleView = useCallback(async (newView: "design" | "code", e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering parent row pointer actions
    setView(newView);
    const src = newView === "design" ? project.figmaSrc : project.archSrc;
    await oglManager.swapTexture(src);
  }, [project]);

  return (
    <motion.div
      ref={rowRef}
      className="relative flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-[var(--c-border)] group cursor-none w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-6 md:gap-12 z-10 pointer-events-none">
        <span className="font-mono text-xs text-zinc-500">{project.index}</span>
        <div className="flex flex-col">
          <h3 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-[var(--c-text-primary)] transition-colors duration-300 group-hover:text-[var(--c-mode-accent)]">
            {project.title}
          </h3>
          <p className="text-xs text-[var(--c-text-secondary)] mt-2 font-mono max-w-sm uppercase">
            {project.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8 mt-4 md:mt-0 z-10">
        <span className="text-label text-zinc-400 font-mono hidden lg:inline-block bg-zinc-900 px-3 py-1 rounded border border-[var(--c-border)]">
          {project.category}
        </span>
        <span className="font-mono text-xs text-zinc-500">{project.year}</span>

        {/* Design/Code Toggle control */}
        <div className="flex rounded-md border border-[var(--c-border)] bg-zinc-950 p-1" role="group">
          <button
            onClick={(e) => toggleView("design", e)}
            className={`px-3 py-1 text-[10px] font-mono rounded transition-all cursor-none ${
              view === "design"
                ? "bg-[var(--c-mode-accent)] text-[var(--c-void)] font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            DESIGN
          </button>
          <button
            onClick={(e) => toggleView("code", e)}
            className={`px-3 py-1 text-[10px] font-mono rounded transition-all cursor-none ${
              view === "code"
                ? "bg-[var(--c-mode-accent)] text-[var(--c-void)] font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            CODE
          </button>
        </div>
      </div>

      {/* Floating WebGL flowmap preview canvas */}
      <div
        ref={canvasContainerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 pointer-events-none rounded-xl overflow-hidden border border-[var(--c-border)] shadow-2xl transition-all duration-300 ease-out"
        style={{
          opacity: isHovered ? 0.9 : 0,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.05 : 0.9})`,
          zIndex: 5,
        }}
      >
        <canvas className="w-full h-full" />
      </div>
    </motion.div>
  );
}
