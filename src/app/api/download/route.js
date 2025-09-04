import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import connectDB from "@/db/ConnectDB";
import Video from "@/models/videoModel";
import { getVideoInfo, downloadAudio } from "@/lib/yt-dlp";

// Use serverless-compatible directory
const SAVE_DIR = path.join("/tmp", "Music");
if (!fs.existsSync(SAVE_DIR)) fs.mkdirSync(SAVE_DIR, { recursive: true });

export async function POST(req) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "No URL provided" }, { status: 400 });

    // Get video info
    const info = await getVideoInfo(url);
    const titleSafe = info.title.replace(/[<>:"/\\|?*]+/g, "");
    const mp3Path = path.join(SAVE_DIR, `${titleSafe}.mp3`);

    // Download MP3 (pure Node)
    await downloadAudio(url, mp3Path);

    // Save metadata to MongoDB
    await connectDB();
    const video = await Video.create({
      title: info.title,
      thumbnail: info.thumbnail,
      url,
      filePath: mp3Path,
      added: new Date(),
    });

    return NextResponse.json({ success: true, video, path: mp3Path });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const videos = await Video.find().sort({ added: -1 });
    return NextResponse.json({ success: true, videos });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
