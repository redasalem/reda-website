import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  // Defense in depth: noindex headers + metadata on the studio, plus exclusion here.
  // Authorization still comes from Firebase Auth custom claims + Firestore rules, never obscurity.
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/secret-admin-studio"] }, { userAgent: "*", allow: ["/", "/work/", "/download", "/opengraph-image"] }], sitemap: site.url + "/sitemap.xml" };
}
