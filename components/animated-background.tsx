"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AnimatedBackground() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Use refs to store mutable data for the animation loop without triggering re-renders
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isMobile = useRef(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    // Check if it's a mobile device (no hover)
    const mobileQuery = window.matchMedia("(hover: none)");
    isMobile.current = mobileQuery.matches;
    
    const handleMobileChange = (e: MediaQueryListEvent) => {
      isMobile.current = e.matches;
    };
    mobileQuery.addEventListener("change", handleMobileChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      mobileQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile.current) return;
      // Normalize mouse coordinates from -1 to 1 based on screen center
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      
      mouse.current.targetX = x * 100; // max translation 100px
      mouse.current.targetY = y * 100;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;
    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startTime) / 1000; // in seconds

      // Lerp mouse
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Blob 1: Mint Green (Top Left mostly)
      if (blob1Ref.current) {
        const floatX = Math.sin(elapsed * 0.3) * 50;
        const floatY = Math.cos(elapsed * 0.4) * 50;
        const scale = 1 + Math.sin(elapsed * 0.5) * 0.1;
        blob1Ref.current.style.transform = `translate3d(${floatX + mouse.current.x * 0.5}px, ${floatY + mouse.current.y * 0.5}px, 0) scale(${scale})`;
      }

      // Blob 2: Deep Violet (Bottom Right mostly)
      if (blob2Ref.current) {
        const floatX = Math.cos(elapsed * 0.25) * 70;
        const floatY = Math.sin(elapsed * 0.35) * 70;
        const scale = 1 + Math.cos(elapsed * 0.4) * 0.15;
        blob2Ref.current.style.transform = `translate3d(${floatX + mouse.current.x * -0.3}px, ${floatY + mouse.current.y * -0.3}px, 0) scale(${scale})`;
      }

      // Blob 3: Soft Cyan (Center moving)
      if (blob3Ref.current) {
        const floatX = Math.sin(elapsed * 0.2 + 2) * 90;
        const floatY = Math.cos(elapsed * 0.3 + 1) * 90;
        const scale = 1 + Math.sin(elapsed * 0.45) * 0.12;
        blob3Ref.current.style.transform = `translate3d(${floatX + mouse.current.x * 0.2}px, ${floatY + mouse.current.y * 0.2}px, 0) scale(${scale})`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-20 pointer-events-none opacity-20 dark:opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-mint-500/30 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[120px]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* 
        Using will-change-transform for GPU acceleration.
        Border radius creates organic shapes.
      */}
      <div
        ref={blob1Ref}
        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] mix-blend-screen dark:mix-blend-lighten blur-[100px] md:blur-[140px] opacity-30 dark:opacity-20 will-change-transform"
        style={{
          background: "var(--color-brand-mint-500, oklch(0.85 0.20 158))",
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
        }}
      />
      
      <div
        ref={blob2Ref}
        className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] mix-blend-screen dark:mix-blend-lighten blur-[100px] md:blur-[140px] opacity-20 dark:opacity-[0.15] will-change-transform"
        style={{
          background: "rgb(79, 70, 229)", // Indigo-600
          borderRadius: "60% 40% 30% 70% / 50% 60% 40% 50%",
        }}
      />

      <div
        ref={blob3Ref}
        className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] mix-blend-screen dark:mix-blend-lighten blur-[100px] md:blur-[140px] opacity-20 dark:opacity-[0.15] will-change-transform"
        style={{
          background: "rgb(6, 182, 212)", // Cyan-500
          borderRadius: "30% 70% 50% 50% / 60% 30% 70% 40%",
        }}
      />
    </div>
  );
}
