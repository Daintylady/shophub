import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { CartProvider } from "./Context/CartContext";
import { WishlistProvider } from "./Context/WishlistContext";
import { RecentlyViewedProvider } from "./Context/RecentlyViewedContext";
import AppLayout from "./AppLayout";
import "./App.css";
import { StyleQuizProvider } from "./Context/StyleQuizContext";
import "./filters.css";
import NewsletterStrip from "./Components/NewsletterStrip";
import Footer from "./components/Footer";
import { OrderHistoryProvider } from "./Context/OrderHistoryContext";
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
