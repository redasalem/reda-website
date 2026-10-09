import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedProject, getPublishedProjects } from "@/lib/public-projects";
import { jsonLd, site } from "@/lib/site";
type Props = { params: Promise<{ id: string }> };
export const revalidate = 60;
export const dynamicParams = false;
export async function generateStaticParams() {
  try {
    const projects = await getPublishedProjects();
    return projects.map((project) => ({ id: project.id }));
  } catch {
    return [];
  }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getPublishedProject(id);
  if (!project) return { title: "Project not found", robots: { index: false } };
  return { title: project.title, description: project.summary, alternates: { canonical: "/work/" + id }, openGraph: { title: project.title, description: project.summary, type: "article", url: "/work/" + id, images: [{ url: "/work/" + id + "/opengraph-image", width: 1200, height: 630, alt: project.title }] }, twitter: { card: "summary_large_image", title: project.title, description: project.summary, images: ["/work/" + id + "/opengraph-image"] } };
}
export default async function ProjectPage({ params }: Props) {
  const project = await getPublishedProject((await params).id);
  if (!project) notFound();
  const schema = { "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.summary, url: site.url + "/work/" + project.id, author: { "@type": "Person", name: site.name, url: site.url }, keywords: project.stack };
  return <main id="main-content" className="case-study"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} /><Link className="text-link" href="/#work">← All work</Link><p className="eyebrow mt-12">{project.category}</p><h1>{project.title}</h1><p className="lead">{project.summary}</p><ul className="stack-list">{project.stack.split(",").map((item, index) => <li key={index}>{item.trim()}</li>)}</ul><div className="case-body">{project.body}</div><div className="case-actions">{project.liveUrl && <a href={project.liveUrl} className="button-primary" rel="noopener noreferrer" target="_blank">Visit live site ↗</a>}{project.repoUrl && <a href={project.repoUrl} className="text-link" rel="noopener noreferrer" target="_blank">Explore source ↗</a>}</div></main>;
}
