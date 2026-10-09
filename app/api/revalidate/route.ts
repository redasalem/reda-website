import "server-only";
import { revalidatePath, revalidateTag } from "next/cache";
import { getApps, initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function getAdminAuth() {
  if (getApps().length === 0) {
    // Vercel serverless has no Application Default Credentials — prefer explicit
    // service-account env vars when present, fall back to ADC for local/GCP.
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (projectId && clientEmail && privateKey) {
      initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
    } else {
      initializeApp({ credential: applicationDefault() });
    }
  }
  return getAuth();
}

async function requireAdmin(request: Request): Promise<"ok" | "unauthenticated" | "forbidden"> {
  const header = request.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return "unauthenticated";
  try {
    const decoded = await getAdminAuth().verifyIdToken(token, true);
    return decoded.admin === true ? "ok" : "forbidden";
  } catch {
    return "unauthenticated";
  }
}

export async function POST(request: Request) {
  const verdict = await requireAdmin(request);
  if (verdict === "forbidden") {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }
  if (verdict !== "ok") {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  let id: string | undefined;
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      const body = (await request.json()) as { id?: unknown };
      if (typeof body.id === "string" && /^[a-zA-Z0-9_-]{1,128}$/.test(body.id)) {
        id = body.id;
      }
    } catch {
      id = undefined;
    }
  }

  revalidateTag("projects", "max");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/download");
  if (id) {
    revalidatePath(`/work/${id}`);
    revalidatePath(`/work/${id}/opengraph-image`);
  }
  return Response.json({ revalidated: true });
}
