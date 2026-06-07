"use client";
import { useEffect, useRef, useState } from "react";

export function useLazyWebGL(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsReady(true);
      return;
    }

    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReady(true);
          observer.disconnect(); // Stop observing once loaded
        }
      },
      { threshold, rootMargin: "200px 0px" } // Hydrate 200px before entry
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isReady };
}
