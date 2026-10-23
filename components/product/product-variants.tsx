"use client";

import React from "react";
import Image from "next/image";

export interface VariantItem {
  name: string;
  image: string;
}

interface ProductVariantsProps {
  variants: VariantItem[];
  selectedVariant: VariantItem;
  onSelectVariant: (variant: VariantItem) => void;
}

export default function ProductVariants({
  variants,
  selectedVariant,
  onSelectVariant,
}: ProductVariantsProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="mt-6 pt-5 border-t border-neutral-100">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider font-semibold text-neutral-900">
          Select Shade / Variant:{" "}
          <span className="font-medium text-[#ddaf4d] font-sans">
            {selectedVariant.name}
          </span>
        </span>
        <span className="text-[11px] font-mono text-neutral-400">
          {variants.length} {variants.length === 1 ? "Option" : "Options"}
        </span>
      </div>

      {/* Vertical Variant Cards (Image on top, Text below) */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3">
        {variants.map((v) => {
          const isSelected = selectedVariant.name === v.name;
          return (
            <button
              key={v.name}
              type="button"
              onClick={() => onSelectVariant(v)}
              className={`group flex flex-col items-center w-20 sm:w-22 p-1.5 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-neutral-900 bg-neutral-100 text-neutral-900 shadow-sm ring-1.5 ring-neutral-900"
                  : "border-neutral-200/90 bg-white text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50"
              }`}
            >
              {/* Image Preview Swatch */}
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shrink-0 bg-neutral-100 border border-neutral-200/60 mb-1.5">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  sizes="88px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Text Label */}
              <span className="text-[11px] font-medium tracking-tight leading-tight text-neutral-900 line-clamp-2 w-full text-center">
                {v.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
