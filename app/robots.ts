import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reda-website.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/server/", "/private/", "/tmp/", "/*?*"],
        crawlDelay: 2,
      },
      {
        userAgent: "Googlebot",
        allow: ["/*.js$", "/*.css$", "/images/"],
      },
      {
        userAgent: "Bingbot",
        crawlDelay: 5,
      },
      {
        userAgent: "Yandex",
        disallow: "/cgi-bin/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
