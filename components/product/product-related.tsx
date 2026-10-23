"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import ProductCard from "@/components/ui/product-card";
import { Reveal } from "@/layouts/reveal";

interface ProductRelatedProps {
  relatedProducts: Product[];
  categoryName: string;
  categorySlug: string;
}

export default function ProductRelated({
  relatedProducts,
  categoryName,
  categorySlug,
}: ProductRelatedProps) {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <Reveal
      delay={150}
      variant="up"
      className="mt-20 pt-12 border-t border-neutral-200"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-3xl text-neutral-900 font-normal">
          Related Fabrics
        </h2>
        <Link
          href={`/collection/${categorySlug}`}
          className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
        >
          View More in {categoryName} →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 lg:gap-x-6 lg:gap-y-8">
        {relatedProducts.map((rel, idx) => (
          <Reveal key={rel.id} delay={idx * 60} variant="up">
            <ProductCard product={rel} />
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}
