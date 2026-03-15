"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import {
  Leaf,
  Heart,
  ShieldCheck,
} from "lucide-react";
import {
  greenFinancing,
  socialImpact,
  certifications,
  paperlessMetric,
} from "@/data/sustainability";

export default function SustainabilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* ── Right-side content blocks slide in ── */
      const contentBlocks = sectionRef.current!.querySelectorAll(".content-block");
      gsap.set(contentBlocks, { opacity: 0, y: 40 });

      contentBlocks.forEach((block) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(block, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            });
          },
        });
      });

      /* ── Social impact stat rows — slide up ── */
      const statNumbers = sectionRef.current!.querySelectorAll(".stat-number");
      const statLabels = sectionRef.current!.querySelectorAll(".stat-label");
      const statLines = sectionRef.current!.querySelectorAll(".stat-line");

      gsap.set(statNumbers, { yPercent: 100, opacity: 0 });
      gsap.set(statLabels, { yPercent: 60, opacity: 0 });
      gsap.set(statLines, { scaleX: 0, transformOrigin: "right center" });

      ScrollTrigger.create({
        trigger: ".impact-stats",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(statNumbers, {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
          });
          gsap.to(statLabels, {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            delay: 0.15,
            ease: "power3.out",
          });
          gsap.to(statLines, {
            scaleX: 1,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.1,
            ease: "power2.out",
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
      gsap.set(awardItems, { opacity: 0, x: 20 });

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
      className="relative overflow-hidden bg-white z-10"
    >
      {/* ═══ Two-column layout: Image left | Content right ═══ */}
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* ─── LEFT: Sticky image with organic curved edge ─── */}
        <div className="relative lg:w-[58%] xl:w-[60%] lg:sticky lg:top-0 lg:h-screen flex-shrink-0 bg-white">
          {/* Hidden SVG clipPath — single smooth S-curve on right edge */}
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <clipPath id="organic-curve" clipPathUnits="objectBoundingBox">
                <path d="M 0,0 L 0.93,0 C 0.93,0.06 0.92,0.14 0.88,0.22 C 0.82,0.32 0.74,0.40 0.68,0.47 C 0.65,0.52 0.65,0.57 0.68,0.62 C 0.74,0.72 0.84,0.80 0.90,0.88 C 0.94,0.94 0.96,1.0 0.96,1.0 L 0,1 Z" />
              </clipPath>
            </defs>
          </svg>
          <div
            className="relative h-[50vh] lg:h-full w-full"
            style={{ clipPath: 'url(#organic-curve)' }}
          >
            <div className="absolute inset-0 right-[40%] flex items-center justify-end">
              <Image
                src="/images/sustainability/woman-portrait.jpg"
                alt="AJB sustainability visual"
                width={500}
                height={750}
                className="w-auto h-[85%] object-contain"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Scrollable content ─── */}
        <div className="lg:w-[42%] xl:w-[40%] py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-16 xl:px-20">

          {/* ── Section header ── */}
          <div className="content-block mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[rgba(74,140,92,0.08)] border border-[rgba(74,140,92,0.15)] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[#4a8c5c]" strokeWidth={1.5} />
              </div>
              <p className="text-dark-sand/60 text-sm font-medium uppercase tracking-[0.2em]">
                Sustainability &amp; Social Impact
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gradient-sand-dark leading-[1.1] mb-5">
              Growing<br />Responsibility
            </h2>
            <p className="text-base text-midnight/50 leading-relaxed max-w-[480px]">
              Embedding sustainability across operations, investing in communities,
              and driving the Kingdom&apos;s green economy transition.
            </p>
          </div>

          {/* ── Copper divider ── */}
          <div className="w-16 h-px bg-dark-sand/30 mb-16" />

          {/* ── Green Financing ── */}
          <div className="content-block mb-16">
            <h3 className="text-sand-alt text-sm font-semibold uppercase tracking-[0.15em] mb-8">
              Green Financing
            </h3>
            <div className="grid grid-cols-2 gap-8">
              {greenFinancing.map((metric, i) => (
                <div key={i}>
                  <AnimatedCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                    className="text-3xl md:text-4xl font-bold text-gradient-sand-dark"
                  />
                  <p className="mt-2 text-xs font-medium text-midnight/40 uppercase tracking-wider leading-snug">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      {/* ═══ END two-column layout ═══ */}

      {/* ═══ Full-width centered sections below ═══ */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-white">

        {/* ── Social Impact ── */}
        <div className="content-block mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Heart className="w-5 h-5 text-dark-sand/50" strokeWidth={1.5} />
            <h3 className="text-sand-alt text-sm font-semibold uppercase tracking-[0.15em]">
              Social Impact — Empowering Communities
            </h3>
          </div>
          <p className="text-sm text-midnight/45 leading-relaxed mb-12 max-w-[500px] mx-auto text-center">
            Supporting productive families, youth empowerment, disability inclusion,
            and nonprofit partnerships across the Kingdom.
          </p>

          {/* Stacked stat rows */}
          <div className="impact-stats flex flex-col max-w-3xl mx-auto">
            {socialImpact.map((metric, i) => (
              <div key={i} className="relative pb-4 pt-3 md:pb-5 md:pt-4">
                <div className="flex items-end justify-between gap-4">
                  <div className="overflow-hidden">
                    <div className="stat-number">
                      <AnimatedCounter
                        value={metric.value}
                        suffix={metric.suffix}
                        className="text-3xl md:text-4xl leading-none font-light text-gradient-sand-dark tracking-tight"
                      />
                    </div>
                  </div>
                  <div className="overflow-hidden flex-shrink-0">
                    <p className="stat-label text-[11px] md:text-xs font-medium text-midnight/45 uppercase tracking-wider leading-snug text-right max-w-[180px]">
                      {metric.label}
                    </p>
                  </div>
                </div>
                <div className="stat-line absolute bottom-0 left-0 right-0 h-px bg-dark-sand/15" />
              </div>
            ))}

            {/* Paperless metric — same row style */}
            <div className="relative pb-4 pt-3 md:pb-5 md:pt-4">
              <div className="flex items-end justify-between gap-4">
                <div className="overflow-hidden">
                  <div className="stat-number">
                    <AnimatedCounter
                      value={paperlessMetric.value}
                      suffix={paperlessMetric.suffix}
                      className="text-3xl md:text-4xl leading-none font-light text-gradient-sand-dark tracking-tight"
                    />
                  </div>
                </div>
                <div className="overflow-hidden flex-shrink-0">
                  <p className="stat-label text-[11px] md:text-xs font-medium text-midnight/45 uppercase tracking-wider leading-snug text-right max-w-[180px]">
                    {paperlessMetric.label}
                  </p>
                </div>
              </div>
              <div className="stat-line absolute bottom-0 left-0 right-0 h-px bg-dark-sand/15" />
            </div>
          </div>
        </div>

        {/* ── Copper divider ── */}
        <div className="w-16 h-px bg-dark-sand/30 mb-20 mx-auto" />

        {/* ── Certifications ── */}
        <div className="content-block mb-20">
          <div className="flex items-center justify-center gap-3 mb-10">
            <ShieldCheck className="w-5 h-5 text-dark-sand/50" strokeWidth={1.5} />
            <h3 className="text-sand-alt text-sm font-semibold uppercase tracking-[0.15em]">
              Certifications &amp; Standards
            </h3>
          </div>
          <div className="cert-grid flex flex-wrap justify-center gap-3">
            {certifications.map((cert, i) => (
              <span
                key={i}
                className="cert-badge px-5 py-2.5 text-sm font-medium text-dark-sand/75 border border-dark-sand/12 rounded-sm bg-dark-sand/[0.03] whitespace-nowrap"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Awards & Recognition — hidden for now */}

      </div>
    </section>
  );
}
