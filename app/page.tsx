import Link from "next/link";
import { Suspense } from "react";
import { ArrowDown, ArrowUpRight, Braces, GitBranch, ShieldCheck } from "lucide-react";
import HeroArt from "@/components/portfolio/hero-art";
import ProjectList from "@/components/portfolio/project-list";
import Reveal from "@/components/portfolio/reveal";
import { jsonLd, site } from "@/lib/site";
import Skills from "@/components/skills";
import Certificates from "@/components/certificates";

export default function Home() {
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Person", "@id": site.url + "/#person", name: site.name, url: site.url, jobTitle: "Full-Stack Engineer", description: site.description, email: site.email, sameAs: [site.github, site.linkedin], address: { "@type": "PostalAddress", addressCountry: "EG" }, knowsAbout: ["Next.js", "React", "Node.js", "TypeScript", "API security", "CI/CD"] },
    { "@type": "WebSite", "@id": site.url + "/#website", name: site.title, url: site.url, publisher: { "@id": site.url + "/#person" }, inLanguage: "en" },
    { "@type": "ProfilePage", "@id": site.url + "/#profile", url: site.url, mainEntity: { "@id": site.url + "/#person" } },
  ] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <header className="site-header shell"><Link href="/" className="wordmark" aria-label="Reda Salem home">reda<span>.</span></Link><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#approach">Approach</a><a href="#about">About</a></nav><a className="header-contact" href={"mailto:" + site.email}>Let’s talk <ArrowUpRight size={16} /></a></header>
    <main id="main-content">
      <section className="hero shell" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> BASED IN EGYPT · BUILDING EVERYWHERE</p><h1 id="hero-title">Thoughtful interfaces.<br /><span>Powerful</span><br /><span className="serif-word">foundations.</span></h1><p className="hero-description">I’m Reda, a full-stack engineer connecting considered design with the systems that make it work. Secure by design. Built to ship.</p><div className="hero-actions"><a className="button-primary" href="#work">Explore my work <ArrowUpRight size={18} /></a><a className="text-link" href={"mailto:" + site.email}>Let’s build something <ArrowUpRight size={16} /></a><a className="text-link hero-mobile-contact" style={{ display: "none" }} href={"mailto:" + site.email}>Let’s talk <ArrowUpRight size={16} /></a></div><p className="hero-note mono">REACT / NEXT.JS / NODE.JS / TYPESCRIPT</p></div><HeroArt /></section>
      <div className="hero-baseline shell"><p><span className="status-dot" /> Open to remote opportunities & freelance</p><a href="#work" className="mono">SCROLL TO EXPLORE <ArrowDown size={15} /></a></div>
      <section className="evidence-strip shell" aria-label="Engineering highlights"><div><strong>End to end<span>↗</span></strong><p>From the first interaction to the last API call.</p></div><div><strong>73+ tests<span>↗</span></strong><p>Across Apex Athletics, including security coverage.</p></div><div><strong>95+ SEO<span>↗</span></strong><p>Lighthouse SEO score on the C4R platform.</p></div></section>
      <section className="section shell" id="work"><div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Built for the <span className="serif-word">real world.</span></h2></div><p>Commerce, automation, and the systems<br className="desktop-break" /> that keep businesses moving.</p></div><Suspense fallback={<p className="project-notice" role="status">Loading case studies…</p>}><ProjectList /></Suspense></section>
      <section className="approach-section" id="approach"><div className="shell section"><div className="section-heading"><div><p className="eyebrow">02 / ENGINEERING APPROACH</p><h2>The details are<br /><span className="serif-word">the difference.</span></h2></div><p>A good interface earns attention.<br />A dependable system earns trust.</p></div><div className="approach-grid">
        <Reveal><article><ShieldCheck size={28} strokeWidth={1.4} /><span className="mono">01</span><h3>Security is a foundation.</h3><p>HttpOnly JWT sessions, role-based access, validated inputs, and verified payment webhooks. I build safeguards into the architecture.</p><p className="mono approach-tags">JWT · RBAC · ZOD · STRIPE</p></article></Reveal>
        <Reveal><article><GitBranch size={28} strokeWidth={1.4} /><span className="mono">02</span><h3>Delivery is an engineering problem.</h3><p>Automated tests and GitHub Actions make changes repeatable. Redis caching and BullMQ move expensive work out of the request path.</p><p className="mono approach-tags">CI/CD · DOCKER · REDIS · BULLMQ</p></article></Reveal>
        <Reveal><article><Braces size={28} strokeWidth={1.4} /><span className="mono">03</span><h3>AI assists. Judgment leads.</h3><p>I use Claude, Antigravity, and OpenCode with MCP-connected tools. Review, testing, and ownership stay central to the workflow.</p><p className="mono approach-tags">AI AGENTS · MCP · CODE REVIEW</p></article></Reveal>
      </div></div></section>
      <Skills />
      <section className="section shell about-grid" id="about"><div><p className="eyebrow">04 / THE ENGINEER BEHIND THE WORK</p><h2>Curious by nature.<br /><span className="serif-word">Deliberate by design.</span></h2><p className="about-intro">I work across the stack because the best decisions rarely stop at one layer.</p><p>From booking platforms to multi-vendor commerce, I connect responsive React interfaces with secure Node.js services, reliable payment flows, and automated delivery. My work is grounded in building, testing, and understanding how each part affects the whole.</p><Link href="/download" className="text-link">View my resume <ArrowUpRight size={17} /></Link></div><div className="experience-list"><article><p className="mono">2024 — PRESENT</p><h3>Full-Stack Engineer</h3><p>Independent · SaaS, commerce & automation</p></article><article><p className="mono">2025</p><h3>Frontend Engineer</h3><p>Huma Volve · Healthcare & travel platforms</p></article><article><p className="mono">2022</p><h3>Frontend Developer Trainee</h3><p>Information Technology Institute</p></article></div></section>
      <Certificates />
      <section className="contact-section shell" id="contact"><p className="eyebrow">HAVE SOMETHING IN MIND?</p><h2>Let’s build<br /><span className="serif-word">something that matters.</span></h2><a className="contact-email" href={"mailto:" + site.email}>{site.email}<ArrowUpRight /></a><p>Open to remote work, freelance projects, and the right challenge.</p></section>
    </main><footer className="site-footer shell"><Link className="wordmark" href="/">reda<span>.</span></Link><p>© {new Date().getFullYear()} Reda Salem</p><div><a href={site.github}>GitHub ↗</a><a href={site.linkedin}>LinkedIn ↗</a><a href="/download">Resume ↗</a></div><a href="#main-content" className="mono">BACK TO TOP ↑</a></footer>
  </>;
}

