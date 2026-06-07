"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register the free ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function initLenisGSAP(): () => void {
  if (typeof window === "undefined") return () => {};

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
  });

  // Sync Lenis scroll with the GSAP ticker
  const updateTicker = (time: number) => {
    lenis.raf(time * 1000);
  };
  
  gsap.ticker.add(updateTicker);
  gsap.ticker.lagSmoothing(0);

  lenis.on("scroll", ScrollTrigger.update);

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

  // Expose Lenis instance globally
  (window as any).__lenis = lenis;

  return () => {
    lenis.destroy();
    gsap.ticker.remove(updateTicker);
  };
}
