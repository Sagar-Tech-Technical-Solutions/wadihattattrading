import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/layouts/header";
import SmoothScroll from "@/components/smooth-scroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const headingFont = localFont({
  src: "../public/font/sizmo.woff2",
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wadi Hallat Trading",
  description: "Wadi Hallat Trading",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${headingFont.variable}`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
