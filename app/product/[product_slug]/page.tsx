import type { Metadata } from "next";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { product_slug } = await params;
  const product = getProductBySlug(product_slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: `${product.name} - ${product.description}. Premium luxury fabric sourced and supplied by Wadi Hattat Trading, Dubai.`,
    alternates: {
      canonical: `/product/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Wadi Hattat Trading`,
      description: product.description,
      url: `/product/${product.slug}`,
      images: [
        {
          url: product.imagePrimary,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { product_slug } = await params;
  const product = getProductBySlug(product_slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
