import mongoose from "mongoose";

const viewSchema = new mongoose.Schema(
  {
    viewedAt: {
      type: Date,
      default: Date.now,
    },
    viewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ipAddress: {
      type: String,
    },
  },
  { _id: false }
);

const articleSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        "ai",
        "development",
        "tech",
        "nextjs",
        "javascript",
        "general",
        "national",
      ],
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    featuredImage: {
      type: String,
      required: true,
      trim: true,
    },
    views: [viewSchema],
    publishType: {
      type: String,
      enum: ["draft", "published", "trash", "private"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const Article =
  mongoose.models.Article ||
  mongoose.model("Article", articleSchema, "articles");
export default Article;
