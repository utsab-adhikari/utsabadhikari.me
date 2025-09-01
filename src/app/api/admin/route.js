// src/app/api/v1/admin/route.js
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";
import Article from "@/models/articleModel";
import User from "@/models/userModel";
import View from "@/models/viewsModel";
import Message from "@/models/messageModel";

export async function GET(request) {
  try {
    await connectDB();

    const users = await User.find({});
    const views = await View.find({});
    const messages = await Message.find({});

    const allArticles = await Article.find({});

    const articles = {
      published: [],
      draft: [],
      trash: [],
    };

    let totalViews = 0;
    let totalArticles = 0;

    for (const article of allArticles) {
      if (articles[article.publishType]) {
        articles[article.publishType].push(article);
      }

      if (article.publishType === "published") {
        totalArticles++;
        totalViews += article.views.length || 0;
      }
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Success",
      users: users.length || 0,
      views: views.length || 0,
      totals: {
        totalViews,
        totalArticles,
      },
      articles,
      messages,
      views,
    });
  } catch (error) {
    console.error("GET /api/v1/admin error:", error.message);

    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
