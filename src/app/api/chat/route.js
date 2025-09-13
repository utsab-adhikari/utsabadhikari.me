// /app/api/chat/route.js
import connectDB from "@/db/ConnectDB";
import Conversation from "@/models/conversationModel";
import { NextResponse } from "next/server";
import systemInstruction from "@/db/instruction";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(req) {
  try {
    const body = await req.json();
    const { conversationId, title = "New Conversation", messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages array required" }, 
        { status: 400 }
      );
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "Server: OPENROUTER_API_KEY not set" }, 
        { status: 500 }
      );
    }

    // Add system instruction to messages
    const messagesWithInstruction = [
      { role: "system", content: systemInstruction },
      ...messages
    ];

    const orReq = {
      model: "openai/gpt-4o-mini",
      messages: messagesWithInstruction,
      max_tokens: 1024,
      temperature: 0.2,
    };

    const orRes = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify(orReq),
    });

    if (!orRes.ok) {
      const text = await orRes.text();
      return NextResponse.json(
        { error: "OpenRouter error", detail: text }, 
        { status: 502 }
      );
    }

    const orJson = await orRes.json();

    let aiMessage = "";
    try {
      if (orJson?.choices && orJson.choices[0]?.message?.content) {
        aiMessage = orJson.choices[0].message.content;
      } else {
        aiMessage = JSON.stringify(orJson);
      }
    } catch (e) {
      aiMessage = JSON.stringify(orJson);
    }

    await connectDB();

    // Add AI response to messages
    const allMessages = [
      ...messages,
      { role: "assistant", content: aiMessage }
    ];

    let conversation;
    if (conversationId) {
      // Update existing conversation
      conversation = await Conversation.findByIdAndUpdate(
        conversationId,
        {
          title,
          messages: allMessages,
          updatedAt: Date.now(),
          "metadata.model": orReq.model,
          "metadata.temperature": orReq.temperature,
          "metadata.maxTokens": orReq.max_tokens
        },
        { new: true }
      );
    } else {
      // Create new conversation
      conversation = await Conversation.create({
        title,
        messages: allMessages,
        metadata: {
          model: orReq.model,
          temperature: orReq.temperature,
          maxTokens: orReq.max_tokens,
          openrouter: orJson
        }
      });
    }

    return NextResponse.json({ 
      ok: true, 
      data: conversation,
      aiResponse: aiMessage
    });
  } catch (err) {
    console.error("API /api/chat error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" }, 
      { status: 500 }
    );
  }
}

// Get all conversations
export async function GET() {
  try {
    await connectDB();
    const conversations = await Conversation.find({})
      .sort({ updatedAt: -1 })
      .select("title createdAt updatedAt")
      .limit(50)
      .lean();

    return NextResponse.json({ ok: true, data: conversations });
  } catch (err) {
    console.error("API /api/chat error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" }, 
      { status: 500 }
    );
  }
}