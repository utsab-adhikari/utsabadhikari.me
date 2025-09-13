// /app/api/history/route.js
import connectDB from "@/db/ConnectDB";
import Response from "@/models/responseModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const items = await Response.find({})
      .sort({ updatedAt: -1 })
      .limit(50)
      .select("title aiResponse createdAt updatedAt")
      .lean();

    return NextResponse.json({ ok: true, data: items });
  } catch (err) {
    console.error("API /api/history error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
