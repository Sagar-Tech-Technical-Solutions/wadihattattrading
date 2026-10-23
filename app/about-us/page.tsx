import { Metadata } from "next";
import AboutHero from "@/components/about/about-hero";
import AboutHeritage from "@/components/about/about-heritage";
import WhatWeDoSection from "@/components/home/what-we-do";
import AboutWhyUs from "@/components/about/about-why-us";
import AboutMissionVision from "@/components/about/about-mission-vision";
import StoresSection from "@/components/common/stores-section";
import AboutCta from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: "About Us | Wadi Hattat Trading - Luxury Textile Trading in Dubai",
  description:
    "Founded on reliability, integrity, and exceptional quality, Wadi Hattat Trading is a premier textile trading company in Dubai specializing in local supply and global trade.",
  keywords: [
    "Wadi Hattat Trading",
    "About Wadi Hattat",
    "textile trading Dubai",
    "wholesale fabric supplier UAE",
    "abaya fabrics Dubai",
    "Chinese abaya fabrics pioneer",
  ],
};

export default function AboutUsPage() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* 1. Hero / Who We Are (Full Screen with Transparent Header) */}
      <AboutHero />

      {/* 2. Our Heritage Story */}
      <AboutHeritage />

      {/* 3. What We Do */}
      <WhatWeDoSection />

      {/* 4. Why Choose Us */}
      <AboutWhyUs />

      {/* 5. Mission & Vision */}
      <AboutMissionVision />

      {/* 6. 4 Dubai Showrooms & Locations */}
      <StoresSection bgColor="bg-white" />

      {/* 7. Partner With Us Callout */}
      {/* <AboutCta /> */}
    </main>
  );
}
