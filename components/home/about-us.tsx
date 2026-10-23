import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutUsSection() {
  return (
    <section
      id="about-us"
      className="w-full bg-white text-neutral-900 py-8 lg:py-16 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* ============================================================== */}
        {/* TOP ROW: EYEBROW, HEADLINE, NARRATIVE & EXPLORE MORE BUTTON   */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 pb-6 lg:pb-6">
          <div className="max-w-3xl">
            {/* Eyebrow tag */}
            <span className="inline-block text-xs sm:text-[13px] font-mono uppercase tracking-[0.22em] text-neutral-400 mb-3 sm:mb-4">
              WHO WE ARE
            </span>

            {/* Main Headline with Accent Colored Text */}
            <h2 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[45px] font-normal tracking-tight text-neutral-900 leading-[1.25] mb-6">
              About Wadi Hattat Trading
            </h2>

            {/* Narrative text from user prompt */}
            <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-light max-w-3xl">
              <p>
                Welcome to{" "}
                <strong className="font-medium text-neutral-800">
                  Wadi Hattat Trading
                </strong>
                , a trusted textile trading company headquartered in Dubai,
                United Arab Emirates. Situated at the crossroads of
                international trade, we specialize in sourcing, trading, and
                supplying high-quality fabrics and textile products both locally
                within the UAE market and to business partners across the globe.
              </p>
              {/* <p>
                Founded on the principles of reliability, integrity, and
                exceptional quality, Wadi Hattat Trading has established itself
                as a key player in the regional and international textile supply
                chain. From local wholesale distribution to global sourcing, we
                bridge the gap between world-class textile manufacturers and
                diverse markets.
              </p> */}
            </div>
          </div>

          {/* Right: Clean Action Button */}
          <div className="lg:pb-1 shrink-0">
            <Link
              href="/about-us"
              className="px-5 sm:px-7 py-2.5 sm:py-3 inline-flex items-center gap-2 bg-gold text-dark-blue text-xs uppercase tracking-wider hover:bg-white hover:text-dark-blue border border-transparent hover:border-neutral-200 font-semibold transition-all duration-300 rounded-full shadow-sm hover:shadow-md cursor-pointer group"
            >
              <span>About us</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM ROW: TWO BALANCED IMAGE CARDS (Clean Breathing Space)   */}
        {/* ============================================================== */}
        <div className="pt-4 lg:pt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Column 1: Draped Luxury Textile + Stats Below (Narrower ~ 35%) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 sm:gap-5">
            {/* First Image */}
            <div className="relative rounded-xl overflow-hidden min-h-[240px] sm:min-h-[300px] lg:min-h-[360px] flex-1 bg-neutral-100 shadow-sm group">
              <Image
                src="/fabrics/cloth-1.jpg"
                alt="Wadi Hattat Luxury Fabric Weave"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Ambient subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Stats below first image (in flow, no absolute) */}
            <div className="rounded-xl py-3.5 px-5 sm:py-4 sm:px-7 bg-neutral-50/80 border border-neutral-200/80 flex items-center justify-between sm:justify-start gap-5 sm:gap-7 shadow-xs">
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">
                  25+
                </div>
                <div className="text-[10px] sm:text-[11px] text-neutral-500 font-medium tracking-wide uppercase mt-0.5">
                  Years Heritage
                </div>
              </div>

              <div className="h-8 sm:h-9 w-px bg-neutral-200" />

              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">
                  100%
                </div>
                <div className="text-[10px] sm:text-[11px] text-neutral-500 font-medium tracking-wide uppercase mt-0.5">
                  Authentic Quality
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Dubai Showroom (Wider Card ~ 65%) */}
          <div className="lg:col-span-7 xl:col-span-8 relative rounded-xl overflow-hidden min-h-[280px] sm:min-h-[420px] lg:min-h-[460px] bg-neutral-100 shadow-sm group">
            <Image
              src="/143215124874.jpg.jpeg"
              alt="Wadi Hattat Trading Dubai Showroom"
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              priority={false}
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
