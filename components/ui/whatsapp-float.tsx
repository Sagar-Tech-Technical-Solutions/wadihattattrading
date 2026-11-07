"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { WhatsappLogoIcon } from "@phosphor-icons/react";

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isVisible, setIsVisible] = useState(!isHomepage);

  // On homepage, delay appearance until hero entrance animation completes
  useEffect(() => {
    if (!isHomepage) {
      setIsVisible(true);
      return;
    }

    if (
      typeof window !== "undefined" &&
      (window as any).__heroAnimationComplete
    ) {
      setIsVisible(true);
      return;
    }

    const onComplete = () => {
      setIsVisible(true);
    };

    const onReveal = () => {
      // Appear smoothly right as hero content finishes settling
      setTimeout(onComplete, 800);
    };

    window.addEventListener("hero-animation-complete", onComplete);
    window.addEventListener("fabric-loader-reveal", onReveal);

    // Safety fallback so button is never permanently hidden
    const safetyTimer = setTimeout(onComplete, 4500);

    return () => {
      window.removeEventListener("hero-animation-complete", onComplete);
      window.removeEventListener("fabric-loader-reveal", onReveal);
      clearTimeout(safetyTimer);
    };
  }, [isHomepage]);

  // Dynamic context-aware greeting message based on current page
  let message =
    "Hi Wadi Hattat Trading, I have an inquiry regarding your textile collections.";

  if (pathname === "/fabrics") {
    message =
      "Hi Wadi Hattat Trading, I'm interested in your wholesale fabrics collection. Could you share catalog details and availability?";
  } else if (pathname === "/about-us") {
    message =
      "Hi Wadi Hattat Trading, I would like to learn more about your company and textile sourcing.";
  } else if (pathname === "/careers") {
    message =
      "Hi Wadi Hattat Trading, I have an inquiry regarding career opportunities.";
  } else if (pathname === "/contact-us") {
    message =
      "Hi Wadi Hattat Trading, I would like to visit your Dubai showroom / place a wholesale enquiry.";
  } else if (pathname.startsWith("/blog")) {
    message =
      "Hi Wadi Hattat Trading, I was reading your textile journal and would like to discuss fabric sourcing.";
  }

  const whatsappHref = `https://wa.me/97143536515?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Wadi Hattat Trading on WhatsApp"
      className={`group fixed bottom-4 right-4 z-40 flex items-center overflow-hidden p-2.5 rounded-lg bg-[#25D366] text-white shadow-[0_10px_28px_-6px_rgba(22,19,15,0.35)] transition-all duration-700 ease-out hover:-translate-y-0.5 hover:bg-[#1ebe5a] hover:shadow-[0_12px_32px_-4px_rgba(37,211,102,0.45)] sm:bottom-6 sm:right-6 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <WhatsappLogoIcon size={25} />
      {/* label slides out on desktop hover */}
      <span className="hidden max-w-0 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em] opacity-0 transition-all duration-300 group-hover:max-w-44 group-hover:px-3 group-hover:opacity-100 sm:inline-block">
        Chat with us
      </span>
    </a>
  );
}
export { WhatsAppFloat };
