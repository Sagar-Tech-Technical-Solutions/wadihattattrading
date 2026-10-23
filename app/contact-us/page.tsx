import { Metadata } from "next";
import ContactPageClient from "@/components/contact/contact-page-client";

export const metadata: Metadata = {
  title: "Contact Us & Dubai Store Locations | Wadi Hattat Trading",
  description:
    "Visit Wadi Hattat Trading stores in Deira and Bur Dubai or contact our textile specialists for luxury fabric sourcing, wholesale supply, and inquiries.",
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
