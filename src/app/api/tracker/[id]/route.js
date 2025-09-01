import connectDB from "@/db/ConnectDB";
import Tracker from "@/models/trackerModel";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const doc = await Tracker.findById(id);
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(doc, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await req.json();
    const updated = await Tracker.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json(updated, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    await Tracker.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
