"use client";

import React from "react";
import ProductCard from "@/components/ui/product-card";
import { Reveal } from "@/layouts/reveal";
import { Product } from "@/data/products";

interface CollectionGridProps {
  products: Product[];
  isPending: boolean;
  onResetFilters: () => void;
}

export default function CollectionGrid({
  products,
  isPending,
  onResetFilters,
}: CollectionGridProps) {
  return (
    <main className="flex-1 w-full">
      {products.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-neutral-200 rounded-xl p-8 bg-neutral-50/50">
          <p className="font-display text-xl text-neutral-800">
            No fabrics found in this selection
          </p>
          <p className="mt-2 text-xs text-neutral-500">
            Try adjusting your price filter or selecting another shade.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 px-5 py-2.5 bg-black text-white text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
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
          {products.map((product, idx) => (
            <Reveal
              key={product.id}
              delay={Math.min(idx * 40, 400)}
              variant="up"
            >
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
