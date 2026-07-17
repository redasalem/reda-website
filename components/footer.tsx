import React, { useMemo } from "react";
import SocialIcon from "@/components/social-icon";

const Footer = React.memo(function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = useMemo(() => [
    { platform: "github" as const, href: "https://github.com/redasalem", label: "GitHub" },
    { platform: "linkedin" as const, href: "https://www.linkedin.com/in/reda-salem-dev/", label: "LinkedIn" },
    { platform: "email" as const, href: "mailto:redasalem287@gmail.com", label: "Email" },
  ], []);

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-md mb-24 sm:mb-0 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12 animate-fade-in text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold bg-linear-to-r from-brand-mint-500 to-brand-mint-600 bg-clip-text text-transparent">
                Reda Salem
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0 leading-relaxed">
                Full-Stack Engineer based in Egypt. Building for the web with
                React, Next.js, and Node.js. Open to remote work and freelance.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm font-semibold text-foreground mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="#about"
                  className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  About Me
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#certificates"
                  className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  Certificates
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm font-semibold text-foreground mb-6 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <SocialIcon
                  key={social.label}
                  platform={social.platform}
                  href={social.href}
                  label={social.label}
                  size="sm"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground animate-fade-in text-center md:text-left">
          <p>© {currentYear} Reda Salem. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="text-muted-foreground/50 cursor-default">
              Privacy Policy
            </span>
            <span className="text-muted-foreground/50 cursor-default">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
