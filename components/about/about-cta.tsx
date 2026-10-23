import React from "react";
import Link from "next/link";
import { Reveal } from "@/layouts/reveal";

export default function AboutCta() {
  return (
    <section className="w-full bg-white py-8 lg:py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <Reveal variant="scale" className="rounded-xl p-8 sm:p-12 lg:p-16 bg-neutral-50/80 border border-neutral-200/90 text-neutral-900 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block text-xs sm:text-[13px] font-mono uppercase tracking-[0.22em] text-neutral-400 mb-3 sm:mb-4">
                CONNECT WITH US
              </span>

              <h2 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[45px] font-normal tracking-tight text-neutral-900 leading-[1.2] mb-4">
                Partner With Us
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-xl">
                Looking for a reliable local supplier or international textile trading partner? Connect with Wadi Hattat Trading today to discuss your fabric and wholesale requirements.
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600 font-light">
                <div>
                  <strong className="font-medium text-neutral-900 block">
                    Headquarters:
                  </strong>
                  Dubai, United Arab Emirates (Deira &amp; Bur Dubai)
                </div>
                <div>
                  <strong className="font-medium text-neutral-900 block">
                    Direct Inquiries:
                  </strong>
                  info@wadihattat.com • +971 52 647 4325
                </div>
              </div>
            </div>

            {/* Right Column: Actions */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:items-end">
              <Link
                href="/contact-us"
                className="px-7 py-3.5 bg-neutral-900 hover:bg-black text-white text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-300 text-center shadow-sm hover:shadow-md cursor-pointer"
              >
                Contact Our Team →
              </Link>

              <a
                href="https://wa.me/971526474325?text=Hello%20Wadi%20Hattat%20Trading%2C%20I%20would%20like%20to%20discuss%20a%20wholesale%20fabric%20partnership."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-300 text-center shadow-sm cursor-pointer"
              >
                WhatsApp Us Direct
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
