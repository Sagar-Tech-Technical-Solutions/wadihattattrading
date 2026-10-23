"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/data/products";

interface ProductGalleryProps {
  product: Product;
  activeImage: string;
  onSelectImage: (src: string) => void;
  onOpenLightbox: (src: string) => void;
}

export default function ProductGallery({
  product,
  activeImage,
  onSelectImage,
  onOpenLightbox,
}: ProductGalleryProps) {
  const currentImage = activeImage || product.imagePrimary;

  const views = [
    { src: product.imagePrimary, label: "View 1 (Texture)" },
    { src: product.imageHover, label: "View 2 (Drape)" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Primary Large Square Frame with Lightbox Trigger */}
      <div
        onClick={() => onOpenLightbox(currentImage)}
        className="group relative aspect-square w-full overflow-hidden bg-neutral-100 rounded-xl border border-neutral-200/80 cursor-zoom-in"
      >
        <Image
          src={currentImage}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-103"
        />

        {/* Hover Zoom Prompt Badge */}
        <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-md rounded-full px-3.5 py-1.5 shadow-md border border-neutral-200/80 text-[11px] font-mono text-neutral-800 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <svg
            className="w-3.5 h-3.5 text-neutral-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
            />
          </svg>
          <span>Click to Expand</span>
        </div>
      </div>

      {/* Thumbnail Angle Selectors */}
      <div className="flex items-center gap-3">
        {views.map((view, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectImage(view.src)}
            className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
              activeImage === view.src
                ? "border-[#ddaf4d] ring-2 ring-[#ddaf4d]/30 scale-102"
                : "border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={view.src}
              alt={view.label}
              fill
              sizes="80px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/50 py-0.5 text-[9px] font-mono text-white text-center">
              0{idx + 1}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
