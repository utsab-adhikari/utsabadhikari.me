"use client";

import Footer from "@/components/home/Footer";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      name: "KalamKunja",
      description:
        "A modern platform for curated articles, blogs, and AI-powered summarization, designed for readers and writers to interact seamlessly.",
      technologies: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "MongoDB",
      ],
      github: "https://github.com/utsab-adhikari/kalamkunja",
      live: "https://kalamkunja.vercel.app",
      featured: true,
    },
    {
      name: "timestamps-microservice-fcc",
      description: "Converts dates into Unix and UTC timestamps.",
      technologies: ["Node.js", "Express"],
      github: "https://github.com/utsab-adhikari/timestamps-microservice-fcc",
    },
    {
      name: "request-header-parser-microservice-fcc",
      description: "Returns IP, preferred language, and software info.",
      technologies: ["Node.js", "Express"],
      github:
        "https://github.com/utsab-adhikari/request-header-parser-microservice-fcc",
    },
    {
      name: "exercise-tracker-fcc",
      description: "Track users' exercises and logs.",
      technologies: ["Node.js", "Express", "MongoDB"],
      github: "https://github.com/utsab-adhikari/exercise-tracker-fcc",
    },
    {
      name: "file-metadata-microservice-fcc",
      description: "Returns uploaded file metadata using Multer.",
      technologies: ["Node.js", "Express", "Multer"],
      github:
        "https://github.com/utsab-adhikari/file-metadata-microservice-fcc",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-[#7d8590] hover:text-[#f0f6fc] transition-colors mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold text-[#f0f6fc]">Projects</h2>
        </div>

        {/* Full KalamKunja Card */}
        <ProjectFull project={projects[0]} />

        {/* Other Projects - Simpler */}
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold text-[#f0f6fc]">
            Other Projects
          </h2>
          {projects.slice(1).map((project, index) => (
            <ProjectSimple key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* Full Featured Project Card */
function ProjectFull({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#161b22] rounded-md overflow-hidden border border-[#30363d] hover:border-[#3fb950] transition-colors"
    >
      {project.live && (
        <div className="relative h-48 bg-[#0d1117]">
          <iframe
            src={project.live}
            className="absolute inset-0 w-full h-full opacity-10"
            frameBorder="0"
            title={`${project.name} preview`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] to-transparent" />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-[#f0f6fc] mb-1">
              {project.name}
            </h3>
            <p className="text-[#7d8590] text-sm">{project.description}</p>
          </div>
          {project.featured && (
            <span className="px-2 py-1 bg-[#1f6feb] text-[#f0f6fc] rounded-full text-xs font-medium">
              Featured
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-[#21262d] text-[#7d8590] rounded-md text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-1.5 bg-[#21262d] text-[#7d8590] rounded-md hover:bg-[#30363d] hover:text-[#f0f6fc] transition-colors text-sm border border-[#30363d]"
          >
            <Github size={14} className="mr-1.5" />
            Code
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-1.5 bg-[#238636] text-[#f0f6fc] rounded-md hover:bg-[#2ea043] transition-colors text-sm"
            >
              <ExternalLink size={14} className="mr-1.5" />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* Simple Project Card */
function ProjectSimple({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-[#161b22] p-4 rounded-md border border-[#30363d] hover:border-[#3fb950] transition-colors"
    >
      <h3 className="text-md font-medium text-[#f0f6fc] mb-1">
        {project.name}
      </h3>
      <p className="text-[#7d8590] text-sm mb-2">{project.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-[#21262d] text-[#7d8590] rounded-md text-xs"
          >
            {tech}
          </span>
        ))}
      </div>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1 bg-[#21262d] text-[#7d8590] rounded-md hover:bg-[#30363d] hover:text-[#f0f6fc] transition-colors text-xs border border-[#30363d]"
      >
        <Github size={12} className="mr-1.5" />
        GitHub
      </a>
    </motion.div>
  );
}
