/**
 * GridBackground — site-wide fixed dots pattern (CSS-only, no JS animations).
 * Placed once in root layout behind all content.
 */
export default function GridBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      {/* Dots grid layer */}
      <div
        className="absolute inset-0 opacity-[0.18] dark:opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          color: "var(--color-brand-mint-500, oklch(0.85 0.20 158))",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 100%)",
        }}
      />

    </div>
  );
}
