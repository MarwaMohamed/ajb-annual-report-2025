"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CopperLine from "@/components/ui/CopperLine";
import { chairmanData, ceoData } from "@/data/leadership";
import { BASE_PATH } from "@/lib/constants";

interface LeaderMessageProps {
  data: typeof chairmanData | typeof ceoData;
  id: string;
  reverse?: boolean;
  inlineMetrics?: Array<{ value: number; suffix: string; label: string }>;
  light?: boolean;
}

function LeaderMessage({ data, id, reverse = false, inlineMetrics, light = false }: LeaderMessageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        pinSpacing: true,
      });

      // Image reveal with shape mask
      const imgTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      imgTl
        .fromTo(
          imageRef.current,
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 },
          {
            clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.inOut",
          }
        );

      // Text excerpts stagger in
      const excerpts = textRef.current?.querySelectorAll(".excerpt-item");
      if (excerpts) {
        gsap.set(excerpts, { opacity: 0, y: 30 });

        gsap.to(excerpts, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative min-h-screen flex items-center py-20 overflow-hidden ${light ? "section-light" : ""}`}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: light
            ? reverse
              ? "radial-gradient(ellipse at 80% 40%, rgba(185,134,102,0.06) 0%, transparent 60%), linear-gradient(180deg, #FAF8F5 0%, #F5F0EB 50%, #FAF8F5 100%)"
              : "radial-gradient(ellipse at 20% 40%, rgba(185,134,102,0.06) 0%, transparent 60%), linear-gradient(180deg, #FAF8F5 0%, #F5F0EB 50%, #FAF8F5 100%)"
            : reverse
              ? "radial-gradient(ellipse at 80% 40%, rgba(185,134,102,0.04) 0%, transparent 60%), linear-gradient(180deg, #000c16 0%, #001421 50%, #000c16 100%)"
              : "radial-gradient(ellipse at 20% 40%, rgba(185,134,102,0.04) 0%, transparent 60%), linear-gradient(180deg, #000c16 0%, #001421 50%, #000c16 100%)",
        }}
      />

      <div className="section-container relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "direction-rtl" : ""}`}>
          {/* Image column */}
          <div className={`${reverse ? "lg:order-2" : "lg:order-1"}`}>
            <div
              ref={imageRef}
              className="relative aspect-[3/4] max-w-[400px] mx-auto lg:mx-0 opacity-0"
              style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
            >
              <Image
                src={`${BASE_PATH}${data.image}`}
                alt={data.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 80vw, 400px"
              />
              {/* Copper border accent */}
              <div className="absolute inset-0 border-r-2 border-sand/30" />
              <div className={`absolute bottom-0 left-0 right-0 h-1/3 ${light ? "bg-gradient-to-t from-[#FAF8F5] to-transparent" : "bg-gradient-to-t from-midnight to-transparent"}`} />
            </div>
          </div>

          {/* Text column */}
          <div ref={textRef} className={`${reverse ? "lg:order-1" : "lg:order-2"}`}>
            <div className="excerpt-item mb-2">
              <CopperLine length="40px" thickness={2} />
            </div>
            <p className="excerpt-item text-sand/80 text-sm font-medium uppercase tracking-[0.2em] mb-2 mt-4">
              {data.title}
            </p>
            <h2 className={`excerpt-item text-display-2 font-bold mb-8 ${light ? "text-midnight" : "text-white"}`}>
              {data.name}
            </h2>

            {/* Excerpts with connecting copper line */}
            <div className="relative pl-6 border-l border-sand/20">
              {data.excerpts.map((excerpt, i) => (
                <div key={i} className="excerpt-item mb-6 last:mb-0">
                  <p className={`text-base font-light leading-relaxed ${light ? "text-midnight/70" : "text-white/70"}`}>
                    {excerpt}
                  </p>
                </div>
              ))}
            </div>

            {/* Inline metrics for CEO */}
            {inlineMetrics && (
              <div className="excerpt-item mt-10 grid grid-cols-3 gap-4 sm:gap-6">
                {inlineMetrics.map((metric, i) => (
                  <div key={i} className="flex flex-col min-w-0">
                    <AnimatedCounter
                      value={metric.value}
                      suffix={metric.suffix}
                      decimals={metric.value % 1 !== 0 ? 2 : 0}
                      className={`text-2xl sm:text-counter-lg ${light ? "text-gradient-sand-dark" : "text-gradient-sand"}`}
                    />
                    <span className={`mt-1 text-xs font-light uppercase tracking-wider ${light ? "text-midnight/50" : "text-white/50"}`}>
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className={`absolute bottom-0 left-0 right-0 h-[1px] ${light ? "bg-gradient-to-r from-transparent via-sand/30 to-transparent" : "bg-gradient-to-r from-transparent via-sand/20 to-transparent"}`} />
    </section>
  );
}

export function ChairmanSection() {
  return <LeaderMessage data={chairmanData} id="chairman" light />;
}

export function CEOSection() {
  return (
    <LeaderMessage
      data={ceoData}
      id="ceo"
      reverse
      inlineMetrics={ceoData.inlineMetrics}
    />
  );
}
