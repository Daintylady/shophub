import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import products from "../data/products.json";

const kidsCategories = [
  { label: "Clothing",  route: "/kids?dept=clothing&gender=female" },
  { label: "Footwear",  route: "/kids?dept=footwear&gender=female" },
  { label: "Bags",      route: "/kids?dept=bags"                   },
  { label: "Toys",      route: "/kids?dept=toys"                   },
  { label: "Nursery",   route: "/kids?dept=nursery"                },
  { label: "Baby Care", route: "/kids?dept=babycare"               },
  { label: "Feeding",   route: "/kids?dept=feeding"                },
  { label: "Gift Sets", route: "/kids?dept=giftsets"               },
];

const adultsCategories = [
  { label: "Clothing",  route: "/adults?dept=clothing&gender=female"    },
  { label: "Shoes",     route: "/adults?dept=shoes&gender=female"       },
  { label: "Bags",      route: "/adults?dept=bags&gender=female"        },
  { label: "Beauty",    route: "/adults?dept=beauty&gender=female"      },
  { label: "Skincare",  route: "/adults?dept=skincare&gender=female"    },
  { label: "Fragrance", route: "/adults?dept=fragrance&gender=female"   },
  { label: "Jewelry",   route: "/adults?dept=accessories&gender=female" },
  { label: "Grooming",  route: "/adults?dept=grooming&gender=male"      },
];

/* ─── Global Search Overlay ─────────────────────────────────── */
function GlobalSearch({ onClose }) {
  const navigate = useNavigate();
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function handleInput(val) {
    setQuery(val);
    if (val.trim().length < 2) { setResults([]); return; }
    const t = val.trim().toLowerCase();
    const found = products
      .filter((p) => p.name.toLowerCase().includes(t))
      .slice(0, 8);
    setResults(found);
  }

  function handleSelect(p) {
    const route = p.category === "kids"
      ? `/kids?dept=${p.department}&gender=${p.gender}`
      : `/adults?dept=${p.department}&gender=${p.gender}`;
    navigate(route);
    onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (results.length > 0) handleSelect(results[0]);
  }

  return (
    <>
      <style>{`
        .sh-search-overlay {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(10,16,32,0.75);
          backdrop-filter: blur(6px);
          display: flex; flex-direction: column;
          align-items: center; padding-top: 80px;
          animation: overlayIn 0.2s ease;
        }
        @keyframes overlayIn { from { opacity:0; } to { opacity:1; } }
        .sh-search-box {
          width: 100%; max-width: 640px;
          background: #fff; border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.35);
          animation: boxIn 0.25s cubic-bezier(0.22,1,0.36,1);
          margin: 0 16px;
        }
        @keyframes boxIn {
          from { opacity:0; transform:translateY(-16px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        .sh-search-input-row {
          display: flex; align-items: center;
          padding: 18px 20px; gap: 12px;
          border-bottom: 1px solid #f0ede6;
        }
        .sh-search-icon-big { font-size: 1.1rem; color: #aaa; }
        .sh-search-input-global {
          flex: 1; border: none; outline: none;
          font-size: 1.05rem; color: #0f1623;
          background: transparent;
        }
        .sh-search-input-global::placeholder { color: #bbb; }
        .sh-search-close {
          background: none; border: none; cursor: pointer;
          font-size: 1.1rem; color: #aaa; padding: 4px;
          transition: color 0.2s;
        }
        .sh-search-close:hover { color: #0f1623; }
        .sh-search-results { max-height: 400px; overflow-y: auto; }
        .sh-search-result-item {
          display: flex; align-items: center; gap: 14px;
          padding: 12px 20px; cursor: pointer;
          transition: background 0.15s;
          border-bottom: 1px solid #f9f8f6;
        }
        .sh-search-result-item:hover { background: #faf8f4; }
        .sh-result-img {
          width: 46px; height: 46px; border-radius: 10px;
          object-fit: cover; flex-shrink: 0;
          border: 1px solid #f0ede6;
        }
        .sh-result-info { flex: 1; }
        .sh-result-name {
          font-size: 0.88rem; font-weight: 600;
          color: #0f1623; margin-bottom: 2px;
        }
        .sh-result-meta { font-size: 0.72rem; color: #aaa; text-transform: capitalize; }
        .sh-result-price { font-size: 0.88rem; font-weight: 700; color: #c49b3c; }
        .sh-result-tag {
          font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 3px 8px; border-radius: 100px;
          background: rgba(196,155,60,0.1); color: #c49b3c;
        }
        .sh-search-empty {
          padding: 32px 20px; text-align: center;
          font-size: 0.88rem; color: #bbb;
        }
        .sh-search-hint {
          padding: 14px 20px; font-size: 0.75rem; color: #ccc;
          border-top: 1px solid #f0ede6; text-align: center;
        }
      `}</style>

      <div
        className="sh-search-overlay"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="sh-search-box">
          <form onSubmit={handleSubmit}>
            <div className="sh-search-input-row">
              <span className="sh-search-icon-big">🔍</span>
              <input
                ref={inputRef}
                className="sh-search-input-global"
                placeholder="Search kids, adults, bags, shoes, toys…"
                value={query}
                onChange={(e) => handleInput(e.target.value)}
              />
              <button type="button" className="sh-search-close" onClick={onClose}>✕</button>
            </div>
          </form>
          <div className="sh-search-results">
            {query.trim().length >= 2 && results.length === 0 && (
              <div className="sh-search-empty">No products found for "{query}"</div>
            )}
            {results.map((p) => (
              <div key={p.id} className="sh-search-result-item" onClick={() => handleSelect(p)}>
                <img className="sh-result-img" src={p.image} alt={p.name} />
                <div className="sh-result-info">
                  <div className="sh-result-name">{p.name}</div>
                  <div className="sh-result-meta">{p.category} · {p.department}</div>
                </div>
                <span className="sh-result-tag">{p.category}</span>
                <span className="sh-result-price">${p.price}</span>
              </div>
            ))}
          </div>
          {query.trim().length < 2 && (
            <div className="sh-search-hint">Start typing to search across all products…</div>
          )}
        </div>
      </div>
    </>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────── */
function Navbar() {
  const { currentUser, logout } = useAuth();
  const { cartCount }           = useCart();
  const { wishlist }            = useWishlist();
  const navigate                = useNavigate();

  const [shopOpen,   setShopOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShopOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") { setSearchOpen(false); setDrawerOpen(false); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function handleLogout() {
    logout(); navigate("/login");
    setShopOpen(false); setDrawerOpen(false);
  }
  function closeMenu() { setShopOpen(false); }

  return (
    <>
      <style>{`

        /* ══════════════════════════════════════════
           PRODUCT CARD ANIMATION (all screen sizes)
           ══════════════════════════════════════════ */
        @keyframes cardFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .product-card { animation: cardFadeUp 0.45s ease both; }
        .product-card:nth-child(1) { animation-delay: 0.05s; }
        .product-card:nth-child(2) { animation-delay: 0.10s; }
        .product-card:nth-child(3) { animation-delay: 0.15s; }
        .product-card:nth-child(4) { animation-delay: 0.20s; }
        .product-card:nth-child(5) { animation-delay: 0.25s; }
        .product-card:nth-child(6) { animation-delay: 0.30s; }
        .product-card:nth-child(7) { animation-delay: 0.35s; }
        .product-card:nth-child(8) { animation-delay: 0.40s; }
        .product-card:active .product-image {
          transform: scale(1.04);
          transition: transform 0.2s ease;
        }

        /* ══════════════════════════════════════════
           BASE NAVBAR
           ══════════════════════════════════════════ */
        .navbar {
          position: sticky; top: 0; z-index: 1000;
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 0 5vw; height: 64px;
          background: #0f1623;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 2px 20px rgba(0,0,0,0.25);
        }
        .nav-left  { display: flex; align-items: center; gap: 4px; }
        .nav-right { display: flex; align-items: center; gap: 6px; }

        /* ── ShopHub Logo ── */
        .nav-brand-home {
          font-size: 1.25rem; font-weight: 800;
          letter-spacing: -0.02em;
          display: flex; align-items: center;
          padding: 6px 4px;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .nav-brand-home:hover { opacity: 0.85; }
        .nav-brand-home .shop { color: #c49b3c; }
        .nav-brand-home .hub  { color: #4A90D9; }

        /* ── Dropdown arrow button ── */
        .nav-brand-dropdown { position: relative; display: flex; align-items: center; }
        .nav-brand {
          background: none; border: none; cursor: pointer;
          color: rgba(240,237,230,0.5);
          font-size: 0.75rem;
          display: flex; align-items: center;
          padding: 6px 4px; transition: color 0.2s;
        }
        .nav-brand:hover { color: #c49b3c; }
        .dropdown-arrow {
          font-size: 0.75rem;
          transition: transform 0.2s;
          display: inline-block;
        }
        .dropdown-arrow.open { transform: rotate(180deg); }

        /* ── Mega dropdown menu ── */
        .nav-mega {
          position: absolute; top: calc(100% + 12px); left: 0;
          width: 480px;
          background: #fff; border-radius: 18px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
          padding: 24px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0 24px;
          animation: dropIn 0.2s cubic-bezier(0.22,1,0.36,1);
          z-index: 100;
        }
        @keyframes dropIn {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .nav-mega-col h4 {
          font-size: 0.68rem; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #c49b3c; margin-bottom: 12px;
          padding-bottom: 8px; border-bottom: 1px solid #f0ede6;
        }
        .nav-mega-col a {
          display: block; padding: 7px 0;
          font-size: 0.84rem; font-weight: 500;
          color: #444; text-decoration: none;
          transition: color 0.15s, padding-left 0.15s;
          border-radius: 6px;
        }
        .nav-mega-col a:hover { color: #0f1623; padding-left: 6px; }
        .nav-mega-footer {
          grid-column: 1 / -1;
          display: flex; gap: 10px;
          margin-top: 16px; padding-top: 16px;
          border-top: 1px solid #f0ede6;
        }
        .nav-mega-cta {
          flex: 1; text-align: center; padding: 10px;
          border-radius: 10px; font-size: 0.82rem; font-weight: 700;
          text-decoration: none; transition: opacity 0.2s;
        }
        .nav-mega-cta-kids {
          background: linear-gradient(135deg, #f8a4c8, #f06292); color: #fff;
        }
        .nav-mega-cta-adults {
          background: linear-gradient(135deg, #1a2540, #0f1623); color: #f0ede6;
        }
        .nav-mega-cta:hover { opacity: 0.85; }

        /* ── Search pill ── */
        .nav-search-btn {
          display: flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 100px; padding: 7px 14px;
          color: rgba(240,237,230,0.5);
          font-size: 0.82rem; cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .nav-search-btn:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(196,155,60,0.3); color: #f0ede6;
        }
        .nav-search-shortcut {
          font-size: 0.65rem;
          background: rgba(255,255,255,0.08);
          padding: 2px 6px; border-radius: 4px;
          color: rgba(240,237,230,0.3);
        }

        /* ── Icon buttons (Wishlist / Cart) ── */
        .nav-icon-btn {
          position: relative;
          display: flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px; padding: 7px 14px;
          color: rgba(240,237,230,0.7);
          font-size: 0.82rem; font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .nav-icon-btn:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.16); color: #f0ede6;
        }
        .nav-badge {
          position: absolute; top: -6px; right: -6px;
          min-width: 18px; height: 18px;
          background: linear-gradient(135deg, #c49b3c, #e8c55a);
          color: #0f1623; font-size: 0.62rem; font-weight: 800;
          border-radius: 100px; padding: 0 4px;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid #0f1623;
          animation: badgePop 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes badgePop {
          from { transform: scale(0); } to { transform: scale(1); }
        }
        .nav-badge.zero { display: none; }

        /* ── Greeting ── */
        .nav-greeting {
          font-size: 0.82rem; color: rgba(240,237,230,0.5);
          padding: 0 4px; white-space: nowrap;
        }
        .nav-greeting span { color: #c49b3c; font-weight: 700; }

        /* ── Orders button ── */
        .nav-orders-btn {
          display: flex; align-items: center; gap: 5px;
          background: rgba(196,155,60,0.10);
          border: 1px solid rgba(196,155,60,0.25);
          border-radius: 100px; padding: 7px 14px;
          color: #c49b3c; font-size: 0.82rem; font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .nav-orders-btn:hover {
          background: rgba(196,155,60,0.20);
          border-color: rgba(196,155,60,0.45);
        }

        /* ── Logout ── */
        .nav-logout-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 100px; padding: 7px 14px;
          color: rgba(240,237,230,0.6); font-size: 0.82rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .nav-logout-btn:hover {
          background: rgba(220,60,60,0.15);
          color: #ff6b6b; border-color: rgba(220,60,60,0.2);
        }

        /* ── Login / Signup ── */
        .nav-login-link {
          font-size: 0.82rem; color: rgba(240,237,230,0.6);
          text-decoration: none; padding: 7px 10px; transition: color 0.2s;
        }
        .nav-login-link:hover { color: #f0ede6; }
        .nav-signup-btn {
          background: linear-gradient(135deg, #c49b3c, #e8c55a);
          color: #0f1623; font-size: 0.82rem; font-weight: 800;
          padding: 8px 16px; border-radius: 100px;
          text-decoration: none; transition: opacity 0.2s;
        }
        .nav-signup-btn:hover { opacity: 0.85; }

        /* ── Hamburger (hidden on desktop) ── */
        .mobile-menu-btn {
          display: none;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px; padding: 7px 13px;
          color: #f0ede6; font-size: 1rem; cursor: pointer;
          transition: background 0.2s;
        }
        .mobile-menu-btn:hover { background: rgba(255,255,255,0.12); }

        /* ── Slide-in drawer ── */
        .drawer-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 3000;
          animation: overlayFade 0.2s ease;
        }
        @keyframes overlayFade { from { opacity:0; } to { opacity:1; } }
        .drawer {
          position: fixed; top: 0; right: 0;
          width: 72vw; max-width: 280px; height: 100%;
          background: #0f1623;
          border-left: 1px solid rgba(255,255,255,0.08);
          box-shadow: -12px 0 50px rgba(0,0,0,0.5);
          z-index: 3001;
          display: flex; flex-direction: column;
          padding: 24px 20px;
          animation: drawerSlide 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes drawerSlide {
          from { transform: translateX(100%); }
          to   { transform: translateX(0);    }
        }
        .drawer-header {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 24px;
        }
        .drawer-brand {
          font-size: 1.1rem; font-weight: 800;
          text-decoration: none;
        }
        .drawer-brand .shop { color: #c49b3c; }
        .drawer-brand .hub  { color: #4A90D9; }
        .drawer-close-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 100px; padding: 5px 10px;
          color: rgba(240,237,230,0.6); font-size: 0.9rem; cursor: pointer;
        }
        .drawer-user {
          background: rgba(196,155,60,0.08);
          border: 1px solid rgba(196,155,60,0.18);
          border-radius: 12px; padding: 14px 16px;
          margin-bottom: 20px;
          font-size: 0.85rem; color: rgba(240,237,230,0.6);
        }
        .drawer-user strong {
          color: #c49b3c; font-size: 1rem;
          display: block; margin-top: 2px;
        }
        .drawer-nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
        .drawer-link {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 14px; border-radius: 12px;
          color: rgba(240,237,230,0.8); text-decoration: none;
          font-size: 0.9rem; font-weight: 600;
          transition: background 0.2s, color 0.2s;
        }
        .drawer-link:hover { background: rgba(255,255,255,0.06); color: #f0ede6; }
        .drawer-link-icon { font-size: 1.1rem; width: 24px; text-align: center; }
        .drawer-badge {
          margin-left: auto;
          background: linear-gradient(135deg, #c49b3c, #e8c55a);
          color: #0f1623; font-size: 0.65rem; font-weight: 800;
          padding: 2px 7px; border-radius: 100px;
        }
        .drawer-divider {
          height: 1px; background: rgba(255,255,255,0.07); margin: 12px 0;
        }
        .drawer-logout-btn {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 14px; border-radius: 12px;
          background: none; border: 1px solid rgba(220,60,60,0.2);
          color: #ff6b6b; font-size: 0.9rem; font-weight: 600;
          cursor: pointer; transition: background 0.2s;
          width: 100%; margin-top: 8px;
        }
        .drawer-logout-btn:hover { background: rgba(220,60,60,0.10); }

        /* ══════════════════════════════════════════
           RESPONSIVE — tablet / phone (≤ 768px)
           ══════════════════════════════════════════ */
        @media (max-width: 768px) {
          .navbar { height: 56px; }
          .nav-greeting,
          .nav-orders-btn,
          .nav-logout-btn,
          .nav-search-label,
          .nav-search-shortcut { display: none; }
          .nav-wishlist-label  { display: none; }
          .mobile-menu-btn     { display: flex; align-items: center; }
          .nav-mega            { width: 320px; }
        }

        /* ══════════════════════════════════════════
           RESPONSIVE — small phones (≤ 480px)
           ══════════════════════════════════════════ */
        @media (max-width: 480px) {
          .navbar     { padding: 0 4vw; }
          .nav-mega   { left: -10px; width: 260px; grid-template-columns: 1fr; }
          .nav-wishlist-btn  { display: none; }
          .nav-cart-label    { display: none; }
          .nav-login-link    { padding: 7px 6px; font-size: 0.78rem; }
          .nav-signup-btn    { padding: 7px 12px; font-size: 0.78rem; }
        }
      `}</style>

      {/* ════════════════════════════════════════════
          NAVBAR JSX
          ════════════════════════════════════════════ */}
      <nav className="navbar">

        {/* LEFT — logo + dropdown arrow */}
        <div className="nav-left">
          {/* Clicking ShopHub goes to home */}
          <Link to="/" className="nav-brand-home">
            <span className="shop">Shop</span>
            <span className="hub">Hub</span>
          </Link>

          {/* Arrow ▾ opens Kids / Adults dropdown */}
          <div className="nav-brand-dropdown" ref={dropdownRef}>
            <button className="nav-brand" onClick={() => setShopOpen((o) => !o)}>
              <span className={`dropdown-arrow ${shopOpen ? "open" : ""}`}>▾</span>
            </button>

            {shopOpen && (
              <div className="nav-mega">
                <div className="nav-mega-col">
                  <h4>Kids</h4>
                  {kidsCategories.map((c) => (
                    <Link key={c.label} to={c.route} onClick={closeMenu}>{c.label}</Link>
                  ))}
                </div>
                <div className="nav-mega-col">
                  <h4>Adults</h4>
                  {adultsCategories.map((c) => (
                    <Link key={c.label} to={c.route} onClick={closeMenu}>{c.label}</Link>
                  ))}
                </div>
                <div className="nav-mega-footer">
                  <Link to="/kids"   className="nav-mega-cta nav-mega-cta-kids"   onClick={closeMenu}>Shop All Kids →</Link>
                  <Link to="/adults" className="nav-mega-cta nav-mega-cta-adults" onClick={closeMenu}>Shop All Adults →</Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CENTRE — search */}
        <button className="nav-search-btn" onClick={() => setSearchOpen(true)}>
          <span>🔍</span>
          <span className="nav-search-label">Search anything…</span>
          <span className="nav-search-shortcut">⌘K</span>
        </button>

        {/* RIGHT — actions */}
        <div className="nav-right">

          {/* Wishlist */}
          <Link to="/wishlist" className="nav-icon-btn nav-wishlist-btn">
            🤍 <span className="nav-wishlist-label">Wishlist</span>
            {wishlist.length > 0 && (
              <span className={`nav-badge ${wishlist.length === 0 ? "zero" : ""}`}>
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="nav-icon-btn">
            🛒 <span className="nav-cart-label">Cart</span>
            {cartCount > 0 && (
              <span className={`nav-badge ${cartCount === 0 ? "zero" : ""}`}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* Desktop only — orders, greeting, logout */}
          {currentUser ? (
            <>
              <Link to="/order-history" className="nav-orders-btn">
                📦 <span>My Orders</span>
              </Link>
              <span className="nav-greeting">
                Hi, <span>{currentUser.username}</span>
              </span>
              <button className="nav-logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login"  className="nav-login-link">Log In</Link>
              <Link to="/signup" className="nav-signup-btn">Sign Up</Link>
            </>
          )}

          {/* Hamburger — mobile only */}
          <button className="mobile-menu-btn" onClick={() => setDrawerOpen(true)}>
            ☰
          </button>
        </div>
      </nav>

      {/* ── Slide-in mobile drawer ── */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>

            <div className="drawer-header">
              <Link to="/" className="drawer-brand" onClick={() => setDrawerOpen(false)}>
                <span className="shop">Shop</span>
                <span className="hub">Hub</span>
              </Link>
              <button className="drawer-close-btn" onClick={() => setDrawerOpen(false)}>
                ✕ Close
              </button>
            </div>

            {currentUser && (
              <div className="drawer-user">
                Welcome back,
                <strong>{currentUser.username}</strong>
              </div>
            )}

            <div className="drawer-nav">
              <Link to="/wishlist" className="drawer-link" onClick={() => setDrawerOpen(false)}>
                <span className="drawer-link-icon">🤍</span>
                Wishlist
                {wishlist.length > 0 && (
                  <span className="drawer-badge">{wishlist.length}</span>
                )}
              </Link>

              <Link to="/cart" className="drawer-link" onClick={() => setDrawerOpen(false)}>
                <span className="drawer-link-icon">🛒</span>
                Cart
                {cartCount > 0 && (
                  <span className="drawer-badge">{cartCount}</span>
                )}
              </Link>

              {currentUser && (
                <>
                  <Link to="/order-history" className="drawer-link" onClick={() => setDrawerOpen(false)}>
                    <span className="drawer-link-icon">📦</span>
                    My Orders
                  </Link>
                  <div className="drawer-divider" />
                  <button className="drawer-logout-btn" onClick={handleLogout}>
                    <span className="drawer-link-icon">🚪</span>
                    Log Out
                  </button>
                </>
              )}

              {!currentUser && (
                <>
                  <div className="drawer-divider" />
                  <Link to="/login" className="drawer-link" onClick={() => setDrawerOpen(false)}>
                    <span className="drawer-link-icon">🔑</span> Log In
                  </Link>
                  <Link to="/signup" className="drawer-link" onClick={() => setDrawerOpen(false)}>
                    <span className="drawer-link-icon">✨</span> Sign Up
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ── Global search overlay ── */}
      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
    </>
  );
}

export default Navbar;

