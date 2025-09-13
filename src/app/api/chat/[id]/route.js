// /app/api/chat/[id]/route.js
import connectDB from "@/db/ConnectDB";
import Conversation from "@/models/conversationModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    
    await connectDB();
    const conversation = await Conversation.findById(id);
    
    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, data: conversation });
  } catch (err) {
    console.error("API /api/chat/[id] error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    
    await connectDB();
    const conversation = await Conversation.findByIdAndDelete(id);
    
    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      ok: true, 
      message: "Conversation deleted successfully" 
    });
  } catch (err) {
    console.error("API /api/chat/[id] error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" }, 
      { status: 500 }
    );
  }
}