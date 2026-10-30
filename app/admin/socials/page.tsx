"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Check,
  Loader2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useAdmin } from "@/components/admin/admin-context";
import SocialIcon from "@/components/social-icon";
import {
  getSocialLinks,
  getSiteSettings,
  type SocialLinkItem,
  type SocialPlatform,
} from "@/lib/firestore";
import { saveSocialLinks, saveSiteSettings } from "@/lib/admin-firestore";

const PLATFORMS: { value: SocialPlatform; label: string }[] = [
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "email", label: "Email (mailto:)" },
  { value: "phone", label: "WhatsApp / Phone (tel:)" },
  { value: "x", label: "X (Twitter)" },
  { value: "facebook", label: "Facebook" },
  { value: "devto", label: "DEV Community" },
  { value: "medium", label: "Medium" },
  { value: "stackoverflow", label: "Stack Overflow" },
  { value: "youtube", label: "YouTube" },
  { value: "website", label: "External Website" },
];

export default function AdminSocialsPage() {
  const { locale } = useAdmin();
  const isAr = locale === "ar";

  const [links, setLinks] = useState<SocialLinkItem[]>([]);
  const [email, setEmail] = useState("redasalem287@gmail.com");
  const [phone, setPhone] = useState("+201121696299");
  const [phoneDisplay, setPhoneDisplay] = useState("+20 112 169 6299");
  const [githubUrl, setGithubUrl] = useState("https://github.com/redasalem");
  const [linkedinUrl, setLinkedinUrl] = useState(
    "https://www.linkedin.com/in/reda-salem-dev/",
  );
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getSocialLinks(), getSiteSettings()]).then(([l, s]) => {
      setLinks(l);
      setEmail(s.email);
      setPhone(s.phone);
      setPhoneDisplay(s.phoneDisplay);
      setGithubUrl(s.githubUrl);
      setLinkedinUrl(s.linkedinUrl);
    });
  }, []);

  const addNewLink = () => {
    setLinks((prev) => [
      ...prev,
      {
        id: `social-${Date.now()}`,
        platform: "website",
        label: "New Link",
        href: "https://",
        visible: true,
        showInHero: true,
        showInSidebar: true,
        showInFooter: true,
        order: prev.length,
      },
    ]);
  };

  const updateItem = (index: number, patch: Partial<SocialLinkItem>) => {
    setLinks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  };

  const removeItem = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= links.length) return;
    const copy = [...links];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    setLinks(copy);
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg(null);
    await Promise.all([
      saveSocialLinks(links),
      saveSiteSettings({
        email: email.trim(),
        phone: phone.trim(),
        phoneDisplay: phoneDisplay.trim(),
        githubUrl: githubUrl.trim(),
        linkedinUrl: linkedinUrl.trim(),
      }),
    ]);
    setSaving(false);
    setSavedMsg(
      isAr
        ? "تم حفظ جميع الروابط وبيانات التواصل بنجاح!"
        : "All social links and contact details saved!",
    );
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            {isAr
              ? "روابط السوشيال وبيانات التواصل"
              : "Social Links & Contact Info"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {isAr
              ? "تحكم في جميع الروابط الظاهرة في القائمة الجانبية، الـ Hero، قسم التواصل، والـ Footer."
              : "Control every link displayed in the Sidebar, Hero, Contact section, and Footer."}
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
          {isAr ? "حفظ جميع التعديلات" : "Save All Changes"}
        </button>
      </div>

      {savedMsg ? (
        <div className="p-3.5 rounded-xl bg-brand-mint-500/15 border border-brand-mint-500/35 text-brand-mint-300 text-xs sm:text-sm font-bold">
          {savedMsg}
        </div>
      ) : null}

      {/* Direct Contact Cards Settings */}
      <div className="p-6 rounded-3xl bg-slate-900/85 border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white">
          {isAr
            ? "بيانات التواصل الأساسية (قسم Contact)"
            : "Primary Contact Section Details"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" dir="ltr">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-foreground"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Phone / WhatsApp Display
            </label>
            <input
              type="text"
              value={phoneDisplay}
              onChange={(e) => setPhoneDisplay(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-foreground"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Primary GitHub Profile URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-foreground"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Primary LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Social Icons List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">
            {isAr ? "أيقونات الحسابات المهنية" : "Social Icon Links"}
          </h3>
          <button
            type="button"
            onClick={addNewLink}
            className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white"
          >
            <Plus className="w-4 h-4" />
            {isAr ? "إضافة رابط جديد" : "Add Social Link"}
          </button>
        </div>

        <div className="space-y-3">
          {links.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3"
            >
              <div className="flex flex-wrap items-center gap-3">
                <SocialIcon
                  platform={item.platform}
                  href={item.href || "#"}
                  label={item.label}
                  size="sm"
                />

                <select
                  value={item.platform}
                  onChange={(e) =>
                    updateItem(idx, {
                      platform: e.target.value as SocialPlatform,
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-xs font-bold text-foreground"
                >
                  {PLATFORMS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  dir="ltr"
                  value={item.label}
                  onChange={(e) => updateItem(idx, { label: e.target.value })}
                  placeholder="Label"
                  className="w-36 px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-xs text-foreground"
                />

                <input
                  type="text"
                  dir="ltr"
                  value={item.href}
                  onChange={(e) => updateItem(idx, { href: e.target.value })}
                  placeholder="https://... or mailto:... or tel:..."
                  className="flex-1 min-w-[200px] px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-xs text-foreground"
                />

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(idx, -1)}
                    className="cursor-pointer p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(idx, 1)}
                    className="cursor-pointer p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    className="cursor-pointer p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-1">
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.visible}
                    onChange={(e) =>
                      updateItem(idx, { visible: e.target.checked })
                    }
                    className="accent-emerald-400"
                  />
                  {isAr ? "مفعّل (Visible)" : "Enabled"}
                </label>

                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.showInSidebar !== false}
                    onChange={(e) =>
                      updateItem(idx, { showInSidebar: e.target.checked })
                    }
                    className="accent-emerald-400"
                  />
                  Sidebar
                </label>

                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.showInHero !== false}
                    onChange={(e) =>
                      updateItem(idx, { showInHero: e.target.checked })
                    }
                    className="accent-emerald-400"
                  />
                  Hero
                </label>

                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.showInFooter !== false}
                    onChange={(e) =>
                      updateItem(idx, { showInFooter: e.target.checked })
                    }
                    className="accent-emerald-400"
                  />
                  Footer
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
