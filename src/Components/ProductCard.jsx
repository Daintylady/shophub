import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
// ✅ FIX: Import casing matches the actual filename (kidsImages.js, not KidsImages.js)
import { getKidsImage } from "../utils/kidsImages";
import { getAdultsImage } from "../utils/adultsImages";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

 let displayImage = product.image;
  if (product.category === "kids") {
    displayImage = getKidsImage(product) || product.image;
  } else if (product.category === "adults") {
    displayImage = getAdultsImage(product) || product.image;
  }

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`}>
          <img src={displayImage} alt={product.name} className="product-image" />
        </Link>

        {product.isNew && <span className="badge badge-new">New</span>}
        {product.isBestSeller && (
          <span className="badge badge-bestseller">Best Seller</span>
        )}

        <button
          className={`wishlist-heart ${wishlisted ? "active" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
        >
          {wishlisted ? "♥" : "♡"}
        </button>
      </div>

      <p className="product-brand">{product.brand}</p>
      <Link to={`/product/${product.id}`} className="product-name-link">
        <h3 className="product-name">{product.name}</h3>
      </Link>

      <div className="price-row">
        {product.originalPrice && (
          <span className="original-price">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
        <span className="product-price">${product.price.toFixed(2)}</span>
      </div>

      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
