import React from "react";

interface AiAvatarIconProps {
  className?: string;
  size?: number;
}

export default function AiAvatarIcon({ className = "w-8 h-8", size = 32 }: AiAvatarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Holographic Gradient */}
        <linearGradient id="redaAiGrad1" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00ff9f" />
          <stop offset="45%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>

        <linearGradient id="redaAiGrad2" x1="44" y1="8" x2="8" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#00ff9f" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
        </linearGradient>

        <radialGradient id="redaCoreGlow" cx="24" cy="24" r="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00ff9f" stopOpacity="0.8" />
          <stop offset="40%" stopColor="#00e5ff" stopOpacity="0.4" />
          <stop offset="80%" stopColor="#a855f7" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="redaPupilGlow" cx="24" cy="24" r="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#00ff9f" />
          <stop offset="100%" stopColor="#06b6d4" />
        </radialGradient>

        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient Core Aura */}
      <circle cx="24" cy="24" r="18" fill="url(#redaCoreGlow)" />

      {/* Outer Cybernetic Ring with notches */}
      <circle
        cx="24"
        cy="24"
        r="20"
        stroke="url(#redaAiGrad1)"
        strokeWidth="1.5"
        strokeDasharray="6 3 2 3"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Orbital Satellite Nodes */}
      <circle cx="24" cy="4" r="2" fill="#00ff9f" filter="url(#neonGlow)" />
      <circle cx="44" cy="24" r="1.5" fill="#00e5ff" filter="url(#neonGlow)" />
      <circle cx="24" cy="44" r="1.5" fill="#a855f7" filter="url(#neonGlow)" />
      <circle cx="4" cy="24" r="1.5" fill="#00ff9f" filter="url(#neonGlow)" />

      {/* Geometric Hex-Shield / AI Visor Geometry */}
      <path
        d="M24 9L36 16V32L24 39L12 32V16L24 9Z"
        stroke="url(#redaAiGrad1)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="rgba(0, 20, 15, 0.4)"
        filter="url(#neonGlow)"
      />

      {/* Internal Neural Lattice / Circuit Traces */}
      <path
        d="M24 9V18M36 16L29 20M36 32L29 28M24 39V30M12 32L19 28M12 16L19 20"
        stroke="url(#redaAiGrad2)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Inner Holographic Neural Ring */}
      <circle
        cx="24"
        cy="24"
        r="8"
        stroke="url(#redaAiGrad1)"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />

      {/* Central Quantum Eye / AI Singularity Core */}
      <circle cx="24" cy="24" r="4.5" fill="url(#redaPupilGlow)" filter="url(#neonGlow)" />
      <circle cx="23" cy="23" r="1.5" fill="#ffffff" />

      {/* Energy Sparks / Corner Accents */}
      <path
        d="M24 13L24.8 15.2L27 16L24.8 16.8L24 19L23.2 16.8L21 16L23.2 15.2L24 13Z"
        fill="#ffffff"
        opacity="0.9"
      />
    </svg>
  );
}
