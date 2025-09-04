"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Eye, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/home/Footer";
import Loader from "@/components/Loader";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/v1/articles");
        const data = await res.json();
        if (data.success) {
          setArticles(data.articles);
        } else {
          setError(data.message || "Failed to load articles");
        }
      } catch (err) {
        setError("An error occurred while fetching articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const categories = [
    "all",
    ...new Set(articles.map((article) => article.category).filter(Boolean)),
  ];

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d1117] text-[#f0f6fc] p-6 text-center">
        <p className="text-[#da3633]">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-[#7d8590] hover:text-[#f0f6fc] transition-colors mr-4"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-lg font-semibold text-[#f0f6fc]">Articles</h2>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="mb-6">
            <p className="text-[#7d8590] text-sm mb-2">Filter by category:</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-[#1f6feb] text-[#f0f6fc]"
                      : "bg-[#21262d] text-[#7d8590] hover:bg-[#30363d] hover:text-[#f0f6fc]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((article, index) => (
              <ArticleCard key={article._id} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#7d8590]">No articles found.</p>
          </div>
        )}
      </div>

      <div className="p-4">
        <Footer />
      </div>
    </div>
  );
}

function ArticleCard({ article, index }) {
  const excerpt = article.content
    ? article.content.slice(0, 120) + "..."
    : "No content available...";
  const viewCount = article.views ? article.views.length : 0;
  const date = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown date";

  const wordCount = article.content ? article.content.split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="p-4 bg-[#161b22] rounded-md border border-[#30363d] hover:border-[#3fb950] transition-colors"
    >
      <h3 className="text-lg font-medium text-[#f0f6fc] mb-2 hover:text-[#2f81f7] transition-colors">
        <Link href={`/v1/articles/${article.slug}`}>{article.title}</Link>
      </h3>

      <p className="text-[#7d8590] text-sm mb-3">{excerpt}</p>

      <div className="flex items-center justify-between text-xs text-[#7d8590]">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Calendar size={12} className="mr-1" />
            <span>{date}</span>
          </div>

          <div className="flex items-center">
            <Eye size={12} className="mr-1" />
            <span>{viewCount}</span>
          </div>

          <div className="flex items-center">
            <Clock size={12} className="mr-1" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        <Link
          href={`/v1/articles/${article.slug}`}
          className="text-[#2f81f7] hover:underline text-xs"
        >
          Read →
        </Link>
      </div>
    </motion.div>
  );
}
