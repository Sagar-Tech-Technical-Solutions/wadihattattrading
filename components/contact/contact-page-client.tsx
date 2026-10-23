import React from "react";
import ContactHeroForm from "./contact-hero-form";
import StoresSection from "@/components/common/stores-section";
import FaqSection from "./faq-section";

export default function ContactPageClient() {
  return (
    <div className="w-full bg-white text-neutral-900 py-6 lg:py-10 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto space-y-12 lg:space-y-16">
        <ContactHeroForm />
        <StoresSection
          className="!py-0 !px-0"
          title="Our Dubai Store Locations"
          subtitle="Explore all 4 wholesale showrooms in Deira & Bur Dubai. Click each location to inspect the map and get instant directions."
        />
        <FaqSection />
      </div>
    </div>
  );
}
