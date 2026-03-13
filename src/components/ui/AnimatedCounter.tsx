"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  displayText?: string;
  className?: string;
  labelClassName?: string;
  label?: string;
  trigger?: "scroll" | "immediate";
}

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2,
  displayText,
  className = "",
  labelClassName = "",
  label,
  trigger = "scroll",
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!counterRef.current) return;
    const el = counterRef.current;

    // If displayText, just show it statically
    if (displayText) {
      el.textContent = `${prefix}${displayText}${suffix}`;
      return;
    }

    // Set initial value
    el.textContent = `${prefix}0${suffix}`;

    const animate = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          const formatted = obj.val
            .toFixed(decimals)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          el.textContent = `${prefix}${formatted}${suffix}`;
        },
      });
    };

    if (trigger === "immediate") {
      animate();
      return;
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: animate,
    });

    return () => st.kill();
  }, [value, prefix, suffix, decimals, duration, displayText, trigger]);

  return (
    <div className="flex flex-col">
      <span
        ref={counterRef}
        className={`font-tajawal font-black tabular-nums tracking-tight whitespace-nowrap ${className}`}
      />
      {label && (
        <span className={`mt-2 text-sm font-light tracking-wide uppercase text-white/60 ${labelClassName}`}>
          {label}
        </span>
      )}
    </div>
  );
}
