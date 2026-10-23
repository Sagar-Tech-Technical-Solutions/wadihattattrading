"use client";

import React from "react";
import Link from "next/link";
import { Reveal } from "@/layouts/reveal";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ui/product-card";

export default function PremiumCollection() {
  // Take the first 4 featured products for the homepage
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <section
      id="premium-collection"
      className="w-full bg-white py-8 lg:py-16 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header Row */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="mt-6 font-display text-[1.7rem] md:text-6xl lg:text-[2rem] text-black/90 font-normal leading-[1.2]">
                Premium Collection
              </h2>
            </div>

            <Link
              href="/collection/all"
              className="text-xs uppercase tracking-[0.1em] font-medium text-neutral-600 hover:text-dark-gold transition-colors border-b border-neutral-300 hover:border-dark-gold pb-0.5 w-fit"
            >
              <span>View All Products</span>
              <span className="ml-1.5 inline-block">→</span>
            </Link>
          </div>
        </Reveal>

        {/* Product Cards Grid using Reusable ProductCard Component */}
        <div className="mt-6 lg:mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 lg:gap-x-4 lg:gap-y-8">
          {featuredProducts.map((product, idx) => (
            <Reveal key={product.id} delay={100 + idx * 70}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
