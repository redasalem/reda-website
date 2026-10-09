import React from "react";
import { Code2, Database, LayoutTemplate, Settings, Terminal, Wrench } from "lucide-react";

export default function Skills() {
  return (
    <section className="section shell" id="skills">
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / CORE CAPABILITIES</p>
          <h2>
            Tools of the <span className="serif-word">trade.</span>
          </h2>
        </div>
        <p>
          Modern frameworks, robust backends,<br className="desktop-break" /> and AI-driven development.
        </p>
      </div>

      <div className="skills-grid">
        <article className="skill-card">
          <LayoutTemplate size={24} strokeWidth={1.5} className="skill-icon" />
          <h3>Frontend</h3>
          <p>React, Next.js (App Router, SSR), TypeScript, Tailwind CSS, ShadCN/UI, Framer Motion, Redux Toolkit, React Query.</p>
        </article>

        <article className="skill-card">
          <Database size={24} strokeWidth={1.5} className="skill-icon" />
          <h3>Backend & APIs</h3>
          <p>Node.js, Express.js, REST APIs, MongoDB, PostgreSQL, Redis, Supabase, Firebase, JWT Auth, Clean Architecture.</p>
        </article>

        <article className="skill-card">
          <Settings size={24} strokeWidth={1.5} className="skill-icon" />
          <h3>Async & Automation</h3>
          <p>BullMQ, Redis, Cron Jobs, Puppeteer, Playwright, background job processing, queue management.</p>
        </article>

        <article className="skill-card">
          <Code2 size={24} strokeWidth={1.5} className="skill-icon" />
          <h3>Testing & Quality</h3>
          <p>Jest, Vitest, Playwright, Security Testing, E2E Testing, Sentry, Helmet, Mongo Sanitization.</p>
        </article>

        <article className="skill-card">
          <Terminal size={24} strokeWidth={1.5} className="skill-icon" />
          <h3>DevOps & Delivery</h3>
          <p>Git, GitHub Actions (CI/CD), Docker, Vercel, Render, Cloudflare Pages.</p>
        </article>

        <article className="skill-card">
          <Wrench size={24} strokeWidth={1.5} className="skill-icon" />
          <h3>AI & Tools</h3>
          <p>Claude, Antigravity, OpenCode, Model Context Protocol (MCP), Postman, Swagger UI, Stripe integrations.</p>
        </article>
      </div>
    </section>
  );
}