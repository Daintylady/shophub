import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";
import AppLayout from "./AppLayout";
import "./App.css";
import { StyleQuizProvider } from "./context/StyleQuizContext";
import "./filters.css";
import NewsletterStrip from "./components/NewsletterStrip";
import Footer from "./components/Footer";
import { OrderHistoryProvider } from "./context/OrderHistoryContext";
import "./SizeAndOrders.css";



function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderHistoryProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <StyleQuizProvider>
                <BrowserRouter>
                  <AppLayout />
                </BrowserRouter>
              </StyleQuizProvider>
            </RecentlyViewedProvider>
          </WishlistProvider>
        </OrderHistoryProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
