import React from "react";
import { Reveal } from "@/layouts/reveal";

export default function AboutMissionVision() {
  return (
    <section className="w-full bg-gray-100 py-8 lg:py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Mission Card */}
          <Reveal delay={80} variant="left" className="h-full">
            <div className="h-full rounded-xl p-7 sm:p-10 lg:p-12 bg-neutral-900 text-white relative overflow-hidden shadow-xl flex flex-col justify-between">
              <div className="relative z-10">
                <span className="inline-block text-xs font-mono uppercase tracking-[0.24em] text-[#ddaf4d] mb-4">
                  OUR MISSION
                </span>

                <h3 className="font-display text-2xl sm:text-3xl font-normal leading-tight mb-5">
                  Empowering Markets with Superior Textiles
                </h3>

                <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                  To supply superior textile products through reliable local distribution and efficient international trade, leveraging our rich industry history to add tangible value to our customers&apos; operations.
                </p>
              </div>

              <div className="relative z-10 pt-8 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>VALUE CREATION</span>
                <span>RELIABILITY &amp; INTEGRITY</span>
              </div>
            </div>
          </Reveal>

          {/* Vision Card */}
          <Reveal delay={180} variant="right" className="h-full">
            <div className="h-full rounded-xl p-7 sm:p-10 lg:p-12 bg-white text-neutral-900 border border-neutral-200/90 relative overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="relative z-10">
                <span className="inline-block text-xs font-mono uppercase tracking-[0.24em] text-[#ddaf4d] mb-4">
                  OUR VISION
                </span>

                <h3 className="font-display text-2xl sm:text-3xl font-normal leading-tight mb-5">
                  Leading the Future of Regional &amp; Global Trade
                </h3>

                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                  To strengthen our position as a leading textile distributor in the UAE while continuing our legacy of innovation across global trade networks.
                </p>
              </div>

              <div className="relative z-10 pt-8 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400 font-mono">
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
