"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Share2,
  Cpu,
  Award,
  UserCheck,
  Bot,
  ExternalLink,
  LogOut,
  Globe,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { useAdmin } from "./admin-context";
import { adminDictionary } from "@/lib/i18n";
import { ADMIN_EMAIL } from "@/config/firebase";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    user,
    loading,
    isAuthorized,
    authError,
    signInWithGoogle,
    signOut,
    locale,
    toggleLocale,
  } = useAdmin();
  const pathname = usePathname();
  const t = adminDictionary[locale];
  const isRtl = locale === "ar";

  if (loading) {
    return (
      <div
        dir={t.dir}
        className="min-h-screen bg-[#060911] text-foreground flex flex-col items-center justify-center p-6"
      >
        <div className="w-12 h-12 rounded-full border-3 border-brand-mint-500 border-t-transparent animate-spin mb-4" />
        <p className="text-sm text-muted-foreground">{t.login.signingIn}</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div
        dir={t.dir}
        className="min-h-screen bg-[#060911] text-foreground flex items-center justify-center p-6 relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-mint-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-brand-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full rounded-3xl bg-slate-900/95 border border-white/10 p-8 shadow-2xl space-y-6 relative z-10 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-brand-mint-500/15 border border-brand-mint-500/30 flex items-center justify-center text-brand-mint-400 shadow-[0_0_25px_rgba(0,255,159,0.2)]">
              <Lock className="w-6 h-6" />
            </div>
            <button
              type="button"
              onClick={toggleLocale}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-brand-mint-300 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {t.switchLang}
            </button>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-white">
              {t.login.title}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.login.subtitle}
            </p>
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-mint-500/10 border border-brand-mint-500/25 text-[11px] font-mono text-brand-mint-300 mt-1"
              dir="ltr"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {ADMIN_EMAIL}
            </div>
          </div>

          {authError ? (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs space-y-1">
              <p className="font-bold text-red-400">
                {t.login.unauthorizedTitle}
              </p>
              <p>{t.login.unauthorizedDesc}</p>
              <p className="opacity-75 font-mono text-[11px]" dir="ltr">
                {authError}
              </p>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => void signInWithGoogle()}
            className="cursor-pointer w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-mint-500 to-brand-cyan-500 text-black font-extrabold text-sm flex items-center justify-center gap-3 shadow-lg hover:opacity-95 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 15.65 5 12c0-3.65 3.36-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"
              />
            </svg>
            {t.login.googleBtn}
          </button>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-brand-mint-400 transition-colors"
            >
              {t.login.backToSite}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navLinks = [
    { href: "/admin", label: t.nav.overview, icon: LayoutDashboard },
    { href: "/admin/projects", label: t.nav.projects, icon: Briefcase },
    { href: "/admin/cv", label: t.nav.cv, icon: FileText },
    { href: "/admin/socials", label: t.nav.socials, icon: Share2 },
    { href: "/admin/skills", label: t.nav.skills, icon: Cpu },
    { href: "/admin/certificates", label: t.nav.certificates, icon: Award },
    { href: "/admin/profile", label: t.nav.profile, icon: UserCheck },
    { href: "/admin/ai", label: t.nav.ai, icon: Bot },
  ];

  return (
    <div
      dir={t.dir}
      className="min-h-screen bg-[#060911] text-foreground flex flex-col lg:flex-row relative z-20"
    >
      {/* Sidebar */}
      <aside
        className={`w-full lg:w-72 bg-[#0a0f1c]/95 backdrop-blur-2xl ${
          isRtl ? "lg:border-l" : "lg:border-r"
        } border-b lg:border-b-0 border-white/10 p-5 flex flex-col gap-6 lg:sticky lg:top-0 lg:h-screen`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-mint-500/20 to-brand-cyan-500/20 border border-brand-mint-500/30 flex items-center justify-center text-brand-mint-400 font-black text-base">
              R
            </div>
            <div>
              <h1 className="text-base font-extrabold text-white leading-tight">
                {t.brandTitle}
              </h1>
              <p className="text-[11px] text-brand-mint-400 font-medium">
                {t.brandSub}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleLocale}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-brand-mint-300 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            {t.switchLang}
          </button>
        </div>

        {/* Security Status Pill */}
        <div
          className="px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2 text-[11px] text-emerald-300"
          dir="ltr"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate font-mono">{ADMIN_EMAIL}</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  active
                    ? "bg-gradient-to-r from-brand-mint-500/20 to-brand-cyan-500/10 text-brand-mint-300 border border-brand-mint-500/35 shadow-[0_0_20px_rgba(0,255,159,0.1)]"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom user info & links */}
        <div className="mt-auto pt-4 border-t border-white/10 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-foreground transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-brand-mint-400" />
              {t.viewSiteEn}
            </Link>
            <Link
              href="/ar"
              target="_blank"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-foreground transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-brand-cyan-400" />
              {t.viewSiteAr}
            </Link>
          </div>

          <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-black/40 border border-white/10">
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {user?.displayName || "Reda Salem"}
              </p>
              <p
                className="text-[10px] text-muted-foreground truncate"
                dir="ltr"
              >
                {user?.email}
              </p>
            </div>
            <button
              type="button"
              onClick={() => void signOut()}
              title={t.signOut}
              className="cursor-pointer px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.signOut}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-6xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
