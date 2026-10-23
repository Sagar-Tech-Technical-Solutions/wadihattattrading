"use client";

import React, { useState } from "react";
import { STORES, type StoreLocation } from "@/data/stores";

export default function ContactMapSection() {
  const [selectedStore, setSelectedStore] = useState<StoreLocation>(STORES[0]);

  return (
    <section className="relative rounded-xl overflow-hidden border border-neutral-200/90 shadow-md">
      {/* Embedded Interactive Map */}
      <div className="w-full h-[420px] sm:h-[500px] lg:h-[540px] bg-neutral-100">
        <iframe
          title={selectedStore.name}
          src={selectedStore.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale-[0.35] contrast-[1.05]"
        />
      </div>

      {/* Floating Store Card */}
      <div className="absolute top-5 left-5 sm:top-8 sm:left-8 z-20 w-[90%] sm:w-[360px] max-w-full bg-white/95 backdrop-blur-md rounded-xl p-5 sm:p-6 shadow-xl border border-neutral-200/80">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-0.5">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </div>

          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ddaf4d]">
              {selectedStore.tag}
            </span>
            <h4 className="text-sm font-semibold text-neutral-900 leading-snug">
              {selectedStore.name}
            </h4>
          </div>
        </div>

        <p className="text-xs text-neutral-600 font-light leading-relaxed mb-3">
          {selectedStore.address}
        </p>

        {/* Quick Location Switcher Pills for all 4 Dubai stores */}
        <div className="pt-2 pb-3 border-t border-neutral-100">
          <span className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-2">
            Switch Dubai Branch:
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {STORES.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStore(st)}
                className={`px-2 py-1.5 rounded-md text-[10px] font-medium text-left truncate transition-colors cursor-pointer ${
                  selectedStore.id === st.id
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {st.tag}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3 text-xs">
          <a
            href={selectedStore.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-neutral-900 hover:text-[#ddaf4d] transition-colors"
          >
            <span>Get Directions</span>
            <span>↗</span>
          </a>

          <a
            href={`tel:${selectedStore.phone}`}
            className="font-mono text-neutral-600 hover:text-black"
          >
            {selectedStore.phoneFormatted}
          </a>
        </div>
      </div>
    </section>
  );
}
