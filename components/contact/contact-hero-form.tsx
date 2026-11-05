"use client";

import React, { useState } from "react";
import { Reveal } from "@/layouts/reveal";

const INQUIRY_TYPES = [
  "Sourcing",
  "Wholesale",
  "Finishing",
  "Corporate",
  "Others",
];

// ponytail: native select avoids heavy phone-input packages
const COUNTRY_CODES = [
  { code: "+971", label: "+971 UAE" },
  { code: "+966", label: "+966 KSA" },
  { code: "+968", label: "+968 OMN" },
  { code: "+965", label: "+965 KWT" },
  { code: "+974", label: "+974 QAT" },
  { code: "+973", label: "+973 BHR" },
  { code: "+91", label: "+91 IND" },
  { code: "+92", label: "+92 PAK" },
  { code: "+44", label: "+44 UK" },
  { code: "+1", label: "+1 USA" },
  { code: "+90", label: "+90 TUR" },
  { code: "+20", label: "+20 EGY" },
  { code: "+86", label: "+86 CHN" },
];

export default function ContactHeroForm() {
  const [selectedInquiry, setSelectedInquiry] = useState("Wholesale");
  const [countryCode, setCountryCode] = useState("+971");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedConsent, setAgreedConsent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Input validation
    if (!formData.first_name.trim()) {
      setErrorMessage("Please enter your first name.");
      return;
    }
    if (!formData.last_name.trim()) {
      setErrorMessage("Please enter your last name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    const cleanPhone = formData.phone.trim().replace(/[\s-]/g, "");
    if (!cleanPhone || cleanPhone.length < 5 || cleanPhone.length > 16) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage("Please enter your message.");
      return;
    }
    if (!agreedConsent) {
      setErrorMessage(
        "Please accept the agreement to share your information before submitting.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          email: formData.email.trim(),
          phone: `${countryCode} ${cleanPhone}`.trim(),
          city: formData.city.trim(),
          type_of_enquiry: selectedInquiry,
          message: formData.message.trim(),
        }),
      });

      const resData = await response.json().catch(() => null);

      if (!response.ok || !resData?.success) {
        throw new Error(
          resData?.error || "Failed to submit enquiry. Please try again.",
        );
      }

      setSuccessMessage(
        "Thank you for contacting Wadi Hattat Trading! Your enquiry has been received and a confirmation email has been sent to your inbox. Our textile specialists will reach out shortly.",
      );
      setFormSubmitted(true);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        city: "",
        message: "",
      });
      setAgreedConsent(false);
    } catch (err: any) {
      setErrorMessage(
        err?.message ||
          "Failed to submit enquiry. Please try again or reach us directly on WhatsApp.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirectUrl =
    "https://wa.me/97143536515?text=" +
    encodeURIComponent(
      `Hello Wadi Hattat Trading, I am reaching out from your website contact page regarding ${selectedInquiry} inquiries.`,
    );

  return (
    <section className="relative overflow-hidden bg-white min-h-[640px]">
      {/* Foreground Grid Content */}
      <div className="relative z-10 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
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
            <p className="mt-5 text-sm tracking-wide text-neutral-600 font-light leading-relaxed max-w-xl">
              A distinguished textile destination in Dubai. Seamless experiences
              you won&apos;t find anywhere else thoughtfully curated Japanese
              Nida, textured crepes, and sartorial weaves for couture houses and
              wholesale partners worldwide.
            </p>
          </div>

          {/* 2x2 Grid of Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/15">
            {/* 1. Location */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ddaf4d]">
                Location
              </h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                9 8th St - Al Sabkha, Deira
                <br />4 Stores in Deira &amp; Bur Dubai
              </p>
              <p className="text-[11px] text-neutral-500 font-light pt-0.5">
                Mon - Sat: 09:00 - 14:00 &amp; 16:00 - 21:00
              </p>
              <p className="text-[11px] text-rose-300 font-medium">
                Sunday: Closed
              </p>
            </div>

            {/* 2. Social Media */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ddaf4d]">
                Social Media
              </h4>
              <ul className="text-xs text-neutral-600 font-light space-y-0.5">
                <li>
                  <a
                    href="https://www.instagram.com/wadi_hattat.ae"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-dark-gold transition-colors"
                  >
                    Instagram: @wadi_hattat.ae
                  </a>
                </li>
                {/* <li>
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#25D366] transition-colors"
                  >
                    WhatsApp Desk
                  </a>
                </li> */}
              </ul>
            </div>

            {/* 3. Email */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ddaf4d]">
                Email
              </h4>
              <p className="text-xs font-light">
                <a
                  href="mailto:whtdxb@gmail.com"
                  className="text-neutral-600 hover:text-dark-gold transition-colors block"
                >
                  whtdxb@gmail.com
                </a>
              </p>
            </div>

            {/* 4. Contact */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ddaf4d]">
                Contact
              </h4>
              <ul className="space-y-2 text-[13px] sm:text-[14px] font-light text-neutral-800">
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
                      className="transition-colors hover:text-dark-gold text-[13px] font-medium"
                    >
                      +971 4 353 6515
                    </a>
                  </div>
                </li>

                {/* 2. Office Landline */}
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 shrink-0 mt-0.5 text-neutral-800 flex items-center justify-center">
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
                      className="transition-colors hover:text-dark-gold text-[13px] font-medium"
                    >
                      +971 4 353 6515
                    </a>
                  </div>
                </li>
              </ul>
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
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mx-auto border border-emerald-200">
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
                    {successMessage ||
                      "Thank you for reaching out. Our textile advisors in Dubai will contact you promptly."}
                  </p>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Chat Directly on WhatsApp</span>
                    <span>→</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setErrorMessage("");
                    }}
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
                      value={formData.first_name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          first_name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 bg-neutral-50/50"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          last_name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 bg-neutral-50/50"
                    />
                  </div>
                </div>

                {/* Row 2: Country / City | Country Code + Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Country / City"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          city: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 bg-neutral-50/50"
                    />
                  </div>
                  <div className="flex border border-neutral-200 rounded-lg bg-neutral-50/50 focus-within:border-neutral-900 transition-colors overflow-hidden">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      aria-label="Country code"
                      className="bg-transparent pl-3 pr-1 py-2.5 text-xs text-neutral-800 border-r border-neutral-200 focus:outline-none cursor-pointer font-mono shrink-0"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2.5 text-xs bg-transparent focus:outline-none placeholder:text-neutral-400 font-mono"
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
                    className="w-full px-4 py-2.5 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 bg-neutral-50/50"
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
                          className={`px-3.5 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
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

                {/* Consent Agreement Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="contact-consent"
                    checked={agreedConsent}
                    onChange={(e) => setAgreedConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-0 focus:outline-none accent-neutral-900 cursor-pointer shrink-0"
                  />
                  <label
                    htmlFor="contact-consent"
                    className="text-xs text-neutral-600 font-light leading-relaxed cursor-pointer select-none"
                  >
                    I agree to share my information with Wadi Hattat Trading and
                    consent to being contacted regarding my enquiry.
                  </label>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 text-xs rounded-xl bg-rose-50 text-rose-700 border border-rose-200 flex items-start gap-2">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0 text-rose-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg border border-neutral-900 bg-neutral-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-lg animate-spin" />
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
