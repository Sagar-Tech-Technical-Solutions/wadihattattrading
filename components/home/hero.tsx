"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export interface Slide {
  id: number;
  type?: "image" | "video";
  image?: string;
  video?: string;
  src?: string;
  poster?: string;
  alt?: string;
}

// 4 fabric samples modeled after the draped organic linen reference (Ivory Cream, Royal Navy, Desert Gold, Sage Olive)
const FABRIC_SAMPLES = [
  "/fabrics/1.webp",
  "/fabrics/2.webp",
  "/fabrics/3.webp",
  "/fabrics/4.webp",
];

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
  {
    id: 1,
    image: "/hero.jpg",
    alt: "Luxury draped midnight silk",
  },
  {
    id: 2,
    image: "/143215124874.jpg.jpeg",
    alt: "Luxury draped midnight silk",
  },
];

const SLIDE_DURATION = 6000;
const CYCLE_INTERVAL = 300; // 300ms per image

// In-memory flag: tracks completion within the current page lifecycle
let hasCompletedEntranceOnce = false;

// Helper: animation plays ONLY on homepage reload/direct entry, NOT on Link navigation
const shouldSkipLoader = (): boolean => {
  if (typeof window === "undefined") return false;
  if (hasCompletedEntranceOnce) return true;

  const win = window as unknown as {
    __isClientNavToHome?: boolean;
    __initialLoadedPath?: string;
  };

  if (win.__initialLoadedPath && win.__initialLoadedPath !== "/") {
    return true;
  }
  if (win.__isClientNavToHome) {
    win.__isClientNavToHome = false;
    return true;
  }
  return false;
};

type LoaderState = "loading" | "complete";

export default function Homehero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaderState, setLoaderState] = useState<LoaderState>(() =>
    shouldSkipLoader() ? "complete" : "loading",
  );

  // DOM references
  const videoRef = useRef<HTMLVideoElement>(null);
  const sheetContainerRef = useRef<HTMLDivElement>(null);
  const sheetImgRef = useRef<HTMLImageElement>(null);
  const whiteBackdropRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasMultipleSlides = slides.length > 1;

  // Slide autoplay
  useEffect(() => {
    if (!hasMultipleSlides || loaderState !== "complete") return;

    const timer = setInterval(() => {
      setCurrentSlide((curr) => (curr + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [currentSlide, hasMultipleSlides, loaderState]);

  // Preload fabric sample images and hero image
  useEffect(() => {
    FABRIC_SAMPLES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
    const heroImg = new window.Image();
    heroImg.src = "/hero.jpg";
  }, []);

  // Main loader engine: cloth sheet cycling -> video scale-up -> 100ms pause -> header/hero reveal
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (shouldSkipLoader() || prefersReducedMotion) {
      requestAnimationFrame(() => {
        setLoaderState("complete");
        hasCompletedEntranceOnce = true;
        window.dispatchEvent(new CustomEvent("fabric-loader-reveal"));
      });
      return;
    }

    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }

    // Centered sheet width sizing (height is handled purely by CSS aspect ratio aspect-[4/2])
    const isMobile = window.innerWidth < 640;
    const initialWidth = isMobile
      ? Math.min(window.innerWidth * 0.72, 280)
      : Math.min(window.innerWidth * 0.28, 380);

    const TILTS = [-2.8, 2.4, -2.0, 1.8];

    // Initial setup with first tilt & pop from a lower Y offset
    if (sheetContainerRef.current) {
      gsap.set(sheetContainerRef.current, {
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        width: `${initialWidth}px`,
        opacity: 1,
        y: 28,
        rotation: TILTS[0],
        scale: 0.92,
      });
      gsap.to(sheetContainerRef.current, {
        y: 0,
        scale: 1,
        duration: 0.38,
        ease: "back.out(1.7)",
      });
    }

    if (headlineRef.current)
      gsap.set(headlineRef.current, { opacity: 0, y: 24 });
    if (ctaGroupRef.current)
      gsap.set(ctaGroupRef.current.children, { opacity: 0, y: 16 });
    if (thumbnailsRef.current)
      gsap.set(thumbnailsRef.current, { opacity: 0, y: 16 });

    let isTransitionStarted = false;
    let cycleTimer: NodeJS.Timeout | null = null;
    let videoHoldTimer: NodeJS.Timeout | null = null;

    const startVideoExpansion = () => {
      if (isTransitionStarted) return;
      isTransitionStarted = true;
      if (cycleTimer) clearInterval(cycleTimer);
      if (videoHoldTimer) clearTimeout(videoHoldTimer);

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // 1. Ensure cloth sheet image overlay is faded
      if (sheetImgRef.current) {
        tl.to(
          sheetImgRef.current,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power1.inOut",
          },
          0,
        );
      }

      // 2. Video container scales up smoothly to 100% of hero section, straightening tilt & position
      if (sheetContainerRef.current) {
        tl.to(
          sheetContainerRef.current,
          {
            width: "100%",
            height: "100%",
            aspectRatio: "auto",
            y: 0,
            rotation: 0,
            rotateX: 0,
            rotateY: 0,
            xPercent: -50,
            yPercent: -50,
            duration: 1.1,
            ease: "power3.inOut",
          },
          "<",
        );
      }

      // 3. Fade out white backdrop concurrently
      if (whiteBackdropRef.current) {
        tl.to(
          whiteBackdropRef.current,
          {
            opacity: 0,
            duration: 0.9,
            ease: "power2.inOut",
          },
          "<0.1",
        );
      }

      // 4. Exact 100ms pause after video fits
      tl.to({}, { duration: 0.1 });

      // 5. Smooth animation for header & hero content (100ms after video fits)
      tl.add(() => {
        window.dispatchEvent(new CustomEvent("fabric-loader-reveal"));
      });

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
        );
      }

      if (ctaGroupRef.current) {
        tl.fromTo(
          ctaGroupRef.current.children,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
          },
          "<0.1",
        );
      }

      if (thumbnailsRef.current) {
        tl.fromTo(
          thumbnailsRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "<0.1",
        );
      }

      tl.add(() => {
        setLoaderState("complete");
        hasCompletedEntranceOnce = true;
        document.body.style.overflow = "";
      });
    };

    // Reveal hero image inside the cloth sheet, hold for at least 300ms, then scale up
    const triggerHeroSheetSlide = () => {
      if (cycleTimer) clearInterval(cycleTimer);

      // Fade out image overlay so hero image is visible inside sheet
      if (sheetImgRef.current) {
        gsap.to(sheetImgRef.current, { opacity: 0, duration: 0.15 });
      }

      // Pop hero sheet from a lower translate-y offset
      if (sheetContainerRef.current) {
        gsap.fromTo(
          sheetContainerRef.current,
          { y: 20, scale: 0.94, rotation: -1 },
          {
            y: 0,
            scale: 1,
            rotation: 0.5,
            duration: 0.32,
            ease: "back.out(1.5)",
            overwrite: "auto",
          },
        );
      }

      // Hold in the sheet for 350ms, then expand!
      videoHoldTimer = setTimeout(() => {
        startVideoExpansion();
      }, 350);
    };

    // Cycle fabric images every 300ms with lively pop up from below:
    let imageIndex = 0;
    cycleTimer = setInterval(() => {
      // If we finished the 4 fabric images:
      if (imageIndex === FABRIC_SAMPLES.length - 1) {
        triggerHeroSheetSlide();
        return;
      }
      imageIndex += 1;

      // Update image
      if (sheetImgRef.current) {
        sheetImgRef.current.src = FABRIC_SAMPLES[imageIndex];
      }

      // Pop up from a lower translate-y offset with tilt
      if (sheetContainerRef.current) {
        const tilt = TILTS[imageIndex % TILTS.length];
        gsap.fromTo(
          sheetContainerRef.current,
          { y: 24, scale: 0.93, rotation: tilt },
          {
            y: 0,
            scale: 1,
            rotation: tilt,
            duration: 0.3,
            ease: "back.out(1.7)",
            overwrite: "auto",
          },
        );
      }
    }, CYCLE_INTERVAL);

    // Safety fallback
    const safetyTimeout = setTimeout(startVideoExpansion, 7000);

    return () => {
      if (cycleTimer) clearInterval(cycleTimer);
      if (videoHoldTimer) clearTimeout(videoHoldTimer);
      clearTimeout(safetyTimeout);
      document.body.style.overflow = "";
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  const isComplete = loaderState === "complete";

  return (
    <section className="min-h-[400px] h-[75vh] lg:h-screen w-full relative flex flex-col justify-end overflow-hidden pb-8 lg:pb-16 px-4 md:px-8 lg:px-16">
      {/* 1. Pure White Canvas Overlay (Behind cloth sheet, active during loader) */}
      {!isComplete && (
        <div
          ref={whiteBackdropRef}
          className="fixed inset-0 z-20 bg-[#FAF6F2] pointer-events-none"
        />
      )}

      {/* 2. Centered Cloth Sheet (aspect-[4/2], popping tilt animation with 3D perspective) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-25 pointer-events-none [perspective:1000px]">
        <div
          ref={sheetContainerRef}
          className={`absolute left-1/2 top-1/2 overflow-hidden bg-neutral-900 rounded-none shadow-none border-0 ${
            isComplete
              ? "w-full h-full aspect-auto"
              : "aspect-[4/2] w-[270px] sm:w-[330px] md:w-[390px]"
          }`}
          style={
            isComplete
              ? {
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100%",
                  height: "100%",
                  opacity: 1,
                }
              : {
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0,
                }
          }
        >
          {/* Slides Carousel */}
          {slides.map((slide, index) => {
            const isVideo = isVideoSlide(slide);
            const src = getSlideSrc(slide);
            const isActive = index === currentSlide;

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out pointer-events-auto ${
                  isActive
                    ? "opacity-100 z-1"
                    : "opacity-0 z-0 pointer-events-none"
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
                    className="w-full h-full object-cover object-center select-none"
                  />
                )}
              </div>
            );
          })}

          {/* Vignette & Gradient for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35 pointer-events-none z-2" />

          {/* Cycling Cloth Sheet Image Overlay (active until hero scales up) */}
          {!isComplete && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={sheetImgRef}
              src={FABRIC_SAMPLES[0]}
              alt="Cloth sheet swatch"
              className="absolute inset-0 w-full h-full object-cover object-center select-none z-10"
            />
          )}
        </div>
      </div>

      {/* 3. Hero Bottom Bar Container (Headline, CTAs) wrapped in max-w-[1400px] matching Categories */}
      <div className="relative z-40 w-full max-w-[1400px] mx-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-14">
          {/* Left Side: Headline & CTAs */}
          <div className="w-full lg:max-w-[50vw] text-left">
            <h1
              ref={headlineRef}
              style={{
                opacity: isComplete ? 1 : 0,
              }}
              className=" font-display text-[2rem] text-left text-white mb-6  font-normal tracking-[0.02em] leading-[1.3] lg:leading-[1.15] md:text-[3.5vw]"
            >
              A Trusted Textile Trading Company in Dubai.
            </h1>

            <div
              ref={ctaGroupRef}
              className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-4 will-change-[transform,opacity]"
            >
              <Link
                href="/about-us"
                style={{ opacity: isComplete ? 1 : 0 }}
                className="px-5 sm:px-7 py-2.5 sm:py-3 bg-gold text-dark-blue text-xs uppercase tracking-wider rounded-full hover:bg-white hover:text-dark-blue font-semibold transition-all duration-300 flex items-center gap-2 shadow-md group"
              >
                <span>About us</span>
              </Link>

              <Link
                href="/categories"
                style={{ opacity: isComplete ? 1 : 0 }}
                className="px-5 sm:px-7 py-2.5 sm:py-3 border border-white/70 text-white text-xs uppercase tracking-wider rounded-full hover:bg-white hover:text-dark-blue transition-all duration-300 flex items-center gap-2 group backdrop-blur-xs"
              >
                <span>Explore categories</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
