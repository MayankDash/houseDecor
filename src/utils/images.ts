/**
 * Centralized image configuration.
 * Uses high-availability Unsplash CDN IDs instead of Picsum to ensure images load instantly and reliably.
 */

/* ── Warm fallback shown while the image is downloading ── */
const WARM_BG: React.CSSProperties = { backgroundColor: "#c8b89a" };

/* Hand-picked public home-decor IDs on Unsplash that load reliably without API keys */
const UNSPLASH_MAP: Record<string, string> = {
  // Hero slides
  living: "photo-1555041469-a586c61ea9bc",
  scandi: "photo-1586023492125-27b2c045efd7",
  bedroom: "photo-1505691938895-1758d7feb511",
  dining: "photo-1617806118233-18e1db207f62",
  interior: "photo-1618220179428-22790b461013",

  // Products & categories
  sofa: "photo-1555041469-a586c61ea9bc",
  pendant: "photo-1513506003901-1e6a229e2d15",
  terracotta: "photo-1612196808214-b8e1d6145a8c",
  lounge: "photo-1567538096630-e0c55bd6374c",
  lamp: "photo-1565814329452-e1efa11c5b89",
  rug: "photo-1600121848594-d8644e57abab",
  macrame: "photo-1528114039593-4366cc08227d",
  shelf: "photo-1594026112284-02bb6f3352fe",
  lantern: "photo-1507473885765-e6ed057f782c",
  cushion: "photo-1584100936595-c0654b55a2e2",
  canvas: "photo-1513519245088-0e12902e5a38",
  floorlamp: "photo-1513694203232-719a280e022f",
  curtain: "photo-1514894780887-121968d00567",
  console: "photo-1583847268964-b28dc8f51f92",
  outdoor: "photo-1600210492486-724fe5c67fb0",
  garden: "photo-1530968033775-2c92736b1c1e",
  clock: "photo-1563861826100-9cb868fdbe1c",
  basket: "photo-1531835551805-16d864c8d311",
  chair: "photo-1592078615290-033ee584e267",
  vase: "photo-1578500494198-246f612d3b3d",
  kitchen: "photo-1556911220-e15b29be8c8f",
  hallway: "photo-1513694203232-719a280e022f",
  mirror: "photo-1618220179428-22790b461013",
  workshop: "photo-1581091226825-a6a2a5aee158",
  studio: "photo-1581092160607-ee22621dd758",
  showroom: "photo-1600607687939-ce8a6c25118c",
  furniture: "photo-1555041469-a586c61ea9bc",
  lighting: "photo-1513506003901-1e6a229e2d15",
  walldecor: "photo-1513519245088-0e12902e5a38",
  accessories: "photo-1578500494198-246f612d3b3d",
  textile: "photo-1600121848594-d8644e57abab",
  plants: "photo-1485955900006-10f4d324d411",

  // Gallery seeds
  cozy: "photo-1586023492125-27b2c045efd7",
  modern: "photo-1592078615290-033ee584e267",
  minimal: "photo-1594026112284-02bb6f3352fe",
  warm: "photo-1522771739844-6a9f6d5f14af",
  chairs: "photo-1567538096630-e0c55bd6374c",
  contemporary: "photo-1583847268964-b28dc8f51f92",
  corner: "photo-1586023492125-27b2c045efd7",
  accent: "photo-1592078615290-033ee584e267",
  openplan: "photo-1540518614846-7eded433c457",
  minimal2: "photo-1499951360447-b19be8fe80f5",
  view: "photo-1600210492486-724fe5c67fb0",
  island: "photo-1556911220-e15b29be8c8f",
  sofaset: "photo-1555041469-a586c61ea9bc",
  details: "photo-1612196808214-b8e1d6145a8c",
  vignette: "photo-1578500494198-246f612d3b3d",
  neutral: "photo-1600121848594-d8644e57abab",
  armchair: "photo-1567538096630-e0c55bd6374c",
  kitchdine: "photo-1617806118233-18e1db207f62",
  warmbed: "photo-1505691938895-1758d7feb511",
};

const PRODUCT_SEEDS = [
  "sofa",
  "pendant",
  "bedroom",
  "terracotta",
  "lounge",
  "lamp",
  "rug",
  "macrame",
  "shelf",
  "lantern",
  "cushion",
  "canvas",
  "dining",
  "floorlamp",
  "curtain",
  "console",
  "outdoor",
  "garden",
  "clock",
  "basket",
  "chair",
  "vase",
  "kitchen",
  "hallway",
  "mirror",
];

export interface PlaceholderImage { src: string; style: React.CSSProperties }

/** Helper to generate a reliable Unsplash URL */
export function getImageUrl(seed: string | number, w: number, h: number): string {
  const seedStr = String(seed).toLowerCase();
  const photoId = UNSPLASH_MAP[seedStr] || "photo-1555041469-a586c61ea9bc"; // default cozy sofa
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export const placeholderImage = {
  hero: (_idx = 0): PlaceholderImage => ({
    src: getImageUrl("living", 1440, 900),
    style: WARM_BG,
  }),

  product: (idx = 0): PlaceholderImage => ({
    src: getImageUrl(PRODUCT_SEEDS[idx % PRODUCT_SEEDS.length], 600, 750),
    style: WARM_BG,
  }),

  productThumb: (idx = 0): PlaceholderImage => ({
    src: getImageUrl(PRODUCT_SEEDS[idx % PRODUCT_SEEDS.length], 300, 300),
    style: WARM_BG,
  }),

  category: (idx = 0): PlaceholderImage => ({
    src: getImageUrl(PRODUCT_SEEDS[(idx * 3) % PRODUCT_SEEDS.length], 800, 600),
    style: WARM_BG,
  }),

  gallery: (idx = 0): PlaceholderImage => ({
    src: getImageUrl(PRODUCT_SEEDS[idx % PRODUCT_SEEDS.length], 500, 700),
    style: WARM_BG,
  }),

  banner: (_idx = 0): PlaceholderImage => ({
    src: getImageUrl("interior", 1440, 900),
    style: WARM_BG,
  }),

  story: (_idx = 0): PlaceholderImage => ({
    src: getImageUrl("workshop", 900, 1200),
    style: WARM_BG,
  }),
} as const;

export function placeholderBg(): React.CSSProperties { return WARM_BG; }

export function getProductImageUrl(url: string | null | undefined, idx = 0): string {
  if (!url || url.trim() === "" || url.includes("picsum.photos")) return placeholderImage.product(idx).src;
  return url;
}

export const imgFallbackBg = placeholderBg;
