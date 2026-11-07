export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  coverImage: string;
  tags: string[];
  featured?: boolean;
  content: string; // Comprehensive rich HTML
}

export const BLOGS: BlogPost[] = [
  {
    slug: "guide-to-japanese-nida-fabric-luxury-abayas",
    title: "The Ultimate Guide to Authentic Japanese Nida Fabric for Luxury Abayas",
    excerpt:
      "Discover why genuine Japanese Nida remains the gold standard in GCC modest fashion. Learn about weave densities, drape physics, breathability, and how to verify authentic imports.",
    category: "Fabric Guides",
    readTime: "6 min read",
    publishedAt: "2026-03-12",
    updatedAt: "2026-03-20",
    author: {
      name: "Husain Ahamed",
      role: "Chairman & Master Fabric Specialist",
      avatar: "/founderr.jpeg",
    },
    coverImage: "/categories/nida.jpg",
    tags: ["Japanese Nida", "Abaya Fabrics", "Textile Sourcing", "GCC Fashion"],
    featured: true,
    content: `
      <p class="lead">For over three decades, <strong>Japanese Nida fabric</strong> has reigned as the premier choice among haute couture abaya designers and boutique ateliers across the UAE, Saudi Arabia, Oman, and Qatar. Renowned for its buttery hand-feel, fluid drape, and pitch-black color retention, authentic Japanese Nida is unmatched in both luxury aesthetics and day-to-day comfort.</p>

      <h2>What Makes Japanese Nida Exceptional?</h2>
      <p>Unlike standard polyester mixes found in generic wholesale markets, genuine Japanese Nida is woven with microfilament spun yarns using high-precision water-jet looms in Japanese specialized mills. The filaments are extruded at microscopic fineness, allowing the weave to be dense yet exceptionally breathable.</p>

      <blockquote>
        “True luxury in modest fashion is defined not by loud ornamentation, but by the subtle fluidity of how the cloth dances in motion. Genuine Japanese Nida delivers this quiet distinction effortlessly.”
        <cite>— Wadi Hattat Textile Editorial Board</cite>
      </blockquote>

      <h3>Key Characteristics of Authentic Nida:</h3>
      <ul>
        <li><strong>Jet-Black Dye Absorption:</strong> Japanese dye masters utilize advanced cationic baths, giving the fabric an unmistakable matte obsidian depth that withstands repeated laundering without fading to grey.</li>
        <li><strong>Crease Resistance:</strong> Natural recovery elasticity prevents wrinkling during long travel, seated meetings, or high-humidity desert environments.</li>
        <li><strong>Thermal Comfort:</strong> Despite its rich opacity, the microfilament porosity allows body heat to dissipate, making it ideal for the Gulf's warmer climate.</li>
        <li><strong>Non-Static Finish:</strong> Specially treated anti-static fibers eliminate clinging, ensuring the abaya billows naturally with every stride.</li>
      </ul>

      <div class="callout-box">
        <h4>Pro Sourcing Tip: Verifying Authentic Japanese Nida</h4>
        <p>Always inspect the selvage marking on the fabric roll. Authentic Japanese Nida rolls imported through authorized Dubai traders feature clear woven selvage stamps and uniform yarn tension with zero thread slubs.</p>
      </div>

      <h2>Fabric Comparison: Nida vs. Common Alternatives</h2>
      <p>When selecting fabrics for wholesale abaya production, understanding how Nida compares to other staple weaves is essential for matching the right silhouette to your target price point.</p>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Fabric Type</th>
              <th>Weight (GSM)</th>
              <th>Surface Texture</th>
              <th>Breathability</th>
              <th>Best Application</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Japanese Nida</strong></td>
              <td>140 – 165</td>
              <td>Smooth, silky matte</td>
              <td>High</td>
              <td>Luxury everyday &amp; ceremonial abayas</td>
            </tr>
            <tr>
              <td><strong>Korean Crepe</strong></td>
              <td>160 – 185</td>
              <td>Fine pebbled texture</td>
              <td>Medium</td>
              <td>Structured abayas, jackets &amp; sheilas</td>
            </tr>
            <tr>
              <td><strong>Hi-Multi Chiffon</strong></td>
              <td>90 – 115</td>
              <td>Sheer, floaty</td>
              <td>Very High</td>
              <td>Overlay layers, evening accents &amp; scarves</td>
            </tr>
            <tr>
              <td><strong>Satin Crepe</strong></td>
              <td>150 – 175</td>
              <td>Subtle satin lustre</td>
              <td>Medium</td>
              <td>Formal eventwear &amp; luxury trims</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Optimal Care Guidelines for End-Customers</h2>
      <p>To preserve the pristine drape and deep pigment of Japanese Nida garments, advise your clientele on following these verified care procedures:</p>

      <ol>
        <li><strong>Cold Handwash or Gentle Cycle:</strong> Wash in cold water (maximum 30°C) with a mild, enzyme-free liquid detergent.</li>
        <li><strong>Avoid Chlorine Bleach:</strong> Bleaching agents degrade the microfilament coating and cause permanent discoloration.</li>
        <li><strong>Drip Dry in Shade:</strong> Hang on a padded hanger immediately after washing; direct desert sunlight can degrade UV-absorbent finishes over time.</li>
        <li><strong>Low-Heat Steaming:</strong> Use a handheld garment steamer rather than a dry iron to relax any light creasing while maintaining the fabric's soft sheen.</li>
      </ol>

      <h2>Sourcing Bulk Japanese Nida in Dubai</h2>
      <p>At <strong>Wadi Hattat Trading</strong>, we maintain direct partnerships with verified Japanese weaving houses, stocking standard and heavy-weight Nida varieties across our four Dubai showrooms in Deira and Bur Dubai. Whether you require sample roll orders or container-scale export shipments, our team guarantees batch-to-batch color consistency and competitive wholesale pricing.</p>
    `,
  },
  {
    slug: "textile-sourcing-in-dubai-deira-bur-dubai-guide",
    title: "Navigating Wholesale Textile Sourcing in Dubai: The Deira & Bur Dubai Guide",
    excerpt:
      "A comprehensive commercial buyer's guide to Dubai's historic textile markets. How global fashion brands, Gulf boutiques, and regional distributors navigate wholesale fabric hubs.",
    category: "Sourcing & Wholesale",
    readTime: "7 min read",
    publishedAt: "2026-03-05",
    updatedAt: "2026-03-15",
    author: {
      name: "Wadi Hattat Editorial Team",
      role: "Commercial Textile Analysts",
      avatar: "/founderr.jpeg",
    },
    coverImage: "/Modern Fabric Showroom Reception.webp",
    tags: ["Dubai Wholesale", "Deira Souq", "Bur Dubai", "Textile Trade", "Export"],
    featured: true,
    content: `
      <p class="lead">Dubai stands as the undisputed textile capital of the Middle East and North Africa. Centered around the historic creekside districts of <strong>Al Sabkha, Deira</strong> and <strong>Al Souq Al Kabeer, Bur Dubai</strong>, these bustling trading corridors transact billions of dollars annually in luxury silks, crepes, Japanese polyesters, and ceremonial brocades.</p>

      <h2>The Strategic Advantage of Dubai's Textile Hub</h2>
      <p>For international buyers and GCC fashion houses, sourcing textiles through Dubai provides distinct operational advantages over dealing directly with overseas mills in Japan, Korea, China, or India:</p>

      <ul>
        <li><strong>Immediate Stock Availability:</strong> Warehouses across Dubai hold thousands of ready-to-ship rolls, eliminating 60–90 day production lead times for standard collections.</li>
        <li><strong>Flexible Minimum Order Quantities (MOQs):</strong> Test new color palettes or capsule collections with single-roll minimums (approx. 23 meters) before committing to container volumes.</li>
        <li><strong>Zero-Friction Logistics:</strong> Proximity to Jebel Ali Port and Dubai International Airport enables express customs clearance and regional road freight to Oman, Saudi Arabia, and Bahrain within 24–48 hours.</li>
        <li><strong>Tactile Quality Control:</strong> Buyers can physically inspect swatches, test fabric recovery, and verify GSM weights in air-conditioned showrooms before signing delivery agreements.</li>
      </ul>

      <figure>
        <img src="/Modern Fabric Showroom with Warm Wood Accents.webp" alt="Wadi Hattat Wholesale Textile Showroom in Dubai" />
        <figcaption>Showrooms in Deira and Bur Dubai offer private consultation rooms where wholesale clients review fresh season mill swatches.</figcaption>
      </figure>

      <h2>Comparing Dubai's Core Textile Districts</h2>
      <p>Understanding the specialized profile of each district saves commercial buyers valuable time when curating collections:</p>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>District</th>
              <th>Key Locations</th>
              <th>Primary Fabric Focus</th>
              <th>Best Suited For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Al Sabkha (Deira)</strong></td>
              <td>8th &amp; 9th Streets, Sikkat Al Khail</td>
              <td>High-volume wholesale rolls, Japanese Nida, everyday abaya crepes, linings</td>
              <td>Bulk distributors, regional fashion exporters, large manufacturers</td>
            </tr>
            <tr>
              <td><strong>Al Souq Al Kabeer (Bur Dubai)</strong></td>
              <td>Al Fahidi Street, Souq Textile corridors</td>
              <td>High-end bridal laces, embroidered tulles, handworked crystals, ceremonial silks</td>
              <td>Couture ateliers, custom bridal designers, bespoke tailors</td>
            </tr>
            <tr>
              <td><strong>Dubai Textile City (Warsan)</strong></td>
              <td>Ras Al Khor industrial zone</td>
              <td>Container staging, bulk logistics, re-export packing</td>
              <td>Multi-container shipments to Africa, Central Asia &amp; Europe</td>
            </tr>
          </tbody>
        </table>
      </div>

      <blockquote>
        “Navigating Dubai's textile market effectively requires building long-term trust with established traders who guarantee batch color match and transparent origin documentation.”
      </blockquote>

      <h2>Essential Best Practices for Commercial Buyers</h2>
      <p>To maximize your return on sourcing trips to Dubai, keep these industry best practices at the forefront:</p>

      <ol>
        <li><strong>Request Dye-Lot Verification:</strong> When purchasing split orders for a single collection, ensure all rolls stem from the identical dye-lot (Dye Vat ID) to eliminate subtle shade variation under retail store lighting.</li>
        <li><strong>Confirm Shrinkage &amp; Pre-Treatment:</strong> Verify whether natural-blend or textured crepes require pre-shrinking prior to laser cutting or multi-ply industrial stacking.</li>
        <li><strong>Establish Dedicated Forwarding Lines:</strong> Partner with established traders like Wadi Hattat who offer integrated customs clearance and door-to-door freight to your manufacturing facility.</li>
      </ol>

      <div class="callout-box">
        <h4>Need Personalized Sourcing Assistance?</h4>
        <p>Wadi Hattat Trading operates four specialized showrooms across Deira and Bur Dubai. Our bilingual sourcing managers assist overseas buyers with sample curation, lab dips, and multimodal container export.</p>
      </div>
    `,
  },
  {
    slug: "textile-trends-modest-fashion-gcc",
    title: "Evolving Textile Trends in Modern GCC Modest Fashion",
    excerpt:
      "From lightweight textured crepes to matte organza overlays and earthy mineral palettes, explore the defining fabric innovations shaping modest runways and daily wear.",
    category: "Industry Trends",
    readTime: "5 min read",
    publishedAt: "2026-02-24",
    updatedAt: "2026-03-01",
    author: {
      name: "Husain Ahamed",
      role: "Chairman & Master Fabric Specialist",
      avatar: "/founderr.jpeg",
    },
    coverImage: "/categories/crepe.jpg",
    tags: ["Fashion Trends", "Crepe Fabrics", "GCC Modest Wear", "Contemporary Design"],
    featured: true,
    content: `
      <p class="lead">Modest fashion across the Arabian Gulf has transformed into one of the most dynamic sectors in global luxury apparel. Today's regional consumers demand garments that balance sacred cultural elegance with cutting-edge textile performance, giving rise to fascinating innovations in weave architecture and finishings.</p>

      <h2>1. The Ascendance of Textured &amp; Pebbled Crepes</h2>
      <p>While classic obsidian black remains a permanent pillar, modern designers are increasingly layering tactile intrigue through textured crepes. High-twist yarns produce subtle surface ripples that catch ambient light without appearing glossy, adding architectural dimension to flowing trench-cut abayas and kimono silhouettes.</p>

      <h3>Why Textured Crepe Dominates 2026 Collections:</h3>
      <ul>
        <li><strong>Sculptural Draping:</strong> Maintains structure around structured cuffs and lapels while flowing effortlessly from shoulder seams.</li>
        <li><strong>Enhanced Air Permeability:</strong> The textured weave creates microscopic air pockets between the garment and the skin, promoting natural airflow.</li>
        <li><strong>Low-Maintenance Resilience:</strong> Minor handling creases naturally blend into the fabric's organic pebbled texture.</li>
      </ul>

      <figure>
        <img src="/categories/organza.jpg" alt="Delicate organza and textured fabric samples" />
        <figcaption>Subtle textural contrast between structured crepes and airy organzas creates contemporary visual depth.</figcaption>
      </figure>

      <h2>2. The New Neutral Palette: Earthy Mineral Tones</h2>
      <p>Regional ateliers are moving beyond monochromatic black to incorporate sophisticated, nature-inspired mineral palettes:</p>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Color Shade</th>
              <th>Pantone Reference</th>
              <th>Cultural Resonance</th>
              <th>Ideal Fabric Pairings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Desert Sand</strong></td>
              <td>14-1118 TCX</td>
              <td>Warm Arabian dunes</td>
              <td>Double-face linen blend, washed matte crepe</td>
            </tr>
            <tr>
              <td><strong>Sage Olive</strong></td>
              <td>16-0421 TCX</td>
              <td>Omani wadi flora &amp; date palms</td>
              <td>Textured Japanese crepe, silk chiffon</td>
            </tr>
            <tr>
              <td><strong>Muted Terracotta</strong></td>
              <td>17-1436 TCX</td>
              <td>Ancient clay pottery &amp; fort heritage</td>
              <td>Mid-weight Nida, twill silk</td>
            </tr>
            <tr>
              <td><strong>Midnight Obsidian</strong></td>
              <td>19-4007 TCX</td>
              <td>Timeless luxury black</td>
              <td>Authentic Japanese Nida, matte organza</td>
            </tr>
          </tbody>
        </table>
      </div>

      <blockquote>
        “Modest wear today is an architectural dialogue between heritage silhouettes and modern material science. The fabric itself is the canvas upon which cultural identity is expressed.”
      </blockquote>

      <h2>3. Hybrid Layering with Matte Organza &amp; Chiffon</h2>
      <p>A noticeable trend across Gulf design weeks is the creative use of translucent overlays. Designers pair an opaque inner foundation with ethereal matte organza or double-weight chiffon coats. This creates graceful kinetic movement during walking without sacrificing modesty guidelines.</p>

      <div class="callout-box">
        <h4>Designing for the GCC Consumer</h4>
        <p>Gulf customers are among the most discerning fabric connoisseurs globally. They evaluate hand-feel, thread balance, and dye uniformity with acute precision. Choosing high-grade certified mills is crucial for boutique brand longevity.</p>
      </div>

      <h2>Summary: Staying Ahead in Commercial Manufacturing</h2>
      <p>For brands and wholesale retailers preparing upcoming seasonal lines, integrating these tactile textures and nuanced mineral tones into your base fabric orders will position your brand at the leading edge of contemporary modest design.</p>
    `,
  },
  {
    slug: "caring-for-luxury-silk-velvet-embroidered-fabrics",
    title: "Mastering Fabric Longevity: Care Guidelines for Silk, Velvet & Handwork",
    excerpt:
      "A master class on cleaning, pressing, and storing fragile specialty textiles. How to protect delicate crystal embellishments, metallic embroidery, and pure silk fibers.",
    category: "Fabric Guides",
    readTime: "5 min read",
    publishedAt: "2026-02-15",
    updatedAt: "2026-02-22",
    author: {
      name: "Wadi Hattat Editorial Team",
      role: "Textile Quality Specialists",
      avatar: "/founderr.jpeg",
    },
    coverImage: "/fabrics/velvet.jpg",
    tags: ["Fabric Care", "Silk", "Velvet", "Embroidery", "Luxury Maintenance"],
    featured: false,
    content: `
      <p class="lead">Specialty fabrics—such as pure Mulberry silk, plush silk-rayon velvet, and intricate crystal-embroidered tulles—represent the pinnacle of textile craftsmanship. However, their refined beauty requires specialized care to prevent fiber crushing, thread snagging, and luster loss over time.</p>

      <h2>1. Silk Care: Preserving the Natural Protein Fiber</h2>
      <p>Silk is a natural protein filament spun by silkworms. Unlike synthetic fibers, silk is sensitive to high alkaline detergents, extreme heat, and direct ultraviolet rays.</p>

      <h3>Silk Dos and Don'ts:</h3>
      <ul>
        <li><strong>DO Use pH-Neutral Detergent:</strong> Standard laundry detergents contain enzymes that break down protein chains, weakening silk over time. Always specify silk-safe formulations.</li>
        <li><strong>DO Iron on Reverse:</strong> Always press silk on the reverse side while slightly damp, using the lowest iron heat setting with a clean cotton press cloth.</li>
        <li><strong>DON'T Wring or Twist:</strong> Wringing wet silk fractures the delicate filaments, resulting in permanent creasing and dull patches.</li>
        <li><strong>DON'T Apply Perfume Directly:</strong> Fragrances and body mists contain alcohol that can strip natural luster and cause localized staining.</li>
      </ul>

      <figure>
        <img src="/fabrics/silk.jpg" alt="Rich draping silk fabric rolls" />
        <figcaption>Pure silk exhibits a natural prism-like refraction that must be preserved with gentle, low-heat care.</figcaption>
      </figure>

      <h2>2. Velvet: Maintaining Plush Pile Height</h2>
      <p>Velvet is constructed with a raised pile that reflects light dramatically. If the pile is crushed through improper pressing or heavy storage, the luxurious appearance is severely compromised.</p>

      <div class="callout-box">
        <h4>Never Place a Flat Iron Directly on Velvet</h4>
        <p>Applying a flat iron directly to velvet crushes the upright pile irreversibly. Always use vertical steam from a 2-3 cm distance, or press velvet face-down onto a dedicated needle board (velvet board).</p>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Fabric Type</th>
              <th>Recommended Cleaning</th>
              <th>Steam / Iron Method</th>
              <th>Storage Protocol</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pure Silk</strong></td>
              <td>Professional Dry Clean or Handwash (Cold)</td>
              <td>Low iron with press cloth, reverse side only</td>
              <td>Breathable cotton garment bag, padded hanger</td>
            </tr>
            <tr>
              <td><strong>Silk-Rayon Velvet</strong></td>
              <td>Professional Dry Clean Only</td>
              <td>Vertical steam only; never press flat</td>
              <td>Hang upright; do not fold or compress</td>
            </tr>
            <tr>
              <td><strong>Crystal &amp; Zari Handwork</strong></td>
              <td>Specialist Spot Clean / Dry Clean</td>
              <td>Gentle steam on reverse with barrier cloth</td>
              <td>Acid-free tissue paper between embroidered folds</td>
            </tr>
            <tr>
              <td><strong>Metallic Jacquard</strong></td>
              <td>Professional Dry Clean</td>
              <td>Cool reverse iron; test selvage first</td>
              <td>Roll on tube or hang loosely</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>3. Crystal Embellishments &amp; Zari Handwork</h2>
      <p>When garments feature Austrian crystals, sequins, or traditional metallic Zari embroidery, contact with adjacent fabric layers can cause snags during transport and retail display.</p>

      <p>Always place a layer of archival acid-free tissue paper over embellished surfaces before folding. For long-term preservation, store garments in unbleached cotton garment bags rather than plastic polybags, which can trap ambient moisture and cause metallic threads to tarnish.</p>
    `,
  },
  {
    slug: "kandura-fabric-selection-guide-gulf-heritage",
    title: "The Connoisseur’s Guide to Men’s Kandura Fabrics: Weaves, Weights & Finishes",
    excerpt:
      "A deep dive into traditional GCC men's wear. How Omani, Emirati, and Saudi tailors select fine Japanese cottons, spun polyesters, and wool blends for all seasons.",
    category: "Fabric Guides",
    readTime: "6 min read",
    publishedAt: "2026-02-02",
    updatedAt: "2026-02-10",
    author: {
      name: "Husain Ahamed",
      role: "Chairman & Master Fabric Specialist",
      avatar: "/founderr.jpeg",
    },
    coverImage: "/categories/kandura.jpg",
    tags: ["Kandura Fabrics", "Men's Modest Wear", "Oman Heritage", "Dubai Tailoring"],
    featured: false,
    content: `
      <p class="lead">The traditional Arabian <strong>Kandura</strong> (also known as Thobe or Dishdasha across different Gulf states) is an icon of dignified masculine elegance. While the silhouette may appear deceptively simple to an outside observer, true masters of Gulf tailoring know that everything depends on the micro-selection of the cloth.</p>

      <h2>Weave Structures in Traditional Kandura Tailoring</h2>
      <p>Kandura fabrics must balance crisp architectural lines with comfortable mobility under the intense Arabian sun. The choice of weave dictates how the garment holds its shape at the collar, placket, and hemline.</p>

      <h3>1. Japanese Spun Polyester (Toyobo Style)</h3>
      <p>Japanese spun polyester is the undisputed market leader for business and formal daily wear in the UAE and Qatar. Engineered with high-tenacity filament cores wrapped in spun fibers, it delivers the crisp hand of combed cotton with the crease-free durability of modern synthetics.</p>

      <h3>2. Combed Egyptian &amp; Giza Cottons</h3>
      <p>For ultimate breathability during peak summer months, ultra-long-staple (ELS) Egyptian Giza cottons provide an unmatched silky touch. While requiring regular starching and pressing, nothing matches the skin feel of pure natural cotton in 40°C+ conditions.</p>

      <h3>3. Wool-Touch &amp; Cashmere Blends for Winter</h3>
      <p>During the cooler months in the desert interior and northern GCC, heavier wool-touch fabrics in deeper tones (navy, charcoal, camel, and deep olive) replace traditional white. These fabrics range between 280 and 380 GSM and feature subtle twill or herringbone patterns.</p>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Fabric Class</th>
              <th>Typical GSM</th>
              <th>Seasonal Fit</th>
              <th>Regional Preference</th>
              <th>Key Benefit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Superfine Spun Poly</strong></td>
              <td>150 – 175</td>
              <td>Year-Round</td>
              <td>UAE &amp; Qatar</td>
              <td>Zero creasing, crisp collar lines, stain resistant</td>
            </tr>
            <tr>
              <td><strong>100% Giza Cotton</strong></td>
              <td>120 – 145</td>
              <td>Peak Summer</td>
              <td>Saudi Arabia &amp; Kuwait</td>
              <td>Maximum skin breathability &amp; moisture absorption</td>
            </tr>
            <tr>
              <td><strong>Cotton-Poly Blend (80/20)</strong></td>
              <td>140 – 165</td>
              <td>Spring / Autumn</td>
              <td>Oman &amp; UAE</td>
              <td>Balanced comfort, moderate ironing required</td>
            </tr>
            <tr>
              <td><strong>Wool Blend Twill</strong></td>
              <td>280 – 350</td>
              <td>Winter</td>
              <td>All GCC States</td>
              <td>Rich thermal warmth, luxurious drape</td>
            </tr>
          </tbody>
        </table>
      </div>

      <blockquote>
        “In Omani and Emirati culture, a well-tailored Kandura represents dignity, family honor, and personal refinement. The drape of the cloth tells a story of respect before a single word is spoken.”
      </blockquote>

      <h2>White, Off-White or Blue-Tone: The Shade Dilemma</h2>
      <p>Kandura fabrics are produced in dozens of subtle white hues. The three most popular categories include:</p>

      <ul>
        <li><strong>Optical Bright White:</strong> Features blue-spectrum optical brighteners that give an energetic, pristine appearance under midday daylight.</li>
        <li><strong>Natural Milky White:</strong> A soft, warm white without artificial blue tints, preferred by senior executives and diplomatic circles.</li>
        <li><strong>Cream &amp; Beige:</strong> Traditional off-white tones widely favored in Oman and the desert regions for daytime travel.</li>
      </ul>

      <div class="callout-box">
        <h4>Wholesale Kandura Roll Sourcing</h4>
        <p>Wadi Hattat Trading maintains deep inventory of authentic Japanese and European thobe fabrics. We supply bespoke tailoring shops and ready-to-wear manufacturers across the UAE and Oman with guaranteed consistent rolls.</p>
      </div>
    `,
  },
  {
    slug: "sustainable-textile-practices-wholesale-distribution",
    title: "Sustainability in Textile Wholesale: Eco-Finishes & Supply Chain Transparency",
    excerpt:
      "How Dubai's textile trading ecosystem is adopting cleaner dye practices, recycled fiber blends, and lower carbon logistics to meet modern corporate standards.",
    category: "Industry Trends",
    readTime: "5 min read",
    publishedAt: "2026-01-20",
    updatedAt: "2026-01-28",
    author: {
      name: "Wadi Hattat Editorial Team",
      role: "Sustainability & Logistics Analysts",
      avatar: "/founderr.jpeg",
    },
    coverImage: "/about-heritage.jpg",
    tags: ["Sustainability", "Eco Textiles", "Supply Chain", "Textile Trade"],
    featured: false,
    content: `
      <p class="lead">As global environmental standards tighten and conscious consumers demand transparency in fashion manufacturing, the wholesale textile supply chain is undergoing a fundamental modernization. Dubai's strategic trade hub is actively leading this transformation across the Middle East.</p>

      <h2>1. Closed-Loop Water-Jet Weaving &amp; Non-Toxic Dyes</h2>
      <p>Traditional fabric dyeing has historically been one of the most water-intensive industrial processes. Forward-thinking mills in Japan and Korea partnering with Gulf traders have transitioned to closed-loop water recycling systems that filter and reuse up to 95% of processing water.</p>

      <h3>Key Eco-Standards Now Required by Leading GCC Brands:</h3>
      <ul>
        <li><strong>OEKO-TEX® Standard 100:</strong> Ensures fabrics are completely free from harmful levels of over 100 toxic chemicals, formaldehydes, and heavy metal dyes.</li>
        <li><strong>Recycled PET Filaments (rPET):</strong> High-end polyesters woven from post-consumer recycled plastic bottles, delivering the identical drape of virgin Nida with up to 50% lower carbon footprint.</li>
        <li><strong>Low-Impact Reactive Dyes:</strong> Utilizing natural salt fixatives that bond directly with yarn fibers at lower bath temperatures.</li>
      </ul>

      <figure>
        <img src="/what-we-do.jpg" alt="Textile quality inspection and eco testing" />
        <figcaption>Inspection protocols ensure textiles meet international chemical safety certifications and fiber purity thresholds.</figcaption>
      </figure>

      <h2>2. Reducing Deadstock Through Data-Driven Sourcing</h2>
      <p>One of the largest environmental challenges in the fashion industry is overproduction and deadstock waste. By leveraging Dubai's flexible wholesale model, regional ateliers no longer need to commit to multi-thousand meter overseas minimums that risk liquidation.</p>

      <div class="callout-box">
        <h4>The Just-in-Time Wholesale Advantage</h4>
        <p>At Wadi Hattat Trading, we enable fashion businesses to order precise roll quantities aligned with real-time seasonal sell-through. This lean approach dramatically cuts textile waste while protecting brand margins.</p>
      </div>

      <h2>Looking Ahead to 2030</h2>
      <p>The future of Gulf textile trading lies at the intersection of cultural heritage and environmental stewardship. By championing certified eco-finishes, clean logistics, and durable fabrics that endure for years rather than seasons, we ensure our industry flourishes responsibly for generations to come.</p>
    `,
  },
];

// Helper Functions
export function getAllBlogs(): BlogPost[] {
  return [...BLOGS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedBlogs(limit = 3): BlogPost[] {
  const featured = BLOGS.filter((b) => b.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  // fallback to most recent if not enough featured
  const all = getAllBlogs();
  return all.slice(0, limit);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOGS.find((b) => b.slug === slug);
}

export function getRelatedBlogs(currentSlug: string, limit = 3): BlogPost[] {
  const current = getBlogBySlug(currentSlug);
  if (!current) return getAllBlogs().slice(0, limit);

  // Match same category first, then tags, excluding current
  const others = BLOGS.filter((b) => b.slug !== currentSlug);
  const sameCategory = others.filter((b) => b.category === current.category);
  const diffCategory = others.filter((b) => b.category !== current.category);

  return [...sameCategory, ...diffCategory].slice(0, limit);
}

export function getAllCategories(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  BLOGS.forEach((b) => {
    map.set(b.category, (map.get(b.category) || 0) + 1);
  });
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
}

export function getPaginatedBlogs(
  page = 1,
  pageSize = 6,
  category?: string,
  searchQuery?: string
): {
  blogs: BlogPost[];
  total: number;
  totalPages: number;
  currentPage: number;
} {
  let filtered = getAllBlogs();

  if (category && category.toLowerCase() !== "all") {
    filtered = filtered.filter(
      (b) => b.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (searchQuery && searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const blogs = filtered.slice(start, start + pageSize);

  return {
    blogs,
    total,
    totalPages,
    currentPage,
  };
}

