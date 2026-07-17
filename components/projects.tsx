"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import Image from "next/image";
import { Code, Code2, ExternalLink, Sparkles } from "lucide-react";
import { getProjects, ProjectData } from "@/lib/firestore";

const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const resetTilt = useCallback(() => {
    if (!surfaceRef.current) {
      return;
    }

    surfaceRef.current.style.setProperty("--project-rotate-x", "0deg");
    surfaceRef.current.style.setProperty("--project-rotate-y", "0deg");
  }, []);

  const updateTilt = useCallback((clientX: number, clientY: number) => {
    if (!surfaceRef.current) {
      return;
    }

    const rect = surfaceRef.current.getBoundingClientRect();
    const relativeX = (clientX - rect.left) / rect.width;
    const relativeY = (clientY - rect.top) / rect.height;

    surfaceRef.current.style.setProperty("--project-rotate-x", `${((0.5 - relativeY) * 7).toFixed(2)}deg`);
    surfaceRef.current.style.setProperty("--project-rotate-y", `${((relativeX - 0.5) * 7).toFixed(2)}deg`);
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      updateTilt(clientX, clientY);
    });
  }, [updateTilt]);

  const handlePointerLeave = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    resetTilt();
  }, [resetTilt]);

  useEffect(() => {
    resetTilt();

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [resetTilt]);

  return (
    <div
      className="group relative h-full flex flex-col [perspective:1000px] opacity-0"
      style={{
        animation: "fadeIn 0.7s ease-out forwards",
        animationDelay: `${index * 0.12}s`,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        ref={surfaceRef}
        className="glass-card project-card-surface flex flex-col h-full group-hover:-translate-y-3 relative overflow-hidden hover:shadow-[0_25px_50px_-12px_rgba(0,255,159,0.25)]"
      >
        <div
          className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "linear-gradient(135deg, rgba(0, 255, 159, 0.5), transparent, rgba(0, 255, 159, 0.3))",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <div className="relative h-48 md:h-60 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />

          <Image
            src={project.image || "/images/placeholder.png"}
            alt={`${project.title} - Project showcase built with ${project.tech.join(", ")}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute top-4 right-4 z-20 opacity-0 scale-75 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0">
            <div className="px-3 py-1 rounded-full bg-brand-mint-500/90 backdrop-blur-md text-black text-[10px] font-black flex items-center gap-1 border border-white/20 shadow-lg uppercase tracking-wider">
              <Sparkles size={14} className="transition-transform duration-500 group-hover:rotate-[360deg]" />
              FEATURED
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 opacity-0 translate-y-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((techItem) => (
                <span
                  key={techItem}
                  className="px-2 py-0.5 rounded-full bg-brand-mint-500/80 text-black text-[10px] font-bold backdrop-blur-sm"
                >
                  {techItem}
                </span>
              ))}
              {project.tech.length > 3 ? (
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold backdrop-blur-sm">
                  +{project.tech.length - 3}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow p-5 md:p-6 space-y-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl md:text-2xl font-bold text-foreground grow transition-colors duration-300 group-hover:text-brand-mint-500">
              {project.title}
            </h3>
            <div className="w-8 h-8 rounded-full bg-brand-mint-500/10 flex items-center justify-center text-brand-mint-400 font-bold transition-all duration-300 group-hover:rotate-45 group-hover:bg-brand-mint-500/20">
              <ExternalLink size={16} />
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 transition-opacity duration-300 group-hover:opacity-70">
            {project.description}
          </p>

          <div className="grow" />

          <div className="flex flex-wrap gap-2 pt-2 transition-opacity duration-200 group-hover:opacity-0">
            {project.tech.map((techItem) => (
              <span
                key={`${project.id}-${techItem}`}
                className="px-2.5 py-1 rounded-lg bg-brand-mint-500/5 text-brand-mint-300 text-[10px] md:text-xs font-bold border border-brand-mint-500/10 backdrop-blur-sm uppercase tracking-tight transition-colors duration-300 hover:bg-brand-mint-500/15"
              >
                {techItem}
              </span>
            ))}
          </div>

          <div className="h-px bg-border/50 my-4" />

          <div className="flex gap-4 mt-auto">
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium flex-1 !py-3 !text-xs"
              >
                <ExternalLink size={16} />
                Demo
              </a>
            ) : null}

            {project.code ? (
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 !py-3 !text-xs"
              >
                <Code2 size={16} />
                Code
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
});

const Projects = memo(function Projects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      const data = await getProjects();

      if (!isMounted) {
        return;
      }

      setProjects(data);
      setLoading(false);
    };

    void fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center min-h-[50vh]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="text-primary w-8 h-8 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="projects"
      className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-background transition-colors duration-500"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="project-ambient-orb absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div
          className="project-ambient-orb absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          style={{ animationDuration: "12s", animationDelay: "-2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-20 space-y-4 opacity-0 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm mb-4 hover:scale-105 transition-transform duration-300">
            <Code className="text-accent w-3 h-3 md:w-4 md:h-4 animate-spin [animation-duration:4s]" />
            <span className="text-xs md:text-sm font-semibold text-accent">Case Studies</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient">
              Featured Projects
            </span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Production-grade platforms engineered for precision — from a{" "}
            <strong className="text-foreground">95+ Lighthouse score</strong> achieved through optimized Next.js 14
            App Router architecture, to secure Stripe Connect payment pipelines and scalable multi-vendor ecosystems.
          </p>

          <div className="w-20 md:w-24 h-1.5 mx-auto bg-linear-to-r from-primary to-accent rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {projects.length > 0 ? (
          <div className="text-center mt-16 md:mt-20 opacity-0 animate-fade-in-delay-2">
            <div className="inline-flex flex-col items-center gap-4">
              <p className="text-muted-foreground">Want to see more?</p>
              <a
                href="https://github.com/redasalem"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden px-8 py-3 rounded-full bg-card border border-border hover:border-primary/50 transition-colors duration-300"
              >
                <span className="relative flex items-center gap-2 text-foreground font-medium group-hover:text-primary transition-colors">
                  <Code2 />
                  View All Projects on GitHub
                  <ExternalLink className="transition-transform duration-300 group-hover:translate-x-1" size={18} />
                </span>
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
});

export default Projects;
