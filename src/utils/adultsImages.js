/**
 * adultsImages.js — Image manifest for all adult products.
 *
 * HOW IT WORKS
 * ─────────────
 * Each entry is: { [typeName]: imageCount }
 * The image file name is derived from the type name:
 *   e.g. "Corporate Shoes" → "corporateshoes", count 4 → files corporateshoes1…4.jpg
 *
 * IMAGE PATH PATTERN
 * ──────────────────
 *   /images/adults/{gender}/{department}/{prefix}{n}.jpg
 *
 * ADDING NEW IMAGES
 * ─────────────────
 * 1. Drop the file in the correct folder:
 *    /public/images/adults/{gender}/{department}/
 * 2. Name it: {lowercase-type-no-spaces}{n}.jpg  (e.g. sneakers3.jpg)
 * 3. Increment the count for that type in the manifest below.
 *
 * DEPARTMENT ↔ FOLDER MAP (adults)
 * ─────────────────────────────────
 *   clothing   → /adults/female|male|unisex/clothing/
 *   shoes      → /adults/female|male/shoes/        (gendered shoes)
 *   footwear   → /adults/unisex/footwear/           (unisex footwear)
 *   bags       → /adults/female|male/bags/
 *   hair       → /adults/female/hair/
 *   beauty     → /adults/female/beauty/
 *   skincare   → /adults/female/skincare/
 *   fragrance  → /adults/female/fragrance/
 *   accessories→ /adults/female|unisex/accessories/
 *   lingerie   → /adults/female/lingerie/
 *   grooming   → /adults/male/grooming/
 */

const adultsImageManifest = {
  female: {
    clothing: {
      Blazer: 3,
      Blouse: 0,
      Camisole: 0,
      Cardigan: 4,
      Dress: 0,
      Jacket: 1,
      Jeans: 1,
      Joggers: 1,
      Jumpsuit: 0,
      Leggings: 0,
      "Pencil Skirt": 0,
      Shirt: 2,
      Skirt: 0,
      "T-Shirt": 0,
      Top: 3,
      Trousers: 0,
      Hoodie: 1,
      Polo: 3,
      Shorts: 1,
    },
    // ✅ dept key "shoes" — matches products.json department field for female shoes
    shoes: {
      Heels: 7,
      Flats: 8,
      "Corporate Shoes": 1,
      Sneakers: 1,
    },
    bags: {
      Handbag: 10,
      "Corporate Tote": 1,
      Wallet: 0,
      Clutch: 1,
    },
    hair: {
      "Human Hair Wig": 1,
      "Blended Wig": 1,
      "Synthetic Wig": 0,
      "Wig Care Kit": 0,
    },
    beauty: {
      Lipstick: 4,
      Mascara: 0,
      Foundation: 0,
      "Pressed Powder": 1,
      Primer: 1,
      Eyeliner: 0,
      Blush: 3,
    },
    skincare: {
      "Facial Cleanser": 4,
      Moisturizer: 2,
      Sunscreen: 3,
      Serum: 2,
    },
    fragrance: {
      Perfume: 10,
      "Body Mist": 0,
    },
    accessories: {
      Necklace: 5,
      Earrings: 1,
      Bracelet: 1,
      Ring: 2,
    },
    lingerie: {
      Bra: 0,
      Bralette: 0,
      "Backless Bra": 0,
      Panties: 5,
      "Feminine Care": 0,
    },
  },

  male: {
    clothing: {
      "T-Shirt": 0,
      Polo: 3,
      Shirt: 2,
      Trousers: 0,
      Jeans: 1,
      Joggers: 1,
      Jacket: 1,
      Blazer: 3,
      Cardigan: 2,
      Hoodie: 1,
      Shorts: 1,
      Top: 1,
      // ✅ FIX: Added Sweater — was in products.json but missing from manifest
      Sweater: 0,
    },
    // ✅ dept key "shoes" — matches products.json department field for male shoes
    shoes: {
      Sneakers: 2,
      Boots: 0,
      "Corporate Shoes": 4,
      Shoes: 1,
    },
    bags: {
      Backpack: 4,
      Wallet: 1,
      Briefcase: 3,
    },
    grooming: {
      "Hair Clippers": 1,
      "Beard Trimmer": 0,
      "Beard Oil": 0,
    },
  },

  unisex: {
    clothing: {
      "T-Shirt": 0,
      Hoodie: 1,
      Joggers: 1,
      Jacket: 1,
      Sweatshirt: 4,
      Shorts: 1,
      "Cargo Pants": 0,
      Raincoat: 3,
      Tracksuit: 2,
      "Beanie Set": 0,
      Blazer: 3,
      Cardigan: 4,
      Polo: 3,
      Shirt: 2,
      Top: 3,
      Jeans: 1,
    },
    // ✅ FIX: "footwear" (not "shoes") — matches products.json for unisex adults
    footwear: {
      Shoes: 4,
    },
    accessories: {
      "Face Cap": 0,
      Sunglasses: 5,
      Watch: 2,
    },
  },
};

/** Convert a product type name to the file-name prefix used in the image folder. */
function toPrefix(typeName) {
  return typeName.toLowerCase().replace(/[\s-]/g, "");
}

/**
 * Deterministically pick one image number (1..count) for a given product.
 * Same product always gets the same image; different products get different ones.
 */
function seededPick(count, seed) {
  if (!count || count < 1) return null;
  return (seed % count) + 1;
}

/**
 * Returns the public image path for an adult product, or null if no image
 * is mapped yet (count === 0 or department/type not found in manifest).
 *
 * @param {{ id: number, gender: string, department: string, type: string }} product
 * @returns {string|null}
 */
export function getAdultsImage(product) {
  const genderData = adultsImageManifest[product.gender];
  if (!genderData) return null;

  const deptData = genderData[product.department];
  if (!deptData) return null;

  const count = deptData[product.type];
  if (!count) return null;

  const photoNumber = seededPick(count, product.id);
  const prefix = toPrefix(product.type);

  return `/images/adults/${product.gender}/${product.department}/${prefix}${photoNumber}.jpg`;
}
