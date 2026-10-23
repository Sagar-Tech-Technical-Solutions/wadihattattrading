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
  title: "Wadi Hattat Trading",
  description: "Wadi Hattat Trading Co. L.L.C. - Dubai, UAE",
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
