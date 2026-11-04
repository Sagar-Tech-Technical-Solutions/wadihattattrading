import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/layouts/reveal";

export interface PartnerBrand {
  id: string;
  name: string;
  subtitle: string;
  logo: string;
}

export const PARTNER_BRANDS: PartnerBrand[] = [
  {
    id: "habiba",
    name: "Habiba",
    subtitle: "Exclusive Fabrics",
    logo: "/brands/hab.png",
  },
  {
    id: "daniya-exim",
    name: "Daniya Exim",
    subtitle: "Global Markets",
    logo: "/brands/dan.png",
  },
  {
    id: "zuraiq",
    name: "Zuraiq",
    subtitle: "House of Textile",
    logo: "/brands/3.png",
  },
  {
    id: "hengyi",
    name: "Hengyi Brand",
    subtitle: "Original No.1 Quality",
    logo: "/brands/4.png",
  },
  {
    id: "hs-camel",
    name: "H.S Camel",
    subtitle: "Original Camel Brand",
    logo: "/brands/5.png",
  },
  {
    id: "jojotex",
    name: "Jojotex",
    subtitle: "Premium Textiles",
    logo: "/brands/6.png",
  },
];

export default function OurPartnersSection() {
  return (
    <section
      id="our-partners"
      className="w-full bg-gray-100 text-neutral-900 py-16 sm:py-20 lg:py-24 px-4 md:px-8 lg:px-16 overflow-hidden border-t border-neutral-200/70"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <Reveal
          variant="fade"
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          <span className="inline-block text-xs sm:text-[13px] font-mono uppercase tracking-[0.22em] text-[#ddaf4d] font-semibold mb-3">
            STRATEGIC ALLIANCES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-light text-neutral-900 tracking-tight leading-[1.2]">
            Our Partners
          </h2>
          {/* <p className="mt-3.5 text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
            Collaborating with leading global textile mills, manufacturers, and
            distinguished fabric houses to ensure consistent quality and
            unmatched reliability.
          </p> */}
        </Reveal>

        {/* 6-Column Responsive Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
          {PARTNER_BRANDS.map((partner, idx) => (
            <Reveal key={partner.id} delay={idx * 60} variant="up">
              <div className="group relative flex flex-col items-center justify-between h-full p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-neutral-200/80 hover:border-[#ddaf4d]/50 shadow-sm hover:shadow-lg transition-all duration-300">
                {/* Brand Logo Container */}
                <div className="relative aspect-[2/1] rounded-md w-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} - Partner of Wadi Hattat Trading`}
                    height={200}
                    width={200}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Brand Label */}
                <div className="mt-3.5 pt-3 w-full border-t border-neutral-100 text-center">
                  <p className="text-[13px] font-medium text-neutral-900 tracking-wide group-hover:text-[#b3862b] transition-colors truncate">
                    {partner.name}
                  </p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-light mt-0.5 truncate">
                    {partner.subtitle}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Subtext Footer */}
        <Reveal
          variant="fade"
          delay={200}
          className="mt-10 sm:mt-12 text-center"
        >
          <p className="text-xs text-neutral-500 font-light">
            Looking for wholesale partnerships or private-label sourcing?{" "}
            <Link
              href="/contact-us"
              className="text-neutral-900 font-medium underline underline-offset-4 hover:text-[#ddaf4d] transition-colors"
            >
              Contact our trade desk →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
