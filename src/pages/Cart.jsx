import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const hasReferralDiscount = currentUser?.hasReferralDiscount;
  const discountAmount = hasReferralDiscount ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal - discountAmount;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        {/* ── Close / Back button ── */}
        <button className="cart-close-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/kids">Browse Children's Wear</Link> |{" "}
        <Link to="/adults">Browse Adult Wear</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* ── Close / Back button ── */}
      <button className="cart-close-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1>Your Cart</h1>

      {hasReferralDiscount && (
        <div className="referral-banner">
          🎉 You have a 10% referral discount applied at checkout!
        </div>
      )}

      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)} each</p>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
          <p className="cart-item-subtotal">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}

      <div className="cart-total">
        <p>Subtotal: ${cartTotal.toFixed(2)}</p>
        {hasReferralDiscount && (
          <p className="discount-line">
            Referral discount (10%): -${discountAmount.toFixed(2)}
          </p>
        )}
        <h2>Total: ${finalTotal.toFixed(2)}</h2>
        {/* ── Fixed onClick bug ── */}
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
