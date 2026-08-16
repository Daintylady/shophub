import { useState, useEffect, useRef } from "react";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";

const BATCH_SIZE = 12;

function CategoryPage({ category, title }) {
  const [activeGender, setActiveGender] = useState("female");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef(null);

  let filtered = products.filter((p) => p.category === category && p.gender === activeGender);

  if (searchTerm.trim()) {
    const term = searchTerm.trim().toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(term));
  }

  if (sortOrder === "low-high") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [activeGender, searchTerm, sortOrder]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filtered.length));
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filtered.length]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="category-page">
      <h1>{title}</h1>

      <div className="gender-tabs">
        <button className={activeGender === "female" ? "tab active" : "tab"} onClick={() => setActiveGender("female")}>Female</button>
        <button className={activeGender === "male" ? "tab active" : "tab"} onClick={() => setActiveGender("male")}>Male</button>
        <button className={activeGender === "unisex" ? "tab active" : "tab"} onClick={() => setActiveGender("unisex")}>Unisex</button>
      </div>

      <div className="filter-bar">
        <input type="text" className="search-input" placeholder="Search this category..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select className="sort-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="no-results">No items match your search.</p>
      ) : (
        <>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasMore && (
            <div ref={sentinelRef} className="scroll-sentinel">
              <p className="loading-more">Loading more...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CategoryPage;