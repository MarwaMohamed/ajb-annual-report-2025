"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import DonutChart from "@/components/ui/DonutChart";
import Rotating3DPlaceholder from "@/components/ui/Rotating3DPlaceholder";
import Image from "next/image";
import {
  heroMetrics,
  financialGrid,
  digitalMetrics,
  segmentPerformance,
  experienceMetrics,
  bankComparison,
} from "@/data/financials";

/* ──────────────────────────────────────────────
   Horizontal progress bar with scroll-triggered fill
   ────────────────────────────────────────────── */
function AnimatedBar({
  value,
  max = 100,
  label,
  suffix = "%",
  delay = 0,
}: {
  value: number;
  max?: number;
  label: string;
  suffix?: string;
  delay?: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!barRef.current || !fillRef.current) return;

    gsap.set(fillRef.current, { width: "0%" });

    // Set initial value text
    if (valueRef.current) {
      valueRef.current.textContent = `0${suffix}`;
    }

    const st = ScrollTrigger.create({
      trigger: barRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        // Animate bar fill
        gsap.to(fillRef.current, {
          width: `${Math.min((value / max) * 100, 100)}%`,
          duration: 1.6,
          delay,
          ease: "power2.out",
        });
        // Animate counter
        if (valueRef.current) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: value,
            duration: 1.6,
            delay,
            ease: "power2.out",
            onUpdate: () => {
              if (valueRef.current) {
                valueRef.current.textContent = `${Math.round(obj.val)}${suffix}`;
              }
            },
          });
        }
      },
    });

    return () => st.kill();
  }, [value, max, delay, suffix]);

  return (
    <div ref={barRef} className="group">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm text-midnight/50 font-light">{label}</span>
        <span ref={valueRef} className="text-lg font-bold text-dark-sand tabular-nums">
          {value}
          {suffix}
        </span>
      </div>
      <div className="h-1.5 bg-midnight/[0.06] rounded-full overflow-hidden">
        <div
          ref={fillRef}
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #8c684a 0%, #b27f59 60%, #c99a74 100%)",
            width: "0%",
          }}
        />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Scroll-revealed content block wrapper
   ────────────────────────────────────────────── */
function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.set(ref.current, { opacity: 0, y: 60 });

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(ref.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
        });
      },
    });

    return () => st.kill();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Section heading component (light mode)
   ────────────────────────────────────────────── */
function SectionHeading({
  number,
  subtitle,
  title,
}: {
  number: string;
  subtitle: string;
  title: string;
}) {
  return (
    <RevealBlock className="mb-12">
      <span className="text-dark-sand/20 text-6xl md:text-7xl font-black tracking-widest leading-none select-none">
        {number}
      </span>
      <p className="text-dark-sand text-xs font-medium uppercase tracking-[0.25em] mt-4 mb-2">
        {subtitle}
      </p>
      <h3 className="text-2xl md:text-3xl font-bold text-midnight/85 leading-tight">
        {title}
      </h3>
      <div className="mt-4 h-px w-16 bg-gradient-to-r from-dark-sand/40 to-transparent" />
    </RevealBlock>
  );
}

/* ──────────────────────────────────────────────
   Comparison Bar Row — horizontal bars, param.design style
   ────────────────────────────────────────────── */
function ComparisonBarRow({
  metric,
  before,
  after,
  beforeNum,
  afterNum,
  index,
}: {
  metric: string;
  before: string;
  after: string;
  beforeNum?: number;
  afterNum?: number;
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const leftBarRef = useRef<HTMLDivElement>(null);
  const rightBarRef = useRef<HTMLDivElement>(null);

  // Calculate bar widths as percentage of max
  const maxVal = Math.max(beforeNum || 0, afterNum || 0) || 1;
  const leftPct = ((beforeNum || 0) / maxVal) * 100;
  const rightPct = ((afterNum || 0) / maxVal) * 100;

  useEffect(() => {
    if (!rowRef.current) return;

    // Initial state
    gsap.set(rowRef.current, { opacity: 0, y: 20 });
    if (leftBarRef.current) gsap.set(leftBarRef.current, { width: "0%" });
    if (rightBarRef.current) gsap.set(rightBarRef.current, { width: "0%" });

    const st = ScrollTrigger.create({
      trigger: rowRef.current,
      start: "top 88%",
      once: true,
      onEnter: () => {
        const delay = index * 0.12;
        // Fade in row
        gsap.to(rowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay,
          ease: "power3.out",
        });
        // Animate bars
        if (leftBarRef.current) {
          gsap.to(leftBarRef.current, {
            width: `${leftPct}%`,
            duration: 1.2,
            delay: delay + 0.2,
            ease: "power2.out",
          });
        }
        if (rightBarRef.current) {
          gsap.to(rightBarRef.current, {
            width: `${rightPct}%`,
            duration: 1.2,
            delay: delay + 0.2,
            ease: "power2.out",
          });
        }
      },
    });

    return () => st.kill();
  }, [index, leftPct, rightPct]);

  return (
    <div ref={rowRef} className="flex items-center gap-3 md:gap-5 py-3" style={{ opacity: 0 }}>
      {/* Left side — 2020 value + bar (right-aligned, grows right-to-left) */}
      <div className="w-[38%] flex items-center justify-end gap-3">
        <span className="text-midnight/40 text-xs md:text-sm font-medium tabular-nums whitespace-nowrap shrink-0">
          {before}
        </span>
        <div className="relative w-full h-10 md:h-12 flex justify-end">
          <div
            ref={leftBarRef}
            className="h-full rounded-l-md bg-midnight/[0.12]"
            style={{ width: "0%" }}
          />
        </div>
      </div>

      {/* Center — metric label + connector */}
      <div className="w-[24%] flex flex-col items-center gap-1 shrink-0">
        <div className="w-px h-3 bg-midnight/[0.12]" />
        <span className="text-midnight/60 text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] text-center leading-tight">
          {metric}
        </span>
        <div className="w-px h-3 bg-midnight/[0.12]" />
      </div>

      {/* Right side — bar + 2025 value (left-aligned, grows left-to-right) */}
      <div className="w-[38%] flex items-center gap-3">
        <div className="relative w-full h-10 md:h-12 flex justify-start">
          <div
            ref={rightBarRef}
            className="h-full rounded-r-md"
            style={{
              width: "0%",
              background: "linear-gradient(90deg, #8c684a 0%, #b27f59 60%, #c99a74 100%)",
            }}
          />
        </div>
        <span className="text-dark-sand text-xs md:text-sm font-bold tabular-nums whitespace-nowrap shrink-0">
          {after}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN SECTION COMPONENT — LIGHT MODE
   ══════════════════════════════════════════════ */
export default function KeyFactsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* ── Scroll-linked 3D rotation ── */
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="key-facts"
      ref={sectionRef}
      className="section-light relative overflow-x-clip"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(185,134,102,0.04) 0%, transparent 50%), linear-gradient(180deg, #FAF8F5 0%, #F5F0EB 50%, #FAF8F5 100%)",
      }}
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23001421' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* ── MAIN SPLIT LAYOUT ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* ──────────────────────────────────
              LEFT COLUMN — Sticky 3D object
              ────────────────────────────────── */}
          <div
            ref={leftColRef}
            className="hidden lg:block lg:w-[40%] xl:w-[38%] self-stretch"
          >
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
              {/* 3D rotating placeholder — will be replaced with real 3D logo */}
              <Rotating3DPlaceholder
                scrollProgress={scrollProgress}
                className="w-full h-48"
              />

              {/* Scroll to explore label */}
              <div className="mt-4 text-center">
                <p className="text-dark-sand/60 text-xs font-semibold uppercase tracking-[0.25em]">
                  Scroll to explore
                </p>
                <div className="mt-4 flex items-center gap-3 justify-center">
                  <div className="w-12 h-[2px] bg-dark-sand/40" />
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-dark-sand/70"
                    style={{
                      transform: `scale(${1 + scrollProgress * 0.6})`,
                      opacity: 0.7 + scrollProgress * 0.3,
                    }}
                  />
                  <div className="w-12 h-[2px] bg-dark-sand/40" />
                </div>
              </div>

              {/* Vertical progress line */}
              <div className="mx-auto mt-6 w-[3px] h-[30vh] bg-midnight/[0.15] rounded-full">
                <div
                  className="w-full bg-gradient-to-b from-dark-sand to-dark-sand/40 rounded-full"
                  style={{
                    height: `${scrollProgress * 100}%`,
                    transition: "height 0.15s linear",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────
              RIGHT COLUMN — Scrolling content
              ────────────────────────────────── */}
          <div className="lg:w-[60%] xl:w-[62%] py-24 md:py-32 lg:py-40">
            {/* ═══ BLOCK 1: Key Facts Hero Metrics ═══ */}
            <div className="mb-32 md:mb-44">
              <SectionHeading
                number="01"
                subtitle="Key Facts & Figures"
                title="2025 At a Glance"
              />

              {/* Big hero counters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
                {heroMetrics.map((metric, i) => (
                  <RevealBlock key={i} delay={i * 0.15}>
                    <div className="relative p-5 rounded-lg transition-all duration-300 overflow-hidden">
                      <AnimatedCounter
                        value={metric.value}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                        decimals={metric.decimals}
                        className="text-[clamp(1.4rem,2.5vw,2rem)] text-gradient-sand-dark"
                        label={metric.label}
                        labelClassName="!text-midnight/40"
                      />
                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-dark-sand/20 rounded-tr-lg" />
                    </div>
                  </RevealBlock>
                ))}
              </div>
            </div>

            {/* ═══ BLOCK 2: Financial Performance ═══ */}
            <div className="mb-32 md:mb-44">
              <SectionHeading
                number="02"
                subtitle="Financial Performance"
                title="Delivering Sustainable Growth"
              />

              {/* Financial metrics grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {financialGrid.map((metric, i) => (
                  <RevealBlock key={i} delay={(i % 4) * 0.1}>
                    <div className="group relative p-5 rounded-lg transition-all duration-500">
                      <div className="flex items-baseline justify-between">
                        <AnimatedCounter
                          value={metric.value}
                          prefix={metric.prefix || ""}
                          suffix={metric.suffix}
                          decimals={metric.decimals}
                          className="text-[clamp(1.25rem,2.2vw,1.875rem)] text-gradient-sand-dark"
                        />
                      </div>
                      <p className="mt-3 text-xs font-light text-midnight/45 leading-relaxed">
                        {metric.label}
                      </p>
                      {/* Hover accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-dark-sand/0 via-dark-sand/25 to-dark-sand/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </RevealBlock>
                ))}
              </div>
            </div>

            {/* ═══ BLOCK 3: Digital Transformation + Income Segmentation ═══ */}
            <div className="mb-32 md:mb-44">
              <SectionHeading
                number="03"
                subtitle="Transformation & Segmentation"
                title="Digital Acceleration"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Digital metrics with animated bars */}
                <RevealBlock>
                  <div className="space-y-8">
                    {digitalMetrics.map((metric, i) => (
                      <AnimatedBar
                        key={i}
                        value={metric.value}
                        max={
                          metric.value > 100
                            ? metric.value * 1.2
                            : 100
                        }
                        label={metric.label}
                        suffix={metric.suffix}
                        delay={i * 0.2}
                      />
                    ))}
                  </div>
                </RevealBlock>

                {/* Donut chart */}
                <RevealBlock delay={0.2}>
                  <div className="flex flex-col items-center">
                    <DonutChart
                      segments={segmentPerformance.map((s) => ({
                        value: s.value,
                        label: s.label,
                        color: s.color,
                      }))}
                      size={200}
                      strokeWidth={28}
                      centerLabel="Income"
                      centerValue="2025"
                    />
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mt-8">
                      {segmentPerformance.map((seg, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <span
                            className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                            style={{ backgroundColor: seg.color }}
                          />
                          <span className="text-xs text-midnight/45 font-light">
                            {seg.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </RevealBlock>
              </div>
            </div>

            {/* ═══ BLOCK 4: Bank Overview — Comparison Table ═══ */}
            <div className="mb-16">
              {/* ── Centered header (param.design style) ── */}
              <RevealBlock className="flex flex-col items-center text-center mb-10">
                <span className="text-dark-sand/40 text-xs font-semibold uppercase tracking-[0.3em] mb-2">
                  Bank Overview
                </span>
                <h3 className="text-midnight/85 text-[clamp(1.6rem,3.5vw,2.75rem)] font-bold uppercase tracking-[0.08em] leading-tight">
                  Milestones of Growth
                </h3>
              </RevealBlock>

              {/* ── Header row: 2020 | VS | 2025 ── */}
              <RevealBlock delay={0.1} className="mb-6">
                <div className="flex items-center gap-3 md:gap-5">
                  {/* 2020 side */}
                  <div className="w-[38%] flex justify-end">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-midnight/[0.12] text-midnight/40 text-xs md:text-sm font-semibold tracking-[0.15em] uppercase">
                      2020
                    </span>
                  </div>
                  {/* VS connector */}
                  <div className="w-[24%] flex flex-col items-center gap-1">
                    <div className="w-px h-6 bg-gradient-to-b from-transparent to-midnight/[0.12]" />
                    <span className="text-dark-sand/60 text-[10px] font-bold tracking-[0.3em] uppercase">VS</span>
                    <div className="w-px h-6 bg-gradient-to-b from-midnight/[0.12] to-transparent" />
                  </div>
                  {/* 2025 side */}
                  <div className="w-[38%] flex justify-start">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-dark-sand/30 text-dark-sand text-xs md:text-sm font-semibold tracking-[0.15em] uppercase">
                      2025
                    </span>
                  </div>
                </div>
              </RevealBlock>

              {/* ── Horizontal bar comparison rows ── */}
              <div className="space-y-1">
                {bankComparison.map((row, i) => (
                  <ComparisonBarRow
                    key={i}
                    metric={row.metric}
                    before={row.before}
                    after={row.after}
                    beforeNum={row.beforeNum}
                    afterNum={row.afterNum}
                    index={i}
                  />
                ))}
              </div>

              {/* ── Experience metrics row (kept) ── */}
              <RevealBlock delay={0.3} className="mt-16">
                <div className="flex flex-wrap justify-center gap-12 md:gap-20 p-8 rounded-lg">
                  {experienceMetrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <AnimatedCounter
                        value={metric.value}
                        suffix={metric.suffix || ""}
                        className="text-2xl sm:text-3xl text-gradient-sand-dark"
                        label={metric.label}
                        labelClassName="!text-midnight/40"
                      />
                      {metric.previousValue && (
                        <p className="text-[10px] text-dark-sand/60 mt-2">
                          vs {metric.previousValue} prior year
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </RevealBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAF8F5] to-transparent pointer-events-none" />
    </section>
  );
}
