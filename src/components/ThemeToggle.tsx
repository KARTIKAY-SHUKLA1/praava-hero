"use client";

import { useEffect, useState, useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ICON_SIZE = 20;
const TRANSITION = { duration: 0.2 };

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const newDark = !prev;
      document.documentElement.classList.toggle("dark", newDark);
      localStorage.setItem("theme", newDark ? "dark" : "light");
      return newDark;
    });
  }, []);

  return (
    <button
      onClick={toggle}
      className="fixed top-5 right-5 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--blob-color)",
      }}
      aria-label="Toggle dark mode"
    >
      <AnimatePresence mode="wait">
        {dark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={TRANSITION}
          >
            <Sun size={ICON_SIZE} className="text-yellow-400" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={TRANSITION}
          >
            <Moon size={ICON_SIZE} className="text-[#3d5cf5]" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}