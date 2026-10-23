export interface Category {
  id: string;
  slug: string;
  name: string;
  collectionTitle: string;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string; // Foreign key linking directly to Category.id
  category: string;
  categorySlug: string;
  priceAED: number;
  unit: string;
  imagePrimary: string;
  imageHover: string;
  description: string;
  colors: string[];
  specs: {
    composition: string;
    width: string;
    weight: string;
    feel: string;
    origin: string;
    bestFor: string;
  };
  isFeatured?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: "nida",
    slug: "nida",
    name: "Nida",
    collectionTitle: "Nida",
    image: "/categories/nida.jpg",
    description:
      "Signature ultra-soft Emirati abaya silk offering an exquisite, fluid matte drape.",
  },
  {
    id: "crepe",
    slug: "crepe",
    name: "Crepe",
    collectionTitle: "Crepe",
    image: "/categories/crepe.jpg",
    description:
      "Fine-pebbled, satin-backed, and heavy moss weaves crafted for contemporary modest attire.",
  },
  {
    id: "organza",
    slug: "organza",
    name: "Organza",
    collectionTitle: "Organza",
    image: "/categories/organza.jpg",
    description:
      "Crisp, ethereal sheer textiles with glass-like luster and structured volume.",
  },
  {
    id: "sheila",
    slug: "sheila",
    name: "Sheila",
    collectionTitle: "Sheila",
    image: "/categories/sheila.jpg",
    description:
      "Featherlight, breathable scarf textiles with gentle grip for effortless styling.",
  },
  {
    id: "hi-multi-chiffon",
    slug: "hi-multi-chiffon",
    name: "Hi Multi Chiffon",
    collectionTitle: "Hi Multi Chiffon",
    image: "/categories/hi-multi-chiffon.jpg",
    description:
      "High-filament chiffon with floaty, whispering-soft layers and delicate fluid movement.",
  },
  {
    id: "wool-chiffon",
    slug: "wool-chiffon",
    name: "Wool Chiffon",
    collectionTitle: "Wool Chiffon",
    image: "/categories/wool-chiffon.jpg",
    description:
      "Tactile thermal warmth fused with airy semi-sheer porosity for cooler weather silhouettes.",
  },
  {
    id: "kandura",
    slug: "kandura",
    name: "Kandura",
    collectionTitle: "Kandura",
    image: "/categories/kandura.jpg",
    description:
      "Crisp, cooling, wrinkle-resistant traditional Emirati thobe fabrics with subtle satin sheen.",
  },
];

export const PRODUCTS: Product[] = [
  // --- NIDA FABRICS ---
  {
    id: "lai-0100",
    slug: "classic-nida-crepe-black",
    name: "Classic Nida Crepe Black",
    categoryId: "nida",
    category: "Nida",
    categorySlug: "nida",
    priceAED: 145,
    unit: "per meter",
    imagePrimary: "/products/product-1-a.jpg",
    imageHover: "/products/product-1-b.jpg",
    description:
      "A quintessential signature Emirati abaya fabric featuring a balanced matte drape, ultra-smooth tactile touch, and rich jet-black color depth.",
    colors: ["Jet Black", "Midnight Blue"],
    specs: {
      composition: "100% Spun Poly-Silk",
      width: "58 / 60 Inches",
      weight: "165 GSM",
      feel: "Ultra-Soft & Fluid",
      origin: "Japan / UAE Sourced",
      bestFor: "Luxury Abayas, Kimonos, Daily Modest Wear",
    },
    isFeatured: true,
  },
  {
    id: "nida-midnight",
    slug: "imperial-midnight-nida",
    name: "Imperial Midnight Nida",
    categoryId: "nida",
    category: "Nida",
    categorySlug: "nida",
    priceAED: 155,
    unit: "per meter",
    imagePrimary:
      "https://lailtextiles.com/wp-content/uploads/2025/12/LAI01-0010_1-1.jpg",
    imageHover: "/products/product-1-b.jpg",
    description:
      "Exclusive deep midnight indigo Nida silk with liquid-like drape and subtle gloss for grand evening occasions.",
    colors: ["Midnight Blue", "Jet Black"],
    specs: {
      composition: "100% Premium Nida Silk",
      width: "60 Inches",
      weight: "170 GSM",
      feel: "Silky, Heavy Drape",
      origin: "Japan / UAE Sourced",
      bestFor: "Occasion Abayas, Evening Capes",
    },
    isFeatured: true,
  },
  {
    id: "nida-royal-korean",
    slug: "royal-korean-nida-crepe",
    name: "Royal Korean Nida Crepe",
    categoryId: "nida",
    category: "Nida",
    categorySlug: "nida",
    priceAED: 165,
    unit: "per meter",
    imagePrimary:
      "https://lailtextiles.com/wp-content/uploads/2025/12/LAI01-0007_1-1.jpg",
    imageHover: "/products/product-1-b.jpg",
    description:
      "Ultra-fine Korean milled Nida with exceptional opacity, feather-soft cool touch, and rich saturated black pigment.",
    colors: ["Jet Black", "Midnight Blue"],
    specs: {
      composition: "100% Micro-Filament Silk Poly",
      width: "60 Inches",
      weight: "160 GSM",
      feel: "Silky, Crisp Hand, Cool Touch",
      origin: "South Korea",
      bestFor: "Haute Modest Couture, Classic Black Abayas",
    },
    isFeatured: true,
  },
  {
    id: "nida-feather-matte",
    slug: "featherlight-matte-nida",
    name: "Featherlight Matte Nida",
    categoryId: "nida",
    category: "Nida",
    categorySlug: "nida",
    priceAED: 135,
    unit: "per meter",
    imagePrimary:
      "https://lailtextiles.com/wp-content/uploads/2025/12/LAI01-0004_1-1.jpg",
    imageHover: "/products/product-1-b.jpg",
    description:
      "Designed for warm Gulf climates, offering featherlight airflow, complete non-transparency, and zero static cling.",
    colors: ["Jet Black", "Dune Beige"],
    specs: {
      composition: "100% Breathable Poly-Silk",
      width: "58 Inches",
      weight: "140 GSM",
      feel: "Ultra-Lightweight & Breathable",
      origin: "Japan / UAE Sourced",
      bestFor: "Daily Summer Abayas, Minimalist Kimonos",
    },
    isFeatured: true,
  },

  // --- CREPE FABRICS ---
  {
    id: "crepe-dune",
    slug: "textured-dune-crepe",
    name: "Textured Dune Crepe",
    categoryId: "crepe",
    category: "Crepe",
    categorySlug: "crepe",
    priceAED: 130,
    unit: "per meter",
    imagePrimary:
      "https://lailtextiles.com/wp-content/uploads/2025/12/LAI01-0008_1-1.jpg",
    imageHover: "/products/product-1-b.jpg",
    description:
      "Distinctive fine-pebbled texture with a sophisticated matte finish, breathability, and natural bounce for contemporary modest attire.",
    colors: ["Dune Beige", "Desert Sand", "Taupe"],
    specs: {
      composition: "98% Poly, 2% Spandex",
      width: "58 Inches",
      weight: "180 GSM",
      feel: "Textured & Breathable",
      origin: "South Korea",
      bestFor: "Dresses, Co-ords, Modest Trench Coats",
    },
    isFeatured: true,
  },
  {
    id: "crepe-satin-back",
    slug: "royal-satin-back-crepe",
    name: "Royal Satin-Back Crepe",
    categoryId: "crepe",
    category: "Crepe",
    categorySlug: "crepe",
    priceAED: 165,
    unit: "per meter",
    imagePrimary:
      "https://lailtextiles.com/wp-content/uploads/2025/12/LAI01-0007_1-1.jpg",
    imageHover: "/products/product-1-b.jpg",
    description:
      "Dual-sided luxury textile with a lustrous smooth satin inner face and a richly textured crepe exterior.",
    colors: ["Jet Black", "Champagne Ivory"],
    specs: {
      composition: "100% High-Filament Polyester",
      width: "58 Inches",
      weight: "210 GSM",
      feel: "Substantial, Fluid & Silky Interior",
      origin: "Japan / UAE Sourced",
      bestFor: "Couture Abayas, Evening Ensembles, Tailored Blazers",
    },
    isFeatured: true,
  },
  {
    id: "crepe-moss-emirati",
    slug: "emirati-heavy-moss-crepe",
    name: "Emirati Heavy Moss Crepe",
    categoryId: "crepe",
    category: "Crepe",
    categorySlug: "crepe",
    priceAED: 140,
    unit: "per meter",
    imagePrimary: "/products/product-1-a.jpg",
    imageHover: "/products/product-1-b.jpg",
    description:
      "Full-bodied moss crepe with an elegant non-cling drape, granular hand-feel, and deep color saturation.",
    colors: ["Midnight Blue", "Warm Camel", "Jet Black"],
    specs: {
      composition: "100% Spun Crepe Poly",
      width: "60 Inches",
      weight: "195 GSM",
      feel: "Heavy Drape, Matte Granular",
      origin: "South Korea",
      bestFor: "Luxury Everyday Abayas, Modest Jumpsuits",
    },
    isFeatured: true,
  },
  {
    id: "crepe-artisan-crinkle",
    slug: "artisan-crinkle-crepe",
    name: "Artisan Crinkle Crepe",
    categoryId: "crepe",
    category: "Crepe",
    categorySlug: "crepe",
    priceAED: 125,
    unit: "per meter",
    imagePrimary: "/products/product-1-a.jpg",
    imageHover: "/products/product-1-b.jpg",
    description:
      "Permanent delicate crinkle weave with effortless stretch and airy lightness for breezy summer collections.",
    colors: ["Dusty Rose", "Dune Beige"],
    specs: {
      composition: "95% Poly, 5% Elastane",
      width: "56 Inches",
      weight: "145 GSM",
      feel: "Breezy & Flexible",
      origin: "Japan / UAE Sourced",
      bestFor: "Summer Kimonos, Tiered Modest Gowns",
    },
    isFeatured: false,
  },

  // --- ORGANZA FABRICS ---
  {
    id: "organza-celestial",
    slug: "celestial-shimmer-organza",
    name: "Celestial Shimmer Organza",
    categoryId: "organza",
    category: "Organza",
    categorySlug: "organza",
    priceAED: 175,
    unit: "per meter",
    imagePrimary: "/products/product-1-a.jpg",
    imageHover: "/products/product-1-b.jpg",
    description:
      "A sheer, crisp translucent organza with ethereal light reflection, structured volume, and refined glass-like shimmer.",
    colors: ["Champagne Ivory", "Pale Gold", "Silver Frost"],
    specs: {
      composition: "100% Silk-Touch Polyester",
      width: "56 Inches",
      weight: "65 GSM",
      feel: "Crisp & Architectural",
      origin: "Italy / Mill Export",
      bestFor: "Evening Overlays, Sheer Sleeves, Dupattas",
    },
    isFeatured: true,
  },

  // --- KANDURA FABRICS ---
  {
    id: "kandura-pearl",
    slug: "emirati-royal-kandura-fabric",
    name: "Emirati Royal Kandura Fabric",
    categoryId: "kandura",
    category: "Kandura",
    categorySlug: "kandura",
    priceAED: 160,
    unit: "per meter",
    imagePrimary: "/products/product-1-a.jpg",
    imageHover: "/products/product-1-b.jpg",
    description:
      "Pristine, crisp Emirati Kandura thobe textile offering immaculate crease resistance, cool comfort, and a subtle satiny luster.",
    colors: ["Bright White", "Pearl Cream"],
    specs: {
      composition: "80% Poly, 20% Fine Cotton",
      width: "58 Inches",
      weight: "175 GSM",
      feel: "Crisp, Smooth & Cooling",
      origin: "Japan / UAE Sourced",
      bestFor: "Traditional Emirati Kanduras & Thobes",
    },
    isFeatured: true,
  },

  // --- SHEILA FABRICS ---
  {
    id: "sheila-gossamer",
    slug: "pure-gossamer-sheila",
    name: "Pure Gossamer Sheila Weave",
    categoryId: "sheila",
    category: "Sheila",
    categorySlug: "sheila",
    priceAED: 95,
    unit: "per meter",
    imagePrimary: "/products/product-1-a.jpg",
    imageHover: "/products/product-1-b.jpg",
    description:
      "Featherlight, ultra-breathable traditional Sheila scarf textile crafted for effortless styling, staying in place with gentle airiness.",
    colors: ["Jet Black", "Natural Slate"],
    specs: {
      composition: "100% High-Filament Poly Weave",
      width: "44 / 45 Inches",
      weight: "55 GSM",
      feel: "Airy, Soft & Gripping",
      origin: "UAE / Japan Sourced",
      bestFor: "Daily & Occasion Sheilas, Tarhas",
    },
    isFeatured: true,
  },

  // --- HI MULTI CHIFFON ---
  {
    id: "chiffon-blush",
    slug: "hi-multi-chiffon-rose",
    name: "Hi Multi Chiffon Rose",
    categoryId: "hi-multi-chiffon",
    category: "Hi Multi Chiffon",
    categorySlug: "hi-multi-chiffon",
    priceAED: 120,
    unit: "per meter",
    imagePrimary: "/products/product-1-a.jpg",
    imageHover: "/products/product-1-b.jpg",
    description:
      "High multi-filament chiffon with floaty diaphanous translucent layers, delicate micro-pleating, and luxurious fluid drape.",
    colors: ["Dusty Rose", "Blush Pink", "Sage"],
    specs: {
      composition: "100% Micro-Chiffon Polyester",
      width: "58 Inches",
      weight: "75 GSM",
      feel: "Floaty & Whispering Soft",
      origin: "South Korea",
      bestFor: "Flowing Gowns, Scarves, Layered Sleeves",
    },
    isFeatured: true,
  },

  // --- WOOL CHIFFON ---
  {
    id: "wool-chiffon-taupe",
    slug: "sartorial-wool-chiffon",
    name: "Sartorial Wool Chiffon",
    categoryId: "wool-chiffon",
    category: "Wool Chiffon",
    categorySlug: "wool-chiffon",
    priceAED: 210,
    unit: "per meter",
    imagePrimary: "/products/product-1-a.jpg",
    imageHover: "/products/product-1-b.jpg",
    description:
      "Rare fusion of airy semi-sheer porosity and natural wool warmth, tailored for discerning sartorial garments and transitional weather.",
    colors: ["Warm Camel", "Charcoal Grey", "Espresso"],
    specs: {
      composition: "60% Fine Wool, 40% Silk-Touch Poly",
      width: "56 Inches",
      weight: "140 GSM",
      feel: "Tactile, Lightweight Warmth",
      origin: "United Kingdom / Mill Partner",
      bestFor: "Winter Abayas, Tailored Wraps, Kaftans",
    },
    isFeatured: true,
  },
];

// --- RELATIONAL & HELPER METHODS ---

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const normalized = slug.toLowerCase().trim();
  return CATEGORIES.find(
    (c) =>
      c.slug.toLowerCase() === normalized || c.id.toLowerCase() === normalized,
  );
}

export function getCategoryProducts(categorySlug: string): Product[] {
  const normalized = categorySlug.toLowerCase().trim();
  if (normalized === "all") return PRODUCTS;
  return PRODUCTS.filter(
    (p) =>
      p.categoryId.toLowerCase() === normalized ||
      p.categorySlug.toLowerCase() === normalized,
  );
}

export function getProductCategory(product: Product): Category | undefined {
  return CATEGORIES.find(
    (c) => c.id === product.categoryId || c.slug === product.categorySlug,
  );
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getCategoryProducts(categorySlug);
}
