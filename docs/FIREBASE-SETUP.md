# Firebase setup and security

The production project is not provisioned by this code change. The repository contains no service-account credentials. Use a separate Firebase project for staging if the existing portfolio database contains other collections: the supplied rules deny access outside projects.

1. In the Firebase console, create a Firestore database and register a web app. Enable Authentication → Email/Password. Add the deployment host to Authorized domains and create your owner account manually. There is no public signup screen.
2. Copy .env.example to .env.local. Fill the four NEXT_PUBLIC_FIREBASE values from the web app configuration; set NEXT_PUBLIC_SITE_URL to the canonical HTTPS origin without a trailing slash. These Firebase web configuration values are public identifiers, not privileged credentials. Set the same values in Vercel before building.
3. Authenticate the Firebase CLI: npx firebase login. Deploy the reviewed rules and index to the intended project: npx firebase deploy --only firestore:rules,firestore:indexes --project YOUR_PROJECT_ID. Wait until the composite index is ready. This ruleset deliberately replaces permissive project writes; back up and review existing rules first.
4. Set up Application Default Credentials locally using gcloud auth application-default login, or point GOOGLE_APPLICATION_CREDENTIALS to a service-account JSON outside the repository. The identity needs permission to manage Auth users and, for importing, Firestore documents.
5. Copy the owner's UID from Firebase Authentication. Run node scripts/set-admin.mjs YOUR_PROJECT_ID OWNER_UID grant. This preserves unrelated claims. Sign out and sign in again to receive the new claim.
6. Open /secret-admin-studio directly. Create/edit projects, save drafts, publish, set display order, and delete with confirmation. No public login links are rendered. Ordinary Firebase users have no write privileges.
7. Optional: inspect docs/projects-import.json, containing only resume-backed case studies. Preview with node scripts/seed-projects.mjs YOUR_PROJECT_ID; add --write to import. Existing documents with the same IDs are preserved. The website reads Firestore at runtime and never imports this file.

## Data contract
Each projects document has title (3–100), summary (20–300), body (20–8000, plain text), category (2–60), stack (2–300, comma separated), liveUrl/repoUrl (empty or HTTPS, max 500), published (boolean), order (integer 0–999), createdAt and updatedAt (Firestore timestamps).
The new schema is intentional. Back up old documents using desc/technologies/demo/code fields and migrate them to this contract. Do not automatically publish old documents. Initial missing configuration shows a working portfolio with an honest empty projects state.

Public queries require published == true and limit <= 50. The server fetches through the public REST API, so Firestore rules apply. Admin-only browser SDK mutations use serverTimestamp, and rules reject unexpected fields, invalid values, changed creation times, and client-assigned update times. Other collections deny all access.

## Revocation and cache behavior
Run node scripts/set-admin.mjs YOUR_PROJECT_ID OWNER_UID revoke to remove the claim and revoke refresh tokens. An already-issued Firebase ID token may remain valid until expiration (typically up to one hour); Firestore does not automatically consult Admin SDK token revocation for every request. For urgent lockout, change the rules to remove write access, then restore them after tokens expire.
Public pages and OG images revalidate on demand after 60 seconds. Stale-while-revalidate behavior, errors, and external social crawlers may retain previously public content longer; publishing/unpublishing is not a secrets-management mechanism. Never put secrets in project descriptions.

## Verification
- npm test: Jest / React Testing Library, input validation, fallback and rendering contracts.
- npm run test:rules: starts an isolated demo Firestore emulator and executes allow/deny tests against the actual CRUD helpers. Requires a Java version supported by the installed Firebase CLI (Java 21 recommended). Tests refuse to run without FIRESTORE_EMULATOR_HOST.
- npm run typecheck and npm run build.
- npm run test:e2e: production browser tests, including real WebGL and context-loss recovery. Chrome must be installed; CI installs it explicitly.
- npm run audit:performance -- http://127.0.0.1:3100 redesign: writes mobile and desktop Lighthouse reports and compact metrics under docs/audit.
No live Firebase rules, project records, admin privileges, or Vercel deployment are changed by running the unit tests or build.
