import { NextResponse } from "next/server";
import connectDB from "@/db/ConnectDB";
import Video from "@/models/videoModel";
import fs from "fs";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const video = await Video.findById(id);
    if (!video) return NextResponse.json({ error: "Video not found" }, { status: 404 });

    // Delete the file from disk
    if (fs.existsSync(video.filePath)) fs.unlinkSync(video.filePath);

    // Remove from DB
    await Video.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
