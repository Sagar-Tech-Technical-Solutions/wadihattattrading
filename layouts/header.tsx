"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About Us", href: "/about-us" },
  { name: "Expertises", href: "/expertises" },
  { name: "Careers", href: "/careers" },
];

export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close menu on route change
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Toggle scrolled state on homepage
  useEffect(() => {
    if (!isHomepage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  // Lock scroll when menu is expanded
  // useEffect(() => {
  //   document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [mobileMenuOpen]);

  // Header is white when scrolled, when on other pages, or when menu is expanded
  const isWhite = !isHomepage || isScrolled || mobileMenuOpen;

  return (
    <>
      {/* Backdrop overlay when menu is expanded */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Header Container: fixed only on homepage, relative on other pages */}
      <header
        className={`z-40 px-4 md:px-8 lg:px-10 my-4 ${
          isHomepage ? "fixed top-0 left-0 right-0" : "relative w-full"
        }`}
      >
        <div
          className={`w-full rounded-sm transition-all duration-800 ease-in-out ${
            isWhite ? "bg-white text-black " : "bg-transparent text-white"
          }`}
        >
          {/* Main Bar (Top Row) */}
          <div
            className={`flex items-center justify-between ${
              isHomepage ? "px-4 md:px-6 py-2.5" : ""
            }`}
          >
            {/* 1. LEFT: MENU / CLOSE Toggle Button */}
            <div className="flex-1 flex items-center justify-start">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                className={`text-[13px] tracking-widest rounded-xs flex items-center gap-1.5 sm:gap-2 transition-all duration-800 group font-normal cursor-pointer focus:outline-none ${
                  isWhite ? "text-black" : "text-white"
                }`}
              >
                {mobileMenuOpen ? (
                  // CLOSE ✕ Icon
                  <svg
                    className="w-5 h-5 transition-transform duration-800 group-hover:rotate-90"
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
                  // MENU ☰ Icon
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
                <span>{mobileMenuOpen ? "CLOSE" : "MENU"}</span>
              </button>
            </div>

            {/* 2. CENTER: Logo */}
            <div className="flex items-center justify-center shrink-0 px-4">
              <Link
                href="/"
                className="relative w-9 h-9 sm:w-14 sm:h-14 block transition-transform duration-200 hover:scale-105"
              >
                <Image
                  src={isWhite ? "/logo/2.png" : "/logo/1.png"}
                  alt="Wadi Hattat Trading"
                  fill
                  sizes="44px"
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* 3. RIGHT: Contact Button */}
            <div className="flex-1 flex items-center justify-end gap-2.5 sm:gap-3">
              <Link
                href="/contact"
                className={`text-[13px] tracking-widest rounded-xs flex items-center gap-1.5 sm:gap-2 transition-all duration-200 group font-normal ${
                  isWhite ? "text-black" : "text-white"
                }`}
              >
                <span>CONTACT</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 26 26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Downward Expanded Menu Section in White Theme */}
          <div
            className={`transition-all duration-800 ease-in-out overflow-hidden ${
              mobileMenuOpen
                ? "max-h-[500px] opacity-100 "
                : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="px-6 md:px-8 pt-6 pb-6">
              {/* Nav Links */}
              <nav className="flex flex-col space-y-3.5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg sm:text-[17px] font-normal tracking-wide transition-colors flex items-center justify-between py-1 group ${
                        isActive
                          ? "text-blue"
                          : "text-neutral-800 hover:text-blue"
                      }`}
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
