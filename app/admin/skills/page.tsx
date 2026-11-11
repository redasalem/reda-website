"use client";

import React, { useEffect, useState } from "react";
import { Plus, Trash2, Check, Loader2, Code } from "lucide-react";
import { useAdmin } from "@/components/admin/admin-context";
import {
  AVAILABLE_SKILL_ICONS,
  SKILL_ICON_MAP,
} from "@/components/skills";
import {
  getSkillCategories,
  type SkillCategoryDoc,
} from "@/lib/firestore";
import {
  saveSkillCategory,
  deleteSkillCategory,
} from "@/lib/admin-firestore";

export default function AdminSkillsPage() {
  const { locale } = useAdmin();
  const isAr = locale === "ar";

  const [categories, setCategories] = useState<SkillCategoryDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const loadSkills = async () => {
    setLoading(true);
    const list = await getSkillCategories();
    setCategories(list);
    setLoading(false);
  };

  useEffect(() => {
    void loadSkills();
  }, []);

  const addCategory = () => {
    const newCat: SkillCategoryDoc = {
      id: `cat-${Date.now()}`,
      title: "New Skill Category",
      titleArabic: "قسم تقنيات جديد",
      order: categories.length,
      skills: [{ name: "React", arabicName: "React", color: "#61dafb", icon: "React" }],
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const updateCatField = (
    catIdx: number,
    patch: Partial<SkillCategoryDoc>,
  ) => {
    setCategories((prev) =>
      prev.map((c, i) => (i === catIdx ? { ...c, ...patch } : c)),
    );
  };

  const addSkillToCategory = (catIdx: number) => {
    setCategories((prev) =>
      prev.map((c, i) =>
        i === catIdx
          ? {
              ...c,
              skills: [
                ...c.skills,
                {
                  name: "New Tech",
                  arabicName: "New Tech",
                  color: "#00ff9f",
                  icon: "Code",
                },
              ],
            }
          : c,
      ),
    );
  };

  const updateSkillInCategory = (
    catIdx: number,
    skillIdx: number,
    patch: Partial<SkillCategoryDoc["skills"][number]>,
  ) => {
    setCategories((prev) =>
      prev.map((c, i) =>
        i === catIdx
          ? {
              ...c,
              skills: c.skills.map((s, si) =>
                si === skillIdx ? { ...s, ...patch } : s,
              ),
            }
          : c,
      ),
    );
  };

  const removeSkillFromCategory = (catIdx: number, skillIdx: number) => {
    setCategories((prev) =>
      prev.map((c, i) =>
        i === catIdx
          ? {
              ...c,
              skills: c.skills.filter((_, si) => si !== skillIdx),
            }
          : c,
      ),
    );
  };

  const handleSaveCategory = async (cat: SkillCategoryDoc) => {
    setSavingId(cat.id);
    setMsg(null);
    await saveSkillCategory(cat);
    setSavingId(null);
    setMsg(
      isAr
        ? `تم حفظ قسم "${cat.title}" بنجاح!`
        : `Saved category "${cat.title}"!`,
    );
  };

  const handleDeleteCategory = async (cat: SkillCategoryDoc) => {
    const ok = window.confirm(
      isAr
        ? `حذف قسم "${cat.title}" بالكامل؟`
        : `Delete category "${cat.title}"?`,
    );
    if (!ok) return;
    await deleteSkillCategory(cat.id);
    setCategories((prev) => prev.filter((c) => c.id !== cat.id));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            {isAr
              ? "إدارة التقنيات والمهارات (Tech Stack)"
              : "Manage Technologies & Skills"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {isAr
              ? "أضف تقنيات جديدة، اختر الأيقونة المناسبة ولونها، وعدّل أقسام التقنيات."
              : "Add new technologies, pick their icon and color, and organize skill categories."}
          </p>
        </div>

        <button
          type="button"
          onClick={addCategory}
          className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-mint-500 to-brand-cyan-500 text-black font-extrabold text-xs sm:text-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          {isAr ? "إضافة قسم تقنيات جديد" : "Add Skill Category"}
        </button>
      </div>

      {msg ? (
        <div className="p-3.5 rounded-xl bg-brand-mint-500/15 border border-brand-mint-500/35 text-brand-mint-300 text-xs sm:text-sm font-bold">
          {msg}
        </div>
      ) : null}

      {loading ? (
        <div className="p-12 text-center text-sm text-muted-foreground">
          {isAr ? "جاري تحميل التقنيات..." : "Loading skills..."}
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((cat, catIdx) => (
            <div
              key={cat.id}
              className="p-6 rounded-3xl bg-slate-900/85 border border-white/10 space-y-5"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 w-full">
                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">
                      Category Title (EN)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={cat.title}
                      onChange={(e) =>
                        updateCatField(catIdx, { title: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm font-bold text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">
                      عنوان القسم (AR)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={cat.titleArabic || ""}
                      onChange={(e) =>
                        updateCatField(catIdx, { titleArabic: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm font-bold text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => void handleSaveCategory(cat)}
                    disabled={savingId === cat.id}
                    className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-mint-500 text-black font-extrabold text-xs"
                  >
                    {savingId === cat.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    {isAr ? "حفظ القسم" : "Save Category"}
                  </button>

                  <button
                    type="button"
                    onClick={() => void handleDeleteCategory(cat)}
                    className="cursor-pointer p-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Skills inside Category */}
              <div className="space-y-2.5">
                {cat.skills.map((skill, skillIdx) => {
                  const IconComp =
                    SKILL_ICON_MAP[skill.icon || skill.name] ||
                    SKILL_ICON_MAP[skill.name] ||
                    Code;
                  return (
                    <div
                      key={skillIdx}
                      className="flex flex-wrap items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/70 border border-white/10"
                      dir="ltr"
                    >
                      <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <IconComp
                          className="w-4 h-4"
                          style={{ color: skill.color }}
                        />
                      </span>

                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) =>
                          updateSkillInCategory(catIdx, skillIdx, {
                            name: e.target.value,
                            arabicName: e.target.value,
                          })
                        }
                        placeholder="Technology Name (e.g. Docker)"
                        className="flex-1 min-w-[140px] px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-semibold text-white"
                      />

                      <select
                        value={skill.icon || skill.name}
                        onChange={(e) =>
                          updateSkillInCategory(catIdx, skillIdx, {
                            icon: e.target.value,
                          })
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-muted-foreground"
                      >
                        {AVAILABLE_SKILL_ICONS.map((iconKey) => (
                          <option key={iconKey} value={iconKey}>
                            Icon: {iconKey}
                          </option>
                        ))}
                      </select>

                      <input
                        type="color"
                        value={
                          skill.color.startsWith("#") ? skill.color : "#00ff9f"
                        }
                        onChange={(e) =>
                          updateSkillInCategory(catIdx, skillIdx, {
                            color: e.target.value,
                          })
                        }
                        className="w-9 h-8 rounded cursor-pointer bg-transparent border-0"
                        title="Brand Color"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeSkillFromCategory(catIdx, skillIdx)
                        }
                        className="cursor-pointer p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => addSkillToCategory(catIdx)}
                className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-brand-mint-300"
              >
                <Plus className="w-3.5 h-3.5" />
                {isAr
                  ? "إضافة تقنية جديدة في هذا القسم"
                  : "Add Technology to this Category"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
