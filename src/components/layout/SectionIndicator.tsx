"use client";

import { useState, useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { sections } from "@/data/sections";

export default function SectionIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after initial hero animation
    const timeout = setTimeout(() => setIsVisible(true), 3000);

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
    });

    return () => clearTimeout(timeout);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group relative flex items-center"
          aria-label={section.label}
        >
          {/* Label tooltip */}
          <span className="absolute right-6 text-xs font-medium text-midnight/0 group-hover:text-midnight/60 transition-all duration-300 whitespace-nowrap pr-2">
            {section.label}
          </span>
          {/* Dot */}
          <span
            className={`block rounded-full transition-all duration-500 ${
              i === activeIndex
                ? "w-2.5 h-2.5 bg-sand shadow-[0_0_12px_rgba(185,134,102,0.5)]"
                : "w-1.5 h-1.5 bg-dark-sand/30 group-hover:bg-dark-sand/50"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
