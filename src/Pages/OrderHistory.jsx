import { useOrderHistory } from "../context/OrderHistoryContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function OrderHistory() {
  const { getOrders } = useOrderHistory();
  const { currentUser } = useAuth();
  const orders = getOrders(currentUser?.email);

  if (!currentUser) {
    return (
      <div className="order-history-page">
        <h1>Order History</h1>
        <p>Please <Link to="/login">log in</Link> to view your order history.</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="order-history-page">
        <h1>Order History</h1>
        <p>You have no past orders yet.</p>
        <Link to="/kids" className="shop-now-link">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="order-history-page">
      <h1>Order History</h1>
      <p className="order-count">{orders.length} order{orders.length > 1 ? "s" : ""} placed</p>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-card-header">
            <div>
              <span className="order-label">Order ID:</span>
              <span className="order-value"> #{order.id}</span>
            </div>
            <div>
              <span className="order-label">Date:</span>
              <span className="order-value"> {order.date}</span>
            </div>
            <div>
              <span className="order-label">Total:</span>
              <span className="order-total"> ${order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="order-items">
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="order-item-image"
                />
                <div className="order-item-details">
                  <p className="order-item-name">{item.name}</p>
                  {item.selectedSize && (
                    <p className="order-item-size">Size: {item.selectedSize}</p>
                  )}
                  <p className="order-item-qty">Qty: {item.quantity}</p>
                  <p className="order-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
