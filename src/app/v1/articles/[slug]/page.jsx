"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaEdit, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FiCalendar, FiEye, FiFolder, FiUser } from "react-icons/fi";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { Calendar, Eye, Clock, ArrowLeft } from "lucide-react";
import Footer from "@/components/home/Footer";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const pathname = usePathname();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    // set share url safely after render
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [pathname]);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/v1/articles/${slug}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.success) {
          setArticle(data.article);
          setRelated(data.relatedArticles);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchArticle();
  }, [slug]);

  useEffect(() => {
    async function recordView() {
      try {
        await fetch(`/api/v1/articles/${slug}/view`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ viewerId: session?.user?.id || null }),
        });
      } catch (err) {
        console.error(err);
      }
    }
    if (slug) recordView();
  }, [slug, session?.user?.id]);

  const formatDate = (date) => format(new Date(date), "MMMM d, yyyy");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-12 h-12 border-2 border-[#30363d] rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-2 border-t-[#1f6feb] border-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-[#7d8590] text-sm">Loading Article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d1117] text-[#da3633]">
        <p>Article not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      <div className="container max-w-screen-lg mx-auto px-4 py-8">
        <section className="bg-[#161b22] rounded-md p-6 border border-[#30363d]">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => window.history.back()}
              className="flex cursor-pointer items-center text-[#7d8590] hover:text-[#f0f6fc] transition-colors mr-4"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-semibold text-[#f0f6fc]">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-[#7d8590] text-xs md:text-sm mt-1">
                <div className="flex items-center gap-1">
                  <FiUser size={12} /> {article.author || "Utsab Adhikari"}
                </div>
                <div className="flex items-center gap-1">
                  <FiCalendar size={12} /> {formatDate(article.createdAt)}
                </div>
                <div className="flex items-center gap-1">
                  <FiFolder size={12} />
                  <Link
                    href={`/category/${article.category.toLowerCase()}`}
                    className="hover:text-[#2f81f7]"
                  >
                    {article.category}
                  </Link>
                </div>
                <div className="flex items-center gap-1">
                  <FiEye size={12} /> {article.views?.length || 0} views
                </div>
                {session?.user?.role === "admin" && (
                  <Link
                    href={`/v1/articles/update/${slug}`}
                    className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#21262d] text-[#f0f6fc] text-xs hover:bg-[#30363d] transition-colors border border-[#30363d]"
                  >
                    <FaEdit size={10} /> Edit
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Content + Sidebar */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 p-4 bg-[#0d1117] rounded-md border border-[#30363d] hover:border-[#3fb950] transition-colors"
            >
              <div
                className="prose prose-invert max-w-none whitespace-pre-wrap 
                prose-headings:text-[#f0f6fc] 
                prose-a:text-[#2f81f7] 
                prose-strong:text-[#f0f6fc] 
                prose-code:text-[#f0f6fc] prose-code:bg-[#0d1117] prose-code:p-1 
                prose-code:rounded prose-code:border prose-code:border-[#30363d] 
                prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-[#30363d]"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Share Buttons */}
              {shareUrl && (
                <div className="flex gap-2 mt-6 flex-wrap">
                  {[
                    {
                      icon: FaFacebook,
                      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl
                      )}`,
                      label: "Share on Facebook",
                    },
                    {
                      icon: FaTwitter,
                      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareUrl
                      )}&text=${encodeURIComponent(article.title)}`,
                      label: "Share on Twitter",
                    },
                    {
                      icon: FaLinkedin,
                      url: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                        shareUrl
                      )}&title=${encodeURIComponent(article.title)}`,
                      label: "Share on LinkedIn",
                    },
                  ].map(({ icon: Icon, url, label }, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#21262d] rounded-md hover:bg-[#30363d] transition-colors text-[#7d8590] hover:text-[#f0f6fc] border border-[#30363d]"
                      aria-label={label}
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              <h2 className="text-md font-semibold text-[#f0f6fc] mb-3">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {related.length > 0 ? (
                  related.map((rel) => (
                    <Link key={rel._id} href={`/v1/articles/${rel.slug}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-[#0d1117] rounded-md border border-[#30363d] hover:border-[#3fb950] transition-colors"
                      >
                        <h3 className="text-sm font-medium text-[#f0f6fc] line-clamp-2">
                          {rel.title}
                        </h3>

                        <div className="flex items-center justify-between text-xs text-[#7d8590]">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <Calendar size={12} className="mr-1" />
                              <span>{formatDate(rel.createdAt)}</span>
                            </div>

                            <div className="flex items-center">
                              <Eye size={12} className="mr-1" />
                              <span>{rel.views.length}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))
                ) : (
                  <p className="text-[#7d8590] text-sm">
                    No related articles found.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
