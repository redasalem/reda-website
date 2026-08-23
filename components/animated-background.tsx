"use client";

import React, { memo } from "react";

const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 -z-20 pointer-events-none overflow-hidden noise-overlay"
      aria-hidden="true"
    >
      {/* Mint Orb — Top Left */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[100px] md:blur-[130px] opacity-20 dark:opacity-15 transform-gpu"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-mint-500, oklch(0.85 0.20 158)) 0%, transparent 70%)",
          animation: "orbFloat1 20s ease-in-out infinite",
        }}
      />

      {/* Violet Orb — Middle Right */}
      <div
        className="absolute top-[30%] -right-[10%] w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full blur-[100px] md:blur-[130px] opacity-12 dark:opacity-10 transform-gpu"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-violet-500, oklch(0.65 0.27 290)) 0%, transparent 70%)",
          animation: "orbFloat2 24s ease-in-out infinite",
        }}
      />

      {/* Cyan Orb — Bottom Left */}
      <div
        className="absolute -bottom-[10%] left-[10%] w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full blur-[100px] md:blur-[130px] opacity-12 dark:opacity-8 transform-gpu"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-cyan-500, oklch(0.72 0.18 200)) 0%, transparent 70%)",
          animation: "orbFloat3 18s ease-in-out infinite",
        }}
      />

      {/* Subtle Amber accent — Far right bottom */}
      <div
        className="absolute bottom-[15%] right-[5%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full blur-[120px] md:blur-[150px] opacity-6 dark:opacity-5 transform-gpu"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-amber-400, oklch(0.82 0.16 75)) 0%, transparent 70%)",
          animation: "orbFloat1 22s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
});

export default AnimatedBackground;
