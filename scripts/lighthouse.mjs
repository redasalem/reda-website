import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import fs from 'node:fs/promises';
const url = process.argv[2] || 'http://127.0.0.1:3100';
const label = (process.argv[3] || 'redesign').replace(/[^a-z0-9-]/gi, '');
await fs.mkdir('docs/audit', { recursive: true });
const chrome = await launch({ chromeFlags: ['--headless', '--enable-unsafe-swiftshader'] });
try {
  for (const mode of ['mobile', 'desktop']) {
    const result = await lighthouse(url, { port: chrome.port, output: 'html', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], ...(mode === 'desktop' ? { preset: 'desktop' } : {}) });
    if (!result) throw new Error('Lighthouse did not return a report.');
    const { lhr } = result;
    const summary = { url: lhr.finalDisplayedUrl, time: lhr.fetchTime, mode, categories: Object.fromEntries(Object.entries(lhr.categories).map(([key,value])=>[key,Math.round((value.score || 0)*100)])), metrics: Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'].map(key=>[key,lhr.audits[key].displayValue])), failures: Object.values(lhr.audits).filter(a=>a.score !== null && a.score < 0.9).map(a=>({id:a.id,title:a.title,value:a.displayValue})) };
    await fs.writeFile('docs/audit/'+label+'-'+mode+'.json', JSON.stringify(summary,null,2));
    await fs.writeFile('docs/audit/'+label+'-'+mode+'.html', String(result.report));
    console.log(JSON.stringify(summary));
  }
} finally { await chrome.kill(); }
