"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface CopperLineProps {
  direction?: "horizontal" | "vertical" | "diagonal";
  className?: string;
  length?: string;
  thickness?: number;
  scrub?: boolean;
}

export default function CopperLine({
  direction = "horizontal",
  className = "",
  length = "100%",
  thickness = 1,
  scrub = false,
}: CopperLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const el = lineRef.current;

    const isVertical = direction === "vertical";
    const isDiagonal = direction === "diagonal";

    if (isDiagonal) {
      gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
    } else if (isVertical) {
      gsap.set(el, { scaleY: 0, transformOrigin: "top center" });
    } else {
      gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
    }

    const animProps = isVertical ? { scaleY: 1 } : { scaleX: 1 };

    if (scrub) {
      gsap.to(el, {
        ...animProps,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    } else {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(el, {
            ...animProps,
            duration: 1.2,
            ease: "power2.inOut",
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [direction, scrub]);

  const styles: React.CSSProperties =
    direction === "vertical"
      ? { width: thickness, height: length }
      : direction === "diagonal"
        ? { width: length, height: thickness, transform: "rotate(-15deg)" }
        : { width: length, height: thickness };

  return (
    <div
      ref={lineRef}
      className={`bg-gradient-to-r from-dark-sand via-sand to-sand-light ${className}`}
      style={styles}
    />
  );
}
