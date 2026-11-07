export interface WpPostListItem {
  title: string;
  excerpt: string;
  slug: string;
  published_date: string;
  featured_image: string;
  categories: string[];
  tags: string[];
  reading_time?: string;
}

export interface WpPostsPagination {
  total_posts: number;
  posts_per_page: number;
  total_pages: number;
  current_page: number;
}

export interface WpPostsResponse {
  data: WpPostListItem[];
  pagination: WpPostsPagination;
}

export interface WpPostDetail {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  published_date: string;
  featured_image: string;
  categories: string[];
  content: string;
  meta_fields?: unknown[];
  reading_time?: string;
}

export interface WpRelatedPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  published_date: string;
  featured_image: string;
}

export interface WpRelatedPostsResponse {
  posts: WpRelatedPost[];
}

export const WP_API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://wadibck.demotempwebsite.co.in/wp-json"
).replace(/\/+$/, "");
export const DEFAULT_BLOG_FALLBACK_IMAGE = "/categories/nida.jpg";

/**
 * Decode HTML entities like &amp;, &#8217;, &quot;, etc. returned by WordPress
 */
export function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ");
}

/**
 * Strip HTML tags and clean whitespace for excerpts
 */
export function cleanExcerpt(str: string, maxLength = 160): string {
  if (!str) return "";
  const decoded = decodeHtmlEntities(str);
  const stripped = decoded.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  if (stripped.length <= maxLength) return stripped;
  return stripped.slice(0, maxLength).trim() + "…";
}

/**
 * Format date string into human-readable date e.g. "Nov 7, 2026"
 */
export function formatBlogDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Fetch paginated posts from WordPress REST API (1 min revalidation)
 */
export async function getWpPosts(
  page = 1,
  perPage = 10,
): Promise<WpPostsResponse> {
  const url = `${WP_API_BASE}/custom/v1/posts?page=${page}&posts_per_page=${perPage}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`WordPress API returned ${res.status}`);
    }
    const data: WpPostsResponse = await res.json();
    return {
      data: Array.isArray(data?.data) ? data.data : [],
      pagination: data?.pagination || {
        total_posts: 0,
        posts_per_page: perPage,
        total_pages: 1,
        current_page: page,
      },
    };
  } catch (error) {
    console.error("Error fetching WP posts from:", url, error);
    return {
      data: [],
      pagination: {
        total_posts: 0,
        posts_per_page: perPage,
        total_pages: 1,
        current_page: page,
      },
    };
  }
}

/**
 * Fetch a single blog post detail by slug (1 min revalidation)
 */
export async function getWpPostBySlug(
  slug: string,
): Promise<WpPostDetail | null> {
  const url = `${WP_API_BASE}/custom/v1/post/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    if (!data || !data.slug) {
      return null;
    }
    return data as WpPostDetail;
  } catch (error) {
    console.error(`Error fetching WP post detail for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch related / latest posts excluding current post ID (1 min revalidation)
 */
export async function getWpRelatedPosts(
  excludeId: number,
): Promise<WpRelatedPost[]> {
  const url = `${WP_API_BASE}/sidebar/v1/latest-posts?exclude=${excludeId}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return [];
    }
    const data: WpRelatedPostsResponse = await res.json();
    return Array.isArray(data?.posts) ? data.posts : [];
  } catch (error) {
    console.error("Error fetching WP related posts:", error);
    return [];
  }
}

