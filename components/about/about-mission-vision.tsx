import React from "react";
import { Reveal } from "@/layouts/reveal";

export default function AboutMissionVision() {
  return (
    <section className="w-full bg-[#f9f9fb] py-16 sm:py-20 lg:py-24 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Mission Card */}
          <Reveal delay={80} variant="left" className="h-full">
            <div className="h-full rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 bg-neutral-950 text-white relative overflow-hidden shadow-xl flex flex-col justify-between border border-neutral-800">
              <div className="relative z-10">
                <span className="inline-block text-xs font-mono uppercase tracking-[0.24em] text-[#ddaf4d] mb-3 sm:mb-4">
                  OUR MISSION
                </span>

                <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-light text-white tracking-tight leading-tight mb-4">
                  Empowering Markets with Superior Textiles
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  To supply exceptional textile products through steadfast local
                  wholesale distribution and seamless international trade,
                  elevating our clients&apos; fashion collections with genuine
                  craftsmanship and reliable supply lines.
                </p>
              </div>

              <div className="relative z-10 pt-6 mt-8 border-t border-white/15 flex items-center justify-between text-[11px] text-neutral-400 font-mono tracking-wider uppercase">
                <span>VALUE CREATION</span>
                <span>RELIABILITY &amp; INTEGRITY</span>
              </div>
            </div>
          </Reveal>

          {/* Vision Card */}
          <Reveal delay={180} variant="right" className="h-full">
            <div className="h-full rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 bg-white text-neutral-900 border border-neutral-200/90 relative overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="relative z-10">
                <span className="inline-block text-xs font-mono uppercase tracking-[0.24em] text-[#ddaf4d] mb-3 sm:mb-4">
                  OUR VISION
                </span>

                <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-light text-neutral-900 tracking-tight leading-tight mb-4">
                  Leading the Future of Regional &amp; Global Trade
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  To expand our leadership as Dubai&apos;s foremost textile destination
                  while continuing our pioneering legacy of fabric innovation,
                  authenticity, and enduring client partnerships worldwide.
                </p>
              </div>

              <div className="relative z-10 pt-6 mt-8 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-mono tracking-wider uppercase">
                <span>REGIONAL LEADERSHIP</span>
                <span>GLOBAL INNOVATION</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
