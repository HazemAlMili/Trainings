"use client";
import { useRef, useCallback, useEffect, useState } from "react";
import { gsap } from "gsap";
import { DualityParticles } from "./DualityParticles";

export function DualitySwitch() {
  const [mode, setMode] = useState(0); // -1 (engineer) to +1 (designer), 0 = hybrid
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startMode = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    // Normalize mode from [-1, 1] to [0, 1]
    const t = (mode + 1) / 2;

    // Interpolate colors between --c-cool (#5DADE2) and --c-warm (#FF8C42)
    const r = Math.round(93 + (255 - 93) * t);
    const g = Math.round(173 + (140 - 173) * t);
    const b = Math.round(226 + (66 - 226) * t);

    root.style.setProperty("--c-mode-accent", `rgb(${r},${g},${b})`);
    root.style.setProperty("--c-mode-glow", `rgba(${r},${g},${b},0.2)`);
    
    // Set data attribute for global CSS styling changes
    root.dataset.mode = t > 0.6 ? "designer" : t < 0.4 ? "engineer" : "hybrid";

    // Set thumb translation position
    if (trackRef.current && thumbRef.current) {
      const trackW = trackRef.current.clientWidth;
      const thumbW = thumbRef.current.clientWidth;
      const thumbX = t * (trackW - thumbW);
      gsap.to(thumbRef.current, { x: thumbX, duration: 0.15, ease: "none" });
    }
  }, [mode]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startMode.current = mode;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [mode]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const trackW = trackRef.current.clientWidth;
    const delta = ((e.clientX - startX.current) / trackW) * 2;
    setMode(Math.max(-1, Math.min(1, startMode.current + delta)));
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    // Snap to nearest state: -1, 0, or 1
    setMode(prev => {
      if (prev < -0.33) return -1;
      if (prev > 0.33) return 1;
      return 0;
    });
  }, []);

  return (
    <section className="relative flex flex-col justify-center items-center py-24 px-6 md:px-12 w-full min-h-screen overflow-hidden border-t border-[var(--c-border)] z-10" aria-label="Identity spectrum dial">
      <div className="relative max-w-6xl w-full z-10 flex flex-col items-center">
        
        <h2 className="text-label tracking-widest text-[var(--c-text-secondary)] mb-8 text-center">
          TUNING SPECTRUM
        </h2>

        {/* The analog frequency dial slider */}
        <div className="flex flex-col items-center w-full max-w-xl mb-16 select-none">
          <div className="flex justify-between w-full text-mono text-xs mb-3 text-[var(--c-text-secondary)]">
            <span className={mode < -0.33 ? "text-[var(--c-cool)] font-bold transition-all" : ""}>[ ENGINEER ]</span>
            <span className={mode >= -0.33 && mode <= 0.33 ? "text-[var(--c-mode-accent)] font-bold transition-all" : ""}>[ HYBRID ]</span>
            <span className={mode > 0.33 ? "text-[var(--c-warm)] font-bold transition-all" : ""}>[ DESIGNER ]</span>
          </div>

          <div
            ref={trackRef}
            className="relative w-full h-8 bg-zinc-900/50 border border-[var(--c-border)] rounded-full cursor-pointer flex items-center overflow-hidden"
            role="slider"
            aria-valuemin={-1}
            aria-valuemax={1}
            aria-valuenow={mode}
            aria-label="Mode slider"
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setMode(m => Math.max(-1, m - 0.2));
              if (e.key === "ArrowRight") setMode(m => Math.min(1, m + 0.2));
            }}
          >
            {/* Filled status track */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[var(--c-cool)] via-[var(--c-mode-accent)] to-[var(--c-warm)] opacity-10 pointer-events-none transition-all duration-300"
              style={{ width: `${((mode + 1) / 2) * 100}%` }}
            />
            
            {/* The analog knob */}
            <div
              ref={thumbRef}
              className="absolute w-8 h-8 rounded-full bg-[var(--c-mode-accent)] shadow-[0_0_15px_var(--c-mode-glow)] border border-[var(--c-base)] cursor-grab active:cursor-grabbing flex justify-center items-center text-xs font-bold text-[var(--c-void)]"
              aria-hidden="true"
            >
              ◉
            </div>
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-600 mt-2">
            DRAG OR USE ARROW KEYS TO SCALE
          </span>
        </div>

        {/* Dual interactive panels */}
        <div className="relative w-full min-h-[400px] grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mt-6">
          <EngineerPreviewPanel active={mode < 0.33} />
          <DesignerPreviewPanel active={mode > -0.33} />
        </div>
      </div>

      {/* Particle canvas background */}
      <DualityParticles mode={mode} />
    </section>
  );
}

function EngineerPreviewPanel({ active }: { active: boolean }) {
  return (
    <div
      className="flex flex-col bg-zinc-950/80 border border-[var(--c-border)] rounded-xl p-6 md:p-8 backdrop-blur-md transition-all duration-500 overflow-hidden"
      style={{
        opacity: active ? 1 : 0.15,
        transform: `scale(${active ? 1 : 0.98})`,
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <div className="flex items-center gap-2 border-b border-[var(--c-border)] pb-4 mb-6">
        <span className="w-3 h-3 rounded-full bg-red-500/50" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <span className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="text-mono text-xs text-zinc-500 ml-4">portfolio-controller.ts</span>
      </div>

      <div className="flex-1 font-mono text-[11px] md:text-[13px] text-zinc-400 space-y-2 leading-relaxed overflow-x-auto">
        <p><span className="text-blue-400">import</span> &#123; <span className="text-emerald-400">gsap</span> &#125; <span className="text-blue-400">from</span> <span className="text-orange-400">"gsap"</span>;</p>
        <p><span className="text-blue-400">import</span> &#123; <span className="text-emerald-400">Renderer</span> &#125; <span className="text-blue-400">from</span> <span className="text-orange-400">"ogl"</span>;</p>
        <p>&nbsp;</p>
        <p><span className="text-purple-400">class</span> <span className="text-yellow-300">WebGLPipeline</span> &#123;</p>
        <p>&nbsp;&nbsp;<span className="text-blue-400">private</span> <span className="text-zinc-300">gl</span>: <span className="text-emerald-400">WebGLRenderingContext</span>;</p>
        <p>&nbsp;&nbsp;<span className="text-blue-400">constructor</span>(canvas: <span className="text-emerald-400">HTMLCanvasElement</span>) &#123;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">// Initialize GPU context</span></p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">this</span>.<span className="text-zinc-300">gl</span> = canvas.getContext(<span className="text-orange-400">"webgl2"</span>);</p>
        <p>&nbsp;&nbsp;&#125;</p>
        <p>&#125;</p>
      </div>

      <div className="mt-6 border-t border-[var(--c-border)] pt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
        <span>DEV STATISTICS:</span>
        <span className="text-[var(--c-cool)]">1,400+ COMMITS // 42 REPOSITORIES</span>
      </div>
    </div>
  );
}

function DesignerPreviewPanel({ active }: { active: boolean }) {
  return (
    <div
      className="flex flex-col bg-zinc-950/80 border border-[var(--c-border)] rounded-xl p-6 md:p-8 backdrop-blur-md transition-all duration-500 overflow-hidden"
      style={{
        opacity: active ? 1 : 0.15,
        transform: `scale(${active ? 1 : 0.98})`,
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <div className="flex justify-between items-center border-b border-[var(--c-border)] pb-4 mb-6">
        <span className="text-label text-[10px] text-zinc-500">CANVAS LAYOUT</span>
        <span className="text-mono text-xs text-zinc-500">Grid: 12-Column Golden Ratio</span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-start space-y-6">
        <span className="font-editorial italic text-3xl md:text-5xl text-[var(--c-warm)] leading-none">
          Structure & Emotion
        </span>
        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-md">
          Design is not the decoration of a surface. It is the logical arrangement of cognitive pathways, wrapped in physical emotional triggers. We build spaces to be felt, not just read.
        </p>
        <div className="flex gap-2 w-full mt-4">
          <span className="h-6 w-12 bg-[var(--c-warm)] opacity-80 rounded" />
          <span className="h-6 w-12 bg-amber-400 opacity-60 rounded" />
          <span className="h-6 w-12 bg-neutral-800 rounded" />
        </div>
      </div>

      <div className="mt-6 border-t border-[var(--c-border)] pt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
        <span>DESIGN METRICS:</span>
        <span className="text-[var(--c-warm)]">9 AWARDS // 38 CASE STUDIES</span>
      </div>
    </div>
  );
}
