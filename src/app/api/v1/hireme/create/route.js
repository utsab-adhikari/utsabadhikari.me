import Hireme from "@/models/hiremeModel";
import connectDB from "@/db/ConnectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const {
      companyName,
      address,
      email,
      category,
      contact,
      noOfEmployees,
      description,
      source,
    } = body;

    const newHiremeReq = new Hireme({
      companyName,
      address,
      email,
      category,
      contact,
      noOfEmployees,
      description,
      source,
    });

    await newHiremeReq.save();

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Hireme Application Send",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["Server Error:", error.message],
    });
  }
}
