import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://reda-website.vercel.app";

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}


// 📍 Access at: https://portfolio-reda-salem.vercel.app/sitemap.xml
// 🔍 Submit to Google: https://search.google.com/search-console
// ```

// ---

// ## 🤔 **ليه URL واحد بس؟**

// ### **في Single Page Application (SPA):**
// ```
// ✅ الصفحة الرئيسية = https://reda-website.vercel.app
//    ├─ Hero Section
//    ├─ About Section (id="about")
//    ├─ Skills Section (id="skills")
//    ├─ Projects Section (id="projects")
//    ├─ Certificates Section (id="certificates")
//    └─ Contact Section (id="contact")

// ✅ Google تدخل على الـ URL الرئيسي
// ✅ تشوف كل الـ sections جوا الصفحة
// ✅ تفهرس كل المحتوى من نفس الـ URL
// ```

// ---

// ## 💡 **لو عاوز sections منفصلة (مستقبلاً):**

// لازم تعمل **صفحات منفصلة** مش sections:
// ```
// portfolio/
// ├── app/
// │   ├── page.tsx              → https://site.com/
// │   ├── about/
// │   │   └── page.tsx          → https://site.com/about
// │   ├── skills/
// │   │   └── page.tsx          → https://site.com/skills
// │   └── projects/
// │       └── page.tsx          → https://site.com/projects