"use client";

import React, { useEffect, useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { getProjects, ProjectData } from "@/lib/firestore";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
          <AutoAwesomeIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-accent animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent/3 to-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Enhanced */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm mb-4">
            <CodeIcon className="text-accent" />
            <span className="text-sm font-semibold text-accent">My Work</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black">
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Featured Projects
            </span>
          </h2>
          
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Explore my latest work and creative solutions
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Projects Grid - Revolutionary Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ 
                animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 animate-pulse" />
              
              {/* Card Container */}
              <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-accent/30">
                
                {/* Project Image with Overlay */}
                <div className="relative h-56 overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  
                  {/* Image */}
                  <img
                    src={project.image || "/images/placeholder.png"}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <div className="px-3 py-1 rounded-full bg-accent/90 backdrop-blur-sm text-accent-foreground text-xs font-bold shadow-lg flex items-center gap-1">
                      <AutoAwesomeIcon sx={{ fontSize: 14 }} />
                      Featured
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Title */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-300">
                      {project.title}
                    </h3>
                    <div className={`
                      w-8 h-8 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 
                      flex items-center justify-center transform transition-all duration-500
                      ${hoveredIndex === index ? 'rotate-180 scale-110' : 'rotate-0'}
                    `}>
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-accent to-primary" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3 group-hover:text-foreground/90 transition-colors">
                    {project.description}
                  </p>

                  {/* Tech Stack - Enhanced Pills */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 7).map((tech, i) => (
                      <div
                        key={i}
                        className="group/pill relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover/pill:opacity-100 transition-opacity duration-300" />
                        <span className="relative px-3 py-1.5 rounded-lg bg-accent/10 backdrop-blur-sm text-accent text-xs font-semibold border border-accent/20 inline-flex items-center gap-1.5 hover:border-accent/40 transition-all duration-300 hover:scale-105">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          {tech}
                        </span>
                      </div>
                    ))}
                    {project.tech.length > 7 && (
                      <span className="px-3 py-1.5 rounded-lg bg-foreground/5 text-foreground/50 text-xs font-semibold">
                        +{project.tech.length - 7}
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-4" />

                  {/* Action Buttons - Premium Style */}
                  <div className="flex gap-3">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative flex-1 overflow-hidden"
                      >
                        <div className="absolute rounded-[10px] inset-0 bg-gradient-to-r from-accent to-primary opacity-100 group-hover/btn:opacity-90 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary blur-md opacity-0 group-hover/btn:opacity-50 transition-opacity" />
                        <div className="relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-accent-foreground font-bold text-sm transform group-hover/btn:scale-105 transition-transform">
                          <LaunchIcon sx={{ fontSize: 18 }} />
                          Live Demo
                        </div>
                      </a>
                    )}
                    {project.code && (
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex-1 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 border-2 border-primary/30 rounded-xl group-hover/btn:border-primary/50 transition-colors" />
                        <div className="absolute inset-0 bg-primary/0 group-hover/btn:bg-primary/10 transition-colors rounded-xl" />
                        <div className="relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-primary font-bold text-sm transform group-hover/btn:scale-105 transition-transform">
                          <GitHubIcon sx={{ fontSize: 18 }} />
                          Code
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent group-hover:via-accent transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {projects.length > 0 && (
          <div className="text-center mt-16">
            <div className="inline-flex flex-col items-center gap-4">
              <p className="text-foreground/60">
                Want to see more?
              </p>
              <a
                href="https://github.com/redasalem"
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta relative overflow-hidden px-8 py-4 rounded-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_auto] animate-gradient" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent blur-lg opacity-50" />
                <span className="relative flex items-center gap-2 text-accent-foreground font-bold">
                  <GitHubIcon />
                  View All Projects on GitHub
                  <LaunchIcon className="transform group-hover/cta:translate-x-1 transition-transform" sx={{ fontSize: 18 }} />
                </span>
              </a>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}