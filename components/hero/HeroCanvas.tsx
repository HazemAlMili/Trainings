"use client";
import dynamic from "next/dynamic";

const WebGLScene = dynamic(
  () => import("@/components/hero/WebGLScene"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-transparent" />,
  }
);

export function HeroCanvas() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    >
      <WebGLScene />
    </div>
  );
}
