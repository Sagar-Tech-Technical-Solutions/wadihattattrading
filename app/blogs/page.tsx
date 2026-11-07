import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import BlogsListingView from "@/components/blogs/blogs-listing-view";
import { getWpPosts } from "@/lib/wordpress";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blogs & Textile Journal | Wadi Hattat Trading Dubai",
  description:
    "Guides on authentic Japanese Nida, fabric sourcing in Deira & Bur Dubai, and textile care.",
  alternates: {
    canonical: "/blogs",
  },
};

type BlogsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params?.page || "1", 10) || 1);
  const postsPerPage = 9;
  const { data: posts, pagination } = await getWpPosts(
    currentPage,
    postsPerPage,
  );

  return (
    <main className="w-full bg-white min-h-screen py-10 sm:py-14 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Simple Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-neutral-400 font-mono mb-8"
        >
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-neutral-800">Blogs</span>
        </nav>

        {/* Clean Minimal Header */}
        <div className="mb-10 max-w-2xl">
          <span className="block text-[11px] font-mono uppercase tracking-[0.22em] text-[#ddaf4d] font-semibold mb-2">
            JOURNAL
          </span>
          <h1 className="text-3xl sm:text-4xl font-light text-neutral-900 tracking-tight leading-tight">
            Textile Insights &amp; Articles
          </h1>
          <p className="mt-2 text-neutral-500 text-sm font-light leading-relaxed">
            Guides on authentic fabrics, wholesale sourcing in Dubai, and care
            rituals.
          </p>
        </div>

        {/* Listing with Server Data & Real Pagination */}
        <Suspense
          fallback={
            <div className="py-20 text-center">
              <div className="w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs text-neutral-400 font-mono">
                Loading articles...
              </p>
            </div>
          }
        >
          <BlogsListingView
            posts={posts}
            pagination={pagination}
            currentPage={currentPage}
          />
        </Suspense>
      </div>
    </main>
  );
}
