import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  { icon: <FaInstagram />, label: "Instagram", href: "#", color: "#E1306C" },
  { icon: <FaFacebookF />, label: "Facebook",  href: "#", color: "#1877F2" },
  { icon: <FaXTwitter />,  label: "Twitter/X", href: "#", color: "#f0ede6" },
  { icon: <FaTiktok />,    label: "TikTok",    href: "#", color: "#f0ede6" },
  { icon: <FaWhatsapp />,  label: "WhatsApp",  href: "#", color: "#25D366" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .sh-footer {
          background: #0a1020;
        }

        /* ── Compact newsletter row inside footer ── */
        .sh-footer-nl {
          padding: 28px 5vw;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .sh-footer-nl-text {
          font-size: 0.85rem;
          color: rgba(240,237,230,0.45);
        }
        .sh-footer-nl-text span {
          color: #c49b3c; font-weight: 700;
        }
        .sh-footer-nl-form {
          display: flex; gap: 0;
          flex: 1; max-width: 360px; min-width: 220px;
        }
        .sh-footer-nl-input {
          flex: 1; padding: 10px 16px;
          border: 1px solid rgba(255,255,255,0.08);
          border-right: none;
          border-radius: 100px 0 0 100px;
          background: rgba(255,255,255,0.05);
          color: #f0ede6; font-size: 0.82rem;
          outline: none;
        }
        .sh-footer-nl-input::placeholder { color: rgba(240,237,230,0.25); }
        .sh-footer-nl-input:focus { border-color: rgba(196,155,60,0.35); }
        .sh-footer-nl-btn {
          padding: 10px 18px;
          background: linear-gradient(135deg, #c49b3c, #e8c55a);
          color: #0f1623; font-weight: 800; font-size: 0.8rem;
          border: none; border-radius: 0 100px 100px 0;
          cursor: pointer; white-space: nowrap;
          transition: opacity 0.2s;
        }
        .sh-footer-nl-btn:hover { opacity: 0.85; }

        /* ── Main footer body ── */
        .sh-footer-body {
          padding: 44px 5vw 0;
        }
        .sh-footer-top {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 40px;
          padding-bottom: 36px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        /* Brand col */
        .sh-footer-brand-name {
          font-size: 1.4rem; font-weight: 800;
          color: #f0ede6; letter-spacing: -0.02em;
          margin-bottom: 8px;
        }
        .sh-footer-brand-name span { color: #c49b3c; }
        .sh-footer-tagline {
          font-size: 0.8rem; color: rgba(240,237,230,0.35);
          line-height: 1.6; margin-bottom: 20px; max-width: 200px;
        }
        .sh-footer-socials {
          display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;
        }
        .sh-social-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; text-decoration: none;
          color: rgba(240,237,230,0.5);
          transition: background 0.2s, border-color 0.2s,
                      color 0.2s, transform 0.2s;
        }
        .sh-social-btn:hover {
          transform: translateY(-3px);
          color: var(--sc, #c49b3c);
          border-color: var(--sc, rgba(196,155,60,0.4));
          background: rgba(255,255,255,0.08);
        }
        .sh-footer-contact {
          display: flex; flex-direction: column; gap: 6px;
        }
        .sh-footer-contact span {
          font-size: 0.78rem; color: rgba(240,237,230,0.35);
          display: flex; align-items: center; gap: 7px;
        }

        /* Link columns */
        .sh-footer-col h4 {
          font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #c49b3c; margin-bottom: 14px;
        }
        .sh-footer-col ul { list-style: none; padding: 0; margin: 0; }
        .sh-footer-col li { margin-bottom: 10px; }
        .sh-footer-col a {
          font-size: 0.82rem; color: rgba(240,237,230,0.4);
          text-decoration: none;
          transition: color 0.2s, padding-left 0.15s;
          display: block;
        }
        .sh-footer-col a:hover { color: #f0ede6; padding-left: 4px; }

        /* ── Bottom bar ── */
        .sh-footer-bottom {
          display: flex; align-items: center;
          justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
          padding: 20px 0 24px;
        }
        .sh-footer-copy {
          font-size: 0.72rem; color: rgba(240,237,230,0.2);
        }
        .sh-footer-copy span { color: #c49b3c; }

        /* Payment badges */
        .sh-footer-payments {
          display: flex; align-items: center; gap: 7px;
          font-size: 0.68rem; color: rgba(240,237,230,0.2);
          flex-wrap: wrap;
        }
        .sh-pay-badge {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 5px; padding: 3px 9px;
          font-size: 0.68rem; font-weight: 700;
          color: rgba(240,237,230,0.35);
          white-space: nowrap;
        }
        .sh-pay-badge.transfer {
          border-color: rgba(196,155,60,0.2);
          color: #c49b3c;
        }

        /* Legal */
        .sh-footer-legal { display: flex; gap: 16px; }
        .sh-footer-legal a {
          font-size: 0.7rem; color: rgba(240,237,230,0.2);
          text-decoration: none; transition: color 0.2s;
        }
        .sh-footer-legal a:hover { color: rgba(240,237,230,0.5); }

        @media (max-width: 860px) {
          .sh-footer-top { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 500px) {
          .sh-footer-top { grid-template-columns: 1fr; gap: 28px; }
          .sh-footer-bottom { flex-direction: column; align-items: flex-start; }
          .sh-footer-nl { flex-direction: column; align-items: flex-start; }
          .sh-footer-nl-form { max-width: 100%; width: 100%; }
        }
      `}</style>

      <footer className="sh-footer">

        {/* ── Compact newsletter row ── */}
        <div className="sh-footer-nl">
          <p className="sh-footer-nl-text">
            📬 <span>Stay in the Loop</span> — get new arrivals &amp; offers in your inbox.
          </p>
          <form className="sh-footer-nl-form" onSubmit={(e) => e.preventDefault()}>
            <input
              className="sh-footer-nl-input"
              type="email"
              placeholder="Your email address"
            />
            <button className="sh-footer-nl-btn" type="submit">Subscribe</button>
          </form>
        </div>

        {/* ── Main body ── */}
        <div className="sh-footer-body">
          <div className="sh-footer-top">

            {/* Brand + socials + contact */}
            <div>
              <div className="sh-footer-brand-name">Shop<span>Hub</span></div>
              <p className="sh-footer-tagline">
                Kids &amp; Adults wear, all in one place.
              </p>
              <div className="sh-footer-socials">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} className="sh-social-btn"
                    aria-label={s.label}
                    style={{ "--sc": s.color }}
                    target="_blank" rel="noopener noreferrer">
                    {s.icon}
                  </a>
                ))}
              </div>
              <div className="sh-footer-contact">
                <span>✉️ hello@shophub.example</span>
                <span>📞 (+234) 803 111 2222</span>
                <span>🕐 Mon–sun, 7am–11pm</span>
              </div>
            </div>

            {/* Shop */}
            <div className="sh-footer-col">
              <h4>Shop</h4>
              <ul>
                <li><Link to="/kids">Kids</Link></li>
                <li><Link to="/adults">Adults</Link></li>
                <li><Link to="/wishlist">Wishlist</Link></li>
                <li><Link to="/cart">Cart</Link></li>
              </ul>
            </div>

            {/* Account */}
            <div className="sh-footer-col">
              <h4>Account</h4>
              <ul>
                <li><Link to="/login">Log In</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="sh-footer-col">
              <h4>Support</h4>
              <ul>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/shipping">Shipping &amp; Returns</Link></li>
                <li><Link to="/track">Track Order</Link></li>
              </ul>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="sh-footer-bottom">
            <p className="sh-footer-copy">
              © 2026 <span>ShopHub</span>. Built by Daintylady .
            </p>

            <div className="sh-footer-payments">
              We accept:
              <span className="sh-pay-badge">VISA</span>
              <span className="sh-pay-badge">Mastercard</span>
              <span className="sh-pay-badge">PayPal</span>
              <span className="sh-pay-badge transfer">🏦 Bank Transfer</span>
            </div>

            <div className="sh-footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
