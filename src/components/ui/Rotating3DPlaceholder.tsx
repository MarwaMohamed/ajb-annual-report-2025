"use client";

import { useRef, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Rotating3DPlaceholderProps {
  scrollProgress?: number;
  className?: string;
}

/**
 * CSS 3D rotating geometric shape placeholder (light mode).
 * Resembles the AJB angular motif — a parallelogram prism
 * that rotates on Y-axis linked to scroll progress.
 * Replace with actual 3D model later.
 */
export default function Rotating3DPlaceholder({
  scrollProgress = 0,
  className = "",
}: Rotating3DPlaceholderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply scroll-linked rotation
  useEffect(() => {
    if (!containerRef.current) return;
    const cube = containerRef.current.querySelector(".prism-inner");
    if (!cube) return;

    gsap.set(cube, {
      rotateY: scrollProgress * 360,
      rotateX: 15 + scrollProgress * 20,
    });
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ perspective: "800px" }}
    >
      {/* Ambient glow behind the shape — warm sand on light bg */}
      <div
        className="absolute w-64 h-64 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(140,104,74,0.25) 0%, rgba(185,134,102,0.1) 40%, transparent 70%)",
        }}
      />

      {/* 3D Prism shape */}
      <div
        className="prism-inner relative w-48 h-48"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${scrollProgress * 360}deg) rotateX(${15 + scrollProgress * 20}deg)`,
          transition: "transform 0.1s linear",
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translateZ(48px)",
            background:
              "linear-gradient(135deg, rgba(140,104,74,0.18) 0%, rgba(185,134,102,0.1) 100%)",
            border: "1px solid rgba(140,104,74,0.35)",
            backdropFilter: "blur(8px)",
            clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
          }}
        />
        {/* Back face */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translateZ(-48px) rotateY(180deg)",
            background:
              "linear-gradient(135deg, rgba(140,104,74,0.12) 0%, rgba(185,134,102,0.06) 100%)",
            border: "1px solid rgba(140,104,74,0.25)",
            clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
          }}
        />
        {/* Right face */}
        <div
          className="absolute inset-0"
          style={{
            width: "96px",
            left: "50%",
            transform: "translateX(48px) rotateY(90deg)",
            transformOrigin: "left center",
            background:
              "linear-gradient(180deg, rgba(140,104,74,0.22) 0%, rgba(185,134,102,0.1) 100%)",
            border: "1px solid rgba(140,104,74,0.3)",
          }}
        />
        {/* Left face */}
        <div
          className="absolute inset-0"
          style={{
            width: "96px",
            transform: "translateX(-48px) rotateY(-90deg)",
            transformOrigin: "right center",
            background:
              "linear-gradient(180deg, rgba(140,104,74,0.15) 0%, rgba(185,134,102,0.08) 100%)",
            border: "1px solid rgba(140,104,74,0.25)",
          }}
        />
        {/* Top face */}
        <div
          className="absolute inset-0"
          style={{
            height: "96px",
            transform: "translateY(-48px) rotateX(90deg)",
            transformOrigin: "center bottom",
            background:
              "linear-gradient(135deg, rgba(140,104,74,0.28) 0%, rgba(185,134,102,0.12) 100%)",
            border: "1px solid rgba(140,104,74,0.4)",
          }}
        />
        {/* Bottom face */}
        <div
          className="absolute inset-0"
          style={{
            height: "96px",
            top: "auto",
            bottom: 0,
            transform: "translateY(48px) rotateX(-90deg)",
            transformOrigin: "center top",
            background:
              "linear-gradient(135deg, rgba(140,104,74,0.1) 0%, rgba(185,134,102,0.05) 100%)",
            border: "1px solid rgba(140,104,74,0.18)",
          }}
        />

        {/* Inner AJB lettermark silhouette */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: "translateZ(49px)" }}
        >
          <span
            className="text-4xl font-black tracking-widest"
            style={{
              background: "linear-gradient(135deg, #8c684a 0%, #6b4c33 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: 0.7,
            }}
          >
            ajb
          </span>
        </div>
      </div>

      {/* Orbiting ring */}
      <div
        className="absolute w-72 h-72 rounded-full border border-dark-sand/15"
        style={{
          transform: `rotateX(70deg) rotateZ(${scrollProgress * 180}deg)`,
          transformStyle: "preserve-3d",
        }}
      />
    </div>
  );
}
