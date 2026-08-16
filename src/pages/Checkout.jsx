import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrderHistory } from "../context/OrderHistoryContext";

function Checkout() {
  const { cartTotal, clearCart, cartItems } = useCart();
  const { currentUser, clearReferralDiscount } = useAuth();
  const { saveOrder } = useOrderHistory();
  const navigate = useNavigate();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  const hasReferralDiscount = currentUser?.hasReferralDiscount;
  const discountAmount = hasReferralDiscount ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal - discountAmount;

  if (cartItems.length === 0) {
    navigate("/kids");
    return null;
  }

  function handlePlaceOrder(e) {
    e.preventDefault();

    if (cardNumber.replace(/\s/g, "").length < 12) {
      setError("Please enter a valid-looking card number.");
      return;
    }
    if (cvv.length < 3) {
      setError("Please enter a valid CVV.");
      return;
    }

    // Save order to history before clearing cart
    saveOrder(currentUser?.email, cartItems, finalTotal);

    clearCart();
    if (hasReferralDiscount) {
      clearReferralDiscount();
    }
    navigate("/order-confirmation");
  }

  return (
    <div className="auth-page">
      <form className="auth-form checkout-form" onSubmit={handlePlaceOrder}>
        <h2>Payment Details</h2>
        <p className="checkout-notice">
          This is a practice project — please don't enter a real card number.
        </p>

        {error && <p className="auth-error">{error}</p>}

        <label>Name on Card</label>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
        />

        <label>Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          required
        />

        <div className="checkout-row">
          <div>
            <label>Expiry</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              maxLength={4}
              required
            />
          </div>
        </div>

        <div className="checkout-summary">
          <p>Subtotal: ${cartTotal.toFixed(2)}</p>
          {hasReferralDiscount && (
            <p className="discount-line">
              Referral discount: -${discountAmount.toFixed(2)}
            </p>
          )}
          <h3>Total: ${finalTotal.toFixed(2)}</h3>
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
