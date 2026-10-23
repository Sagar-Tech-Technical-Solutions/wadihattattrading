"use client";

import React from "react";
import { SORT_OPTIONS } from "./collection-header";
import { COLORS } from "./collection-filter-sidebar";

interface CollectionMobileDrawerProps {
  mobileDrawerType: "filter" | "sort" | null;
  setMobileDrawerType: (type: "filter" | "sort" | null) => void;
  collectionSlug: string;
  productCount: number;
  hasActiveFilters: boolean;
  activeFilterCount: number;
  selectedSort: string;
  onSortChange: (sortValue: string) => void;
  openAccordion: string | null;
  toggleAccordion: (key: string) => void;
  sliderPrice: number;
  onPriceChange: (price: number) => void;
  selectedColor: string;
  onColorSelect: (color: string) => void;
  onResetFilters: () => void;
  onApplyFilters: () => void;
}

export default function CollectionMobileDrawer({
  mobileDrawerType,
  setMobileDrawerType,
  collectionSlug,
  productCount,
  hasActiveFilters,
  activeFilterCount,
  selectedSort,
  onSortChange,
  openAccordion,
  toggleAccordion,
  sliderPrice,
  onPriceChange,
  selectedColor,
  onColorSelect,
  onResetFilters,
  onApplyFilters,
}: CollectionMobileDrawerProps) {
  return (
    <>
      {/* MOBILE FIXED BOTTOM BAR (Filter & Sort triggers) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] lg:hidden">
        {/* Filter Trigger */}
        <button
          type="button"
          onClick={() => setMobileDrawerType("filter")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all border cursor-pointer ${
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
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-neutral-300 rounded-xl text-xs uppercase tracking-widest font-semibold text-neutral-900 active:bg-neutral-100 transition-colors cursor-pointer"
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
                      onClick={() => {
                        onSortChange(opt.value);
                        setMobileDrawerType(null);
                      }}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-colors text-left cursor-pointer ${
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
                <div className="divide-y divide-neutral-200">
                  {/* Price Filter */}
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("price")}
                      className="w-full flex items-center justify-between text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 cursor-pointer text-left focus:outline-none"
                    >
                      <span>Price (AED)</span>
                      <span className="text-sm font-mono text-neutral-400">
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
                          onChange={(e) => onPriceChange(Number(e.target.value))}
                          className="w-full accent-[#011e47] cursor-pointer"
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

                  {/* Fabric Shades Filter */}
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("colors")}
                      className="w-full flex items-center justify-between text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 cursor-pointer text-left focus:outline-none"
                    >
                      <span>Fabric Shades</span>
                      <span className="text-sm font-mono text-neutral-400">
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
                              onClick={() => onColorSelect(c)}
                              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
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
                </div>

                {/* Apply Button & Reset */}
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-3">
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={onResetFilters}
                      className="flex-1 py-3 border border-neutral-300 text-neutral-800 text-xs uppercase tracking-widest font-semibold rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onApplyFilters}
                    className="flex-2 w-full py-3 bg-[#011e47] text-white text-xs uppercase tracking-widest font-semibold rounded-xl cursor-pointer shadow-sm active:bg-[#0a4281] transition-colors"
                  >
                    View {productCount} Results
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
