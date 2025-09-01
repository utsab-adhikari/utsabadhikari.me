import connectDB from "@/db/ConnectDB";
import Hireme from "@/models/hiremeModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    const apps = await Hireme.find({});

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Applications Loaded Successully",
      apps,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["Server Error:", error.message],
    });
  }
}
