import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";
import { useStyleQuiz } from "../context/StyleQuizContext";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import StyleQuizModal from "../components/StyleQuizModal";
import HeroSection from "../components/HeroSection";
import CategorySplit from "../components/CategorySplit";

// ── Recommendation logic — ensures variety, no repeats ──
const vibeKeywords = {
  casual:  ["t-shirt", "hoodie", "joggers", "shorts", "sweatshirt", "polo"],
  sporty:  ["joggers", "tracksuit", "hoodie", "shorts", "sneakers"],
  elegant: ["dress", "blazer", "heels", "cardigan", "blouse", "fragrance"],
};

function getRecommendations(answers) {
  let pool = [...products];

  // Filter by who the quiz is for
  if (answers.whoFor && answers.whoFor !== "both")
    pool = pool.filter((p) => p.category === answers.whoFor);

  // Filter by vibe
  if (answers.vibe && vibeKeywords[answers.vibe]) {
    const kws = vibeKeywords[answers.vibe];
    const vibeFiltered = pool.filter((p) =>
      kws.some((kw) => p.name.toLowerCase().includes(kw))
    );
    if (vibeFiltered.length >= 4) pool = vibeFiltered;
  }

  // Filter by budget
  if (answers.budget === "budget")       pool = pool.filter((p) => p.price < 20);
  else if (answers.budget === "mid")     pool = pool.filter((p) => p.price >= 20 && p.price < 50);
  else if (answers.budget === "premium") pool = pool.filter((p) => p.price >= 50);

  if (pool.length < 4) pool = [...products];

  // ── Ensure variety — pick from different departments ──
  const seen = new Set();
  const varied = [];
  // First pass — one per department
  for (const p of pool) {
    if (!seen.has(p.department) && varied.length < 8) {
      seen.add(p.department);
      varied.push(p);
    }
  }
  // Second pass — fill remaining slots if needed
  if (varied.length < 8) {
    for (const p of pool) {
      if (!varied.find((v) => v.id === p.id) && varied.length < 8) {
        varied.push(p);
      }
    }
  }
  return varied;
}

// ── Handpicked New Arrivals — diverse, one per category ──
const newArrivalIds = [
  375, // Unisex footwear
  267, // Women's Orange Bikini
  254, // D&G Perfume
  48,  // Boys Flannel Shirt
  228, // Gold Lipstick Set
  101, // Baby Moses Basket
  124, // Kids Dark Backpack
  38,  // Girls Coral Dress
];
const newArrivals = newArrivalIds
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean);

// ── Featured categories ──
const featuredCategories = [
  { label: "Girls Clothing",  route: "/kids?dept=clothing&gender=female",    img: "/images/kids/clothing/female/dress2.jpg",        tag: "Kids"   },
  { label: "Boys Clothing",   route: "/kids?dept=clothing&gender=male",      img: "/images/kids/clothing/male/jacket1.jpg",          tag: "Kids"   },
  { label: "Women's Shoes",   route: "/adults?dept=shoes&gender=female",     img: "/images/adults/female/shoes/heels2.jpg",          tag: "Adults" },
  { label: "Women's Bags",    route: "/adults?dept=bags&gender=female",      img: "/images/adults/female/bags/handbag1.jpg",         tag: "Adults" },
  { label: "Men's Clothing",  route: "/adults?dept=clothing&gender=male",    img: "/images/adults/male/clothing/blazer2.jpg",        tag: "Adults" },
  { label: "Toys & Play",     route: "/kids?dept=toys&gender=unisex",        img: "/images/kids/toys/toys1.jpg",                    tag: "Kids"   },
  { label: "Nursery",         route: "/kids?dept=nursery&gender=unisex",     img: "/images/kids/nursery/nursery4.jpg",              tag: "Kids"   },
  { label: "Fragrances",      route: "/adults?dept=fragrance&gender=female", img: "/images/adults/female/fragrance/perfume3.jpg",   tag: "Adults" },
];

function Home() {
  const navigate = useNavigate();
  const { currentUser }                     = useAuth();
  const { recentIds }                       = useRecentlyViewed();
  const { answers, quizStatus, retakeQuiz } = useStyleQuiz();

  const recentProducts     = recentIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);
  const showQuiz           = quizStatus === "unseen";
  const hasRecommendations = quizStatus === "completed";
  const recommended        = hasRecommendations ? getRecommendations(answers) : [];

  return (
    <>
      <style>{`
        .home-page { background: #faf8f4; }

        /* ── Section headers ── */
        .sh-section-head {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }
        .sh-section-title {
          font-size: 1.6rem; font-weight: 800;
          color: #0f1623; letter-spacing: -0.02em;
        }
        .sh-section-title span { color: #c49b3c; }
        .sh-see-all {
          font-size: 0.82rem; font-weight: 700;
          color: #c49b3c; text-decoration: none;
          border: 1.5px solid #c49b3c;
          padding: 7px 18px; border-radius: 100px;
          transition: background 0.2s, color 0.2s;
          background: none; cursor: pointer;
        }
        .sh-see-all:hover { background: #c49b3c; color: #fff; }

        /* ── New Arrivals ── */
        .sh-new-arrivals { padding: 60px 5vw 40px; }

        /* ── Featured Categories ── */
        .sh-featured { padding: 40px 5vw 60px; background: #f0ede6; }
        .sh-featured-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .sh-feat-card {
          position: relative; border-radius: 16px;
          overflow: hidden; cursor: pointer;
          aspect-ratio: 3/4;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .sh-feat-card:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(0,0,0,0.14); }
        .sh-feat-card img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.4s ease;
        }
        .sh-feat-card:hover img { transform: scale(1.07); }
        .sh-feat-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,16,32,0.85) 0%, rgba(10,16,32,0.1) 55%, transparent 100%);
          display: flex; flex-direction: column;
          justify-content: flex-end; padding: 14px;
        }
        .sh-feat-tag {
          font-size: 0.58rem; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #c49b3c; margin-bottom: 3px;
        }
        .sh-feat-label {
          font-size: 0.88rem; font-weight: 700;
          color: #f0ede6; line-height: 1.2;
        }
        .sh-feat-arrow {
          margin-top: 5px; font-size: 0.72rem;
          color: rgba(240,237,230,0.5);
          transition: color 0.2s, transform 0.2s;
        }
        .sh-feat-card:hover .sh-feat-arrow {
          color: #c49b3c; transform: translateX(4px);
        }

        /* ── Recommended ── */
        .sh-recommended { padding: 60px 5vw; background: #f0ede6; }

        /* ── Recently Viewed ── */
        .sh-recently { padding: 60px 5vw; }

        @media (max-width: 900px) {
          .sh-featured-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .sh-featured-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .sh-section-title { font-size: 1.3rem; }
        }
      `}</style>

      <div className="home-page">
        {showQuiz && <StyleQuizModal />}

        {/* 1. Hero */}
        <HeroSection user={currentUser} />

        {/* 2. New Arrivals — handpicked diverse products */}
        <section className="sh-new-arrivals">
          <div className="sh-section-head">
            <h2 className="sh-section-title">New <span>Arrivals</span></h2>
            <Link to="/kids" className="sh-see-all">See All →</Link>
          </div>
          <div className="product-grid">
            {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* 3. Shop by Category */}
        <section className="sh-featured">
          <div className="sh-section-head">
            <h2 className="sh-section-title">Shop by <span>Category</span></h2>
          </div>
          <div className="sh-featured-grid">
            {featuredCategories.map((cat) => (
              <div key={cat.label} className="sh-feat-card" onClick={() => navigate(cat.route)}>
                <img src={cat.img} alt={cat.label} />
                <div className="sh-feat-overlay">
                  <span className="sh-feat-tag">{cat.tag}</span>
                  <span className="sh-feat-label">{cat.label}</span>
                  <span className="sh-feat-arrow">Shop now →</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Editorial Split — Kids vs Adults */}
        <CategorySplit />

        {/* 5. Recommended For You */}
        {hasRecommendations && (
          <section className="sh-recommended">
            <div className="sh-section-head">
              <h2 className="sh-section-title">Recommended <span>For You</span></h2>
              <button className="sh-see-all" onClick={retakeQuiz}>Retake Quiz</button>
            </div>
            <div className="product-grid">
              {recommended.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}

        {/* 6. Recently Viewed */}
        {recentProducts.length > 0 && (
          <section className="sh-recently">
            <div className="sh-section-head">
              <h2 className="sh-section-title">Recently <span>Viewed</span></h2>
            </div>
            <div className="product-grid">
              {recentProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default Home;
