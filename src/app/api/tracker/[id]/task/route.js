import connectDB from "@/db/ConnectDB";
import Tracker from "@/models/trackerModel";
import { NextResponse } from "next/server";

// Add task: body { name, notes }
export async function POST(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const { name, notes = "" } = await req.json();
    const doc = await Tracker.findById(id);
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    doc.tasks.push({ name, notes });
    await doc.save();
    return NextResponse.json(doc, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const { index, patch } = await req.json();
    const doc = await Tracker.findById(id);
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (index < 0 || index >= doc.tasks.length)
      return NextResponse.json({ error: "Bad index" }, { status: 400 });
    doc.tasks[index] = { ...doc.tasks[index].toObject(), ...patch };
    await doc.save();
    return NextResponse.json(doc, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Delete task: body { index }
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const { index } = await req.json();
    const doc = await Tracker.findById(id);
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (index < 0 || index >= doc.tasks.length)
      return NextResponse.json({ error: "Bad index" }, { status: 400 });
    doc.tasks.splice(index, 1);
    await doc.save();
    return NextResponse.json(doc, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
