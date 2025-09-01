// components/Hero.jsx
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { FaWhatsapp, FaDiscord, FaUser } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="bg-[#161b22] rounded-md p-6 border border-[#30363d]">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-32 h-32 text-[#238636] p-1 rounded-full overflow-hidden mb-5 border-2 border-[#30363d]"
        >
          <FaUser size="w-fit"/>
        </motion.div>

        <h1 className="text-xl font-semibold text-[#f0f6fc] mb-1">Utsab Adhikari</h1>
        <p className="text-[#7d8590] mb-3">
          Full Stack Developer & AI Enthusiast
        </p>

        <div className="flex items-center text-[#7d8590] text-sm mb-4">
          <MapPin size={14} className="mr-1" />
          Kathmandu, Nepal
        </div>

        <p className="text-[#7d8590] text-sm mb-5 max-w-xs">
          A passionate developer building beautiful and functional web applications.
        </p>

        <div className="flex space-x-3 mb-5">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://wa.me/+9779867508725"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#0d1117] rounded-md text-[#7d8590] hover:text-[#25D366] transition-colors border border-[#30363d]"
          >
            <FaWhatsapp size={16} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/utsab-adhikari"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#0d1117] rounded-md text-[#7d8590] hover:text-[#f0f6fc] transition-colors border border-[#30363d]"
          >
            <Github size={16} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://discord.com/users/yourid"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#0d1117] rounded-md text-[#7d8590] hover:text-[#5865F2] transition-colors border border-[#30363d]"
          >
            <FaDiscord size={16} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://linkedin.com/in/utsabadhikari"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#0d1117] rounded-md text-[#7d8590] hover:text-[#0A66C2] transition-colors border border-[#30363d]"
          >
            <Linkedin size={16} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="mailto:utsabadhikari075@gmail.com"
            className="p-2 bg-[#0d1117] rounded-md text-[#7d8590] hover:text-[#ea4335] transition-colors border border-[#30363d]"
          >
            <Mail size={16} />
          </motion.a>
        </div>

        <div className="flex flex-col w-full gap-3">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/hireme"
            className="bg-[#238636] text-white px-4 py-2 rounded-md font-medium text-center text-sm"
          >
            Hire Me
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="bg-[#0d1117] text-[#7d8590] px-4 py-2 rounded-md font-medium text-center text-sm border border-[#30363d] hover:border-[#3fb950] transition-colors"
          >
            View Projects
          </motion.a>
        </div>
      </div>
    </div>
  );
}