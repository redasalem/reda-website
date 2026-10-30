"use client";

import React, { useEffect, useState } from "react";
import {
  FileText,
  ExternalLink,
  Check,
  Loader2,
  Sparkles,
  Plus,
  X,
} from "lucide-react";
import { useAdmin } from "@/components/admin/admin-context";
import {
  getSiteSettings,
  normalizeDriveOrExternalUrl,
  DEFAULT_SITE_SETTINGS,
  type ResumeStatItem,
} from "@/lib/firestore";
import { saveSiteSettings } from "@/lib/admin-firestore";

export default function AdminCvPage() {
  const { locale } = useAdmin();
  const isAr = locale === "ar";

  const [cvUrl, setCvUrl] = useState(DEFAULT_SITE_SETTINGS.cvUrl);
  const [cvLabel, setCvLabel] = useState(DEFAULT_SITE_SETTINGS.cvLabel);
  const [cvSubtitle, setCvSubtitle] = useState(
    DEFAULT_SITE_SETTINGS.cvSubtitle,
  );
  const [stats, setStats] = useState<ResumeStatItem[]>(
    DEFAULT_SITE_SETTINGS.resumeStats || [],
  );
  const [skills, setSkills] = useState<string[]>(
    DEFAULT_SITE_SETTINGS.resumeSkills || [],
  );
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  useEffect(() => {
    getSiteSettings().then((s) => {
      setCvUrl(s.cvUrl);
      setCvLabel(s.cvLabel);
      setCvSubtitle(s.cvSubtitle);
      if (s.resumeStats && s.resumeStats.length > 0) setStats(s.resumeStats);
      if (s.resumeSkills && s.resumeSkills.length > 0) setSkills(s.resumeSkills);
    });
  }, []);

  const updateStat = (idx: number, patch: Partial<ResumeStatItem>) => {
    setStats((prev) =>
      prev.map((st, i) => (i === idx ? { ...st, ...patch } : st)),
    );
  };

  const addResumeSkill = () => {
    const val = skillInput.trim();
    if (!val) return;
    if (!skills.includes(val)) setSkills((prev) => [...prev, val]);
    setSkillInput("");
  };

  const removeResumeSkill = (item: string) => {
    setSkills((prev) => prev.filter((s) => s !== item));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg(null);
    const cleanUrl = normalizeDriveOrExternalUrl(cvUrl);
    setCvUrl(cleanUrl);
    await saveSiteSettings({
      cvUrl: cleanUrl,
      cvLabel: cvLabel.trim() || DEFAULT_SITE_SETTINGS.cvLabel,
      cvSubtitle: cvSubtitle.trim() || DEFAULT_SITE_SETTINGS.cvSubtitle,
      resumeStats: stats,
      resumeSkills: skills,
    });
    setSaving(false);
    setSavedMsg(
      isAr
        ? "تم تحديث بيانات الـ CV وصفحة التحميل بنجاح!"
        : "CV link, stats, and skills updated!",
    );
  };

  return (
    <form onSubmit={handleSave} className="max-w-4xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            {isAr
              ? "إدارة السيرة الذاتية وصفحة الـ CV"
              : "CV Link & Resume Page Manager"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {isAr
              ? "تحكم في رابط الـ CV على Google Drive، الأرقام الإحصائية (سنوات الخبرة والمشاريع)، والمهارات المعروضة في صفحة /download."
              : "Update your Google Drive CV link, key career numbers, and highlighted skills on /download."}
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-mint-500 to-brand-cyan-500 text-black font-extrabold text-xs sm:text-sm shrink-0"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          {isAr ? "حفظ تعديلات الـ CV" : "Save CV Settings"}
        </button>
      </div>

      {savedMsg ? (
        <div className="p-3.5 rounded-xl bg-brand-mint-500/15 border border-brand-mint-500/35 text-brand-mint-300 text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          {savedMsg}
        </div>
      ) : null}

      {/* Link & Button Labels */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-5">
        <h3 className="text-base font-bold text-white">
          {isAr ? "رابط ملف الـ CV" : "CV Document Link"}
        </h3>

        <div>
          <label className="block text-xs font-bold text-foreground mb-2">
            {isAr
              ? "رابط الـ CV (Google Drive أو PDF مباشر) *"
              : "CV URL (Google Drive or Direct PDF) *"}
          </label>
          <input
            type="url"
            required
            dir="ltr"
            value={cvUrl}
            onChange={(e) => setCvUrl(e.target.value)}
            placeholder="https://drive.google.com/file/d/.../view"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-sm text-foreground focus:outline-none focus:border-brand-mint-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" dir="ltr">
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Button Main Title (EN)
            </label>
            <input
              type="text"
              value={cvLabel}
              onChange={(e) => setCvLabel(e.target.value)}
              placeholder="Full-Stack Strategy CV"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-foreground"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Button Subtitle (EN)
            </label>
            <input
              type="text"
              value={cvSubtitle}
              onChange={(e) => setCvSubtitle(e.target.value)}
              placeholder="System Design · Architecture"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-foreground"
            />
          </div>
        </div>

        <div>
          <a
            href={normalizeDriveOrExternalUrl(cvUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-brand-cyan-300"
          >
            <FileText className="w-4 h-4" />
            {isAr ? "معاينة واختبار الرابط الحالي" : "Test Current CV Link"}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Career Stats on /download */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white">
          {isAr
            ? "الأرقام الإحصائية في صفحة الـ CV (مثل: +2 سنوات خبرة، +15 مشروع)"
            : "Resume Page Stats Counters"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((st, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950 border border-white/10 grid grid-cols-3 gap-2"
              dir="ltr"
            >
              <div>
                <label className="block text-[10px] text-muted-foreground mb-1">
                  Number
                </label>
                <input
                  type="text"
                  value={st.value}
                  onChange={(e) => updateStat(idx, { value: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-bold text-brand-mint-400"
                />
              </div>
              <div>
                <label className="block text-[10px] text-muted-foreground mb-1">
                  Label (EN)
                </label>
                <input
                  type="text"
                  value={st.label}
                  onChange={(e) => updateStat(idx, { label: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-muted-foreground mb-1">
                  العنوان (AR)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={st.labelAr || ""}
                  onChange={(e) => updateStat(idx, { labelAr: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlighted Skills on /download */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white">
          {isAr
            ? "المهارات البارزة في صفحة تحميل الـ CV"
            : "Highlighted Skills on Resume Page"}
        </h3>

        <div className="flex flex-wrap gap-2" dir="ltr">
          {skills.map((sk) => (
            <span
              key={sk}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-mint-500/15 border border-brand-mint-500/35 text-brand-mint-300 text-xs font-bold"
            >
              {sk}
              <button
                type="button"
                onClick={() => removeResumeSkill(sk)}
                className="cursor-pointer hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2" dir="ltr">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addResumeSkill();
              }
            }}
            placeholder="Add skill badge (e.g. Docker, GraphQL)..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-xs text-white"
          />
          <button
            type="button"
            onClick={addResumeSkill}
            className="cursor-pointer inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
