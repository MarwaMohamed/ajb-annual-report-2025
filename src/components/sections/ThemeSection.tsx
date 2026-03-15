"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import GlassCard from "@/components/ui/GlassCard";
import CopperLine from "@/components/ui/CopperLine";
import { strategicPillars } from "@/data/strategy";
import { BASE_PATH } from "@/lib/constants";

export default function ThemeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Quote reveal — line by line
      const lines = quoteRef.current?.querySelectorAll(".quote-line");
      if (lines) {
        gsap.set(lines, { opacity: 0, y: 40 });
        gsap.to(lines, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 75%",
            end: "top 30%",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="theme"
      ref={sectionRef}
      className="relative min-h-screen py-32 md:py-40 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(185,134,102,0.06) 0%, transparent 50%), linear-gradient(180deg, #001421 0%, #000c16 100%)",
      }}
    >
      {/* Key visual shape — outline, right side decorative */}
      <div className="absolute top-[5%] right-[-8%] w-[35%] opacity-[0.12] pointer-events-none hidden md:block mix-blend-lighten">
        <Image
          src={`${BASE_PATH}/images/shapes/kv-flat-1.png`}
          alt=""
          width={800}
          height={1142}
          className="w-full h-auto"
        />
      </div>

      {/* Second outline shape — left side, lower */}
      <div className="absolute bottom-[10%] left-[-5%] w-[22%] opacity-[0.06] pointer-events-none hidden lg:block mix-blend-lighten rotate-180">
        <Image
          src={`${BASE_PATH}/images/shapes/kv-flat-3.png`}
          alt=""
          width={800}
          height={1142}
          className="w-full h-auto"
        />
      </div>

      <div className="section-container">
        {/* Theme quote */}
        <div ref={quoteRef} className="max-w-[900px] mx-auto text-center mb-24 md:mb-32">
          <p className="quote-line text-sand text-sm font-medium uppercase tracking-[0.3em] mb-8">
            Theme — 2025
          </p>
          <blockquote className="quote-line text-display-1 font-bold text-white leading-tight mb-8">
            &ldquo;Wealth Grows Here&rdquo;
          </blockquote>
          <p className="quote-line text-lg md:text-xl font-light text-white/60 leading-relaxed max-w-[700px] mx-auto">
            This theme reflects a clear stage of institutional maturity that defines
            our view of the Bank&apos;s role as a leading national financial institution
            — building sustainable value for the Kingdom, for society, and for our shareholders.
          </p>
        </div>

        {/* Copper divider */}
        <div className="flex justify-center mb-24">
          <CopperLine length="120px" thickness={1} />
        </div>

        {/* Strategic pillars preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {strategicPillars.map((pillar, i) => (
            <GlassCard key={pillar.number} delay={i * 0.15} variant="sand">
              <div className="flex flex-col h-full">
                <span className="text-sand/40 text-6xl font-black leading-none mb-4">
                  {pillar.number}
                </span>
                <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm font-light text-white/50 leading-relaxed mt-auto">
                  {pillar.description}
                </p>
                {/* Copper accent line at bottom */}
                <div className="mt-6 h-[2px] bg-gradient-to-r from-sand/50 to-transparent w-[30%] group-hover:w-full transition-all duration-700" />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
