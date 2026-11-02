import React from "react";
import Image from "next/image";
import { Reveal } from "@/layouts/reveal";

export default function AboutHeritage() {
  return (
    <section
      id="heritage"
      className="w-full bg-gray-100 text-neutral-900 py-16 sm:py-20 lg:py-28 px-4 md:px-8 lg:px-16 overflow-hidden border-b border-neutral-100"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-18 items-center">
          {/* Left Column: Master Craftsman Heritage Image */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <Reveal variant="scale" className="relative">
              <div className="relative aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-200 border border-neutral-200/90 shadow-2xl">
                <Image
                  src="/about-heritage.jpg"
                  alt="Senior textile merchant inspecting fine fabric rolls at Wadi Hattat Trading"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Glass Badge */}
                <div className="absolute bottom-5 inset-x-5 sm:bottom-6 sm:inset-x-6 z-10">
                  <div className="backdrop-blur-md bg-black/45 border border-white/20 rounded-xl p-4 text-white shadow-lg">
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-[#ddaf4d] font-semibold mb-1">
                      Pioneering Spirit
                    </span>
                    <p className="text-xs sm:text-[13px] font-light leading-relaxed text-neutral-200">
                      Over two decades of master inspection, trusted trade
                      relationships, and regional leadership.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Accent Glow */}
              <div
                className="absolute -bottom-6 -left-6 w-44 h-44 bg-[#ddaf4d]/15 rounded-full blur-2xl pointer-events-none"
                aria-hidden="true"
              />
            </Reveal>
          </div>

          {/* Right Column: Refined Heritage Narrative & Stats */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 order-1 lg:order-2">
            <Reveal variant="up">
              <span className="inline-block text-xs sm:text-[13px] font-mono uppercase tracking-[0.22em] text-[#ddaf4d] font-semibold mb-2 sm:mb-3">
                OUR HERITAGE
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-light text-neutral-900 tracking-tight leading-[1.15]">
                Pioneering the Regional Textile Trade
              </h2>

              <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-light mt-4">
                <p>
                  Over two decades ago, when the Gulf modest fashion market
                  relied almost exclusively on limited import routes,{" "}
                  <strong className="font-medium text-neutral-900">
                    Wadi Hattat Trading
                  </strong>{" "}
                  helped pioneer the introduction of advanced Asian weaving
                  mills to Dubai.
                </p>

                <p>
                  By recognizing the remarkable drape, resilience, and tactile
                  beauty of modern Nida and crepes early on, we transformed
                  regional access—making couture-grade textiles accessible to
                  local tailors and global volume buyers alike.
                </p>
              </div>
            </Reveal>

            {/* Quick Highlight Stats */}
            <Reveal delay={150} variant="up">
              <div className="pt-6 grid grid-cols-3 gap-4 sm:gap-6 border-t border-neutral-200/80">
                <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
                  <div className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
                    20+
                  </div>
                  <div className="text-xs text-neutral-500 font-light mt-1">
                    Years Heritage
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
                  <div className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
                    4
                  </div>
                  <div className="text-xs text-neutral-500 font-light mt-1">
                    Dubai Showrooms
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
                  <div className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
                    Global
                  </div>
                  <div className="text-xs text-neutral-500 font-light mt-1">
                    Export Reach
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
