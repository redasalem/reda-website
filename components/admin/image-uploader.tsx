"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Link as LinkIcon, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  locale?: "en" | "ar";
}

export default function ImageUploader({
  value,
  onChange,
  label,
  locale = "ar",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cloudNameInput, setCloudNameInput] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        window.localStorage.getItem("reda_cloudinary_cloud_name") ||
        "dffileatz"
      );
    }
    return process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dffileatz";
  });
  const [uploadPresetInput, setUploadPresetInput] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
        window.localStorage.getItem("reda_cloudinary_upload_preset") ||
        "reda_portfolio"
      );
    }
    return process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "reda_portfolio";
  });
  const [showCloudinarySetup, setShowCloudinarySetup] = useState(false);

  const isAr = locale === "ar";

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = (
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || cloudNameInput
    ).trim();
    const uploadPreset = (
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || uploadPresetInput
    ).trim();

    if (!cloudName || !uploadPreset) {
      setShowCloudinarySetup(true);
      setError(
        isAr
          ? "أدخل Cloud Name و Upload Preset الخاصين بـ Cloudinary أولاً (أو ضعهم في ملف .env.local وعلى Vercel)."
          : "Please enter your Cloudinary Cloud Name and Unsigned Upload Preset first (or set them in .env.local / Vercel).",
      );
      return;
    }

    try {
      window.localStorage.setItem("reda_cloudinary_cloud_name", cloudName);
      window.localStorage.setItem("reda_cloudinary_upload_preset", uploadPreset);
    } catch {}

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      if (!res.ok || !data.secure_url) {
        throw new Error(
          data?.error?.message || "Cloudinary upload failed. Check preset mode (must be Unsigned).",
        );
      }

      onChange(data.secure_url);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to upload image to Cloudinary",
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {label ? (
        <label className="block text-sm font-semibold text-foreground">
          {label}
        </label>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <LinkIcon className="w-4 h-4 text-muted-foreground absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
          <input
            type="text"
            dir="ltr"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://res.cloudinary.com/... or /images/placeholder.png"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-sm text-foreground focus:outline-none focus:border-brand-mint-500"
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-mint-500/15 hover:bg-brand-mint-500/25 border border-brand-mint-500/30 text-brand-mint-300 text-xs font-bold transition-all shrink-0"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {isAr ? "جاري الرفع..." : "Uploading..."}
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              {isAr ? "رفع صورة (Cloudinary)" : "Upload (Cloudinary)"}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setShowCloudinarySetup((v) => !v)}
          className="cursor-pointer px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-muted-foreground hover:text-white transition-all shrink-0"
        >
          ⚙️ Cloudinary
        </button>
      </div>

      {showCloudinarySetup ? (
        <div className="p-4 rounded-xl bg-slate-900/95 border border-brand-cyan-500/30 space-y-3 text-xs">
          <p className="text-brand-cyan-300 font-semibold">
            {isAr
              ? "إعداد الرفع المباشر عبر Cloudinary (يحفظ في المتصفح أو ضعه في Vercel Env):"
              : "Cloudinary Direct Upload Setup (saved in browser or set in Vercel Env):"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" dir="ltr">
            <div>
              <label className="block text-[11px] text-muted-foreground mb-1">
                NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
              </label>
              <input
                type="text"
                value={cloudNameInput}
                onChange={(e) => {
                  setCloudNameInput(e.target.value);
                  try {
                    window.localStorage.setItem(
                      "reda_cloudinary_cloud_name",
                      e.target.value.trim(),
                    );
                  } catch {}
                }}
                placeholder="e.g. dxyz12345"
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-foreground"
              />
            </div>
            <div>
              <label className="block text-[11px] text-muted-foreground mb-1">
                NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET (Unsigned)
              </label>
              <input
                type="text"
                value={uploadPresetInput}
                onChange={(e) => {
                  setUploadPresetInput(e.target.value);
                  try {
                    window.localStorage.setItem(
                      "reda_cloudinary_upload_preset",
                      e.target.value.trim(),
                    );
                  } catch {}
                }}
                placeholder="e.g. portfolio_unsigned"
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-foreground"
              />
            </div>
          </div>
          <p className="text-muted-foreground">
            {isAr
              ? "ملاحظة: من حسابك في Cloudinary ادخل Settings → Upload → Upload presets واضغط Add upload preset واختر Signing Mode: Unsigned."
              : "Tip: In Cloudinary go to Settings → Upload → Upload presets → Add upload preset → set Signing Mode to Unsigned."}
          </p>
        </div>
      ) : null}

      {error ? (
        <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/25 px-3 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      {value ? (
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
          <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-white/10">
            <Image
              src={value}
              alt="Preview"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-brand-mint-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isAr ? "معاينة الصورة الحالية" : "Current Image Preview"}
            </p>
            <p className="text-[11px] text-muted-foreground truncate" dir="ltr">
              {value}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
