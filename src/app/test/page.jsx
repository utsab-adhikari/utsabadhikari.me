"use client";

import ChatbotButton from "@/components/home/ChatbotBtn";
import HeroSection from "@/components/home/Hero";
import NavigationSection from "@/components/home/NavSection";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="h-screen flex items-center justify-center bg-gray-950 text-white snap-start relative"
    >
      <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Connect</h2>
        <p className="text-lg text-gray-400 mb-12 max-w-xl">
          Feel free to reach out to me for collaborations, projects, or just to
          say hello!
        </p>
        <a
          href="mailto:your_email@example.com"
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition duration-300 mb-20"
        >
          Send an Email
        </a>
      </div>
      <footer className="absolute bottom-0 w-full bg-gray-900 py-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Utsab Adhikari. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default function Page() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <HeroSection />
      <NavigationSection />
      <ContactSection />
      <ChatbotButton />
    </main>
  );
}
