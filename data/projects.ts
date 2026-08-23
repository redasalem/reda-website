import { ProjectData } from "@/lib/firestore";

export const initialProjects: ProjectData[] = [
  {
    id: "car-rental-platform",
    title: "Car Rental & Booking Platform",
    description: "High-performance full-stack vehicle booking system with real-time availability, secure Stripe Connect checkout, and automated booking management.",
    tech: ["Next.js", "React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    demo: "https://reda-website.vercel.app/#projects",
    code: "https://github.com/redasalem",
    image: "/images/placeholder.png",
  },
  {
    id: "multi-vendor-marketplace",
    title: "Multi-Vendor E-Commerce Hub",
    description: "Scalable marketplace supporting multi-merchant inventory, analytics dashboards, optimized server-side rendering, and responsive UI.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Express.js"],
    demo: "https://reda-website.vercel.app/#projects",
    code: "https://github.com/redasalem",
    image: "/images/placeholder.png",
  },
  {
    id: "seo-analytics-tool",
    title: "Web Performance & SEO Audit Suite",
    description: "Automated Core Web Vitals and Lighthouse metrics tracker with real-time performance bottleneck diagnosis and actionable audit reports.",
    tech: ["React", "TypeScript", "Node.js", "Lighthouse API", "Tailwind CSS"],
    demo: "https://reda-website.vercel.app/#projects",
    code: "https://github.com/redasalem",
    image: "/images/placeholder.png",
  },
];
