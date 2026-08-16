import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "294+", label: "Products" },
  { value: "2",    label: "Categories" },
  { value: "Fast", label: "Delivery" },
];

const imageSetRoutes = ["/kids", "/adults", "/kids", "/adults"];
const imageSetLabels = ["✨ New in Kids", "✨ New in Adults", "✨ New in Kids", "✨ New in Adults"];

// Each image has: src, alt, position, route to navigate to on click, department
const imageSets = [
  [
    { src: "/images/adults/female/shoes/heels2.jpg",       alt: "Gold Floral Heels",       top: "8%",  left: "58%", width: "140px", rotate: "-8deg",  zIndex: 4, route: "/adults", dept: "shoes",     gender: "female" },
    { src: "/images/adults/female/bags/handbag1.jpg",      alt: "Orange Leather Handbag",  top: "30%", left: "72%", width: "130px", rotate: "6deg",   zIndex: 3, route: "/adults", dept: "bags",      gender: "female" },
    { src: "/images/kids/clothing/female/dress2.jpg",      alt: "Girls Pink Dress",        top: "52%", left: "60%", width: "125px", rotate: "-4deg",  zIndex: 5, route: "/kids",   dept: "clothing",  gender: "female" },
    { src: "/images/adults/female/clothing/blazer1.jpg",   alt: "Camel Blazer",            top: "18%", left: "82%", width: "115px", rotate: "10deg",  zIndex: 2, route: "/adults", dept: "clothing",  gender: "female" },
    { src: "/images/kids/toys/toys1.jpg",                  alt: "Cream Teddy Bear",        top: "62%", left: "78%", width: "110px", rotate: "-12deg", zIndex: 1, route: "/kids",   dept: "toys",      gender: "unisex" },
  ],
  [
    { src: "/images/adults/female/shoes/flats2.jpg",       alt: "Pink Embellished Slides", top: "8%",  left: "58%", width: "140px", rotate: "6deg",   zIndex: 4, route: "/adults", dept: "shoes",     gender: "female" },
    { src: "/images/adults/female/bags/handbag4.jpg",      alt: "Tan Leather Satchel",     top: "30%", left: "72%", width: "130px", rotate: "-8deg",  zIndex: 3, route: "/adults", dept: "bags",      gender: "female" },
    { src: "/images/kids/clothing/male/jacket1.jpg",       alt: "Boys Winter Jacket",      top: "52%", left: "60%", width: "125px", rotate: "5deg",   zIndex: 5, route: "/kids",   dept: "clothing",  gender: "male"   },
    { src: "/images/adults/female/beauty/blush1.jpg",      alt: "Eyeshadow Palette",       top: "18%", left: "82%", width: "115px", rotate: "-10deg", zIndex: 2, route: "/adults", dept: "beauty",    gender: "female" },
    { src: "/images/kids/bags/backpack/backpack3.jpg",      alt: "Pink Floral Backpack",    top: "62%", left: "78%", width: "110px", rotate: "8deg",   zIndex: 1, route: "/kids",   dept: "bags",      gender: "unisex" },
  ],
  [
    { src: "/images/adults/female/clothing/cardigan1.jpg", alt: "Pink Knit Cardigan",      top: "8%",  left: "58%", width: "140px", rotate: "-6deg",  zIndex: 4, route: "/adults", dept: "clothing",  gender: "female" },
    { src: "/images/adults/male/shoes/sneakers2.jpg",      alt: "Brown & White Sneakers",  top: "30%", left: "72%", width: "130px", rotate: "9deg",   zIndex: 3, route: "/adults", dept: "shoes",     gender: "male"   },
    { src: "/images/kids/nursery/nursery4.jpg",            alt: "Baby Soft Blanket",       top: "52%", left: "60%", width: "125px", rotate: "-3deg",  zIndex: 5, route: "/kids",   dept: "nursery",   gender: "unisex" },
    { src: "/images/adults/female/fragrance/perfume3.jpg", alt: "Chanel Eau de Parfum",    top: "18%", left: "82%", width: "115px", rotate: "11deg",  zIndex: 2, route: "/adults", dept: "fragrance", gender: "female" },
    { src: "/images/kids/footwear/female/shoes2.jpg",      alt: "Girls Pink Sandals",      top: "62%", left: "78%", width: "110px", rotate: "-9deg",  zIndex: 1, route: "/kids",   dept: "footwear",  gender: "female" },
  ],
  [
    { src: "/images/adults/male/clothing/blazer2.jpg",     alt: "Rust Orange Blazer",      top: "8%",  left: "58%", width: "140px", rotate: "7deg",   zIndex: 4, route: "/adults", dept: "clothing",  gender: "male"   },
    { src: "/images/adults/female/bags/handbag6.jpg",      alt: "Grey Structured Handbag", top: "30%", left: "72%", width: "130px", rotate: "-5deg",  zIndex: 3, route: "/adults", dept: "bags",      gender: "female" },
    { src: "/images/kids/clothing/unisex/hoodie1.jpg",     alt: "Kids Camel Hoodie",       top: "52%", left: "60%", width: "125px", rotate: "4deg",   zIndex: 5, route: "/kids",   dept: "clothing",  gender: "unisex" },
    { src: "/images/adults/female/shoes/heels5.jpg",       alt: "Red Bow Heels",           top: "18%", left: "82%", width: "115px", rotate: "-11deg", zIndex: 2, route: "/adults", dept: "shoes",     gender: "female" },
    { src: "/images/kids/giftsets/gift3.jpg",              alt: "Baby Gift Box",           top: "62%", left: "78%", width: "110px", rotate: "10deg",  zIndex: 1, route: "/kids",   dept: "giftsets",  gender: "unisex" },
  ],
];

const headlines = [
  "Define You,\nOwn Your Style.",
  "Kids & Adults,\nOne Closet.",
  "Shop Bold.\nShop Smart.",
];

// Individual floating image card with staggered fade-up + hover overlay + click nav
function FloatCard({ img, index, navigate }) {
  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(false);
    const t = setTimeout(() => setEntered(true), index * 100);
    return () => clearTimeout(t);
  }, [img.src, index]);

  function handleClick() {
    navigate(`${img.route}?dept=${img.dept}&gender=${img.gender}`);
  }

  return (
    <div
      className="sh-float-img"
      style={{
        top: img.top,
        left: img.left,
        width: img.width,
        height: img.width,
        zIndex: hovered ? 20 : img.zIndex,
        "--rot": `rotate(${img.rotate})`,
        transform: entered
          ? `rotate(${img.rotate}) translateY(0px)`
          : `rotate(${img.rotate}) translateY(18px)`,
        opacity: entered ? 1 : 0,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <img src={img.src} alt={img.alt} />

      {/* Hover overlay */}
      <div className={`sh-float-overlay ${hovered ? "overlay-in" : ""}`}>
        <span className="sh-float-name">{img.alt}</span>
        <span className="sh-float-cta">View →</span>
      </div>
    </div>
  );
}

export default function HeroSection({ user }) {
  const navigate   = useNavigate();
  const sectionRef = useRef(null);

  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [headVisible,   setHeadVisible]   = useState(true);

  const [layerA,    setLayerA]   = useState(0);
  const [layerB,    setLayerB]   = useState(1);
  const [bVisible,  setBVisible] = useState(false);
  const [activeSet, setActiveSet] = useState(0);

  // Rotating headlines every 3.5s
  useEffect(() => {
    const t = setInterval(() => {
      setHeadVisible(false);
      setTimeout(() => {
        setHeadlineIndex(i => (i + 1) % headlines.length);
        setHeadVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  // Crossfade image sets — Layer B fades in over Layer A, then A updates silently
  useEffect(() => {
    const t = setInterval(() => {
      const next = (layerA + 1) % imageSets.length;
      setLayerB(next);
      setBVisible(true);
      setTimeout(() => {
        setLayerA(next);
        setBVisible(false);
        setActiveSet(next);
      }, 900);
    }, 4500);
    return () => clearInterval(t);
  }, [layerA]);

  // Scroll down past hero
  function handleScroll() {
    if (!sectionRef.current) return;
    window.scrollTo({
      top: sectionRef.current.offsetTop + sectionRef.current.offsetHeight,
      behavior: "smooth",
    });
  }

  return (
    <>
      <style>{`
        .sh-hero {
          position: relative;
          min-height: 92vh;
          background: linear-gradient(135deg, #0f1623 0%, #1a2540 45%, #0d1f3c 100%);
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 0 6vw;
        }
        .sh-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 75% 50%, rgba(196,155,60,0.10) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 80%, rgba(99,130,220,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .sh-hero-orb {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(196,155,60,0.07) 0%, transparent 70%);
          top: -100px; right: 35%;
          animation: orbDrift 8s ease-in-out infinite alternate;
          pointer-events: none;
        }
        @keyframes orbDrift {
          from { transform: translateY(0) scale(1); }
          to   { transform: translateY(40px) scale(1.08); }
        }
        .sh-promo-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          background: linear-gradient(90deg, #c49b3c, #e8c55a, #c49b3c);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
          color: #0f1623;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-align: center;
          padding: 7px 0;
          text-transform: uppercase;
          z-index: 30;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .sh-hero-content {
          position: relative;
          z-index: 10;
          max-width: 520px;
          padding-top: 60px;
        }
        .sh-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(196,155,60,0.12);
          border: 1px solid rgba(196,155,60,0.3);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #c49b3c;
          margin-bottom: 28px;
          animation: fadeSlideUp 0.6s ease both;
        }
        .sh-hero-eyebrow span.dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #c49b3c;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.7); }
        }
        .sh-hero-headline {
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 800;
          line-height: 1.12;
          color: #f0ede6;
          white-space: pre-line;
          margin-bottom: 20px;
          transition: opacity 0.4s ease, transform 0.4s ease;
          letter-spacing: -0.02em;
        }
        .sh-hero-headline.hidden  { opacity: 0; transform: translateY(12px); }
        .sh-hero-headline.visible { opacity: 1; transform: translateY(0); }
        .sh-hero-headline em { font-style: normal; color: #c49b3c; }
        .sh-hero-sub {
          font-size: 1.05rem;
          color: rgba(240,237,230,0.65);
          line-height: 1.7;
          margin-bottom: 36px;
          animation: fadeSlideUp 0.6s 0.2s ease both;
        }
        .sh-hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 48px;
          animation: fadeSlideUp 0.6s 0.3s ease both;
        }
        .sh-cta-primary {
          background: linear-gradient(135deg, #c49b3c, #e8c55a);
          color: #0f1623;
          font-weight: 800;
          font-size: 0.95rem;
          padding: 14px 30px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(196,155,60,0.35);
        }
        .sh-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(196,155,60,0.5); }
        .sh-cta-secondary {
          background: transparent;
          color: #f0ede6;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 14px 30px;
          border-radius: 100px;
          border: 1.5px solid rgba(240,237,230,0.25);
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .sh-cta-secondary:hover { border-color: rgba(240,237,230,0.6); background: rgba(240,237,230,0.05); }
        .sh-hero-stats {
          display: flex;
          gap: 32px;
          animation: fadeSlideUp 0.6s 0.4s ease both;
        }
        .sh-stat { display: flex; flex-direction: column; }
        .sh-stat-value { font-size: 1.6rem; font-weight: 800; color: #c49b3c; line-height: 1; }
        .sh-stat-label { font-size: 0.75rem; color: rgba(240,237,230,0.5); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px; }
        .sh-stat-divider { width: 1px; background: rgba(240,237,230,0.12); align-self: stretch; }

        /* ── Crossfade layers ── */
        .sh-img-layer {
          position: absolute;
          inset: 0;
          transition: opacity 0.9s ease;
        }
        .sh-img-layer.layer-a { opacity: 1; z-index: 1; pointer-events: all; }
        .sh-img-layer.layer-b { opacity: 0; z-index: 2; pointer-events: none; }
        .sh-img-layer.layer-b.b-in { opacity: 1; pointer-events: all; }

        /* ── Floating image card ── */
        .sh-float-img {
          position: absolute;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08);
          transition:
            opacity 0.55s ease,
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.3s ease;
        }
        .sh-float-img:hover {
          box-shadow: 0 28px 70px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(196,155,60,0.4);
        }
        .sh-float-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .sh-float-img:hover img { transform: scale(1.06); }

        /* continuous float bob animations */
        .sh-float-img:nth-child(1) { animation: bob1 6s   ease-in-out infinite; }
        .sh-float-img:nth-child(2) { animation: bob2 7s   ease-in-out infinite; }
        .sh-float-img:nth-child(3) { animation: bob3 5.5s ease-in-out infinite; }
        .sh-float-img:nth-child(4) { animation: bob4 8s   ease-in-out infinite; }
        .sh-float-img:nth-child(5) { animation: bob1 6.5s ease-in-out infinite reverse; }

        @keyframes bob1 { 0%,100% { margin-top: 0;    } 50% { margin-top: -10px; } }
        @keyframes bob2 { 0%,100% { margin-top: 0;    } 50% { margin-top: -14px; } }
        @keyframes bob3 { 0%,100% { margin-top: 0;    } 50% { margin-top: -8px;  } }
        @keyframes bob4 { 0%,100% { margin-top: 0;    } 50% { margin-top: -12px; } }

        /* ── Hover overlay ── */
        .sh-float-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,16,32,0.92) 0%, rgba(10,16,32,0.3) 55%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 10px 10px 10px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.28s ease, transform 0.28s ease;
          pointer-events: none;
        }
        .sh-float-overlay.overlay-in {
          opacity: 1;
          transform: translateY(0);
        }
        .sh-float-name {
          font-size: 0.65rem;
          font-weight: 700;
          color: #f0ede6;
          line-height: 1.3;
          letter-spacing: 0.02em;
          margin-bottom: 3px;
        }
        .sh-float-cta {
          font-size: 0.6rem;
          font-weight: 800;
          color: #c49b3c;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ── New Arrivals badge ── */
        .sh-new-badge {
          position: absolute;
          bottom: 18%;
          left: 56%;
          background: linear-gradient(135deg, #c49b3c, #e8c55a);
          color: #0f1623;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 100px;
          z-index: 30;
          box-shadow: 0 4px 16px rgba(196,155,60,0.4);
          animation: badgePop 2s ease-in-out infinite;
          border: none;
          cursor: pointer;
          pointer-events: all;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .sh-new-badge:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 8px 24px rgba(196,155,60,0.6);
          animation: none;
        }
        @keyframes badgePop {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.05); }
        }

        /* ── Scroll hint ── */
        .sh-scroll-hint {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: rgba(240,237,230,0.45);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          z-index: 30;
          animation: fadeSlideUp 1s 1s ease both;
          cursor: pointer;
          background: none;
          border: none;
          transition: color 0.2s;
        }
        .sh-scroll-hint:hover { color: rgba(196,155,60,0.9); }
        .sh-scroll-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, rgba(196,155,60,0.6), transparent);
          animation: scrollLine 1.8s ease-in-out infinite;
        }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .sh-hero { min-height: 100svh; padding: 0 5vw; align-items: flex-start; padding-top: 80px; }
          .sh-img-layer { display: none; }
          .sh-new-badge { display: none; }
          .sh-hero-content { max-width: 100%; }
          .sh-hero-headline { font-size: 2.2rem; }
          .sh-hero-stats { gap: 20px; }
          .sh-stat-value { font-size: 1.3rem; }
        }
      `}</style>

      <section className="sh-hero" ref={sectionRef}>

        {/* Promo banner */}
        <div className="sh-promo-bar">
          🚚 Free shipping on orders over $50 &nbsp;·&nbsp; New arrivals every week &nbsp;·&nbsp; Kids &amp; Adults, one closet
        </div>

        {/* Drifting orb */}
        <div className="sh-hero-orb" />

        {/* Left content */}
        <div className="sh-hero-content">
          <div className="sh-hero-eyebrow">
            <span className="dot" />
            Kids &amp; Adults, One Closet
          </div>

          <h1 className={`sh-hero-headline ${headVisible ? "visible" : "hidden"}`}>
            {headlines[headlineIndex].split("\n").map((line, i) =>
              i === 0
                ? <span key={i}>{line}<br /></span>
                : <em key={i}>{line}</em>
            )}
          </h1>

          <p className="sh-hero-sub">
            {user?.username
              ? `Welcome back, ${user.username} — pick up where you left off.`
              : "Discover curated fashion for every age. Shop kids and adult collections all in one place."}
          </p>

          <div className="sh-hero-ctas">
            <button className="sh-cta-primary" onClick={() => navigate("/kids")}>
              Shop Kids
            </button>
            <button className="sh-cta-secondary" onClick={() => navigate("/adults")}>
              Shop Adults
            </button>
          </div>

          <div className="sh-hero-stats">
            {stats.map((s, i) => (
              <>
                <div className="sh-stat" key={s.label}>
                  <span className="sh-stat-value">{s.value}</span>
                  <span className="sh-stat-label">{s.label}</span>
                </div>
                {i < stats.length - 1 && <div className="sh-stat-divider" key={`d${i}`} />}
              </>
            ))}
          </div>
        </div>

        {/* ── Layer A — base, always visible ── */}
        <div className="sh-img-layer layer-a">
          {imageSets[layerA].map((img, i) => (
            <FloatCard key={`a-${i}-${layerA}`} img={img} index={i} navigate={navigate} />
          ))}
        </div>

        {/* ── Layer B — fades in on top, then A updates ── */}
        <div className={`sh-img-layer layer-b ${bVisible ? "b-in" : ""}`}>
          {imageSets[layerB].map((img, i) => (
            <FloatCard key={`b-${i}-${layerB}`} img={img} index={i} navigate={navigate} />
          ))}
        </div>

        {/* New Arrivals badge — always on top */}
        <button
          className="sh-new-badge"
          onClick={() => navigate(imageSetRoutes[activeSet])}
        >
          {imageSetLabels[activeSet]}
        </button>

        {/* Scroll down button */}
        <button className="sh-scroll-hint" onClick={handleScroll}>
          <div className="sh-scroll-line" />
          scroll
        </button>

      </section>
    </>
  );
}
