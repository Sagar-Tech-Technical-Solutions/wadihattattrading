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
  const [mobileCategoriesExpanded, setMobileCategoriesExpanded] =
    useState(false);

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
            <div>
              <span className="block text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 leading-tight">
                Wadi Hattat
              </span>
              <span className="block text-[10px] text-neutral-400 uppercase tracking-widest mt-0.5">
                Trading Co LLC
              </span>
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
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 divide-y divide-neutral-100">
          {/* Primary Nav Links */}
          <nav className="flex flex-col space-y-1 pt-1">
            {navItems.map((item) => {
              const isCategories = item.name === "Categories";
              const isActive = pathname === item.href;

              if (isCategories) {
                return (
                  <div key={item.name} className="py-1">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileCategoriesExpanded(!mobileCategoriesExpanded)
                      }
                      className="w-full flex items-center justify-between text-[14px] uppercase tracking-[0.14em] font-medium text-neutral-900 py-2 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span>Categories</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-500 font-mono">
                          {CATEGORIES.length}
                        </span>
                      </span>
                      <span className="text-base font-mono text-neutral-400 transition-transform duration-200">
                        {mobileCategoriesExpanded ? "−" : "+"}
                      </span>
                    </button>

                    {/* Expandable Categories List */}
                    {mobileCategoriesExpanded && (
                      <div className="mt-2 pl-2 space-y-1 border-l-2 border-[#ddaf4d] animate-in fade-in">
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/collection/${cat.slug}`}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileCategoriesExpanded(false);
                            }}
                            className="flex items-center justify-between py-2 px-2.5 rounded-xs hover:bg-neutral-50 text-xs uppercase tracking-wider text-neutral-600 hover:text-neutral-900 group"
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="relative w-6 h-6 rounded-2xs overflow-hidden bg-neutral-100 shrink-0">
                                <Image
                                  src={cat.image}
                                  alt={cat.name}
                                  fill
                                  sizes="24px"
                                  className="object-cover"
                                />
                              </span>
                              <span>{cat.name}</span>
                            </span>
                            <span className="text-neutral-400 group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </Link>
                        ))}

                        <Link
                          href="/collection/all"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileCategoriesExpanded(false);
                          }}
                          className="flex items-center justify-between py-2 px-2.5 mt-1 text-[11px] uppercase tracking-[0.18em] font-semibold text-[#ddaf4d] hover:text-black transition-colors"
                        >
                          <span>Explore All Collections</span>
                          <span>→</span>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-[14px] uppercase tracking-[0.14em] py-2 transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-[#ddaf4d] font-semibold"
                      : "text-neutral-800 hover:text-[#ddaf4d] font-normal"
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ddaf4d]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Showroom & Store Details */}
          <div className="pt-5 space-y-3">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ddaf4d]">
              Our Dubai Showrooms
            </span>
            <div className="p-3.5 rounded-xs bg-neutral-50 border border-neutral-200/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-medium text-neutral-900">
                  4 Retail & Wholesale Stores
                </span>
                <span className="text-[10px] px-1.5 py-0.5 bg-neutral-200/70 rounded text-neutral-700 font-mono">
                  Dubai
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                Deira (Al Sabkha) & Bur Dubai (Al Fahidi Souq)
              </p>
              <div className="pt-2 border-t border-neutral-200/60 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Mon – Sat:</span>
                  <span className="text-neutral-800 font-mono">
                    9am–2pm, 4pm–9pm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Sunday:</span>
                  <span className="text-rose-600 font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact & WhatsApp */}
          <div className="pt-5 space-y-3">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ddaf4d]">
              Inquiries & Orders
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">Mobile / WhatsApp:</span>
                <a
                  href="tel:+971526474325"
                  className="font-mono text-neutral-900 hover:text-dark-gold font-medium"
                >
                  +971 52 647 4325
                </a>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">Office Landline:</span>
                <a
                  href="tel:+97143536515"
                  className="font-mono text-neutral-900 hover:text-dark-gold font-medium"
                >
                  +971 4 353 6515
                </a>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-500">Email:</span>
                <a
                  href="mailto:info@wadihattat.com"
                  className="text-neutral-900 hover:text-dark-gold"
                >
                  info@wadihattat.com
                </a>
              </div>
            </div>

            {/* Direct WhatsApp Chat Action */}
            <a
              href="https://wa.me/971526474325?text=Hello%20Wadi%20Hattat%20Trading%2C%20I%20am%20interested%20in%20your%20fabrics."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-5 border-t border-neutral-100 bg-neutral-50 shrink-0 space-y-2">
          <Link
            href="/contact-us"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center block bg-neutral-900 hover:bg-black text-white text-xs uppercase tracking-[0.18em] font-semibold py-3 rounded-xs transition-colors shadow-2xs"
          >
            Showroom Directions & Map
          </Link>
          <p className="text-[10px] text-center text-neutral-400 font-light pt-1">
            © 2026 Wadi Hattat Trading Co LLC • Dubai, UAE
          </p>
        </div>
      </aside>
    </>
  );
}
