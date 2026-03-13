"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Segment {
  value: number;
  label: string;
  color: string;
}

interface DonutChartProps {
  segments: Segment[];
  size?: number;
  strokeWidth?: number;
  className?: string;
  centerLabel?: string;
  centerValue?: string;
}

export default function DonutChart({
  segments,
  size = 200,
  strokeWidth = 28,
  className = "",
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  useEffect(() => {
    if (!svgRef.current) return;
    const circles = svgRef.current.querySelectorAll(".donut-segment");

    gsap.set(circles, { strokeDashoffset: circumference });

    const st = ScrollTrigger.create({
      trigger: svgRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        let cumulativeDelay = 0;
        circles.forEach((circle, i) => {
          const segmentLength = (segments[i].value / total) * circumference;
          const targetOffset = circumference - segmentLength;
          gsap.to(circle, {
            strokeDashoffset: targetOffset,
            duration: 1.2,
            delay: cumulativeDelay,
            ease: "power2.out",
          });
          cumulativeDelay += 0.15;
        });
      },
    });

    return () => st.kill();
  }, [segments, circumference, total]);

  let cumulativeRotation = -90; // Start from top

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0,20,33,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Segments */}
        {segments.map((segment, i) => {
          const rotation = cumulativeRotation;
          cumulativeRotation += (segment.value / total) * 360;

          return (
            <circle
              key={i}
              className="donut-segment"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="butt"
              transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
            />
          );
        })}
      </svg>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && (
            <span className="text-xl font-black text-midnight/80 whitespace-nowrap">{centerValue}</span>
          )}
          {centerLabel && (
            <span className="text-xs text-midnight/40 uppercase tracking-wider mt-1">{centerLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
