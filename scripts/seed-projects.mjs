import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { readFile } from 'node:fs/promises';
import { z } from 'zod';
const [projectId, flag] = process.argv.slice(2);
if (!projectId) throw new Error('Usage: node scripts/seed-projects.mjs PROJECT_ID [--write]');
const rows = JSON.parse(await readFile(new URL('../docs/projects-import.json', import.meta.url), 'utf8'));
const schema = z.object({ id: z.string().regex(/^[a-z0-9-]+$/), title: z.string().min(3).max(100), summary: z.string().min(20).max(300), body: z.string().min(20).max(8000), category: z.string().min(2).max(60), stack: z.string().min(2).max(300), liveUrl: z.union([z.literal(''), z.url().refine(url=>url.startsWith('https://'))]), repoUrl: z.union([z.literal(''), z.url().refine(url=>url.startsWith('https://'))]), published: z.boolean(), order: z.number().int().min(0).max(999) }).strict();
const projects = z.array(schema).parse(rows);
if (flag !== '--write') { console.log(JSON.stringify({ projectId, mode: 'dry-run', projects }, null, 2)); }
else {
  initializeApp({ credential: applicationDefault(), projectId });
  const db = getFirestore();
  for (const { id, ...data } of projects) {
    try { await db.collection('projects').doc(id).create({ ...data, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() }); console.log('Created: ' + id); }
    catch(error) { if (error.code === 6) console.log('Kept existing: ' + id); else throw error; }
  }
}
