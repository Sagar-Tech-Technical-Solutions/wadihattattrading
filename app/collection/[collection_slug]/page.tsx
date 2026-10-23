import { getCategoryBySlug, getCategoryProducts, CATEGORIES } from "@/data/products";
import CollectionClient from "@/components/collection/collection-client";

export const instant = false;

export function generateStaticParams() {
  return [
    { collection_slug: "all" },
    ...CATEGORIES.map((cat) => ({ collection_slug: cat.slug })),
  ];
}

interface PageProps {
  params: Promise<{ collection_slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Server-Side Collection Page:
 * - Reads `params` (collection slug) and `searchParams` (sort, color, maxPrice) on the server.
 * - Resolves linked category directly via getCategoryBySlug & getCategoryProducts.
 * - Ready for seamless backend API integration.
 */
export default async function CollectionPage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const currentSlug = resolvedParams.collection_slug?.toLowerCase() || "all";
  const matchedCategory = getCategoryBySlug(currentSlug);

  // Extract query filters from searchParams
  const sortParam =
    typeof resolvedSearchParams.sort === "string"
      ? resolvedSearchParams.sort
      : "featured";

  const colorParam =
    typeof resolvedSearchParams.color === "string"
      ? resolvedSearchParams.color
      : "All Colors";

  const maxPriceParam =
    typeof resolvedSearchParams.maxPrice === "string"
      ? Number(resolvedSearchParams.maxPrice) || 300
      : 300;

  // 1. Strict Server-Side Collection Filtering using linked Category model
  // /collection/crepe -> only Crepe products
  // /collection/nida -> only Nida products
  // /collection/all -> all products
  const collectionProducts = getCategoryProducts(currentSlug);

  // 2. Server-Side Secondary Filtering (Color & Price)
  const filteredProducts = collectionProducts
    .filter((item) => {
      // Color filter
      if (colorParam && colorParam !== "All Colors") {
        const matchesColor = item.colors.some((c) =>
          c.toLowerCase().includes(colorParam.toLowerCase())
        );
        if (!matchesColor) return false;
      }

      // Max price filter
      if (item.priceAED > maxPriceParam) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortParam === "price-asc") return a.priceAED - b.priceAED;
      if (sortParam === "price-desc") return b.priceAED - a.priceAED;
      return 0; // Default: featured
    });

  // Formatted title linked directly to Category definition
  const pageTitle =
    currentSlug === "all"
      ? "All Fabrics Collection"
      : matchedCategory?.collectionTitle ||
        `${currentSlug.charAt(0).toUpperCase() + currentSlug.slice(1).replace(/-/g, " ")} Collection`;

  return (
    <CollectionClient
      products={filteredProducts}
      collectionSlug={currentSlug}
      pageTitle={pageTitle}
      initialSort={sortParam}
      initialColor={colorParam}
      initialMaxPrice={maxPriceParam}
    />
  );
}
