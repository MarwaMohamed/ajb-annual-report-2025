"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Loading sequence timeline
      const tl = gsap.timeline();

      // Step 1: Fade in logo
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        0.3
      );

      // Step 2: Fade overlay to reveal bg
      tl.to(
        overlayRef.current,
        { opacity: 0, duration: 1.5, ease: "power2.inOut" },
        1
      );

      // Step 3: Key visual shapes stagger entrance
      tl.fromTo(
        shape2Ref.current,
        { opacity: 0, x: 60, y: 40 },
        { opacity: 0.5, x: 0, y: 0, duration: 1.2, ease: "power3.out" },
        1.5
      );
      tl.fromTo(
        shape3Ref.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 0.35, y: 0, scale: 1, duration: 1, ease: "power3.out" },
        1.8
      );

      // Step 4: Reveal title character by character
      if (titleRef.current) {
        const text = "Wealth Grows Here";
        titleRef.current.innerHTML = text
          .split("")
          .map(
            (char) =>
              `<span class="inline-block" style="opacity:0; transform:translateY(40px)">${char === " " ? "&nbsp;" : char}</span>`
          )
          .join("");

        const chars = titleRef.current.querySelectorAll("span");
        tl.to(
          chars,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: "power3.out",
          },
          2
        );
      }

      // Step 5: Subtitle fade
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        2.8
      );

      // Scroll-based parallax for hero elements
      gsap.to(bgRef.current, {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Shapes parallax — different speeds for depth
      gsap.to(shape2Ref.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Pin the hero
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Black loading overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 bg-black"
      />

      {/* Desert background */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src="/images/hero/herobg.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-midnight/60 to-midnight" />
      </div>

      {/* === KEY VISUAL SHAPES — from brand PDF === */}

      {/* Shape 2: Triple-layered parallelogram — overlapping, offset */}
      <div
        ref={shape2Ref}
        className="absolute top-[20%] right-[15%] w-[25%] z-[5] opacity-0 hidden lg:block mix-blend-lighten"
      >
        <Image
          src="/images/shapes/kv-cmyk-2.png"
          alt=""
          width={800}
          height={1142}
          className="w-full h-auto"
        />
      </div>

      {/* Shape 3: Tower shape — bottom right accent */}
      <div
        ref={shape3Ref}
        className="absolute bottom-[5%] right-[8%] w-[18%] z-[5] opacity-0 hidden lg:block mix-blend-lighten"
      >
        <Image
          src="/images/shapes/kv-cmyk-3.png"
          alt=""
          width={800}
          height={1142}
          className="w-full h-auto"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 section-container h-full flex flex-col justify-center">
        {/* Logo */}
        <div ref={logoRef} className="mb-12 opacity-0">
          <Image
            src="/images/logo/ajb-white.png"
            alt="Aljazira Bank"
            width={180}
            height={48}
            className="h-10 md:h-12 w-auto brightness-0 invert"
            priority
          />
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-hero font-black text-white max-w-[900px] leading-[1.05] tracking-tight whitespace-nowrap"
        >
          Wealth Grows Here
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 text-lg md:text-xl font-extralight text-white/60 max-w-[500px] leading-relaxed opacity-0"
        >
          Annual Report 2025 — Aljazira Bank
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-sand/60 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sand/30 to-transparent z-20" />
    </section>
  );
}
