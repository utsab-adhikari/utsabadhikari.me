// components/Contact.jsx
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaWhatsapp, FaGithub, FaDiscord, FaLinkedin, FaFreeCodeCamp } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="bg-[#161b22] rounded-md p-6 border border-[#30363d]">
      <h2 className="text-xl font-semibold text-[#f0f6fc] mb-6">Let's Connect</h2>

      <div className="flex flex-col items-center text-center">
        <p className="text-[#7d8590] mb-6 max-w-md">
          Feel free to reach out to me for collaborations, projects, or just to say hello!
        </p>

        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="mailto:utsabadhikari075@gmail.com"
          className="bg-[#238636] text-white px-6 py-2 rounded-md font-medium mb-8 flex items-center"
        >
          <Mail size={16} className="mr-2" />
          Send an Email
        </motion.a>

        <div className="flex space-x-4 text-[#7d8590] mb-6">
          <motion.a
            href="https://wa.me/+9779867508725"
            target="_blank"
            whileHover={{ scale: 1.1, color: "#25D366" }}
            className="transition-colors"
          >
            <FaWhatsapp className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://github.com/utsab-adhikari"
            target="_blank"
            whileHover={{ scale: 1.1, color: "#f0f6fc" }}
            className="transition-colors"
          >
            <FaGithub className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://discord.com/users/yourid"
            target="_blank"
            whileHover={{ scale: 1.1, color: "#5865F2" }}
            className="transition-colors"
          >
            <FaDiscord className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/utsabadhikari"
            target="_blank"
            whileHover={{ scale: 1.1, color: "#0A66C2" }}
            className="transition-colors"
          >
            <FaLinkedin className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://www.freecodecamp.org/utsab-adhikari"
            target="_blank"
            whileHover={{ scale: 1.1, color: "#0A0A23" }}
            className="transition-colors"
          >
            <FaFreeCodeCamp className="w-6 h-6" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}