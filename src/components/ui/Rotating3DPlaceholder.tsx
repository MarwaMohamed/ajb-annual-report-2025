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
 * 3D rotating AJB shape image linked to scroll progress.
 */
export default function Rotating3DPlaceholder({
  scrollProgress = 0,
  className = "",
}: Rotating3DPlaceholderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply scroll-linked rotation
  useEffect(() => {
    if (!containerRef.current) return;
    const shape = containerRef.current.querySelector(".shape-inner");
    if (!shape) return;

    gsap.set(shape, {
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
      {/* Ambient glow behind the shape */}
      <div
        className="absolute w-96 h-[28rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(0,20,33,0.4) 0%, rgba(0,20,33,0.15) 40%, transparent 70%)",
        }}
      />

      {/* 3D rotating image */}
      <div
        className="shape-inner relative w-96 h-[28rem]"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${scrollProgress * 360}deg) rotateX(${15 + scrollProgress * 20}deg)`,
          transition: "transform 0.1s linear",
        }}
      >
        <Image
          src="/images/shapes/ajb-3d-shape-clean.png"
          alt="AJB 3D logo shape"
          fill
          className="object-contain drop-shadow-2xl"
          sizes="384px"
        />
      </div>

      {/* Orbiting ring */}
      <div
        className="absolute w-[26rem] h-[26rem] rounded-full border border-dark-sand/10"
        style={{
          transform: `rotateX(70deg) rotateZ(${scrollProgress * 180}deg)`,
          transformStyle: "preserve-3d",
        }}
      />
    </div>
  );
}
