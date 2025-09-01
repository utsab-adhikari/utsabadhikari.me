// components/Projects.jsx
'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'

export default function Projects() {
  const projects = [
    {
      name: "KalamKunja",
      description: "A modern platform for curated articles, blogs, and AI-powered summarization.",
      technologies: ["Next.js", "React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/utsab-adhikari/kalamkunja",
      live: "https://kalamkunja.vercel.app",
      featured: true,
    },
    {
      name: "timestamps-microservice-fcc",
      github: "https://github.com/utsab-adhikari/timestamps-microservice-fcc",
    },
    {
      name: "request-header-parser-microservice-fcc",
      github: "https://github.com/utsab-adhikari/request-header-parser-microservice-fcc",
    },
    {
      name: "exercise-tracker-fcc",
      github: "https://github.com/utsab-adhikari/exercise-tracker-fcc",
    },
    {
      name: "file-metadata-microservice-fcc",
      github: "https://github.com/utsab-adhikari/file-metadata-microservice-fcc",
    }
  ]

  return (
    <section className="bg-[#161b22] rounded-md p-6 border border-[#30363d]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#f0f6fc]">Projects</h2>
        <Link href="/projects" className="text-sm text-[#2f81f7] hover:underline">
          View all
        </Link>
      </div>
      
      <ProjectCard project={projects[0]} />

      <div className="mt-6">
        <h3 className="text-md font-medium text-[#f0f6fc] mb-3">Other Projects</h3>
        <ul className="space-y-2">
          {projects.slice(1).map((p) => (
            <li key={p.name} className="flex items-center justify-between p-2 bg-[#0d1117] rounded-md border border-[#30363d] hover:border-[#3fb950] transition-colors">
              <span className="text-[#7d8590] text-sm">{p.name}</span>
              <a 
                href={p.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#7d8590] hover:text-[#2f81f7]"
              >
                <Github size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0d1117] rounded-md overflow-hidden border border-[#30363d] hover:border-[#3fb950] transition-colors mb-4"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-medium text-[#f0f6fc] mb-1">{project.name}</h3>
            <p className="text-[#7d8590] text-sm">{project.description}</p>
          </div>
          
          {project.featured && (
            <span className="px-2 py-1 bg-[#3fb950] text-white rounded-full text-xs font-medium">
              Featured
            </span>
          )}
        </div>

        {project.technologies && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-[#161b22] text-[#7d8590] rounded-md text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex space-x-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-1 bg-[#161b22] text-[#7d8590] rounded-md text-sm hover:text-[#f0f6fc] transition-colors border border-[#30363d]"
          >
            <Github size={14} className="mr-1" />
            Code
          </a>
          
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-1 bg-[#238636] text-white rounded-md text-sm hover:bg-[#2ea043] transition-colors"
            >
              <ExternalLink size={14} className="mr-1" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}