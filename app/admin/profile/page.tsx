"use client";

import React, { useEffect, useState } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";
import { useAdmin } from "@/components/admin/admin-context";
import ImageUploader from "@/components/admin/image-uploader";
import {
  getSiteSettings,
  DEFAULT_SITE_SETTINGS,
  type SiteSettings,
} from "@/lib/firestore";
import { saveSiteSettings } from "@/lib/admin-firestore";

export default function AdminProfilePage() {
  const { locale } = useAdmin();
  const isAr = locale === "ar";

  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [stackInput, setStackInput] = useState(
    "React, Next.js, Node.js, MongoDB",
  );
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  useEffect(() => {
    getSiteSettings().then((s) => {
      setSettings(s);
      setStackInput((s.codeStack || []).join(", "));
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg(null);
    const parsedStack = stackInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    await saveSiteSettings({
      ...settings,
      codeStack:
        parsedStack.length > 0 ? parsedStack : DEFAULT_SITE_SETTINGS.codeStack,
    });
    setSaving(false);
    setSavedMsg(
      isAr
        ? "تم حفظ جميع نصوص الموقع والملف الشخصي باللغتين بنجاح!"
        : "Hero, bio, and profile texts saved for both languages!",
    );
  };

  return (
    <form onSubmit={handleSave} className="max-w-4xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            {isAr
              ? "نصوص الموقع والواجهة الرئيسية (عربي + إنجليزي)"
              : "Hero, Bio & Site Copy (English + Arabic)"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {isAr
              ? "تحكم كامل في الاسم، المسمى الوظيفي، النبذة التعريفية، شارة التفرغ، والصورة الشخصية في النسختين الإنجليزية والعربية."
              : "Control your name, job title, bio paragraph, availability badge, and avatar across both English and Arabic versions."}
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
          {isAr ? "حفظ التعديلات" : "Save All Texts"}
        </button>
      </div>

      {savedMsg ? (
        <div className="p-3.5 rounded-xl bg-brand-mint-500/15 border border-brand-mint-500/35 text-brand-mint-300 text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          {savedMsg}
        </div>
      ) : null}

      {/* Avatar & Terminal */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-5">
        <h3 className="text-base font-bold text-white">
          {isAr
            ? "الصورة الشخصية وشاشة الأكواد (Terminal)"
            : "Avatar & Hero Code Terminal"}
        </h3>

        <ImageUploader
          label={
            isAr
              ? "الصورة الشخصية (رفع عبر Cloudinary أو /images/reda.jpeg)"
              : "Profile Avatar Image"
          }
          value={settings.avatarUrl}
          onChange={(url) => setSettings((p) => ({ ...p, avatarUrl: url }))}
          locale={locale}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" dir="ltr">
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Sidebar Tagline (e.g. Next.js · React · Node.js)
            </label>
            <input
              type="text"
              value={settings.sidebarTagline}
              onChange={(e) =>
                setSettings((p) => ({ ...p, sidebarTagline: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5">
              Terminal Stack Array (comma-separated)
            </label>
            <input
              type="text"
              value={stackInput}
              onChange={(e) => setStackInput(e.target.value)}
              placeholder="React, Next.js, Node.js, MongoDB"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-white"
            />
          </div>
        </div>
      </div>

      {/* English Texts */}
      <div
        className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-4"
        dir="ltr"
      >
        <h3 className="text-base font-bold text-brand-mint-400">
          English Version Texts (/)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Name (EN)
            </label>
            <input
              type="text"
              value={settings.heroName}
              onChange={(e) =>
                setSettings((p) => ({ ...p, heroName: e.target.value }))
              }
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Job Title (EN)
            </label>
            <input
              type="text"
              value={settings.heroTitle}
              onChange={(e) =>
                setSettings((p) => ({ ...p, heroTitle: e.target.value }))
              }
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Status Badge (EN)
            </label>
            <input
              type="text"
              value={settings.availabilityBadge}
              onChange={(e) =>
                setSettings((p) => ({
                  ...p,
                  availabilityBadge: e.target.value,
                }))
              }
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Hero Bio Paragraph (EN)
          </label>
          <textarea
            rows={3}
            value={settings.heroBio}
            onChange={(e) =>
              setSettings((p) => ({ ...p, heroBio: e.target.value }))
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-white resize-none"
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Footer Summary (EN)
          </label>
          <textarea
            rows={2}
            value={settings.footerBlurb}
            onChange={(e) =>
              setSettings((p) => ({ ...p, footerBlurb: e.target.value }))
            }
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm text-white resize-none"
          />
        </div>
      </div>

      {/* Arabic Texts */}
      <div
        className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-4"
        dir="rtl"
      >
        <h3 className="text-base font-bold text-brand-cyan-400">
          نصوص النسخة العربية (/ar)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              الاسم بالعربية
            </label>
            <input
              type="text"
              value={settings.heroNameAr || ""}
              onChange={(e) =>
                setSettings((p) => ({ ...p, heroNameAr: e.target.value }))
              }
              placeholder="رضا سالم"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              المسمى الوظيفي بالعربية
            </label>
            <input
              type="text"
              value={settings.heroTitleAr || ""}
              onChange={(e) =>
                setSettings((p) => ({ ...p, heroTitleAr: e.target.value }))
              }
              placeholder="مهندس برمجيات Full-Stack"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              شارة الإتاحة بالعربية
            </label>
            <input
              type="text"
              value={settings.availabilityBadgeAr || ""}
              onChange={(e) =>
                setSettings((p) => ({
                  ...p,
                  availabilityBadgeAr: e.target.value,
                }))
              }
              placeholder="متاح للعمل عن بُعد والمشاريع الحرة"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            النبذة التعريفية في الواجهة (Hero Bio بالعربية)
          </label>
          <textarea
            rows={3}
            value={settings.heroBioAr || ""}
            onChange={(e) =>
              setSettings((p) => ({ ...p, heroBioAr: e.target.value }))
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-white resize-none"
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            وصف الفوتر بالعربية (Footer)
          </label>
          <textarea
            rows={2}
            value={settings.footerBlurbAr || ""}
            onChange={(e) =>
              setSettings((p) => ({ ...p, footerBlurbAr: e.target.value }))
            }
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm text-white resize-none"
          />
        </div>
      </div>
    </form>
  );
}
