import { Navigation } from "@/components/nav/Navigation";
import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { HeroReveal } from "@/components/hero/HeroReveal";
import { DualitySwitch } from "@/components/duality/DualitySwitch";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { AboutSection } from "@/components/about/AboutSection";
import { Terminal } from "@/components/contact/Terminal";

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="relative w-full overflow-hidden bg-[var(--c-base)] text-[var(--c-text-primary)]">

        {/* SECTION 01 — HERO */}
        <section
          className="relative flex flex-col justify-center items-center min-h-screen w-full z-10 select-none"
          aria-label="Hero introduction"
        >
          {/* LCP Element — Server-rendered, immediately visible */}
          <h1
            className="text-hero text-center hero__name px-4 leading-none"
            aria-label="Alex Rivers — Portfolio"
          >
            ALEX RIVERS
          </h1>

          <p className="mt-6 hero__subtitle text-center tracking-widest text-[var(--c-text-secondary)] flex items-center gap-4">
            <span className="font-mono text-sm md:text-base uppercase tracking-[0.2em]">Engineer</span>
            <span
              className="text-[var(--c-mode-accent)] text-xl md:text-2xl font-bold hero__divider"
              aria-hidden="true"
            >
              ×
            </span>
            <span className="font-editorial italic text-sm md:text-base">Designer</span>
          </p>

          {/* Bottom HUD Elements */}
          <div className="absolute bottom-10 left-6 md:left-10 flex flex-col items-start gap-1">
            <div className="flex items-center gap-2 text-label text-zinc-500 text-[10px]">
              <span className="block w-px h-12 bg-zinc-700" aria-hidden="true" />
              SCROLL
            </div>
          </div>

          <div className="absolute bottom-10 right-6 md:right-10 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            <span>©2026 · RIYADH, SAUDI ARABIA</span>
          </div>

          {/* WebGL canvas behind text */}
          <HeroCanvas />

          {/* Clip-path tear reveal overlay */}
          <HeroReveal />
        </section>

        {/* SECTION 02 — DUALITY DIAL */}
        <DualitySwitch />

        {/* SECTION 03 — SELECTED WORK */}
        <div id="works">
          <ProjectsList />
        </div>

        {/* SECTION 04 — SKILLS CONSTELLATION */}
        <div id="skills">
          <SkillsSection />
        </div>

        {/* SECTION 05 — ABOUT */}
        <AboutSection />

        {/* SECTION 06 — CONTACT TERMINAL */}
        <Terminal />

        {/* Footer */}
        <footer className="flex flex-col md:flex-row items-center justify-between py-10 px-6 md:px-12 border-t border-[var(--c-border)] text-[10px] font-mono text-zinc-600 tracking-widest gap-4">
          <span>© 2026 ALEX RIVERS. ALL RIGHTS RESERVED.</span>
          <span>BUILT WITH NEXT.JS · THREE.JS · GSAP · D3 · LENIS · OGL</span>
        </footer>
      </main>
    </>
  );
}
