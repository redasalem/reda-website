"use client";
import dynamic from "next/dynamic";
import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

const Sculpture = dynamic(() => import("./sculpture"), { ssr: false, loading: () => null });
export function StaticSculpture() {
  return <div className="static-sculpture" data-testid="static-sculpture">{Array.from({ length: 8 }, (_, i) => <span key={i} />)}</div>;
}
export class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <StaticSculpture /> : this.props.children; }
}
export default function HeroArt() {
  const host = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const viewport = matchMedia("(min-width: 900px)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const computeAllowed = () => !media.matches && !connection?.saveData && !connection?.effectiveType?.includes("2g") && viewport.matches;
    let idle: number | undefined;
    const timer = window.setTimeout(() => {
      if (!computeAllowed()) return;
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(() => setEnabled(true));
      else setEnabled(true);
    }, 1200);
    const preference = () => { if (media.matches) { setEnabled(false); setReady(false); } };
    // Re-evaluate the 3D gate on tablet rotation / window resize without a reload.
    const onViewport = () => { if (!computeAllowed()) { setEnabled(false); setReady(false); } };
    media.addEventListener("change", preference);
    viewport.addEventListener("change", onViewport);
    let intersecting = true;
    const update = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; update(); });
    if (host.current) observer.observe(host.current);
    document.addEventListener("visibilitychange", update);
    return () => { clearTimeout(timer); if (idle !== undefined) window.cancelIdleCallback(idle); observer.disconnect(); media.removeEventListener("change", preference); viewport.removeEventListener("change", onViewport); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <div className="hero-art" ref={host}>
    <div className="art-coordinate mono">FIG. 01 / CONNECTED SYSTEMS</div>
    <div className="art-stage" aria-hidden="true">
      {!ready && <StaticSculpture />}
      {enabled && <SceneBoundary><Suspense fallback={null}><Sculpture active={visible && !paused} onReady={() => setReady(true)} onFailure={() => { setEnabled(false); setReady(false); }} /></Suspense></SceneBoundary>}
    </div>
    <div className="art-footer mono"><span><i className="status-dot" /> INTERFACE ↔ INFRASTRUCTURE</span><button type="button" onClick={() => { if (!enabled) setEnabled(true); else setPaused(value => !value); }}>{enabled ? paused ? "Resume 3D ↗" : "Pause 3D Ⅱ" : "Explore in 3D ↗"}</button></div>
  </div>;
}
