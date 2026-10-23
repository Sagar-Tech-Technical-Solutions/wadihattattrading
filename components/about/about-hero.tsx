import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20 pt-28 sm:pt-48 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background Architectural & Fabric Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/143215124874.jpg.jpeg"
          alt="Wadi Hattat Trading Dubai Showroom"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.4] contrast-[1.08] scale-[1.02]"
        />
        {/* Soft luxury multi-stop gradients for maximum readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-black/40 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Foreground Content Container matching max-w-[1400px] */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto">
        <div className="max-w-4xl">
          {/* Eyebrow tag */}
          <span className="inline-block text-xs sm:text-[13px] font-mono uppercase tracking-[0.24em] text-gold mb-4 sm:mb-5">
            WHO WE ARE
          </span>

          {/* Grand Headline */}
          <h1 className="max-w-2xl font-display text-[2rem] sm:text-5xl md:text-6xl lg:text-[3.2vw] text-white font-normal tracking-[0.02em] leading-[1.14] mb-6">
            A Trusted Textile Trading Company in Dubai.
          </h1>

          {/* Narrative Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-neutral-200 font-light leading-relaxed max-w-3xl">
            <p>
              Welcome to{" "}
              <strong className="font-medium text-white">
                Wadi Hattat Trading
              </strong>
              , a trusted textile trading company headquartered in Dubai, United
              Arab Emirates. Situated at the crossroads of international trade,
              we specialize in sourcing, trading, and supplying high-grade
              fabrics and textile products both locally within the UAE market
              and to business partners across the globe.
            </p>
            <p className="text-neutral-300">
              Founded on the principles of reliability, integrity, and
              exceptional quality, Wadi Hattat Trading has established itself as
              a key player in the regional and international textile supply
              chain. From local wholesale distribution to global sourcing, we
              bridge the gap between world-class textile manufacturers and
              diverse markets.
            </p>
          </div>

          {/* Call to Actions matching Homepage Style */}
          <div className="pt-8 sm:pt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/contact-us"
              className="px-6 sm:px-8 py-3 bg-gold text-dark-blue text-xs uppercase tracking-wider rounded-full hover:bg-white hover:text-dark-blue font-semibold transition-all duration-300 shadow-md inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Partner With Us</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <a
              href="#heritage"
              className="px-6 sm:px-8 py-3 border border-white/70 text-white text-xs uppercase tracking-wider rounded-full hover:bg-white hover:text-dark-blue transition-all duration-300 inline-flex items-center gap-2 backdrop-blur-xs cursor-pointer"
            >
              <span>Our Heritage ↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
