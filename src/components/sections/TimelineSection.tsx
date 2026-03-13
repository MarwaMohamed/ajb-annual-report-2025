"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { gsap, ScrollTrigger } from "@/lib/gsap";
import CopperLine from "@/components/ui/CopperLine";
import { milestones } from "@/data/timeline";

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      // Progress line fill — scrubs with scroll through the timeline
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          }
        );
      }

      // Animate each card on enter
      const cards = sectionRef.current!.querySelectorAll(".tl-card");
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 1;
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Dots pop in
      const dots = sectionRef.current!.querySelectorAll(".tl-dot");
      dots.forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Header stagger
      const headerEls = sectionRef.current!.querySelectorAll(".tl-header");
      gsap.set(headerEls, { opacity: 0, y: 30 });
      gsap.to(headerEls, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="section-light relative py-32 md:py-40 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 60% 30%, rgba(185,134,102,0.05) 0%, transparent 50%), linear-gradient(180deg, #FAF8F5 0%, #F0EBE4 50%, #FAF8F5 100%)",
      }}
    >
      {/* Decorative shapes — very faint */}
      <div className="absolute top-[8%] left-[2%] w-[20%] opacity-[0.03] pointer-events-none hidden lg:block invert">
        <Image src="/images/shapes/kv-flat-2.png" alt="" width={800} height={1142} className="w-full h-auto" />
      </div>
      <div className="absolute bottom-[12%] right-[3%] w-[16%] opacity-[0.03] pointer-events-none hidden lg:block invert rotate-180">
        <Image src="/images/shapes/kv-flat-1.png" alt="" width={800} height={1142} className="w-full h-auto" />
      </div>

      <div className="section-container">
        {/* Section header */}
        <div className="flex flex-col items-center gap-1 mb-20 md:mb-28">
          <div className="tl-header">
            <CopperLine length="60px" thickness={2} className="mx-auto mb-6" />
          </div>
          <p className="tl-header text-dark-sand/70 text-sm font-semibold uppercase tracking-[0.25em]">
            Our Journey
          </p>
          <h2 className="tl-header text-display-1 font-bold text-midnight uppercase tracking-[0.04em]">
            Milestones of Growth
          </h2>
        </div>

        {/* ===== TIMELINE — exact param.design pattern ===== */}
        <div ref={timelineRef} className="relative w-full max-w-[1000px] mx-auto px-6">
          {milestones.map((milestone, i) => {
            const isRight = i % 2 === 0; // even=right card, odd=left card

            return (
              <div
                key={milestone.year}
                className="relative w-full min-h-[200px] flex flex-wrap justify-between"
              >
                {/* === LEFT COLUMN (45%) === */}
                <div className={`w-[45%] min-w-0 relative flex flex-col ${!isRight ? "items-end" : ""}`}>
                  {!isRight ? (
                    /* LEFT CARD — text right-aligned */
                    <div className="tl-card bg-white/90 backdrop-blur-sm w-[75%] min-w-0 sticky flex flex-wrap gap-5 p-5 border border-midnight/[0.08] hover:border-sand/30 hover:shadow-lg hover:shadow-sand/[0.06] transition-all duration-500 top-[280px]">
                      <div className="w-full min-w-0 relative flex flex-col">
                        <div className="w-full flex flex-col items-end">
                          <span className="text-2xl md:text-[28px] font-black text-gradient-sand-dark leading-none tracking-[0.01em]">
                            {milestone.year}
                          </span>
                          <p className="text-midnight/80 text-sm md:text-[15px] font-medium leading-normal text-end mt-1">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Empty placeholder for right-card rows */
                    <div className="w-full min-h-[50px] sticky flex flex-col justify-center top-[280px]" />
                  )}
                </div>

                {/* === CENTER COLUMN (10%) — timeline track + dot === */}
                <div className="w-[10%] h-full min-w-0 absolute flex flex-col items-center left-[45%] right-auto top-0 bottom-auto">
                  {/* Track line (light) */}
                  <div
                    className="w-[2px] min-h-full absolute flex flex-col items-center self-center left-1/2 -translate-x-1/2 top-0 rounded-full"
                    style={{ backgroundColor: "rgba(185,134,102,0.15)" }}
                  >
                    {/* Progress fill (dark) — only on first row */}
                    {i === 0 && (
                      <div
                        ref={progressRef}
                        className="w-[2px] min-h-0 absolute top-0 left-0 rounded-full"
                        style={{ backgroundColor: "#8c684a" }}
                      />
                    )}
                  </div>

                  {/* Dot */}
                  <div className="tl-dot w-3 h-3 min-w-[12px] min-h-[12px] sticky flex shrink-0 justify-center items-center self-center rounded-full bg-midnight border-2 border-sand shadow-[0_0_0_3px_rgba(185,134,102,0.1)] top-[306px] z-10" />
                </div>

                {/* === RIGHT COLUMN (45%) === */}
                <div className={`w-[45%] min-w-0 relative flex flex-col ${isRight ? "" : ""}`}>
                  {isRight ? (
                    /* RIGHT CARD — text left-aligned */
                    <div className="tl-card bg-white/90 backdrop-blur-sm w-[75%] min-w-0 sticky flex flex-wrap gap-5 p-5 border border-midnight/[0.08] hover:border-sand/30 hover:shadow-lg hover:shadow-sand/[0.06] transition-all duration-500 top-[280px]">
                      <div className="w-full min-w-0 relative flex flex-col">
                        <div className="w-full flex flex-col items-start">
                          <span className="text-2xl md:text-[28px] font-black text-gradient-sand-dark leading-none tracking-[0.01em]">
                            {milestone.year}
                          </span>
                          <p className="text-midnight/80 text-sm md:text-[15px] font-medium leading-normal mt-1">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Empty placeholder for left-card rows */
                    <div className="w-full min-h-[50px] sticky flex flex-col justify-center top-[280px]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sand/20 to-transparent" />
    </section>
  );
}
