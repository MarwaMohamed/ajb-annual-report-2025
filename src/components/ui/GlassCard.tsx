"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "sand" | "dark";
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  variant = "default",
  hover = true,
  delay = 0,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.set(ref.current, { opacity: 0, y: 30 });

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
        });
      },
    });

    return () => st.kill();
  }, [delay]);

  const variants = {
    default: "bg-white/[0.04] border border-white/[0.08] backdrop-blur-[12px]",
    sand: "bg-[rgba(185,134,102,0.06)] border border-[rgba(185,134,102,0.15)] backdrop-blur-[12px]",
    dark: "bg-black/30 border border-white/[0.06] backdrop-blur-[12px]",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-sm p-6 md:p-8 transition-all duration-500",
        variants[variant],
        hover && "hover:-translate-y-2 hover:border-sand/30 hover:shadow-[0_0_40px_rgba(185,134,102,0.1)]",
        className
      )}
    >
      {children}
    </div>
  );
}
