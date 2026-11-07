import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getWpPosts,
  getWpPostBySlug,
  getWpRelatedPosts,
  decodeHtmlEntities,
  cleanExcerpt,
  formatBlogDate,
  DEFAULT_BLOG_FALLBACK_IMAGE,
} from "@/lib/wordpress";
import BlogShareButtons from "@/components/blogs/blog-share-buttons";

export const revalidate = 60;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const { data: posts } = await getWpPosts(1, 10);
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getWpPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Wadi Hattat Trading",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://wadihattattrading.com";
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  const displayTitle = decodeHtmlEntities(post.title);
  const displayExcerpt = cleanExcerpt(post.excerpt);

  return {
    title: `${displayTitle} | Wadi Hattat Trading Dubai`,
    description: displayExcerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: displayTitle,
      description: displayExcerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.published_date,
      images: post.featured_image
        ? [
            {
              url: post.featured_image,
              width: 1200,
              height: 630,
              alt: displayTitle,
            },
          ]
        : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getWpPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts from sidebar API, excluding current post ID
  const relatedPosts = await getWpRelatedPosts(post.id);

  const displayTitle = decodeHtmlEntities(post.title);
  const displayExcerpt = cleanExcerpt(post.excerpt);
  const dateStr = formatBlogDate(post.published_date);

  return (
    <article className="w-full bg-white min-h-screen py-10 sm:py-14 px-4 md:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-neutral-400 font-mono mb-8"
        >
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/blogs"
            className="hover:text-neutral-900 transition-colors"
          >
            Blogs
          </Link>
          <span>/</span>
          <span className="text-neutral-800 line-clamp-1 max-w-[240px] sm:max-w-md">
            {displayTitle}
          </span>
        </nav>

        {/* Article Header */}
        <header className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono mb-3">
            {dateStr && <time dateTime={post.published_date}>{dateStr}</time>}
            {dateStr && post.reading_time && <span>•</span>}
            {post.reading_time && <span>{post.reading_time}</span>}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 tracking-tight leading-[1.2] mb-4">
            {displayTitle}
          </h1>

          {displayExcerpt && (
            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
              {displayExcerpt}
            </p>
          )}
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-100 mb-10 sm:mb-12 shadow-sm">
            <Image
              src={post.featured_image}
              alt={displayTitle}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover object-center"
            />
          </div>
        )}

        {/* Rich Text WordPress Content (Styled with .blog-prose) */}
        <div
          className="blog-prose pb-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer with Share */}
        <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/blogs"
            className="text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-[#ddaf4d] transition-colors"
          >
            ← Back to All Articles
          </Link>

          <BlogShareButtons title={displayTitle} slug={post.slug} />
        </div>

        {/* Related Articles (Powered by sidebar latest-posts API) */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-neutral-200">
            <h2 className="text-xl sm:text-2xl font-light text-neutral-900 mb-6">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.slice(0, 2).map((item) => {
                const relImg =
                  item.featured_image || DEFAULT_BLOG_FALLBACK_IMAGE;
                const relTitle = decodeHtmlEntities(item.title);
                const relExcerpt = cleanExcerpt(item.excerpt, 120);
                const relDate = formatBlogDate(item.published_date);

                return (
                  <article key={item.id} className="group flex flex-col">
                    <Link
                      href={`/blog/${item.slug}`}
                      className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-100 mb-3 block"
                    >
                      <Image
                        src={relImg}
                        alt={relTitle}
                        fill
                        sizes="(max-width: 640px) 100vw, 500px"
                        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </Link>

                    {relDate && (
                      <div className="text-[11px] text-neutral-400 font-mono mb-1">
                        <time dateTime={item.published_date}>{relDate}</time>
                      </div>
                    )}

                    <h3 className="text-base font-normal text-neutral-900 group-hover:text-[#ddaf4d] transition-colors leading-snug line-clamp-2 mb-1.5">
                      <Link href={`/blog/${item.slug}`}>{relTitle}</Link>
                    </h3>

                    {relExcerpt && (
                      <p className="text-xs text-neutral-600 font-light leading-relaxed line-clamp-2">
                        {relExcerpt}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
