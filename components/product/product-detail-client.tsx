"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product, PRODUCTS } from "@/data/products";
import { Reveal } from "@/layouts/reveal";
import ProductGallery from "./product-gallery";
import ProductInfo from "./product-info";
import ProductVariants, { VariantItem } from "./product-variants";
import ProductActions from "./product-actions";
import ProductSpecsTable from "./product-specs";
import ProductRelated from "./product-related";
import ProductLightbox from "./product-lightbox";
import ProductInquiryModal from "./product-inquiry-modal";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  // Construct variants from product.colors and images
  const variants: VariantItem[] = useMemo(() => {
    const colorsList =
      product?.colors && product.colors.length > 0
        ? product.colors
        : ["Default Shade"];

    return colorsList.map((colorName, idx) => ({
      name: colorName,
      image:
        idx === 0
          ? product.imagePrimary
          : product.imageHover || product.imagePrimary,
    }));
  }, [product]);

  const [selectedVariant, setSelectedVariant] = useState<VariantItem>(variants[0]);
  const [activeImage, setActiveImage] = useState<string>(
    product?.imagePrimary || "",
  );

  // Synchronize active image if selected variant changes
  const handleSelectVariant = (v: VariantItem) => {
    setSelectedVariant(v);
    setActiveImage(v.image);
  };

  // Compile all unique images for gallery & lightbox
  const allImages = useMemo(() => {
    const list = [product.imagePrimary, product.imageHover];
    variants.forEach((v) => {
      if (v.image && !list.includes(v.image)) {
        list.push(v.image);
      }
    });
    return list.filter(Boolean);
  }, [product, variants]);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Inquire Modal state
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // Pre-configured WhatsApp enquiry link with selected variant
  const whatsappMessage = encodeURIComponent(
    `Hello Wadi Hattat Trading, I would like to inquire about "${product.name}" in shade "${selectedVariant.name}" (${product.category} - AED ${product.priceAED} ${product.unit}). Please provide wholesale availability and sample swatches.`,
  );
  const whatsappUrl = `https://wa.me/971526474325?text=${whatsappMessage}`;

  const openLightboxWithImage = (imgSrc: string) => {
    const idx = allImages.indexOf(imgSrc);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) => p.categorySlug === product.categorySlug && p.id !== product.id,
    )
      .concat(PRODUCTS.filter((p) => p.id !== product.id))
      .slice(0, 4);
  }, [product]);

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto py-8 lg:py-14 px-4 md:px-8 lg:px-16">
        {/* Breadcrumb Navigation */}
        <Reveal variant="fade">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/collection/${product.categorySlug}`}
              className="hover:text-black transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-black font-medium">{product.name}</span>
          </nav>
        </Reveal>

        {/* Product Showcase: Two-Column Catalogue Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Visual Swatch Gallery & Angle Selector */}
          <Reveal variant="up" className="lg:col-span-7">
            <ProductGallery
              product={product}
              activeImage={activeImage}
              onSelectImage={setActiveImage}
              onOpenLightbox={openLightboxWithImage}
            />
          </Reveal>

          {/* Right Column: Fabric Information & Enquiry Actions */}
          <Reveal
            delay={120}
            variant="up"
            className="lg:col-span-5 flex flex-col justify-start"
          >
            {/* Title, Category, Price & Description */}
            <ProductInfo product={product} />

            {/* Variant Selector with Image & Text */}
            <ProductVariants
              variants={variants}
              selectedVariant={selectedVariant}
              onSelectVariant={handleSelectVariant}
            />

            {/* Actions: WhatsApp Theme Button, Direct Call & Swatch Quote Request */}
            <ProductActions
              whatsappUrl={whatsappUrl}
              onOpenInquiryModal={() => setInquiryModalOpen(true)}
            />

            {/* Fabric Technical Specifications Table */}
            <ProductSpecsTable specs={product.specs} />
          </Reveal>
        </div>

        {/* Related Fabrics Section */}
        <ProductRelated
          relatedProducts={relatedProducts}
          categoryName={product.category}
          categorySlug={product.categorySlug}
        />
      </div>

      {/* Fullscreen Luxury Lightbox Modal */}
      <ProductLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        productName={product.name}
        variantName={selectedVariant.name}
        allImages={allImages}
        initialIndex={lightboxIndex}
      />

      {/* Formal Swatch / Quotation Inquiry Modal */}
      <ProductInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        product={product}
        selectedVariant={selectedVariant}
      />
    </div>
  );
}
