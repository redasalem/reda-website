import { getPublishedProject, getPublishedProjects } from "@/lib/public-projects";
const valid = { title: { stringValue: "Secure booking platform" }, summary: { stringValue: "A secure platform for rental bookings." }, body: { stringValue: "A complete and validated booking workflow." }, category: { stringValue: "Booking" }, stack: { stringValue: "Next.js, Node.js" }, liveUrl: { stringValue: "" }, repoUrl: { stringValue: "" }, order: { integerValue: "0" }, published: { booleanValue: true } };
const originalId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const originalFetch = global.fetch;
beforeEach(() => { process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = "demo-test"; global.fetch = jest.fn(); });
afterEach(() => { global.fetch = originalFetch; if (originalId === undefined) delete process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID; else process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = originalId; });
test("public list is constrained and sends no privileged Authorization header", async () => {
  (fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => [{ document: { name: "projects/demo/databases/(default)/documents/projects/c4r", fields: valid } }] });
  const projects = await getPublishedProjects();
  expect(projects[0].id).toBe("c4r");
  const options = (fetch as jest.Mock).mock.calls[0][1];
  const query = JSON.parse(options.body).structuredQuery;
  expect(query.where.fieldFilter).toEqual({ field: { fieldPath: "published" }, op: "EQUAL", value: { booleanValue: true } });
  expect(query.limit).toBe(50);
  expect(options.headers.Authorization).toBeUndefined();
});
test("private document data cannot escape even if upstream returns it", async () => {
  (fetch as jest.Mock).mockResolvedValue({ ok: true, status: 200, json: async () => ({ name: "projects/draft", fields: { ...valid, published: { booleanValue: false } } }) });
  expect(await getPublishedProject("draft")).toBeNull();
});
test("invalid ids never initiate a request", async () => {
  expect(await getPublishedProject("../private")).toBeNull();
  expect(fetch).not.toHaveBeenCalled();
});
test("service errors propagate instead of masquerading as an empty collection", async () => {
  (fetch as jest.Mock).mockResolvedValue({ ok: false, status: 503 });
  await expect(getPublishedProjects()).rejects.toThrow("503");
});
