"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { menuLinks } from "@/data/links";

interface NavItem {
  name: string;
  href: string;
}

let hasHeaderRevealed = false;

export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const hasTransparentHeader =
    pathname === "/" || pathname === "/about-us" || pathname === "/fabrics";
  const headerRef = useRef<HTMLElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const prevPathnameRef = useRef(pathname);
  const lastScrollYRef = useRef(0);

  // Track navigation to home from other pages & close menus on route change
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      if (
        typeof window !== "undefined" &&
        pathname === "/" &&
        prevPathnameRef.current !== "/"
      ) {
        (
          window as unknown as { __isClientNavToHome?: boolean }
        ).__isClientNavToHome = true;
      }
      prevPathnameRef.current = pathname;
      setMobileMenuOpen(false);
      setIsVisible(true);
      lastScrollYRef.current =
        typeof window !== "undefined" ? window.scrollY : 0;
      setIsScrolled(
        typeof window !== "undefined" ? window.scrollY > 20 : false,
      );
    }
  }, [pathname]);

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

  // Unified scroll handler: slide up header on scroll down, slide down on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;
      const diff = currentScrollY - lastScrollY;

      setIsScrolled(currentScrollY > 20);

      // Always show at top of page or when mobile menu is open
      if (currentScrollY <= 40 || mobileMenuOpen) {
        setIsVisible(true);
      } else if (diff > 8) {
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Synchronize header reveal with the cinematic fabric loader
  useEffect(() => {
    if (!isHomepage || hasHeaderRevealed) {
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 1, y: 0, clearProps: "all" });
      }
      return;
    }

    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 0, y: -16 });
    }

    const onReveal = () => {
      hasHeaderRevealed = true;
      if (headerRef.current) {
        gsap.to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          clearProps: "transform",
        });
      }
    };

    window.addEventListener("fabric-loader-reveal", onReveal);
    const safetyTimer = setTimeout(onReveal, 8500);

    return () => {
      window.removeEventListener("fabric-loader-reveal", onReveal);
      clearTimeout(safetyTimer);
    };
  }, [isHomepage]);

  // Header is white when scrolled, when on pages without transparent hero, or when mobile menu is open
  const isWhite = !hasTransparentHeader || isScrolled || mobileMenuOpen;

  return (
    <>
      {/* Main Full-Width Header Container - Outer px-4 md:px-8 lg:px-16 matching categories */}
      <header
        id="site-header"
        ref={headerRef}
        style={{
          opacity: hasHeaderRevealed || !isHomepage ? 1 : 0,
        }}
        className={`fixed top-0 z-50 inset-x-0 w-full max-w-[100vw] box-border px-4 sm:px-6 md:px-8 lg:px-16 transition-all duration-300 ease-in-out ${
          isVisible || mobileMenuOpen
            ? "translate-y-0 pointer-events-auto"
            : "-translate-y-full pointer-events-none"
        } ${
          isWhite
            ? "bg-white text-black " + (isScrolled ? "shadow-sm " : "")
            : "bg-transparent text-white"
        }`}
      >
        {/* Width matching categories section */}
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
            <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
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
                        ? "text-dark-gold font-medium"
                        : isWhite
                          ? "text-neutral-800 hover:text-dark-gold"
                          : "text-white/90 hover:text-gold"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* 3. MOBILE: Drawer toggle button (Hidden on desktop) */}
            <div className="flex items-center lg:hidden shrink-0 ml-auto">
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

      {/* ============================================================== */}
      {/* 5. FULL-HEIGHT MOBILE DRAWER (w-[80%] with rich details)       */}
      {/* ============================================================== */}

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Side-Drawer Container (Full Height, w-[80%] max-w-[400px]) */}
      <aside
        aria-label="Mobile Navigation"
        className={`fixed top-0 bottom-0 right-0 z-50 w-[80%] sm:w-[70%] max-w-[400px] h-full bg-white text-neutral-900 shadow-2xl flex flex-col transition-all duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen
            ? "translate-x-0 opacity-100 visible pointer-events-auto"
            : "translate-x-full opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Top Header of Drawer: Logo + Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 shrink-0">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 "
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

        {/* Scrollable Drawer Content: Only Menu Links */}
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

          {/* Drawer Footer Contact Note */}
          <div className="pt-6 border-t border-neutral-100 mt-auto text-xs text-neutral-400 space-y-1">
            <p className="font-mono uppercase tracking-wider text-[11px] text-neutral-500">
              Dubai Showrooms
            </p>
            <p className="font-light">Deira &amp; Bur Dubai, UAE</p>
            <p className="font-mono text-neutral-600 pt-1">+971 52 647 4325</p>
          </div>
        </div>
      </aside>
    </>
  );
}
