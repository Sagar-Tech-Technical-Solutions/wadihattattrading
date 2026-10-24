"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ui/product-card";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/collection/all" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact Us", href: "/contact-us" },
];

let hasHeaderRevealed = false;

export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const hasTransparentHeader = pathname === "/" || pathname === "/about-us";
  const headerRef = useRef<HTMLElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Megamenu state
  const [isMegamenuOpen, setIsMegamenuOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const prevPathnameRef = useRef(pathname);

  // Megamenu hover handlers with slight debounce for smooth transition
  const openMegamenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMegamenuOpen(true);
  };

  const closeMegamenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsMegamenuOpen(false);
    }, 180);
  };

  // Stable 4 featured products displayed in megamenu (no hover changing)
  const displayedProducts = useMemo(() => {
    return PRODUCTS.slice(0, 4);
  }, []);

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
      setIsMegamenuOpen(false);
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

  // Toggle scrolled state on transparent header pages (Home & About Us)
  useEffect(() => {
    if (!hasTransparentHeader) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTransparentHeader]);

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

  // Header is white when scrolled, when on pages without transparent hero, or when any menu is open
  const isWhite =
    !hasTransparentHeader || isScrolled || mobileMenuOpen || isMegamenuOpen;

  return (
    <>
      {/* Main Full-Width Header Container - Outer px-4 md:px-8 lg:px-16 matching categories */}
      <header
        id="site-header"
        ref={headerRef}
        style={{
          opacity: hasHeaderRevealed || !isHomepage ? 1 : 0,
        }}
        className={`z-50 w-full px-4 md:px-8 lg:px-16 transition-colors duration-300 ease-in-out ${
          hasTransparentHeader
            ? "fixed top-0 left-0 right-0"
            : "relative w-full"
        } ${isWhite ? "bg-white text-black " : "bg-transparent text-white"}`}
      >
        {/* Width matching categories section */}
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between py-3">
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

            {/* 2. DESKTOP NAV: Full menu items with Categories Megamenu */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isCategories = item.name === "Categories";
                const isActive = pathname === item.href;

                if (isCategories) {
                  return (
                    <div
                      key={item.name}
                      onMouseEnter={openMegamenu}
                      onMouseLeave={closeMegamenu}
                      className="py-2"
                    >
                      <Link
                        href="/collection/all"
                        className={`flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] font-normal transition-colors duration-200 ${
                          isMegamenuOpen || pathname.startsWith("/collection")
                            ? "text-dark-gold font-medium"
                            : isWhite
                              ? "text-neutral-800 hover:text-dark-gold"
                              : "text-white/90 hover:text-gold"
                        }`}
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`w-3 h-3 transition-transform duration-200 ${
                            isMegamenuOpen ? "rotate-180 text-dark-gold" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </Link>
                    </div>
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
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                className={`text-xs uppercase tracking-widest flex items-center gap-2 py-1.5 px-2 focus:outline-none cursor-pointer ${
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

        {/* ============================================================== */}
        {/* 4. FULL-WIDTH DESKTOP MEGAMENU (Exact reference layout)         */}
        {/* ============================================================== */}
        <div
          onMouseEnter={openMegamenu}
          onMouseLeave={closeMegamenu}
          className={`hidden lg:block absolute top-full left-0 right-0 w-full px-4 md:px-8 lg:px-16 bg-white border-t border-neutral-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-200 z-50 ${
            isMegamenuOpen
              ? "opacity-100 visible translate-y-0 pointer-events-auto"
              : "opacity-0 invisible -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="max-w-[1400px] mx-auto py-8">
            <div className="flex gap-12 lg:gap-16 items-start">
              {/* LEFT COLUMN: COLLECTIONS LIST */}
              <div className="w-56 shrink-0 border-r border-neutral-100 pr-6">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ddaf4d] mb-4">
                  Collections
                </span>
                <ul className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/collection/${cat.slug}`}
                        onClick={() => setIsMegamenuOpen(false)}
                        className="block text-[12px]  text-neutral-600 hover:text-dark-gold transition-colors py-1"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 mt-4 border-t border-neutral-100">
                  <Link
                    href="/collection/all"
                    onClick={() => setIsMegamenuOpen(false)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900 hover:text-dark-gold transition-colors"
                  >
                    <span>All Collections</span>
                    <span className="text-xs">→</span>
                  </Link>
                </div>
              </div>

              {/* RIGHT AREA: OUR FABRICS (4 Cards Grid matching reference) */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between pb-3 mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ddaf4d]">
                    Our Fabrics
                  </span>
                  <Link
                    href="/collection/all"
                    onClick={() => setIsMegamenuOpen(false)}
                    className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-800 hover:text-dark-gold transition-colors inline-flex items-center gap-1"
                  >
                    <span>View All</span>
                    <span className="text-xs">→</span>
                  </Link>
                </div>

                {/* 4 Product Cards in a Row using ProductCard component */}
                <div className="grid grid-cols-4 gap-4">
                  {displayedProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => setIsMegamenuOpen(false)}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

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
        className={`fixed top-0 bottom-0 right-0 z-50 w-[80%] sm:w-[70%] max-w-[400px] h-full bg-white text-neutral-900 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
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

        {/* Scrollable Drawer Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          {/* Categories Cards */}
          <div className="space-y-3">
            <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
              Categories
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/collection/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group relative aspect-[4/4.75] rounded-sm overflow-hidden bg-neutral-100 border border-neutral-200/80 flex flex-col justify-end p-2.5 shadow-xs"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 45vw, 180px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
                  <span className="relative z-10 text-xs font-medium text-white tracking-wide truncate">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/collection/all"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-2 text-xs font-mono uppercase tracking-wider text-[#ddaf4d] hover:text-black transition-colors"
            >
              View All Fabrics →
            </Link>
          </div>

          {/* Other Menu Items */}
          <div className="pt-4 border-t border-neutral-100">
            <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-2">
              Menu
            </span>
            <nav className="flex flex-col space-y-1">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about-us" },
                { name: "Contact Us", href: "/contact-us" },
              ].map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-neutral-100 text-neutral-900 font-semibold"
                        : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 font-normal"
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="text-xs text-neutral-400">→</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
