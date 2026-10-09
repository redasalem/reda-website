import { projectSchema } from "@/lib/project-schema";
import { jsonLd } from "@/lib/site";
const valid = { title: "Booking platform", summary: "A secure full-stack booking platform.", body: "Validated pricing and secure booking management.", category: "Full-stack", stack: "Next.js, Node.js", liveUrl: "https://example.com", repoUrl: "", published: false, order: 1 };
test("accepts a valid draft with an optional missing repository", () => expect(projectSchema.parse(valid)).toEqual(valid));
test.each(["javascript:alert(1)", "http://example.com", "data:text/html,x", "not-a-url"])("rejects unsafe URL %s", liveUrl => {
  expect(projectSchema.safeParse({ ...valid, liveUrl }).success).toBe(false);
});
test.each([{ title: "x" }, { summary: "" }, { order: -1 }, { order: 1.5 }, { published: "true" }, { admin: true }])("rejects malformed project %j", mutation => expect(projectSchema.safeParse({ ...valid, ...mutation }).success).toBe(false));
test("JSON-LD cannot close its script element", () => {
  const value = { title: "</script><script>alert(1)</script>" };
  const encoded = jsonLd(value);
  expect(encoded).not.toContain("<");
  expect(JSON.parse(encoded)).toEqual(value);
});
