/**
 * SocialIcon — unified branded social icon component.
 * Supports: github, linkedin, email, phone/whatsapp, facebook, x, devto, medium, stackoverflow, youtube, website
 * Uses react-icons/fa for official brand logos (highly compatible & stable).
 */
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaDev,
  FaMedium,
  FaStackOverflow,
  FaYoutube,
  FaGlobe,
} from "react-icons/fa";
import type { SocialPlatform } from "@/lib/firestore";

export type Platform = SocialPlatform;

interface SocialIconProps {
  platform: Platform;
  href: string;
  label?: string;
  /** "sm" = sidebar/footer (w-10 h-10), "md" = hero (w-11 h-11) */
  size?: "sm" | "md";
  className?: string;
}

const PLATFORM_CONFIG: Record<
  Platform,
  {
    Icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgClass: string;
    borderClass: string;
    hoverBgClass: string;
    hoverShadow: string;
    defaultLabel: string;
  }
> = {
  github: {
    Icon: FaGithub,
    color: "text-white dark:text-[#f0f6fc]",
    bgClass: "bg-[#24292e]/10 dark:bg-white/8",
    borderClass: "border-[#24292e]/20 dark:border-white/12",
    hoverBgClass: "hover:bg-[#24292e]/20 dark:hover:bg-white/15",
    hoverShadow:
      "hover:shadow-[0_0_20px_rgba(36,41,46,0.25)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
    defaultLabel: "GitHub",
  },
  linkedin: {
    Icon: FaLinkedin,
    color: "text-[#0A66C2]",
    bgClass: "bg-[#0A66C2]/10",
    borderClass: "border-[#0A66C2]/20",
    hoverBgClass: "hover:bg-[#0A66C2]/20",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(10,102,194,0.30)]",
    defaultLabel: "LinkedIn",
  },
  email: {
    Icon: FaEnvelope,
    color: "text-[#EA4335]",
    bgClass: "bg-[#EA4335]/10",
    borderClass: "border-[#EA4335]/20",
    hoverBgClass: "hover:bg-[#EA4335]/20",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(234,67,53,0.30)]",
    defaultLabel: "Email",
  },
  phone: {
    Icon: FaWhatsapp,
    color: "text-[#25D366]",
    bgClass: "bg-[#25D366]/10",
    borderClass: "border-[#25D366]/20",
    hoverBgClass: "hover:bg-[#25D366]/20",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(37,211,102,0.30)]",
    defaultLabel: "WhatsApp",
  },
  facebook: {
    Icon: FaFacebook,
    color: "text-[#1877F2]",
    bgClass: "bg-[#1877F2]/10",
    borderClass: "border-[#1877F2]/20",
    hoverBgClass: "hover:bg-[#1877F2]/20",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(24,119,242,0.30)]",
    defaultLabel: "Facebook",
  },
  x: {
    Icon: FaTwitter,
    color: "text-[#1DA1F2]",
    bgClass: "bg-[#1DA1F2]/10",
    borderClass: "border-[#1DA1F2]/20",
    hoverBgClass: "hover:bg-[#1DA1F2]/20",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(29,161,242,0.30)]",
    defaultLabel: "X (Twitter)",
  },
  devto: {
    Icon: FaDev,
    color: "text-white",
    bgClass: "bg-white/10",
    borderClass: "border-white/20",
    hoverBgClass: "hover:bg-white/20",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.20)]",
    defaultLabel: "DEV Community",
  },
  medium: {
    Icon: FaMedium,
    color: "text-white",
    bgClass: "bg-white/10",
    borderClass: "border-white/20",
    hoverBgClass: "hover:bg-white/20",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.20)]",
    defaultLabel: "Medium",
  },
  stackoverflow: {
    Icon: FaStackOverflow,
    color: "text-[#F48024]",
    bgClass: "bg-[#F48024]/10",
    borderClass: "border-[#F48024]/20",
    hoverBgClass: "hover:bg-[#F48024]/20",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(244,128,36,0.30)]",
    defaultLabel: "Stack Overflow",
  },
  youtube: {
    Icon: FaYoutube,
    color: "text-[#FF0000]",
    bgClass: "bg-[#FF0000]/10",
    borderClass: "border-[#FF0000]/20",
    hoverBgClass: "hover:bg-[#FF0000]/20",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(255,0,0,0.30)]",
    defaultLabel: "YouTube",
  },
  website: {
    Icon: FaGlobe,
    color: "text-brand-mint-400",
    bgClass: "bg-brand-mint-500/10",
    borderClass: "border-brand-mint-500/20",
    hoverBgClass: "hover:bg-brand-mint-500/20",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(0,255,159,0.30)]",
    defaultLabel: "Website",
  },
};

export default function SocialIcon({
  platform,
  href,
  label,
  size = "sm",
  className = "",
}: SocialIconProps) {
  const cfg = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.website;
  const { Icon } = cfg;

  const sizeClass = size === "md" ? "w-11 h-11" : "w-10 h-10";
  const iconSize = size === "md" ? "w-5 h-5" : "w-[18px] h-[18px]";
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={label ?? cfg.defaultLabel}
      className={[
        "group flex items-center justify-center rounded-full border",
        "transition-all duration-300",
        "hover:scale-110 hover:-translate-y-0.5",
        sizeClass,
        cfg.bgClass,
        cfg.borderClass,
        cfg.hoverBgClass,
        cfg.hoverShadow,
        className,
      ].join(" ")}
    >
      <Icon
        className={[
          iconSize,
          cfg.color,
          "transition-transform duration-300 group-hover:scale-105",
        ].join(" ")}
      />
    </a>
  );
}
