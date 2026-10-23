import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/products";
import { Reveal } from "@/layouts/reveal";

const currentYear = 2026;

export default function Footer() {
  // WhatsApp direct link with Dubai wholesale inquiry
  const whatsappUrl =
    "https://wa.me/971526474325?text=" +
    encodeURIComponent(
      "Hello Wadi Hattat Trading, I am interested in your luxury textile collection and wholesale fabric supply. Please share your latest catalogue.",
    );

  return (
    <footer className="w-full bg-white text-neutral-900 pt-8 pb-12 lg:pt-12 lg:pb-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        {/* ============================================================== */}
        {/* 1. TOP LANDSCAPE CTA BANNER (Exact match to reference card)   */}
        {/* ============================================================== */}
        <Reveal variant="scale" className="mb-14 lg:mb-20">
          <div className="relative rounded-xl overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-center justify-center text-center px-6 py-12 sm:p-14 shadow-xl">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/purplefabric.webp"
                alt="Wadi Hattat Trading Dubai Showroom"
                fill
                sizes="100vw"
                className="object-cover object-center filter brightness-[0.45] contrast-[1.05]"
              />
            </div>

            {/* Centered Content */}
            <div className="relative z-10  text-white space-y-4 sm:space-y-5">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ddaf4d]">
                Dubai Textile Destination
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] font-light tracking-wide leading-tight whitespace-normal sm:whitespace-nowrap">
                Your Trusted Partner for Luxury Textiles in Dubai
              </h2>
              <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed max-w-xl mx-auto">
                Source authentic Japanese Nida weaves, textured crepes, and
                sartorial fabrics directly from our 4 Dubai showrooms or partner
                with us for wholesale container distribution.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                {/* Button 1: Contact Us */}
                <Link
                  href="/contact-us"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-7 sm:px-9 py-3.5 bg-white hover:bg-neutral-100 text-neutral-900 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-lg group cursor-pointer"
                >
                  <span>Contact Us</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                {/* Button 2: Redirect to Store */}
                <a
                  href="https://maps.app.goo.gl/oMoFhZULKUfr7nsq6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-7 sm:px-9 py-3.5 backdrop-blur-md bg-white/15 hover:bg-white text-white hover:text-neutral-900 border border-white/40 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-lg group cursor-pointer"
                >
                  <span>Visit Our Store</span>
                  <span className="text-xs inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ============================================================== */}
        {/* 2. MAIN WHITE THEME FOOTER: LOGO + CONTENT & NAV/CATEGORIES/CONTACT */}
        {/* ============================================================== */}
        <Reveal delay={100} variant="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-12">
            {/* Left Column: Brand Logo & Content Below Logo (col-span-5) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Dark Logo for White Background */}
              <Link
                href="/"
                className="inline-block relative w-12 h-12 sm:w-14 sm:h-14 hover:scale-105 transition-transform"
              >
                <Image
                  src="/logo/2.png"
                  alt="Wadi Hattat Trading"
                  fill
                  sizes="56px"
                  className="object-contain object-left"
                />
              </Link>

              {/* Content Below Logo */}
              <p className="text-xs sm:text-[13px] text-neutral-600 font-light leading-relaxed max-w-sm">
                Wadi Hattat Trading Co LLC is Dubai&apos;s premier textile
                destination. Sourcing authentic Japanese Nida, textured crepes,
                and distinctive sartorial fabrics for couture ateliers, fashion
                designers, and wholesale partners across the UAE and worldwide.
              </p>

              <div className="pt-2 text-xs text-neutral-400 font-mono">
                <p>4 Retail &amp; Wholesale Showrooms in Dubai</p>
                <p className="text-[11px] text-neutral-500 pt-0.5">
                  Deira (Al Sabkha) &amp; Bur Dubai (Al Fahidi Souq)
                </p>
              </div>
            </div>

            {/* Right Column: 3 Columns: Navigation, Categories & Contact Info (col-span-7) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs sm:text-[13px] pt-2">
              {/* Column 1: Navigation */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#ddaf4d]">
                  Navigation
                </p>
                <ul className="space-y-2.5 text-neutral-600 font-light">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-black transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us"
                      className="hover:text-black transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collection/all"
                      className="hover:text-black transition-colors"
                    >
                      All Collections
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#categories"
                      className="hover:text-black transition-colors"
                    >
                      The Fabrics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact-us"
                      className="hover:text-black transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: Categories (Replaced Services) */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#ddaf4d]">
                  Categories
                </p>
                <ul className="space-y-2.5 text-neutral-600 font-light">
                  {CATEGORIES.slice(0, 5).map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/collection/${cat.slug}`}
                        className="hover:text-black transition-colors block"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/collection/all"
                      className="text-[#ddaf4d] hover:text-black font-medium transition-colors inline-flex items-center gap-1 pt-1"
                    >
                      <span>View All</span>
                      <span className="text-xs">→</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Contact Info (Replaced Policies) */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#ddaf4d]">
                  Contact Info
                </p>
                <div className="space-y-2.5 text-neutral-600 font-light text-xs sm:text-[13px]">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                      WhatsApp &amp; Mobile
                    </span>
                    <a
                      href="tel:+971526474325"
                      className="font-mono text-neutral-900 hover:text-dark-gold transition-colors font-medium block"
                    >
                      +971 52 647 4325
                    </a>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                      Office Landline
                    </span>
                    <a
                      href="tel:+97143536515"
                      className="font-mono text-neutral-900 hover:text-dark-gold transition-colors block"
                    >
                      +971 4 353 6515
                    </a>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                      Email Inquiries
                    </span>
                    <a
                      href="mailto:info@wadihattat.com"
                      className="text-neutral-900 hover:text-dark-gold transition-colors block"
                    >
                      info@wadihattat.com
                    </a>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                      Working Hours
                    </span>
                    <span className="text-neutral-800 block text-[12px]">
                      Mon–Sat: 9am–2pm, 4pm–9pm
                    </span>
                    <span className="text-rose-600 text-[11px] font-medium block">
                      Sunday: Closed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ============================================================== */}
        {/* 3. MIDDLE ROW: STORE DISTRICT INFO & 4 SOCIAL PILL BUTTONS     */}
        {/* ============================================================== */}
        <Reveal delay={150} variant="fade">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-6 border-t border-neutral-100">
            <div className="text-xs text-neutral-500 font-light text-center sm:text-left">
              Wholesale Textile District • Deira &amp; Bur Dubai Branches
            </div>

            {/* 4 Social Pill Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full border border-neutral-200 text-xs font-medium text-neutral-700 hover:border-black hover:text-black hover:bg-neutral-50 transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full border border-neutral-200 text-xs font-medium text-neutral-700 hover:border-black hover:text-black hover:bg-neutral-50 transition-colors"
              >
                Instagram
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full border border-neutral-200 text-xs font-medium text-neutral-700 hover:border-[#25D366] hover:text-[#25D366] hover:bg-neutral-50 transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full border border-neutral-200 text-xs font-medium text-neutral-700 hover:border-black hover:text-black hover:bg-neutral-50 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 4. BOTTOM ROW: CENTERED COPYRIGHT TEXT                         */}
          {/* ============================================================== */}
          <div className="pt-6 border-t border-neutral-100 text-center">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-400">
              © {currentYear} WADI HATTAT TRADING CO LLC / ALL RIGHTS RESERVED
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
