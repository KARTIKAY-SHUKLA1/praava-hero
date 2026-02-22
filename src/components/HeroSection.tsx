"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Gavel,
  FileText,
  CheckSquare,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import FloatingCard from "./FloatingCard";

// Animation variant for fade-up entrance
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

// Word-by-word heading data
const headingLines = [
  [
    { word: "A", bold: false },
    { word: "single", bold: false },
    { word: "platform", bold: false },
    { word: "to", bold: false },
  ],
  [
    { word: "manage", bold: true },
    { word: "every", bold: false },
    { word: "part", bold: false },
    { word: "of", bold: false },
  ],
  [
    { word: "your", bold: false },
    { word: "legal", bold: true },
    { word: "work", bold: true },
  ],
];

// Background blob config
const blobs = [
  { className: "absolute top-[10%] left-[-5%] w-64 h-32 opacity-60" },
  { className: "absolute bottom-[15%] left-[5%] w-48 h-24 opacity-50" },
  { className: "absolute top-[5%] right-[2%] w-56 h-24 opacity-40" },
  { className: "absolute bottom-[25%] right-[0%] w-72 h-28 opacity-30" },
];

// Mobile cards config
const mobileCards = [
  { color: "blue" as const, icon: <CreditCard size={18} />, label: "Billing" },
  { color: "orange" as const, icon: <Gavel size={18} />, label: "Matters" },
  { color: "dark" as const, icon: <CheckSquare size={18} />, label: "Tasks" },
  { color: "dark" as const, icon: <FileText size={18} />, label: "Documents" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-16 lg:px-24">

      {/* Background blobs */}
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`${blob.className} rounded-full`}
          style={{ background: "var(--blob-color)", filter: "blur(2px)" }}
        />
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">

        {/* LEFT — Text content */}
        <div className="flex flex-col gap-6">

          {/* Animated heading — word by word */}
          <motion.h1
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-6xl leading-[1.1] font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {headingLines.map((line, lineIndex) => (
              <span key={lineIndex} className="block">
                {line.map(({ word, bold }, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: lineIndex * 0.3 + wordIndex * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className={`inline-block mr-3 ${bold ? "font-extrabold" : ""}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-base md:text-lg leading-relaxed max-w-md"
            style={{ color: "var(--text-secondary)" }}
          >
            Track matters, coordinate schedules, manage clients, centralize
            documents, and handle communication — all in one system.
          </motion.p>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex gap-4 flex-wrap"
          >
            <button className="bg-[#3d5cf5] text-white font-semibold px-7 py-3 rounded-full shadow-lg hover:bg-[#2d4ce0] hover:scale-105 transition-all duration-200">
              Get Started Free
            </button>
            <button
              className="font-semibold px-7 py-3 rounded-full border hover:scale-105 transition-all duration-200"
              style={{
                borderColor: "var(--blob-color)",
                color: "var(--text-primary)",
              }}
            >
              See Demo
            </button>
          </motion.div>
        </div>

        {/* RIGHT — Floating Cards (desktop only) */}
        <div className="relative h-120 md:h-140 hidden lg:block">

          <div className="absolute top-[5%] right-[5%] -rotate-12">
            <FloatingCard
              color="blue"
              icon={<CreditCard size={26} />}
              label="Billing"
              floatClass="float-1"
              delay={0.2}
            />
          </div>

          <div className="absolute top-[35%] left-[12%] -rotate-[8deg]">
            <FloatingCard
              color="orange"
              icon={<Gavel size={26} />}
              label="Matters"
              floatClass="float-2"
              delay={0.35}
            />
          </div>

          <div className="absolute top-[45%] right-[2%] rotate-3">
            <FloatingCard
              color="light-purple"
              icon={<MessageCircle size={26} />}
              label="Portal"
              variant="portal"
              floatClass="float-3"
              delay={0.5}
              portalUser={{
                name: "John Doe - Portal",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
                message: "Hey! Could you please review a document for me?",
                meta: "MAT-2233 · 2 h ago",
              }}
            />
          </div>

          <div className="absolute bottom-[10%] left-[15%] -rotate-[5deg]">
            <FloatingCard
              color="dark"
              icon={<CheckSquare size={26} />}
              label="Tasks"
              floatClass="float-4"
              delay={0.65}
            />
          </div>

          <div className="absolute bottom-[3%] right-[-3%] rotate-[8deg]">
            <FloatingCard
              color="dark"
              icon={<FileText size={26} />}
              label="Documents"
              floatClass="float-5"
              delay={0.8}
            />
          </div>
        </div>

        {/* MOBILE — simplified stacked pills */}
        <div className="flex flex-wrap gap-3 lg:hidden justify-center">
          {mobileCards.map((card, i) => (
            <FloatingCard
              key={card.label}
              color={card.color}
              icon={card.icon}
              label={card.label}
              delay={i * 0.15}
            />
          ))}
        </div>

      </div>
    </section>
  );
}