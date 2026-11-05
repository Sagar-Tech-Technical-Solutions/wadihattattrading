import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/layouts/reveal";

export default function AboutIntro() {
  return (
    <section
      id="introduction"
      className="w-full bg-white text-neutral-900 py-16 sm:py-20 lg:py-28 px-4 md:px-8 lg:px-16 overflow-hidden border-b border-neutral-100"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-18 items-center">
          {/* Left Column: Eyebrow, Heading & Complete Narrative */}
          <Reveal className="lg:col-span-7 space-y-5 sm:space-y-6" variant="up">
            <div>
              <span className="inline-block text-xs sm:text-[13px] font-mono uppercase tracking-[0.22em] text-[#ddaf4d] font-semibold mb-3">
                WHO WE ARE
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-light text-neutral-900 tracking-tight leading-[1.15]">
                A Trusted Textile Partner in the Heart of Dubai
              </h2>
            </div>

            <div className="space-y-3.5 text-neutral-600 text-sm sm:text-[15px] leading-relaxed font-light">
              <p>
                Welcome to{" "}
                <strong className="font-medium text-neutral-900">
                  Wadi Hattat Trading
                </strong>
                , a trusted textile trading company headquartered in Dubai,
                United Arab Emirates, with roots that trace back to{" "}
                <strong className="font-medium text-neutral-900">
                  Wadi Hattat, Oman
                </strong>
                , where our journey first began.
              </p>

              <p>
                Our name is a tribute to our origins, reflecting the place where
                our business was established and the values that continue to
                guide us today. What started in Wadi Hattat, Oman, has grown
                into a comprehensive textile trading business based in Dubai,
                connecting suppliers, manufacturers, and customers across local
                and international markets.
              </p>

              <p>
                Strategically positioned at the crossroads of global trade, we
                specialize in sourcing, trading, and supplying high-quality
                fabrics and textile products to businesses throughout the UAE
                and international markets.
              </p>

              <p>
                From local wholesale distribution to international sourcing and
                supply, we bridge the gap between established textile
                manufacturers and diverse markets worldwide, combining our Omani
                heritage with Dubai&apos;s global trading opportunities.
              </p>
            </div>

            {/* Signature Motto Callout */}
            <div className="p-4 rounded-xl bg-neutral-50/90 border-l-2 border-[#ddaf4d] text-neutral-800 text-xs sm:text-[13px] italic font-light">
              “Rooted in Oman. Growing from Dubai. Connecting Textile Markets
              Worldwide.”
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs uppercase tracking-[0.16em] font-medium transition-all shadow-md group cursor-pointer"
              >
                <span>Partner With Us</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </Reveal>

          {/* Right Column: Human-Touch Editorial Visual */}
          <div className="lg:col-span-5 relative">
            <Reveal delay={150} variant="scale" className="relative">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-2xl">
                <Image
                  src="/founderr.jpeg"
                  alt="Chairman of Wadi Hattat Trading"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

                {/* Floating Glass Label */}
                <div className="absolute bottom-5 inset-x-5 sm:bottom-6 sm:inset-x-6 z-10">
                  <div className="backdrop-blur-md bg-black/45 border border-white/20 rounded-xl p-4 text-white shadow-lg">
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-[#ddaf4d] font-semibold mb-1">
                      Chairman • Wadi Hattat Trading
                    </span>
                    <p className="text-xs sm:text-[13px] font-light leading-relaxed text-neutral-200">
                      Leading Wadi Hattat with enduring integrity, dedication to
                      quality, and a visionary commitment to connecting global
                      textile markets.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Background Accent */}
              <div
                className="absolute -top-6 -right-6 w-44 h-44 bg-[#ddaf4d]/10 rounded-full blur-2xl pointer-events-none"
                aria-hidden="true"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
