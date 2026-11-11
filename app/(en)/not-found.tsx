import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6">
      <p className="text-sm font-mono uppercase tracking-widest text-brand-mint-400">
        404 / NOT FOUND
      </p>
      <h1 className="text-4xl md:text-5xl font-bold text-foreground">
        This page doesn&apos;t exist<span aria-hidden="true">.</span>
      </h1>
      <p className="text-muted-foreground max-w-md">
        The link may be outdated, or the content may have moved. The selected
        engineering work is still one click away.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link className="btn-gradient" href="/#projects">
          Explore selected work ↗
        </Link>
        <Link
          className="px-6 py-3 rounded-full border border-border text-foreground hover:bg-white/5 transition-colors"
          href="/"
        >
          Back to portfolio
        </Link>
      </div>
    </div>
  );
}
