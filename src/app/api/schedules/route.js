
import { NextResponse } from "next/server";
import connectDB from "@/db/ConnectDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import Schedule from "@/models/scheduleModule";

export async function GET() {
  try {
    await connectDB();
    
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 401 }
      );
    }

    const schedules = await Schedule.find().sort({ createdAt: -1 });
    return NextResponse.json(schedules, { status: 200 });
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

    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 401 }
      );
    }

    const { title, description, content } = await request.json();
    
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const newSchedule = new Schedule({
      title,
      description,
      content: content || [],
    });

    const savedSchedule = await newSchedule.save();
    return NextResponse.json(savedSchedule, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}