import { Link } from "react-router-dom";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist } = useWishlist();
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="wishlist-page">
      <h1>Your Wishlist</h1>

      {wishlistedProducts.length === 0 ? (
        <div className="wishlist-empty">
          <p>You haven't saved anything yet.</p>
          <p>Tap the ♡ on any product to save it here.</p>
          <Link to="/kids" className="btn-primary">Browse Kids</Link>{" "}
          <Link to="/adults" className="btn-secondary">Browse Adults</Link>
        </div>
      ) : (
        <div className="product-grid">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;