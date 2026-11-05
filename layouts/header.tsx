"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuLinks } from "@/data/links";
import GoogleTranslate from "@/components/ui/google-translate";

export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const hasTransparentHeader =
    pathname === "/" || pathname === "/about-us" || pathname === "/fabrics";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollYRef = useRef(0);
  const isNavigatingRef = useRef(false);
  const navigationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle route changes and history navigation (back/forward button)
  useEffect(() => {
    isNavigatingRef.current = true;
    setIsVisible(true);
    setMobileMenuOpen(false);

    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      if (pathname !== "/") {
        (window as any).__hasCompletedEntrance = true;
      }
    }

    if (navigationTimerRef.current) {
      clearTimeout(navigationTimerRef.current);
    }

    const syncScrollState = () => {
      if (typeof window !== "undefined") {
        const currentY = Math.max(0, window.scrollY);
        lastScrollYRef.current = currentY;
        setIsScrolled(currentY > 20);
        setIsVisible(true);
      }
    };

    syncScrollState();

    // Re-verify after DOM and browser scroll settlement
    navigationTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
      syncScrollState();
    }, 350);

    return () => {
      if (navigationTimerRef.current) {
        clearTimeout(navigationTimerRef.current);
      }
    };
  }, [pathname]);

  // Listen to popstate (browser back/forward button) specifically
  // useEffect(() => {
  //   const handlePopState = () => {
  //     isNavigatingRef.current = true;
  //     setIsVisible(true);

  //     requestAnimationFrame(() => {
  //       const y =
  //         typeof window !== "undefined" ? Math.max(0, window.scrollY) : 0;
  //       lastScrollYRef.current = y;
  //       setIsScrolled(y > 20);
  //       setIsVisible(true);
  //     });

  //     setTimeout(() => {
  //       isNavigatingRef.current = false;
  //       const y =
  //         typeof window !== "undefined" ? Math.max(0, window.scrollY) : 0;
  //       lastScrollYRef.current = y;
  //       setIsScrolled(y > 20);
  //       setIsVisible(true);
  //     }, 350);
  //   };

  //   window.addEventListener("popstate", handlePopState);
  //   return () => window.removeEventListener("popstate", handlePopState);
  // }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [mobileMenuOpen]);

  // Unified scroll handler: slide up on scroll down, slide down on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY =
        typeof window !== "undefined" ? Math.max(0, window.scrollY) : 0;

      setIsScrolled(currentScrollY > 20);

      // During page navigation transitions or near top of page, always keep header visible
      if (isNavigatingRef.current || currentScrollY <= 60 || mobileMenuOpen) {
        setIsVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const lastScrollY = lastScrollYRef.current;
      const diff = currentScrollY - lastScrollY;

      if (diff > 8) {
        // Scrolling down -> slide up (hide)
        setIsVisible(false);
      } else if (diff < -8) {
        // Scrolling up -> slide down (show)
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen]);

  // Header is white when scrolled, when on pages without transparent hero, or when mobile menu is open
  const isWhite = !hasTransparentHeader || isScrolled || mobileMenuOpen;

  // Simple slide-up / slide-down class
  const visibilityClass =
    isVisible || mobileMenuOpen
      ? "translate-y-0 pointer-events-auto"
      : "-translate-y-full pointer-events-none";

  return (
    <>
      {/* Main Full-Width Header Container */}
      <header
        id="site-header"
        className={`fixed top-0 z-50 inset-x-0 w-full max-w-[100vw] box-border px-4 sm:px-6 md:px-8 lg:px-16 transition-transform duration-300 ease-in-out ${visibilityClass} ${
          isWhite
            ? "bg-white text-black " + (isScrolled ? "shadow-sm " : "")
            : "bg-transparent text-white"
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between py-3 w-full">
            {/* 1. LEFT: Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className={`relative transition-all duration-300 ${
                  isWhite
                    ? "w-10 h-10 sm:w-12 sm:h-12"
                    : "w-14 h-14 sm:w-16 sm:h-16"
                } block hover:scale-105`}
              >
                <Image
                  src={isWhite ? "/logo/2.png" : "/logo/1.png"}
                  alt="Wadi Hattat Trading"
                  fill
                  sizes="48px"
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* 2. DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
              {menuLinks.map((item) => {
                const isActive = pathname === item.href;
                const isContact = item.name === "Contact Us";

                if (isContact) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-[11px] uppercase tracking-[0.14em] font-medium px-4 py-1.5 rounded-full border transition-all duration-300 ${
                        isActive
                          ? isWhite
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-white bg-white text-black"
                          : isWhite
                            ? "border-neutral-900/80 text-neutral-900 hover:bg-neutral-900 hover:text-white hover:border-neutral-900"
                            : "border-white/80 text-white hover:bg-white hover:text-neutral-900 hover:border-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-[11px] uppercase tracking-[0.14em] font-normal transition-colors duration-200 ${
                      isActive
                        ? "underline underline-offset-8 font-medium"
                        : isWhite
                          ? "text-neutral-800 hover:text-dark-gold"
                          : "text-white/90 hover:text-gold"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <span
                className={`h-3.5 w-[1px] ${
                  isWhite ? "bg-neutral-300" : "bg-white/25"
                }`}
                aria-hidden="true"
              />
              <GoogleTranslate isWhite={isWhite} />
            </nav>

            {/* 3. MOBILE: Language switcher + Drawer toggle button */}
            <div className="flex items-center gap-3 lg:hidden shrink-0 ml-auto">
              <GoogleTranslate isWhite={isWhite} compact />
              <span
                className={`h-3.5 w-[1px] ${
                  isWhite ? "bg-neutral-300" : "bg-white/25"
                }`}
                aria-hidden="true"
              />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                className={`text-xs uppercase tracking-widest flex items-center gap-1.5 py-1 px-1.5 focus:outline-none cursor-pointer ${
                  isWhite ? "text-black" : "text-white"
                }`}
              >
                <span>{mobileMenuOpen ? "CLOSE" : "MENU"}</span>
                {mobileMenuOpen ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for non-transparent header pages so content starts naturally below fixed header */}
      {!hasTransparentHeader && (
        <div
          className="h-[64px] sm:h-[72px] w-full shrink-0"
          aria-hidden="true"
        />
      )}

      {/* Side-Drawer Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Side-Drawer Container */}
      <aside
        aria-label="Mobile Navigation"
        className={`fixed top-0 bottom-0 right-0 z-50 w-[80%] sm:w-[70%] max-w-[400px] h-full bg-white text-neutral-900 shadow-2xl flex flex-col transition-all duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen
            ? "translate-x-0 opacity-100 visible pointer-events-auto"
            : "translate-x-full opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 shrink-0">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="relative w-9 h-9">
              <Image
                src="/logo/2.png"
                alt="Wadi Hattat Trading"
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:border-black transition-colors cursor-pointer"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
          <nav className="flex flex-col divide-y divide-neutral-100">
            {menuLinks.map((item) => {
              const isActive = pathname === item.href;
              const isContact = item.name === "Contact Us";

              if (isContact) {
                return (
                  <div key={item.name} className="pt-6 border-none">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block w-full text-center text-xs uppercase tracking-[0.16em] py-3.5 px-6 rounded-full border transition-all ${
                        isActive
                          ? "border-neutral-900 bg-neutral-900 text-white font-medium"
                          : "border-neutral-900 bg-neutral-900 text-white hover:bg-black font-medium shadow-sm"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-light tracking-wide py-4 flex items-center justify-between transition-colors ${
                    isActive
                      ? "text-neutral-900 font-medium"
                      : "text-neutral-700 hover:text-black"
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-xs text-neutral-400">→</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Drawer Language Switcher */}
          <div className="pt-6 border-t border-neutral-100 mt-auto">
            <GoogleTranslate inDrawer />
          </div>

          <div className="pt-5 border-t border-neutral-100 mt-5 text-xs text-neutral-400 space-y-1">
            <p className="font-mono uppercase tracking-wider text-[11px] text-neutral-500">
              Dubai Showrooms
            </p>
            <p className="font-light">Deira &amp; Bur Dubai, UAE</p>
            <a
              href="tel:+97143536515"
              className="block font-mono text-neutral-600 hover:text-black pt-1 transition-colors"
            >
              +971 4 353 6515
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
