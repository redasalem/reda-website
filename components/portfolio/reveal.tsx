"use client";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export default function Reveal({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <LazyMotion features={domAnimation}><m.div initial={false} whileInView={reduced ? undefined : { y: [12, 0] }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45 }}>{children}</m.div></LazyMotion>;
}
