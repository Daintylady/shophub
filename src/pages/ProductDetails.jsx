import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import products from "../data/products.json";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";
import { getKidsImage } from "../utils/kidsImages";
import { getAdultsImage } from "../utils/adultsImages";

const CLOTHING_DEPARTMENTS = [
  "clothing",
  "lingerie",
];

const FOOTWEAR_DEPARTMENTS = [
  "footwear",
  "shoes",
];

const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const KIDS_CLOTHING_SIZES = ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y", "7-8Y", "8-9Y", "9-10Y"];

const ADULT_SHOE_SIZES = [38, 39, 40, 41, 42, 43, 44, 45, 46];

// Toddler EU 20–26, Child EU 27–34
const KIDS_SHOE_SIZES = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];

function getSizes(product) {
  if (!product) return null;

  const dept = product.department?.toLowerCase();
  const cat = product.category?.toLowerCase();

  if (FOOTWEAR_DEPARTMENTS.includes(dept)) {
    return {
      type: "shoe",
      sizes: cat === "kids" ? KIDS_SHOE_SIZES : ADULT_SHOE_SIZES,
      label: "Select Size (EU)",
    };
  }

  if (CLOTHING_DEPARTMENTS.includes(dept)) {
    return {
      type: "clothing",
      sizes: cat === "kids" ? KIDS_CLOTHING_SIZES : CLOTHING_SIZES,
      label: "Select Size",
    };
  }

  return null;
}

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { markViewed } = useRecentlyViewed();
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    if (product) {
      markViewed(product.id);
    }
    setSelectedSize(null);
    setSizeError(false);
  }, [id]);

  if (!product) {
    return (
      <div className="product-detail-page">
        <p>Sorry, we couldn't find that product.</p>
        <Link to="/kids">Back to shopping</Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  let displayImage = product.image;
  if (product.category === "kids") {
    displayImage = getKidsImage(product) || product.image;
  } else if (product.category === "adults") {
    displayImage = getAdultsImage(product) || product.image;
  }

  const sizeInfo = getSizes(product);

  function handleAddToCart() {
    if (sizeInfo && !selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart({ ...product, selectedSize: selectedSize || null });
    setSizeError(false);
  }

  return (
    <div className="product-detail-page">
      <div className="detail-image-wrap">
        <img src={displayImage} alt={product.name} className="detail-image" />
        {product.isNew && <span className="badge badge-new">New</span>}
        {product.isBestSeller && (
          <span className="badge badge-bestseller">Best Seller</span>
        )}
      </div>

      <div className="detail-info">
        <p className="product-brand">{product.brand}</p>
        <h1>{product.name}</h1>

        <div className="price-row detail-price-row">
          {product.originalPrice && (
            <span className="original-price">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="product-price">${product.price.toFixed(2)}</span>
        </div>

        <p className="detail-description">{product.description}</p>

        {/* SIZE SELECTOR — only for clothing and footwear */}
        {sizeInfo && (
          <div className="size-selector">
            <p className="size-label">
              {sizeInfo.label}
              {selectedSize && (
                <span className="selected-size-display"> — {selectedSize}</span>
              )}
            </p>
            <div className="size-options">
              {sizeInfo.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "size-btn-active" : ""}`}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="size-error">Please select a size before adding to cart.</p>
            )}
          </div>
        )}

        <div className="detail-actions">
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className={`wishlist-btn-large ${wishlisted ? "active" : ""}`}
            onClick={() => toggleWishlist(product.id)}
          >
            {wishlisted ? "♥ Saved" : "♡ Save to Wishlist"}
          </button>
          <a
            href={product.image}
            download={`${product.name.replace(/\s+/g, "-")}.jpg`}
            className="download-text-btn"
          >
            Download Image
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
