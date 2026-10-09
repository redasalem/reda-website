export const site = {
  name: "Reda Salem",
  title: "Reda Salem — Full-Stack Engineer",
  description: "Full-stack engineering from interface to infrastructure. Reda Salem builds secure APIs, payment systems, and fast web experiences with React, Next.js, and Node.js.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://reda-website.vercel.app",
  email: "redasalem287@gmail.com",
  github: "https://github.com/redasalem",
  linkedin: "https://www.linkedin.com/in/reda-salem-dev/",
};

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
