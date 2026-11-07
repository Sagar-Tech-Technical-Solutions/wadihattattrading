import type { MetadataRoute } from "next";
import { getWpPosts } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://wadihattattrading.com";
  const now = new Date();

  // Core static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/fabrics`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic blog post routes from WordPress API
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: posts } = await getWpPosts(1, 100);
    if (Array.isArray(posts) && posts.length > 0) {
      blogRoutes = posts.flatMap((post) => {
        const lastMod = post.published_date
          ? new Date(post.published_date)
          : now;
        return [
          {
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: lastMod,
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
          {
            url: `${baseUrl}/blogs/${post.slug}`,
            lastModified: lastMod,
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
        ];
      });
    }
  } catch (error) {
    console.error("Error generating blog sitemap entries:", error);
  }

  return [...staticRoutes, ...blogRoutes];
}
