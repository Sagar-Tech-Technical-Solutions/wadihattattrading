import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export default function ProductCard({
  product,
  className = "",
  priority = false,
}: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group block cursor-pointer ${className}`}
    >
      {/* Square Product Image Frame */}
      <div className="relative aspect-[4/4.75] w-full overflow-hidden bg-neutral-100 rounded-xl">
        {/* Default Primary Image */}
        <Image
          src={product.imagePrimary}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-opacity duration-500 ease-in-out group-hover:opacity-0"
        />

        {/* Second Hover Image with Smooth Fade-in on Desktop */}
        <Image
          src={product.imageHover}
          alt={`${product.name} detail view`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
        />

        {/* Hover Pill CTA (Desktop) */}
        {/* <div className="absolute bottom-3 left-3 right-3 hidden sm:flex items-center justify-center bg-white/95 text-black text-[11px] uppercase tracking-[0.18em] font-medium py-2 rounded-2xs opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm transform translate-y-2 group-hover:translate-y-0">
          <span>View Details & Inquire</span>
        </div> */}
      </div>

      {/* Product Metadata Below Image */}
      <div className="mt-3.5 space-y-1">
        <p className="text-[10px] uppercase tracking-[0.1em] font-light text-dark-gold">
          {product.category}
        </p>
        <p className="text-[14px] line-clamp-1 lg:line-clamp-none text-neutral-900 font-normal group-hover:text-dark-blue transition-colors">
          {product.name}
        </p>
        <div className="flex items-center justify-between pt-0.5">
          <p className="text-sm font-medium text-neutral-800">
            AED {product.priceAED}{" "}
            <span className="text-xs text-neutral-500 font-light">
              / {product.unit}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
