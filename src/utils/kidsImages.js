/**
 * kidsImages.js — Image manifest for all kids products.
 *
 * ACTUAL FILES CONFIRMED FROM SCREENSHOTS:
 * accessories/     accessories1…17.jpg  (17 files)
 * babycare/        babycare1…7.jpg      (7 files)
 * bags/backpack/   backpack1…10.jpg     (10 files)
 * bags/lunchbag/   lunchbag1…7.jpg      (7 files)
 * bath/            bath1…8.jpg          (8 files)
 * clothing/female/ dress1…5, hoodie1, romper1  (7 files)
 * clothing/male/   jacket1…2, jeans1…4, polo1, shirt1  (8 files)
 * clothing/unisex/ capset1, hoodie1, tshirt1   (3 files)
 * feeding/         feeding1…5.jpg       (5 files)
 * footwear/female/ shoes1…2, socks1     (3 files)
 * footwear/male/   shoes1…4, socks1     (5 files)
 * footwear/unisex/ shoes1…3, socks1     (4 files)
 * giftsets/        gift1…4.jpg          (4 files)
 * nursery/         nursery1…25.jpg      (25 files)
 * toys/            toys1…13.jpg         (13 files)
 *
 * FIX NOTE:
 * Flat departments (babycare, bath, feeding, giftsets, nursery, toys)
 * now use product.image directly from products.json instead of the
 * seededNumber() calculation, which was causing wrong images to appear.
 * e.g. gift ID 73: 73 % 4 + 1 = 2 → gift2.jpg (WRONG)
 *      now returns product.image → gift1.jpg (CORRECT)
 */

const kidsImageManifest = {

  // ── Clothing ─────────────────────────────────────────────────
  clothing: {
    female: {
      dress:    5,
      blouse:   0,
      jacket:   0,
      hoodie:   1,
      romper:   1,
      jumper:   0,
      shorts:   0,
      skirt:    0,
      leggings: 0,
      tshirt:   0,
    },
    male: {
      jacket:   2,
      jeans:    4,
      polo:     1,
      shirt:    1,
      hoodie:   0,
      joggers:  0,
      jumper:   0,
      shorts:   0,
      tshirt:   0,
      trousers: 0,
    },
    unisex: {
      capset:     1,
      hoodie:     1,
      tshirt:     1,
      jacket:     0,
      joggers:    0,
      onesie:     0,
      overalls:   0,
      raincoat:   0,
      shorts:     0,
      sweatshirt: 0,
    },
  },

  // ── Footwear ─────────────────────────────────────────────────
  footwear: {
    female: { shoes: 2, socks: 1 },
    male:   { shoes: 4, socks: 1 },
    unisex: { shoes: 3, socks: 1 },
  },

  // ── Bags ─────────────────────────────────────────────────────
  bags: {
    "Backpack":  { folder: "backpack", prefix: "backpack", count: 10 },
    "Lunch Bag": { folder: "lunchbag", prefix: "lunchbag", count: 7  },
  },

  // ── Accessories ───────────────────────────────────────────────
  accessories: {
    sunglasses: 17,
    wristwatch: 17,
    jewelry:    17,
  },
};

// ── Flat departments — these use product.image directly ───────
// Do NOT add seededNumber logic here. The image paths in
// products.json are already correct and sequential.
const FLAT_DEPARTMENTS = ["babycare", "bath", "feeding", "giftsets", "nursery", "toys"];

// ── Type → file-prefix map ────────────────────────────────────
const typePrefixMap = {
  "Dress":      "dress",
  "Blouse":     "blouse",
  "Romper":     "romper",
  "Skirt":      "skirt",
  "Leggings":   "leggings",
  "Jeans":      "jeans",
  "Polo":       "polo",
  "Shirt":      "shirt",
  "Trousers":   "trousers",
  "Joggers":    "joggers",
  "Cap Set":    "capset",
  "Sweatshirt": "sweatshirt",
  "Onesie":     "onesie",
  "Overalls":   "overalls",
  "Raincoat":   "raincoat",
  "Hoodie":     "hoodie",
  "T-Shirt":    "tshirt",
  "Jacket":     "jacket",
  "Jumper":     "jumper",
  "Shorts":     "shorts",
  "Shoes":      "shoes",
  "Socks":      "socks",
};

const accessoryTypeKeyMap = {
  "Sunglasses":       "sunglasses",
  "Wristwatch":       "wristwatch",
  "Kids Jewelry Set": "jewelry",
};

const manualImageOverrides = {
  511: "/images/kids/accessories/accessories17.jpg",
};

function seededNumber(count, seed) {
  if (!count || count < 1) return null;
  return (seed % count) + 1;
}

export function getKidsImage(product) {
  // Manual overrides always win
  if (manualImageOverrides[product.id]) {
    return manualImageOverrides[product.id];
  }

  const dept = product.department;

  // ── FIX: Flat departments use product.image directly ─────────
  // babycare, bath, feeding, giftsets, nursery, toys are all
  // already correctly numbered in products.json (gift1, toys1, etc.)
  // Using seededNumber() here caused wrong images — e.g. ID 73
  // produced gift2.jpg instead of gift1.jpg.
  if (FLAT_DEPARTMENTS.includes(dept)) {
    return product.image;
  }

  // ── Clothing ──────────────────────────────────────────────────
  if (dept === "clothing") {
    const genderMap = kidsImageManifest.clothing[product.gender];
    if (!genderMap) return null;
    const prefix = typePrefixMap[product.type];
    if (!prefix) return null;
    const count = genderMap[prefix];
    if (!count) return null;
    const n = seededNumber(count, product.id);
    return `/images/kids/clothing/${product.gender}/${prefix}${n}.jpg`;
  }

  // ── Footwear ──────────────────────────────────────────────────
  if (dept === "footwear") {
    const genderMap = kidsImageManifest.footwear[product.gender];
    if (!genderMap) return null;
    const prefix = typePrefixMap[product.type];
    if (!prefix) return null;
    const count = genderMap[prefix];
    if (!count) return null;
    const n = seededNumber(count, product.id);
    return `/images/kids/footwear/${product.gender}/${prefix}${n}.jpg`;
  }

  // ── Bags ──────────────────────────────────────────────────────
  if (dept === "bags") {
    const bagConfig = kidsImageManifest.bags[product.type];
    if (!bagConfig || !bagConfig.count) return null;
    const n = seededNumber(bagConfig.count, product.id);
    return `/images/kids/bags/${bagConfig.folder}/${bagConfig.prefix}${n}.jpg`;
  }

  // ── Accessories ───────────────────────────────────────────────
  if (dept === "accessories") {
    const key = accessoryTypeKeyMap[product.type];
    if (!key) return null;
    const count = kidsImageManifest.accessories[key];
    if (!count) return null;
    const n = seededNumber(count, product.id);
    return `/images/kids/accessories/accessories${n}.jpg`;
  }

  return null;
}
