"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  Share2,
  Cpu,
  Award,
  Sparkles,
  RefreshCw,
  Database,
  CheckCircle2,
  ArrowUpRight,
  UserCheck,
  Bot,
} from "lucide-react";
import { useAdmin } from "@/components/admin/admin-context";
import { adminDictionary } from "@/lib/i18n";
import {
  getProjects,
  getSkillCategories,
  getCertificates,
  getSiteSettings,
} from "@/lib/firestore";
import {
  seedPortfolioDefaultsToFirestore,
  triggerPublicCacheRefresh,
} from "@/lib/admin-firestore";

export default function AdminOverviewPage() {
  const { locale } = useAdmin();
  const t = adminDictionary[locale];
  const isAr = locale === "ar";

  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    skillCategories: 0,
    certificates: 0,
    cvUrl: "",
  });
  const [seeding, setSeeding] = useState(false);
  const [revalidating, setRevalidating] = useState(false);
  const [bannerMsg, setBannerMsg] = useState<string | null>(null);

  const loadStats = async () => {
    const [projects, skills, certs, settings] = await Promise.all([
      getProjects({ includeUnpublished: true }),
      getSkillCategories(),
      getCertificates(),
      getSiteSettings(),
    ]);

    setStats({
      totalProjects: projects.length,
      publishedProjects: projects.filter((p) => p.published !== false).length,
      skillCategories: skills.length,
      certificates: certs.length,
      cvUrl: settings.cvUrl,
    });
  };

  useEffect(() => {
    void loadStats();
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    setBannerMsg(null);
    try {
      await seedPortfolioDefaultsToFirestore();
      await loadStats();
      setBannerMsg(t.overview.seedSuccess);
    } catch (err: unknown) {
      setBannerMsg(
        err instanceof Error ? err.message : "Error syncing to Firestore",
      );
    } finally {
      setSeeding(false);
    }
  };

  const handleRevalidate = async () => {
    setRevalidating(true);
    setBannerMsg(null);
    try {
      await triggerPublicCacheRefresh();
      setBannerMsg(t.overview.revalidatedMsg);
    } finally {
      setRevalidating(false);
    }
  };

  const statCards = [
    {
      label: t.overview.totalProjects,
      value: stats.totalProjects,
      icon: Briefcase,
      color: "text-brand-mint-400 bg-brand-mint-500/15 border-brand-mint-500/30",
      href: "/admin/projects",
    },
    {
      label: t.overview.publishedProjects,
      value: stats.publishedProjects,
      icon: Sparkles,
      color: "text-brand-cyan-400 bg-brand-cyan-500/15 border-brand-cyan-500/30",
      href: "/admin/projects",
    },
    {
      label: t.overview.skillCategories,
      value: stats.skillCategories,
      icon: Cpu,
      color:
        "text-brand-violet-400 bg-brand-violet-500/15 border-brand-violet-500/30",
      href: "/admin/skills",
    },
    {
      label: t.overview.certificatesCount,
      value: stats.certificates,
      icon: Award,
      color:
        "text-brand-amber-400 bg-brand-amber-500/15 border-brand-amber-500/30",
      href: "/admin/certificates",
    },
  ];

  const shortcuts = [
    {
      title: t.overview.addProjectBtn,
      desc: isAr
        ? "أضف مشروعاً جديداً مع صورة من Cloudinary وتقنيات وروابط"
        : "Add a new project with Cloudinary image, tech tags, and live links",
      href: "/admin/projects",
      icon: Briefcase,
    },
    {
      title: t.overview.updateCvBtn,
      desc: isAr
        ? "غيّر رابط الـ CV (Google Drive أو PDF مباشر) بضغطة واحدة"
        : "Update your Google Drive or direct PDF resume link immediately",
      href: "/admin/cv",
      icon: FileText,
    },
    {
      title: t.overview.manageSocialsBtn,
      desc: isAr
        ? "أضف أو عدّل حسابات التواصل الاجتماعي والواتساب والإيميل"
        : "Add, reorder, or toggle social links, WhatsApp, and contact info",
      href: "/admin/socials",
      icon: Share2,
    },
    {
      title: t.overview.manageSkillsBtn,
      desc: isAr
        ? "أضف تقنيات ومهارات جديدة مع اختيار الأيقونة واللون"
        : "Add new technologies and skills with custom icon and brand color",
      href: "/admin/skills",
      icon: Cpu,
    },
    {
      title: isAr ? "إدارة الشهادات والتدريب" : "Certificates & Training",
      desc: isAr
        ? "أضف وعدّل الشهادات المعتمدة وصورها وروابطها"
        : "Add and edit accredited certificates, images, and links",
      href: "/admin/certificates",
      icon: Award,
    },
    {
      title: isAr ? "نصوص الموقع والواجهة (EN / AR)" : "Hero & Site Copy (EN / AR)",
      desc: isAr
        ? "تحكم في الاسم، المسمى الوظيفي، النبذة التعريفية، والصورة الشخصية باللغتين"
        : "Edit your name, role, bio, availability badge, and avatar in both languages",
      href: "/admin/profile",
      icon: UserCheck,
    },
    {
      title: isAr ? "تعليمات المساعد الذكي (Reda AI)" : "AI Assistant Knowledge",
      desc: isAr
        ? "عدّل المعلومات وطريقة الرد الخاصة بالشات بوت في موقعك"
        : "Customize the system instructions and bio knowledge of your AI chatbot",
      href: "/admin/ai",
      icon: Bot,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.overview.welcome} 👋
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            {t.overview.subtitle}
          </p>
        </div>

        <button
          type="button"
          disabled={revalidating}
          onClick={() => void handleRevalidate()}
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-foreground shrink-0"
        >
          <RefreshCw
            className={`w-4 h-4 text-brand-mint-400 ${
              revalidating ? "animate-spin" : ""
            }`}
          />
          {revalidating ? t.overview.revalidating : t.overview.revalidateBtn}
        </button>
      </div>

      {bannerMsg ? (
        <div className="p-4 rounded-2xl bg-brand-mint-500/15 border border-brand-mint-500/35 text-brand-mint-300 text-sm font-medium flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{bannerMsg}</span>
        </div>
      ) : null}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-brand-mint-500/40 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center ${card.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">
                  {card.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {card.label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">
          {t.overview.quickActions}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shortcuts.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-white/10 hover:border-brand-mint-500/40 transition-all flex items-start gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-mint-500/10 border border-brand-mint-500/25 flex items-center justify-center text-brand-mint-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="text-base font-bold text-white group-hover:text-brand-mint-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* First-Time Database Sync Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-mint-500/10 via-slate-900/90 to-brand-violet-500/10 border border-brand-mint-500/30 space-y-4">
        <div className="flex items-start gap-3">
          <Database className="w-6 h-6 text-brand-mint-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              {t.overview.seedCardTitle}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t.overview.seedCardDesc}
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={seeding}
          onClick={() => void handleSeed()}
          className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-mint-500 to-brand-cyan-500 text-black font-extrabold text-xs hover:opacity-95 transition-all"
        >
          <Database className="w-4 h-4" />
          {seeding ? t.overview.seeding : t.overview.seedBtn}
        </button>
      </div>
    </div>
  );
}
