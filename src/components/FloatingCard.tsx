"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import { ReactNode, useRef } from "react";

type CardVariant = "default" | "portal";

interface PortalUser {
  name: string;
  avatar: string;
  message: string;
  meta: string;
}

interface FloatingCardProps {
  color: "blue" | "orange" | "dark" | "light-purple";
  icon: ReactNode;
  label: string;
  variant?: CardVariant;
  floatClass?: string;
  portalUser?: PortalUser;
  delay?: number;
}

const colorMap = {
  blue: { bg: "bg-[#3d5cf5]", text: "text-white", iconBg: "bg-white/20" },
  orange: { bg: "bg-[#e07b39]", text: "text-white", iconBg: "bg-white/20" },
  dark: { bg: "bg-[#1e2140]", text: "text-white", iconBg: "bg-white/10" },
  "light-purple": {
    bg: "bg-[#dde0f5]",
    text: "text-[#2d2f4e]",
    iconBg: "bg-[#3d5cf5]/20",
  },
};

const SPRING_CONFIG = { stiffness: 300, damping: 30 };
const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

interface TiltCardProps {
  children: ReactNode;
  className: string;
}

function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-50, 50], [15, -15]),
    SPRING_CONFIG,
  );
  const rotateY = useSpring(
    useTransform(x, [-50, 50], [-15, 15]),
    SPRING_CONFIG,
  );

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function FloatingCard({
  color,
  icon,
  label,
  variant = "default",
  floatClass = "float-1",
  portalUser,
  delay = 0,
}: FloatingCardProps) {
  const colors = colorMap[color];

  const entranceProps = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  };

  if (variant === "portal" && portalUser) {
    return (
      <motion.div {...entranceProps} className={floatClass}>
        <TiltCard
          className={`${colors.bg} rounded-2xl px-5 py-4 shadow-xl w-75 cursor-pointer`}
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-14 bg-[#e07b39] rounded-full shrink-0" />
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gray-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={portalUser.avatar}
                alt={portalUser.name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-bold text-base ${colors.text}`}>
                {portalUser.name}
              </p>
              <p className={`text-sm ${colors.text} opacity-80`}>
                {portalUser.message}
              </p>
              <p className={`text-xs ${colors.text} opacity-50 mt-0.5`}>
                {portalUser.meta}
              </p>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    );
  }

  return (
    <motion.div {...entranceProps} className={floatClass}>
      <TiltCard
        className={`${colors.bg} rounded-full px-10 py-5 shadow-xl flex items-center gap-4 cursor-pointer w-fit`}
      >
        <div
          className={`${colors.iconBg} rounded-full p-2.5 flex items-center justify-center`}
        >
          <span className={colors.text}>{icon}</span>
        </div>
        <span className={`${colors.text} font-bold text-2xl tracking-wide`}>
          {label}
        </span>
      </TiltCard>
    </motion.div>
  );
}
