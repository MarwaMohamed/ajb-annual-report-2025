"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Rotating3DPlaceholderProps {
  scrollProgress?: number;
  className?: string;
}

/**
 * AJB logo with scroll-linked animation in brand sand/brown color.
 */
export default function Rotating3DPlaceholder({
  scrollProgress = 0,
  className = "",
}: Rotating3DPlaceholderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply scroll-linked subtle animation
  useEffect(() => {
    if (!containerRef.current) return;
    const logo = containerRef.current.querySelector(".logo-inner");
    if (!logo) return;

    gsap.set(logo, {
      rotateY: scrollProgress * 15 - 7.5,
      rotateX: scrollProgress * 5,
      scale: 1 + scrollProgress * 0.05,
    });
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ perspective: "1000px" }}
    >
      {/* Ambient glow behind the logo */}
      <div
        className="absolute w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(140,104,74,0.4) 0%, rgba(178,127,89,0.15) 40%, transparent 70%)",
        }}
      />

      {/* Logo with scroll animation */}
      <div
        className="logo-inner relative w-64 h-32"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${scrollProgress * 15 - 7.5}deg) rotateX(${scrollProgress * 5}deg) scale(${1 + scrollProgress * 0.05})`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <Image
          src="/images/logo/ajb-white.png"
          alt="Aljazira Bank logo"
          fill
          className="object-contain drop-shadow-lg"
          sizes="256px"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(43%) sepia(20%) saturate(800%) hue-rotate(350deg) brightness(90%) contrast(90%)",
          }}
        />
      </div>

      {/* Subtle orbiting ring */}
      <div
        className="absolute w-80 h-80 rounded-full border border-dark-sand/8"
        style={{
          transform: `rotateX(75deg) rotateZ(${scrollProgress * 120}deg)`,
          transformStyle: "preserve-3d",
        }}
      />
    </div>
  );
}
