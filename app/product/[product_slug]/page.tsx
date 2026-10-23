import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import ProductDetailClient from "@/components/product/product-detail-client";

export const instant = false;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    product_slug: product.slug,
  }));
}

interface PageProps {
  params: Promise<{ product_slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { product_slug } = await params;
  const product = getProductBySlug(product_slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
