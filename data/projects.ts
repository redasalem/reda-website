import { type ProjectData } from "@/lib/firestore";

export const initialProjects: ProjectData[] = [
  {
    id: "veycraft-cli-mcp",
    title: "Veycraft (v2.4.0) - AI Career Operations CLI & MCP Server",
    description:
      "Built and published veycraft v2.4.0 on npm and Glama with zero runtime dependencies (0/0), a native stdio MCP server (8 tools), a read-only 127.0.0.1 Local Web UI (npx -y veycraft ui), 53 Markdown skills, 122/122 cross-OS CI tests, and 0 CodeQL alerts.",
    tech: ["Node.js", "MCP (stdio)", "Local Web UI", "GitHub Actions", "Playwright", "CLI"],
    demo: "https://redasalem.github.io/veycraft/",
    code: "https://github.com/redasalem/veycraft",
    image: "/images/projects/veycraft-v2-4-0.png",
    featured: true,
    published: true,
    order: 0,
  },
  {
    id: "c4r-car-rental-platform",
    title: "C4R Car Rental Platform",
    description:
      "Developed a responsive car rental web application and admin dashboard with Next.js SSR, Node.js, Express, MongoDB, Tailwind CSS, and Zod, achieving 95+ performance scores with structured data optimization and strict schema validation.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Zod", "SSR"],
    demo: "https://c4rplatform.com/",
    code: "https://github.com/redasalem/c4r_platform_landing_page",
    image: "/images/projects/c4r-car-rental.png",
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: "apex-athletics-ecommerce",
    title: "Apex Athletics - Multi-Vendor E-Commerce Platform",
    description:
      "Engineered a multi-vendor athletic e-commerce platform with Next.js, TypeScript, Node.js, Express, MongoDB, Redis, RBAC, and Stripe Connect webhooks, backed by 73+ automated tests via GitHub Actions CI/CD.",
    tech: ["Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Redis", "Stripe Connect", "CI/CD"],
    demo: "https://apexathletics-website.vercel.app/",
    code: "https://github.com/redasalem/apexathletics-website",
    image: "/images/projects/apex-athletics.png",
    featured: true,
    published: true,
    order: 2,
  },
  {
    id: "rankboost-seo-saas",
    title: "RankBoost - Bilingual SEO Rank Tracking SaaS",
    description:
      "Architected a bilingual English/Arabic (RTL) SEO rank tracking SaaS platform featuring automated Playwright SERP scraping, daily scheduled Cron pipelines, Stripe Subscriptions, and technical SEO page audits.",
    tech: ["Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Stripe", "Playwright", "Tailwind CSS"],
    demo: "https://seo-rank-tracer-client.vercel.app/",
    code: "https://github.com/redasalem/seo-rank-tracer-client",
    image: "/images/projects/rankboost-seo-saas.png",
    featured: true,
    published: true,
    order: 3,
  },
  {
    id: "pro-bot-booking-system",
    title: "PRO-BOT - Automated Booking & Distributed Queue System",
    description:
      "Built a distributed Node.js/Express backend and React 19 frontend for automated exam scheduling and notifications using BullMQ/Redis job queues, Puppeteer browser automation, JWT, Swagger/OpenAPI, Sentry, and Jest tests.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Redis", "BullMQ", "Puppeteer", "Swagger", "Jest"],
    demo: "https://khaleeji-bot-v2-frontend.tech-rm-re.workers.dev/login",
    code: "https://github.com/redasalem/pro-bot-v2-frontend",
    image: "/images/projects/pro-bot-booking.png",
    featured: true,
    published: true,
    order: 4,
  },
  {
    id: "hospital-appointment-api",
    title: "Hospital Appointment RESTful API",
    description:
      "Built the Doctor Management CRUD module, Mongoose schema relationships, centralized error-handling middleware, RBAC security, Gemini AI integration, and Swagger/OpenAPI documentation in an agile Node.js team.",
    tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Swagger/OpenAPI", "RBAC", "Gemini AI"],
    demo: "",
    code: "https://github.com/redasalem/Hospital-Appointment-API-Node.js",
    image: "/images/projects/hospital-appointment-api.png",
    featured: true,
    published: true,
    order: 5,
  },
];
