import React from "react";
import { Award, GraduationCap } from "lucide-react";

export default function Certificates() {
  return (
    <section className="section shell" id="education">
      <div className="section-heading">
        <div>
          <p className="eyebrow">05 / EDUCATION & CERTIFICATIONS</p>
          <h2>
            Continuous <span className="serif-word">learning.</span>
          </h2>
        </div>
        <p>
          Academic foundation combined with<br className="desktop-break" /> modern industry certifications.
        </p>
      </div>

      <div className="certificates-grid">
        <article className="certificate-card">
          <Award size={28} strokeWidth={1.5} className="certificate-icon" />
          <div className="certificate-content">
            <h3>Build with AI: Masr Edition</h3>
            <p className="mono certificate-meta">Google for Developers & ITI · 2026</p>
          </div>
        </article>

        <article className="certificate-card">
          <Award size={28} strokeWidth={1.5} className="certificate-icon" />
          <div className="certificate-content">
            <h3>Front-End Certificate</h3>
            <p className="mono certificate-meta">Hsoub Academy · May 2025</p>
          </div>
        </article>

        <article className="certificate-card">
          <GraduationCap size={28} strokeWidth={1.5} className="certificate-icon" />
          <div className="certificate-content">
            <h3>Bachelor's in Information Systems and Technology</h3>
            <p className="mono certificate-meta">Aug 2019 - Sep 2023</p>
          </div>
        </article>
      </div>
    </section>
  );
}
