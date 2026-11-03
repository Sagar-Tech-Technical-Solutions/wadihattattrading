import { NextResponse } from "next/server";

export interface InstagramPost {
  id: string;
  type: "image" | "video";
  mediaUrl: string;
  thumbnailUrl: string;
  caption: string;
  permalink: string;
  likes?: number;
  comments?: number;
  timestamp?: string;
}

const FALLBACK_POSTS: InstagramPost[] = [
  {
    id: "wh-post-1",
    type: "video",
    mediaUrl: "/fabrics/reel-crystal.mp4",
    thumbnailUrl: "/fabrics/crystal-handwork.jpg",
    caption:
      "Handcrafted crystal embellishments on pure sheer base for bespoke couture & luxury abayas. ✨ #WadiHattat #DubaiTextiles #HauteCouture",
    permalink: "https://www.instagram.com/wadi_hattat.ae",
    likes: 428,
    comments: 34,
  },
  {
    id: "wh-post-2",
    type: "image",
    mediaUrl: "/fabrics/silk.jpg",
    thumbnailUrl: "/fabrics/silk.jpg",
    caption:
      "Signature pure mulberry silks — flowing drapery and unmatched luster for timeless silhouettes. #PureSilk #DubaiFashion #WadiHattat",
    permalink: "https://www.instagram.com/wadi_hattat.ae",
    likes: 312,
    comments: 19,
  },
  {
    id: "wh-post-3",
    type: "video",
    mediaUrl: "/fabrics/reel-embroidery.mp4",
    thumbnailUrl: "/fabrics/embroidery.jpg",
    caption:
      "Intricate thread embroidery crafted with generational precision. Discover thousands of exclusive patterns in Meena Bazaar. #Embroidery #Dubai",
    permalink: "https://www.instagram.com/wadi_hattat.ae",
    likes: 562,
    comments: 48,
  },
  {
    id: "wh-post-4",
    type: "image",
    mediaUrl: "/fabrics/jacquard.jpg",
    thumbnailUrl: "/fabrics/jacquard.jpg",
    caption:
      "Rich textured jacquards woven with subtle sheen, crafted for regal evening wear and ceremonial garments. #Jacquard #LuxuryFabrics",
    permalink: "https://www.instagram.com/wadi_hattat.ae",
    likes: 279,
    comments: 15,
  },
  {
    id: "wh-post-5",
    type: "video",
    mediaUrl: "/fabrics/reel-silk.mp4",
    thumbnailUrl: "/fabrics/silk.jpg",
    caption:
      "The delicate drape and natural sheen of pure silk. Visit our Bur Dubai showroom to experience the tactile elegance. #WadiHattat #Silk",
    permalink: "https://www.instagram.com/wadi_hattat.ae",
    likes: 614,
    comments: 52,
  },
];

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (token) {
    try {
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${token}&limit=6`,
        { next: { revalidate: 3600 } }
      );

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data?.data) && data.data.length > 0) {
          const livePosts: InstagramPost[] = data.data.map((item: any) => ({
            id: item.id,
            type: item.media_type === "VIDEO" ? "video" : "image",
            mediaUrl: item.media_url,
            thumbnailUrl: item.thumbnail_url || item.media_url,
            caption: item.caption || "@wadi_hattat.ae",
            permalink: item.permalink || "https://www.instagram.com/wadi_hattat.ae",
          }));
          return NextResponse.json({ posts: livePosts, source: "live" });
        }
      }
    } catch (err) {
      console.warn("Instagram live fetch failed, serving fallback feed:", err);
    }
  }

  return NextResponse.json({
    posts: FALLBACK_POSTS,
    source: "curated",
    profileUrl: "https://www.instagram.com/wadi_hattat.ae",
    handle: "wadi_hattat.ae",
  });
}

