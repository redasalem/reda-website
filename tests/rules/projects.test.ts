import { readFileSync } from "node:fs";
import { initializeTestEnvironment, assertFails, assertSucceeds, type RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { collection, doc, getDoc, getDocs, query, limit, where, orderBy, setDoc, updateDoc, deleteDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { saveProject, removeProject } from "@/lib/project-mutations";
type TestDb = Parameters<typeof saveProject>[0];
function asTestDb(db: unknown): TestDb {
  return db as TestDb;
}
const data = { title: "Secure booking platform", summary: "A validated platform for rental booking.", body: "Secure sessions, validated pricing, and role-based access.", category: "Full-stack", stack: "Next.js, Node.js", liveUrl: "https://example.com", repoUrl: "", published: true, order: 0 };
let env: RulesTestEnvironment;
beforeAll(async () => {
  if (!process.env.FIRESTORE_EMULATOR_HOST) throw new Error("Run npm run test:rules; these tests never connect to production.");
  env = await initializeTestEnvironment({ projectId: "demo-reda-portfolio", firestore: { rules: readFileSync("firestore.rules", "utf8") } });
});
beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async context => {
    const db = context.firestore();
    for (const [id, published] of [["public", true], ["draft", false]] as const) await setDoc(doc(db, "projects", id), { ...data, published, createdAt: Timestamp.now(), updatedAt: Timestamp.now() });
  });
});
afterAll(async () => { await env?.cleanup(); });
test("anonymous users can read published content but cannot read drafts or unfiltered lists", async () => {
  const db = env.unauthenticatedContext().firestore();
  await assertSucceeds(getDoc(doc(db, "projects", "public")));
  await assertFails(getDoc(doc(db, "projects", "draft")));
  await assertSucceeds(getDocs(query(collection(db, "projects"), where("published", "==", true), orderBy("order"), limit(50))));
  await assertFails(getDocs(collection(db, "projects")));
  await assertFails(getDocs(query(collection(db, "projects"), where("published", "==", true), limit(51))));
});
test.each(["anonymous", "ordinary"])("%s cannot create, update, delete, or grant privileges", async identity => {
  const db = identity === "anonymous" ? env.unauthenticatedContext().firestore() : env.authenticatedContext("ordinary").firestore();
  await assertFails(saveProject(asTestDb(db), data));
  await assertFails(updateDoc(doc(db, "projects", "public"), { title: "Hijacked project", updatedAt: serverTimestamp() }));
  await assertFails(deleteDoc(doc(db, "projects", "public")));
  await assertFails(setDoc(doc(db, "admins", "ordinary"), { admin: true }));
});
test("real CRUD helpers work for an admin, including private drafts", async () => {
  const db = env.authenticatedContext("owner", { admin: true }).firestore();
  const id = await assertSucceeds(saveProject(asTestDb(db), { ...data, published: false }));
  expect((await assertSucceeds(getDoc(doc(db, "projects", id)))).data()?.published).toBe(false);
  await assertSucceeds(saveProject(asTestDb(db), { ...data, title: "Updated booking platform" }, id));
  expect((await getDoc(doc(db, "projects", id))).data()?.title).toBe("Updated booking platform");
  await assertSucceeds(removeProject(asTestDb(db), id));
  expect((await getDoc(doc(db, "projects", id))).exists()).toBe(false);
});
test.each([{ liveUrl: "javascript:alert(1)" }, { order: -1 }, { admin: true }, { published: "yes" }, { title: "x" }, { body: "x".repeat(8001) }, { updatedAt: Timestamp.fromMillis(0) }, { __proto__: { admin: true } }, { constructor: { prototype: { admin: true } } }])("rules independently reject malformed admin writes %j", async mutation => {
  const db = env.authenticatedContext("owner", { admin: true }).firestore();
  await assertFails(updateDoc(doc(db, "projects", "public"), { ...mutation, ...(Object.hasOwn(mutation, "updatedAt") ? {} : { updatedAt: serverTimestamp() }) }));
});
test("creation timestamps are immutable, and unrelated collections deny admins too", async () => {
  const db = env.authenticatedContext("owner", { admin: true }).firestore();
  await assertFails(updateDoc(doc(db, "projects", "public"), { createdAt: Timestamp.fromMillis(0), updatedAt: serverTimestamp() }));
  await assertFails(setDoc(doc(db, "settings", "private"), { value: "x" }));
});
