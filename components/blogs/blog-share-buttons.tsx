"use client";

import React, { useState } from "react";

interface BlogShareButtonsProps {
  title: string;
  slug: string;
}

export default function BlogShareButtons({ title, slug }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return `https://wadihattattrading.com/blog/${slug}`;
  };

  const handleCopy = () => {
    const url = getUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const shareText = encodeURIComponent(`${title} — Wadi Hattat Trading Dubai`);
  const shareUrl = encodeURIComponent(`https://wadihattattrading.com/blog/${slug}`);

  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono hidden sm:inline-block mr-1">
        Share:
      </span>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="w-8 h-8 rounded-full border border-neutral-200 hover:border-[#25D366] hover:bg-[#25D366] text-neutral-700 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs cursor-pointer"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.057-1.111-.073-.252-.08-.574-.187-.98-.364-1.728-.751-2.857-2.51-2.944-2.625-.087-.115-.705-.939-.705-1.791 0-.852.448-1.27.608-1.442.16-.172.35-.215.467-.215.117 0 .234.001.336.006.107.005.25-.041.391.298.144.348.491 1.2.535 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.174.232-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.572 4.186 1.572 5.941l-1.668 6.096 6.277-1.644c1.706.929 3.652 1.455 5.723 1.455 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 21.848c-1.897 0-3.664-.537-5.166-1.464l-.37-.229-3.714.974.991-3.619-.25-.398c-1.026-1.636-1.571-3.535-1.571-5.503 0-5.438 4.422-9.86 9.864-9.86 5.441 0 9.864 4.422 9.864 9.86 0 5.439-4.423 9.861-9.864 9.861z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-8 h-8 rounded-full border border-neutral-200 hover:border-[#0077b5] hover:bg-[#0077b5] text-neutral-700 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs cursor-pointer"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
        </svg>
      </a>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="w-8 h-8 rounded-full border border-neutral-200 hover:border-black hover:bg-black text-neutral-700 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs cursor-pointer"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy article link"
        className="relative px-3 py-1.5 rounded-full border border-neutral-200 hover:border-neutral-900 text-xs font-mono text-neutral-700 hover:text-neutral-950 transition-all duration-200 flex items-center gap-1.5 shadow-2xs cursor-pointer"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
          />
        </svg>
        <span>{copied ? "Copied!" : "Copy"}</span>
      </button>
    </div>
  );
}

