import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/layouts/reveal";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  highlight: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "01",
    title: "Local Supply & Wholesale",
    description:
      "We provide local businesses, tailors, boutiques, garment manufacturers, and retailers across the UAE with prompt access to high-grade fabrics and raw materials.",
    highlight: "Daily delivery across UAE",
  },
  {
    id: "02",
    title: "Global Import & Export",
    description:
      "We manage seamless international trade logistics, importing premium textiles into the UAE and exporting across regional and global markets.",
    highlight: "Container volume distribution",
  },
  {
    id: "03",
    title: "Tailored Fabric Sourcing",
    description:
      "Leveraging a strong network of trusted textile mills worldwide, we source diverse fabrics tailored to specific client specifications and performance requirements.",
    highlight: "Direct mill partnerships",
  },
];

export default function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      className="w-full bg-[#ffffff] text-neutral-900 py-16 sm:py-20 lg:py-28 px-4 md:px-8 lg:px-16 overflow-hidden border-t border-neutral-100"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-18 items-center">
          {/* ============================================================== */}
          {/* LEFT COLUMN: Human-Touch Fabric Craftsmanship Image (col-span-5) */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 relative">
            <Reveal variant="scale" className="relative">
              <div className="relative aspect-[4/4.5] sm:aspect-[3/4] lg:aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-200 border border-neutral-200/90 shadow-2xl">
                <Image
                  src="/what-we-do.jpg"
                  alt="Textile inspection and tactile fabric craftsmanship at Wadi Hattat Trading"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                  priority
                />

                {/* Subtle vignette gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-5 inset-x-5 sm:bottom-6 sm:inset-x-6 z-10">
                  <div className="backdrop-blur-md bg-black/45 border border-white/20 rounded-xl p-4 text-white shadow-lg">
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-[#ddaf4d] font-semibold mb-1">
                      Quality Guaranteed
                    </span>
                    <p className="text-xs sm:text-[13px] font-light leading-relaxed text-neutral-200">
                      Every roll of fabric is hand-inspected for weave density,
                      tactile drape, and flawless finish.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Accent Background Glow */}
              <div
                className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#ddaf4d]/15 rounded-full blur-2xl pointer-events-none"
                aria-hidden="true"
              />
            </Reveal>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: Header Narrative & 3 Structured Service Pillars  */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <Reveal variant="up">
              {/* <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-[#ddaf4d] mb-2 sm:mb-3">
                WHAT WE DO
              </span> */}

              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-light text-neutral-900 tracking-tight leading-[1.15]">
                What We Do
              </h2>

              <p className="mt-4 text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-2xl">
                At{" "}
                <strong className="font-medium text-neutral-900">
                  Wadi Hattat Trading
                </strong>
                , we offer comprehensive textile solutions tailored to meet the
                dynamic needs of local businesses and international trade.
              </p>
            </Reveal>

            {/* 3 Structured Service Cards */}
            <div className="space-y-6 pt-2">
              {SERVICES.map((service, index) => (
                <Reveal key={service.id} delay={index * 100} variant="up">
                  <div className="group   transition-all duration-300">
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* <span className="shrink-0 text-xs font-mono font-semibold tracking-wider text-[#ddaf4d] pt-1">
                        {service.id}
                      </span> */}

                      <div className="flex-1 ">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between  mb-2">
                          <p className="text-base sm:text-[16px] font-medium text-neutral-900 tracking-tight group-hover:text-black">
                            <span className="shrink-0 text-base font-mono font-normal tracking-wider text-[#ddaf4d] mr-2">
                              {service.id}
                            </span>{" "}
                            {service.title}
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Bottom Call to Action */}
            <Reveal
              delay={350}
              variant="fade"
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 shadow-md group cursor-pointer"
              >
                <span>Partner With Us</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/fabrics"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium px-6 py-3.5 rounded-full border border-neutral-300 hover:border-neutral-900 text-neutral-800 hover:text-black transition-colors"
              >
                <span>Browse All Fabrics</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
