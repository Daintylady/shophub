export default function NewsletterStrip() {
  return (
    <>
      <style>{`
        .sh-newsletter-strip {
          background: linear-gradient(135deg, #1a2540 0%, #0f1623 100%);
          padding: 48px 5vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .sh-nl-text h3 {
          font-size: 1.4rem; font-weight: 800;
          color: #f0ede6; letter-spacing: -0.02em;
          margin-bottom: 6px;
        }
        .sh-nl-text h3 span { color: #c49b3c; }
        .sh-nl-text p {
          font-size: 0.85rem; color: rgba(240,237,230,0.45);
        }
        .sh-nl-form {
          display: flex; flex: 1; max-width: 420px;
        }
        .sh-nl-input {
          flex: 1; padding: 13px 18px;
          border: 1.5px solid rgba(255,255,255,0.10);
          border-right: none;
          border-radius: 100px 0 0 100px;
          background: rgba(255,255,255,0.06);
          color: #f0ede6; font-size: 0.88rem;
          outline: none;
        }
        .sh-nl-input::placeholder { color: rgba(240,237,230,0.3); }
        .sh-nl-input:focus { border-color: rgba(196,155,60,0.4); }
        .sh-nl-btn {
          padding: 13px 22px;
          background: linear-gradient(135deg, #c49b3c, #e8c55a);
          color: #0f1623; font-weight: 800; font-size: 0.88rem;
          border: none; border-radius: 0 100px 100px 0;
          cursor: pointer; white-space: nowrap;
          transition: opacity 0.2s;
        }
        .sh-nl-btn:hover { opacity: 0.88; }
        @media (max-width: 640px) {
          .sh-newsletter-strip { flex-direction: column; }
          .sh-nl-form { max-width: 100%; width: 100%; }
        }
      `}</style>
      <div className="sh-newsletter-strip">
        <div className="sh-nl-text">
          <h3>Stay in the <span>Loop</span></h3>
          <p>New arrivals, exclusive offers and style tips — straight to your inbox.</p>
        </div>
        <form className="sh-nl-form" onSubmit={(e) => e.preventDefault()}>
          <input className="sh-nl-input" type="email" placeholder="Your email address" />
          <button className="sh-nl-btn" type="submit">Subscribe</button>
        </form>
      </div>
    </>
  );
}
