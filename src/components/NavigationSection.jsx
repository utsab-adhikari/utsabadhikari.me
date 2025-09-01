// components/NavigationSection.jsx
'use client'

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Info } from "lucide-react"

const navOptions = [
  {
    title: "Skills",
    id: "skills",
    description: "Discover the technologies and tools I'm proficient in.",
    icon: "🚀"
  },
  {
    title: "Projects",
    id: "projects",
    description: "Explore my portfolio of recent works and case studies.",
    icon: "💼"
  },
  {
    title: "Showcase",
    href: "/showcase",
    description: "View highlights and demonstrations of my best projects.",
    icon: "🌟"
  },
  {
    title: "Articles",
    id: "articles",
    description: "Read my insights, tutorials, and thoughts on industry trends.",
    icon: "📝"
  },
  {
    title: "Activity",
    href: "/activity",
    description: "Overview of My github and portfolio activity",
    icon: "📊"
  },
  {
    title: "Contact",
    id: "contact",
    description: "Get in touch with me for collaborations or opportunities.",
    icon: "📞"
  },
]

export default function NavigationSection({ setActiveSection }) {
  const [openTooltip, setOpenTooltip] = useState(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (!wrapperRef.current) return
      if (!wrapperRef.current.contains(e.target)) setOpenTooltip(null)
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpenTooltip(null)
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [])

  return (
    <section className="bg-gray-800 rounded-2xl shadow-lg p-6 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-60 animate-gradient-bg"></div>

      <div ref={wrapperRef} className="relative z-10">
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-6 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore My Work
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {navOptions.map((opt, i) => (
            <motion.div
              key={opt.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ scale: 1.03 }}
              className="relative"
            >
              <div
                className="relative bg-gray-700 rounded-xl overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-purple-500"
                role="group"
                aria-label={opt.title}
              >
                {/* Subtle sliding overlay */}
                <div
                  className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1))",
                  }}
                />

                {/* Clickable area */}
                {opt.id ? (
                  <button
                    onClick={() => setActiveSection(opt.id)}
                    className="block p-4 h-28 w-full relative z-10 flex flex-col items-center justify-center"
                  >
                    <span className="text-2xl mb-2">{opt.icon}</span>
                    <h3 className="text-sm font-medium text-white">{opt.title}</h3>
                  </button>
                ) : (
                  <Link
                    href={opt.href}
                    className="block p-4 h-28 w-full relative z-10 flex flex-col items-center justify-center"
                    onClick={() => setOpenTooltip(null)}
                  >
                    <span className="text-2xl mb-2">{opt.icon}</span>
                    <h3 className="text-sm font-medium text-white">{opt.title}</h3>
                  </Link>
                )}

                {/* Info icon */}
                <button
                  type="button"
                  className="absolute top-2 right-2 z-20 bg-gray-600 hover:bg-gray-500 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                  aria-expanded={openTooltip === i}
                  aria-controls={`tooltip-${i}`}
                  aria-label={`More about ${opt.title}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setOpenTooltip((prev) => (prev === i ? null : i))
                  }}
                >
                  <Info className="w-4 h-4 text-gray-200" />
                </button>

                {/* Tooltip */}
                <div
                  id={`tooltip-${i}`}
                  role="status"
                  aria-hidden={openTooltip !== i}
                  className={`absolute top-12 right-2 z-30 w-48 bg-gray-800 border border-gray-700 text-gray-200 text-xs rounded-md p-2 shadow-lg transform transition-all duration-150 ${
                    openTooltip === i
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  {opt.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gradient animation keyframes */}
      <style jsx global>{`
        @keyframes gradient-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-bg {
          background-image: linear-gradient(120deg, #0f172a 0%, #0b1220 50%, #020617 100%);
          background-size: 200% 200%;
          animation: gradient-bg 18s ease infinite;
        }
      `}</style>
    </section>
  )
}