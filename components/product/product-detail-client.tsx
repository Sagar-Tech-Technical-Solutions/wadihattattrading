"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ui/product-card";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [activeImage, setActiveImage] = useState<string>(
    product?.imagePrimary || "",
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0] || "",
  );
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Pre-configured WhatsApp enquiry link
  const whatsappMessage = encodeURIComponent(
    `Hello Wadi Hattat Trading, I would like to inquire about "${product.name}" (${product.category} - AED ${product.priceAED} ${product.unit}). Please provide wholesale availability and sample details.`,
  );
  const whatsappUrl = `https://wa.me/971526474325?text=${whatsappMessage}`;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id,
  )
    .concat(PRODUCTS.filter((p) => p.id !== product.id))
    .slice(0, 4);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryModalOpen(false);
    }, 2500);
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto py-8 lg:py-14 px-4 md:px-8 lg:px-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/collection/${product.categorySlug}`}
            className="hover:text-black transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-black font-medium">{product.name}</span>
        </nav>

        {/* Product Showcase: Two-Column Catalogue Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Visual Swatch Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Primary Large Square Frame */}
            <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 rounded-xl border border-neutral-200/80">
              <Image
                src={activeImage || product.imagePrimary}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-all duration-500"
              />
            </div>

            {/* Thumbnail Angle Selectors */}
            <div className="flex items-center gap-3">
              {[
                { src: product.imagePrimary, label: "View 1 (Texture)" },
                { src: product.imageHover, label: "View 2 (Drape)" },
              ].map((view, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(view.src)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === view.src
                      ? "border-dark-gold ring-1 ring-dark-gold/30"
                      : "border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={view.src}
                    alt={view.label}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Fabric Information & Enquiry Actions */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Category Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-dark-gold inline-block" />
              <p className="text-xs uppercase tracking-[0.25em] font-medium text-neutral-500">
                {product.category} Collection • Dubai, UAE
              </p>
            </div>

            {/* Fabric Title */}
            <h1 className="mt-2 font-display text-3xl sm:text-4xl text-neutral-900 font-normal leading-tight">
              {product.name}
            </h1>

            {/* Price Display in AED */}
            <div className="mt-4 pb-5 border-b border-neutral-100">
              <p className="text-2xl font-semibold text-neutral-900">
                AED {product.priceAED}{" "}
                <span className="text-sm font-normal text-neutral-500">
                  / {product.unit}
                </span>
              </p>
              <p className="mt-1 text-xs text-neutral-500 font-light">
                * Bulk wholesale pricing &amp; sample swatches available upon request.
              </p>
            </div>

            {/* Description */}
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-neutral-600 font-light">
              {product.description}
            </p>

            {/* Color Swatch Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-900">
                  Available Shades:{" "}
                  <span className="font-normal text-neutral-500">
                    {selectedColor}
                  </span>
                </span>
                <div className="flex items-center gap-2 mt-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-all cursor-pointer ${
                        selectedColor === color
                          ? "border-black bg-black text-white"
                          : "border-neutral-300 bg-white text-neutral-700 hover:border-black"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CATALOGUE ENQUIRY BUTTONS */}
            <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col gap-3">
              {/* WhatsApp Direct Enquiry */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 bg-[#011e47] hover:bg-black text-white px-7 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-sm"
              >
                <span>Inquire via WhatsApp</span>
                <span>→</span>
              </a>

              {/* Request Swatch / Formal Quotation Modal Button */}
              <button
                type="button"
                onClick={() => setInquiryModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 border border-neutral-300 hover:border-black text-neutral-900 px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 bg-white cursor-pointer"
              >
                <span>Request Swatches or Bulk Quote</span>
              </button>
            </div>

            {/* Fabric Technical Specifications Table */}
            <div className="mt-10 pt-6 border-t border-neutral-200/80">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 mb-4">
                Fabric Specifications
              </h3>
              <dl className="divide-y divide-neutral-100 text-xs">
                <div className="py-2.5 flex justify-between">
                  <dt className="text-neutral-500 uppercase tracking-wider">
                    Composition
                  </dt>
                  <dd className="font-medium text-neutral-900">
                    {product.specs.composition}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-neutral-500 uppercase tracking-wider">
                    Fabric Width
                  </dt>
                  <dd className="font-medium text-neutral-900">
                    {product.specs.width}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-neutral-500 uppercase tracking-wider">
                    Weight (GSM)
                  </dt>
                  <dd className="font-medium text-neutral-900">
                    {product.specs.weight}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-neutral-500 uppercase tracking-wider">
                    Tactile Feel
                  </dt>
                  <dd className="font-medium text-neutral-900">
                    {product.specs.feel}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-neutral-500 uppercase tracking-wider">
                    Origin
                  </dt>
                  <dd className="font-medium text-neutral-900">
                    {product.specs.origin}
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-neutral-500 uppercase tracking-wider">
                    Recommended For
                  </dt>
                  <dd className="font-medium text-neutral-900 text-right">
                    {product.specs.bestFor}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Related Fabrics Section */}
        <div className="mt-20 pt-12 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl sm:text-3xl text-neutral-900 font-normal">
              Related Fabrics
            </h2>
            <Link
              href={`/collection/${product.categorySlug}`}
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
            >
              View More in {product.category} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </div>

      {/* Formal Enquiry Modal */}
      {inquiryModalOpen && (
        <div
          onClick={() => setInquiryModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-lg w-full rounded-xl p-6 sm:p-8 shadow-2xl relative"
          >
            <button
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black text-lg p-2 cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>

            <span className="text-xs font-mono uppercase tracking-widest text-dark-gold">
              Catalogue Inquiry
            </span>
            <h3 className="mt-1 font-display text-2xl text-neutral-900">
              Inquire: {product.name}
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              Send us your desired quantity, sample request, or wholesale specifications.
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
              <form onSubmit={handleInquirySubmit} className="mt-6 space-y-4">
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
                      placeholder="e.g. 50 Meters or Roll"
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
                  className="w-full bg-[#011e47] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold py-3.5 rounded-full transition-colors cursor-pointer"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
