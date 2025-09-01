"use client";

import Footer from "@/components/home/Footer";
import { motion } from "framer-motion";
import { Mail, FileText, Edit3, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HiremePage({ setActiveSection }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    // TODO: replace with API call if needed
    console.log("Submitted email:", email);
    setSubmitted(true);
    setError("");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-6xl min-h-[80vh] mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-[#7d8590] hover:text-[#f0f6fc] transition-colors mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold text-[#f0f6fc]">
            Let's Work Together
          </h1>
        </div>

        <div className="space-y-6">
          <motion.div
            className="space-y-3 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#7d8590] max-w-2xl mx-auto text-sm">
              I'm excited to collaborate on your next project. Choose how you'd
              like to connect with me.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Email Card */}
            <motion.div
              className="bg-[#161b22] rounded-md p-4 border border-[#30363d] hover:border-[#1f6feb] transition-colors flex flex-col items-center space-y-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 text-[#2f81f7]">
                <Mail size={18} />
                <h2 className="text-md font-medium">Quick Email</h2>
                <div className="group relative">
                  <Info size={14} className="cursor-help" />
                  <div className="absolute hidden group-hover:block bg-[#161b22] p-2 rounded-md text-xs text-[#7d8590] -top-8 left-1/2 transform -translate-x-1/2 w-32 z-10 border border-[#30363d]">
                    Drop your email and I'll reach out.
                  </div>
                </div>
              </div>
              <p className="text-[#7d8590] text-center text-xs">
                Perfect for a fast introduction or simple query.
              </p>
              <form onSubmit={handleSubmit} className="w-full space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md bg-[#0d1117] text-[#f0f6fc] placeholder-[#7d8590] border border-[#30363d] focus:outline-none focus:ring-2 focus:ring-[#1f6feb] transition text-sm"
                />
                {error && <p className="text-[#da3633] text-xs">{error}</p>}
                <button
                  type="submit"
                  className="w-full px-3 py-1.5 bg-[#238636] rounded-md font-medium hover:bg-[#2ea043] transition-colors text-sm text-[#f0f6fc]"
                >
                  Submit
                </button>
              </form>
              {submitted && (
                <p className="text-[#3fb950] text-xs animate-fade-in">
                  Thanks! I'll be in touch soon.
                </p>
              )}
            </motion.div>

            {/* Detailed Form Card */}
            <motion.div
              className="bg-[#161b22] rounded-md p-4 border border-[#30363d] hover:border-[#3fb950] transition-colors flex flex-col items-center space-y-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 text-[#3fb950]">
                <Edit3 size={18} />
                <h2 className="text-md font-medium">Detailed Form</h2>
                <div className="group relative">
                  <Info size={14} className="cursor-help" />
                  <div className="absolute hidden group-hover:block bg-[#161b22] p-2 rounded-md text-xs text-[#7d8590] -top-8 left-1/2 transform -translate-x-1/2 w-36 z-10 border border-[#30363d]">
                    Share project details for a tailored response.
                  </div>
                </div>
              </div>
              <p className="text-[#7d8590] text-center text-xs">
                Ideal if you have specific project requirements.
              </p>
              <Link
                href="/hireme/application/form"
                className="w-full px-3 py-1.5 bg-[#238636] rounded-md font-medium hover:bg-[#2ea043] transition-colors text-sm text-[#f0f6fc] text-center"
              >
                Go to Form
              </Link>
            </motion.div>

            {/* Resume Card */}
            <motion.div
              className="bg-[#161b22] rounded-md p-4 border border-[#30363d] hover:border-[#7d8590] transition-colors flex flex-col items-center space-y-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 text-[#7d8590]">
                <FileText size={18} />
                <h2 className="text-md font-medium">My Resume</h2>
                <div className="group relative">
                  <Info size={14} className="cursor-help" />
                  <div className="absolute hidden group-hover:block bg-[#161b22] p-2 rounded-md text-xs text-[#7d8590] -top-8 left-1/2 transform -translate-x-1/2 w-36 z-10 border border-[#30363d]">
                    Download a PDF summary of my skills and experience.
                  </div>
                </div>
              </div>
              <p className="text-[#7d8590] text-center text-xs">
                Get an overview of my expertise and projects.
              </p>
              <a
                href="/resume.pdf"
                download
                className="w-full px-3 py-1.5 bg-[#21262d] rounded-md font-medium hover:bg-[#30363d] transition-colors text-sm text-[#f0f6fc] text-center border border-[#30363d]"
              >
                Download Now
              </a>
            </motion.div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-in;
          }
        `}</style>
      </div>
      <div className="p-4">
        <Footer />
      </div>
    </div>
  );
}
