"use client";

import React, { useEffect, useState } from "react";
import { Bot, Check, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { useAdmin } from "@/components/admin/admin-context";
import { getSiteSettings } from "@/lib/firestore";
import { saveSiteSettings } from "@/lib/admin-firestore";
import { SYSTEM_INSTRUCTION } from "@/config/prompt";

export default function AdminAiAssistantPage() {
  const { locale } = useAdmin();
  const isAr = locale === "ar";

  const [promptText, setPromptText] = useState(SYSTEM_INSTRUCTION);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  useEffect(() => {
    getSiteSettings().then((s) => {
      if (s.aiSystemPrompt && s.aiSystemPrompt.trim().length > 20) {
        setPromptText(s.aiSystemPrompt);
      } else {
        setPromptText(SYSTEM_INSTRUCTION);
      }
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg(null);
    await saveSiteSettings({
      aiSystemPrompt: promptText.trim(),
    });
    setSaving(false);
    setSavedMsg(
      isAr
        ? "تم حفظ تعليمات المساعد الذكي (Reda AI) بنجاح!"
        : "AI Assistant instructions updated!",
    );
  };

  const handleResetDefault = () => {
    setPromptText(SYSTEM_INSTRUCTION);
  };

  return (
    <form onSubmit={handleSave} className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Bot className="w-6 h-6 text-brand-mint-400" />
            {isAr
              ? "تعليمات المساعد الذكي (Reda AI Chatbot)"
              : "AI Chatbot Knowledge & Instructions"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {isAr
              ? "تحكم في المعلومات التي يعرفها الشات بوت عنك، طريقة رده على الشركات والعملاء، وأحدث مشاريعك."
              : "Edit the system prompt that powers your Gemini AI portfolio assistant."}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetDefault}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-muted-foreground hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isAr ? "استعادة النص الأصلي" : "Reset to Default"}
          </button>

          <button
            type="submit"
            disabled={saving}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-mint-500 to-brand-cyan-500 text-black font-extrabold text-xs sm:text-sm"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            {isAr ? "حفظ تعليمات الـ AI" : "Save AI Prompt"}
          </button>
        </div>
      </div>

      {savedMsg ? (
        <div className="p-3.5 rounded-xl bg-brand-mint-500/15 border border-brand-mint-500/35 text-brand-mint-300 text-xs sm:text-sm font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          {savedMsg}
        </div>
      ) : null}

      <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-3">
        <label className="block text-xs font-bold text-foreground">
          {isAr
            ? "النص التوجيهي للمساعد الذكي (System Prompt)"
            : "System Prompt & Knowledge Base"}
        </label>
        <textarea
          rows={20}
          dir="ltr"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          className="w-full p-4 rounded-2xl bg-slate-950 border border-white/15 font-mono text-xs leading-relaxed text-foreground focus:outline-none focus:border-brand-mint-500"
        />
      </div>
    </form>
  );
}
