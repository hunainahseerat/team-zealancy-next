export default function Benefits() {
  return (
    <section className="section" id="company-benefits">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="label">Company Benefits</span>
          <h2>
            More than a <em>paycheck.</em>
          </h2>
          <p>
            We go after the best people in the country. If you're one of them, you never have to worry about a thing.
          </p>
        </div>

        <div className="perks">
          <div className="perk reveal">
            <span className="pico">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v10M9.5 9.5c0-1 1-1.7 2.5-1.7s2.5.7 2.5 1.7c0 2.6-5 1.6-5 4.4 0 1 1 1.8 2.5 1.8s2.5-.8 2.5-1.8" />
              </svg>
            </span>
            <div>
              <h3>Above-market pay</h3>
              <p>A base that beats agency rates, with commission on top.</p>
            </div>
          </div>

          <div className="perk reveal">
            <span className="pico">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </span>
            <div>
              <h3>Health insurance</h3>
              <p>Full medical cover for you and your loved ones.</p>
            </div>
          </div>

          <div className="perk reveal">
            <span className="pico">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3.5" y="9" width="17" height="11.5" rx="1" />
                <path d="M3.5 13h17M12 9v11.5" />
                <path d="M12 9C11 6.5 9.4 5.6 7.9 6.1S6.8 8.8 9 9zM12 9c1-2.5 2.6-3.4 4.1-2.9s1.1 2.7-1.1 2.9z" />
              </svg>
            </span>
            <div>
              <h3>Eid bonuses</h3>
              <p>Extra pay at both Eids, on top of your salary.</p>
            </div>
          </div>

          <div className="perk reveal">
            <span className="pico">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3c3 2 5 5 5 9a5 5 0 0 1-10 0c0-4 2-7 5-9z" />
                <path d="M9 21h6" />
              </svg>
            </span>
            <div>
              <h3>Learning budget</h3>
              <p>Real money every year to level up your craft.</p>
            </div>
          </div>

          <div className="perk reveal">
            <span className="pico">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </span>
            <div>
              <h3>Paid time off</h3>
              <p>Paid leave, sponsored retreats, and team meals.</p>
            </div>
          </div>

          <div className="perk reveal">
            <span className="pico">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3.5 2" />
              </svg>
            </span>
            <div>
              <h3>Flexible hours</h3>
              <p>Own your schedule. We count output, not hours.</p>
            </div>
          </div>

          {/* Performance Feature */}
          <div className="perk-feature reveal">
            <svg
              className="pf-rings"
              viewBox="0 0 120 120"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <g transform="translate(4 18) scale(3.1)">
                <path d="M12 2.6v18.8" />
                <path d="M16.4 7.9c0-1.9-2-3.1-4.4-3.1s-4.4 1.2-4.4 3.1c0 4.5 8.8 2.6 8.8 7 0 1.9-2 3.1-4.4 3.1s-4.4-1.2-4.4-3.1" />
              </g>
              <g transform="translate(52 4) scale(2.1)" opacity=".7">
                <path d="M12 2.6v18.8" />
                <path d="M16.4 7.9c0-1.9-2-3.1-4.4-3.1s-4.4 1.2-4.4 3.1c0 4.5 8.8 2.6 8.8 7 0 1.9-2 3.1-4.4 3.1s-4.4-1.2-4.4-3.1" />
              </g>
              <g transform="translate(58 62) scale(1.5)" opacity=".5">
                <path d="M12 2.6v18.8" />
                <path d="M16.4 7.9c0-1.9-2-3.1-4.4-3.1s-4.4 1.2-4.4 3.1c0 4.5 8.8 2.6 8.8 7 0 1.9-2 3.1-4.4 3.1s-4.4-1.2-4.4-3.1" />
              </g>
            </svg>
            <div className="pf-inner">
              <span className="pf-badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2.6v18.8" />
                  <path d="M16.4 7.9c0-1.9-2-3.1-4.4-3.1s-4.4 1.2-4.4 3.1c0 4.5 8.8 2.6 8.8 7 0 1.9-2 3.1-4.4 3.1s-4.4-1.2-4.4-3.1" />
                </svg>
                For outperformers
              </span>
              <h3>
                Performance <em>Partnership.</em>
              </h3>
              <p>
                The people who drive real results don't stop at a salary. They come in as partners and share in what they help build. Open to anyone who reaches that level.
              </p>
              <div className="pf-tc">Terms and conditions apply.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
