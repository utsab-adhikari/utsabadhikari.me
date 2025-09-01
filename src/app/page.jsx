// app/page.js
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/home/Hero";
import Skills from "@/components/home/Skills";
import Projects from "@/components/home/Projects";
import Contact from "@/components/home/Contact";
import Articles from "@/components/home/Articles";
import Loader from "@/components/Loader";
import Footer from "@/components/home/Footer";
import Chatbot from "@/components/home/Chatbot";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full lg:w-1/3 lg:sticky lg:top-8 h-fit"
          >
            <Hero />
          </motion.aside>
          <Chatbot />
          
          <main className="w-full lg:w-2/3 space-y-6">
            <section id="about">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="bg-[#161b22] rounded-md p-6 border border-[#30363d]"
              >
                <h2 className="text-xl font-semibold mb-3 text-[#f0f6fc]">About Me</h2>
                <p className="text-[#7d8590] mb-4">
                  Hi — I'm Utsab Adhikari, a Full Stack Developer and AI enthusiast from Kathmandu, Nepal. 
                  I build production-ready web applications with a focus on performance, accessibility, 
                  and delightful developer experience.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm text-[#7d8590] uppercase tracking-wide mb-2">What I do</h3>
                    <ul className="text-[#7d8590] space-y-1">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#3fb950] rounded-full mr-2"></span>
                        Build modern web apps with Next.js & React
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#3fb950] rounded-full mr-2"></span>
                        Integrate AI features and chatbots
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#3fb950] rounded-full mr-2"></span>
                        Design APIs and scalable backends
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm text-[#7d8590] uppercase tracking-wide mb-2">Seeking</h3>
                    <p className="text-[#7d8590]">
                      Open to freelance, remote roles, and collaboration on interesting projects. 
                      Available to discuss opportunities and consult on product ideas.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            <section id="education">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.04 }}
                className="bg-[#161b22] rounded-md p-6 border border-[#30363d]"
              >
                <h2 className="text-xl font-semibold mb-4 text-[#f0f6fc]">Education</h2>
                <div className="p-4 bg-[#0d1117] rounded-md border border-[#30363d]">
                  <h3 className="text-lg font-medium text-[#f0f6fc]">
                    Bachelor of Engineering in Information Technology
                  </h3>
                  <p className="text-sm text-[#7d8590] mb-3">PU — 2024 - 2028</p>
                  <p className="text-[#7d8590] mb-4">
                    Pursuing IT engineering at{" "}
                    <a
                      href="https://ncit.edu.np"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2f81f7] hover:underline"
                    >
                      Nepal College of Information Technology (NCIT)
                    </a>
                    . Focused on software engineering, data structures, and applied AI.
                  </p>
                  <div className="flex justify-center mt-4">
                    <a
                      href="https://ncit.edu.np"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="https://ncit.edu.np/images/logo.png"
                        alt="NCIT logo"
                        className="w-32 object-contain rounded-md bg-white p-2"
                      />
                    </a>
                  </div>
                </div>
              </motion.div>
            </section>

            <section id="skills">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06 }}
              >
                <Skills />
              </motion.div>
            </section>

            <section id="projects">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12 }}
              >
                <Projects />
              </motion.div>
            </section>

            <section id="certifications">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.04 }}
                className="bg-[#161b22] rounded-md p-6 border border-[#30363d]"
              >
                <h2 className="text-xl font-semibold mb-4 text-[#f0f6fc]">Certifications</h2>
                <div className="p-4 bg-[#0d1117] rounded-md border border-[#30363d]">
                  <h3 className="text-lg font-medium text-[#f0f6fc]">
                    Back End Development & APIs Certification
                  </h3>
                  <p className="text-sm text-[#7d8590] mb-3">FreeCodeCamp — 2025</p>
                  <p className="text-[#7d8590] mb-4">
                    Successfully completed FreeCodeCamp's Back End Development & APIs curriculum.
                  </p>
                  <div className="flex justify-center mb-3">
                    <img
                      src="/certi_01.png"
                      alt="FreeCodeCamp Certification"
                      className="w-full md:w-2/3 rounded-md border border-[#30363d]"
                    />
                  </div>
                  <p className="text-center text-sm text-[#7d8590]">
                    Official:{" "}
                    <a
                      href="https://www.freecodecamp.org/certification/utsab-adhikari/back-end-development-and-apis"
                      className="text-[#2f81f7] hover:underline"
                    >
                      FreeCodeCamp - Backend Development and APIs
                    </a>
                  </p>
                </div>
              </motion.div>
            </section>

            <section id="articles">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06 }}
              >
                <Articles />
              </motion.div>
            </section>

            <section id="github-stats">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.24 }}
                className="bg-[#161b22] rounded-md p-6 border border-[#30363d]"
              >
                <h2 className="text-xl font-semibold mb-4 text-[#f0f6fc]">GitHub Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-[#0d1117] rounded-md p-3 border border-[#30363d]">
                    <img
                      src="https://github-readme-stats.vercel.app/api/top-langs/?username=utsab-adhikari&layout=compact&theme=dark&bg_color=0d1117&title_color=f0f6fc&text_color=7d8590"
                      alt="Top Languages"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="bg-[#0d1117] rounded-md p-3 border border-[#30363d]">
                    <img
                      src="https://github-readme-streak-stats.herokuapp.com/?user=utsab-adhikari&theme=dark&background=0d1117&ring=3fb950&fire=3fb950&currStreakNum=f0f6fc&currStreakLabel=3fb950&sideNums=7d8590&sideLabels=7d8590&dates=7d8590"
                      alt="GitHub Streak"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="bg-[#0d1117] rounded-md p-3 border border-[#30363d]">
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=utsab-adhikari&show_icons=true&theme=dark&bg_color=0d1117&title_color=f0f6fc&text_color=7d8590&icon_color=3fb950&hide_border=true"
                    alt="GitHub Stats"
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </section>

            <section id="contact">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.18 }}
              >
                <Contact />
              </motion.div>
            </section>
            
            <Footer />
          </main>
        </div>
      </div>
    </main>
  );
}