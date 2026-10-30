import React from "react";
import SocialIcon from "@/components/social-icon";
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_SOCIAL_LINKS,
  type SiteSettings,
  type SocialLinkItem,
} from "@/lib/firestore";
import { siteDictionary, type Locale } from "@/lib/i18n";

interface FooterProps {
  locale?: Locale;
  settings?: SiteSettings;
  socials?: SocialLinkItem[];
}

const Footer = React.memo(function Footer({
  locale = "en",
  settings = DEFAULT_SITE_SETTINGS,
  socials = DEFAULT_SOCIAL_LINKS,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = siteDictionary[locale];
  const isRtl = locale === "ar";

  const footerSocials = socials.filter(
    (s) => s.visible && s.showInFooter !== false,
  );

  const blurbText =
    locale === "ar"
      ? settings.footerBlurbAr || t.footer.defaultBlurb
      : settings.footerBlurb || t.footer.defaultBlurb;

  const displayName =
    locale === "ar"
      ? settings.heroNameAr || settings.heroName
      : settings.heroName;

  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-md mb-24 sm:mb-0 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12 animate-fade-in text-center ${
            isRtl ? "md:text-right" : "md:text-left"
          }`}
        >
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gradient-hero">
                {displayName}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0 leading-relaxed">
                {blurbText}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm font-semibold text-foreground mb-6 uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="#about"
                  className="hover:text-brand-mint-400 transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="hover:text-brand-violet-400 transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  {t.nav.skills}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-brand-cyan-400 transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a
                  href="#certificates"
                  className="hover:text-brand-amber-400 transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  {t.nav.certificates}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-brand-mint-400 transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm font-semibold text-foreground mb-6 uppercase tracking-wider">
              {t.footer.connect}
            </h4>
            <div className="flex gap-3 flex-wrap justify-center md:justify-start">
              {footerSocials.map((social) => (
                <SocialIcon
                  key={social.id}
                  platform={social.platform}
                  href={social.href}
                  label={social.label}
                  size="sm"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Multi-color gradient divider */}
        <div className="section-divider my-8" />

        {/* Copyright */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground animate-fade-in text-center ${
            isRtl ? "md:text-right" : "md:text-left"
          }`}
        >
          <p>
            © {currentYear}{" "}
            <span className="text-gradient-hero font-semibold">
              {displayName}
            </span>
            . {t.footer.rights}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="text-muted-foreground/40 cursor-default">
              {t.footer.privacy}
            </span>
            <span className="text-muted-foreground/40 cursor-default">
              {t.footer.terms}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
