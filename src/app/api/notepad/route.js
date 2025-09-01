// app/api/notepad/route.js
import { NextResponse } from "next/server";
import connectDB from "@/db/ConnectDB";
import NotePad from "@/models/notepadModel";

export async function GET() {
  try {
    await connectDB();
    const notes = await NotePad.find().sort({ createdAt: -1 });
    return NextResponse.json(notes, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { title, description, clipboard } = await request.json();
    
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const newNote = new NotePad({
      title,
      description,
      clipboard: clipboard || "",
    });

    const savedNote = await newNote.save();
    return NextResponse.json(savedNote, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}