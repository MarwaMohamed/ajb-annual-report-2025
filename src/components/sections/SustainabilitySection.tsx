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

export default function SustainabilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger animate certification badges
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

      // Award items stagger
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
      className="relative min-h-screen py-32 md:py-40 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 70%, rgba(74,140,92,0.04) 0%, transparent 50%), linear-gradient(180deg, #000c16 0%, #001421 50%, #000c16 100%)",
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[rgba(74,140,92,0.1)] border border-[rgba(74,140,92,0.2)] flex items-center justify-center">
              <Leaf className="w-6 h-6 text-[#4a8c5c]" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-sand/80 text-sm font-medium uppercase tracking-[0.2em] mb-3">
            Sustainability &amp; Social Impact
          </p>
          <h2 className="text-display-1 font-bold text-white">
            Growing Responsibility
          </h2>
        </div>

        {/* Green financing */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 mb-24">
          {greenFinancing.map((metric, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
                decimals={metric.decimals}
                className="text-counter-hero text-gradient-sand"
              />
              <p className="mt-3 text-sm font-light text-white/50 uppercase tracking-wider max-w-[250px]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Social impact grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
          {socialImpact.map((metric, i) => (
            <div
              key={i}
              className="text-center py-6 md:py-8 px-4 rounded-sm bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="flex justify-center mb-3">
                <Heart className="w-5 h-5 text-sand/50" strokeWidth={1.5} />
              </div>
              <AnimatedCounter
                value={metric.value}
                suffix={metric.suffix}
                className="text-xl sm:text-2xl md:text-3xl text-gradient-sand"
              />
              <p className="mt-2 text-[11px] font-light text-white/50 leading-snug px-2">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Paperless metric */}
        <div className="flex justify-center mb-24">
          <div className="inline-flex items-center gap-6 py-6 px-10 rounded-sm bg-[rgba(185,134,102,0.06)] border border-[rgba(185,134,102,0.15)]">
            <AnimatedCounter
              value={paperlessMetric.value}
              suffix={paperlessMetric.suffix}
              className="text-4xl text-gradient-sand"
            />
            <div>
              <p className="text-sm font-light text-white/60">{paperlessMetric.label}</p>
              <p className="text-xs text-sand/40 mt-1">Paperless transformation</p>
            </div>
          </div>
        </div>

        <CopperLine length="100%" thickness={1} className="mb-24 opacity-20" />

        {/* Certifications */}
        <div className="mb-24">
          <div className="flex items-center justify-center gap-3 mb-8">
            <ShieldCheck className="w-5 h-5 text-sand/60" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-white/80">
              Certifications &amp; Standards
            </h3>
          </div>
          <div className="cert-grid flex flex-wrap justify-center gap-3">
            {certifications.map((cert, i) => (
              <span
                key={i}
                className="cert-badge px-4 py-2 text-xs font-medium text-sand/80 border border-sand/20 rounded-sm bg-sand/[0.04] whitespace-nowrap"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Award className="w-5 h-5 text-sand/60" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-white/80">
              Awards &amp; Recognition
            </h3>
          </div>
          <div className="awards-list space-y-4">
            {awards.map((award, i) => (
              <div
                key={i}
                className="award-item flex items-start gap-4 p-4 border-l-2 border-sand/30 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-sand mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">{award.title}</p>
                  <p className="text-xs font-light text-white/40 mt-0.5">{award.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
