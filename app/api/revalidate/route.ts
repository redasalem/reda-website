import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret =
      req.headers.get("x-revalidate-secret") ||
      req.nextUrl.searchParams.get("secret");

    const expectedSecret = process.env.REVALIDATION_SECRET;

    if (!expectedSecret || secret !== expectedSecret) {
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
