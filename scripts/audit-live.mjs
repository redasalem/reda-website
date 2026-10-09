import fs from 'node:fs/promises';

await fs.mkdir('docs/audit', { recursive: true });
const url = 'https://reda-website.vercel.app/';
const response = await fetch(url);
const html = await response.text();
const tags = [...html.matchAll(/<(?:title|meta|link|h[1-3])\b[^>]*>(?:[^<]*<\/title>|[^<]*<\/h[1-3]>)?/gi)].map(m => m[0]);
const scripts = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m => m[1]);
const result = { fetchedAt: new Date().toISOString(), url, status: response.status, htmlBytes: Buffer.byteLength(html), tags, scripts };
await fs.writeFile('docs/audit/live-source.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
for (const path of ['lighthouse.json', 'lh-vercel.json']) {
  const x = JSON.parse(await fs.readFile(path, 'utf8'));
  console.log(path, JSON.stringify({time:x.fetchTime,url:x.finalDisplayedUrl,categories:Object.fromEntries(Object.entries(x.categories||{}).map(([k,v])=>[k,v.score])),metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift'].map(k=>[k,x.audits?.[k]?.displayValue]))}));
}
