import { getPublishedProject } from "@/lib/public-projects";
import { createOgImage } from "@/lib/og-image";
export const alt = "Reda Salem — engineering case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 60;
export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const project = await getPublishedProject((await params).id);
  return createOgImage(project?.title || "Reda Salem", project?.summary || "Full-stack engineering from interface to infrastructure.");
}
