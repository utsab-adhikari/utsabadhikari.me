"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Cloud, Star, Compass, Info, ArrowLeft } from "lucide-react"; // Added Info for tooltips
import Link from "next/link";

export default function Showcase() {
  return (
    <div className="min-h-screen snap-y snap-mandatory overflow-y-auto bg-gray-900 text-white relative">
      <button
        onClick={() => window.history.back()}
        className="fixed top-6 left-6 z-50 bg-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition duration-300 flex items-center space-x-2 shadow-lg"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>
         <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 z-10 to-black opacity-70 animate-gradient-bg"></div>

      {/* Section Wrapper */}
      <section className="min-h-screen flex items-center justify-center snap-start relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
          {/* Horoscope Card - Enhanced with Tooltip and Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-yellow-500/50 transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Star size={24} />
                  <CardTitle className="text-2xl">Horoscope</CardTitle>
                  <div className="group relative">
                    <Info size={16} className="cursor-help" />
                    <div className="absolute hidden group-hover:block bg-gray-700 p-2 rounded-md text-sm text-gray-300 -top-10 left-1/2 transform -translate-x-1/2 w-48">
                      Personalized insights based on your zodiac sign for daily
                      guidance.
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Get tailored daily and monthly readings for your zodiac sign.
                  Discover opportunities, navigate challenges, and identify
                  lucky moments to make the most of your day.
                </p>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  View Horoscope
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Astro Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-blue-500/50 transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 text-blue-400">
                  <Compass size={24} />
                  <CardTitle className="text-2xl">Astro</CardTitle>
                  <div className="group relative">
                    <Info size={16} className="cursor-help" />
                    <div className="absolute hidden group-hover:block bg-gray-700 p-2 rounded-md text-sm text-gray-300 -top-10 left-1/2 transform -translate-x-1/2 w-48">
                      Traditional Nepali astrology elements for cultural and
                      spiritual alignment.
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Explore today’s <b>Tithi</b>, <b>Nakshatra</b>, and auspicious
                  timings according to the Nepali lunar calendar. Perfect for
                  planning events or daily rituals.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Explore Astro
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weather Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-indigo-500/50 transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 text-indigo-400">
                  <Cloud size={24} />
                  <Sun className="text-orange-400" size={20} />
                  <CardTitle className="text-2xl">Weather</CardTitle>
                  <div className="group relative">
                    <Info size={16} className="cursor-help" />
                    <div className="absolute hidden group-hover:block bg-gray-700 p-2 rounded-md text-sm text-gray-300 -top-10 left-1/2 transform -translate-x-1/2 w-48">
                      Accurate, location-based forecasts to keep you prepared.
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Receive real-time updates on temperature, rainfall
                  predictions, and sunrise/sunset times specific to your
                  location. Stay ahead of the weather.
                </p>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Check Weather
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      <footer className="w-full text-gray-400 text-sm relative z-50">
        <nav className="flex items-center justify-center space-x-8 py-4 border-b border-gray-800">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/projects" className="hover:text-white transition">
            Projects
          </Link>
          <Link href="/skills" className="hover:text-white transition">
            Skills
          </Link>
          <Link href="/articles" className="hover:text-white transition">
            Articles
          </Link>
        </nav>
        <div className="py-4 text-center border-t border-gray-800">
          <p>
            &copy; {new Date().getFullYear()} Utsab Adhikari. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Custom CSS for Animations */}
      <style jsx global>{`
        @keyframes gradient-bg {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-bg {
          background-size: 200% 200%;
          animation: gradient-bg 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
