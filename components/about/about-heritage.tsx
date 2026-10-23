import React from "react";
import Image from "next/image";

export default function AboutHeritage() {
  return (
    <section
      id="heritage"
      className="w-full bg-white text-neutral-900 py-8 lg:py-16 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block text-xs sm:text-[13px] font-mono uppercase tracking-[0.22em] text-neutral-400 mb-3 sm:mb-4">
              OUR HERITAGE
            </span>

            <h2 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[45px] font-normal tracking-tight text-neutral-900 leading-[1.2] mb-6">
              Pioneering the Global Textile Trade
            </h2>

            <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              <p>
                Over 20 years ago, when the abaya fabric market was almost exclusively dominated by imports from Korea and Indonesia, <strong className="font-medium text-neutral-800">Wadi Hattat Trading</strong> was among the first companies to introduce Chinese abaya fabrics to Dubai.
              </p>
              <p>
                By recognizing the potential, quality, and versatility of textile mills in China early on, we helped transform the market—making Chinese fabrics famous, accessible, and widely appreciated both across the region and globally.
              </p>
              <p>
                Today, that pioneering spirit continues to drive our business as we stay ahead of industry trends and deliver innovation to our clients.
              </p>
            </div>

            {/* Quick Highlight Stats */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-neutral-100">
              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
                  20+
                </div>
                <div className="text-xs text-neutral-500 font-light mt-1">
                  Years of Market Heritage
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
                  4
                </div>
                <div className="text-xs text-neutral-500 font-light mt-1">
                  Dubai Showrooms
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
                  Global
                </div>
                <div className="text-xs text-neutral-500 font-light mt-1">
                  Import &amp; Export Reach
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Imagery with Floating Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden min-h-[380px] sm:min-h-[460px] bg-neutral-100 shadow-xl group">
              <Image
                src="/fabrics/cloth-1.jpg"
                alt="Wadi Hattat Textile Heritage"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Glass Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-xl border border-white/60">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ddaf4d] mb-1">
                  Established in Dubai
                </span>
                <p className="text-xs sm:text-sm font-medium text-neutral-900 leading-snug">
                  Pioneering regional trade &amp; bringing international textile innovation to the UAE.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
