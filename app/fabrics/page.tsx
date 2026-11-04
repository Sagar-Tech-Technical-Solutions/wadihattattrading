import React from "react";
import type { Metadata } from "next";
import FabricsClient from "@/components/fabrics/fabrics-client";
import StoresSection from "@/components/common/stores-section";

export const metadata: Metadata = {
  title: "Fabrics Collection | Wadi Hattat Trading Dubai",
  description:
    "Explore our complete range of wholesale fabrics in Dubai: NIDA, Crepe, Sheila, Chiffon, Organza, Satin, Silk, Jersey, Jacquard, Lace, Velvet, Embroidery, Crystal Handwork, Kandura, and specialized textiles.",
  alternates: {
    canonical: "/fabrics",
  },
  openGraph: {
    title: "Fabrics Collection | Wadi Hattat Trading Dubai",
    description:
      "Explore Dubai's premier wholesale fabric selection: NIDA, Crepe, Sheila, Chiffon, Organza, Satin, Silk, Jersey, Jacquard, Lace, Velvet, Embroidery, Crystal Handwork, and Kandura.",
    url: "/fabrics",
    images: [
      {
        url: "/categories/nida.jpg",
        width: 1200,
        height: 630,
        alt: "Wadi Hattat Trading Fabrics Collection",
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
