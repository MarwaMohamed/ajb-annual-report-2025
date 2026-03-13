"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CopperLine from "@/components/ui/CopperLine";
import {
  Leaf,
  Heart,
  ShieldCheck,
  Award,
} from "lucide-react";
import {
  greenFinancing,
  socialImpact,
  certifications,
  awards,
  paperlessMetric,
} from "@/data/sustainability";

/* ──────────────────────────────────────────────
   Inline SVG botanical illustrations
   Minimal, clean, realistic line-art leaves
   ────────────────────────────────────────────── */

function BotanicalLeaf1({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 180" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Main leaf shape */}
      <path
        d="M60 170 C60 170 60 10 60 10 C30 30 10 70 15 110 C18 135 35 155 60 170Z"
        stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"
      />
      <path
        d="M60 170 C60 170 60 10 60 10 C90 30 110 70 105 110 C102 135 85 155 60 170Z"
        stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"
      />
      {/* Central vein */}
      <line x1="60" y1="15" x2="60" y2="165" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      {/* Side veins */}
      <path d="M60 40 C48 48 35 55 25 58" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M60 40 C72 48 85 55 95 58" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M60 65 C46 74 30 82 20 86" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M60 65 C74 74 90 82 100 86" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M60 90 C48 98 34 105 24 110" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M60 90 C72 98 86 105 96 110" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M60 115 C50 122 40 128 32 132" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M60 115 C70 122 80 128 88 132" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function BotanicalLeaf2({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Elongated willow-style leaf */}
      <path
        d="M50 190 C50 190 50 15 50 15 C25 40 15 80 18 120 C20 148 32 172 50 190Z"
        stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinecap="round"
      />
      <path
        d="M50 190 C50 190 50 15 50 15 C75 40 85 80 82 120 C80 148 68 172 50 190Z"
        stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinecap="round"
      />
      {/* Central vein */}
      <line x1="50" y1="20" x2="50" y2="185" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      {/* Gentle curve veins */}
      <path d="M50 50 C40 58 30 64 22 67" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />
      <path d="M50 50 C60 58 70 64 78 67" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />
      <path d="M50 80 C38 89 28 96 21 100" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />
      <path d="M50 80 C62 89 72 96 79 100" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />
      <path d="M50 110 C40 118 32 124 25 128" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />
      <path d="M50 110 C60 118 68 124 75 128" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />
      <path d="M50 140 C42 147 36 152 30 155" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />
      <path d="M50 140 C58 147 64 152 70 155" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function BotanicalBranch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 300" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Main stem with gentle curve */}
      <path
        d="M100 290 C100 260 95 200 98 150 C100 110 105 60 100 20"
        stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"
      />
      {/* Left leaves */}
      <path d="M98 60 C80 50 60 55 55 70 C52 80 60 88 75 82 C85 78 92 68 98 60Z"
        stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M98 60 C82 70 70 68 75 82" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />

      <path d="M96 120 C76 112 56 118 52 135 C50 146 58 153 74 146 C86 140 92 130 96 120Z"
        stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M96 120 C78 132 66 130 74 146" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />

      <path d="M97 185 C78 178 60 185 57 200 C55 210 64 216 78 209 C88 204 94 194 97 185Z"
        stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />

      {/* Right leaves */}
      <path d="M102 90 C120 80 140 86 143 102 C145 112 137 118 122 112 C112 107 106 98 102 90Z"
        stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M102 90 C118 100 130 98 122 112" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" />

      <path d="M100 155 C118 148 138 155 140 170 C141 180 133 185 118 178 C108 173 103 163 100 155Z"
        stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />

      <path d="M99 225 C116 218 134 224 136 238 C137 247 130 252 116 246 C107 242 102 234 99 225Z"
        stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function BotanicalSprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Small delicate sprig */}
      <path d="M40 155 C40 130 42 90 40 50 C39 30 40 15 40 5"
        stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* Tiny leaves */}
      <path d="M40 30 C30 24 22 28 22 36 C22 42 28 44 35 40 C38 38 40 34 40 30Z"
        stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M40 30 C50 24 58 28 58 36 C58 42 52 44 45 40 C42 38 40 34 40 30Z"
        stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M40 60 C28 55 20 60 21 70 C22 76 28 78 36 73 C39 70 40 65 40 60Z"
        stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M40 60 C52 55 60 60 59 70 C58 76 52 78 44 73 C41 70 40 65 40 60Z"
        stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M40 90 C30 86 24 90 25 98 C26 103 31 105 37 100 C39 98 40 94 40 90Z"
        stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M40 90 C50 86 56 90 55 98 C54 103 49 105 43 100 C41 98 40 94 40 90Z"
        stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M40 118 C32 114 26 118 27 125 C28 130 32 131 37 127 C39 125 40 122 40 118Z"
        stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M40 118 C48 114 54 118 53 125 C52 130 48 131 43 127 C41 125 40 122 40 118Z"
        stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function BotanicalFern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 220" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Fern frond — curved main stem */}
      <path d="M70 210 C68 180 65 140 62 100 C60 70 64 40 70 10"
        stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      {/* Left pinnae */}
      <path d="M68 35 C55 28 42 32 40 42 C39 48 45 52 55 48 C62 45 66 40 68 35Z"
        stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M66 60 C52 54 38 58 37 68 C36 75 42 78 54 73 C60 70 64 65 66 60Z"
        stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M64 88 C50 82 38 87 37 96 C36 103 42 106 54 100 C60 97 63 92 64 88Z"
        stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M63 115 C50 110 40 115 40 124 C40 130 46 133 56 127 C61 124 63 119 63 115Z"
        stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      {/* Right pinnae */}
      <path d="M69 48 C82 42 94 46 95 56 C96 62 90 65 80 60 C74 57 71 52 69 48Z"
        stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M67 75 C80 69 94 74 94 84 C94 90 88 93 78 87 C72 83 69 79 67 75Z"
        stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M65 102 C78 97 90 102 90 112 C90 118 84 120 75 115 C70 112 67 107 65 102Z"
        stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M64 130 C76 126 86 130 86 140 C86 146 80 148 72 143 C68 140 65 135 64 130Z"
        stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Botanical illustrations config — positions
   around the title area
   ────────────────────────────────────────────── */
const botanicalElements = [
  // Top-left cluster
  { Component: BotanicalBranch, x: "-6%", y: "-12%", w: "220px", rotate: -12, delay: 0 },
  { Component: BotanicalSprig, x: "10%", y: "-20%", w: "85px", rotate: 18, delay: 0.15 },
  // Top-right cluster
  { Component: BotanicalLeaf1, x: "82%", y: "-15%", w: "110px", rotate: 22, delay: 0.1 },
  { Component: BotanicalFern, x: "90%", y: "0%", w: "140px", rotate: -10, delay: 0.25 },
  // Left side
  { Component: BotanicalLeaf2, x: "-3%", y: "25%", w: "95px", rotate: -20, delay: 0.2 },
  // Right side
  { Component: BotanicalSprig, x: "93%", y: "35%", w: "80px", rotate: 12, delay: 0.3 },
  // Bottom-left
  { Component: BotanicalFern, x: "0%", y: "72%", w: "130px", rotate: 22, delay: 0.18 },
  // Bottom-right
  { Component: BotanicalLeaf1, x: "85%", y: "68%", w: "100px", rotate: -15, delay: 0.22 },
  { Component: BotanicalBranch, x: "75%", y: "82%", w: "180px", rotate: 8, delay: 0.35 },
];

export default function SustainabilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* ── Botanical illustrations appear/disappear ── */
      const botanicals = sectionRef.current!.querySelectorAll(".botanical-el");
      gsap.set(botanicals, { opacity: 0, scale: 0.3, rotate: (i) => (i % 2 === 0 ? -20 : 20) });

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 85%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(botanicals, {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.2,
            stagger: 0.08,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(botanicals, {
            opacity: 0,
            scale: 0.3,
            duration: 0.6,
            stagger: 0.04,
            ease: "power2.in",
          });
        },
      });

      /* ── Certification badges stagger ── */
      const badges = sectionRef.current!.querySelectorAll(".cert-badge");
      gsap.set(badges, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: ".cert-grid",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(badges, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          });
        },
      });

      /* ── Award items stagger ── */
      const awardItems = sectionRef.current!.querySelectorAll(".award-item");
      gsap.set(awardItems, { opacity: 0, x: -20 });

      ScrollTrigger.create({
        trigger: ".awards-list",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(awardItems, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sustainability"
      ref={sectionRef}
      className="section-light relative min-h-screen py-32 md:py-40 overflow-hidden"
    >
      <div className="section-container">
        {/* ─── Header with botanical illustrations ─── */}
        <div ref={headerRef} className="relative text-center mb-20">
          {/* Botanical illustration layer */}
          <div className="absolute inset-0 pointer-events-none select-none" style={{ margin: "-80px -60px", overflow: "visible" }}>
            {botanicalElements.map((el, i) => (
              <div
                key={i}
                className="botanical-el absolute"
                style={{
                  left: el.x,
                  top: el.y,
                  width: el.w,
                  transform: `rotate(${el.rotate}deg)`,
                  color: "rgba(140, 104, 74, 0.25)",
                }}
              >
                <el.Component className="w-full h-auto" />
              </div>
            ))}
          </div>

          {/* Section label + title */}
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[rgba(74,140,92,0.08)] border border-[rgba(74,140,92,0.15)] flex items-center justify-center">
                <Leaf className="w-6 h-6 text-[#4a8c5c]" strokeWidth={1.5} />
              </div>
            </div>
            <p className="text-dark-sand/70 text-sm font-medium uppercase tracking-[0.2em] mb-3">
              Sustainability &amp; Social Impact
            </p>
            <h2 className="text-display-1 font-bold text-gradient-sand-dark">
              Growing Responsibility
            </h2>
          </div>
        </div>

        {/* ─── Green financing ─── */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 mb-24">
          {greenFinancing.map((metric, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
                decimals={metric.decimals}
                className="text-counter-hero text-gradient-sand-dark"
              />
              <p className="mt-3 text-sm font-light text-midnight/40 uppercase tracking-wider max-w-[250px]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* ─── Social impact grid ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
          {socialImpact.map((metric, i) => (
            <div
              key={i}
              className="text-center py-6 md:py-8 px-4 rounded-sm bg-midnight/[0.02] border border-midnight/[0.06] hover:bg-midnight/[0.04] transition-all duration-300"
            >
              <div className="flex justify-center mb-3">
                <Heart className="w-5 h-5 text-dark-sand/40" strokeWidth={1.5} />
              </div>
              <AnimatedCounter
                value={metric.value}
                suffix={metric.suffix}
                className="text-xl sm:text-2xl md:text-3xl text-gradient-sand-dark"
              />
              <p className="mt-2 text-[11px] font-light text-midnight/40 leading-snug px-2">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* ─── Paperless metric ─── */}
        <div className="flex justify-center mb-24">
          <div className="inline-flex items-center gap-6 py-6 px-10 rounded-sm bg-[rgba(140,104,74,0.05)] border border-[rgba(140,104,74,0.12)]">
            <AnimatedCounter
              value={paperlessMetric.value}
              suffix={paperlessMetric.suffix}
              className="text-4xl text-gradient-sand-dark"
            />
            <div>
              <p className="text-sm font-light text-midnight/60">{paperlessMetric.label}</p>
              <p className="text-xs text-dark-sand/40 mt-1">Paperless transformation</p>
            </div>
          </div>
        </div>

        <CopperLine length="100%" thickness={1} className="mb-24 opacity-20" />

        {/* ─── Certifications ─── */}
        <div className="mb-24">
          <div className="flex items-center justify-center gap-3 mb-8">
            <ShieldCheck className="w-5 h-5 text-dark-sand/50" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-midnight/80">
              Certifications &amp; Standards
            </h3>
          </div>
          <div className="cert-grid flex flex-wrap justify-center gap-3">
            {certifications.map((cert, i) => (
              <span
                key={i}
                className="cert-badge px-4 py-2 text-xs font-medium text-dark-sand/80 border border-dark-sand/15 rounded-sm bg-dark-sand/[0.04] whitespace-nowrap"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* ─── Awards ─── */}
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Award className="w-5 h-5 text-dark-sand/50" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-midnight/80">
              Awards &amp; Recognition
            </h3>
          </div>
          <div className="awards-list space-y-4">
            {awards.map((award, i) => (
              <div
                key={i}
                className="award-item flex items-start gap-4 p-4 border-l-2 border-dark-sand/25 bg-midnight/[0.015] hover:bg-midnight/[0.03] transition-colors duration-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-dark-sand mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-midnight">{award.title}</p>
                  <p className="text-xs font-light text-midnight/40 mt-0.5">{award.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
