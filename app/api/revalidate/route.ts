import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  try {
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
