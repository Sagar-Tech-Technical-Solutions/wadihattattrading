"use client";

import React from "react";

export const COLORS = [
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

interface CollectionFilterSidebarProps {
  openAccordion: string | null;
  toggleAccordion: (key: string) => void;
  sliderPrice: number;
  handlePriceChange: (price: number) => void;
  handlePriceCommit: (price: number) => void;
  selectedColor: string;
  handleColorSelect: (color: string) => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
  handleResetFilters: () => void;
}

export default function CollectionFilterSidebar({
  openAccordion,
  toggleAccordion,
  sliderPrice,
  handlePriceChange,
  handlePriceCommit,
  selectedColor,
  handleColorSelect,
  hasActiveFilters,
  activeFilterCount,
  handleResetFilters,
}: CollectionFilterSidebarProps) {
  return (
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
            className="text-[11px] uppercase tracking-wider text-neutral-400 hover:text-black underline cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Accordions */}
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
    </aside>
  );
}
