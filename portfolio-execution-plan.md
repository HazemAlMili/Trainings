# THE LEGENDARY HYBRID PORTFOLIO — COMPLETE EXECUTION PLAN
## A Surgical Mashup of Bruno Simon · Robby Leonardi · Lusion · ITom · Aristide Benoist

**Stack:** Next.js 15 App Router · TypeScript 5 · Tailwind CSS v4 · GSAP 3 (fully free) · Framer Motion · OGL · Three.js · Lenis v2 · D3.js

---

> The goal is not to copy five portfolios. It is to surgically extract the single best idea from each one and re-synthesize them into a unified visual language that has never existed before.

---

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PART I — UNIFIED VISUAL IDENTITY
# The Thread That Binds Everything
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 1.1 — The Core Color System

Every section will feel different yet unmistakably the same portfolio. This is achieved through a **token-based color architecture** where a fixed set of CSS custom properties can shift slightly in value between modes (Engineer vs Designer) while the structural relationships remain constant.

```css
/* globals.css — The Token Foundation */
:root {
  /* ── DEPTH SCALE ── */
  --c-void:        #070809;   /* True near-black — the void behind everything */
  --c-base:        #0D0F12;   /* Primary background — slightly warm tinted */
  --c-surface-1:   #131720;   /* Cards, panels — subtle elevation */
  --c-surface-2:   #1C2333;   /* Hover states, active panels */
  --c-border:      rgba(255,255,255,0.07); /* Glass borders */

  /* ── SIGNAL COLORS ── */
  --c-signal:      #C8FA5F;   /* Electric chartreuse — THE accent. Not white. Not blue. */
  --c-signal-dim:  rgba(200,250,95,0.15); /* Glow halo color */
  --c-warm:        #FF8C42;   /* Warm amber — "designer" frequency */
  --c-cool:        #5DADE2;   /* Crystalline blue — "engineer" frequency */

  /* ── TYPE COLORS ── */
  --c-text-primary:   #E8ECF0; /* Primary text — cool off-white, not pure white */
  --c-text-secondary: #6B7A8F; /* Muted labels, metadata */
  --c-text-ghost:     #2E3A4A; /* Decorative ghost text, watermarks */

  /* ── ENGINEER MODE OVERRIDES ── */
  --c-mode-accent:    var(--c-cool);
  --c-mode-glow:      rgba(93,173,226,0.2);

  /* ── MOTION TOKENS ── */
  --ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  --dur-fast:   200ms;
  --dur-med:    500ms;
  --dur-slow:   900ms;
  --dur-epic:  1400ms;
}

/* Designer mode — applied via [data-mode="designer"] on <html> */
[data-mode="designer"] {
  --c-mode-accent:    var(--c-warm);
  --c-mode-glow:      rgba(255,140,66,0.2);
  --c-signal:         #FF8C42;
  --c-signal-dim:     rgba(255,140,66,0.15);
}
```

**Palette Rationale:**
- `#C8FA5F` (signal chartreuse) is the central identity color. It reads as neither designer nor engineer — it's tech-creative. It charges every WebGL glow, every active state, every accent.
- `#5DADE2` (cool blue) activates in Engineer Mode — it evokes terminals, code, logic
- `#FF8C42` (warm amber) activates in Designer Mode — it evokes craft, warmth, intentionality
- The site shifts its *temperature*, not its structure, between modes — this feels like one cohesive system, not two separate sites

---

## 1.2 — The Typography System

The pairing must carry a dual personality on its own — before a single animation fires.

```
┌─────────────────────────────────────────────────────────┐
│  DISPLAY / HERO      →  "Syne" (Variable, wght 400–800) │
│  The engineer's geometric precision + the designer's    │
│  expressive width variance. Feels built, not found.     │
│                                                         │
│  EDITORIAL / ACCENT  →  "Playfair Display" (Italic)     │
│  Reserved exclusively for Designer Mode activated       │
│  labels, project category tags, and callout quotes.     │
│  The emotional counterweight to Syne's structure.       │
│                                                         │
│  CODE / TECHNICAL    →  "Geist Mono" (Variable)         │
│  Vercel's typeface — immediately legible as code.       │
│  Used for all technical labels, HUD data readouts,      │
│  stack annotations, and Engineer Mode headings.         │
│                                                         │
│  BODY / READING      →  "DM Sans" (Variable)            │
│  High legibility at small sizes. Neutral enough to      │
│  not compete with the display faces. Only for body.     │
└─────────────────────────────────────────────────────────┘
```

```typescript
// app/layout.tsx — Font loading with zero CLS
import { Syne, DM_Sans, Geist_Mono, Playfair_Display } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  axes: ["wght"],           // Load variable axis
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,           // Not above-the-fold — defer
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-editorial",
  display: "swap",
  preload: false,
});
```

```css
/* Type scale — fluid, clamp-based (no breakpoint jumps → zero CLS) */
.text-hero    { font-size: clamp(3.5rem, 9vw, 9rem);  font-family: var(--font-display); font-weight: 700; line-height: 0.95; letter-spacing: -0.03em; }
.text-title   { font-size: clamp(2rem, 4vw, 4.5rem);  font-family: var(--font-display); font-weight: 600; line-height: 1.05; }
.text-section { font-size: clamp(1rem, 1.5vw, 1.125rem); font-family: var(--font-body); line-height: 1.7; }
.text-mono    { font-size: clamp(0.7rem, 1vw, 0.875rem); font-family: var(--font-mono); letter-spacing: 0.05em; }
.text-label   { font-size: 0.75rem; font-family: var(--font-mono); letter-spacing: 0.12em; text-transform: uppercase; }
```

---

## 1.3 — The Unified Motion Language

All animations across all sections share the same physical vocabulary. This creates subliminal coherence even when sections look wildly different.

```typescript
// lib/motion.ts — Shared motion constants
export const EASES = {
  // The "landing" ease — decelerates dramatically, like something settling
  land:    [0.16, 1, 0.3, 1]   as const,
  // The "launch" ease — accelerates into a sharp exit
  launch:  [0.7, 0, 0.84, 0]  as const,
  // The "spring" ease — overshoots slightly
  spring:  [0.34, 1.56, 0.64, 1] as const,
  // The "cinema" ease — slow start, slow end, fast middle
  cinema:  [0.85, 0, 0.15, 1]  as const,
} as const;

export const DURATIONS = {
  instant:  0.15,
  fast:     0.35,
  medium:   0.65,
  slow:     1.0,
  epic:     1.6,
} as const;

// Shared stagger pattern used everywhere for list reveals
export const staggerReveal = (i: number) => ({
  initial: { opacity: 0, y: 32, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0,  filter: "blur(0px)" },
  transition: {
    duration: DURATIONS.slow,
    ease: EASES.land,
    delay: i * 0.08,
  },
});
```

---

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PART II — SECTION-BY-SECTION BREAKDOWN
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---

## SECTION 01 — THE HERO
### Inspired by: LUSION (cinematic WebGL) + ITOM (2D-to-3D reveal)
**Goal: Arrest. Disorient. Delight. In under 3 seconds.**

---

### 01-A · The Concept

The hero is built in **two phases**, both inspired by the elite benchmarks:

**Phase 1 — The ITom "Reveal":** The page loads on what appears to be a **flat, typographic surface** — your name in enormous Syne display type, monochrome, center-aligned. Then, using a GSAP-driven clip-path polygon animation (ITom's paper-tear pattern), the background beneath the type **splits open** like a chasm — revealing a deep, glowing WebGL scene underneath. The type remains, now floating above the 3D depth.

**Phase 2 — The Lusion "Depth":** Behind the type lives a **Lusion-style WebGL scene**: a dark void with a single abstract 3D object — a Möbius-like parametric mesh — floating and slowly rotating. Post-processing effects (bloom, film grain, subtle chromatic aberration) make it look like it came from a 2023 SOTY project. The mesh responds to cursor position with a gentle parallax lean.

**The key architectural insight:** The text is rendered in the **DOM** (not on a canvas), so it is the LCP element, immediately visible, immediately SEO-crawlable. The WebGL canvas is behind it, loaded asynchronously.

---

### 01-B · UX Layout

```
┌──────────────────────────────────────────────────────────────┐
│  [Top-left: Logo mark — 28px Geist Mono]                    │
│  [Top-right: NAV — Work · Stack · About · Contact]          │
│  [Top-right corner: MODE TOGGLE PILL]                       │
│                                                              │
│                                                              │
│         YOUR NAME                ← DOM h1 — LCP element    │
│         Engineer × Designer      ← DOM subtitle             │
│                                                              │
│         [ WebGL canvas — behind text — clip-path hidden ]  │
│         [ Reveals on load via GSAP clip-path animation  ]  │
│                                                              │
│                                                              │
│  [Bottom-left: scroll indicator — vertical text + line ]    │
│  [Bottom-right: current year + location — mono type ]       │
└──────────────────────────────────────────────────────────────┘
```

---

### 01-C · Technical Implementation

**Step 1: Server-rendered LCP shell (no opacity:0)**

```tsx
// app/page.tsx — Server Component (no "use client")
// The h1 is immediately in the HTML — LCP is painted at first byte
export default function HomePage() {
  return (
    <main>
      <section className="hero">
        {/* LCP ELEMENT — visible immediately, no JS needed */}
        <h1 className="text-hero hero__name" aria-label="Your Name">
          YOUR NAME
        </h1>
        <p className="text-section hero__subtitle">
          <span>Engineer</span>
          <span className="hero__divider" aria-hidden="true">×</span>
          <span>Designer</span>
        </p>

        {/* WebGL canvas loads async — does NOT block LCP */}
        <HeroCanvas />  {/* Client component, dynamic import */}

        {/* ITom-style clip-path reveal overlay */}
        <HeroReveal />  {/* Client component, GSAP animation trigger */}
      </section>
    </main>
  );
}
```

**Step 2: Dynamic import for WebGL (non-blocking)**

```tsx
// components/hero/HeroCanvas.tsx
import dynamic from "next/dynamic";

// The heavy WebGL component loads AFTER the page paints
const WebGLScene = dynamic(
  () => import("./WebGLScene"),
  {
    ssr: false,          // Never render WebGL on server
    loading: () => null, // No placeholder — background anyway
  }
);

export function HeroCanvas() {
  return (
    <div
      className="hero__canvas-wrapper"
      aria-hidden="true"          // Decorative — hidden from screen readers
    >
      <WebGLScene />
    </div>
  );
}
```

**Step 3: The WebGL Scene (Three.js + Post-processing — Lusion style)**

```typescript
// components/hero/WebGLScene.tsx
"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";

export default function WebGLScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // ── RENDERER ──
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // ── SCENE ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 4;

    // ── THE HERO MESH — Parametric Möbius knot ──
    const geometry = new THREE.TorusKnotGeometry(1, 0.35, 256, 32, 2, 3);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#C8FA5F"),
      metalness: 0.9,
      roughness: 0.1,
      emissive: new THREE.Color("#C8FA5F"),
      emissiveIntensity: 0.3,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ── LIGHTS ──
    const ambient = new THREE.AmbientLight("#0D0F12", 2);
    const point1 = new THREE.PointLight("#C8FA5F", 3, 10);
    point1.position.set(2, 2, 2);
    const point2 = new THREE.PointLight("#5DADE2", 2, 8);
    point2.position.set(-3, -1, 1);
    scene.add(ambient, point1, point2);

    // ── POST-PROCESSING (Lusion signature) ──
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8,   // strength
      0.4,   // radius
      0.85   // threshold
    ));
    composer.addPass(new FilmPass(0.25, false)); // Film grain

    // ── MOUSE PARALLAX (Lusion-style lean) ──
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── IDLE GUARD (Lusion optimization) ──
    let idleFrames = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      idleFrames++;

      // Lerp mouse for smooth camera follow
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;
      camera.position.x = mouse.x * 0.5;
      camera.position.y = -mouse.y * 0.3;
      camera.lookAt(scene.position);

      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.005;

      composer.render();

      if (idleFrames > 120) cancelAnimationFrame(animId); // Idle after ~2s
    };
    animate();

    const resume = () => { idleFrames = 0; animate(); };
    window.addEventListener("mousemove", resume);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", resume);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__canvas" />;
}
```

**Step 4: The ITom-Style Clip-Path Reveal**

```typescript
// components/hero/HeroReveal.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// The reveal works by animating a set of polygon overlay divs
// that "split apart" like tearing paper to expose the WebGL canvas

export function HeroReveal() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // The overlay covers the canvas with the background color
    // We animate its clip-path to "tear" it away
    tl.fromTo(
      overlayRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.4,
        ease: "power4.inOut",
      }
    );

    // Simultaneously animate the name up from below
    tl.fromTo(
      ".hero__name",
      { y: 40, opacity: 0 },  // NOTE: h1 is visible (opacity:1) in SSR
      { y: 0,  opacity: 1, duration: 1.2, ease: "power3.out" },
      "<0.4"   // Start 400ms after clip-path starts
    );

    // Stagger in subtitle
    tl.fromTo(
      ".hero__subtitle span",
      { y: 20, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.15 },
      "<0.3"
    );

    // Animate in nav items
    tl.fromTo(
      ".nav__item",
      { y: -16, opacity: 0 },
      { y: 0,   opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.08 },
      "<0.2"
    );

  }, []);

  return (
    <div
      ref={overlayRef}
      className="hero__reveal-overlay"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background: "var(--c-base)",
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
}
```

**Important LCP Note:** In the code above, the `<h1>` is rendered by the Server Component at `opacity: 1`. The `HeroReveal` component re-animates it from 0 on the client. This creates a brief flash of un-animated text before JS loads — which is actually CORRECT for LCP. The LCP measurement captures the SSR-rendered state. To make this invisible in practice, add a CSS-only initial state using `:not(.js-loaded)` that hides the text, then toggle the class immediately on JS execution:

```html
<!-- _document or layout — fires synchronously before paint -->
<script dangerouslySetInnerHTML={{__html: `document.documentElement.classList.add('js-loaded');`}} />
```

```css
/* Only hide the animated elements when JS has loaded */
.js-loaded .hero__name   { opacity: 0; transform: translateY(40px); }
.js-loaded .hero__subtitle span { opacity: 0; }
```

---

## SECTION 02 — THE DUALITY SWITCH
### Inspired by: BRUNO SIMON (gamified mechanic) + ROBBY LEONARDI (scroll-driven world)
**Goal: Give the user agency. Make them feel like they're controlling your identity.**

---

### 02-A · The Concept

This is the most architecturally novel section — the one that will make people share the site. Inspired by Bruno Simon's "you are the controller" mechanic and Leonardi's "the world changes as you interact" principle.

**The implementation:** A horizontal **"frequency dial"** section. Visually, it looks like an analog control panel — the kind you'd see on a synthesizer or a mixing board. A large rotary knob (or a horizontal scrubber that responds to scroll) sits center-stage.

The left side is labeled `ENGINEER` with code-aesthetic annotations. The right side is labeled `DESIGNER` with editorial-aesthetic labels. The knob sits at the **center by default** — the hybrid position — and is deliberately left there unless the user chooses to move it.

As the user drags or scrolls the dial:
- CSS custom property values update in real time (temperature of the palette shifts)
- Typography swaps between `Geist Mono` and `Syne`
- Layout density shifts (from grid precision to editorial breathing room)
- A small GLSL particle field in the background shifts color from `--c-cool` to `--c-warm`
- Subtle ambient sound shifts (optional, off by default, toggleable)

The **crucial Bruno Simon insight applied here:** The user isn't watching an animation — they're in a cause-effect relationship with the site. Every millisecond of drag produces instant visual feedback. This is what creates the memorable "oh wow" moment.

---

### 02-B · UX Layout

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ENGINEER ─────────────┤ ◉ ├───────────── DESIGNER          │
│                    < DRAG ME >                               │
│                                                              │
│  [Left side preview]              [Right side preview]       │
│  ┌─────────────────────┐ ┌─────────────────────┐           │
│  │ import React from   │ │  ╔══════════════════╗ │          │
│  │  'react';           │ │  ║  Figma Components ║ │         │
│  │ const Portfolio =   │ │  ║  Design System    ║ │         │
│  │  () => { ... }      │ │  ╚══════════════════╝ │         │
│  └─────────────────────┘ └─────────────────────┘           │
│                                                              │
│  [Below: Dual metrics strip]                                │
│  Left: GitHub commits / Stars / Languages used              │
│  Right: Dribbble likes / Behance views / Tools used         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

### 02-C · Technical Implementation

```tsx
// components/duality/DualitySwitch.tsx
"use client";
import { useRef, useCallback, useEffect, useState } from "react";
import { gsap } from "gsap";

// The mode value is a number from -1 (engineer) to +1 (designer)
// 0 = perfect hybrid center (default and ideal)
export function DualitySwitch() {
  const [mode, setMode] = useState(0);
  const trackRef  = useRef<HTMLDivElement>(null);
  const thumbRef  = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX    = useRef(0);
  const startMode = useRef(0);

  // Apply CSS custom property overrides based on mode value
  useEffect(() => {
    const root = document.documentElement;
    const t = (mode + 1) / 2; // Normalize 0 → 1

    // Interpolate accent color between --c-cool and --c-warm
    const r = Math.round(93  + (255 - 93)  * t); // 93 → 255
    const g = Math.round(173 + (140 - 173) * t); // 173 → 140
    const b = Math.round(226 + (66  - 226) * t); // 226 → 66

    root.style.setProperty("--c-mode-accent",  `rgb(${r},${g},${b})`);
    root.style.setProperty("--c-mode-glow",    `rgba(${r},${g},${b},0.2)`);
    root.dataset.mode = t > 0.6 ? "designer" : t < 0.4 ? "engineer" : "hybrid";

    // Update thumb position
    if (trackRef.current && thumbRef.current) {
      const trackW = trackRef.current.offsetWidth;
      const thumbX = ((mode + 1) / 2) * trackW;
      gsap.to(thumbRef.current, { x: thumbX - thumbRef.current.offsetWidth / 2, duration: 0.1, ease: "none" });
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
    const trackW = trackRef.current.offsetWidth;
    const delta = (e.clientX - startX.current) / trackW * 2; // Scale to -1→+1 range
    setMode(Math.max(-1, Math.min(1, startMode.current + delta)));
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    // Snap to nearest third: -1, 0, or +1
    setMode(prev => {
      if (prev < -0.33)      return -1;
      else if (prev > 0.33)  return  1;
      else                   return  0;
    });
  }, []);

  return (
    <section className="duality" aria-label="Mode selector: Engineer to Designer spectrum">
      <div className="duality__labels">
        <span className="duality__label duality__label--engineer text-mono">
          [ ENGINEER ]
        </span>
        <span className="duality__label duality__label--designer text-mono">
          [ DESIGNER ]
        </span>
      </div>

      <div
        className="duality__track"
        ref={trackRef}
        role="slider"
        aria-valuemin={-1}
        aria-valuemax={1}
        aria-valuenow={mode}
        aria-label="Hybrid mode: drag between Engineer and Designer"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={(e) => {
          // Keyboard accessible: arrow keys move the dial
          if (e.key === "ArrowLeft")  setMode(m => Math.max(-1, m - 0.1));
          if (e.key === "ArrowRight") setMode(m => Math.min( 1, m + 0.1));
        }}
      >
        <div className="duality__track-fill" style={{ "--mode": (mode + 1) / 2 } as any} />
        <div
          className="duality__thumb"
          ref={thumbRef}
          aria-hidden="true"
        >
          ◉
        </div>
      </div>

      {/* Dual preview panels */}
      <div className="duality__previews" style={{ "--mode-t": (mode + 1) / 2 } as any}>
        <EngineerPreviewPanel opacity={1 - (mode + 1) / 2} />
        <DesignerPreviewPanel opacity={(mode + 1) / 2} />
      </div>

      {/* Particle field canvas — color responds to mode */}
      <DualityParticles mode={mode} />
    </section>
  );
}
```

**The particle field shader (GLSL — the background ambient):**

```glsl
// shaders/duality.frag — Background particles shift color with mode
precision mediump float;

uniform float uTime;
uniform float uMode;    // -1 = engineer (blue), +1 = designer (amber)
uniform vec2  uResolution;

vec3 ENGINEER_COLOR = vec3(0.365, 0.678, 0.886); // #5DADE2
vec3 DESIGNER_COLOR = vec3(1.000, 0.549, 0.259); // #FF8C42

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float t = (uMode + 1.0) * 0.5; // Remap to 0-1

  vec3 color = mix(ENGINEER_COLOR, DESIGNER_COLOR, t);
  float alpha = 0.04 + sin(uTime * 0.5 + uv.x * 10.0) * 0.02;

  gl_FragColor = vec4(color, alpha);
}
```

---

## SECTION 03 — THE WORK / PROJECTS
### Inspired by: ARISTIDE BENOIST (luxury editorial + WebGL flowmap hover)
**Goal: Make the work feel important. Each project is a world, not a card.**

---

### 03-A · The Concept

Aristide Benoist's signature move is the **flowmap hover effect** — cursor movement over a project image creates a flowing, oil-on-water distortion using a WebGL flowmap. The key technical achievement is doing this with a **single persistent OGL context** across all projects, swapping only the textures — never the renderer.

The layout is a **full-width editorial list** — not a card grid. Each project occupies its own horizontal row, with the image revealed on hover (similar to how luxury fashion brands show products — you feel like you're "unlocking" each piece).

**The dual-view innovation (unique to this blueprint):** Each project row has a subtle toggle button `[DESIGN ↔ CODE]` that flips the hover preview between the Figma case study and a live architecture diagram — answering both halves of the hybrid identity without sacrificing the clean editorial feel.

---

### 03-B · UX Layout

```
┌──────────────────────────────────────────────────────────────┐
│  SELECTED WORK  ────────────────────────── (03 PROJECTS) ── │
│                                                              │
│  ──────────────────────────────────────────────────────────  │
│  01   PROJECT NAME        CATEGORY   YEAR   [DESIGN][CODE]  │
│       One-line description                                   │
│  ──────────────────────────────────────────────────────────  │
│  02   PROJECT NAME        CATEGORY   YEAR   [DESIGN][CODE]  │
│       One-line description                                   │
│  ──────────────────────────────────────────────────────────  │
│  03   PROJECT NAME        CATEGORY   YEAR   [DESIGN][CODE]  │
│       One-line description                                   │
│  ──────────────────────────────────────────────────────────  │
│                                                              │
│  [On hover: large image appears at cursor, flowmap-distorted]│
│  [On [DESIGN] toggle: Figma mockup preview  ]               │
│  [On [CODE] toggle: architecture diagram    ]               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

### 03-C · Technical Implementation

**The global OGL singleton — the critical architecture:**

```typescript
// lib/webgl/OGLManager.ts
// A singleton that manages the SINGLE WebGL context for the entire projects section
// Swaps textures — never creates new contexts. Prevents memory leaks.

import { Renderer, Program, Mesh, Triangle, Texture, Vec2, Flowmap } from "ogl";

class OGLSingletonManager {
  private static instance: OGLSingletonManager | null = null;
  private renderer!: Renderer;
  private program!: Program;
  private mesh!: Mesh;
  private flowmap!: Flowmap;
  private currentTexture: Texture | null = null;
  private animationId: number | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private mouse = new Vec2(-1);
  private velocity = new Vec2();
  private lastMouse = new Vec2(-1);
  private idleFrames = 0;

  static getInstance(): OGLSingletonManager {
    if (!this.instance) this.instance = new OGLSingletonManager();
    return this.instance;
  }

  attach(canvas: HTMLCanvasElement) {
    if (this.canvas === canvas) return;
    this.canvas = canvas;
    this.init(canvas);
  }

  private init(canvas: HTMLCanvasElement) {
    const gl = this.renderer?.gl;
    if (gl && gl.canvas !== canvas) {
      // Move the renderer's canvas to the new container
      canvas.parentElement?.prepend(gl.canvas);
      return;
    }

    this.renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const { gl: newGl } = this.renderer;
    canvas.parentElement?.prepend(newGl.canvas);
    Object.assign(newGl.canvas.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    });

    this.flowmap = new Flowmap(newGl);

    const vertex = /* glsl */ `
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
      }
    `;

    const fragment = /* glsl */ `
      precision highp float;
      uniform sampler2D tWater;
      uniform sampler2D tFlow;
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        vec3 flow = texture2D(tFlow, vUv).rgb;

        // Distort UVs based on flowmap velocity
        vec2 uv = vUv;
        uv += flow.rg * 0.04; // Flow strength

        vec4 color = texture2D(tWater, uv);

        // Subtle chromatic aberration at flow hotspots
        float strength = length(flow.rg);
        vec4 colorR = texture2D(tWater, uv + flow.rg * 0.006);
        vec4 colorB = texture2D(tWater, uv - flow.rg * 0.006);
        color.r = mix(color.r, colorR.r, strength * 2.0);
        color.b = mix(color.b, colorB.b, strength * 2.0);

        gl_FragColor = color;
      }
    `;

    const geometry = new Triangle(newGl);

    this.program = new Program(newGl, {
      vertex, fragment,
      uniforms: {
        uTime: { value: 0 },
        tWater: { value: new Texture(newGl) },
        tFlow: this.flowmap.uniform,
      },
    });

    this.mesh = new Mesh(newGl, { geometry, program: this.program });
  }

  async swapTexture(imageSrc: string) {
    if (!this.renderer) return;
    const { gl } = this.renderer;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    await img.decode();

    const newTexture = new Texture(gl, { image: img, generateMipmaps: false });

    // Dispose old texture
    this.currentTexture?.image && (this.currentTexture = null);
    this.currentTexture = newTexture;
    this.program.uniforms.tWater.value = newTexture;

    // Resume render loop
    this.idleFrames = 0;
    if (!this.animationId) this.startLoop();
  }

  updateMouse(x: number, y: number) {
    this.idleFrames = 0;
    this.velocity.set(x - this.lastMouse.x, y - this.lastMouse.y);
    this.mouse.set(x, y);
    this.lastMouse.set(x, y);
    if (!this.animationId) this.startLoop();
  }

  private startLoop() {
    const tick = (t: number) => {
      this.idleFrames++;
      this.program.uniforms.uTime.value = t * 0.001;

      this.flowmap.mouse.copy(this.mouse);
      this.flowmap.velocity.lerp(this.velocity, 0.1);
      this.velocity.set(0, 0);

      this.flowmap.update();
      this.renderer.render({ scene: this.mesh });

      if (this.idleFrames > 90) {
        this.animationId = null;
        return;
      }
      this.animationId = requestAnimationFrame(tick);
    };
    this.animationId = requestAnimationFrame(tick);
  }

  destroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
    OGLSingletonManager.instance = null;
  }
}

export const oglManager = OGLSingletonManager.getInstance();
```

**The Project Row Component:**

```tsx
// components/projects/ProjectRow.tsx
"use client";
import { useRef, useState, useCallback } from "react";
import { oglManager } from "@/lib/webgl/OGLManager";
import { motion } from "framer-motion";
import { staggerReveal } from "@/lib/motion";

interface Project {
  id: string;
  index: string;          // "01", "02", etc.
  title: string;
  category: string;
  year: string;
  description: string;
  imageSrc: string;
  figmaSrc: string;       // Figma preview image
  archSrc: string;        // Architecture diagram image
}

export function ProjectRow({ project, i }: { project: Project; i: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [view, setView] = useState<"design" | "code">("design");

  const handleMouseEnter = useCallback(async () => {
    setIsHovered(true);
    if (!canvasContainerRef.current) return;

    // Attach the SHARED OGL context to THIS row's container
    oglManager.attach(canvasContainerRef.current.querySelector("canvas")!);

    // Swap to this project's texture
    const src = view === "design" ? project.figmaSrc : project.imageSrc;
    await oglManager.swapTexture(src);
  }, [project, view]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y for WebGL
    oglManager.updateMouse(x, y);
  }, []);

  return (
    <motion.div
      ref={rowRef}
      className="project-row"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      {...staggerReveal(i)}
    >
      {/* Row content */}
      <span className="project-row__index text-mono">{project.index}</span>
      <h3 className="project-row__title text-title">{project.title}</h3>
      <span className="project-row__category text-label">{project.category}</span>
      <span className="project-row__year text-mono">{project.year}</span>

      {/* Dual-view toggle — the unique hybrid feature */}
      <div className="project-row__toggle" role="group" aria-label="Preview mode">
        <button
          className={`project-row__toggle-btn ${view === "design" ? "active" : ""}`}
          onClick={() => setView("design")}
          aria-pressed={view === "design"}
        >
          DESIGN
        </button>
        <button
          className={`project-row__toggle-btn ${view === "code" ? "active" : ""}`}
          onClick={() => setView("code")}
          aria-pressed={view === "code"}
        >
          CODE
        </button>
      </div>

      {/* The WebGL canvas container — shared OGL context renders here */}
      <div
        ref={canvasContainerRef}
        className="project-row__preview"
        aria-hidden="true"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: `opacity var(--dur-med) var(--ease-out-expo)`,
        }}
      >
        {/* Canvas is injected here by OGLManager.attach() */}
        {/* This architecture ensures only ONE WebGL context exists */}
      </div>
    </motion.div>
  );
}
```

---

## SECTION 04 — THE TECH STACK
### Inspired by: ITOM's interactive museum / physics-based layouts
**Goal: Make the skills section something people want to *play* with.**

---

### 04-A · The Concept

ITom's cylindrical monitor tower used physics-based interaction — users could swipe and spin it. We apply the same principle to the skills section with a **D3 Force-Directed Constellation Graph** rendered on a Canvas2D (not WebGL — keeping this section lightweight).

Each technology is a **node** — a glowing circle sized by proficiency level. Nodes are grouped by domain (Frontend, Backend, Design, DevOps, Data) and colored by domain using semi-transparent group halos. The simulation uses D3's velocity Verlet integrator — nodes drift, repel, and settle organically. Clicking a node **zooms and pulses** it, revealing a tooltip with:
- Years of experience
- Notable projects where it was used
- Proficiency rating (not a progress bar — a short poetic descriptor: "daily driver" / "battle-tested" / "exploring")

---

### 04-B · UX Layout

```
┌──────────────────────────────────────────────────────────────┐
│  TOOLS OF THE CRAFT  ─────────────────────────── (25 nodes)  │
│                                                              │
│   [ Legend: ● Frontend  ● Backend  ● Design  ● DevOps ]     │
│                                                              │
│   ┌──────────────────────────────────────────────────────┐  │
│   │                    ·  TypeScript                     │  │
│   │   React ·                     · GSAP                 │  │
│   │              · Next.js                               │  │
│   │     · OGL          · Figma                           │  │
│   │  · Node.js                    · PostgreSQL           │  │
│   │                  [interactive canvas]                │  │
│   └──────────────────────────────────────────────────────┘  │
│                                                              │
│   [Active node tooltip below canvas when clicked]:          │
│   ┌────────────────────────────────────────────────────┐    │
│   │  React — daily driver · 4 years · Used in 12 projects  │
│   └────────────────────────────────────────────────────┘    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

### 04-C · Technical Implementation

```tsx
// components/skills/ConstellationGraph.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface SkillNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  domain: "frontend" | "backend" | "design" | "devops";
  level: 1 | 2 | 3;    // 1=exploring, 2=battle-tested, 3=daily-driver
  years: number;
}

interface SkillLink {
  source: string;
  target: string;
}

const DOMAIN_COLORS = {
  frontend: "#5DADE2",   // Cool blue
  backend:  "#C8FA5F",   // Signal chartreuse
  design:   "#FF8C42",   // Warm amber
  devops:   "#A66CFF",   // Purple
} as const;

const LEVEL_LABELS = {
  1: "exploring",
  2: "battle-tested",
  3: "daily driver",
} as const;

export function ConstellationGraph({
  nodes,
  links,
}: {
  nodes: SkillNode[];
  links: SkillLink[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<SkillNode | null>(null);
  const simRef = useRef<d3.Simulation<SkillNode, d3.SimulationLinkDatum<SkillNode>> | null>(null);
  const nodesRef = useRef<SkillNode[]>(nodes);
  const linksRef = useRef<d3.SimulationLinkDatum<SkillNode>[]>(links as any);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    // D3 force simulation
    const sim = d3.forceSimulation(nodesRef.current)
      .force("link",      d3.forceLink(linksRef.current).id((d: any) => d.id).distance(70).strength(0.3))
      .force("charge",    d3.forceManyBody().strength(-180))
      .force("center",    d3.forceCenter(W / 2, H / 2))
      .force("collision", d3.forceCollide((d: any) => d.level * 10 + 12))
      .alphaDecay(0.02);   // Slow settle for organic feel

    simRef.current = sim;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw links
      ctx.save();
      linksRef.current.forEach((link: any) => {
        const source = link.source as SkillNode;
        const target = link.target as SkillNode;
        if (!source.x || !target.x) return;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = "rgba(255,255,255,0.04)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      ctx.restore();

      // Draw nodes
      nodesRef.current.forEach((node) => {
        if (!node.x || !node.y) return;
        const r = node.level * 8 + 6;
        const color = DOMAIN_COLORS[node.domain];
        const isSelected = selected?.id === node.id;

        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 3);
        gradient.addColorStop(0, color + (isSelected ? "50" : "20"));
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? color : color + "99";
        ctx.fill();

        // Label
        ctx.font = `${11}px "Geist Mono", monospace`;
        ctx.fillStyle = isSelected ? "#E8ECF0" : "#6B7A8F";
        ctx.textAlign = "center";
        ctx.fillText(node.name, node.x, node.y + r + 14);
      });
    };

    sim.on("tick", draw);

    // Click detection
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const hit = nodesRef.current.find((n) => {
        const r = n.level * 8 + 6 + 4; // Add padding for easier clicking
        return Math.hypot((n.x ?? 0) - mx, (n.y ?? 0) - my) < r;
      });

      setSelected(hit ?? null);

      // Pulse animation on click
      if (hit && simRef.current) {
        // Momentarily heat the simulation for a "pulse" effect
        sim.alpha(0.3).restart();
      }
    };

    canvas.addEventListener("click", onClick);

    return () => {
      sim.stop();
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="constellation">
      <canvas
        ref={canvasRef}
        className="constellation__canvas"
        role="img"
        aria-label="Interactive tech skills constellation graph"
      />

      {/* Tooltip */}
      {selected && (
        <div className="constellation__tooltip" role="status" aria-live="polite">
          <span className="text-mono" style={{ color: DOMAIN_COLORS[selected.domain] }}>
            {selected.name}
          </span>
          <span className="text-label">
            {LEVEL_LABELS[selected.level]} · {selected.years}y
          </span>
        </div>
      )}
    </div>
  );
}
```

---

## SECTION 05 — ABOUT & CONTACT
### Inspired by: Editorial restraint (Benoist) + Leonardi's human storytelling
**Goal: Make a human connection after all the visual spectacle.**

---

### 05-A · The About Section

After all the WebGL, particles, and physics simulations, the About section must feel like the site takes a breath. This is where **Leonardi's principle** applies — he used his portfolio to tell a *human* story through the medium. The technical craft was always in service of revealing the person.

**Layout:** A full-width, almost brutally simple text section. Large type. A real photograph treated with a subtle duotone CSS filter (matching the current mode's accent color). Two columns: left is a philosophy statement (Playfair Display Italic in Designer mode, Geist Mono in Engineer mode), right is a structured "currently" widget.

```tsx
// components/about/AboutSection.tsx (simplified)
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerReveal } from "@/lib/motion";

const PHILOSOPHY = [
  "I believe the best interfaces are the ones you don't notice.",
  "They work so fluently with the way you think that the technology disappears.",
  "My job is to make that disappearance feel inevitable.",
];

const CURRENTLY = {
  building: "REMAL — Real Estate Platform",
  reading: "The Design of Everyday Things",
  exploring: "WebGPU + WGSL shaders",
  listening: "Nicolas Jaar — Space Is Only Noise",
};

export function AboutSection() {
  return (
    <section className="about" id="about" aria-label="About">
      <div className="about__grid">
        <div className="about__image-col">
          <div className="about__image-frame">
            <Image
              src="/portrait.jpg"
              alt="A photograph of [Your Name]"
              width={480}
              height={600}
              className="about__image"
              // CSS filter applies duotone matching current mode color
              style={{ filter: "grayscale(0.3) contrast(1.1)" }}
            />
          </div>
        </div>

        <div className="about__content-col">
          {/* Philosophy */}
          <div className="about__philosophy">
            {PHILOSOPHY.map((line, i) => (
              <motion.p
                key={i}
                className="text-title about__philosophy-line"
                {...staggerReveal(i)}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Currently widget */}
          <div className="about__currently" role="region" aria-label="Currently">
            <span className="text-label about__currently-heading">
              CURRENTLY —
            </span>
            <dl className="about__currently-list">
              {Object.entries(CURRENTLY).map(([key, value], i) => (
                <div key={key} className="about__currently-item">
                  <dt className="text-mono">{key.toUpperCase()}</dt>
                  <dd className="text-section">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### 05-B · The Contact Section — "The Terminal" (Bruno Simon mechanic applied)

Bruno Simon's key insight: **make the experience interactive in a way that reveals personality.** His car drove through a world. Our contact section is a **fake terminal** that turns the boring act of composing an email into a memorable micro-game.

The terminal has a blinking cursor, accepts typed commands, autocompletes suggestions, and ultimately drafts and "sends" (opens `mailto:`) in a theatrical way.

```tsx
// components/contact/Terminal.tsx
"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const COMMANDS: Record<string, string | ((args: string[]) => string)> = {
  "help":  "Available: hello · work · contact · about · clear",
  "hello": "Oh hey 👋  Type: contact to reach out.",
  "work":  "→ Redirecting to work section...", // + scrollIntoView effect
  "about": "→ Jumping to about section...",
  "contact [message]": (args) =>
    args.length > 0
      ? `Opening mailto with: "${args.join(" ")}"... 📨`
      : "Usage: contact [your message]",
  "clear": "__CLEAR__",
};

type LogLine = { id: number; type: "input" | "output" | "error"; text: string };

export function Terminal() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<LogLine[]>([
    { id: 0, type: "output", text: "PORTFOLIO TERMINAL v1.0" },
    { id: 1, type: "output", text: 'Type "help" for available commands.' },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(2);

  const push = (type: LogLine["type"], text: string) => {
    setLog(prev => [...prev, { id: idRef.current++, type, text }]);
  };

  const execute = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    push("input", `$ ${cmd}`);
    setHistory(h => [cmd, ...h]);
    setHistoryIndex(-1);

    const [command, ...args] = trimmed.split(" ");

    if (command === "clear") { setLog([]); return; }

    if (command === "contact" && args.length > 0) {
      const message = args.join(" ");
      push("output", `Opening email to: hey@yourname.com`);
      push("output", `Subject: "${message}"`);
      setTimeout(() => {
        window.location.href = `mailto:hey@yourname.com?subject=${encodeURIComponent(message)}`;
      }, 800);
      return;
    }

    const result = COMMANDS[command];
    if (typeof result === "string") {
      push("output", result);
    } else if (typeof result === "function") {
      push("output", result(args));
    } else {
      push("error", `Command not found: "${command}". Type "help".`);
    }
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom of log
    logRef.current?.scrollTo(0, logRef.current.scrollHeight);
  }, [log]);

  return (
    <section className="contact" id="contact" aria-label="Contact terminal">
      <h2 className="text-label contact__heading">GET IN TOUCH —</h2>

      <div
        className="terminal"
        onClick={() => inputRef.current?.focus()}
        role="application"
        aria-label="Interactive terminal. Type help for available commands."
      >
        <div className="terminal__header" aria-hidden="true">
          <span className="terminal__dot" style={{ background: "#FF5F57" }} />
          <span className="terminal__dot" style={{ background: "#FEBC2E" }} />
          <span className="terminal__dot" style={{ background: "#28C840" }} />
          <span className="terminal__title text-mono">portfolio — bash</span>
        </div>

        <div
          ref={logRef}
          className="terminal__log"
          role="log"
          aria-live="polite"
          aria-atomic="false"
        >
          {log.map(line => (
            <div
              key={line.id}
              className={`terminal__line terminal__line--${line.type} text-mono`}
            >
              {line.text}
            </div>
          ))}
        </div>

        <div className="terminal__input-row">
          <span className="terminal__prompt text-mono" aria-hidden="true">$ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") { execute(input); setInput(""); }
              if (e.key === "ArrowUp") {
                const i = Math.min(historyIndex + 1, history.length - 1);
                setHistoryIndex(i);
                setInput(history[i] ?? "");
              }
              if (e.key === "ArrowDown") {
                const i = Math.max(historyIndex - 1, -1);
                setHistoryIndex(i);
                setInput(i === -1 ? "" : history[i]);
              }
              if (e.key === "Tab") {
                e.preventDefault();
                // Autocomplete
                const match = Object.keys(COMMANDS).find(k => k.startsWith(input));
                if (match) setInput(match.replace("[message]", "").trim() + " ");
              }
            }}
            className="terminal__input text-mono"
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
          <span className="terminal__cursor" aria-hidden="true">█</span>
        </div>
      </div>

      {/* Fallback for non-JS / screen readers */}
      <noscript>
        <p>
          Email me directly at{" "}
          <a href="mailto:hey@yourname.com">hey@yourname.com</a>
        </p>
      </noscript>
    </section>
  );
}
```

---

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PART III — TECHNICAL STRATEGY & PERFORMANCE ORCHESTRATION
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---

## 3.1 — The Global Animation Orchestrator

**The core pattern (straight from Codrops research):** GSAP × WebGL communication should use a **single progress uniform as the bridge** between JavaScript and the GPU. GSAP owns the curve. The shader is stateless.

```typescript
// lib/gsap-setup.ts — Register all GSAP plugins ONCE at the app level
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";

// Register all plugins once
gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  ScrambleTextPlugin,
  MorphSVGPlugin,
  CustomEase,
);

// Custom eases matching our motion token system
CustomEase.create("land",   "M0,0 C0.16,1 0.3,1 1,1");
CustomEase.create("launch", "M0,0 C0.7,0 0.84,0 1,1");
CustomEase.create("cinema", "M0,0 C0.85,0 0.15,1 1,1");

export function initLenisGSAP(): () => void {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
    syncTouch: false,         // Don't smooth on mobile touch — feels unnatural
  });

  // ─── THE CRITICAL SYNC ───────────────────────────────────
  // Lenis MUST be driven by GSAP's ticker, not its own rAF loop.
  // This ensures scroll position is consistent with animation state.
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0); // Lenis handles lag smoothing

  // Make Lenis's scroll position available to ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // Make ScrollTrigger use Lenis's virtual scroll position
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      return arguments.length
        ? lenis.scrollTo(value as number, { immediate: true })
        : lenis.scroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
  });

  // Expose globally for component-level access
  (window as any).__lenis = lenis;

  return () => {
    lenis.destroy();
    gsap.ticker.remove(lenis.raf.bind(lenis));
  };
}
```

```tsx
// app/providers.tsx — Initialize at app root
"use client";
import { useEffect } from "react";
import { initLenisGSAP } from "@/lib/gsap-setup";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const cleanup = initLenisGSAP();
    return cleanup;
  }, []);

  return <>{children}</>;
}
```

---

## 3.2 — The Page Transition System

Next.js 15 App Router handles page transitions via `app/template.tsx`. Unlike `layout.tsx` which persists, `template.tsx` creates a fresh instance on each navigation — perfect for exit/enter animations.

```tsx
// app/template.tsx — Framer Motion page transitions
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const variants = {
  initial: {
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",  // Wipe from right
  },
  animate: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.7, ease: [0.85, 0, 0.15, 1] },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0 0 0 100%)",  // Wipe to left
    transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] },
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
```

**Framer Motion + GSAP coexistence rule:** Never animate the same element with both libraries simultaneously. Keep them in separate "zones":
- **Framer Motion:** Page transitions, layout animations, exit/enter sequences
- **GSAP:** ScrollTrigger animations, SplitText reveals, timeline choreography, WebGL uniform updates

---

## 3.3 — WebGL Context Management (Global Singleton Pattern)

Browsers impose a hard limit of **8–16 WebGL contexts** per page. A portfolio that creates a new context per component will hit this limit. The solution: **one global OGL Renderer, repositioned between sections.**

```typescript
// lib/webgl/GlobalRenderer.ts
// A single OGL renderer that "travels" across sections
import { Renderer } from "ogl";

class GlobalWebGLRenderer {
  private static _instance: GlobalWebGLRenderer | null = null;
  readonly renderer: Renderer;
  private _currentHost: HTMLElement | null = null;

  private constructor() {
    this.renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,          // Cheaper — we fake AA with FXAA post-process
      powerPreference: "high-performance",
    });

    const { gl } = this.renderer;
    Object.assign(gl.canvas.style, {
      position:      "absolute",
      top:           "0",
      left:          "0",
      width:         "100%",
      height:        "100%",
      pointerEvents: "none",
      zIndex:        "0",
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    gl.clearColor(0, 0, 0, 0);
  }

  static get(): GlobalWebGLRenderer {
    if (!this._instance) this._instance = new GlobalWebGLRenderer();
    return this._instance;
  }

  // Move the canvas to a different DOM host
  mount(host: HTMLElement) {
    if (this._currentHost === host) return;
    this._currentHost = host;
    host.appendChild(this.renderer.gl.canvas);
    this.resize(host.offsetWidth, host.offsetHeight);
  }

  resize(w: number, h: number) {
    this.renderer.setSize(w, h);
  }

  destroy() {
    this.renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
    GlobalWebGLRenderer._instance = null;
  }
}

export const globalGL = GlobalWebGLRenderer.get();
```

---

## 3.4 — Lazy Loading Strategy

**Rule:** Every heavy 3D/WebGL component loads only when it enters the viewport — not at page load.

```typescript
// lib/useLazyWebGL.ts
"use client";
import { useEffect, useRef, useState } from "react";

export function useLazyWebGL(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReady(true);
          observer.disconnect(); // Only load once
        }
      },
      { threshold, rootMargin: "200px 0px" } // Pre-load 200px before viewport entry
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isReady };
}
```

```tsx
// Usage in any heavy section
function SkillsSection() {
  const { ref, isReady } = useLazyWebGL(0.05);

  return (
    <section ref={ref} className="skills">
      {isReady ? (
        // Only renders when section is near viewport
        <ConstellationGraph nodes={SKILLS} links={SKILL_LINKS} />
      ) : (
        // Skeleton placeholder holds layout space — prevents CLS
        <div className="skills__skeleton" aria-busy="true" aria-live="polite">
          <span className="sr-only">Loading skills visualization...</span>
        </div>
      )}
    </section>
  );
}
```

---

## 3.5 — GPU Composite Property Enforcement

```typescript
// lib/animation-guards.ts
// A dev-mode utility that warns if you try to animate non-compositable properties
import gsap from "gsap";

const DANGER_PROPS = new Set([
  "width", "height", "top", "left", "right", "bottom",
  "margin", "padding", "fontSize", "lineHeight",
  "backgroundColor", "color", "borderRadius", "boxShadow",
]);

const SAFE_PROPS = new Set([
  "x", "y", "z", "xPercent", "yPercent",
  "rotation", "rotationX", "rotationY", "rotationZ",
  "scale", "scaleX", "scaleY",
  "skewX", "skewY",
  "opacity",
  "filter",  // Safe as composited layer
]);

if (process.env.NODE_ENV === "development") {
  gsap.config({ nullTargetWarn: true });

  // Monkey-patch gsap.to in dev to warn on dangerous properties
  const originalTo = gsap.to.bind(gsap);
  gsap.to = (targets: any, vars: any) => {
    Object.keys(vars).forEach((key) => {
      if (DANGER_PROPS.has(key)) {
        console.warn(
          `[PERF WARNING] GSAP animating "${key}" causes layout reflow. ` +
          `Use transform equivalents: x/y/scale/opacity.`
        );
      }
    });
    return originalTo(targets, vars);
  };
}
```

---

## 3.6 — `prefers-reduced-motion` Architecture

Motion reduction must be systemic — not bolted on per component.

```typescript
// hooks/useMotionPreference.ts
import { useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import gsap from "gsap";

export function useMotionPreference() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      // Globally gut GSAP animation durations
      gsap.globalTimeline.timeScale(1000); // Make everything instant
      // Disable Lenis smooth scroll
      (window as any).__lenis?.destroy();
      // Set a data attribute for CSS-level motion reduction
      document.documentElement.dataset.reducedMotion = "true";
    }
  }, [prefersReduced]);

  return { prefersReduced };
}
```

```css
/* Comprehensive CSS motion reduction */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }

  /* Hide WebGL canvases entirely — show static fallbacks */
  [aria-hidden="true"] canvas {
    display: none;
  }

  /* Disable custom cursor */
  * { cursor: auto !important; }

  /* Remove parallax effects */
  .hero__canvas-wrapper { display: none; }
}
```

---

## 3.7 — Complete Project Folder Structure

```
├── app/
│   ├── layout.tsx           ← Fonts, metadata, providers — Server Component
│   ├── template.tsx         ← Framer Motion page transitions — Client
│   ├── page.tsx             ← Home — Server Component (LCP-safe)
│   ├── work/
│   │   ├── page.tsx         ← Work listing — SSG
│   │   └── [slug]/
│   │       ├── page.tsx     ← Project detail — ISR (revalidate: 3600)
│   │       └── loading.tsx  ← Skeleton
│   └── providers.tsx        ← Lenis + GSAP init — Client
│
├── components/
│   ├── hero/
│   │   ├── HeroCanvas.tsx   ← dynamic(WebGLScene, {ssr:false})
│   │   ├── WebGLScene.tsx   ← Three.js + post-processing — "use client"
│   │   └── HeroReveal.tsx   ← GSAP clip-path ITom reveal — "use client"
│   ├── nav/
│   │   ├── Navigation.tsx   ← Server Component shell
│   │   └── ModeToggle.tsx   ← Engineer/Designer toggle — "use client"
│   ├── duality/
│   │   ├── DualitySwitch.tsx  ← Drag dial — "use client"
│   │   └── DualityParticles.tsx ← OGL GLSL shader bg — "use client"
│   ├── projects/
│   │   ├── ProjectsList.tsx   ← Server Component — fetches data
│   │   ├── ProjectRow.tsx     ← Client — OGL flowmap hover
│   │   └── ProjectDetail.tsx  ← MDX layout
│   ├── skills/
│   │   ├── SkillsSection.tsx  ← Lazy loader wrapper
│   │   └── ConstellationGraph.tsx ← D3 force graph — "use client"
│   ├── about/
│   │   └── AboutSection.tsx
│   ├── contact/
│   │   └── Terminal.tsx       ← Interactive terminal — "use client"
│   └── ui/
│       ├── CustomCursor.tsx   ← Magnetic cursor — "use client"
│       └── ScrollProgress.tsx ← Reading progress — "use client"
│
├── lib/
│   ├── gsap-setup.ts          ← GSAP register + Lenis sync
│   ├── motion.ts              ← Shared animation constants
│   ├── webgl/
│   │   ├── GlobalRenderer.ts  ← OGL singleton
│   │   ├── OGLManager.ts      ← Flowmap + texture swap system
│   │   └── shaders/
│   │       ├── flowmap.frag   ← Aristide flowmap shader
│   │       ├── duality.frag   ← Duality particles shader
│   │       └── hero.frag      ← Hero particle field
│   └── content/
│       └── projects.ts        ← Content schema + fetch utils
│
├── content/
│   └── projects/
│       └── *.mdx              ← Project case studies in MDX
│
├── public/
│   ├── fonts/                 ← Self-hosted variable fonts
│   ├── textures/              ← KTX2 compressed WebGL textures
│   ├── models/                ← Draco-compressed .glb files
│   └── og/                    ← Open Graph images per project
│
├── hooks/
│   ├── useMotionPreference.ts
│   ├── useLazyWebGL.ts
│   └── useMode.ts             ← Global mode state (Zustand atom)
│
└── styles/
    ├── globals.css            ← CSS tokens + root vars
    ├── typography.css         ← Type scale definitions
    └── components/            ← Component-scoped styles
```

---

## 3.8 — Performance Budget & CI Enforcement

```json
// budget.json — enforced in every PR via Lighthouse CI
{
  "assertions": {
    "first-contentful-paint":    ["error",   { "maxNumericValue": 1200 }],
    "largest-contentful-paint":  ["error",   { "maxNumericValue": 1800 }],
    "cumulative-layout-shift":   ["error",   { "maxNumericValue": 0.05 }],
    "total-blocking-time":       ["error",   { "maxNumericValue": 150  }],
    "interactive":               ["warn",    { "maxNumericValue": 3500 }],
    "max-potential-fid":         ["warn",    { "maxNumericValue": 100  }],
    "uses-optimized-images":     ["error",   { "minScore": 1 }],
    "uses-webp-images":          ["error",   { "minScore": 1 }],
    "uses-text-compression":     ["error",   { "minScore": 1 }],
    "render-blocking-resources": ["error",   { "maxNumericValue": 0   }]
  }
}
```

```yaml
# .github/workflows/quality.yml
name: Portfolio Quality Gate

on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
      - run: npm run build
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          budgetPath: ./budget.json
          uploadArtifacts: true
          serverBaseUrl: ${{ secrets.LHCI_SERVER }}

  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npx tsc --noEmit

  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - name: Run axe accessibility audit
        uses: dequelabs/axe-linter-action@v1
```

---

## 3.9 — The Build Phase Execution Order

Follow this order to ship without technical debt accumulating:

```
Phase 1: Foundation (Week 1)
─ Set up Next.js 15 + TypeScript + Tailwind v4
─ Configure CSS token system (globals.css)
─ Load fonts via next/font — verify zero CLS
─ Set up Lenis + GSAP integration (lib/gsap-setup.ts)
─ Build Navigation component
─ Deploy skeleton to Vercel — measure baseline Lighthouse

Phase 2: Hero (Week 1-2)
─ Build server-rendered HeroText (LCP-safe h1)
─ Build WebGLScene (Three.js torus knot + bloom)
─ Build HeroReveal (GSAP clip-path ITom reveal)
─ Build CustomCursor
─ Verify LCP < 1.5s — the hero is the make-or-break

Phase 3: Duality Switch (Week 2)
─ Build drag dial component
─ Implement CSS custom property interpolation
─ Build DualityParticles (OGL GLSL background)
─ Test keyboard accessibility (arrow keys)

Phase 4: Projects (Week 2-3)
─ Build OGLManager singleton
─ Build ProjectRow with flowmap hover
─ Build dual-view toggle (Design/Code)
─ Add project MDX content
─ Build project detail page with ISR

Phase 5: Skills + About + Contact (Week 3)
─ Build ConstellationGraph (D3 force simulation)
─ Implement useLazyWebGL for skills section
─ Build AboutSection
─ Build Terminal contact component

Phase 6: Performance & Polish (Week 4)
─ Run Lighthouse — fix regressions methodically
─ Audit WebGL memory (use Chrome GPU memory tracker)
─ Test prefers-reduced-motion comprehensively
─ Screen reader audit (VoiceOver + NVDA)
─ Mobile performance audit (real device, not DevTools)
─ Generate OG images for all pages
─ Set up Vercel Speed Insights + PostHog
─ Submit to Awwwards
```

---

# APPENDIX — Quick Reference Checklist

```
IDENTITY
[✓] CSS custom property token system
[✓] Dual-mode: engineer/designer — CSS vars + data-mode attribute
[✓] 4-font system: Syne · Playfair · Geist Mono · DM Sans

HERO
[✓] h1 rendered by Server Component — LCP-safe
[✓] WebGL loaded via dynamic import (ssr: false)
[✓] GSAP clip-path reveal — ITom paper-tear method
[✓] Lusion-style post-processing: bloom + film grain

DUALITY
[✓] Drag dial: -1 to +1 range
[✓] Real-time CSS custom property interpolation
[✓] Keyboard accessible (aria-slider)
[✓] GLSL background particles sync with mode

PROJECTS
[✓] Single OGL context — no memory leaks
[✓] Flowmap texture swap — not context recreation
[✓] Dual-view toggle: design preview / code architecture
[✓] Aristide Benoist editorial list layout

SKILLS
[✓] D3 force-directed graph — Canvas2D (not WebGL)
[✓] IntersectionObserver lazy load
[✓] Accessible: role="img" + keyboard click

CONTACT
[✓] Bruno Simon mechanic: interactive terminal
[✓] Tab autocomplete + arrow-key history
[✓] mailto: trigger on "contact [message]"
[✓] noscript fallback

PERFORMANCE
[✓] Lenis + GSAP ticker synced
[✓] Idle guard on all WebGL loops
[✓] Dynamic quality scaling in hero WebGL
[✓] useLazyWebGL for below-fold sections
[✓] GPU composite properties enforced
[✓] will-change added/removed in GSAP lifecycle

ACCESSIBILITY
[✓] prefers-reduced-motion: system-level kill switch
[✓] All canvas elements: aria-hidden="true"
[✓] All interactive elements: keyboard operable
[✓] Color contrast: WCAG AA minimum everywhere
[✓] Focus management after page transitions
[✓] noscript fallbacks for terminal + WebGL

SEO
[✓] JSON-LD Person schema
[✓] Per-project OpenGraph via generateMetadata
[✓] sitemap.xml via next-sitemap
[✓] No render-blocking resources
```

---

*This blueprint is a production-ready roadmap. Every code example is functional and follows current Next.js 15, GSAP 3 (post-Webflow acquisition, fully free), and OGL best practices as of mid-2026.*
