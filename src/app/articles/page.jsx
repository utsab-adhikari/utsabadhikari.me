// components/Articles.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Eye, Clock, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/v1/articles");
        const data = await res.json();
        if (data.success) {
          setArticles(data.articles.slice(0, 3)); // Show only 3 recent articles
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
       <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <div className="w-12 h-12 border-2 border-[#30363d] rounded-full"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-2 border-t-[#1f6feb] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-[#7d8590] text-sm">Loading Articles...</p>
            </motion.div>
          </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      <div className="container mx-auto px-4 py-8">
        <section className="bg-[#161b22] rounded-md p-6 border border-[#30363d]">
          <div className="flex items-center mb-6">
            <button
              onClick={() => window.history.back()}
              className="flex cursor-pointer items-center text-[#7d8590] hover:text-[#f0f6fc] transition-colors mr-4"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold text-[#f0f6fc]">
              Recent Articles
            </h2>
          </div>

          {articles.length === 0 ? (
            <p className="text-[#7d8590] text-center py-4">
              No articles yet. Check back soon!
            </p>
          ) : (
            <div className="space-y-4">
              {articles.map((article, index) => (
                <ArticleCard
                  key={article._id || index}
                  article={article}
                  index={index}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
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
      className="p-4 bg-[#0d1117] rounded-md border border-[#30363d] hover:border-[#3fb950] transition-colors"
    >
      <h3 className="text-lg font-medium text-[#f0f6fc] mb-2 hover:text-[#2f81f7] transition-colors">
        {article.slug ? (
          <Link href={`/v1/articles/${article.slug}`}>{article.title}</Link>
        ) : (
          article.title
        )}
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

        {article.slug && (
          <Link
            href={`/v1/articles/${article.slug}`}
            className="text-[#2f81f7] hover:underline text-xs"
          >
            Read →
          </Link>
        )}
      </div>
    </motion.div>
  );
}
