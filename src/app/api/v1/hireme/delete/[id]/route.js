import Hireme from "@/models/hiremeModel";
import connectDB from "@/db/ConnectDB";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request, {params}) {
  try {
    await connectDB();

    const { id } = await params;

    await Hireme.findByIdAndDelete({_id: id});

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Application Deleted Successully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["Server Error:", error.message],
    });
  }
}
