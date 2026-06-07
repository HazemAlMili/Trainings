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
