"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  WpPostListItem,
  WP_API_BASE,
  decodeHtmlEntities,
  cleanExcerpt,
  formatBlogDate,
  DEFAULT_BLOG_FALLBACK_IMAGE,
} from "@/lib/wordpress";

export default function BlogSection() {
  const [posts, setPosts] = useState<WpPostListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchLatestPosts() {
      try {
        const url = `${WP_API_BASE}/custom/v1/posts?page=1&posts_per_page=3`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (isMounted) {
          const list = Array.isArray(data?.data) ? data.data : [];
          setPosts(list.slice(0, 3));
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Client fetch error in BlogSection:", err);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchLatestPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isLoading && posts.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#faf8f5] py-16 sm:py-20 lg:py-24 px-4 md:px-8 lg:px-16 border-t border-neutral-200/70">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-[0.22em] text-[#ddaf4d] font-semibold mb-2">
              JOURNAL
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-neutral-900 tracking-tight">
              Latest Insights &amp; Articles
            </h2>
          </div>

          <Link
            href="/blogs"
            className="text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-[#ddaf4d] transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>View All</span>
            <span>→</span>
          </Link>
        </div>

        {/* Client-Side Cards with Skeleton Loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col animate-pulse">
                <div className="aspect-[16/10] w-full rounded-xl bg-neutral-200/80 mb-5" />
                <div className="h-3 w-28 bg-neutral-200 rounded mb-3" />
                <div className="h-5 w-4/5 bg-neutral-200 rounded mb-2" />
                <div className="h-4 w-full bg-neutral-200 rounded mb-4" />
                <div className="h-3 w-24 bg-neutral-200 rounded mt-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const imageSrc = post.featured_image || DEFAULT_BLOG_FALLBACK_IMAGE;
              const displayTitle = decodeHtmlEntities(post.title);
              const displayExcerpt = cleanExcerpt(post.excerpt);
              const dateStr = formatBlogDate(post.published_date);

              return (
                <article key={post.slug} className="group flex flex-col">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-100 mb-5 block"
                  >
                    <Image
                      src={imageSrc}
                      alt={displayTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex items-center gap-2 text-xs text-neutral-400 tracking-wide mb-2">
                    {dateStr && (
                      <time dateTime={post.published_date}>{dateStr}</time>
                    )}
                    {dateStr && post.reading_time && <span>•</span>}
                    {post.reading_time && <span>{post.reading_time}</span>}
                  </div>

                  <h3 className="text-lg sm:text-xl font-normal text-neutral-900 group-hover:text-[#ddaf4d] transition-colors leading-snug mb-2 line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{displayTitle}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed line-clamp-2 mb-4">
                    {displayExcerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto text-xs uppercase tracking-wider font-semibold text-neutral-900 group-hover:text-[#ddaf4d] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
