"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { Reveal } from "@/layouts/reveal";
import { fabrics } from "@/data/fabrics";
import FabricSwatchCard from "@/components/fabrics/fabric-swatch-card";

export default function CategoriesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    const raf = requestAnimationFrame(() => {
      onSelect();
    });

    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      id="categories"
      className="relative w-full bg-[#0f1329] text-white py-16 sm:py-20 lg:py-26 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* 1. Atmospheric Radial Gradient Glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-15%,rgba(32,39,72,0.55),rgba(7,9,19,1))] pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Rough Woven Textile Noise Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='roughNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roughNoise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "160px 160px",
        }}
        aria-hidden="true"
      />

      {/* 3. Subtle Warm Ambient Accent Glow */}
      <div
        className="absolute -top-36 left-1/2 -translate-x-1/2 w-[750px] h-[360px] bg-gradient-to-b from-[#ddaf4d]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Header Row: Title, Narrative & Action */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-[#ddaf4d] mb-2 sm:mb-3">
                OUR SIGNATURE TEXTILES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] text-white font-light tracking-tight leading-[1.15]">
                Fabric Lines
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-light max-w-xl leading-relaxed">
                Discover authentic NIDA, Crepe, Sheila, Chiffon, luxury silks,
                satins, couture embellishments, and pristine Kandura fabrics
                sourced for bespoke modest wear and wholesale distribution.
              </p>
            </div>

            <div className="shrink-0 pt-2 md:pt-0">
              <Link
                href="/fabrics"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium px-5 py-2.5 rounded-full border border-white/20 hover:border-white text-white hover:bg-white hover:text-neutral-950 transition-all duration-300 cursor-pointer"
              >
                <span>View All Fabrics</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Embla Categories Slider Container with Navigation Arrows */}
        <Reveal
          delay={120}
          variant="up"
          className="relative group/slider mt-8 lg:mt-12"
        >
          {/* Center-Left Arrow Button (Aligned with Swatch Cards) */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous fabric swatch"
            className="absolute -left-2 sm:-left-5 top-[38%] -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#070913]/90 hover:bg-white text-white hover:text-black shadow-2xl border border-white/20 hover:border-white backdrop-blur-md flex items-center justify-center transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none cursor-pointer hover:scale-105 active:scale-95"
          >
            <span className="text-base select-none">←</span>
          </button>

          {/* Embla Viewport */}
          <div className="overflow-hidden py-3" ref={emblaRef}>
            {/* Embla Track */}
            <div className="flex -ml-4 sm:-ml-5 lg:-ml-6 select-none touch-pan-y">
              {fabrics.map((fabric, idx) => (
                <div
                  key={fabric.id}
                  className="min-w-0 shrink-0 pl-4 sm:pl-5 lg:pl-6 basis-[82%] sm:basis-[52%] md:basis-[36%] lg:basis-[28%] xl:basis-[25%]"
                >
                  <FabricSwatchCard
                    fabric={fabric}
                    idx={idx}
                    actionType="link"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Center-Right Arrow Button (Aligned with Swatch Cards) */}
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next fabric swatch"
            className="absolute -right-2 sm:-right-5 top-[38%] -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#070913]/90 hover:bg-white text-white hover:text-black shadow-2xl border border-white/20 hover:border-white backdrop-blur-md flex items-center justify-center transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none cursor-pointer hover:scale-105 active:scale-95"
          >
            <span className="text-base select-none">→</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
