"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    VANTA?: {
      DOTS?: (options: Record<string, unknown>) => { destroy?: () => void };
    };
    THREE?: unknown;
  }
}

type VantaDotsHeroProps = {
  className?: string;
};

export function VantaDotsHero({ className }: VantaDotsHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<{ destroy?: () => void } | null>(null);
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [vantaLoaded, setVantaLoaded] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.THREE) {
      setThreeLoaded(true);
    }

    if (window.VANTA?.DOTS) {
      setVantaLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!threeLoaded || !vantaLoaded || !containerRef.current || !window.VANTA?.DOTS || !window.THREE) {
      return;
    }

    effectRef.current?.destroy?.();

    const isDark = resolvedTheme === "dark";

    try {
      effectRef.current = window.VANTA.DOTS({
        el: containerRef.current,
        THREE: window.THREE as Record<string, unknown>,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 1000,
        minWidth: 1000,
        scale: 1,
        scaleMobile: 1,
        color: isDark ? 0x6ab4ff : 0x2b5aa2,
        color2: isDark ? 0x8ce6ff : 0x5f8fd9,
        size: isDark ? 2.1 : 1.85,
        spacing: isDark ? 26 : 23,
        showLines: false,
        backgroundColor: isDark ? 0x050810 : 0xf2f5fb
      });
    } catch (error) {
      console.warn("[VANTA] Init skipped", error);
      effectRef.current = null;
      return;
    }

    return () => {
      effectRef.current?.destroy?.();
      effectRef.current = null;
    };
  }, [resolvedTheme, threeLoaded, vantaLoaded]);

  return (
    <>
      <Script
        id="vanta-three"
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
        onReady={() => setThreeLoaded(Boolean(window.THREE))}
      />
      {threeLoaded ? (
        <Script
          id="vanta-dots"
          src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.dots.min.js"
          strategy="afterInteractive"
          onReady={() => setVantaLoaded(Boolean(window.VANTA?.DOTS))}
        />
      ) : null}
      <div ref={containerRef} className={cn("absolute inset-0", className)} aria-hidden />
    </>
  );
}
