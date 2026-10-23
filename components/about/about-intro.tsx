import React from "react";
import Link from "next/link";
import { Reveal } from "@/layouts/reveal";

export default function AboutIntro() {
  return (
    <section
      id="introduction"
      className="w-full bg-white text-neutral-900 py-10 sm:py-14 lg:py-20 px-4 md:px-8 lg:px-16 overflow-hidden border-b border-neutral-100"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Eyebrow, Heading & Complete Narrative (Aligned together) */}
          <Reveal className="lg:col-span-7 space-y-6" variant="up">
            <div>
              <span className="inline-block text-xs sm:text-[13px] font-mono uppercase tracking-[0.22em] text-[#ddaf4d] font-semibold mb-3">
                WHO WE ARE
              </span>

              <h2 className="font-display text-2xl sm:text-4xl lg:text-[40px] text-neutral-900 font-normal tracking-tight leading-[1.2]">
                A Trusted Textile Partner in the Heart of Dubai
              </h2>
            </div>

            <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-light pt-1">
              <p>
                Welcome to{" "}
                <strong className="font-medium text-neutral-900">
                  Wadi Hattat Trading
                </strong>
                , a trusted textile trading company headquartered in Dubai,
                United Arab Emirates. Situated at the crossroads of
                international trade, we specialize in sourcing, trading, and
                supplying high-grade fabrics and textile products both locally
                within the UAE market and to business partners across the globe.
              </p>

              <p>
                Founded on the principles of reliability, integrity, and
                exceptional quality, Wadi Hattat Trading has established itself
                as a key player in the regional and international textile supply
                chain. From local wholesale distribution to global sourcing, we
                bridge the gap between world-class textile manufacturers and
                diverse markets.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 hover:bg-black text-white text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer group"
              >
                <span>Partner With Us</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </Reveal>

          {/* Right Column: Balanced Key Capabilities Card */}
          <Reveal delay={150} variant="up" className="lg:col-span-5">
            <div className="rounded-2xl p-6 sm:p-8 bg-neutral-50/90 border border-neutral-200/80 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3.5">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#ddaf4d] font-semibold">
                  Key Capabilities
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  Dubai • UAE
                </span>
              </div>

              <div className="space-y-4 divide-y divide-neutral-200/70">
                <div className="pt-1 first:pt-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ddaf4d]" />
                    <h3 className="text-sm sm:text-base font-normal text-neutral-900">
                      Strategic Dubai Presence
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed pl-3.5">
                    4 retail and wholesale showrooms across Deira and Bur Dubai,
                    offering swift stock availability and dedicated customer
                    service.
                  </p>
                </div>

                <div className="pt-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ddaf4d]" />
                    <h3 className="text-sm sm:text-base font-normal text-neutral-900">
                      Global Direct Mill Sourcing
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed pl-3.5">
                    Longstanding partnerships with top-tier international mills
                    ensuring premium fabric grades, authenticity, and competitive
                    wholesale pricing.
                  </p>
                </div>

                <div className="pt-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ddaf4d]" />
                    <h3 className="text-sm sm:text-base font-normal text-neutral-900">
                      Wholesale &amp; Tailored Volume
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed pl-3.5">
                    Equipped to fulfill custom roll sampling, container
                    shipments, and steady commercial supply for boutiques,
                    tailors, and merchants.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
