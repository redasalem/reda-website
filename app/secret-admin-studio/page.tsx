import type { Metadata } from "next";
import Studio from "@/components/studio/studio";
export const metadata: Metadata = { title: "Project studio", description: "Private project management.", robots: { index: false, follow: false, noarchive: true }, alternates: { canonical: "/secret-admin-studio" } };
export default function StudioPage() { return <main id="main-content" className="studio"><Studio /></main>; }
