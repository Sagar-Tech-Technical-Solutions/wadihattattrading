import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  WpPostListItem,
  WpPostsPagination,
  decodeHtmlEntities,
  cleanExcerpt,
  formatBlogDate,
  DEFAULT_BLOG_FALLBACK_IMAGE,
} from "@/lib/wordpress";

interface BlogsListingViewProps {
  posts: WpPostListItem[];
  pagination: WpPostsPagination;
  currentPage: number;
}

export default function BlogsListingView({
  posts,
  pagination,
  currentPage,
}: BlogsListingViewProps) {
  const totalPages = Math.max(1, pagination.total_pages || 1);

  if (!posts || posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-neutral-500 font-light text-sm">
          No articles published yet. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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

              <div className="text-xs text-neutral-400 mb-2 flex items-center gap-2">
                {dateStr && <time dateTime={post.published_date}>{dateStr}</time>}
                {dateStr && post.reading_time && <span>•</span>}
                {post.reading_time && <span>{post.reading_time}</span>}
              </div>

              <h2 className="text-lg sm:text-xl font-normal text-neutral-900 group-hover:text-[#ddaf4d] transition-colors leading-snug mb-2 line-clamp-2">
                <Link href={`/blog/${post.slug}`}>{displayTitle}</Link>
              </h2>

              <p className="text-xs sm:text-[13px] text-neutral-600 font-light leading-relaxed line-clamp-2 mb-4">
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-14 pt-8 border-t border-neutral-200/80 flex items-center justify-center gap-2"
        >
          {/* Previous Page Link */}
          {currentPage > 1 ? (
            <Link
              href={currentPage === 2 ? "/blogs" : `/blogs?page=${currentPage - 1}`}
              className="px-3 py-1.5 text-xs uppercase tracking-wider text-neutral-700 hover:text-neutral-950 transition-colors"
            >
              ← Prev
            </Link>
          ) : (
            <span className="px-3 py-1.5 text-xs uppercase tracking-wider text-neutral-300 pointer-events-none">
              ← Prev
            </span>
          )}

          {/* Numbered Page Links */}
          <div className="flex items-center gap-1 px-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = pageNum === currentPage;
              const pageHref = pageNum === 1 ? "/blogs" : `/blogs?page=${pageNum}`;

              return (
                <Link
                  key={pageNum}
                  href={pageHref}
                  className={`w-8 h-8 rounded-full text-xs font-mono transition-colors flex items-center justify-center ${
                    isActive
                      ? "bg-neutral-900 text-white font-medium pointer-events-none"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}
          </div>

          {/* Next Page Link */}
          {currentPage < totalPages ? (
            <Link
              href={`/blogs?page=${currentPage + 1}`}
              className="px-3 py-1.5 text-xs uppercase tracking-wider text-neutral-700 hover:text-neutral-950 transition-colors"
            >
              Next →
            </Link>
          ) : (
            <span className="px-3 py-1.5 text-xs uppercase tracking-wider text-neutral-300 pointer-events-none">
              Next →
            </span>
          )}
        </nav>
      )}
    </div>
  );
}

