"use client";

import AnimatedCounter from "./AnimatedCounter";

interface StatCardProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
  displayText?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
  previousValue?: number;
}

export default function StatCard({
  value,
  prefix = "",
  suffix = "",
  label,
  decimals = 0,
  displayText,
  className = "",
  size = "md",
  previousValue,
}: StatCardProps) {
  const sizeClasses = {
    sm: "text-counter-lg",
    md: "text-counter-lg",
    lg: "text-display-2",
    hero: "text-counter-hero",
  };

  const growth = previousValue !== undefined && previousValue > 0
    ? ((value - previousValue) / previousValue * 100).toFixed(0)
    : null;

  return (
    <div className={`flex flex-col ${className}`}>
      <AnimatedCounter
        value={value}
        prefix={prefix}
        suffix={suffix}
        decimals={decimals}
        displayText={displayText}
        className={`${sizeClasses[size]} text-gradient-sand`}
      />
      <span className="mt-2 text-sm font-light tracking-wide text-white/60 leading-snug">
        {label}
      </span>
      {growth && (
        <span className="mt-1 text-xs text-sand/80 font-medium">
          +{growth}% vs prior year
        </span>
      )}
    </div>
  );
}
