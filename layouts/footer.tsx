"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuLinks } from "@/data/links";
import Image from "next/image";

const currentYear = 2026;

export default function Footer() {
  const pathname = usePathname();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href === "/") {
      if (pathname === "/") {
        e.preventDefault();
      }
      if (typeof window !== "undefined") {
        const lenis = (
          window as unknown as {
            lenis?: {
              scrollTo: (
                y: number,
                opts?: { immediate?: boolean; duration?: number },
              ) => void;
            };
          }
        ).lenis;
        if (lenis) {
          lenis.scrollTo(0, { immediate: pathname !== "/", duration: 1.2 });
        } else {
          window.scrollTo({
            top: 0,
            behavior: pathname === "/" ? "smooth" : "auto",
          });
        }
      }
    }
  };
  return (
    <footer className="w-full bg-[#070913] relative">
      <div className="max-w-[1400px] mx-auto  text-white px-5 py-10 sm:p-10 md:p-14 lg:p-16 shadow-2xl  overflow-hidden">
        {/* 1. Atmospheric Radial Gradient Glow */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-15%,rgba(32,39,72,0.55),rgba(7,9,19,1))] pointer-events-none"
          aria-hidden="true"
        />

        {/* 2. Rough Woven Textile Noise Texture Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='roughNoiseFooter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roughNoiseFooter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "160px 160px",
          }}
          aria-hidden="true"
        />

        {/* 3. Subtle Warm Ambient Accent Glow */}
        <div
          className="absolute -top-36 left-1/2 -translate-x-1/2 w-[750px] h-[360px] bg-gradient-to-b from-[#ddaf4d]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Content Container */}
        <div className="relative z-10">
          {/* Top Grid: Left CTA & Right Links */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Heading, CTA Button & Email */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              <Link
                href="/"
                onClick={(e) => handleLinkClick(e, "/")}
                className={`relative transition-all duration-300 w-14 h-14 sm:w-20 sm:h-20 block hover:scale-105`}
              >
                <Image
                  src={"/logo/1.png"}
                  alt="Wadi Hattat Trading"
                  height={300}
                  width={300}
                  sizes="100px"
                  className="h-full w-full object-contain"
                  priority
                />
              </Link>

              <h2 className="text-[26px] sm:text-3xl md:text-4xl font-medium text-white leading-[1.3] max-w-xl">
                Your Trusted Partner for Luxury Textiles in Dubai
              </h2>

              <div>
                <Link
                  href="/contact-us"
                  className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 sm:px-7 sm:py-3.5 bg-white hover:bg-neutral-100 text-neutral-950 text-sm font-medium transition-all duration-200 shadow-md cursor-pointer"
                >
                  <span>Contact Us</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>

              <div className="pt-2">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8b8fa8] mb-3">
                  OR EMAIL US AT
                </span>

                <a
                  href="mailto:whtdxb@gmail.com"
                  className="inline-flex items-center gap-3text-xs sm:text-sm text-neutral-200 group cursor-pointer"
                  title="Send an email to whtdxb@gmail.com"
                >
                  <span className="font-light tracking-wide pr-2">
                    whtdxb@gmail.com
                  </span>
                  <svg
                    className="w-4 h-4 text-[#8b8fa8] group-hover:text-white transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Quick Links & Contact Details */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-8 sm:gap-12 lg:pt-1">
              {/* Quick Links */}
              <div>
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#8b8fa8] mb-5">
                  QUICK LINKS
                </span>
                <ul className="space-y-3 sm:space-y-3.5 text-[13px] sm:text-[15px] font-light text-neutral-300">
                  {menuLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        // onClick={(e) => handleLinkClick(e, link.href)}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Details */}
              <div>
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#8b8fa8] mb-5">
                  CONTACT DETAILS
                </span>
                <ul className="space-y-4 text-[13px] sm:text-[14px] font-light text-neutral-300">
                  {/* 1. WhatsApp & Mobile */}
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 shrink-0 mt-0.5 text-[#25D366] flex items-center justify-center">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.057-1.111-.073-.252-.08-.574-.187-.98-.364-1.728-.751-2.857-2.51-2.944-2.625-.087-.115-.705-.939-.705-1.791 0-.852.448-1.27.608-1.442.16-.172.35-.215.467-.215.117 0 .234.001.336.006.107.005.25-.041.391.298.144.348.491 1.2.535 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.174.232-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.572 4.186 1.572 5.941l-1.668 6.096 6.277-1.644c1.706.929 3.652 1.455 5.723 1.455 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 21.848c-1.897 0-3.664-.537-5.166-1.464l-.37-.229-3.714.974.991-3.619-.25-.398c-1.026-1.636-1.571-3.535-1.571-5.503 0-5.438 4.422-9.86 9.864-9.86 5.441 0 9.864 4.422 9.864 9.86 0 5.439-4.423 9.861-9.864 9.861z" />
                      </svg>
                    </div>
                    <div>
                      {/* <span className="block text-[10px] uppercase tracking-wider text-[#8b8fa8]">
                      WhatsApp &amp; Mobile
                    </span> */}
                      <a
                        href="https://wa.me/97143536515"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors font-mono"
                      >
                        +971 4 353 6515
                      </a>
                    </div>
                  </li>

                  {/* 2. Office Landline */}
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 shrink-0 mt-0.5 text-[#8b8fa8] flex items-center justify-center">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.75}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"
                        />
                      </svg>
                    </div>
                    <div>
                      {/* <span className="block text-[10px] uppercase tracking-wider text-[#8b8fa8]">
                      Office Landline
                    </span> */}
                      <a
                        href="tel:+97143536515"
                        className="hover:text-white transition-colors font-mono"
                      >
                        +971 4 353 6515
                      </a>
                    </div>
                  </li>

                  {/* 3. Address / Showrooms */}
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 shrink-0 mt-0.5 text-[#8b8fa8] flex items-center justify-center">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.75}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      {/* <span className="block text-[10px] uppercase tracking-wider text-[#8b8fa8]">
                      Showrooms
                    </span> */}
                      <span className="text-neutral-300 leading-snug block">
                        Deira &amp; Bur Dubai, UAE
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: Divider, Copyright & Instagram */}
          <div className="w-full border-t border-white/10 mt-12 sm:mt-16 lg:mt-20 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.16em] text-[#8b8fa8] text-center sm:text-left">
              © WADI HATTAT TRADING {currentYear}. ALL RIGHTS RESERVED.
            </p>

            {/* Social Links (Instagram only) */}
            <div className="flex items-center">
              <a
                href="https://www.instagram.com/wadi_hattat.ae"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 text-xs text-[#8b8fa8] hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="font-light tracking-wide">Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
