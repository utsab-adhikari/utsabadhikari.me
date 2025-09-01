// components/Articles.jsx
'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, Eye, Clock } from "lucide-react"
import { motion } from "framer-motion"

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/v1/articles")
        const data = await res.json()
        if (data.success) {
          setArticles(data.articles.slice(0, 3)) // Show only 3 recent articles
        }
      } catch (err) {
        console.error("Error fetching articles:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="bg-[#161b22] rounded-md p-6 border border-[#30363d] flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#3fb950]"></div>
        <p className="ml-3 text-[#7d8590]">Loading articles...</p>
      </div>
    )
  }

  return (
    <section className="bg-[#161b22] rounded-md p-6 border border-[#30363d]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#f0f6fc]">Recent Articles</h2>
        {articles.length > 0 && (
          <Link 
            href="/articles" 
            className="text-sm text-[#2f81f7] hover:underline"
          >
            View all
          </Link>
        )}
      </div>
      
      {articles.length === 0 ? (
        <p className="text-[#7d8590] text-center py-4">No articles yet. Check back soon!</p>
      ) : (
        <div className="space-y-4">
          {articles.map((article, index) => (
            <ArticleCard key={article._id || index} article={article} index={index} />
          ))}
        </div>
      )}
    </section>
  )
}

function ArticleCard({ article, index }) {
  const excerpt = article.content ? article.content.slice(0, 120) + "..." : "No content available..."
  const viewCount = article.views ? article.views.length : 0
  const date = article.createdAt ? new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }) : "Unknown date"

  const wordCount = article.content ? article.content.split(/\s+/).length : 0
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="p-4 bg-[#0d1117] rounded-md border border-[#30363d] hover:border-[#3fb950] transition-colors"
    >
      <h3 className="text-lg font-medium text-[#f0f6fc] mb-2 hover:text-[#2f81f7] transition-colors">
        {article.slug ? (
          <Link href={`/v1/articles/${article.slug}`}>
            {article.title}
          </Link>
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
  )
}