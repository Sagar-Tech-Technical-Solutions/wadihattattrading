"use client";

import React from "react";
import { Product } from "@/data/products";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <>
      {/* Category Eyebrow */}
      <div className="flex items-center gap-2">
        <p className="text-xs uppercase tracking-[0.25em] font-medium text-neutral-500">
          {product.category} Collection
        </p>
      </div>

      {/* Fabric Title */}
      <h1 className="mt-2 font-display text-3xl sm:text-4xl text-neutral-900 font-normal leading-tight">
        {product.name}
      </h1>

      {/* Price Display in AED */}
      <div className="mt-4 pb-5 border-b border-neutral-100">
        {/* <p className="text-2xl sm:text-3xl font-semibold text-neutral-900">
          AED {product.priceAED}{" "}
          <span className="text-sm font-normal text-neutral-500">
            / {product.unit}
          </span>
        </p> */}
        <p className="mt-1 text-xs text-neutral-500 font-light">
          Bulk container &amp; wholesale roll pricing available on direct
          request.
        </p>
      </div>

      {/* Description */}
      <p className="mt-5 text-sm sm:text-base leading-relaxed text-neutral-600 font-light">
        {product.description}
      </p>
    </>
  );
}
