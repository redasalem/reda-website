"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Code2,
  Sparkles,
  Eye,
  EyeOff,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { useAdmin } from "@/components/admin/admin-context";
import ImageUploader from "@/components/admin/image-uploader";
import {
  getProjects,
  getSkillCategories,
  type ProjectData,
} from "@/lib/firestore";
import {
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
  type ProjectInput,
} from "@/lib/admin-firestore";

const EMPTY_FORM: ProjectInput = {
  title: "",
  description: "",
  tech: [],
  demo: "",
  code: "",
  image: "/images/placeholder.png",
  featured: true,
  published: true,
  order: 0,
};

export default function AdminProjectsPage() {
  const { locale } = useAdmin();
  const isAr = locale === "ar";

  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProjectInput>(EMPTY_FORM);
  const [techInput, setTechInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadAll = async () => {
    setLoading(true);
    const [projList, cats] = await Promise.all([
      getProjects({ includeUnpublished: true }),
      getSkillCategories(),
    ]);
    setProjects(projList);
    const allSkillNames = Array.from(
      new Set(cats.flatMap((c) => c.skills.map((s) => s.name))),
    );
    setSuggestedSkills(allSkillNames);
    setLoading(false);
  };

  useEffect(() => {
    void loadAll();
  }, []);

  const openNewProjectForm = () => {
    setEditingId(null);
    setForm({
      ...EMPTY_FORM,
      order: projects.length,
    });
    setTechInput("");
    setShowForm(true);
  };

  const openEditProjectForm = (project: ProjectData) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      tech: [...project.tech],
      demo: project.demo,
      code: project.code,
      image: project.image || "/images/placeholder.png",
      featured: project.featured !== false,
      published: project.published !== false,
      order: project.order ?? 0,
    });
    setTechInput("");
    setShowForm(true);
  };

  const addTechTag = (raw: string) => {
    const cleaned = raw.trim();
    if (!cleaned) return;
    if (!form.tech.includes(cleaned)) {
      setForm((prev) => ({ ...prev, tech: [...prev.tech, cleaned] }));
    }
    setTechInput("");
  };

  const removeTechTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tech: prev.tech.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    setFeedback(null);
    try {
      if (editingId) {
        await updateProject(editingId, form);
        setFeedback(
          isAr ? "تم تحديث المشروع بنجاح!" : "Project updated successfully!",
        );
      } else {
        await createProject(form);
        setFeedback(
          isAr ? "تمت إضافة المشروع بنجاح!" : "Project created successfully!",
        );
      }
      setShowForm(false);
      setEditingId(null);
      await loadAll();
    } catch (err: unknown) {
      setFeedback(
        err instanceof Error ? err.message : "Failed to save project",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project: ProjectData) => {
    const confirmed = window.confirm(
      isAr
        ? `هل أنت متأكد من حذف مشروع "${project.title}"؟`
        : `Delete project "${project.title}"?`,
    );
    if (!confirmed) return;

    await deleteProject(project.id);
    await loadAll();
  };

  const handleTogglePublished = async (project: ProjectData) => {
    await updateProject(project.id, {
      published: project.published === false ? true : false,
    });
    await loadAll();
  };

  const handleToggleFeatured = async (project: ProjectData) => {
    await updateProject(project.id, {
      featured: project.featured === false ? true : false,
    });
    await loadAll();
  };

  const handleMove = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;
    const copy = [...projects];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    setProjects(copy);
    await reorderProjects(copy.map((p) => p.id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            {isAr ? "إدارة المشاريع (Projects)" : "Manage Projects"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {isAr
              ? "أضف، عدّل، أو رتّب مشاريعك مباشرة في Firestore مع رفع الصور تلقائياً عبر Cloudinary."
              : "Create, edit, reorder, or hide projects in Firestore with direct Cloudinary image upload."}
          </p>
        </div>

        <button
          type="button"
          onClick={openNewProjectForm}
          className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-mint-500 to-brand-cyan-500 text-black font-extrabold text-xs sm:text-sm shadow-lg hover:opacity-95 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          {isAr ? "إضافة مشروع جديد" : "Add New Project"}
        </button>
      </div>

      {feedback ? (
        <div className="p-3.5 rounded-xl bg-brand-mint-500/15 border border-brand-mint-500/35 text-brand-mint-300 text-xs sm:text-sm font-semibold">
          {feedback}
        </div>
      ) : null}

      {/* Modal / Slide-down Form */}
      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-3xl bg-slate-900/95 border border-brand-mint-500/35 shadow-2xl space-y-5"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white">
              {editingId
                ? isAr
                  ? "تعديل المشروع"
                  : "Edit Project"
                : isAr
                ? "إضافة مشروع جديد"
                : "New Project"}
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="cursor-pointer p-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-foreground mb-1.5">
                {isAr ? "اسم المشروع (Title) *" : "Project Title *"}
              </label>
              <input
                type="text"
                required
                dir="ltr"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g. Car Rental & Booking Platform"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-foreground focus:outline-none focus:border-brand-mint-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-foreground mb-1.5">
                {isAr ? "وصف المشروع (Description) *" : "Project Description *"}
              </label>
              <textarea
                rows={3}
                required
                dir="ltr"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Describe architecture, features, and impact..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-foreground focus:outline-none focus:border-brand-mint-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                {isAr ? "رابط المعاينة الحية (Live Demo URL)" : "Live Demo URL"}
              </label>
              <input
                type="url"
                dir="ltr"
                value={form.demo}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, demo: e.target.value }))
                }
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-foreground focus:outline-none focus:border-brand-mint-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                {isAr
                  ? "رابط الكود على GitHub (Source Code URL)"
                  : "GitHub / Code URL"}
              </label>
              <input
                type="url"
                dir="ltr"
                value={form.code}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, code: e.target.value }))
                }
                placeholder="https://github.com/redasalem/..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-foreground focus:outline-none focus:border-brand-mint-500"
              />
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-foreground">
              {isAr
                ? "التقنيات المستخدمة (Technologies)"
                : "Technologies / Stack"}
            </label>

            <div className="flex flex-wrap gap-2">
              {form.tech.map((tItem) => (
                <span
                  key={tItem}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-mint-500/15 border border-brand-mint-500/35 text-brand-mint-300 text-xs font-bold"
                >
                  {tItem}
                  <button
                    type="button"
                    onClick={() => removeTechTag(tItem)}
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
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTechTag(techInput);
                  }
                }}
                placeholder="Type technology (e.g. Next.js) and press Enter..."
                className="flex-1 px-4 py-2 rounded-xl bg-slate-950 border border-white/15 text-sm text-foreground focus:outline-none focus:border-brand-mint-500"
              />
              <button
                type="button"
                onClick={() => addTechTag(techInput)}
                className="cursor-pointer px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white"
              >
                + Add
              </button>
            </div>

            {/* Quick click suggestions */}
            {suggestedSkills.length > 0 ? (
              <div className="pt-1">
                <p className="text-[11px] text-muted-foreground mb-1.5">
                  {isAr
                    ? "اختر بسرعة من تقنياتك:"
                    : "Quick-add from your skills:"}
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto" dir="ltr">
                  {suggestedSkills.map((sk) => {
                    const selected = form.tech.includes(sk);
                    return (
                      <button
                        key={sk}
                        type="button"
                        onClick={() =>
                          selected ? removeTechTag(sk) : addTechTag(sk)
                        }
                        className={`cursor-pointer px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          selected
                            ? "bg-brand-mint-500 text-black"
                            : "bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white"
                        }`}
                      >
                        {selected ? "✓ " : "+ "}
                        {sk}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          {/* Image Uploader */}
          <ImageUploader
            label={
              isAr
                ? "صورة المشروع (رفع مباشر على Cloudinary أو لصق رابط)"
                : "Project Image (Upload to Cloudinary or paste URL)"
            }
            value={form.image || ""}
            onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
            locale={locale}
          />

          {/* Toggles */}
          <div className="flex flex-wrap gap-6 pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-foreground">
              <input
                type="checkbox"
                checked={form.published !== false}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, published: e.target.checked }))
                }
                className="w-4 h-4 accent-emerald-400"
              />
              {isAr ? "منشور على الموقع العام (Published)" : "Published on site"}
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-foreground">
              <input
                type="checkbox"
                checked={form.featured !== false}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, featured: e.target.checked }))
                }
                className="w-4 h-4 accent-emerald-400"
              />
              {isAr ? "شارة مشروع مميز (FEATURED)" : "Show FEATURED badge"}
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="cursor-pointer px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-muted-foreground"
            >
              {isAr ? "إلغاء" : "Cancel"}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-mint-500 to-brand-cyan-500 text-black font-extrabold text-xs"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              {editingId
                ? isAr
                  ? "حفظ التعديلات"
                  : "Save Changes"
                : isAr
                ? "نشر المشروع"
                : "Create Project"}
            </button>
          </div>
        </form>
      ) : null}

      {/* Projects List */}
      {loading ? (
        <div className="p-12 text-center text-sm text-muted-foreground">
          {isAr ? "جاري تحميل المشاريع من Firestore..." : "Loading projects..."}
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900/60 border border-white/10 text-center space-y-3">
          <p className="text-base font-bold text-white">
            {isAr
              ? "لا توجد مشاريع في Firestore حالياً"
              : "No projects found in Firestore"}
          </p>
          <p className="text-xs text-muted-foreground">
            {isAr
              ? "اضغط على زر إضافة مشروع جديد بالأعلى لإضافة أول مشروع."
              : "Click Add New Project above to publish your first project."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              {/* Thumbnail */}
              <div className="relative w-full sm:w-28 h-40 sm:h-20 rounded-xl overflow-hidden bg-slate-950 border border-white/10 shrink-0">
                <Image
                  src={project.image || "/images/placeholder.png"}
                  alt={project.title}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    {project.title}
                  </h3>
                  {project.featured !== false ? (
                    <span className="px-2 py-0.5 rounded-full bg-brand-mint-500/15 text-brand-mint-300 border border-brand-mint-500/30 text-[10px] font-bold">
                      FEATURED
                    </span>
                  ) : null}
                  {project.published === false ? (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      {isAr ? "مخفي" : "Hidden"}
                    </span>
                  ) : null}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.map((tItem) => (
                    <span
                      key={tItem}
                      className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-brand-cyan-300"
                    >
                      {tItem}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => void handleMove(index, -1)}
                  title={isAr ? "تحريك لأعلى" : "Move up"}
                  className="cursor-pointer p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-muted-foreground hover:text-white"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={index === projects.length - 1}
                  onClick={() => void handleMove(index, 1)}
                  title={isAr ? "تحريك لأسفل" : "Move down"}
                  className="cursor-pointer p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-muted-foreground hover:text-white"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => void handleToggleFeatured(project)}
                  title={isAr ? "تبديل شارة مميز" : "Toggle Featured"}
                  className={`cursor-pointer p-2 rounded-lg border transition-colors ${
                    project.featured !== false
                      ? "bg-brand-mint-500/15 border-brand-mint-500/35 text-brand-mint-300"
                      : "bg-white/5 border-white/10 text-muted-foreground"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => void handleTogglePublished(project)}
                  title={isAr ? "إظهار / إخفاء" : "Publish / Hide"}
                  className={`cursor-pointer p-2 rounded-lg border transition-colors ${
                    project.published !== false
                      ? "bg-emerald-500/15 border-emerald-500/35 text-emerald-300"
                      : "bg-amber-500/15 border-amber-500/35 text-amber-300"
                  }`}
                >
                  {project.published !== false ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>

                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Demo"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : null}

                {project.code ? (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Code"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white"
                  >
                    <Code2 className="w-4 h-4" />
                  </a>
                ) : null}

                <button
                  type="button"
                  onClick={() => openEditProjectForm(project)}
                  title={isAr ? "تعديل" : "Edit"}
                  className="cursor-pointer p-2 rounded-lg bg-brand-cyan-500/15 hover:bg-brand-cyan-500/25 text-brand-cyan-300"
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => void handleDelete(project)}
                  title={isAr ? "حذف" : "Delete"}
                  className="cursor-pointer p-2 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
