import { Metadata } from "next";
import ContactPageClient from "@/components/contact/contact-page-client";

export const metadata: Metadata = {
  title: "Contact Us & Dubai Store Locations",
  description:
    "Visit Wadi Hattat Trading stores in Deira and Bur Dubai or contact our textile specialists for luxury fabric sourcing, wholesale supply, and inquiries.",
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Contact Us & Dubai Store Locations | Wadi Hattat Trading",
    description:
      "Visit our 4 showrooms across Deira and Bur Dubai or contact our wholesale trade team.",
    url: "/contact-us",
    images: [
      {
        url: "/purplefabric.webp",
        width: 1200,
        height: 630,
        alt: "Contact Wadi Hattat Trading",
      },
    ],
  },
  keywords: [
    "Wadi Hattat Trading contact",
    "fabric stores Dubai",
    "textile wholesale Deira",
    "Bur Dubai fabric shop",
    "Al Sabkha textile",
    "Al Fahidi fabrics",
  ],
};

export default function ContactUsPage() {
  return <ContactPageClient />;
}
