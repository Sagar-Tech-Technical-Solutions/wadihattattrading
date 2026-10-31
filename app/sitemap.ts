import type { MetadataRoute } from "next";
import { CATEGORIES, PRODUCTS } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const now = new Date();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/collection/all`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Collection category routes
  // const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
  //   url: `${baseUrl}/collection/${cat.slug}`,
  //   lastModified: now,
  //   changeFrequency: "weekly",
  //   priority: 0.85,
  // }));

  // Product detail routes
  // const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((prod) => ({
  //   url: `${baseUrl}/product/${prod.slug}`,
  //   lastModified: now,
  //   changeFrequency: "weekly",
  //   priority: 0.7,
  // }));

  return [...staticRoutes];
}
