import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/ConnectDB";
import Article from "@/models/articleModel";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = await params;

    const article = await Article.findOne({ slug });

    if (!article) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Article not found",
      });
    }

    const category = article.category;

    const articlesByCat = await Article.find({ category: category });
    const relatedArticles = articlesByCat.filter(
      (article) => article.slug !== slug
    );

    return NextResponse.json({
      success: true,
      status: 200,
      article,
      relatedArticles,
    });
  } catch (error) {
    console.error("Article fetch error:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { slug } = await params;

    const data = await request.json();

    const article = await Article.findById(data.id);

    if (!article) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Article not found",
      });
    }

    await Article.findByIdAndUpdate(data.id, {
      slug: data.slug,
      title: data.title,
      content: data.content,
      featuredImage: data.featuredImage,
      category: data.category,
    });

    const newArticle = await Article.findById(data.id);

    return NextResponse.json({
      success: true,
      status: 200,
      article: newArticle,
    });
  } catch (error) {
    console.error("Article fetch error:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}
