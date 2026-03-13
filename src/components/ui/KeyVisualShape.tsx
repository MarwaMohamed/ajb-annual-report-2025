"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// The ajb key visual parallelogram shape path (from Mask group.svg)
const SHAPE_PATH =
  "M0 0L1026.72 0C1078.44 0 1122.45 35.3757 1133.35 85.913L1276 748.135C1222.84 709.802 1158.55 687.529 1089.01 687.529L299.277 687.529L0 0Z";

interface KeyVisualShapeProps {
  variant?: "outline" | "filled" | "gradient" | "image";
  className?: string;
  width?: number;
  height?: number;
  imageSrc?: string;
  animate?: boolean;
  strokeWidth?: number;
  opacity?: number;
}

export default function KeyVisualShape({
  variant = "outline",
  className = "",
  width = 1276,
  height = 748,
  imageSrc,
  animate = true,
  strokeWidth = 2,
  opacity = 0.937,
}: KeyVisualShapeProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const clipId = useRef(`kvs-${Math.random().toString(36).slice(2, 8)}`);

  useEffect(() => {
    if (!animate || !pathRef.current) return;

    if (variant === "outline") {
      const path = pathRef.current;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      const st = ScrollTrigger.create({
        trigger: path,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: "power2.inOut",
          });
        },
      });

      return () => st.kill();
    }
  }, [animate, variant]);

  if (variant === "image" && imageSrc) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={className}
        fill="none"
      >
        <defs>
          <clipPath id={clipId.current}>
            <path d={SHAPE_PATH} />
          </clipPath>
        </defs>
        <image
          href={imageSrc}
          width={width}
          height={height}
          clipPath={`url(#${clipId.current})`}
          preserveAspectRatio="xMidYMid slice"
        />
        <path
          d={SHAPE_PATH}
          stroke="#B98666"
          strokeWidth={strokeWidth}
          strokeOpacity={opacity}
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
    >
      {variant === "gradient" && (
        <defs>
          <linearGradient id={`grad-${clipId.current}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8c684a" />
            <stop offset="50%" stopColor="#B98666" />
            <stop offset="100%" stopColor="#c99a74" />
          </linearGradient>
        </defs>
      )}
      <path
        ref={pathRef}
        d={SHAPE_PATH}
        stroke={variant === "gradient" ? `url(#grad-${clipId.current})` : "#B98666"}
        strokeWidth={strokeWidth}
        strokeOpacity={variant === "outline" ? opacity : 1}
        fill={variant === "gradient" ? `url(#grad-${clipId.current})` : variant === "filled" ? "#B98666" : "none"}
        fillOpacity={variant === "filled" ? 0.15 : variant === "gradient" ? 0.2 : 0}
      />
    </svg>
  );
}

export { SHAPE_PATH };
