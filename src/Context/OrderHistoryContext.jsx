import { createContext, useContext } from "react";

const OrderHistoryContext = createContext();

export function OrderHistoryProvider({ children }) {

  function getOrders(userEmail) {
    if (!userEmail) return [];
    const key = `orders_${userEmail}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  }

  function saveOrder(userEmail, cartItems, total) {
    if (!userEmail) return;
    const key = `orders_${userEmail}`;
    const existing = getOrders(userEmail);
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cartItems,
      total: total,
    };
    localStorage.setItem(key, JSON.stringify([newOrder, ...existing]));
  }

  return (
    <OrderHistoryContext.Provider value={{ getOrders, saveOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
}

export function useOrderHistory() {
  return useContext(OrderHistoryContext);
}
