"use client";

import React, { useState } from "react";
import { Product } from "@/data/products";
import { VariantItem } from "./product-variants";

interface ProductInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedVariant: VariantItem;
}

export default function ProductInquiryModal({
  isOpen,
  onClose,
  product,
  selectedVariant,
}: ProductInquiryModalProps) {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-lg w-full rounded-xl p-6 sm:p-8 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black text-lg p-2 cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>

        <span className="text-xs font-mono uppercase tracking-widest text-[#ddaf4d]">
          Catalogue Inquiry
        </span>
        <h3 className="mt-1 font-display text-2xl text-neutral-900">
          Inquire: {product.name}
        </h3>
        <p className="text-xs text-neutral-500 font-light mt-1">
          Selected Variant:{" "}
          <strong className="text-neutral-800 font-medium">
            {selectedVariant.name}
          </strong>{" "}
          • Listed at AED {product.priceAED} {product.unit}
        </p>

        {inquirySubmitted ? (
          <div className="mt-6 py-8 text-center bg-neutral-50 rounded-xl border border-green-200">
            <p className="text-sm font-semibold text-green-800">
              Thank you! Your inquiry has been recorded.
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Our Dubai sales representative will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                Your Name / Company
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Fatima Al-Nuaimi"
                className="w-full border border-neutral-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+971 50 123 4567"
                  className="w-full border border-neutral-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                  Quantity Required
                </label>
                <input
                  type="text"
                  placeholder="e.g. 50 Meters or 1 Roll"
                  className="w-full border border-neutral-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                Inquiry Notes / Request
              </label>
              <textarea
                rows={3}
                placeholder="Please specify color shade, sample requirements, or shipping destination..."
                className="w-full border border-neutral-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#011e47] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold py-3.5 rounded-xl transition-colors cursor-pointer"
            >
              Submit Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
