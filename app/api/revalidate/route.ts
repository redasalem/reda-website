import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

async function verifyAdminFirebaseToken(idToken: string): Promise<boolean> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const adminEmail = (
    process.env.NEXT_PUBLIC_ADMIN_EMAIL || "redasalem287@gmail.com"
  )
    .trim()
    .toLowerCase();

  if (!apiKey || !idToken) {
    return false;
  }

  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return false;
    }

    const data = (await res.json()) as {
      users?: Array<{ email?: string; emailVerified?: boolean }>;
    };
    const user = data.users?.[0];
    return (
      Boolean(user?.emailVerified) &&
      (user?.email || "").trim().toLowerCase() === adminEmail
    );
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const secret =
      req.headers.get("x-revalidate-secret") ||
      req.nextUrl.searchParams.get("secret");
    const expectedSecret = process.env.REVALIDATION_SECRET;
    const hasValidSecret = Boolean(expectedSecret && secret === expectedSecret);

    const authHeader = req.headers.get("authorization") || "";
    const bearerToken = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : "";
    const hasValidAdminToken = bearerToken
      ? await verifyAdminFirebaseToken(bearerToken)
      : false;

    if (!hasValidSecret && !hasValidAdminToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/ar");
    revalidatePath("/download");
    revalidatePath("/ar/download");

    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
  } catch (error) {
    console.error("Error revalidating paths:", error);
    return NextResponse.json(
      { revalidated: false, error: "Failed to revalidate" },
      { status: 500 },
    );
  }
}
