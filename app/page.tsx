import AboutUsSection from "@/components/home/about-us";
import CategoriesSection from "@/components/home/categories";
import Homehero from "@/components/home/hero";
import PremiumCollection from "@/components/home/premium-collection";
import WhatWeDoSection from "@/components/home/what-we-do";
import StoresSection from "@/components/common/stores-section";
import FaqSection from "@/components/contact/faq-section";

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
