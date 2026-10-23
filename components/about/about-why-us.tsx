import React from "react";

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
      "With over two decades of market experience, we possess deep technical knowledge of fabric quality, global sourcing networks, and evolving market demands.",
  },
  {
    number: "02",
    title: "Strong Local Presence & Global Reach",
    description:
      "With deep roots in Dubai’s vibrant commercial textile hub, we offer local clients swift delivery and reliable stock availability, backed by robust international supply lines.",
  },
  {
    number: "03",
    title: "Uncompromising Quality",
    description:
      "We partner with established manufacturers to ensure every roll of fabric meets strict quality standards, durability requirements, and aesthetic expectations.",
  },
];

export default function AboutWhyUs() {
  return (
    <section className="w-full bg-white text-neutral-900 py-8 lg:py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-3xl mb-8 lg:mb-12">
          <span className="inline-block text-xs sm:text-[13px] font-mono uppercase tracking-[0.22em] text-neutral-400 mb-3 sm:mb-4">
            WHY CHOOSE US?
          </span>

          <h2 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[45px] font-normal tracking-tight text-neutral-900 leading-[1.2] mb-6">
            Built on Reliability, Integrity &amp; Quality
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            From independent boutiques to international trade partners, our clients trust Wadi Hattat Trading for consistent excellence and market expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {WHY_US_ITEMS.map((item) => (
            <div
              key={item.number}
              className="rounded-xl p-6 sm:p-8 lg:p-9 bg-neutral-50/70 border border-neutral-200/80 hover:bg-white hover:border-[#ddaf4d]/60 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#ddaf4d] block mb-4">
                  {item.number}
                </span>

                <h3 className="text-lg sm:text-xl font-normal text-neutral-900 tracking-tight mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
