"use client";

import React, { useEffect, useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { getProjects, ProjectData } from "@/lib/firestore";
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="py-20 flex items-center justify-center min-h-[50vh]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <AutoAwesomeIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" />
        </div>
      </div>
    );
  }
  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden bg-background transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl opacity-50 md:opacity-100" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 md:opacity-100" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-20 space-y-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm mb-4">
            <CodeIcon className="text-accent w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-semibold text-accent">My Work</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Featured Projects
            </span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Explore my latest work and creative solutions
          </p>

          <div className="w-20 md:w-24 h-1.5 mx-auto bg-gradient-to-r from-primary to-accent rounded-full mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative h-full flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative flex flex-col h-full bg-card border border-border/50 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 group-hover:-translate-y-2">

                  {/* Image Container */}
                  <div className="relative h-48 md:h-60 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    <img
                      src={project.image || "/images/placeholder.png"}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="px-3 py-1 rounded-full bg-accent/90 backdrop-blur-md text-white text-xs font-bold shadow-lg flex items-center gap-1">
                        <AutoAwesomeIcon sx={{ fontSize: 14 }} />
                        Featured
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col flex-grow p-5 md:p-6 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <motion.div
                        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                        animate={{ rotate: hoveredIndex === index ? 45 : 0 }}
                      >
                        <LaunchIcon sx={{ fontSize: 16 }} />
                      </motion.div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex-grow" /> {/* Spacer to push content down */}

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 md:px-2.5 py-1 rounded-lg bg-secondary/50 text-secondary-foreground text-[10px] md:text-xs font-medium border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="h-px bg-border/50 my-4" />

                    <div className="flex gap-3 mt-auto">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:bg-primary/90 transition-all duration-300"
                        >
                          <LaunchIcon sx={{ fontSize: 18 }} />
                          Live Demo
                        </a>
                      )}
                      {project.code && (
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 text-sm font-semibold transition-all duration-300"
                        >
                          <GitHubIcon sx={{ fontSize: 18 }} />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {projects.length > 0 && (
          <motion.div
            className="text-center mt-16 md:mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex flex-col items-center gap-4">
              <p className="text-muted-foreground">
                Want to see more?
              </p>
              <a
                href="https://github.com/redasalem"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden px-8 py-3 rounded-full bg-card border border-border hover:border-primary/50 transition-colors duration-300"
              >
                <span className="relative flex items-center gap-2 text-foreground font-medium group-hover:text-primary transition-colors">
                  <GitHubIcon />
                  View All Projects on GitHub
                  <LaunchIcon className="transform group-hover:translate-x-1 transition-transform duration-300" sx={{ fontSize: 18 }} />
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}