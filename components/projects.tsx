"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ExternalLink, Github, Code, Sparkles } from "lucide-react";
import { getProjects, ProjectData } from "@/lib/firestore";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

const ProjectCard = ({ project, index }: { project: ProjectData; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-full flex flex-col"
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.15, duration: 0.7, type: "spring", stiffness: 100, damping: 20 }}
      onMouseEnter={() => {
        setIsHovered(true);
        setHoveredIndex(index);
      }}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
    >
      <motion.div
        className="glass-card flex flex-col h-full group-hover:-translate-y-3 transition-all duration-500 relative overflow-hidden"
        animate={{
          boxShadow: isHovered 
            ? "0 25px 50px -12px rgba(0, 255, 159, 0.25)" 
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(135deg, rgba(0, 255, 159, 0.5), transparent, rgba(0, 255, 159, 0.3))",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Image Container */}
        <motion.div 
          className="relative h-48 md:h-60 w-full overflow-hidden"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          />

          <Image
            src={project.image || "/images/placeholder.png"}
            alt={`${project.title} - ${project.tech.join(", ")}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />

          <motion.div
            className="absolute top-4 right-4 z-20"
            initial={{ opacity: 0, scale: 0.5, y: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5, y: isHovered ? 0 : -10 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <div className="px-3 py-1 rounded-full bg-brand-mint-500/90 backdrop-blur-md text-black text-[10px] font-black flex items-center gap-1 border border-white/20 shadow-lg uppercase tracking-wider">
              <motion.span
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles size={14} />
              </motion.span>
              FEATURED
            </div>
          </motion.div>

          {/* Tech preview on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((techItem, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-2 py-0.5 rounded-full bg-brand-mint-500/80 text-black text-[10px] font-bold backdrop-blur-sm"
                >
                  {techItem}
                </motion.span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold backdrop-blur-sm">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Content Container */}
        <div className="flex flex-col flex-grow p-5 md:p-6 space-y-4">
          <div className="flex items-start justify-between gap-2">
            <motion.h3
              className="text-xl md:text-2xl font-bold text-foreground grow"
              animate={{ color: isHovered ? "rgb(0, 255, 159)" : "inherit" }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
            <motion.div
              className="w-8 h-8 rounded-full bg-brand-mint-500/10 flex items-center justify-center text-brand-mint-400 font-bold"
              animate={{ rotate: isHovered ? 45 : 0, backgroundColor: isHovered ? "rgba(0, 255, 159, 0.2)" : "rgba(0, 255, 159, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ExternalLink size={16} />
            </motion.div>
          </div>
          <motion.p
            className="text-muted-foreground text-sm leading-relaxed line-clamp-2"
            animate={{ opacity: isHovered ? 0.7 : 1 }}
          >
            {project.description}
          </motion.p>
          <div className="grow" />
          
          {/* Tech Stack - Hidden on hover, shown in image */}
          <motion.div
            className="flex flex-wrap gap-2 pt-2"
            initial={{ opacity: 1 }}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {project.tech.map((techItem, i) => (
              <motion.span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-brand-mint-500/5 text-brand-mint-300 text-[10px] md:text-xs font-bold border border-brand-mint-500/10 backdrop-blur-sm uppercase tracking-tight"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 255, 159, 0.15)" }}
              >
                {techItem}
              </motion.span>
            ))}
          </motion.div>

          <div className="h-px bg-border/50 my-4" />
          
          {/* Action Buttons */}
          <motion.div
            className="flex gap-4 mt-auto"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            {project.demo && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Link
                  href={project.demo}
                  target="_blank"
                  className="btn-premium flex-1 !py-3 !text-xs"
                >
                  <motion.span
                    animate={{ x: isHovered ? [0, 3, 0] : 0 }}
                    transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                  >
                    <ExternalLink size={16} />
                  </motion.span>
                  Demo
                </Link>
              </motion.div>
            )}
            {project.code && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Link
                  href={project.code}
                  target="_blank"
                  className="btn-secondary flex-1 !py-3 !text-xs"
                >
                  <Github size={16} />
                  Code
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = React.memo(function Projects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

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
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles className="text-primary w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    );
  }
  return (
    <section
      id="projects"
      className="py-20 md:py-32 relative overflow-hidden bg-background transition-colors duration-500"
    >
      {/* Animated background orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-20 space-y-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Code className="text-accent w-3 h-3 md:w-4 md:h-4" />
            </motion.div>
            <span className="text-xs md:text-sm font-semibold text-accent">
              Case Studies
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <motion.span
              className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient"
              animate={{ backgroundPosition: ["0% center", "200% center", "0% center"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Featured Projects
            </motion.span>
          </h2>

          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Production-grade apps delivering measurable results — from 99/100 PageSpeed to live payment integrations and cross-platform mobile.
          </motion.p>

          <motion.div
            className="w-20 md:w-24 h-1.5 mx-auto bg-linear-to-r from-primary to-accent rounded-full mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ originX: 0 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
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
              <p className="text-muted-foreground">Want to see more?</p>
              <a
                href="https://github.com/redasalem"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden px-8 py-3 rounded-full bg-card border border-border hover:border-primary/50 transition-colors duration-300"
              >
                <span className="relative flex items-center gap-2 text-foreground font-medium group-hover:text-primary transition-colors">
                  <Github />
                  View All Projects on GitHub
                  <ExternalLink
                    className="transform group-hover:translate-x-1 transition-transform duration-300"
                    size={18}
                  />
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
});

export default Projects;
