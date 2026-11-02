import React from "react";
import { Reveal } from "@/layouts/reveal";

interface WhyUsItem {
  number: string;
  title: string;
  description: string;
}

const WHY_US_ITEMS: WhyUsItem[] = [
  {
    number: "01",
    title: "Industry Expertise & Legacy",
    description:
      "With over two decades of market heritage, we possess deep technical insight into yarn counts, fabric drape, and seasonal fashion shifts.",
  },
  {
    number: "02",
    title: "Strategic Hub & Swift Availability",
    description:
      "Directly rooted in Dubai's premier textile district with 4 central showrooms, ensuring fast roll sampling and reliable container stock.",
  },
  {
    number: "03",
    title: "Uncompromising Quality Control",
    description:
      "Direct relationships with certified international mills guarantee consistent weave density, colorfastness, and authentic material composition.",
  },
];

export default function AboutWhyUs() {
  return (
    <section className="w-full bg-white text-neutral-900 py-16 sm:py-20 lg:py-24 px-4 md:px-8 lg:px-16 overflow-hidden border-b border-neutral-100">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="max-w-3xl mb-10 lg:mb-14" variant="up">
          <span className="inline-block text-xs sm:text-[13px] font-mono uppercase tracking-[0.24em] text-[#ddaf4d] font-semibold mb-2 sm:mb-3">
            WHY CHOOSE US?
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-light text-neutral-900 tracking-tight leading-[1.15]">
            Built on Reliability, Integrity &amp; Quality
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-2xl">
            From independent couture ateliers to international volume merchants, our partners trust Wadi Hattat Trading for steadfast reliability and exquisite textiles.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {WHY_US_ITEMS.map((item, idx) => (
            <Reveal
              key={item.number}
              delay={idx * 110}
              variant="up"
              className="h-full"
            >
              <div className="h-full rounded-2xl p-7 sm:p-8 lg:p-9 bg-neutral-50/80 border border-neutral-200/80 hover:bg-white hover:border-[#ddaf4d]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#ddaf4d] block mb-4">
                    {item.number}
                  </span>

                  <h3 className="text-lg sm:text-xl font-medium text-neutral-900 tracking-tight mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
