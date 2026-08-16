import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";

const BATCH_SIZE = 12;

const departments = [
  { key: "clothing",    label: "Clothing",    icon: "👕", hasGender: true  },
  { key: "footwear",    label: "Footwear",    icon: "👟", hasGender: true  },
  { key: "accessories", label: "Accessories", icon: "🕶️", hasGender: false },
  { key: "bags",        label: "Bags",        icon: "🎒", hasGender: false },
  { key: "bath",        label: "Bath",        icon: "🛁", hasGender: false },
  { key: "nursery",     label: "Nursery",     icon: "🛏️", hasGender: false },
  { key: "feeding",     label: "Feeding",     icon: "🍼", hasGender: false },
  { key: "toys",        label: "Toys",        icon: "🧸", hasGender: false },
  { key: "babycare",    label: "Baby Care",   icon: "🧴", hasGender: false },
  { key: "giftsets",    label: "Gift Sets",   icon: "🎁", hasGender: false },
];

const validDepts   = departments.map((d) => d.key);
const validGenders = ["female", "male", "unisex"];

// Back to top button component
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <style>{`
        .sh-back-top {
          position: fixed;
          bottom: 32px;
          right: 28px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c49b3c, #e8c55a);
          color: #0f1623;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 18px rgba(196,155,60,0.45);
          z-index: 999;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .sh-back-top.hidden  { opacity: 0; transform: translateY(16px); pointer-events: none; }
        .sh-back-top.visible { opacity: 1; transform: translateY(0); }
        .sh-back-top:hover   { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(196,155,60,0.6); }
      `}</style>
      <button
        className={`sh-back-top ${show ? "visible" : "hidden"}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}

export default function Kids() {
  const location = useLocation();
  const params     = new URLSearchParams(location.search);
  const urlDept    = params.get("dept");
  const urlGender  = params.get("gender");

  const [activeDept,   setActiveDept]   = useState(validDepts.includes(urlDept) ? urlDept : "clothing");
  const [activeGender, setActiveGender] = useState(validGenders.includes(urlGender) ? urlGender : "female");
  const [activeType,   setActiveType]   = useState("All");
  const [activeSize,   setActiveSize]   = useState("All");
  const [searchInput,  setSearchInput]  = useState("");
  const [searchTerm,   setSearchTerm]   = useState("");
  const [suggestions,  setSuggestions]  = useState([]);
  const [showSug,      setShowSug]      = useState(false);
  const [sortOrder,    setSortOrder]    = useState("default");
  const [minPrice,     setMinPrice]     = useState("");
  const [maxPrice,     setMaxPrice]     = useState("");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [drawerOpen,   setDrawerOpen]   = useState(false);
  const sentinelRef = useRef(null);
  const searchRef   = useRef(null);

  // Re-read URL params when location changes
  useEffect(() => {
    const p   = new URLSearchParams(location.search);
    const dep = p.get("dept");
    const gen = p.get("gender");
    if (dep && validDepts.includes(dep))   setActiveDept(dep);
    if (gen && validGenders.includes(gen)) setActiveGender(gen);
  }, [location.search]);

  const isSearching = searchTerm.trim().length > 0;
  const currentDept = departments.find((d) => d.key === activeDept);

  // When searching: show ALL kids products matching the term
  // When not searching: filter by dept and gender as normal
  let base = isSearching
    ? products.filter((p) => p.category === "kids")
    : products.filter((p) => p.category === "kids" && p.department === activeDept);
  if (!isSearching && currentDept.hasGender)
    base = base.filter((p) => p.gender === activeGender);

  const availableTypes = ["All", ...[...new Set(base.map((p) => p.type))].sort()];
  const availableSizes = ["All", ...[...new Set(base.flatMap((p) => p.sizes || []))].sort()];

  let filtered = [...base];
  if (!isSearching && activeType !== "All") filtered = filtered.filter((p) => p.type === activeType);
  if (!isSearching && activeSize !== "All") filtered = filtered.filter((p) => (p.sizes || []).includes(activeSize));

  // Apply search filter across ALL kids products
  if (isSearching) {
    const t = searchTerm.trim().toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(t));
  }

  if (minPrice !== "") filtered = filtered.filter((p) => p.price >= Number(minPrice));
  if (maxPrice !== "") filtered = filtered.filter((p) => p.price <= Number(maxPrice));

  const total = filtered.length;

  // ── SORT — always sort by ID by default so gift1 shows before gift2 etc. ──
  if (sortOrder === "low-high") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else {
    // Default: sort by ID so products always appear in correct sequence
    filtered = [...filtered].sort((a, b) => a.id - b.id);
  }

  function handleSearchInput(val) {
    setSearchInput(val);
    if (val.trim().length < 2) { setSuggestions([]); setShowSug(false); return; }
    const t = val.trim().toLowerCase();
    // Suggestions search across ALL kids departments
    const matches = [...new Set(
      products
        .filter((p) => p.category === "kids" && p.name.toLowerCase().includes(t))
        .map((p) => p.name)
    )].slice(0, 6);
    setSuggestions(matches);
    setShowSug(matches.length > 0);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearchTerm(searchInput);
    setShowSug(false);
  }

  function clearSearch() {
    setSearchInput("");
    setSearchTerm("");
    setSuggestions([]);
    setShowSug(false);
  }

  function pickSuggestion(name) {
    setSearchInput(name);
    setSearchTerm(name);
    setSuggestions([]);
    setShowSug(false);
  }

  function clearAll() {
    setActiveType("All"); setActiveSize("All");
    setMinPrice(""); setMaxPrice(""); setSortOrder("default");
    setDrawerOpen(false);
  }

  const activeFilterCount = [
    activeSize !== "All", minPrice !== "", maxPrice !== "", sortOrder !== "default"
  ].filter(Boolean).length;

  useEffect(() => { setActiveType("All"); setActiveSize("All"); }, [activeDept, activeGender]);
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [activeDept, activeGender, activeType, activeSize, searchTerm, sortOrder, minPrice, maxPrice]);

  useEffect(() => {
    const el = sentinelRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisibleCount((p) => Math.min(p + BATCH_SIZE, filtered.length));
    }, { rootMargin: "200px" });
    obs.observe(el); return () => obs.disconnect();
  }, [filtered.length]);

  useEffect(() => {
    const h = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSug(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="category-page">

      {/* ── Search ── */}
      <div className="sh-search-wrap" ref={searchRef}>
        <form className="sh-search-form" onSubmit={handleSearchSubmit}>
          <span className="sh-search-icon">🔍</span>
          <input
            className="sh-search-input"
            placeholder="Search all kids products…"
            value={searchInput}
            onChange={(e) => handleSearchInput(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSug(true)}
          />
          {searchInput && (
            <button type="button" className="sh-search-clear" onClick={clearSearch}>✕</button>
          )}
        </form>
        {showSug && (
          <ul className="sh-suggestions">
            {suggestions.map((s) => (
              <li key={s} onClick={() => pickSuggestion(s)}>{s}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Search results banner */}
      {isSearching && (
        <div className="sh-search-banner">
          🔍 Showing results for <strong>"{searchTerm}"</strong> across all kids categories
          <button className="sh-search-banner-clear" onClick={clearSearch}>✕ Clear</button>
        </div>
      )}

      {/* ── Sticky nav — hidden during search ── */}
      {!isSearching && (
        <div className="sh-sticky">
          <div className="sh-dept-row">
            {departments.map((d) => (
              <button
                key={d.key}
                className={`sh-dept-btn ${activeDept === d.key ? "active" : ""}`}
                onClick={() => {
                  setActiveDept(d.key);
                  setActiveType("All");
                  setActiveSize("All");
                }}
              >
                <span>{d.icon}</span>
                <span>{d.label}</span>
              </button>
            ))}
          </div>

          <div className="sh-row2">
            {currentDept.hasGender && (
              <div className="sh-gender-pills">
                {["female", "male", "unisex"].map((g) => (
                  <button
                    key={g}
                    className={`sh-pill ${activeGender === g ? "active" : ""}`}
                    onClick={() => setActiveGender(g)}
                  >
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
            )}
            <div className="sh-type-scroll">
              {availableTypes.map((t) => (
                <button
                  key={t}
                  className={`sh-chip ${activeType === t ? "active" : ""}`}
                  onClick={() => setActiveType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <button className="sh-filter-btn" onClick={() => setDrawerOpen(!drawerOpen)}>
              ⚙️ Filter {activeFilterCount > 0 && (
                <span className="sh-badge">{activeFilterCount}</span>
              )}
            </button>
          </div>

          {drawerOpen && (
            <div className="sh-drawer">
              {availableSizes.length > 1 && (
                <div className="sh-drawer-section">
                  <span className="sh-drawer-label">Size</span>
                  <div className="sh-size-row">
                    {availableSizes.map((s) => (
                      <button
                        key={s}
                        className={`sh-size-chip ${activeSize === s ? "active" : ""}`}
                        onClick={() => setActiveSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="sh-drawer-section">
                <span className="sh-drawer-label">Price Range</span>
                <div className="sh-price-row">
                  <input
                    type="number"
                    placeholder="Min $"
                    value={minPrice}
                    className="sh-price-input"
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span>–</span>
                  <input
                    type="number"
                    placeholder="Max $"
                    value={maxPrice}
                    className="sh-price-input"
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="sh-drawer-section">
                <span className="sh-drawer-label">Sort By</span>
                <select
                  className="sh-sort"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </div>
              <div className="sh-drawer-actions">
                <button className="sh-apply-btn" onClick={() => setDrawerOpen(false)}>Apply</button>
                {activeFilterCount > 0 && (
                  <button className="sh-clear-btn" onClick={clearAll}>Clear All</button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <p className="sh-count">
        Showing {visible.length} of {total} item{total !== 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="no-results">No items match your filters.</p>
      ) : (
        <>
          <div className="product-grid">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {visibleCount < filtered.length && (
            <div ref={sentinelRef} className="scroll-sentinel">
              <p className="loading-more">Loading more…</p>
            </div>
          )}
        </>
      )}

      <BackToTop />
    </div>
  );
}

