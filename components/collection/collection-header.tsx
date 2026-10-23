"use client";

import React from "react";
import Link from "next/link";
import { Reveal } from "@/layouts/reveal";

export interface SortOption {
  label: string;
  value: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { label: "Featured Fabrics", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

interface CollectionHeaderProps {
  pageTitle: string;
  collectionSlug: string;
  productCount: number;
  isPending: boolean;
  selectedSort: string;
  onSortChange: (sortValue: string) => void;
}

export default function CollectionHeader({
  pageTitle,
  collectionSlug,
  productCount,
  isPending,
  selectedSort,
  onSortChange,
}: CollectionHeaderProps) {
  return (
    <Reveal variant="up">
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
            Showing {productCount}{" "}
            {productCount === 1 ? "fabric" : "fabrics"} in{" "}
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
            onChange={(e) => onSortChange(e.target.value)}
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
    </Reveal>
  );
}
