import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../public/pp-fragment-webfont/style.css";
import "./globals.css";
import { Suspense } from "react";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import SmoothScroll from "@/layouts/smooth-scroll";
// import CustomCursor from "@/components/ui/custom-cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
    : undefined,
  title: {
    default: "Wadi Hattat Trading | Wholesale Textile Trading in Dubai",
    template: "%s | Wadi Hattat Trading",
  },
  description:
    "Wadi Hattat Trading is a premier textile trading house in Dubai. Sourcing authentic Japanese Nida, textured crepes, and luxury abaya fabrics across 4 Dubai showrooms and global wholesale distribution.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "Wadi Hattat Trading",
    title: "Wadi Hattat Trading | Wholesale Textile Trading in Dubai",
    description:
      "Premier textile trading company in Dubai. Sourcing authentic Japanese Nida, textured crepes, and luxury abaya fabrics.",
    images: [
      {
        url: "/Wadi Hattat Textile Storefront.webp",
        width: 1200,
        height: 630,
        alt: "Wadi Hattat Trading Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wadi Hattat Trading | Wholesale Textile Trading in Dubai",
    description:
      "Premier textile trading company in Dubai. Japanese Nida, crepes, and luxury abaya fabrics.",
    images: ["/Wadi Hattat Textile Storefront.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/icon0.svg", type: "image/svg+xml" },
      { url: "/favicon/icon1.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/manifest.json",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${inter.className}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {/* <CustomCursor /> */}
        <SmoothScroll>
          <Suspense fallback={<div className="h-16 w-full" />}>
            <Header />
          </Suspense>
          <div className="flex-1">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
