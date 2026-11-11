import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const STABLE_LAST_MODIFIED = new Date("2026-10-09T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: STABLE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: SITE_URL,
          "x-default": SITE_URL,
        },
      },
    },
    {
      url: `${SITE_URL}/download`,
      lastModified: STABLE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${SITE_URL}/download`,
          "x-default": `${SITE_URL}/download`,
        },
      },
    },
  ];
}
