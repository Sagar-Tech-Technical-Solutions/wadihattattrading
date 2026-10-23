"use client";

import React, { useState } from "react";
import { STORES, type StoreLocation } from "@/data/stores";

interface StoresSectionProps {
  className?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  bgColor?: string; // e.g. "bg-white" | "bg-gray-100"
}

export default function StoresSection({
  className = "",
  badge = "DUBAI LOCATIONS",
  title = "Visit Our 4 Dubai Showrooms",
  subtitle = "Strategically positioned in Dubai's premier wholesale and heritage textile districts across Deira and Bur Dubai.",
  bgColor = "bg-white",
}: StoresSectionProps) {
  const [activeStore, setActiveStore] = useState<StoreLocation>(STORES[0]);

  return (
    <section
      id="stores"
      className={`w-full ${bgColor} text-neutral-900 py-8 lg:py-16 px-4 md:px-8 lg:px-16 overflow-hidden ${className}`}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 lg:pb-12">
          <div className="max-w-3xl">
            <span className="inline-block text-xs sm:text-[13px] font-mono uppercase tracking-[0.22em] text-neutral-400 mb-3 sm:mb-4">
              {badge}
            </span>

            <h2 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[45px] font-normal tracking-tight text-neutral-900 leading-[1.2] mb-4">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-xs font-mono text-neutral-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>4 Active Locations in Dubai</span>
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE SHOWROOMS SHOWCASE                                */}
        {/* Left: 4 Interactive Location Cards | Right: Live Map & Details */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: 4 Location Selectable Cards (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-3.5">
            {STORES.map((store, index) => {
              const isSelected = activeStore.id === store.id;

              return (
                <div
                  key={store.id}
                  onClick={() => setActiveStore(store)}
                  className={`group relative rounded-xl p-5 sm:p-6 transition-all duration-300 cursor-pointer border text-left flex flex-col justify-between ${
                    isSelected
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-xl scale-[1.01]"
                      : "bg-white text-neutral-900 border-neutral-200/90 hover:border-neutral-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-mono uppercase tracking-[0.2em] font-semibold ${
                            isSelected ? "text-gold" : "text-[#ddaf4d]"
                          }`}
                        >
                          {store.tag}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            isSelected
                              ? "bg-white/10 text-neutral-300"
                              : "bg-neutral-100 text-neutral-500"
                          }`}
                        >
                          0{index + 1}
                        </span>
                      </div>

                      <h3
                        className={`text-base sm:text-lg font-normal tracking-tight ${
                          isSelected ? "text-white" : "text-neutral-900"
                        }`}
                      >
                        {store.name}
                      </h3>
                    </div>

                    {/* Radio Indicator */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 transition-all ${
                        isSelected
                          ? "bg-gold text-dark-blue shadow-xs"
                          : "border border-neutral-300 text-transparent group-hover:border-neutral-400"
                      }`}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                  </div>

                  <p
                    className={`text-xs font-light leading-relaxed mb-3 line-clamp-2 ${
                      isSelected ? "text-neutral-300" : "text-neutral-600"
                    }`}
                  >
                    {store.address}
                  </p>

                  <div
                    className={`pt-3 border-t flex items-center justify-between text-xs font-light ${
                      isSelected
                        ? "border-white/15 text-neutral-400"
                        : "border-neutral-100 text-neutral-500"
                    }`}
                  >
                    <span className="font-mono">{store.area}</span>
                    <span
                      className={`font-semibold transition-transform duration-300 inline-flex items-center gap-1 ${
                        isSelected
                          ? "text-gold translate-x-1"
                          : "text-neutral-800 group-hover:translate-x-1"
                      }`}
                    >
                      View on Map →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Interactive Map & Quick Visit Card (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* The Map Container with Rounded-xl */}
            <div className="relative rounded-xl overflow-hidden border border-neutral-200/90 shadow-md min-h-[380px] sm:min-h-[440px] flex-1 bg-neutral-100">
              <iframe
                key={activeStore.id}
                title={activeStore.name}
                src={activeStore.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[380px] sm:min-h-[440px] grayscale-[0.25] contrast-[1.05]"
              />

              {/* Top-Right Badge on Map */}
              <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-md rounded-xl py-2 px-3.5 shadow-md border border-neutral-200/80 text-[11px] font-mono text-neutral-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Selected: {activeStore.tag}</span>
              </div>
            </div>

            {/* Bottom Card for Selected Store: Action Bar */}
            <div className="rounded-xl p-5 sm:p-6 bg-neutral-50/80 border border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#ddaf4d] mb-0.5">
                  STORE TIMINGS &amp; CONTACT
                </span>
                <p className="text-xs text-neutral-800 font-medium">
                  {activeStore.timings.weekdays} •{" "}
                  <span className="text-neutral-500 font-light">
                    Sunday: {activeStore.timings.sunday}
                  </span>
                </p>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">
                  Tel: {activeStore.phoneFormatted}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={activeStore.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Get Directions</span>
                  <span>↗</span>
                </a>

                <a
                  href={`https://wa.me/${activeStore.whatsapp}?text=${encodeURIComponent(
                    `Hello Wadi Hattat Trading, I am inquiring about visiting your ${activeStore.name} (${activeStore.tag}).`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
