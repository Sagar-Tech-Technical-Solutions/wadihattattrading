"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/layouts/reveal";
import { fabrics } from "@/data/fabrics";

export default function FabricsClient() {
  return (
    <div className="relative w-full bg-[#070913] text-white overflow-hidden">
      {/* 1. Atmospheric Radial Gradient Glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-15%,rgba(32,39,72,0.55),rgba(7,9,19,1))] pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Rough Woven Textile Noise Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='roughNoiseFabrics'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roughNoiseFabrics)'/%3E%3C/svg%3E")`,
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

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-28">
        {/* Header Section */}
        <Reveal
          variant="fade"
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.24em] text-[#ddaf4d] mb-3">
            SIGNATURE TEXTILE ARCHIVE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-light text-white tracking-tight leading-[1.15]">
            Our Fabric Collections
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            Discover our comprehensive range of luxury textiles imported
            directly from premier global mills. Sourced for abaya designers,
            haute couture ateliers, and international wholesale distribution.
          </p>
        </Reveal>

        {/* Fabrics Grid - Images Clean Without Overlays, Content Displayed Below Frame, No Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 sm:gap-x-8 gap-y-12 sm:gap-y-20">
          {fabrics.map((fabric, idx) => (
            <Reveal key={fabric.id} delay={idx * 50} variant="up">
              <div className="flex flex-col">
                {/* Clean Image Frame - No Overlays, No Text on Top */}
                <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#0b0e1e] border border-white/10 shadow-xl group">
                  <Image
                    src={fabric.image}
                    alt={`${fabric.name} fabric - Wadi Hattat Trading`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={idx < 3}
                    className="object-cover object-center filter brightness-[0.96] contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Content Displayed Completely Outside the Image Card - No Enquire Button, No Links */}
                <div className="mt-4 sm:mt-5 flex flex-col">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl sm:text-2xl font-light text-white tracking-wide">
                      {fabric.name}
                    </h3>
                    {/* <span className="text-xs font-mono text-[#ddaf4d] tracking-widest">
                      {String(fabric.id).padStart(2, "0")}
                    </span> */}
                  </div>

                  <p className="mt-2.5 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {fabric.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Custom Wholesale Sourcing Consultation Banner */}
        <Reveal variant="up" className="mt-20 sm:mt-28">
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#12162e] via-[#0c1024] to-[#12162e] border border-white/10 p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ddaf4d]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.24em] text-[#ddaf4d] mb-3">
                BESPOKE WEAVING & BULK SOURCING
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight">
                Require Custom Colors, GSM Weights, or Private Mill Runs?
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-2xl">
                We work directly with textile mills across Japan, Korea, and
                international manufacturing hubs. From custom dyeing and
                lab-dips to container shipments, our Dubai trading desk caters
                to wholesale requirements of any scale.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/971502441981?text=Hi%20Wadi%20Hattat%2C%20I%20am%20looking%20for%20custom%20fabric%20sourcing%20and%20wholesale%20rolls."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 bg-[#ddaf4d] hover:bg-[#f0c56c] text-neutral-950 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-lg shadow-[#ddaf4d]/20 hover:scale-105 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>

                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium px-6 py-3.5 rounded-full border border-white/20 hover:border-white text-white hover:bg-white hover:text-neutral-950 transition-all duration-300"
                >
                  <span>Submit Wholesale Enquiry</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
