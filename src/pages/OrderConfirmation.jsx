import { Link } from "react-router-dom";

function OrderConfirmation() {
  return (
    <div className="order-confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">✓</div>
        <h1>Order Placed!</h1>
        <p>Thank you for shopping with ShopHub. Your order is on its way.</p>
        <div className="confirmation-actions">
          <Link to="/kids" className="btn-primary">Continue Shopping</Link>
          <Link to="/" className="btn-secondary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;