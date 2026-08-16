import { useNavigate } from "react-router-dom";

export default function CategorySplit() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .sh-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
          overflow: hidden;
          position: relative;
        }
        .sh-split-panel {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          align-items: flex-end;
        }
        .sh-split-panel img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
        }
        .sh-split-panel:hover img { transform: scale(1.07); }
        .sh-split-overlay {
          position: absolute; inset: 0; z-index: 1;
        }
        .sh-split-kids .sh-split-overlay {
          background: linear-gradient(to top, rgba(200,60,120,0.88) 0%, rgba(200,60,120,0.3) 40%, transparent 70%);
        }
        .sh-split-adults .sh-split-overlay {
          background: linear-gradient(to top, rgba(10,16,32,0.92) 0%, rgba(10,16,32,0.4) 40%, transparent 70%);
        }
        .sh-split-content {
          position: relative; z-index: 2;
          padding: 40px 36px; width: 100%;
          transform: translateY(8px);
          transition: transform 0.4s ease;
        }
        .sh-split-panel:hover .sh-split-content { transform: translateY(0); }
        .sh-split-eyebrow {
          font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.6); margin-bottom: 8px;
          display: flex; align-items: center; gap: 6px;
        }
        .sh-split-eyebrow::before {
          content: ""; display: block;
          width: 20px; height: 1.5px;
          background: rgba(255,255,255,0.4);
        }
        .sh-split-title {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 800; color: #fff;
          line-height: 1.1; letter-spacing: -0.02em;
          margin-bottom: 10px;
        }
        .sh-split-sub {
          font-size: 0.82rem; color: rgba(255,255,255,0.55);
          margin-bottom: 24px; letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .sh-split-stats {
          display: flex; gap: 20px; margin-bottom: 24px;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.4s 0.1s ease, transform 0.4s 0.1s ease;
        }
        .sh-split-panel:hover .sh-split-stats { opacity: 1; transform: translateY(0); }
        .sh-split-stat { display: flex; flex-direction: column; }
        .sh-split-stat-val { font-size: 1.2rem; font-weight: 800; color: #fff; line-height: 1; }
        .sh-split-stat-lbl { font-size: 0.65rem; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em; }
        .sh-split-stat-div { width: 1px; background: rgba(255,255,255,0.15); align-self: stretch; }
        .sh-split-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px; border-radius: 100px;
          font-size: 0.84rem; font-weight: 800;
          border: none; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .sh-split-btn:hover { transform: translateX(4px); }
        .sh-split-kids .sh-split-btn {
          background: #fff; color: #c8387a;
          box-shadow: 0 4px 20px rgba(200,56,122,0.3);
        }
        .sh-split-adults .sh-split-btn {
          background: linear-gradient(135deg, #c49b3c, #e8c55a);
          color: #0f1623;
          box-shadow: 0 4px 20px rgba(196,155,60,0.35);
        }
        .sh-split::after {
          content: "";
          position: absolute; left: 50%; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.15) 70%, transparent);
          pointer-events: none; z-index: 10;
        }
        .sh-split-centre-badge {
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          z-index: 20; width: 56px; height: 56px;
          border-radius: 50%; background: #fff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.22);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; pointer-events: none;
        }
        @media (max-width: 640px) {
          .sh-split { grid-template-columns: 1fr; min-height: auto; }
          .sh-split-panel { min-height: 320px; }
          .sh-split::after { display: none; }
          .sh-split-centre-badge { display: none; }
          .sh-split-stats { opacity: 1; transform: none; }
        }
      `}</style>

      <div className="sh-split">
        {/* Kids panel */}
        <div className="sh-split-panel sh-split-kids" onClick={() => navigate("/kids")}>
          <img src="/images/kids/clothing/female/dress5.jpg" alt="Kids Fashion" />
          <div className="sh-split-overlay" />
          <div className="sh-split-content">
            <p className="sh-split-eyebrow">For the little ones</p>
            <h2 className="sh-split-title">Children's<br />Wear</h2>
            <p className="sh-split-sub">Female · Male · Unisex</p>
            <div className="sh-split-stats">
              <div className="sh-split-stat">
                <span className="sh-split-stat-val">131+</span>
                <span className="sh-split-stat-lbl">Products</span>
              </div>
              <div className="sh-split-stat-div" />
              <div className="sh-split-stat">
                <span className="sh-split-stat-val">10</span>
                <span className="sh-split-stat-lbl">Categories</span>
              </div>
            </div>
            <button className="sh-split-btn">Shop Kids →</button>
          </div>
        </div>

        {/* Adults panel */}
        <div className="sh-split-panel sh-split-adults" onClick={() => navigate("/adults")}>
          <img src="/images/adults/female/clothing/blazer1.jpg" alt="Adult Fashion" />
          <div className="sh-split-overlay" />
          <div className="sh-split-content">
            <p className="sh-split-eyebrow">For the grown-ups</p>
            <h2 className="sh-split-title">Adult<br />Wear</h2>
            <p className="sh-split-sub">Female · Male · Unisex</p>
            <div className="sh-split-stats">
              <div className="sh-split-stat">
                <span className="sh-split-stat-val">163+</span>
                <span className="sh-split-stat-lbl">Products</span>
              </div>
              <div className="sh-split-stat-div" />
              <div className="sh-split-stat">
                <span className="sh-split-stat-val">9</span>
                <span className="sh-split-stat-lbl">Categories</span>
              </div>
            </div>
            <button className="sh-split-btn">Shop Adults →</button>
          </div>
        </div>

        <div className="sh-split-centre-badge">✦</div>
      </div>
    </>
  );
}
