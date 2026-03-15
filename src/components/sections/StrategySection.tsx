"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

import CopperLine from "@/components/ui/CopperLine";
import { strategySectors, businessModelComponents } from "@/data/strategy";

export default function StrategySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const track = trackRef.current!;
          const panels = track.querySelectorAll(".strategy-panel");
          const totalWidth = track.scrollWidth - window.innerWidth * 0.62;

          // Horizontal scroll — only the left track moves
          gsap.to(track, {
            x: -totalWidth,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${totalWidth}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          });

          // Progress bar
          if (progressRef.current) {
            gsap.to(progressRef.current, {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${totalWidth}`,
                scrub: 1,
              },
            });
          }

          // Each panel's content animates in
          panels.forEach((panel) => {
            const content = panel.querySelectorAll(".panel-content");
            gsap.set(content, { opacity: 0, y: 30 });

            ScrollTrigger.create({
              trigger: panel,
              start: "left 80%",
              containerAnimation: gsap.getById?.("strategyScroll") || undefined,
              onEnter: () => {
                gsap.to(content, {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  stagger: 0.1,
                  ease: "power3.out",
                });
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="strategy" ref={sectionRef} className="relative overflow-hidden">
      {/* Two-column layout: scrolling left | fixed right */}
      <div className="relative lg:flex lg:h-screen">

        {/* ─── LEFT: Horizontal scroll track (light bg) ─── */}
        <div className="lg:w-[62%] lg:h-screen overflow-hidden bg-[#FAF8F5]">
          <div
            ref={trackRef}
            className="lg:flex lg:flex-nowrap lg:h-screen"
          >
            {/* Intro panel */}
            <div className="strategy-panel flex-shrink-0 w-full lg:w-[62vw] h-auto lg:h-screen flex items-center py-20 lg:py-0 px-6 md:px-12 lg:px-16 xl:px-20">
              <div className="max-w-[600px]">
                <div className="panel-content">
                  <CopperLine length="60px" thickness={2} />
                </div>
                <p className="panel-content text-dark-sand text-sm font-medium uppercase tracking-[0.2em] mb-3 mt-6">
                  Strategy
                </p>
                <h2 className="panel-content text-display-1 font-bold text-midnight mb-6">
                  The &ldquo;One Bank&rdquo; Approach
                </h2>
                <p className="panel-content text-lg font-light text-midnight/55 leading-relaxed mb-12">
                  Integrated execution across all bank sectors, balancing expansion
                  with efficient capital deployment. Digital channels serve as the
                  primary driver for growth and acquisition.
                </p>

                {/* Business model components */}
                <div className="panel-content grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {businessModelComponents.map((comp, i) => (
                    <div
                      key={i}
                      className="p-4 border border-dark-sand/15 rounded-sm bg-dark-sand/[0.03]"
                    >
                      <h4 className="text-sm font-bold text-midnight mb-1">{comp.title}</h4>
                      <p className="text-xs font-light text-midnight/40">{comp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sector panels */}
            {strategySectors.map((sector, i) => (
              <div
                key={sector.id}
                className="strategy-panel flex-shrink-0 w-full lg:w-[62vw] h-auto lg:h-screen flex items-center py-20 lg:py-0 px-6 md:px-12 lg:px-16 xl:px-20"
              >
                <div className="max-w-[600px]">
                  <span className="panel-content text-dark-sand/25 text-6xl md:text-8xl font-black leading-none block mb-4">
                    0{i + 1}
                  </span>
                  <h3 className="panel-content text-display-2 font-bold text-midnight mb-4">
                    {sector.title}
                  </h3>

                  {/* Metric */}
                  <div className="panel-content mb-8">
                    {sector.metric.value > 0 || sector.displayText ? (
                      <AnimatedCounter
                        value={sector.metric.value}
                        prefix={sector.metric.prefix || ""}
                        suffix={sector.metric.suffix}
                        decimals={"decimals" in sector.metric ? (sector.metric.decimals as number) : 0}
                        displayText={sector.displayText}
                        className="text-counter-hero text-gradient-sand-dark"
                        label={sector.metric.label}
                      />
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-counter-hero text-gradient-sand-dark font-black">
                          {sector.displayText || "—"}
                        </span>
                        <span className="mt-2 text-sm font-light text-midnight/50 uppercase tracking-wider">
                          {sector.metric.label}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="panel-content text-base font-light text-midnight/55 leading-relaxed">
                    {sector.description}
                  </p>

                  {/* Copper accent */}
                  <div className="panel-content mt-8">
                    <CopperLine length="80px" thickness={2} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RIGHT: Fixed dark side with logo shape ─── */}
        <div className="hidden lg:block lg:w-[38%] lg:h-screen bg-midnight overflow-hidden">
          <div className="absolute top-[-5%] right-[-3%] w-[30%] opacity-100">
            <Image src="/images/shapes/kv-cmyk-3.png" alt="" width={800} height={1142} className="w-full h-auto" />
          </div>
        </div>

      </div>

      {/* Progress strip — desktop only */}
      <div className="hidden lg:block fixed bottom-0 left-0 right-0 z-40 pointer-events-none bg-midnight">
        <div className="h-1 bg-white/[0.04]">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-dark-sand via-sand to-sand-light origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <div className="section-container py-4 flex justify-between">
          {strategySectors.map((sector) => (
            <span
              key={sector.id}
              className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium"
            >
              {sector.title}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
