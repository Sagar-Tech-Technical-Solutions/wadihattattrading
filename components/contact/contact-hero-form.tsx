"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/layouts/reveal";

const INQUIRY_TYPES = [
  "Sourcing",
  "Wholesale",
  "Finishing",
  "Corporate",
  "Others",
];

export default function ContactHeroForm() {
  const [selectedInquiry, setSelectedInquiry] = useState("Wholesale");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    email: "",
    message: "",
    newsletter: true,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 700);
  };

  const whatsappDirectUrl =
    "https://wa.me/971526474325?text=" +
    encodeURIComponent(
      `Hello Wadi Hattat Trading, I am reaching out from your website contact page regarding ${selectedInquiry} inquiries.`,
    );

  return (
    <section className="relative rounded-xl overflow-hidden bg-neutral-950 text-white min-h-[640px] shadow-2xl">
      {/* Background Architectural/Fabric Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Modern Fabric Showroom with Warm Wood Accents.webp"
          alt="Wadi Hattat Trading Luxury Textiles"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.2] contrast-[1]"
        />
      </div>

      {/* Foreground Grid Content */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-14 xl:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Headline, Description & 2x2 Contact Details */}
        <Reveal
          variant="up"
          className="lg:col-span-6 flex flex-col justify-between h-full space-y-8 lg:space-y-12"
        >
          <div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[2.5rem] font-normal leading-[1.25] tracking-tight">
              You have questions,
              <br />
              We have answers
            </h1>
            <p className="mt-5 text-sm tracking-wide text-neutral-300 font-light leading-relaxed max-w-xl">
              A distinguished textile destination in Dubai. Seamless experiences
              you won&apos;t find anywhere else thoughtfully curated Japanese
              Nida, textured crepes, and sartorial weaves for couture houses and
              wholesale partners worldwide.
            </p>
          </div>

          {/* 2x2 Grid of Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/15">
            {/* 1. Location */}
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ddaf4d]">
                Location
              </h4>
              <p className="text-xs text-neutral-200 font-light leading-relaxed">
                9 8th St - Al Sabkha, Deira
                <br />4 Stores in Deira &amp; Bur Dubai
              </p>
              <p className="text-[11px] text-neutral-400 font-light pt-0.5">
                Mon - Sat: 09:00 - 14:00 &amp; 16:00 - 21:00
              </p>
              <p className="text-[11px] text-rose-300 font-medium">
                Sunday: Closed
              </p>
            </div>

            {/* 2. Social Media */}
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ddaf4d]">
                Social Media
              </h4>
              <ul className="text-xs text-neutral-300 font-light space-y-0.5">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram: @wadihattat
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#25D366] transition-colors"
                  >
                    WhatsApp Desk
                  </a>
                </li>
                <li>
                  <span className="text-neutral-400">LinkedIn • Facebook</span>
                </li>
              </ul>
            </div>

            {/* 3. Email */}
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ddaf4d]">
                Email
              </h4>
              <p className="text-xs font-light">
                <a
                  href="mailto:whtdxb@gmail.com"
                  className="text-neutral-200 hover:text-white transition-colors block"
                >
                  whtdxb@gmail.com
                </a>
                {/* <a
                  href="mailto:sales@wadihattat.com"
                  className="text-neutral-300 hover:text-white transition-colors block"
                >
                  sales@wadihattat.com
                </a> */}
              </p>
            </div>

            {/* 4. Contact */}
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ddaf4d]">
                Contact
              </h4>
              <p className="text-xs font-mono text-neutral-200 font-light space-y-0.5">
                <a
                  href="tel:+971526474325"
                  className="block hover:text-[#ddaf4d] transition-colors"
                >
                  +971 52 647 4325
                </a>
                <a
                  href="tel:+97143536515"
                  className="block text-neutral-300 hover:text-[#ddaf4d] transition-colors"
                >
                  +971 4 353 6515
                </a>
              </p>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Floating Pristine White Form Card */}
        <Reveal
          delay={150}
          variant="scale"
          className="lg:col-span-6 flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-lg bg-white text-neutral-900 rounded-xl shadow-2xl p-6 sm:p-8 lg:p-9 border border-neutral-100">
            <div className="mb-6">
              <h3 className="font-display text-2xl sm:text-[1.65rem] font-normal text-neutral-900">
                Tell Us What You Need
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-500 font-light mt-1">
                Our team is ready to assist you with every detail, big or small.
              </p>
            </div>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium text-neutral-900">
                    Inquiry Received
                  </h4>
                  <p className="text-xs text-neutral-500 font-light mt-1">
                    Thank you for reaching out. Our textile advisors in Dubai
                    will contact you promptly.
                  </p>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Chat Directly on WhatsApp</span>
                    <span>→</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-neutral-500 hover:text-black underline pt-1 cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: First Name | Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 text-xs border border-neutral-200 rounded-full focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 bg-neutral-50/50"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 text-xs border border-neutral-200 rounded-full focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 bg-neutral-50/50"
                    />
                  </div>
                </div>

                {/* Row 2: Country / City | Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Country / City"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          country: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 text-xs border border-neutral-200 rounded-full focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 bg-neutral-50/50"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-2.5 text-xs border border-neutral-200 rounded-full focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 bg-neutral-50/50 font-mono"
                    />
                  </div>
                </div>

                {/* Row 3: Email Address */}
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-xs border border-neutral-200 rounded-full focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 bg-neutral-50/50"
                  />
                </div>

                {/* Row 4: Type of Inquiry Pill Buttons */}
                <div className="pt-1">
                  <label className="block text-[11px] font-medium text-neutral-500 mb-2">
                    Type of Inquiry
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INQUIRY_TYPES.map((type) => {
                      const isSelected = selectedInquiry === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedInquiry(type)}
                          className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                            isSelected
                              ? "bg-neutral-900 text-white shadow-2xs"
                              : "bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-400"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Row 5: Message Textarea */}
                <div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 bg-neutral-50/50 resize-y"
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-2 pt-0.5">
                  <input
                    id="newsletter-check"
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newsletter: e.target.checked,
                      })
                    }
                    className="w-3.5 h-3.5 accent-neutral-900 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="newsletter-check"
                    className="text-[11px] text-neutral-500 font-light cursor-pointer select-none"
                  >
                    Subscribe to our exclusive textile &amp; collection releases
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full border border-neutral-900 bg-neutral-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
