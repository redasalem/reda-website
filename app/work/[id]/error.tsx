"use client";
import Link from "next/link";
export default function ProjectError({ reset }: { reset: () => void }) {
  return <main id="main-content" className="case-study"><h1>Case study unavailable</h1><p className="lead">The project service could not be reached. Please try again.</p><div className="case-actions"><button className="button-primary" onClick={reset}>Try again</button><Link className="text-link" href="/#work">Back to work</Link></div></main>;
}
