"use client";

import React, { useState, useRef } from "react";
import { Reveal } from "@/layouts/reveal";

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

export default function CareerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+971");
  const [phone, setPhone] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [agreedConsent, setAgreedConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    // Allowed file types: PDF, DOC, DOCX
    const allowedExtensions = ["pdf", "doc", "docx"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";

    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMessage("Please upload a valid document format (.pdf, .doc, .docx).");
      return;
    }

    // Max file size: 10 MB
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("File size exceeds 10MB limit. Please upload a smaller document.");
      return;
    }

    setErrorMessage("");
    setResumeFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const cleanPhone = phone.trim().replace(/[\s-]/g, "");
    if (!cleanPhone || cleanPhone.length < 5 || cleanPhone.length > 16) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    if (!resumeFile) {
      setErrorMessage("Please attach your resume / CV document.");
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
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("phone", cleanPhone);
      formData.append("full_phone", `${countryCode} ${cleanPhone}`.trim());
      formData.append("resume", resumeFile);

      const response = await fetch("/api/career", {
        method: "POST",
        body: formData,
      });

      const resData = await response.json().catch(() => null);

      if (!response.ok || !resData?.success) {
        throw new Error(
          resData?.error || "Failed to submit application. Please try again.",
        );
      }

      setIsSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setResumeFile(null);
      setAgreedConsent(false);
    } catch (err: any) {
      setErrorMessage(
        err?.message ||
          "Failed to submit application. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/95 backdrop-blur-md text-neutral-900 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-9 border border-white/80">
      {isSubmitted ? (
        <div className="py-10 text-center space-y-4 animate-in fade-in">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
            <svg
              className="w-7 h-7"
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
            <h4 className="text-lg font-medium text-neutral-900">
              Application Received
            </h4>
            <p className="text-xs sm:text-sm text-neutral-500 font-light mt-1 max-w-sm mx-auto">
              Thank you for applying to Wadi Hattat Trading. Our recruitment team in Deira will review your resume and reach out if your profile matches our current openings.
            </p>
          </div>
          <div className="pt-3">
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="text-xs text-neutral-600 hover:text-black underline cursor-pointer"
            >
              Submit another application
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4.5">
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

          {/* 1. Name */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-500 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Fatima Al-Nuaimi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 bg-neutral-50/50"
            />
          </div>

          {/* 2. Phone Number with Country Code */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-500 mb-1.5">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="flex border border-neutral-200 rounded-xl bg-neutral-50/50 focus-within:border-neutral-900 transition-colors overflow-hidden">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                aria-label="Country code"
                className="bg-transparent pl-3 pr-1 py-3 text-xs text-neutral-800 border-r border-neutral-200 focus:outline-none cursor-pointer font-mono shrink-0"
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
                placeholder="50 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-3 text-xs bg-transparent focus:outline-none placeholder:text-neutral-400 font-mono"
              />
            </div>
          </div>

          {/* 3. Email Address */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-500 mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 bg-neutral-50/50"
            />
          </div>

          {/* 4. Resume File Upload */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-500 mb-1.5">
              Resume / CV <span className="text-rose-500">*</span>
            </label>

            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              className="hidden"
            />

            {resumeFile ? (
              <div className="p-3.5 border border-neutral-200 bg-neutral-50/70 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 text-[#ddaf4d] flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-medium text-neutral-900 truncate">
                      {resumeFile.name}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                      {formatFileSize(resumeFile.size)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setResumeFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="w-7 h-7 rounded-full hover:bg-neutral-200/80 text-neutral-500 hover:text-black flex items-center justify-center text-xs transition-colors shrink-0 cursor-pointer"
                  aria-label="Remove uploaded resume"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? "border-neutral-900 bg-neutral-100/60"
                    : "border-neutral-200 hover:border-neutral-400 bg-neutral-50/40 hover:bg-neutral-50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-700 mb-2.5">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </div>
                <p className="text-xs font-medium text-neutral-800">
                  Click to upload or drag & drop your resume
                </p>
                <p className="text-[11px] text-neutral-400 font-light mt-1">
                  PDF, DOC, or DOCX (Max 10MB)
                </p>
              </div>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="career-consent"
              checked={agreedConsent}
              onChange={(e) => setAgreedConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-0 focus:outline-none accent-neutral-900 cursor-pointer shrink-0"
            />
            <label
              htmlFor="career-consent"
              className="text-xs text-neutral-600 font-light leading-relaxed cursor-pointer select-none"
            >
              I agree to share my information and resume with Wadi Hattat
              Trading and consent to being contacted regarding career
              opportunities.
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
                  <span>Submitting Application...</span>
                </>
              ) : (
                <span>Submit Application</span>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

