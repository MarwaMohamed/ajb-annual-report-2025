"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sections } from "@/data/sections";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isHidden, setIsHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    // Track scroll direction to hide/show nav
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll.current && current > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track active section
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
      });
    });

    // Initial fade in
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2.5, ease: "power3.out" }
      );
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 opacity-0 ${
        isHidden && !isOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Glass bar */}
      <div className="bg-midnight/80 backdrop-blur-[16px] border-b border-white/[0.06]">
        <div className="section-container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="relative z-10">
            <Image
              src="/images/logo/ajb-white.png"
              alt="Aljazira Bank"
              width={120}
              height={32}
              className="h-7 md:h-8 w-auto brightness-0 invert"
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`px-3 py-1.5 text-[13px] font-medium tracking-wide transition-all duration-300 rounded-sm ${
                  activeSection === section.id
                    ? "text-sand bg-sand/10"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-10 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[4.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 bg-midnight/95 backdrop-blur-[20px] transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="section-container pt-8 flex flex-col gap-1">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`text-left py-3 px-4 text-lg font-light tracking-wide transition-all duration-300 border-l-2 ${
                activeSection === section.id
                  ? "text-sand border-sand"
                  : "text-white/50 border-transparent hover:text-white/80 hover:border-white/20"
              }`}
              style={{
                transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                transform: isOpen ? "translateX(0)" : "translateX(-20px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
