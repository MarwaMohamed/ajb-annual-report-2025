"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import CopperLine from "@/components/ui/CopperLine";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const identityStats = [
  { value: 72, suffix: "", label: "Media Platforms" },
  { value: 18, suffix: "M", label: "Total Audience" },
  { value: 54, suffix: "M", label: "Annual Impressions" },
  { value: 850, suffix: "K", label: "Customer Touchpoints" },
];

export default function IdentitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Logo SVG draw animation
      if (logoSvgRef.current) {
        const paths = logoSvgRef.current.querySelectorAll("path, rect, circle");
        paths.forEach((path) => {
          const el = path as SVGGeometryElement;
          if (el.getTotalLength) {
            const length = el.getTotalLength();
            gsap.set(el, { strokeDasharray: length, strokeDashoffset: length, fill: "none", stroke: "#8c684a" });

            gsap.to(el, {
              strokeDashoffset: 0,
              duration: 2,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
              },
            });

            // Fill in after draw
            gsap.to(el, {
              fill: "#8c684a",
              fillOpacity: 0.15,
              delay: 2,
              duration: 0.8,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
              },
            });
          }
        });
      }

      // Stagger stat cards
      const statCards = sectionRef.current!.querySelectorAll(".identity-stat");
      gsap.set(statCards, { opacity: 0, y: 30 });
      gsap.to(statCards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".identity-stats-grid",
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="identity"
      ref={sectionRef}
      className="section-light relative min-h-screen py-32 md:py-40 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 70% 30%, rgba(185,134,102,0.06) 0%, transparent 50%), linear-gradient(180deg, #FAF8F5 0%, #F5F0EB 50%, #FAF8F5 100%)",
      }}
    >
      {/* Subtle decorative shape */}
      <div className="absolute top-[15%] right-[-5%] w-[30%] opacity-[0.03] pointer-events-none">
        <Image src="/images/decoratives/Vectorbg.png" alt="" width={600} height={600} className="w-full" />
      </div>

      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-20">
          <CopperLine length="60px" thickness={2} className="mx-auto mb-6" />
          <p className="text-dark-sand text-sm font-medium uppercase tracking-[0.2em] mb-3">
            Corporate Identity
          </p>
          <h2 className="text-display-1 font-bold text-midnight mb-6">
            Enriching Lives through<br />Financial Wellbeing
          </h2>
          <p className="text-lg font-light text-midnight/50 max-w-[600px] mx-auto leading-relaxed">
            A bold new identity by Interbrand — rooted in purpose, shaped by vision,
            and designed to signal a new era for Aljazira Bank.
          </p>
        </div>

        {/* Logo showcase */}
        <div className="flex justify-center mb-20">
          <div className="relative w-[200px] h-[80px]">
            <Image
              src="/images/logo/ajb-white.png"
              alt="ajb logo"
              fill
              className="object-contain brightness-0 opacity-80"
            />
          </div>
        </div>

        {/* Stats grid */}
        <div className="identity-stats-grid grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20">
          {identityStats.map((stat, i) => (
            <div
              key={i}
              className="identity-stat text-center py-8 px-4 rounded-sm bg-transparent border border-dark-sand/20 hover:border-dark-sand/40 transition-all duration-300"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="text-2xl sm:text-3xl md:text-4xl text-gradient-sand-dark"
                label={stat.label}
                labelClassName="!text-midnight/50 !text-xs !font-light !tracking-wider"
              />
            </div>
          ))}
        </div>

        {/* Purpose statement */}
        <div className="max-w-[800px] mx-auto text-center">
          <div className="py-12 px-8 md:px-16 rounded-sm bg-[rgba(185,134,102,0.05)] border border-[rgba(185,134,102,0.12)]">
            <p className="text-sm text-dark-sand/70 uppercase tracking-[0.2em] mb-4">Our Purpose</p>
            <p className="text-2xl md:text-3xl font-bold text-midnight leading-snug">
              &ldquo;Enriching Lives through Financial Wellbeing&rdquo;
            </p>
            <div className="flex justify-center mt-6">
              <CopperLine length="40px" thickness={1} />
            </div>
            <p className="text-sm font-light text-midnight/50 mt-6 leading-relaxed">
              A unified vision across all sectors and services — retail, corporate,
              investment, and treasury — integrated under one ambition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
