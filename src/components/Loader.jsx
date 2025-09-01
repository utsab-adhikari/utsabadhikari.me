"use client";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <div className="relative">
          <div className="w-12 h-12 border-2 border-[#30363d] rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-2 border-t-[#1f6feb] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-[#7d8590] text-sm">Loading Portfolio...</p>
      </motion.div>
    </div>
  );
}