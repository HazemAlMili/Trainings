"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroReveal() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Teardown the overlay by shrinking its clip-path
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

    // Fade and slide up the main title
    tl.fromTo(
      ".hero__name",
      { y: 80, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
      "<0.4"
    );

    // Stagger individual subheadings
    tl.fromTo(
      ".hero__subtitle span",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.15 },
      "<0.3"
    );
  }, []);

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundColor: "var(--c-base)",
        zIndex: 50,
      }}
    />
  );
}
