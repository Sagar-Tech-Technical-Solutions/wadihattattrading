import React from "react";
import type { Metadata } from "next";
import FabricsClient from "@/components/fabrics/fabrics-client";
import StoresSection from "@/components/common/stores-section";

export const metadata: Metadata = {
  title: "Fabrics Collection | Wadi Hattat Trading Dubai",
  description:
    "Explore our complete range of wholesale fabrics in Dubai: Satin, Silk, Jersey, Jacquard, Lace, Velvet, Embroidery, and Crystal Handwork textiles.",
  alternates: {
    canonical: "/fabrics",
  },
  openGraph: {
    title: "Fabrics Collection | Wadi Hattat Trading Dubai",
    description:
      "Explore Dubai's premier wholesale fabric selection. Sourcing authentic satins, silks, knits, jacquards, and couture embellishments.",
    url: "/fabrics",
    images: [
      {
        url: "/fabrics/satin.jpg",
        width: 1200,
        height: 630,
        alt: "Wadi Hattat Trading Fabrics",
      },
    ],
  },
};

export default function FabricsPage() {
  return (
    <main className="relative">
      <FabricsClient />
    </main>
  );
}
