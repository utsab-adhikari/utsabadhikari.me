// components/Skills.jsx
import { motion } from 'framer-motion'
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
} from 'react-icons/fa'
import {
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiCplusplus,
} from 'react-icons/si'

export default function Skills() {
  const skillsData = [
    {
      category: "Frontend",
      icon: <FaReact className="text-[#61dafb]" size={16} />,
      items: ["React", "Next.js", "HTML/CSS", "JavaScript", "Tailwind CSS"]
    },
    {
      category: "Backend",
      icon: <FaNodeJs className="text-[#68a063]" size={16} />,
      items: ["Node.js", "Express", "API Development", "Authentication"]
    },
    {
      category: "Database",
      icon: <SiMongodb className="text-[#47a248]" size={16} />,
      items: ["MongoDB", "Database Design", "Data Modeling"]
    },
    {
      category: "Tools & Others",
      icon: <FaGitAlt className="text-[#f14e32]" size={16} />,
      items: ["Git", "GitHub", "Linux", "C++", "Auth.js"]
    }
  ]

  return (
    <section className="bg-[#161b22] rounded-md p-6 border border-[#30363d]">
      <h2 className="text-xl font-semibold text-[#f0f6fc] mb-6">Skills & Technologies</h2>
      
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center text-center mb-6"
        >
          <SiNextdotjs className="text-[#f0f6fc] text-4xl mb-3" />
          <h3 className="text-lg font-medium text-[#f0f6fc] mb-2">
            Mastering <span className="text-[#61dafb]">Next.js</span>
          </h3>
          <p className="text-[#7d8590] text-sm max-w-md">
            Next.js is the backbone of my modern web development. With features like 
            server-side rendering, API routes, and optimized performance.
          </p>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillsData.map((skill, index) => (
          <motion.div
            key={skill.category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0d1117] rounded-md p-4 border border-[#30363d] hover:border-[#3fb950] transition-colors"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-[#161b22] rounded-md mr-2">
                {skill.icon}
              </div>
              <h3 className="font-medium text-[#f0f6fc]">{skill.category}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className="px-2 py-1 bg-[#161b22] text-[#7d8590] rounded-md text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-6 p-4 bg-[#0d1117] rounded-md border border-[#30363d]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-md font-medium text-[#f0f6fc] mb-2">Always Learning</h4>
        <p className="text-[#7d8590] text-sm">
          Technology never stops evolving, and neither do I. From exploring new frameworks 
          to diving into AI opportunities, I stay excited about learning and building 
          innovative solutions.
        </p>
      </motion.div>
    </section>
  )
}