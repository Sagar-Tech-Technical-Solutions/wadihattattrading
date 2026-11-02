import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/layouts/reveal";
import { STORES } from "@/data/stores";

export default function MapSection() {
  return (
    <section
      id="locations-map"
      className="w-full bg-gray-100 py-16 sm:py-20 lg:py-28 px-4 md:px-8 lg:px-16 overflow-hidden "
    >
      <div className="max-w-[1400px] mx-auto text-center">
        {/* Centered Heading & Subtitle */}
        <Reveal variant="fade" className="max-w-2xl mx-auto mb-10 sm:mb-12">
          {/* <span className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#ddaf4d] mb-2.5">
            DUBAI SHOWROOM NETWORK
          </span> */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] text-neutral-900 font-normal leading-[1.2] tracking-tight">
            Find Us
          </h2>
          <p className="mt-3.5 text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-xl mx-auto">
            Conveniently situated across Al Sabkha, Deira, and Souq Al Kabeer,
            Bur Dubai. Visit any of our 4 showrooms to explore tactile fabric
            swatches and place wholesale orders.
          </p>
        </Reveal>

        {/* Centered Map Frame */}
        <Reveal variant="up" delay={80} className="w-full">
          <div className="relative w-full max-w-[1000px] mx-auto overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/90 shadow-2xl bg-neutral-50 group">
            <div className="relative aspect-[16/11] md:aspect-[16/9] w-full">
              <Image
                src="/mapview.webp"
                alt="Wadi Hattat Trading Dubai Showroom Locations Map"
                height={1000}
                width={1600}
                sizes="100vw"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                priority={false}
              />
            </div>

            {/* Subtle Gradient Vignette Overlay for Depth */}
            <div
              className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl sm:rounded-3xl pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </Reveal>

        {/* Informative Location Badges & Details */}
        <Reveal variant="up" delay={140} className="mt-10 sm:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1000px] mx-auto text-left">
            {STORES.map((store, idx) => (
              <div
                key={store.id}
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-neutral-200/70 hover:border-neutral-400/80 transition-colors flex flex-col justify-between"
              >
                <div>
                  <p className="text-[13px] font-medium text-neutral-900 leading-snug">
                    {store.name}
                  </p>
                  <p className="mt-1.5 text-[11px] text-neutral-500 font-light leading-relaxed line-clamp-2">
                    {store.address}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                  <a
                    href={store.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-neutral-800 hover:text-[#ddaf4d] transition-colors"
                  >
                    <span>Get Directions</span>
                    <span>→</span>
                  </a>
                  {/* <a
                    href={`tel:${store.phone}`}
                    className="text-[11px] text-neutral-500 hover:text-neutral-900 font-mono"
                  >
                    {store.phoneFormatted}
                  </a> */}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
