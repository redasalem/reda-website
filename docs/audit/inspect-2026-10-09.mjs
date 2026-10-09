import fs from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://127.0.0.1:3100';
const label = process.argv[3] || 'local-2026-10-09';
const out = 'docs/audit';
await fs.mkdir(out, { recursive: true });
const result = { base, fetchedAt: new Date().toISOString(), routes: [], views: [], interactions: {} };
for (const route of ['/', '/robots.txt', '/sitemap.xml', '/secret-admin-studio', '/api/revalidate', '/download', '/opengraph-image', '/work/audit-missing-project']) {
  try {
    const response = await fetch(base + route, { signal: AbortSignal.timeout(20000) });
    const bytes = Buffer.from(await response.arrayBuffer());
    const html = bytes.toString('utf8');
    result.routes.push({ route, status: response.status, headers: Object.fromEntries(response.headers), bytes: bytes.length,
      ...(response.headers.get('content-type')?.includes('text/html') ? {
        title: html.match(/<title>(.*?)<\/title>/)?.[1], newDesign: html.includes('Thoughtful interfaces'),
        robots: [...html.matchAll(/<meta name="robots" content="([^"]*)"/g)].map(m => m[1]),
        canonical: html.match(/<link rel="canonical" href="([^"]*)"/)?.[1],
        schemas: [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(m => JSON.parse(m[1])),
        metadata: [...html.matchAll(/<meta (?:property|name)="((?:og:|twitter:)[^"]*)" content="([^"]*)"/g)].map(m => ({ name: m[1], content: m[2] }))
      } : route.endsWith('.txt') || route.endsWith('.xml') ? { body: html } : {})
    });
  } catch (error) { result.routes.push({ route, error: error.message }); }
}
if (base.startsWith('http://127.0.0.1')) {
  const response = await fetch(base + '/api/revalidate', { method: 'POST' });
  result.unauthenticatedPost = { status: response.status, body: await response.text() };
  const manifest = JSON.parse(await fs.readFile('.next/prerender-manifest.json', 'utf8'));
  result.prerender = { routes: manifest.routes, dynamicRoutes: manifest.dynamicRoutes };
}
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-unsafe-swiftshader'] });
try {
  for (const width of [320, 390, 768, 900, 1024, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2200);
    await page.screenshot({ path: `${out}/${label}-${width}.png`, fullPage: true });
    const metrics = await page.evaluate(() => {
      const box = el => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right }; };
      return { viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth, h1: document.querySelector('h1')?.textContent,
        canvasCount: document.querySelectorAll('canvas').length, fallbackCount: document.querySelectorAll('[data-testid="static-sculpture"]').length,
        heroCopy: box(document.querySelector('.hero-copy')), heroArt: box(document.querySelector('.hero-art')),
        overflowing: [...document.querySelectorAll('body *')].filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1); }).slice(0, 15).map(el => ({ tag: el.tagName, class: String(el.className), box: box(el) })),
        scripts: performance.getEntriesByType('resource').filter(e => e.initiatorType === 'script').map(e => ({ name: e.name.replace(location.origin, ''), transfer: e.transferSize, decoded: e.decodedBodySize })),
        tinyLinks: [...document.querySelectorAll('a,button')].filter(el => el.getBoundingClientRect().width > 0).map(el => ({ text: el.textContent?.trim().slice(0, 60), ...box(el), font: getComputedStyle(el).fontSize })).filter(el => el.height < 24)
      };
    });
    result.views.push({ width, ...metrics, errors });
    await context.close();
  }
  if (result.routes[0]?.newDesign) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await context.addInitScript(() => {
      window.__draws = 0;
      for (const prototype of [window.WebGLRenderingContext?.prototype, window.WebGL2RenderingContext?.prototype]) {
        if (!prototype) continue;
        for (const name of ['drawElements', 'drawArrays']) {
          const original = prototype[name];
          prototype[name] = function(...args) { window.__draws++; return original.apply(this, args); };
        }
      }
    });
    const page = await context.newPage();
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);
    const count = () => page.evaluate(() => window.__draws);
    const delta = async () => { const start = await count(); await page.waitForTimeout(1000); return (await count()) - start; };
    result.interactions.idleDrawsPerSecond = await delta();
    await page.mouse.move(1000, 350);
    result.interactions.pointerDrawsNextSecond = await delta();
    await page.waitForTimeout(3000);
    result.interactions.settledDrawsPerSecond = await delta();
    await page.getByRole('button', { name: /Pause 3D/ }).click();
    result.interactions.pausedDrawsPerSecond = await delta();
    await page.getByRole('button', { name: /Resume 3D/ }).click();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(500);
    result.interactions.canvasAfterResizeTo390 = await page.locator('canvas').count();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
    result.interactions.offscreenDrawsPerSecond = await delta();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    result.interactions.realContextLossSupported = await page.locator('canvas').evaluate(canvas => {
      const gl = canvas.getContext('webgl2'); const extension = gl?.getExtension('WEBGL_lose_context'); extension?.loseContext(); return !!extension;
    });
    await page.waitForTimeout(800);
    result.interactions.afterContextLoss = { canvas: await page.locator('canvas').count(), fallback: await page.getByTestId('static-sculpture').count() };
    await page.getByRole('button', { name: /Explore in 3D/ }).click();
    await page.waitForTimeout(1500);
    result.interactions.afterRetry = { canvas: await page.locator('canvas').count(), fallback: await page.getByTestId('static-sculpture').count() };
    await context.close();
    for (const scenario of ['initial-reduced', 'reduce-during-delay', 'save-data', '2g']) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: scenario === 'initial-reduced' ? 'reduce' : 'no-preference' });
      if (['save-data', '2g'].includes(scenario)) await ctx.addInitScript(s => Object.defineProperty(navigator, 'connection', { value: { saveData: s === 'save-data', effectiveType: s === '2g' ? '2g' : '4g' } }), scenario);
      const p = await ctx.newPage();
      await p.goto(base, { waitUntil: 'domcontentloaded' });
      if (scenario === 'reduce-during-delay') { await p.waitForTimeout(200); await p.emulateMedia({ reducedMotion: 'reduce' }); }
      await p.waitForTimeout(2600);
      result.interactions[scenario] = { canvas: await p.locator('canvas').count(), fallback: await p.getByTestId('static-sculpture').count() };
      await ctx.close();
    }
  }
} catch (error) { result.browserError = error.stack; }
finally { await browser.close(); }
await fs.writeFile(`${out}/${label}.json`, JSON.stringify(result, null, 2));
console.log(JSON.stringify({ output: `${out}/${label}.json`, routes: result.routes.map(({ route, status, error, newDesign }) => ({ route, status, error, newDesign })), views: result.views.map(({ width, scrollWidth, canvasCount, errors }) => ({ width, scrollWidth, canvasCount, errors })), interactions: result.interactions, browserError: result.browserError }, null, 2));
