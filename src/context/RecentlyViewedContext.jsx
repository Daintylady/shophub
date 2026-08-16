import { createContext, useContext, useState, useEffect } from "react";

const RecentlyViewedContext = createContext();
const MAX_RECENT = 8;

export function RecentlyViewedProvider({ children }) {
  const [recentIds, setRecentIds] = useState(() => {
    const saved = localStorage.getItem("recentlyViewed");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("recentlyViewed", JSON.stringify(recentIds));
  }, [recentIds]);

  function markViewed(productId) {
    setRecentIds((prev) => {
      const withoutThis = prev.filter((id) => id !== productId);
      return [productId, ...withoutThis].slice(0, MAX_RECENT);
    });
  }

  return (
    <RecentlyViewedContext.Provider value={{ recentIds, markViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  return useContext(RecentlyViewedContext);
}