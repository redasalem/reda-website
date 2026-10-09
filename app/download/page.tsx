import Link from "next/link";
import { readFile } from "node:fs/promises";
import path from "node:path";
export default async function ResumePage() {
  const markdown = await readFile(path.join(process.cwd(), "docs/resume-editorial.md"), "utf8");
  const lines = markdown.split("\n");
  return <main id="main-content" className="case-study"><Link className="text-link" href="/">← Portfolio</Link><article className="resume-document">{lines.map((line, index) => {
    if (line.startsWith("# ")) return <h1 key={index}>{line.slice(2)}</h1>;
    if (line.startsWith("## ")) return <h2 className="mt-12 mb-5" key={index}>{line.slice(3)}</h2>;
    if (line.startsWith("### ")) return <h3 className="mt-8 mb-3 text-xl font-medium" key={index}>{line.slice(4)}</h3>;
    if (!line.trim()) return null;
    return <p className="my-3 leading-8" key={index}>{line.replace(/^[-*] /, "")}</p>;
  })}</article><a className="text-link mt-8" href="/resume" download>Download as Markdown ↓</a></main>;
}
