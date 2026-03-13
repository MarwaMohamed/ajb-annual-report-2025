"use client";

import { gsap } from "@/lib/gsap";

export function createFadeUp(element: Element, delay: number = 0) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, delay, ease: "power3.out" }
  );
}

export function createStaggerFadeUp(elements: Element[], stagger: number = 0.12) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, stagger, ease: "power3.out" }
  );
}

export function createCounterAnimation(
  element: HTMLElement,
  end: number,
  duration: number = 2,
  decimals: number = 0,
  prefix: string = "",
  suffix: string = ""
) {
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: end,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = `${prefix}${obj.value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`;
    },
  });
}

export function createDrawLine(pathElement: SVGPathElement, duration: number = 1.2) {
  const length = pathElement.getTotalLength();
  gsap.set(pathElement, { strokeDasharray: length, strokeDashoffset: length });
  return gsap.to(pathElement, {
    strokeDashoffset: 0,
    duration,
    ease: "power2.inOut",
  });
}
