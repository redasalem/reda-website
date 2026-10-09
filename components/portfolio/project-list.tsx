import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublishedProjects } from "@/lib/public-projects";
import Reveal from "./reveal";
export default async function ProjectList() {
  let projects;
  try { projects = await getPublishedProjects(); }
  catch { return <p className="project-notice">Case studies are temporarily unavailable. <a href="https://github.com/redasalem">Explore my work on GitHub ↗</a></p>; }
  if (!projects.length) return <div className="project-notice"><p>Good engineering leaves a trail.</p><p>Explore my repositories while the next case studies are being prepared.</p><a className="text-link" href="https://github.com/redasalem">Explore GitHub ↗</a></div>;
  return <div className="project-grid">{projects.map((project, index) => <Reveal key={project.id}><article className="project-card">
    <Link href={`/work/${project.id}`} className="project-visual" tabIndex={-1} aria-hidden="true"><span className="mono project-number">{String(index + 1).padStart(2, "0")} / {project.category}</span><div className={`project-glyph glyph-${index % 3}`}><span /><span /><span /></div><ArrowUpRight className="project-arrow" /></Link>
    <div className="project-info"><p className="eyebrow">{project.category}</p><h3><Link href={`/work/${project.id}`}>{project.title} <span aria-hidden="true">↗</span></Link></h3><p>{project.summary}</p><ul className="stack-list" aria-label="Technologies">{project.stack.split(",").map((item, index) => <li key={index}>{item.trim()}</li>)}</ul></div>
  </article></Reveal>)}</div>;
}
