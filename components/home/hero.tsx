"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export interface Slide {
  id: number;
  type?: "image" | "video";
  image?: string;
  video?: string;
  src?: string;
  poster?: string;
  alt?: string;
}

const isVideoSlide = (slide: Slide): boolean => {
  if (slide.type === "video") return true;
  if (slide.video) return true;
  const src = slide.video || slide.src || slide.image || "";
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);
};

const getSlideSrc = (slide: Slide): string => {
  return slide.video || slide.src || slide.image || "";
};

const slides: Slide[] = [
  // { id: 1, image: "/143215124874.jpg.jpeg", alt: "Textile slide 1" },
  {
    id: 2,
    image: "/297933065406.mp4",
    alt: "Textile video",
  },
];

const SLIDE_DURATION = 6000; // 6 seconds per slide

export default function Homehero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const hasMultipleSlides = slides.length > 1;

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Robust autoplay timer (advances slide every SLIDE_DURATION ms)
  useEffect(() => {
    if (!hasMultipleSlides) return;

    const timer = setInterval(() => {
      setCurrentSlide((curr) => (curr + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [currentSlide, hasMultipleSlides]);

  return (
    <section className="h-[75vh] lg:h-screen w-full relative flex flex-col justify-end overflow-hidden pb-10 sm:pb-12 lg:pb-16 px-4 md:px-8 lg:px-12">
      {/* Background Media Carousel with Crossfade */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => {
          const isVideo = isVideoSlide(slide);
          const src = getSlideSrc(slide);
          const isCurrent = index === currentSlide;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isCurrent ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
              }`}
            >
              {isVideo ? (
                <video
                  src={src}
                  poster={slide.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <Image
                  src={src}
                  alt={slide.alt || "Hero slide"}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center scale-105 transition-transform duration-[6500ms] ease-out"
                  style={{
                    transform: isCurrent ? "scale(1)" : "scale(1.08)",
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Dark Gradient Overlay for Maximum Legibility */}
        {/* <div className="absolute inset-0 bg-black/30 z-[1]" /> */}
      </div>

      {/* Hero Bottom Bar Container */}
      <div className="relative z-10 w-full flex flex-col items-center lg:flex-row lg:items-end lg:justify-between gap-8 sm:gap-10">
        {/* Left Side: Constant Headline & Two CTAs */}
        <div className="lg:max-w-[40vw]">
          <h1 className="text-3xl lg:text-[3.6vw] font-normal text-center lg:text-left text-white leading-[1.1] mb-6 sm:mb-8 font-serif">
            A trusted textile trading company in Dubai.
          </h1>

          {/* Two CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <Link
              href="/about-us"
              className="px-6 sm:px-7 py-3 bg-gold text-dark-blue  text-xs uppercase tracking-wider rounded-xs hover:bg-white hover:text-dark-blue font-semibold transition-all duration-300 flex items-center gap-2 shadow-md group"
            >
              <span>About us</span>
              {/* <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg> */}
            </Link>

            <Link
              href="/categories"
              className="px-6 sm:px-7 py-3 border border-white/70 text-white  text-xs uppercase tracking-wider rounded-xs hover:bg-white hover:text-dark-blue transition-all duration-300 flex items-center gap-2 group backdrop-blur-xs"
            >
              <span>Explore categories</span>
              {/* <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg> */}
            </Link>
          </div>
        </div>

        {/* Right Side: All Slides as Small Thumbnail Cards (Only shown if multiple slides exist) */}
        {hasMultipleSlides && (
          <div className="flex items-center gap-2 sm:gap-2.5 self-start lg:self-end flex-wrap sm:flex-nowrap">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              const isVideo = isVideoSlide(slide);
              const src = getSlideSrc(slide);

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`relative group cursor-pointer overflow-hidden rounded-xs transition-all duration-300 p-0.5 text-left focus:outline-none ${
                    isActive
                      ? "ring-2 ring-gold opacity-100 scale-102"
                      : "opacity-60 hover:opacity-100 ring-1 ring-white/30"
                  }`}
                >
                  <div className="relative w-16 h-11 sm:w-20 sm:h-14 md:w-18 md:h-12 rounded-xs overflow-hidden bg-black/40">
                    {isVideo ? (
                      slide.poster ? (
                        <Image
                          src={slide.poster}
                          alt={slide.alt || "Video preview"}
                          fill
                          sizes="120px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <video
                          src={src}
                          muted
                          playsInline
                          autoPlay
                          loop
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )
                    ) : (
                      <Image
                        src={src}
                        alt={slide.alt || "Slide preview"}
                        fill
                        sizes="120px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div
                      className={`absolute inset-0 transition-colors ${
                        isActive
                          ? "bg-black/10"
                          : "bg-black/35 group-hover:bg-black/10"
                      }`}
                    />

                    {/* Slide number badge with video icon */}
                    <span className="absolute bottom-1 right-1.5 text-[9px] sm:text-[10px] font-medium text-white/95 px-1 py-0.5 bg-black/60 backdrop-blur-xs rounded-xs leading-none flex items-center gap-1">
                      {isVideo && (
                        <svg
                          className="w-2.5 h-2.5 text-gold"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      )}
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </span>

                    {/* Active Slide Progress Bar */}
                    {isActive && (
                      <div className="absolute left-0 bottom-0 w-full h-[2.5px] bg-white/25 overflow-hidden">
                        <div
                          key={currentSlide}
                          className="h-full bg-gold animate-hero-progress"
                          style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                        />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
