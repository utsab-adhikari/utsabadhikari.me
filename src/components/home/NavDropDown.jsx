"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaProjectDiagram,
  FaEnvelope,
  FaNewspaper,
  FaUserTie,
  FaBars,
  FaTimes,
  FaArrowLeft,
  FaSignInAlt,
  FaUserShield,
  FaClipboardList,
  FaTasks,
  FaPhone,
  FaRProject,
  FaCode,
  FaSave,
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { LucideActivity } from "lucide-react";

export default function NavDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleJump = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push(href);
    }
  };

  // --- Base nav items (always visible) ---
  const baseNavItems = [
    { id: "/", label: "Home", icon: <FaHome className="w-4 h-4" /> },
    {
      id: "/articles",
      label: "Articles",
      icon: <FaNewspaper className="w-4 h-4" />,
    },
    {
      id: "/hireme",
      label: "Hire Me",
      icon: <FaUserTie className="w-4 h-4" />,
    },

    {
      id: "/cpp",
      label: "C++ Files",
      icon: <FaCode className="w-4 h-4" />,
    },
     {
      id: "/activity",
      label: "Activity",
      icon: <LucideActivity className="w-4 h-4" />,
    },
    {
      id: "back",
      label: "Back",
      icon: <FaArrowLeft className="w-4 h-4" />,
      onClick: () => router.back(),
    },
  ];

  const adminNavItems = [
    {
      id: "/admin",
      label: "Admin",
      icon: <FaUserShield className="w-4 h-4" />,
    },
    {
      id: "/tracker",
      label: "Tracker",
      icon: <FaTasks className="w-4 h-4" />,
    },
    {
      id: "/hireme/application/management",
      label: "Applications",
      icon: <FaClipboardList className="w-4 h-4" />,
    },
      {
      id: "/notepad",
      label: "Notepad",
      icon: <FaSave className="w-4 h-4" />,
    },
  ];

  let navItems = [...baseNavItems];

  // --- Auth logic ---
  if (status !== "loading") {
    if (!session) {
      navItems.push({
        id: "/admin/login",
        label: "Login",
        icon: <FaSignInAlt className="w-4 h-4" />,
      });
    } else {
      if (session.user?.role === "admin") {
        navItems = [...baseNavItems, ...adminNavItems];
      }
      navItems.push({
        id: "logout",
        label: "Logout",
        icon: <FaSignInAlt className="w-4 h-4" />,
        onClick: () => signOut(),
      });
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] transition-all duration-200 border border-[#30363d]"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? (
          <FaTimes className="w-4 h-4 transition-transform duration-300" />
        ) : (
          <FaBars className="w-4 h-4 transition-transform duration-300" />
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 bg-[#161b22] rounded-md shadow-xl border border-[#30363d] overflow-hidden"
          >
            <ul className="py-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={
                      item.id !== "back" &&
                      item.id !== "login" &&
                      item.id !== "logout"
                        ? item.id
                        : "#"
                    }
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      } else {
                        handleJump(e, item.id);
                      }
                    }}
                    className="flex items-center px-4 py-2 text-sm text-[#e6edf3] hover:bg-[#1f6feb] hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="mr-3 opacity-70">{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
