import React from "react";
import Image from "next/image";
import { Reveal } from "@/layouts/reveal";

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[82vh] flex flex-col justify-end pb-10 sm:pb-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background Storefront Image (Crisp, High Visibility) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Wadi Hattat Textile Storefront.webp"
          alt="Wadi Hattat Trading Dubai Showroom"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.75] sm:brightness-[0.82] contrast-[1.02]"
        />
        {/* Soft, minimal gradient only at the bottom for text legibility, keeping the rest of the image clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 pointer-events-none" />
      </div>

      {/* Foreground Minimal Content Container */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto">
        <div className="max-w-2xl">
          {/* Eyebrow tag */}
          <Reveal delay={100} variant="fade">
            <span className="inline-block text-[11px] sm:text-xs font-mono uppercase tracking-[0.24em] text-gold mb-2 sm:mb-3">
              ABOUT OUR COMPANY
            </span>
          </Reveal>

          {/* Minimal, Luxury Heading */}
          <Reveal delay={180} variant="up">
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight leading-[1.15] mb-2 sm:mb-3">
              About Wadi Hattat
            </h1>
          </Reveal>

          {/* Single clean line */}
          <Reveal delay={260} variant="up">
            <p className="text-sm sm:text-base text-neutral-200/90 font-light leading-relaxed max-w-xl">
              A trusted textile trading house rooted in Dubai since 2004,
              bridging global fabric mills with regional trade.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
