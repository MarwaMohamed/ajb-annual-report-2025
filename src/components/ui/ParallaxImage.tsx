"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  overlay?: boolean;
  overlayColor?: string;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.3,
  priority = false,
  fill = true,
  width,
  height,
  overlay = false,
  overlayColor = "rgba(0, 20, 33, 0.6)",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const yMovement = speed * 100;

    gsap.set(imageRef.current, { y: -yMovement / 2 });

    const st = gsap.to(imageRef.current, {
      y: yMovement / 2,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      st.scrollTrigger?.kill();
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{
          top: "-15%",
          bottom: "-15%",
        }}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            priority={priority}
            sizes="100vw"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-cover w-full h-full"
            priority={priority}
          />
        )}
      </div>
      {overlay && (
        <div
          className="absolute inset-0 z-10"
          style={{ background: overlayColor }}
        />
      )}
    </div>
  );
}
