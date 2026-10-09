import Link from "next/link";

export const metadata = {
  title: "Page not found",
  description: "The page you requested could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main-content" className="case-study">
      <p className="eyebrow">404 / NOT FOUND</p>
      <h1>
        This page doesn&apos;t exist<span aria-hidden="true">.</span>
      </h1>
      <p className="lead">
        The link may be outdated, or the content may have moved. The selected
        engineering work is still one click away.
      </p>
      <div className="case-actions">
        <Link className="button-primary" href="/#work">
          Explore selected work ↗
        </Link>
        <Link className="text-link" href="/">
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}
