# Portfolio audit and replacement architecture

Audit date: 9 October 2026. Target: https://reda-website.vercel.app/

## Evidence and limitations
The live page was retrieved through web browsing and a fresh HTML request. See audit/live-source.json for the fetched metadata, headings, script URLs, timestamp, and 235,020-byte HTML response. This is uncompressed response-body size, not transferred bytes.
The repository also contains a historical deployed Lighthouse report, lh-vercel.json, dated 3 July 2026: performance 37, accessibility 96, best practices 77, SEO 100, LCP 10.1 seconds, total blocking time 2,530 ms, CLS 0. These are historical measurements, not a current audit.
Source inspection supports architectural observations; it does not by itself prove which code caused each measured delay.

## Teardown and response
| Observed flaw | Replacement |
| --- | --- |
| Metadata repeats keywords, claims PageSpeed 99, and advertises the same URL as two language variants. | Focused description, accurate job title, one canonical English page. Keep C4R's documented 95+ SEO result attributed to C4R. |
| Structured data includes unsupported business hours, salary, Cairo coordinates, search and blog routes; the code also advertises an RSS route without implementation. | Resume-grounded Person, WebSite and ProfilePage nodes, plus project CreativeWork nodes. No invented business attributes or routes. |
| Repeated side and bottom navigation, dense tool inventories, and competing hero/chat/background effects dilute the work. | One primary navigation, prominent work/contact actions, three engineering principles, restrained motion, and clear experience. |
| Old layout mounts global effects and analytics; manual vendor chunk rules compete with Next.js defaults. | Server-first page, system fonts, framework-managed bundling, lazy client-only scene, studio-only Firebase browser SDKs. |
| Existing project helper swallows fetch failures and accepts loosely shaped data. | Validated Firestore documents, published-only server reads, visible unavailable/empty states, canonical detail pages. |
| No source-visible owner-only CMS/rules test suite. | Email/password studio and custom-claim writes enforced by Firestore, with emulator allow/deny tests. |

## 3D and performance budget
Text, links, metadata, and CSS artwork render on the server. A client boundary uses next/dynamic with ssr:false and Suspense to load R3F separately. Desktop auto-load waits for idle time; small screens, reduced-motion preferences, data-saving mode, and slow connections default to static artwork with opt-in 3D. The mesh uses procedural geometry, no texture downloads or post-processing, DPR capped at 1.5, demand rendering, offscreen/tab suspension, and a context-loss/error fallback. Pointer movement eases rotation; it stops invalidating once settled.

Dynamic import does not move JavaScript or shader initialization off the main thread. It cannot guarantee 95+ Lighthouse across networks and devices. Measure a production build, including the real Firebase content and a 3D-enabled desktop pass. Do not equate the resume's C4R SEO score with performance.

## Data and publication
Firestore is the sole runtime project source. docs/projects-import.json is an optional one-time migration prepared from resume.md; the website never imports it. Missing configuration shows a truthful empty state. Public REST calls carry no privileged credentials and remain subject to Firestore rules. Published project queries are bounded to 50 entries; the CMS manages all records. Content is revalidated after 60 seconds on demand, so an unpublished/deleted formerly public page can remain in caches while revalidation completes. Drafts should never contain secrets.

## Security
A hidden URL is not security. Every project write requires a signed Firebase admin claim, schema validation, and server timestamps. Public readers cannot list drafts. The studio is noindex and absent from public navigation and sitemap. No client can assign its own claims. Administrative provisioning uses local Application Default Credentials; no service-account key is shipped to the browser. Session persistence is tab scoped. Revoking a claim does not instantly invalidate already issued ID tokens; see FIREBASE-SETUP.md.

## Sources
- Next.js lazy loading: https://nextjs.org/docs/app/guides/lazy-loading
- R3F demand rendering: https://r3f.docs.pmnd.rs/advanced/scaling-performance
- Firebase custom claims: https://firebase.google.com/docs/auth/admin/custom-claims
- Local factual source: ../resume.md
