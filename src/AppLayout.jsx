import { Routes, Route, useLocation } from "react-router-dom";
// ✅ FIX: All imports now use consistent "./components" and "./pages" (lowercase)
//         matching the actual folder names on case-sensitive file systems (Linux/Vite).
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import ScrollToTop from "./components/ScrollToTop";
import ForgotPassword from "./components/ForgotPassword";
import Kids from "./pages/Kids";
import Adults from "./pages/Adults";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetails";
import OrderHistory from "./pages/OrderHistory";

const noFooterRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/checkout",
  "/order-confirmation",
];

function AppLayout() {
  const location = useLocation();
  const hideFooter = noFooterRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/adults" element={<Adults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/order-history" element={<OrderHistory/>}/>
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

export default AppLayout;
