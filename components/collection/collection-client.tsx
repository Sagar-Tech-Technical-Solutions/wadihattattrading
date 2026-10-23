"use client";

import React, { useState, useTransition, useEffect, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Product } from "@/data/products";
import CollectionHeader from "./collection-header";
import CollectionFilterSidebar from "./collection-filter-sidebar";
import CollectionGrid from "./collection-grid";
import CollectionMobileDrawer from "./collection-mobile-drawer";

interface CollectionClientProps {
  products: Product[];
  collectionSlug: string;
  pageTitle: string;
  initialSort: string;
  initialColor: string;
  initialMaxPrice: number;
}

export default function CollectionClient({
  products,
  collectionSlug,
  pageTitle,
  initialSort,
  initialColor,
  initialMaxPrice,
}: CollectionClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Derived from server searchParams
  const selectedSort = initialSort;
  const selectedColor = initialColor;

  // Local state for price slider dragging
  const [sliderPrice, setSliderPrice] = useState<number>(initialMaxPrice);

  // Mobile drawer state: "filter" | "sort" | null
  const [mobileDrawerType, setMobileDrawerType] = useState<
    "filter" | "sort" | null
  >(null);

  // Lock body scroll when mobile bottom sheet is active
  useEffect(() => {
    if (mobileDrawerType !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerType]);

  // Accordion state: only one accordion open at a time
  const [openAccordion, setOpenAccordion] = useState<string | null>("price");

  const toggleAccordion = (key: string) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  // Helper to push updated search params to URL
  const pushFilters = (newParams: {
    sort?: string;
    color?: string;
    maxPrice?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    // Sort param
    const nextSort =
      newParams.sort !== undefined ? newParams.sort : selectedSort;
    if (nextSort && nextSort !== "featured") {
      params.set("sort", nextSort);
    } else {
      params.delete("sort");
    }

    // Color param
    const nextColor =
      newParams.color !== undefined ? newParams.color : selectedColor;
    if (nextColor && nextColor !== "All Colors") {
      params.set("color", nextColor);
    } else {
      params.delete("color");
    }

    // Max Price param
    const nextMaxPrice =
      newParams.maxPrice !== undefined ? newParams.maxPrice : sliderPrice;
    if (nextMaxPrice && nextMaxPrice < 300) {
      params.set("maxPrice", nextMaxPrice.toString());
    } else {
      params.delete("maxPrice");
    }

    const queryString = params.toString();
    startTransition(() => {
      router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, {
        scroll: false,
      });
    });
  };

  const handleSortChange = (newSort: string) => {
    pushFilters({ sort: newSort });
    setMobileDrawerType(null);
  };

  const handleColorSelect = (color: string) => {
    const next = selectedColor === color ? "All Colors" : color;
    pushFilters({ color: next });
  };

  const handlePriceChange = (price: number) => {
    setSliderPrice(price);
  };

  const handlePriceCommit = (price: number) => {
    pushFilters({ maxPrice: price });
  };

  const handleResetFilters = () => {
    setSliderPrice(300);
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
    setMobileDrawerType(null);
  };

  // Active filters count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedColor !== "All Colors") count++;
    if (initialMaxPrice < 300) count++;
    return count;
  }, [selectedColor, initialMaxPrice]);

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className="w-full bg-white min-h-screen pb-24 lg:pb-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto py-8 lg:py-16">
        {/* Header with Breadcrumb and Desktop Sort */}
        <CollectionHeader
          pageTitle={pageTitle}
          collectionSlug={collectionSlug}
          productCount={products.length}
          isPending={isPending}
          selectedSort={selectedSort}
          onSortChange={handleSortChange}
        />

        {/* Main Content: Desktop Accordion Sidebar & 4-Column Product Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          <CollectionFilterSidebar
            openAccordion={openAccordion}
            toggleAccordion={toggleAccordion}
            sliderPrice={sliderPrice}
            handlePriceChange={handlePriceChange}
            handlePriceCommit={handlePriceCommit}
            selectedColor={selectedColor}
            handleColorSelect={handleColorSelect}
            hasActiveFilters={hasActiveFilters}
            activeFilterCount={activeFilterCount}
            handleResetFilters={handleResetFilters}
          />

          <CollectionGrid
            products={products}
            isPending={isPending}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Mobile Drawer and Fixed Bottom Action Bar */}
      <CollectionMobileDrawer
        mobileDrawerType={mobileDrawerType}
        setMobileDrawerType={setMobileDrawerType}
        collectionSlug={collectionSlug}
        productCount={products.length}
        hasActiveFilters={hasActiveFilters}
        activeFilterCount={activeFilterCount}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
        openAccordion={openAccordion}
        toggleAccordion={toggleAccordion}
        sliderPrice={sliderPrice}
        onPriceChange={handlePriceChange}
        selectedColor={selectedColor}
        onColorSelect={handleColorSelect}
        onResetFilters={handleResetFilters}
        onApplyFilters={() => {
          pushFilters({
            maxPrice: sliderPrice,
            color: selectedColor,
          });
          setMobileDrawerType(null);
        }}
      />
    </div>
  );
}
