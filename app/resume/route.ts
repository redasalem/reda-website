import { readFile } from "node:fs/promises";
import path from "node:path";
export async function GET() {
  const content = await readFile(path.join(process.cwd(), "docs/resume-editorial.md"), "utf8");
  return new Response(content, { headers: { "Content-Type": "text/markdown; charset=utf-8", "Content-Disposition": 'attachment; filename="Reda-Salem-Resume.md"', "X-Robots-Tag": "noindex" } });
}
