"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import CopperLine from "@/components/ui/CopperLine";
import { Download } from "lucide-react";

export default function ClosingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Stagger animate the closing content elements
      const elements = sectionRef.current!.querySelectorAll(".closing-animate");
      gsap.set(elements, { opacity: 0, y: 25 });
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="closing"
      ref={sectionRef}
      className="section-light relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 70%, rgba(185,134,102,0.08) 0%, transparent 60%), linear-gradient(180deg, #FAF8F5 0%, #F5F0EB 40%, #EDE6DD 100%)",
      }}
    >
      {/* Subtle desert landscape overlay — very faint on light bg */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none">
        <Image
          src="/images/hero/Mask group.png"
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Key visual outline shape — left, faint on light bg */}
      <div className="absolute top-[5%] left-[3%] w-[28%] opacity-[0.06] pointer-events-none hidden md:block invert">
        <Image src="/images/shapes/kv-flat-2.png" alt="" width={800} height={1142} className="w-full h-auto" />
      </div>
      {/* Key visual outline shape — right, bottom */}
      <div className="absolute bottom-[10%] right-[5%] w-[22%] opacity-[0.05] pointer-events-none hidden md:block invert rotate-180">
        <Image src="/images/shapes/kv-flat-1.png" alt="" width={800} height={1142} className="w-full h-auto" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center section-container">
        {/* Logo — dark version on light bg */}
        <div className="closing-animate mb-8">
          <Image
            src="/images/logo/ajb-white.png"
            alt="Aljazira Bank"
            width={180}
            height={48}
            className="h-12 md:h-14 w-auto brightness-0 opacity-80 mx-auto"
          />
        </div>

        {/* Copper line */}
        <div className="closing-animate">
          <CopperLine length="80px" thickness={2} className="mx-auto mb-8" />
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-hero font-black text-midnight mb-6 opacity-0 whitespace-nowrap"
        >
          Wealth Grows Here
        </h2>

        {/* Subtitle */}
        <p className="closing-animate text-lg md:text-xl font-light text-midnight/50 max-w-[550px] mx-auto mb-4 leading-relaxed">
          Annual Report 2025
        </p>
        <p className="closing-animate text-sm font-light text-dark-sand/60 max-w-[450px] mx-auto mb-12">
          Building sustainable value for the Kingdom, for society, and for our shareholders.
        </p>

        {/* CTA */}
        <div className="closing-animate">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-midnight text-white text-sm font-medium tracking-wider uppercase rounded-sm hover:bg-midnight/90 transition-all duration-300 hover:shadow-lg"
          >
            <Download className="w-4 h-4 opacity-70" strokeWidth={1.5} />
            <span>Download Full Report</span>
          </a>
        </div>

        {/* Secondary links */}
        <div className="closing-animate mt-6 flex items-center justify-center gap-6">
          <a href="#" className="text-xs font-medium text-dark-sand/60 hover:text-dark-sand transition-colors uppercase tracking-wider">
            Investor Relations
          </a>
          <span className="w-1 h-1 rounded-full bg-sand/30" />
          <a href="#" className="text-xs font-medium text-dark-sand/60 hover:text-dark-sand transition-colors uppercase tracking-wider">
            Corporate Governance
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-10 py-6 border-t border-midnight/[0.06]">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-light text-midnight/30">
            &copy; 2025 Bank AlJazira. All Rights Reserved.
          </p>
          <p className="text-[11px] font-light text-midnight/20">
            Regulated by the Saudi Central Bank (SAMA)
          </p>
        </div>
      </div>
    </section>
  );
}
