import { NextResponse } from "next/server";
import Article from "@/models/articleModel";
import CppFile from "@/models/cppFileModel";
import Tracker from "@/models/trackerModel";

import connectDB from "@/db/ConnectDB";
export async function GET() {
  await connectDB();

  const [articles, cppFiles, trackers] = await Promise.all([
    Article.find({}, "createdAt title category"),
    CppFile.find({}, "createdAt filename"),
    Tracker.find({}, "createdAt date title"),
  ]);

  const allItems = [
    ...articles.map(a => ({
      type: "Article",
      date: a.createdAt,
      title: a.title,
      category: a.category,
    })),
    ...cppFiles.map(c => ({
      type: "CppFile",
      date: c.createdAt,
      title: c.filename,
      category: "cpp",
    })),
    ...trackers.map(t => ({
      type: "Tracker",
      date: t.date || t.createdAt,
      title: t.title,
      category: "tracker",
    })),
  ];

  // Sort descending by date
  const latestActivities = allItems
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  // Group activity per month for heatmap
  const activityByMonth = {};

  allItems.forEach(item => {
    const dateObj = new Date(item.date);
    const monthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}`;

    if (!activityByMonth[monthKey]) activityByMonth[monthKey] = {};

    const dayKey = dateObj.toISOString().split("T")[0];
    activityByMonth[monthKey][dayKey] = (activityByMonth[monthKey][dayKey] || 0) + 1;
  });

  return NextResponse.json({ activityByMonth, latestActivities });
}
