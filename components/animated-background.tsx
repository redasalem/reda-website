"use client";

import React, { memo } from "react";

const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 -z-20 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Top Left Ambient Glow */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[100px] md:blur-[120px] opacity-25 dark:opacity-20 transform-gpu"
        style={{
          background: "radial-gradient(circle, var(--color-brand-mint-500, oklch(0.85 0.20 158)) 0%, transparent 70%)",
        }}
      />

      {/* Middle Right Ambient Glow */}
      <div
        className="absolute top-[35%] -right-[10%] w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full blur-[100px] md:blur-[120px] opacity-15 dark:opacity-10 transform-gpu"
        style={{
          background: "radial-gradient(circle, rgb(79, 70, 229) 0%, transparent 70%)",
        }}
      />

      {/* Bottom Left Ambient Glow */}
      <div
        className="absolute -bottom-[10%] left-[15%] w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full blur-[100px] md:blur-[120px] opacity-15 dark:opacity-10 transform-gpu"
        style={{
          background: "radial-gradient(circle, rgb(6, 182, 212) 0%, transparent 70%)",
        }}
      />
    </div>
  );
});

export default AnimatedBackground;

