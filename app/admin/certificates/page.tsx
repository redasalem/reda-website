"use client";

import React, { useEffect, useState } from "react";
import { Plus, Trash2, Check, Loader2 } from "lucide-react";
import { useAdmin } from "@/components/admin/admin-context";
import ImageUploader from "@/components/admin/image-uploader";
import {
  getCertificates,
  type CertificateItem,
  type CertificateTheme,
  type CertificateIconName,
} from "@/lib/firestore";
import {
  saveCertificate,
  deleteCertificate,
} from "@/lib/admin-firestore";

export default function AdminCertificatesPage() {
  const { locale } = useAdmin();
  const isAr = locale === "ar";

  const [certs, setCerts] = useState<CertificateItem[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    getCertificates().then(setCerts);
  }, []);

  const addCert = () => {
    setCerts((prev) => [
      ...prev,
      {
        id: `cert-${Date.now()}`,
        title: "New Certificate",
        titleArabic: "شهادة جديدة",
        issuer: "Organization Name",
        date: "2025",
        description: "Certification details and engineering skills covered.",
        descriptionArabic: "",
        link: "https://",
        image: "/images/placeholder.png",
        theme: "mint",
        iconName: "Award",
        order: prev.length,
      },
    ]);
  };

  const updateCert = (idx: number, patch: Partial<CertificateItem>) => {
    setCerts((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)),
    );
  };

  const handleSave = async (cert: CertificateItem) => {
    setSavingId(cert.id);
    setMsg(null);
    await saveCertificate(cert);
    setSavingId(null);
    setMsg(
      isAr
        ? `تم حفظ شهادة "${cert.title}" بنجاح!`
        : `Saved certificate "${cert.title}"!`,
    );
  };

  const handleDelete = async (cert: CertificateItem) => {
    const ok = window.confirm(
      isAr ? `حذف شهادة "${cert.title}"؟` : `Delete "${cert.title}"?`,
    );
    if (!ok) return;
    await deleteCertificate(cert.id);
    setCerts((prev) => prev.filter((c) => c.id !== cert.id));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            {isAr ? "إدارة الشهادات والتدريب" : "Certificates & Training"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {isAr
              ? "أضف أو عدّل شهاداتك المعتمدة مع رفع صورة الشهادة عبر Cloudinary."
              : "Add or edit accredited certificates with Cloudinary image upload."}
          </p>
        </div>

        <button
          type="button"
          onClick={addCert}
          className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-mint-500 to-brand-cyan-500 text-black font-extrabold text-xs sm:text-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          {isAr ? "إضافة شهادة جديدة" : "Add Certificate"}
        </button>
      </div>

      {msg ? (
        <div className="p-3.5 rounded-xl bg-brand-mint-500/15 border border-brand-mint-500/35 text-brand-mint-300 text-xs sm:text-sm font-bold">
          {msg}
        </div>
      ) : null}

      <div className="space-y-6">
        {certs.map((cert, idx) => (
          <div
            key={cert.id}
            className="p-6 rounded-3xl bg-slate-900/85 border border-white/10 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" dir="ltr">
              <div>
                <label className="block text-[11px] text-muted-foreground mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={cert.title}
                  onChange={(e) => updateCert(idx, { title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-muted-foreground mb-1">
                  Issuer
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCert(idx, { issuer: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-muted-foreground mb-1">
                  Date (e.g. May 2025)
                </label>
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => updateCert(idx, { date: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm text-white"
                />
              </div>
            </div>

            <div dir="ltr">
              <label className="block text-[11px] text-muted-foreground mb-1">
                Description
              </label>
              <textarea
                rows={5}
                value={cert.description}
                onChange={(e) =>
                  updateCert(idx, { description: e.target.value })
                }
                className="w-full min-h-[130px] px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-base leading-relaxed text-white resize-y"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" dir="ltr">
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-muted-foreground mb-1">
                  Certificate Credential Link
                </label>
                <input
                  type="url"
                  value={cert.link}
                  onChange={(e) => updateCert(idx, { link: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-1">
                    Color Theme
                  </label>
                  <select
                    value={cert.theme}
                    onChange={(e) =>
                      updateCert(idx, {
                        theme: e.target.value as CertificateTheme,
                      })
                    }
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-xs text-white"
                  >
                    <option value="mint">Mint</option>
                    <option value="violet">Violet</option>
                    <option value="cyan">Cyan</option>
                    <option value="amber">Amber</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-1">
                    Badge Icon
                  </label>
                  <select
                    value={cert.iconName}
                    onChange={(e) =>
                      updateCert(idx, {
                        iconName: e.target.value as CertificateIconName,
                      })
                    }
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-xs text-white"
                  >
                    <option value="Code2">Code2</option>
                    <option value="Rocket">Rocket</option>
                    <option value="Bot">Bot / AI</option>
                    <option value="Award">Award</option>
                  </select>
                </div>
              </div>
            </div>

            <ImageUploader
              label={isAr ? "صورة الشهادة" : "Certificate Image"}
              value={cert.image}
              onChange={(url) => updateCert(idx, { image: url })}
              locale={locale}
            />

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => void handleDelete(cert)}
                className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 text-xs font-bold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {isAr ? "حذف" : "Delete"}
              </button>
              <button
                type="button"
                disabled={savingId === cert.id}
                onClick={() => void handleSave(cert)}
                className="cursor-pointer inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-mint-500 text-black font-extrabold text-xs"
              >
                {savingId === cert.id ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                {isAr ? "حفظ الشهادة" : "Save Certificate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
