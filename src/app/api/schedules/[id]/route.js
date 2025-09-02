
import { NextResponse } from "next/server";
import connectDB from "@/db/ConnectDB";
import { getServerSession } from "next-auth/next";
import Schedule from "@/models/scheduleModule";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } =await params;

    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(schedule, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

// app/api/schedules/[id]/route.js
export async function PUT(request, { params }) {
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

    const { id } = await params;
    const { title, description, content } = await request.json();
    
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      id,
      { title, description, content: content || [] },
      { new: true, runValidators: true }
    );

    if (!updatedSchedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedSchedule, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

// app/api/schedules/[id]/route.js
export async function DELETE(request, { params }) {
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

    const { id } = await params;
    const deletedSchedule = await Schedule.findByIdAndDelete(id);

    if (!deletedSchedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Schedule deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
