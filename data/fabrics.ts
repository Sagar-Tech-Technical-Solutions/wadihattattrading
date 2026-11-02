export interface Fabric {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const fabrics: Fabric[] = [
  {
    id: 1,
    name: "Satin",
    description:
      "Lustrous, fluid drape with a smooth glossy finish, ideal for luxury evening wear, bridal linings, elegant abayas, and opulent modest silhouettes.",
    image: "/fabrics/satin.jpg",
  },
  {
    id: 2,
    name: "Silk",
    description:
      "Pure, breathable natural opulence featuring an ultra-soft hand feel, refined sheen, and graceful movement for couture garments and bespoke designs.",
    image: "/fabrics/silk.jpg",
  },
  {
    id: 3,
    name: "Jersey",
    description:
      "Ultra-comfortable stretch knit fabric with exceptional drape, wrinkle resistance, and softness for effortless daily modest wear and co-ords.",
    image: "/fabrics/jersey.jpg",
  },
  {
    id: 4,
    name: "Jacquard",
    description:
      "Intricately woven raised patterns with rich textural depth and regal structure, crafted for festive attire, statement kaftans, and luxury outerwear.",
    image: "/fabrics/jacquard.jpg",
  },
  {
    id: 5,
    name: "Lace",
    description:
      "Delicate openwork motifs and scalloped borders offering sheer elegance, romantic flair, and exquisite overlay accents for couture creations.",
    image: "/fabrics/lace.jpg",
  },
  {
    id: 6,
    name: "Velvet",
    description:
      "Sumptuous plush pile with radiant depth of tone and warm tactile richness, perfect for festive winter collections, formal cloaks, and luxury abayas.",
    image: "/fabrics/velvet.jpg",
  },
  {
    id: 7,
    name: "Embroidery",
    description:
      "Artisanal threadwork and intricate ornamental detailing designed to elevate classic textiles into heirloom-worthy modest masterpieces.",
    image: "/fabrics/embroidery.jpg",
  },
  {
    id: 8,
    name: "Crystal Handwork",
    description:
      "Hand-embellished crystal stones and beadwork creating captivating shimmer and celestial brilliance for bridal, gala, and celebratory ensembles.",
    image: "/fabrics/crystal-handwork.jpg",
  },
  {
    id: 9,
    name: "Other Fabrics",
    description:
      "Visit our store for more options of fabrics that are new updated collections with different qualities, colors, and designs.",
    image: "/fabrics/other-fabrics.jpg",
  },
];
