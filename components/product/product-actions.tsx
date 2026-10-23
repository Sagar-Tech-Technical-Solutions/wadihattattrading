"use client";

import React from "react";

interface ProductActionsProps {
  whatsappUrl: string;
  onOpenInquiryModal: () => void;
}

export default function ProductActions({
  whatsappUrl,
  onOpenInquiryModal,
}: ProductActionsProps) {
  return (
    <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col gap-3">
      {/* WhatsApp Enquiry Button in Official WhatsApp Green */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-white px-7 py-4 rounded-lg text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group"
      >
        {/* Official WhatsApp SVG Logo */}
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.116-.062-.26-.086-.586-.201-.989-.377-1.748-.763-2.903-2.529-2.99-2.645-.088-.117-.714-.951-.714-1.815 0-.864.453-1.289.614-1.464.161-.176.351-.22.469-.22.117 0 .234.001.336.006.107.005.25-.041.391.297.146.352.498 1.216.541 1.305.044.088.073.191.015.307-.059.117-.088.19-.176.293-.088.103-.186.23-.265.309-.088.088-.18.184-.077.36.103.176.458.756.983 1.224.676.602 1.246.788 1.423.876.176.088.279.073.382-.044.103-.117.44-.513.557-.689.117-.176.234-.146.396-.088.161.059 1.026.484 1.202.572.176.088.293.132.336.205.044.073.044.425-.1.83z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.307A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182c-1.636 0-3.155-.477-4.444-1.303l-.318-.204-2.964.777.791-2.89-.224-.356A8.148 8.148 0 013.818 12c0-4.512 3.67-8.182 8.182-8.182 4.512 0 8.182 3.67 8.182 8.182 0 4.512-3.67 8.182-8.182 8.182z" />
        </svg>
        <span>WhatsApp Enquiry</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>

      {/* Direct Call Button */}
      <a
        href="tel:+971526474325"
        className="w-full inline-flex items-center justify-center gap-2.5 bg-neutral-900 hover:bg-black active:scale-[0.99] text-white px-7 py-3.5 rounded-lg text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-sm cursor-pointer group"
      >
        <svg
          className="w-4 h-4 fill-none stroke-current"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
        <span>Call Showroom: +971 52 647 4325</span>
      </a>

      {/* Request Formal Swatch or Bulk Quote Modal */}
      <button
        type="button"
        onClick={onOpenInquiryModal}
        className="w-full inline-flex items-center justify-center gap-2 border border-neutral-300 hover:border-black text-neutral-800 hover:text-black px-7 py-3 rounded-lg text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 bg-white cursor-pointer"
      >
        <span>Request Swatches or Bulk Quotation</span>
      </button>
    </div>
  );
}
