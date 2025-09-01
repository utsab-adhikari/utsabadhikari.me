"use client";

import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
  FaLinux,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiCplusplus,
  SiAuth0,
} from "react-icons/si";
import { ArrowLeft } from "lucide-react"; // back button

export default function SkillsPage() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory text-white">
      {/* === Back Button === */}
      <button
        onClick={() => window.history.back()}
        className="fixed top-6 left-6 z-50 bg-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition duration-300 flex items-center space-x-2 shadow-lg"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      {/* === Section 1: Next.js Focus === */}
      <section className="h-screen snap-start flex items-center justify-center bg-gray-900 px-6">
        <div className="max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <SiNextdotjs className="text-white text-7xl mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mastering <span className="text-blue-400">Next.js</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
              Next.js is the backbone of my modern web development. With features like 
              server-side rendering, API routes, and optimized performance, it enables me 
              to build scalable, production-ready applications that deliver an outstanding 
              user experience across devices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === Section 2: Other Skills === */}
      <section className="h-screen snap-start flex items-center justify-center bg-gray-800 px-6">
        <div className="max-w-6xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-10">Other Skills</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 text-center">
            {[
              { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-5xl" /> },
              { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-5xl" /> },
              { name: "JavaScript", icon: <FaJs className="text-yellow-400 text-5xl" /> },
              { name: "React", icon: <FaReact className="text-blue-400 text-5xl" /> },
              { name: "Tailwind", icon: <SiTailwindcss className="text-sky-400 text-5xl" /> },
              { name: "C++", icon: <SiCplusplus className="text-blue-500 text-5xl" /> },
              { name: "Git", icon: <FaGitAlt className="text-orange-600 text-5xl" /> },
              { name: "GitHub", icon: <FaGithub className="text-gray-300 text-5xl" /> },
              { name: "Linux", icon: <FaLinux className="text-yellow-400 text-5xl" /> },
              { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-5xl" /> },
              { name: "Express", icon: <SiExpress className="text-gray-200 text-5xl" /> },
              { name: "MongoDB", icon: <SiMongodb className="text-green-400 text-5xl" /> },
              { name: "Auth.js", icon: <SiAuth0 className="text-orange-400 text-5xl" /> },
            ].map((skill, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center space-y-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                {skill.icon}
                <span className="text-sm md:text-base">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === Section 3: Learning & Opportunities === */}
      <section className="h-screen snap-start flex flex-col items-center justify-between bg-gray-950">
        <div className="flex flex-col items-center justify-center flex-1 text-center max-w-3xl px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Always Learning, Always Growing
          </motion.h2>
          <motion.p
            className="text-lg text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Technology never stops evolving, and neither do I. From exploring new frameworks 
            to diving into AI opportunities, I stay excited about learning and building 
            innovative solutions that create real-world impact.
          </motion.p>
        </div>

        {/* === Footer with nav + copyright === */}
        <footer className="w-full bg-gray-900 text-gray-400 text-sm">
          <nav className="flex items-center justify-center space-x-8 py-4 border-b border-gray-800">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/projects" className="hover:text-white transition">Projects</a>
            <a href="/articles" className="hover:text-white transition">Articles</a>
          </nav>
          <div className="py-4 text-center border-t border-gray-800">
            <p>&copy; {new Date().getFullYear()} Utsab Adhikari. All rights reserved.</p>
          </div>
        </footer>
      </section>
    </main>
  );
}
