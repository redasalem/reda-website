import type { Metadata } from "next";
export const metadata: Metadata = { title: "Resume", description: "Reda Salem — full-stack engineering experience, skills, and selected work.", alternates: { canonical: "/download" }, openGraph: { title: "Reda Salem — Resume", description: "Full-stack engineering experience, skills, and selected work.", url: "/download", images: ["/opengraph-image"] } };
export default function DownloadLayout({ children }: { children: React.ReactNode }) { return children; }
