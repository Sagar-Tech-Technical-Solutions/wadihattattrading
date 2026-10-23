"use client";

import React, { useState } from "react";
import { FAQS, type FAQItem } from "@/data/faqs";
import { Reveal } from "@/layouts/reveal";

interface FaqSectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  className?: string;
  items?: FAQItem[];
}

export default function FaqSection({
  eyebrow = "Common Inquiries",
  title = (
    <>
      Frequently Asked
      <br />
      Questions
    </>
  ),
  subtitle = "Contact us if you still have any questions to make your textile sourcing experience smoother.",
  className = "",
  items = FAQS,
}: FaqSectionProps) {
  const [openFaq, setOpenFaq] = useState<string | null>("01");

  const toggleFaq = (num: string) => {
    setOpenFaq(openFaq === num ? null : num);
  };

  return (
    <section className={`w-full py-8 lg:py-16 ${className}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading & Subtitle */}
          <Reveal variant="up" className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ddaf4d] mb-2">
              {eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-neutral-900 font-normal leading-tight">
              {title}
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-sm">
              {subtitle}
            </p>
          </Reveal>

          {/* Right Column: Numbered 01 - 06 Accordion */}
          <div className="lg:col-span-7 divide-y divide-neutral-200 border-t border-b border-neutral-200">
            {items.map((faq, index) => {
              const isOpen = openFaq === faq.number;

              return (
                <Reveal key={faq.number} delay={index * 60} variant="up">
                  <div className="py-5 sm:py-6">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.number)}
                    className="w-full flex items-start justify-between gap-4 text-left cursor-pointer group focus:outline-none"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <span className="font-mono text-xs sm:text-sm text-neutral-400 pt-0.5 select-none font-medium">
                        {faq.number}
                      </span>
                      <h3
                        className={`text-sm sm:text-base font-medium transition-colors ${
                          isOpen
                            ? "text-neutral-900"
                            : "text-neutral-800 group-hover:text-black"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <span
                      className={`w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center shrink-0 transition-transform duration-200 mt-0.5 ${
                        isOpen
                          ? "rotate-180 border-neutral-900 text-neutral-900"
                          : "text-neutral-400 group-hover:border-neutral-500 group-hover:text-neutral-700"
                      }`}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        {isOpen ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12h-15"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        )}
                      </svg>
                    </span>
                  </button>

                  {/* Expandable Content */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "max-h-96 opacity-100 pt-3 pl-8 sm:pl-12"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
