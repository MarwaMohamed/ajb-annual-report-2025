"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import CopperLine from "./CopperLine";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  showLine?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  className = "",
  align = "left",
  showLine = true,
}: SectionTitleProps) {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const els = titleRef.current.querySelectorAll(".st-animate");

    gsap.set(els, { opacity: 0, y: 30 });

    const st = ScrollTrigger.create({
      trigger: titleRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      ref={titleRef}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {showLine && (
        <div className={`st-animate mb-6 ${align === "center" ? "flex justify-center" : ""}`}>
          <CopperLine length="60px" thickness={2} />
        </div>
      )}
      {subtitle && (
        <p className="st-animate text-sand/80 text-sm font-medium uppercase tracking-[0.2em] mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="st-animate text-display-2 font-bold text-white leading-tight">
        {title}
      </h2>
    </div>
  );
}
