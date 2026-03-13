"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface RevealTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "blockquote";
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "lines" | "words" | "chars";
  scrub?: boolean;
}

export default function RevealText({
  children,
  as: Tag = "p",
  className = "",
  delay = 0,
  stagger = 0.08,
  splitBy = "lines",
  scrub = false,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    // Split text into spans
    let parts: string[];
    if (splitBy === "chars") {
      parts = children.split("");
    } else if (splitBy === "words") {
      parts = children.split(/\s+/);
    } else {
      // Split by sentences/lines (roughly by periods or newlines)
      parts = children.split(/(?<=\.)\s+|(?<=\n)/);
      if (parts.length <= 1) {
        parts = children.split(/,\s*/);
      }
      if (parts.length <= 1) {
        parts = [children];
      }
    }

    el.innerHTML = parts
      .map(
        (part) =>
          `<span class="inline-block overflow-hidden"><span class="reveal-part inline-block" style="transform: translateY(100%); opacity: 0;">${part}${splitBy === "words" ? "&nbsp;" : ""}</span></span>`
      )
      .join("");

    const spans = el.querySelectorAll(".reveal-part");

    if (scrub) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      });

      tl.to(spans, {
        y: 0,
        opacity: 1,
        stagger,
        ease: "power3.out",
      });
    } else {
      gsap.set(spans, { y: "100%", opacity: 0 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(spans, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger,
            delay,
            ease: "power3.out",
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [children, delay, stagger, splitBy, scrub]);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={containerRef as any}
      className={className}
      aria-label={children}
    />
  );
}
