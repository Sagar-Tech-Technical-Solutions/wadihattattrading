import { Metadata } from "next";
import AboutHero from "@/components/about/about-hero";
import AboutIntro from "@/components/about/about-intro";
import AboutHeritage from "@/components/about/about-heritage";
import WhatWeDoSection from "@/components/home/what-we-do";
import AboutWhyUs from "@/components/about/about-why-us";
import AboutMissionVision from "@/components/about/about-mission-vision";
import StoresSection from "@/components/common/stores-section";
import AboutCta from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: "About Us | Wholesale Textile Trading in Dubai",
  description:
    "Founded on reliability, integrity, and exceptional quality, Wadi Hattat Trading is a premier textile trading company in Dubai with over 20 years of market heritage.",
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "About Us | Wadi Hattat Trading",
    description:
      "Pioneering global textile trade with over 20 years of market heritage in Dubai.",
    url: "/about-us",
    images: [
      {
        url: "/Modern Fabric Showroom Reception.webp",
        width: 1200,
        height: 630,
        alt: "Wadi Hattat Trading Showroom",
      },
    ],
  },
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
      {/* 1. Hero / Clean Luxury Storefront Visual */}
      <AboutHero />

      {/* 2. Who We Are / Company Introduction */}
      <AboutIntro />

      {/* 3. Our Heritage Story */}
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
