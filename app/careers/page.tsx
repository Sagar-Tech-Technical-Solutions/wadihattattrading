import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/layouts/reveal";
import CareerForm from "@/components/careers/career-form";

export const metadata: Metadata = {
  title: "Careers | Wadi Hattat Trading Dubai",
  description:
    "Join our team in Dubai. Submit your application and resume to Wadi Hattat Trading.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return (
    <div className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-center items-center py-14 sm:py-20 px-4 md:px-8 overflow-hidden">
      {/* Background Image with Faded Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/Modern Fabric Showroom with Warm Wood Accents.webp"
          alt="Wadi Hattat Trading Dubai Career Environment"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter "
        />
        {/* Multi-layered Faded Overlays */}
        {/* <div className="absolute inset-0 bg-white/40 sm:bg-white/40 backdrop-blur-[5px]" /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white/60" />
        {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.7)_100%)]" /> */}
      </div>

      <div className="relative z-10 max-w-xl w-full mx-auto">
        {/* Centered Heading & Short Description */}
        <Reveal variant="fade" className="text-center mb-7 sm:mb-8">
          <span className="inline-block text-[11px] font-mono uppercase tracking-[0.25em] text-[#ddaf4d] font-semibold mb-2">
            CAREERS AT WADI HATTAT
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[40px] text-neutral-900 font-normal leading-tight">
            Join Our Team
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-light mt-2.5 leading-relaxed max-w-md mx-auto">
            We are always seeking passionate talent to join our Dubai textile
            showrooms and operations. Submit your details below.
          </p>
        </Reveal>

        {/* Centered Form */}
        <Reveal variant="up" delay={100} className="w-full">
          <CareerForm />
        </Reveal>
      </div>
    </div>
  );
}
