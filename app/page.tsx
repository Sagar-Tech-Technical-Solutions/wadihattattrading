import type { Metadata } from "next";
import AboutUsSection from "@/components/home/about-us";
import CategoriesSection from "@/components/home/categories";
import Homehero from "@/components/home/hero";
import WhatWeDoSection from "@/components/home/what-we-do";
import OurPartnersSection from "@/components/home/our-partners";
import MapSection from "@/components/home/map-section";
import FaqSection from "@/components/contact/faq-section";
import AboutHeritage from "@/components/about/about-heritage";
import { InstagramFeed } from "@/components/home/instagram-feed";
import BlogSection from "@/components/home/blog-section";

export const metadata: Metadata = {
  title: "Wadi Hattat Trading | Wholesale Textile Trading in Dubai",
  description:
    "Dubai's premier textile trading house. Sourcing authentic Japanese Nida, textured crepes, and luxury abaya fabrics across 4 Dubai showrooms and global wholesale distribution.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wadi Hattat Trading | Wholesale Textile Trading in Dubai",
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

export default async function Home() {
  return (
    <main className="relative">
      <Homehero />
      <AboutUsSection />
      <CategoriesSection />
      <AboutHeritage />
      <WhatWeDoSection />
      <OurPartnersSection />
      <MapSection />
      <div className="bg-gray-100">
        <InstagramFeed />
      </div>
      <FaqSection />
      <BlogSection />
    </main>
  );
}
