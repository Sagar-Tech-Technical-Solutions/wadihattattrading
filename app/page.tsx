import type { Metadata } from "next";
import AboutUsSection from "@/components/home/about-us";
import CategoriesSection from "@/components/home/categories";
import Homehero from "@/components/home/hero";
import PremiumCollection from "@/components/home/premium-collection";
import WhatWeDoSection from "@/components/home/what-we-do";
import StoresSection from "@/components/common/stores-section";
import FaqSection from "@/components/contact/faq-section";

export const metadata: Metadata = {
  title: "Wadi Hattat Trading | Luxury Textile Trading in Dubai",
  description:
    "Dubai's premier textile trading house. Sourcing authentic Japanese Nida, textured crepes, and luxury abaya fabrics across 4 Dubai showrooms and global wholesale distribution.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wadi Hattat Trading | Luxury Textile Trading in Dubai",
    description:
      "Dubai's premier textile trading house. Sourcing authentic Japanese Nida, textured crepes, and luxury abaya fabrics.",
    url: "/",
    images: [
      {
        url: "/Wadi Hattat Textile Storefront.webp",
        width: 1200,
        height: 630,
        alt: "Wadi Hattat Trading Dubai Showroom",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="relative">
      <Homehero />
      <AboutUsSection />
      <CategoriesSection />
      <PremiumCollection />
      <WhatWeDoSection />
      <StoresSection bgColor="bg-white" />
      <FaqSection className="px-4 md:px-8 lg:px-16" />
    </main>
  );
}
