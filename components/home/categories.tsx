"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { Reveal } from "@/layouts/reveal";
import { CATEGORIES, type Category } from "@/data/products";

export type { Category };

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
      className="w-full bg-gray-100 py-8 lg:py-16 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header Row: Title */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-[1.7rem] md:text-6xl lg:text-[2rem] text-black/90 font-normal leading-[1.2]">
                Explore Collections
              </h2>
            </div>
          </div>
        </Reveal>

        {/* Embla Categories Slider Container with Center Left and Right Arrows */}
        <div className="relative group/slider mt-6 lg:mt-8">
          {/* Center-Left Arrow Button */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous collection"
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-black shadow-md border border-neutral-200/90 flex items-center justify-center transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none cursor-pointer hover:scale-105 active:scale-95"
          >
            <span className="text-base select-none">←</span>
          </button>

          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            {/* Embla Track */}
            <div className="flex -ml-3 lg:-ml-4 select-none touch-pan-y">
              {CATEGORIES.map((cat, idx) => (
                <div
                  key={cat.id}
                  className="min-w-0 shrink-0 pl-3 lg:pl-4 basis-[72%] sm:basis-[48%] md:basis-[33.333%] lg:basis-[25%]"
                >
                  <Link
                    href={`/collection/${cat.slug}`}
                    className="group relative block aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-100 transition-all duration-500"
                  >
                    {/* Fabric Image */}
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      draggable={false}
                      sizes="(max-width: 640px) 72vw, (max-width: 768px) 48vw, (max-width: 1024px) 33vw, 25vw"
                      priority={idx < 4}
                      className="object-cover object-center pointer-events-none transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Soft Bottom Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300 pointer-events-none" />

                    {/* Card Bottom: Category Name & Explore Action */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
                      <h3 className="text-lg sm:text-xl lg:text-[1.3rem] text-white font-light tracking-wide">
                        {cat.name}
                      </h3>

                      <div className="mt-2 pt-3 border-t border-white/20 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-medium text-white/90 group-hover:text-dark-gold transition-colors duration-300">
                        <span>Explore</span>
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Center-Right Arrow Button */}
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next collection"
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-black shadow-md border border-neutral-200/90 flex items-center justify-center transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none cursor-pointer hover:scale-105 active:scale-95"
          >
            <span className="text-base select-none">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
