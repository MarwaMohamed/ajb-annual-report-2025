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
   Comparison Table Row — animated on scroll
   ────────────────────────────────────────────── */
function ComparisonRow({
  metric,
  before,
  after,
  index,
}: {
  metric: string;
  before: string;
  after: string;
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowRef.current) return;
    gsap.set(rowRef.current, { opacity: 0, y: 30 });

    const st = ScrollTrigger.create({
      trigger: rowRef.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(rowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.08,
          ease: "power3.out",
        });
      },
    });

    return () => st.kill();
  }, [index]);

  return (
    <div
      ref={rowRef}
      className="w-full min-h-[56px]"
      style={{ display: "flex", opacity: 0 }}
    >
      {/* Metric label — 40% */}
      <div className="w-2/5 pl-3 pr-3 pb-4 pt-5 border-r-2 border-midnight/[0.06] border-b-2" style={{ display: "flex", alignItems: "flex-end" }}>
        <span className="text-midnight/70 text-sm md:text-[15px] font-medium leading-snug">
          {metric}
        </span>
      </div>
      {/* Before value — 30% */}
      <div className="w-[30%] px-3 pb-4 pt-5 border-r-2 border-midnight/[0.06] border-b-2" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="text-midnight/50 text-sm md:text-base font-medium tabular-nums text-center">
          {before}
        </span>
      </div>
      {/* After value — 30% */}
      <div className="w-[30%] px-3 pb-4 pt-5 border-r-2 border-midnight/[0.06] border-b-2" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="text-dark-sand font-bold text-sm md:text-base tabular-nums text-center">
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
      className="section-light relative overflow-hidden"
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
            className="hidden lg:flex lg:w-[40%] xl:w-[38%]"
          >
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
              {/* 3D rotating placeholder — will be replaced with real 3D logo */}
              <Rotating3DPlaceholder
                scrollProgress={scrollProgress}
                className="w-full h-80"
              />

              {/* Scroll to explore label */}
              <div className="mt-10 text-center">
                <p className="text-dark-sand/60 text-xs font-semibold uppercase tracking-[0.25em]">
                  Scroll to explore
                </p>
                <div className="mt-4 flex items-center gap-3 justify-center">
                  <div className="w-10 h-px bg-dark-sand/25" />
                  <div
                    className="w-2 h-2 rounded-full bg-dark-sand/50"
                    style={{
                      transform: `scale(${1 + scrollProgress * 0.6})`,
                      opacity: 0.5 + scrollProgress * 0.5,
                    }}
                  />
                  <div className="w-10 h-px bg-dark-sand/25" />
                </div>
              </div>

              {/* Vertical progress line */}
              <div className="absolute left-1/2 bottom-8 w-[2px] h-28 bg-midnight/[0.08] -translate-x-1/2 rounded-full">
                <div
                  className="w-full bg-gradient-to-b from-dark-sand/60 to-dark-sand/20 rounded-full"
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
                    <div className="relative p-5 rounded-lg border border-midnight/[0.06] bg-white/80 hover:bg-white hover:shadow-sm transition-all duration-300 overflow-hidden">
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
                    <div className="group relative p-5 rounded-lg border border-midnight/[0.06] bg-white/80 hover:bg-white hover:border-dark-sand/25 hover:shadow-sm transition-all duration-500">
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
                  AJB&apos;s Growth Revolution
                </h3>
              </RevealBlock>

              {/* ── Logo icon area ── */}
              <RevealBlock delay={0.15} className="flex justify-center mb-12">
                <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                  {/* Background glow */}
                  <div
                    className="absolute inset-0 rounded-full opacity-[0.06]"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, #8c684a 0%, transparent 70%)",
                    }}
                  />
                  {/* Logo */}
                  <Image
                    src="/images/logo/ajb-white.png"
                    alt="Bank AlJazira"
                    width={240}
                    height={240}
                    className="relative z-10 w-40 h-40 md:w-56 md:h-56 object-contain brightness-0 opacity-[0.08]"
                  />
                </div>
              </RevealBlock>

              {/* ── Comparison Table ── */}
              <div className="w-full px-0 md:px-4">
                {/* Table header row */}
                <RevealBlock delay={0.2}>
                  <div className="w-full min-h-[44px]" style={{ display: "flex" }}>
                    <div className="w-2/5 pl-3 pr-3 pb-3 border-r-2 border-midnight/[0.08]" style={{ display: "flex", alignItems: "flex-end" }}>
                      <span className="text-midnight/30 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em]">
                        Metrics
                      </span>
                    </div>
                    <div className="w-[30%] px-3 pb-3 border-r-2 border-midnight/[0.08]" style={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                      <span className="text-midnight/30 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em]">
                        2020
                      </span>
                    </div>
                    <div className="w-[30%] px-3 pb-3 border-r-2 border-midnight/[0.08]" style={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                      <span className="text-dark-sand/60 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em]">
                        2025
                      </span>
                    </div>
                  </div>
                </RevealBlock>

                {/* Data rows — animated sequentially */}
                {bankComparison.map((row, i) => (
                  <ComparisonRow
                    key={i}
                    metric={row.metric}
                    before={row.before}
                    after={row.after}
                    index={i}
                  />
                ))}
              </div>

              {/* ── Experience metrics row (kept) ── */}
              <RevealBlock delay={0.3} className="mt-16">
                <div className="flex flex-wrap justify-center gap-12 md:gap-20 p-8 rounded-lg border border-midnight/[0.06] bg-white/80">
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
