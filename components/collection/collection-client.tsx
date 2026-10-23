"use client";

import React, { useState, useTransition, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Product } from "@/data/products";
import ProductCard from "@/components/ui/product-card";

interface CollectionClientProps {
  products: Product[];
  collectionSlug: string;
  pageTitle: string;
  initialSort: string;
  initialColor: string;
  initialMaxPrice: number;
}

const COLORS = [
  "All Colors",
  "Jet Black",
  "Midnight Blue",
  "Dune Beige",
  "Champagne Ivory",
  "Bright White",
  "Dusty Rose",
  "Warm Camel",
  "Desert Sand",
  "Taupe",
];

const SORT_OPTIONS = [
  { label: "Featured Fabrics", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function CollectionClient({
  products,
  collectionSlug,
  pageTitle,
  initialSort,
  initialColor,
  initialMaxPrice,
}: CollectionClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Derived from server searchParams
  const selectedSort = initialSort;
  const selectedColor = initialColor;

  // Local state for price slider dragging
  const [sliderPrice, setSliderPrice] = useState<number>(initialMaxPrice);

  // Mobile drawer state: "filter" | "sort" | null
  const [mobileDrawerType, setMobileDrawerType] = useState<
    "filter" | "sort" | null
  >(null);

  // Lock body scroll when mobile bottom sheet is active
  useEffect(() => {
    if (mobileDrawerType !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerType]);

  // Accordion state: only one accordion open at a time (Category is removed!)
  const [openAccordion, setOpenAccordion] = useState<string | null>("price");

  const toggleAccordion = (key: string) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  // Helper to push updated search params to URL
  const pushFilters = (newParams: {
    sort?: string;
    color?: string;
    maxPrice?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    // Sort param
    const nextSort =
      newParams.sort !== undefined ? newParams.sort : selectedSort;
    if (nextSort && nextSort !== "featured") {
      params.set("sort", nextSort);
    } else {
      params.delete("sort");
    }

    // Color param
    const nextColor =
      newParams.color !== undefined ? newParams.color : selectedColor;
    if (nextColor && nextColor !== "All Colors") {
      params.set("color", nextColor);
    } else {
      params.delete("color");
    }

    // Max Price param
    const nextMaxPrice =
      newParams.maxPrice !== undefined ? newParams.maxPrice : sliderPrice;
    if (nextMaxPrice && nextMaxPrice < 300) {
      params.set("maxPrice", nextMaxPrice.toString());
    } else {
      params.delete("maxPrice");
    }

    const queryString = params.toString();
    startTransition(() => {
      router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, {
        scroll: false,
      });
    });
  };

  const handleSortChange = (newSort: string) => {
    pushFilters({ sort: newSort });
    setMobileDrawerType(null);
  };

  const handleColorSelect = (color: string) => {
    const next = selectedColor === color ? "All Colors" : color;
    pushFilters({ color: next });
  };

  const handlePriceChange = (price: number) => {
    setSliderPrice(price);
  };

  const handlePriceCommit = (price: number) => {
    pushFilters({ maxPrice: price });
  };

  const handleResetFilters = () => {
    setSliderPrice(300);
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
    setMobileDrawerType(null);
  };

  // Active filters count (excluding category because collection page is fixed per slug)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedColor !== "All Colors") count++;
    if (initialMaxPrice < 300) count++;
    return count;
  }, [selectedColor, initialMaxPrice]);

  const hasActiveFilters = activeFilterCount > 0;

  // Filter Accordions (Category removed as requested!)
  const renderFilterAccordions = () => (
    <div className="divide-y divide-neutral-200">
      {/* 1. Price Accordion */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleAccordion("price")}
          className="w-full flex items-center justify-between text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 cursor-pointer text-left focus:outline-none"
        >
          <span>Price (AED)</span>
          <span className="text-sm font-mono text-neutral-400 transition-transform duration-300">
            {openAccordion === "price" ? "−" : "+"}
          </span>
        </button>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            openAccordion === "price"
              ? "max-h-48 opacity-100 mt-3.5"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-3 px-0.5">
            <input
              type="range"
              min="80"
              max="300"
              step="5"
              value={sliderPrice}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              onMouseUp={() => handlePriceCommit(sliderPrice)}
              onTouchEnd={() => handlePriceCommit(sliderPrice)}
              className="w-full accent-dark-gold cursor-pointer"
            />
            <div className="flex items-center justify-between text-xs font-mono text-neutral-600">
              <span>AED 80</span>
              <span className="font-semibold text-black">
                Up to AED {sliderPrice}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Fabric Shades Accordion */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleAccordion("colors")}
          className="w-full flex items-center justify-between text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 cursor-pointer text-left focus:outline-none"
        >
          <span>Fabric Shades</span>
          <span className="text-sm font-mono text-neutral-400 transition-transform duration-300">
            {openAccordion === "colors" ? "−" : "+"}
          </span>
        </button>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            openAccordion === "colors"
              ? "max-h-72 opacity-100 mt-3.5"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-wrap gap-1.5 pt-1">
            {COLORS.map((c) => {
              const isSelected = selectedColor === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleColorSelect(c)}
                  className={`text-[11px] px-2.5 py-1 rounded-2xs border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-black text-white border-black font-medium shadow-xs"
                      : "bg-white text-neutral-600 border-neutral-300 hover:border-black"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reset Option */}
      {hasActiveFilters && (
        <div className="py-3">
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs uppercase tracking-wider text-neutral-400 hover:text-black underline cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full bg-white min-h-screen pb-24 lg:pb-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto py-8 lg:py-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 mb-6">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/collection/all"
            className="hover:text-black transition-colors"
          >
            Collections
          </Link>
          <span>/</span>
          <span className="text-black font-medium">{pageTitle}</span>
        </nav>

        {/* Page Heading & Desktop Sort Row */}
        <div className="border-b border-neutral-100 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-black/90 font-normal leading-tight">
                {pageTitle}
              </h1>
              {isPending && (
                <span className="w-4 h-4 border-2 border-neutral-300 border-t-black rounded-full animate-spin inline-block" />
              )}
            </div>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400 font-light">
              Showing {products.length}{" "}
              {products.length === 1 ? "fabric" : "fabrics"} in{" "}
              {collectionSlug.toUpperCase()}
            </p>
          </div>

          {/* Desktop Sort Dropdown */}
          <div className="hidden lg:flex items-center gap-2 text-xs">
            <span className="text-neutral-400 uppercase tracking-widest">
              Sort:
            </span>
            <select
              value={selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-transparent border border-neutral-300 rounded-xs px-3 py-2 text-xs uppercase tracking-wider text-neutral-800 focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content: Accordion Sidebar & 4-Column Product Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* Left Filter Sidebar with Icon Header (Desktop) - Category removed */}
          <aside className="hidden lg:block w-full lg:w-60 shrink-0 sticky top-28 self-start pt-1">
            {/* Sidebar Label Header with Filter Icon */}
            <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-neutral-200">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 text-neutral-800">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </span>
                <span className="text-xs uppercase tracking-[0.22em] font-bold text-neutral-900">
                  Filters
                </span>
                {activeFilterCount > 0 && (
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#011e47] text-white text-[10px] font-mono font-medium">
                    {activeFilterCount}
                  </span>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] uppercase tracking-wider text-neutral-400 hover:text-black transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Accordions */}
            {renderFilterAccordions()}
          </aside>

          {/* Right Product Grid: 4 in desktop, 2 in mobile */}
          <main className="flex-1 w-full">
            {products.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-neutral-200 rounded-xs p-8">
                <p className="font-display text-xl text-neutral-800">
                  No fabrics found in this selection
                </p>
                <p className="mt-2 text-xs text-neutral-500">
                  Try adjusting your price filter or selecting another shade.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 px-5 py-2.5 bg-black text-white text-xs uppercase tracking-widest rounded-xs cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 sm:gap-4 lg:gap-x-4 lg:gap-y-10 transition-opacity duration-200 ${
                  isPending ? "opacity-60" : "opacity-100"
                }`}
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FIXED BOTTOM BAR (Filter & Sort) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] lg:hidden">
        {/* Filter Trigger */}
        <button
          type="button"
          onClick={() => setMobileDrawerType("filter")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xs text-xs uppercase tracking-widest font-semibold transition-all border cursor-pointer ${
            hasActiveFilters
              ? "bg-[#011e47] text-white border-[#011e47] shadow-sm"
              : "bg-white text-neutral-900 border-neutral-300 active:bg-neutral-100"
          }`}
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span>Filter</span>
          {activeFilterCount > 0 && (
            <span
              className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-mono ${
                hasActiveFilters
                  ? "bg-white text-[#011e47]"
                  : "bg-neutral-900 text-white"
              }`}
            >
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Sort Trigger */}
        <button
          type="button"
          onClick={() => setMobileDrawerType("sort")}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-neutral-300 rounded-xs text-xs uppercase tracking-widest font-semibold text-neutral-900 active:bg-neutral-100 transition-colors cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5 text-neutral-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
            />
          </svg>
          <span>Sort</span>
        </button>
      </div>

      {/* MOBILE BOTTOM SLIDER SHEET */}
      {mobileDrawerType !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop overlay */}
          <div
            onClick={() => setMobileDrawerType(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-2xs animate-fade-in"
            aria-hidden="true"
          />

          {/* Sliding Bottom Drawer */}
          <div
            data-lenis-prevent
            className="relative z-10 bg-white w-full rounded-t-2xl max-h-[85vh] overflow-y-auto p-5 pb-8 shadow-2xl animate-slide-up"
          >
            {/* Grab Pill Handle */}
            <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto mb-4" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                {mobileDrawerType === "filter" ? (
                  <>
                    <svg
                      className="w-4 h-4 text-neutral-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.75}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-900">
                      Filter ({collectionSlug.toUpperCase()})
                    </h2>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 text-neutral-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.75}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                      />
                    </svg>
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-900">
                      Sort Products
                    </h2>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() => setMobileDrawerType(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-black cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Drawer Body */}
            {mobileDrawerType === "sort" ? (
              <div className="py-4 space-y-2">
                {SORT_OPTIONS.map((opt) => {
                  const isSelected = selectedSort === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSortChange(opt.value)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xs text-xs uppercase tracking-wider font-medium transition-colors text-left cursor-pointer ${
                        isSelected
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <span>✓</span>}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="py-2">
                {renderFilterAccordions()}

                {/* Apply Button */}
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-3">
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="flex-1 py-3 border border-neutral-300 text-neutral-800 text-xs uppercase tracking-widest font-semibold rounded-xs cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      pushFilters({
                        maxPrice: sliderPrice,
                        color: selectedColor,
                      });
                      setMobileDrawerType(null);
                    }}
                    className="flex-2 w-full py-3 bg-[#011e47] text-white text-xs uppercase tracking-widest font-semibold rounded-xs cursor-pointer shadow-sm active:bg-[#0a4281] transition-colors"
                  >
                    View {products.length} Results
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
