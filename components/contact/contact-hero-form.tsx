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

    setIsSubmitting(true);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://wadibck.demotempwebsite.co.in";

      const payload = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        phone: `${countryCode} ${cleanPhone}`,
        city: formData.city.trim(),
        type_of_enquiry: selectedInquiry,
        message: formData.message.trim(),
      };

      const response = await fetch(`${baseUrl}/wp-json/enquiry/v1/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            `Submission failed with status ${response.status}`,
        );
      }

      if (data && (data.success === false || data.status === "error")) {
        throw new Error(data.message || "Failed to submit enquiry.");
      }

      setSuccessMessage(data?.message || "");
      setFormSubmitted(true);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        city: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Submission error:", error);
      setErrorMessage(
        error?.message ||
          "Failed to submit enquiry. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirectUrl =
    "https://wa.me/971526474325?text=" +
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
            <div className="space-y-1">
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
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ddaf4d]">
                Social Media
              </h4>
              <ul className="text-xs text-neutral-600 font-light space-y-0.5">
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
                  <span className="text-neutral-600">LinkedIn • Facebook</span>
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
                  className="text-neutral-600 hover:text-white transition-colors block"
                >
                  whtdxb@gmail.com
                </a>
              </p>
            </div>

            {/* 4. Contact */}
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ddaf4d]">
                Contact
              </h4>
              <p className="text-xs font-mono text-neutral-600 font-light space-y-0.5">
                <a
                  href="tel:+971526474325"
                  className="block hover:text-[#ddaf4d] transition-colors"
                >
                  +971 52 647 4325
                </a>
                <a
                  href="tel:+97143536515"
                  className="block text-neutral-600 hover:text-[#ddaf4d] transition-colors"
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
