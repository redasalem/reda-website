"use client";

import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getFirestore,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import { getFirebaseApp } from "@/config/firebase";
import {
  type ProjectData,
  type SiteSettings,
  type SocialLinkItem,
  type SkillCategoryDoc,
  type CertificateItem,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_SKILL_CATEGORIES,
  DEFAULT_CERTIFICATES,
  normalizeDriveOrExternalUrl,
} from "@/lib/firestore";

function getAdminDb() {
  return getFirestore(getFirebaseApp());
}

export async function triggerPublicCacheRefresh(): Promise<void> {
  try {
    const secret =
      process.env.NEXT_PUBLIC_REVALIDATION_SECRET ||
      process.env.REVALIDATION_SECRET ||
      "";
    await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "x-revalidate-secret": secret,
      },
    });
  } catch (err) {
    console.warn("Cache refresh notice:", err);
  }
}

/* ============================================================================
 * PROJECTS CRUD
 * ========================================================================== */

export type ProjectInput = Omit<ProjectData, "id">;

export async function createProject(input: ProjectInput): Promise<string> {
  const db = getAdminDb();
  const now = Date.now();
  const docRef = await addDoc(collection(db, "projects"), {
    title: input.title.trim(),
    description: input.description.trim(),
    desc: input.description.trim(), // keep legacy alias synced
    technologies: input.tech,
    tech: input.tech,
    demo: input.demo.trim(),
    demoLink: input.demo.trim(),
    code: input.code.trim(),
    codeLink: input.code.trim(),
    image: input.image?.trim() || "/images/placeholder.png",
    featured: input.featured ?? true,
    published: input.published ?? true,
    order: typeof input.order === "number" ? input.order : 0,
    createdAt: now,
    updatedAt: now,
  });
  await triggerPublicCacheRefresh();
  return docRef.id;
}

export async function updateProject(
  id: string,
  input: Partial<ProjectInput>,
): Promise<void> {
  const db = getAdminDb();
  const payload: Record<string, unknown> = {
    updatedAt: Date.now(),
  };

  if (typeof input.title === "string") payload.title = input.title.trim();
  if (typeof input.description === "string") {
    payload.description = input.description.trim();
    payload.desc = input.description.trim();
  }
  if (Array.isArray(input.tech)) {
    payload.technologies = input.tech;
    payload.tech = input.tech;
  }
  if (typeof input.demo === "string") {
    payload.demo = input.demo.trim();
    payload.demoLink = input.demo.trim();
  }
  if (typeof input.code === "string") {
    payload.code = input.code.trim();
    payload.codeLink = input.code.trim();
  }
  if (typeof input.image === "string") {
    payload.image = input.image.trim() || "/images/placeholder.png";
  }
  if (typeof input.featured === "boolean") payload.featured = input.featured;
  if (typeof input.published === "boolean") payload.published = input.published;
  if (typeof input.order === "number") payload.order = input.order;

  await updateDoc(doc(db, "projects", id), payload);
  await triggerPublicCacheRefresh();
}

export async function deleteProject(id: string): Promise<void> {
  const db = getAdminDb();
  await deleteDoc(doc(db, "projects", id));
  await triggerPublicCacheRefresh();
}

export async function reorderProjects(orderedIds: string[]): Promise<void> {
  const db = getAdminDb();
  const batch = writeBatch(db);
  orderedIds.forEach((id, index) => {
    batch.update(doc(db, "projects", id), { order: index, updatedAt: Date.now() });
  });
  await batch.commit();
  await triggerPublicCacheRefresh();
}

/* ============================================================================
 * SITE SETTINGS & CV LINK
 * ========================================================================== */

export async function saveSiteSettings(
  settings: Partial<SiteSettings>,
): Promise<void> {
  const db = getAdminDb();
  const normalized: Partial<SiteSettings> = {
    ...settings,
    updatedAt: Date.now(),
  };
  if (typeof normalized.cvUrl === "string") {
    normalized.cvUrl = normalizeDriveOrExternalUrl(normalized.cvUrl);
  }
  await setDoc(doc(db, "settings", "site"), normalized, { merge: true });
  await triggerPublicCacheRefresh();
}

/* ============================================================================
 * SOCIAL LINKS
 * ========================================================================== */

export async function saveSocialLinks(links: SocialLinkItem[]): Promise<void> {
  const db = getAdminDb();
  const normalized = links.map((item, idx) => ({
    ...item,
    order: idx,
  }));
  await setDoc(doc(db, "settings", "socials"), {
    links: normalized,
    updatedAt: Date.now(),
  });
  await triggerPublicCacheRefresh();
}

/* ============================================================================
 * SKILL CATEGORIES & TECHNOLOGIES
 * ========================================================================== */

export async function saveSkillCategory(category: SkillCategoryDoc): Promise<void> {
  const db = getAdminDb();
  await setDoc(doc(db, "skillCategories", category.id), {
    title: category.title.trim(),
    titleArabic: category.titleArabic?.trim() || "",
    order: category.order,
    skills: category.skills,
    updatedAt: Date.now(),
  });
  await triggerPublicCacheRefresh();
}

export async function deleteSkillCategory(id: string): Promise<void> {
  const db = getAdminDb();
  await deleteDoc(doc(db, "skillCategories", id));
  await triggerPublicCacheRefresh();
}

/* ============================================================================
 * CERTIFICATES
 * ========================================================================== */

export async function saveCertificate(cert: CertificateItem): Promise<void> {
  const db = getAdminDb();
  await setDoc(doc(db, "certificates", cert.id), {
    title: cert.title.trim(),
    titleArabic: cert.titleArabic?.trim() || "",
    issuer: cert.issuer.trim(),
    date: cert.date.trim(),
    description: cert.description.trim(),
    descriptionArabic: cert.descriptionArabic?.trim() || "",
    link: cert.link.trim(),
    image: cert.image.trim() || "/images/placeholder.png",
    theme: cert.theme,
    iconName: cert.iconName,
    order: cert.order,
    updatedAt: Date.now(),
  });
  await triggerPublicCacheRefresh();
}

export async function deleteCertificate(id: string): Promise<void> {
  const db = getAdminDb();
  await deleteDoc(doc(db, "certificates", id));
  await triggerPublicCacheRefresh();
}

/* ============================================================================
 * SEED / INITIALIZE DATABASE FROM STATIC DEFAULTS
 * ========================================================================== */

export async function seedPortfolioDefaultsToFirestore(): Promise<void> {
  const db = getAdminDb();
  const batch = writeBatch(db);

  // 1. Site settings
  batch.set(
    doc(db, "settings", "site"),
    { ...DEFAULT_SITE_SETTINGS, updatedAt: Date.now() },
    { merge: true },
  );

  // 2. Socials
  batch.set(
    doc(db, "settings", "socials"),
    { links: DEFAULT_SOCIAL_LINKS, updatedAt: Date.now() },
    { merge: true },
  );

  // 3. Skill categories (only if none exist yet)
  const existingSkills = await getDocs(collection(db, "skillCategories"));
  if (existingSkills.empty) {
    for (const cat of DEFAULT_SKILL_CATEGORIES) {
      batch.set(doc(db, "skillCategories", cat.id), {
        title: cat.title,
        titleArabic: cat.titleArabic || "",
        order: cat.order,
        skills: cat.skills,
        updatedAt: Date.now(),
      });
    }
  }

  // 4. Certificates (only if none exist yet)
  const existingCerts = await getDocs(collection(db, "certificates"));
  if (existingCerts.empty) {
    for (const cert of DEFAULT_CERTIFICATES) {
      batch.set(doc(db, "certificates", cert.id), {
        ...cert,
        updatedAt: Date.now(),
      });
    }
  }

  // 5. Projects (if projects collection is empty, seed initialProjects)
  const existingProjects = await getDocs(collection(db, "projects"));
  if (existingProjects.empty) {
    const { initialProjects } = await import("@/data/projects");
    initialProjects.forEach((proj, idx) => {
      batch.set(doc(db, "projects", proj.id), {
        title: proj.title,
        description: proj.description,
        desc: proj.description,
        technologies: proj.tech,
        tech: proj.tech,
        demo: proj.demo,
        demoLink: proj.demo,
        code: proj.code,
        codeLink: proj.code,
        image: proj.image || "/images/placeholder.png",
        featured: true,
        published: true,
        order: idx,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    });
  }

  await batch.commit();
  await triggerPublicCacheRefresh();
}
