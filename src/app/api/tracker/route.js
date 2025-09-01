import connectDB from "@/db/ConnectDB";
import Tracker from "@/models/trackerModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const trackers = await Tracker.find().sort({ createdAt: -1 });
    return NextResponse.json(trackers, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const doc = await Tracker.create(body);
    return NextResponse.json(doc, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
