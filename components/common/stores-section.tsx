"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { STORES, type StoreLocation } from "@/data/stores";
import { Reveal } from "@/layouts/reveal";

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
  title = "Visit our stores",
  subtitle = "Experience our luxury fabric collections in person across Dubai's premier textile districts.",
  bgColor = "bg-white",
}: StoresSectionProps) {
  const [detailsModalStore, setDetailsModalStore] =
    useState<StoreLocation | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image index whenever a new store is selected
  const handleOpenStore = (store: StoreLocation) => {
    setActiveImageIndex(0);
    setDetailsModalStore(store);
  };

  // Prevent background website scrolling & pause Lenis when modal is open
  useEffect(() => {
    if (detailsModalStore) {
      // 1. Freeze Lenis smooth scroll
      const lenis = (window as any).lenis;
      lenis?.stop();
      document.documentElement.classList.add("lenis-stopped");

      // 2. Lock body and HTML scrolling
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyPaddingRight = document.body.style.paddingRight;

      // Prevent layout shift if scrollbar disappears
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // 3. Keyboard handlers (Escape to close, Left/Right for gallery)
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setDetailsModalStore(null);
        } else if (e.key === "ArrowLeft") {
          setActiveImageIndex((prev) => {
            const total = detailsModalStore.images?.length || 1;
            return prev > 0 ? prev - 1 : total - 1;
          });
        } else if (e.key === "ArrowRight") {
          setActiveImageIndex((prev) => {
            const total = detailsModalStore.images?.length || 1;
            return prev < total - 1 ? prev + 1 : 0;
          });
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        lenis?.start();
        document.documentElement.classList.remove("lenis-stopped");
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.paddingRight = originalBodyPaddingRight;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [detailsModalStore]);

  return (
    <section
      id="stores"
      className={`w-full ${bgColor} text-neutral-900 py-8 sm:py-12 lg:py-16 px-4 md:px-8 lg:px-16 overflow-hidden ${className}`}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* ============================================================== */}
        {/* UNIFORM SECTION HEADER                                         */}
        {/* ============================================================== */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 lg:pb-8">
            <div>
              <h2 className="font-display text-[1.7rem] md:text-6xl lg:text-[2rem] text-black/90 font-normal leading-[1.2]">
                {title}
              </h2>

              {subtitle && (
                <p className="text-xs sm:text-sm text-neutral-500 font-light mt-1.5 hidden sm:block max-w-lg">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-neutral-100 text-[10px] sm:text-xs font-mono text-neutral-700 border border-neutral-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>4 Dubai Showrooms</span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* ============================================================== */}
        {/* STORE CARDS (4/5 RATIO WITH AMBIENT OVERLAY & MINIMAL TEXT)    */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
          {STORES.map((store, index) => (
            <Reveal
              key={store.id}
              delay={index * 60}
              variant="up"
              className="h-full"
            >
              <div
                onClick={() => handleOpenStore(store)}
                className="group relative w-full aspect-[4/5] rounded-lg overflow-hidden cursor-pointer border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-end p-3.5 sm:p-4 select-none"
              >
                {/* Full-Bleed Store Image */}
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                />

                {/* Elegant Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 pointer-events-none" />

                {/* Bottom Overlay Info (Clean, Minimal, High-Contrast) */}
                <div className="relative z-10">
                  <p className="text-sm sm:text-[14px] font-light text-white tracking-tight  leading-snug">
                    {store.name}
                  </p>

                  {/* <p className="text-[11px] sm:text-xs text-neutral-300 font-light truncate mt-1">
                    {store.area}
                  </p> */}

                  <p className="pt-2 flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#ddaf4d] group-hover:text-white transition-colors">
                    <span>View details →</span>
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* COMPACT SHOWROOM DETAILS MODAL (4/5 CARD + COMPACT DETAILS)    */}
      {/* ============================================================== */}
      {detailsModalStore && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          onClick={() => setDetailsModalStore(null)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 md:p-6 animate-in fade-in duration-200 overscroll-contain"
        >
          <div
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] overflow-hidden animate-slide-up border border-neutral-100"
          >
            {/* Compact Modal Header */}
            <div className="px-5 py-4 sm:px-6 sm:py-4 border-b border-neutral-100 flex items-center justify-between gap-4 bg-white shrink-0">
              <div className="space-y-0.5">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#ddaf4d] font-semibold">
                  {detailsModalStore.tag} • Dubai
                </span>
                <h3 className="font-display text-lg sm:text-xl font-normal text-neutral-900 leading-snug">
                  {detailsModalStore.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setDetailsModalStore(null)}
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black transition-colors cursor-pointer shrink-0 text-sm"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Compact Modal Body (Side-by-Side: 4/5 Card + Compact Details) */}
            <div
              data-lenis-prevent
              className="p-4 sm:p-6 overflow-y-auto overscroll-contain flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
            >
              {/* Left: 4/5 Store Image Card */}
              <div className="w-full sm:w-[240px] md:w-[270px] shrink-0">
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs group select-none">
                  <Image
                    src={
                      (detailsModalStore.images &&
                        detailsModalStore.images[activeImageIndex]) ||
                      detailsModalStore.image
                    }
                    alt={detailsModalStore.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 270px"
                    className="object-cover object-center transition-all duration-300"
                    priority
                  />

                  {/* If store has multiple images, show subtle navigation arrows & dots */}
                  {detailsModalStore.images &&
                    detailsModalStore.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImageIndex((prev) =>
                              prev > 0
                                ? prev - 1
                                : detailsModalStore.images.length - 1,
                            )
                          }
                          aria-label="Previous image"
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer text-xs"
                        >
                          ‹
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setActiveImageIndex((prev) =>
                              prev < detailsModalStore.images.length - 1
                                ? prev + 1
                                : 0,
                            )
                          }
                          aria-label="Next image"
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer text-xs"
                        >
                          ›
                        </button>

                        <div className="absolute bottom-2.5 inset-x-0 flex justify-center gap-1.5 pointer-events-none">
                          {detailsModalStore.images.map((_, i) => (
                            <span
                              key={i}
                              className={`h-1.5 rounded-full transition-all ${
                                i === activeImageIndex
                                  ? "w-4 bg-white"
                                  : "w-1.5 bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                </div>
              </div>

              {/* Right: Compact Details & Small Map */}
              <div className="flex-1 w-full space-y-3.5">
                {/* Address */}
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  <span className="font-medium text-neutral-800">
                    Address:{" "}
                  </span>
                  {detailsModalStore.address}
                </p>

                {/* Hours & Contact Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200/70 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-medium">
                      Showroom Hours
                    </span>
                    <p className="text-neutral-800 font-medium text-xs mt-0.5">
                      {detailsModalStore.timings.weekdays}
                    </p>
                    <p className="text-neutral-500 text-[11px]">
                      Sunday: {detailsModalStore.timings.sunday}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-medium">
                      Inquiries
                    </span>
                    <p className="text-neutral-800 font-medium font-mono text-xs mt-0.5">
                      Tel: {detailsModalStore.phoneFormatted}
                    </p>
                    <p className="text-neutral-500 text-[11px]">
                      Wholesale &amp; retail consultation
                    </p>
                  </div>
                </div>

                {/* Compact Interactive Map */}
                <div className="relative w-full h-[125px] sm:h-[140px] rounded-xl overflow-hidden border border-neutral-200/80 bg-neutral-100 shadow-inner">
                  <iframe
                    title={`Map of ${detailsModalStore.name}`}
                    src={detailsModalStore.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>

                {/* Compact Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href={detailsModalStore.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-black text-white text-[11px] uppercase tracking-wider font-semibold transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                  >
                    <span>Directions</span>
                    <span>↗</span>
                  </a>

                  <a
                    href={`tel:${detailsModalStore.phone}`}
                    className="px-4 py-2.5 rounded-lg border border-neutral-300 hover:border-black text-neutral-800 hover:text-black text-[11px] font-mono font-medium transition-all bg-white cursor-pointer inline-flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <span>📞 Call</span>
                  </a>

                  <a
                    href={`https://wa.me/${detailsModalStore.whatsapp}?text=${encodeURIComponent(
                      `Hello Wadi Hattat Trading, I am inquiring about visiting your ${detailsModalStore.name} in ${detailsModalStore.area}.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white text-[11px] uppercase tracking-wider font-semibold transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
