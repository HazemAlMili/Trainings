"use client";
import { useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import gsap from "gsap";

export function useMotionPreference() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      // Scale up time so GSAP animations execute instantly
      gsap.globalTimeline.timeScale(1000);
      
      // Stop Lenis smooth scroll if it exists
      if ((window as any).__lenis) {
        (window as any).__lenis.destroy();
      }
      
      // Set data attribute for global CSS selection overrides
      document.documentElement.dataset.reducedMotion = "true";
    }
  }, [prefersReduced]);

  return { prefersReduced };
}
