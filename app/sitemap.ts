import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/public-projects";
import { site } from "@/lib/site";
export const revalidate = 60;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublishedProjects().catch(() => []);
  return [{ url: site.url, changeFrequency: "monthly", priority: 1 }, { url: site.url + "/download", changeFrequency: "monthly", priority: 0.5 }, ...projects.map(project => ({ url: site.url + "/work/" + project.id, changeFrequency: "monthly" as const, priority: 0.8 }))];
}