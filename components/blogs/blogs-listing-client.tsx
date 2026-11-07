"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getAllBlogs } from "@/data/blogs";

const POSTS_PER_PAGE = 6;

export default function BlogsListingClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allBlogs = useMemo(() => getAllBlogs(), []);
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(
    isNaN(initialPage) ? 1 : initialPage,
  );

  useEffect(() => {
    const pg = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(isNaN(pg) ? 1 : pg);
  }, [searchParams]);

  const totalPosts = allBlogs.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedBlogs = useMemo(() => {
    const start = (validCurrentPage - 1) * POSTS_PER_PAGE;
    return allBlogs.slice(start, start + POSTS_PER_PAGE);
  }, [allBlogs, validCurrentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newUrl, { scroll: false });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {paginatedBlogs.map((post) => (
          <article key={post.slug} className="group flex flex-col">
            <Link
              href={`/blog/${post.slug}`}
              className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-100 mb-5 block"
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </Link>

            <div className="text-xs text-neutral-400 mb-2">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>

            <h2 className="text-lg sm:text-xl font-normal text-neutral-900 group-hover:text-[#ddaf4d] transition-colors leading-snug mb-2 line-clamp-2">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            <p className="text-xs sm:text-[13px] text-neutral-600 font-light leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
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
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-14 pt-8 border-t border-neutral-200/80 flex items-center justify-center gap-2"
        >
          <button
            type="button"
            onClick={() => handlePageChange(validCurrentPage - 1)}
            disabled={validCurrentPage === 1}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
              validCurrentPage === 1
                ? "text-neutral-300 pointer-events-none"
                : "text-neutral-700 hover:text-neutral-950 cursor-pointer"
            }`}
          >
            ← Prev
          </button>

          <div className="flex items-center gap-1 px-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => {
                const isActive = pageNum === validCurrentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-full text-xs font-mono transition-colors flex items-center justify-center cursor-pointer ${
                      isActive
                        ? "bg-neutral-900 text-white font-medium"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              },
            )}
          </div>

          <button
            type="button"
            onClick={() => handlePageChange(validCurrentPage + 1)}
            disabled={validCurrentPage === totalPages}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
              validCurrentPage === totalPages
                ? "text-neutral-300 pointer-events-none"
                : "text-neutral-700 hover:text-neutral-950 cursor-pointer"
            }`}
          >
            Next →
          </button>
        </nav>
      )}
    </div>
  );
}
