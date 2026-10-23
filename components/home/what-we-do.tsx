import React from "react";
import Link from "next/link";
import { Reveal } from "@/layouts/reveal";

interface ServiceItem {
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    title: "Local Supply & Wholesale",
    description:
      "We provide local businesses, tailors, boutiques, garment manufacturers, and retailers across the UAE with prompt access to high-grade fabrics and raw materials.",
  },
  {
    title: "Global Import & Export",
    description:
      "We manage seamless international trade logistics, importing premium textiles into the UAE and exporting across regional and global markets.",
  },
  {
    title: "Tailored Fabric Sourcing",
    description:
      "Leveraging a strong network of trusted textile mills worldwide, we source diverse fabrics tailored to specific client specifications and performance requirements.",
  },
];

export default function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      className="w-full bg-gray-100 text-neutral-900 py-8 lg:py-16 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* ============================================================== */}
        {/* HEADER: Title & Lead Narrative                                 */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 pb-8 lg:pb-12">
          <Reveal className="max-w-3xl" variant="up">
            <h2 className="font-display text-[1.7rem] md:text-6xl lg:text-[2rem] text-black/90 font-normal leading-[1.2]">
              What we do
            </h2>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-2xl">
              At{" "}
              <strong className="font-medium text-neutral-800">
                Wadi Hattat Trading
              </strong>
              , we offer comprehensive textile solutions tailored to meet the
              dynamic needs of local businesses and international trade:
            </p>
          </Reveal>

          <Reveal delay={120} variant="fade" className="lg:pb-1 shrink-0">
            <Link
              href="/contact-us"
              className="px-5 sm:px-7 py-2.5 sm:py-3 inline-flex items-center gap-2 bg-gold text-black text-xs uppercase tracking-wider hover:bg-white hover:text-dark-blue border border-transparent hover:border-neutral-200 font-semibold transition-all duration-300 rounded-full shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Partner With Us</span>
            </Link>
          </Reveal>
        </div>

        {/* ============================================================== */}
        {/* 3 SERVICES CARDS (NO ICONS, ONLY PROVIDED CONTENT)            */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {SERVICES.map((service, index) => (
            <Reveal
              key={index}
              delay={index * 120}
              variant="up"
              className="h-full"
            >
              <div className="h-full rounded-xl p-6 sm:p-8 lg:p-9 bg-white hover:bg-white hover:border-neutral-300 transition-all duration-300 hover:shadow-md flex flex-col justify-start">
                <h3 className="text-lg sm:text-xl font-normal text-neutral-900 tracking-tight mb-3 sm:mb-4">
                  {service.title}
                </h3>

                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
