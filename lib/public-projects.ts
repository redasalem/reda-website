import "server-only";
import { cache } from "react";
import { projectSchema, type Project } from "./project-schema";

type FirestoreValue = { stringValue?: string; booleanValue?: boolean; integerValue?: string };
type Document = { name: string; fields: Record<string, FirestoreValue> };
function decode(document: Document): Project | null {
  // Reject document IDs outside the public route alphabet before any further work.
  const id = document.name.split("/").pop() ?? "";
  if (!/^[a-zA-Z0-9_-]{1,128}$/.test(id)) return null;
  // Build a null-prototype record so a hostile field named __proto__ can never
  // mutate the decoded object's prototype during Object.fromEntries.
  const values: Record<string, unknown> = Object.assign(Object.create(null), Object.fromEntries(Object.entries(document.fields || {}).filter(([key]) => !["createdAt", "updatedAt", "__proto__", "constructor", "prototype"].includes(key)).map(([key, value]) => [key, value.stringValue ?? value.booleanValue ?? (value.integerValue !== undefined ? Number(value.integerValue) : null)])));
  const parsed = projectSchema.safeParse(values);
  return parsed.success && parsed.data.published ? { ...parsed.data, id } : null;
}

function endpoint() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return null;
  // Public REST reads use Firestore rules, with no Admin SDK or privileged credentials.
  return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents`;
}

export const getPublishedProjects = cache(async (): Promise<Project[]> => {
  const base = endpoint();
  if (!base) return [];
  const response = await fetch(`${base}:runQuery`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ structuredQuery: { from: [{ collectionId: "projects" }], where: { fieldFilter: { field: { fieldPath: "published" }, op: "EQUAL", value: { booleanValue: true } } }, orderBy: [{ field: { fieldPath: "order" }, direction: "ASCENDING" }], limit: 50 } }),
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`Project service returned ${response.status}`);
  const rows: { document?: Document }[] = await response.json();
  return rows.flatMap(row => { const project = row.document && decode(row.document); return project ? [project] : []; });
});

export const getPublishedProject = cache(async (id: string): Promise<Project | null> => {
  if (!/^[a-zA-Z0-9_-]{1,128}$/.test(id)) return null;
  const base = endpoint();
  if (!base) return null;
  const response = await fetch(`${base}/projects/${encodeURIComponent(id)}`, { signal: AbortSignal.timeout(5000) });
  if ([403, 404].includes(response.status)) return null;
  if (!response.ok) throw new Error(`Project service returned ${response.status}`);
  return decode(await response.json());
});
