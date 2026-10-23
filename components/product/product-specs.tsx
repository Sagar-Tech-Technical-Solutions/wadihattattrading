"use client";

import React from "react";
import { Product } from "@/data/products";

interface ProductSpecsProps {
  specs: Product["specs"];
}

export default function ProductSpecsTable({ specs }: ProductSpecsProps) {
  if (!specs) return null;

  return (
    <div className="mt-10 pt-6 border-t border-neutral-200/80">
      <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 mb-4">
        Fabric Specifications
      </h3>
      <dl className="divide-y divide-neutral-100 text-xs">
        <div className="py-2.5 flex justify-between">
          <dt className="text-neutral-500 uppercase tracking-wider">
            Composition
          </dt>
          <dd className="font-medium text-neutral-900">{specs.composition}</dd>
        </div>
        <div className="py-2.5 flex justify-between">
          <dt className="text-neutral-500 uppercase tracking-wider">
            Fabric Width
          </dt>
          <dd className="font-medium text-neutral-900">{specs.width}</dd>
        </div>
        <div className="py-2.5 flex justify-between">
          <dt className="text-neutral-500 uppercase tracking-wider">
            Weight (GSM)
          </dt>
          <dd className="font-medium text-neutral-900">{specs.weight}</dd>
        </div>
        <div className="py-2.5 flex justify-between">
          <dt className="text-neutral-500 uppercase tracking-wider">
            Tactile Feel
          </dt>
          <dd className="font-medium text-neutral-900">{specs.feel}</dd>
        </div>
        <div className="py-2.5 flex justify-between">
          <dt className="text-neutral-500 uppercase tracking-wider">Origin</dt>
          <dd className="font-medium text-neutral-900">{specs.origin}</dd>
        </div>
        <div className="py-2.5 flex justify-between">
          <dt className="text-neutral-500 uppercase tracking-wider">
            Recommended For
          </dt>
          <dd className="font-medium text-neutral-900 text-right">
            {specs.bestFor}
          </dd>
        </div>
      </dl>
    </div>
  );
}
