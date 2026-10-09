import { z } from "zod";

const secureUrl = z.string().max(500).refine(value => {
  if (value === "") return true;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}, "Use a complete HTTPS URL or leave this field empty.");

export const projectSchema = z.object({
  title: z.string().trim().min(3).max(100),
  summary: z.string().trim().min(20).max(300),
  body: z.string().trim().min(20).max(8000),
  category: z.string().trim().min(2).max(60),
  stack: z.string().trim().min(2).max(300),
  liveUrl: secureUrl,
  repoUrl: secureUrl,
  published: z.boolean(),
  order: z.number().int().min(0).max(999),
}).strict();

export type ProjectInput = z.infer<typeof projectSchema>;
export type Project = ProjectInput & { id: string };
export const emptyProject: ProjectInput = {
  title: "", summary: "", body: "", category: "", stack: "", liveUrl: "", repoUrl: "", published: false, order: 0,
};
