"use client";

import SmoothScroller from "@/components/layout/SmoothScroller";
import Navigation from "@/components/layout/Navigation";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SectionIndicator from "@/components/layout/SectionIndicator";
import HeroSection from "@/components/sections/HeroSection";
import ThemeSection from "@/components/sections/ThemeSection";
import { ChairmanSection, CEOSection } from "@/components/sections/LeadershipSection";
import StrategySection from "@/components/sections/StrategySection";
import IdentitySection from "@/components/sections/IdentitySection";
import KeyFactsSection from "@/components/sections/KeyFactsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import SustainabilitySection from "@/components/sections/SustainabilitySection";
import ClosingSection from "@/components/sections/ClosingSection";

export default function Home() {
  return (
    <SmoothScroller>
      <ScrollProgress />
      <Navigation />
      <SectionIndicator />

      <main>
        <HeroSection />
        <ThemeSection />
        <ChairmanSection />
        <CEOSection />
        <StrategySection />
        <IdentitySection />
        <KeyFactsSection />
        <TimelineSection />
        <SustainabilitySection />
        <ClosingSection />
      </main>
    </SmoothScroller>
  );
}
