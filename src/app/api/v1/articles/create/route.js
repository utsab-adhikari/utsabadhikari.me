import connectDB from "@/db/ConnectDB";
import Article from "@/models/articleModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    if (!data.title || !data.slug || !data.category || !data.content) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Missing required fields",
      });
    }

    const article = await Article.create({
      category: data.category,
      title: data.title,
      slug: data.slug,
      featuredImage: data.featuredImage,
      content: data.content,
      publishType: data.publishType || "draft",
    });

    return NextResponse.json({
      success: true,
      status: 201,
      message: `Article ${
        data.publishType === "published" ? "published" : "saved as draft"
      } successfully`,
      article,
    });
  } catch (error) {
    console.error("Article creation error:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}
