export default function WorkSection() {
  return (
    <section className="section" id="what-we-do">
      <div className="wrap">
        <div className="chapter reveal">
          <span className="cnum">01</span>
          <span className="clab">The Work</span>
          <span className="cline"></span>
        </div>
        <div className="sec-head reveal">
          <span className="label">What we do</span>
          <h2>
            We don&apos;t just sit behind screens. We <em>think</em> and <em>create.</em>
          </h2>
          <p>
            Content people remember. Story, visuals and execution that generate billions in views and millions in revenue.
          </p>
        </div>

        {/* SVG Sparkline Gradient Defs */}
        <svg style={{ height: 0, width: 0, position: 'absolute' }} aria-hidden="true">
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9A6CF0" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#9A6CF0" stopOpacity="0.0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Category 01: Founder-led Content */}
        <div className="cat">
          <div className="cat-copy cat-copy-sticky reveal">
            <span className="num">01</span>
            <h3>Founder-led Content</h3>
            <p className="cd">
              Personal brands for founders and experts. Talking-head content that turns knowledge into authority, and authority into an audience that buys.
            </p>
          </div>
          <div className="cases">

            {/* Card 1: Richard Yu — classic exponential, flat then explosive */}
            <div className="case reveal">
              <div className="chead">
                <div className="who">
                  <span className="pfp g-violet">
                    <img src="/assets/work/richard-yu.jpg" alt="Richard Yu" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                  </span>
                  <div>
                    <div className="cn">Richard Yu</div>
                    <div className="ch">Finance &amp; Investing</div>
                  </div>
                </div>
                <div className="subs">160K<span>Subs ↑</span></div>
              </div>
              <div className="case-duration">Oct 2025 – Present</div>
              <svg viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,75 C180,74 320,70 420,50 C500,34 560,14 600,3 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,75 C180,74 320,70 420,50 C500,34 560,14 600,3" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
              </svg>
              <div className="axis"><span>Jan</span><span>Dec</span></div>
            </div>

            {/* Card 2: Assembly AI — viral spike then plateau */}
            <div className="case reveal">
              <div className="chead">
                <div className="who">
                  <span className="pfp g-dusk">
                    <img src="/assets/work/assembly-ai.jpg" alt="Assembly AI" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                  </span>
                  <div>
                    <div className="cn">Assembly AI</div>
                    <div className="ch">AI &amp; Developer Tools</div>
                  </div>
                </div>
                <div className="subs">183K<span>Subs ↑</span></div>
              </div>
              <div className="case-duration">Oct 2024 – Aug 2025</div>
              <svg viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,70 C60,68 120,18 200,12 C270,8 340,22 440,24 C520,25 570,22 600,20 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,70 C60,68 120,18 200,12 C270,8 340,22 440,24 C520,25 570,22 600,20" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
              </svg>
              <div className="axis"><span>Jan</span><span>Dec</span></div>
            </div>

            {/* Card 3: Josh Burns — growth, dip, strong recovery */}
            <div className="case reveal">
              <div className="chead">
                <div className="who">
                  <span className="pfp g-slate">
                    <img src="/assets/work/josh-burns.jpg" alt="Josh Burns" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                  </span>
                  <div>
                    <div className="cn">Josh Burns</div>
                    <div className="ch">Finance &amp; Stock Trading</div>
                  </div>
                </div>
                <div className="subs">170K<span>Subs ↑</span></div>
              </div>
              <div className="case-duration">May 2024 – June/July</div>
              <svg viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,70 C80,55 160,35 240,30 C300,27 340,44 380,48 C440,54 520,18 600,5 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,70 C80,55 160,35 240,30 C300,27 340,44 380,48 C440,54 520,18 600,5" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
              </svg>
              <div className="axis"><span>Jan</span><span>Dec</span></div>
            </div>
          </div>
        </div>

        {/* Category 02: Performance Creative */}
        <div className="cat">
          <div className="cat-copy cat-copy-sticky reveal">
            <span className="num">02</span>
            <h3>Performance Creative</h3>
            <p className="cd">
              We run paid campaigns for niche brands. VSLs, BoF ads, and full creatives built around one goal: measurable revenue growth.
            </p>
          </div>
          <div className="cases">

            {/* Card 4: Njord — steady gradual straight-line growth */}
            <div className="case reveal">
              <div className="chead">
                <div className="who">
                  <span className="pfp g-royal">
                    <img src="/assets/work/njord.jpg" alt="Njord" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                  </span>
                  <div>
                    <div className="cn">Njord</div>
                    <div className="ch">Outdoor Gear Brand</div>
                  </div>
                </div>
                <div className="subs">$20M<span>Revenue / yr</span></div>
              </div>
              <svg viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,74 L120,60 L240,46 L360,32 L480,18 L600,6 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,74 L120,60 L240,46 L360,32 L480,18 L600,6" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
              </svg>
              <div className="axis"><span>Yr 1</span><span>Now</span></div>
            </div>

            {/* Card 5: Nuora — irregular fluctuating upward trend */}
            <div className="case reveal">
              <div className="chead">
                <div className="who">
                  <span className="pfp g-ink">
                    <img src="/assets/work/nuora.jpg" alt="Nuora" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                  </span>
                  <div>
                    <div className="cn">Nuora</div>
                    <div className="ch">Beauty &amp; Skincare</div>
                  </div>
                </div>
                <div className="subs">$50M<span>Revenue / yr</span></div>
              </div>
              <svg viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,68 C50,58 80,72 130,52 C170,36 200,55 250,38 C300,22 340,42 390,28 C440,16 500,30 550,14 C575,8 590,6 600,4 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,68 C50,58 80,72 130,52 C170,36 200,55 250,38 C300,22 340,42 390,28 C440,16 500,30 550,14 C575,8 590,6 600,4" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
              </svg>
              <div className="axis"><span>Yr 1</span><span>Now</span></div>
            </div>

            {/* Card 6: Icon — sharp hockey stick */}
            <div className="case reveal">
              <div className="chead">
                <div className="who">
                  <span className="pfp g-violet" style={{ display: 'grid', placeItems: 'center', fontWeight: 600, color: '#fff', fontSize: '15px' }}>I</span>
                  <div>
                    <div className="cn">Icon</div>
                    <div className="ch">Fashion &amp; Apparel</div>
                  </div>
                </div>
                <div className="subs">$5M<span>Revenue / yr</span></div>
              </div>
              <svg viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,72 C150,71 300,69 400,65 C460,62 510,40 560,18 C580,10 592,5 600,3 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,72 C150,71 300,69 400,65 C460,62 510,40 560,18 C580,10 592,5 600,3" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
              </svg>
              <div className="axis"><span>Yr 1</span><span>Now</span></div>
            </div>
          </div>
        </div>

        {/* Category 03: Brand & Edutainment */}
        <div className="cat">
          <div className="cat-copy cat-copy-sticky reveal">
            <span className="num">03</span>
            <h3>Brand &amp; Edutainment</h3>
            <p className="cd">
              Boring topics turned into things people can&apos;t stop watching. Channels pulling billions of views by making learning fun.
            </p>
          </div>
          <div className="cases">

            {/* Card 7: Iced Coffee Hour — smooth accelerating parabola */}
            <div className="case reveal">
              <div className="chead">
                <div className="who">
                  <span className="pfp g-plum">
                    <img src="/assets/work/iced-coffee-hour.jpg" alt="Iced Coffee Hour" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                  </span>
                  <div>
                    <div className="cn">Iced Coffee Hour</div>
                    <div className="ch">Business Podcast</div>
                  </div>
                </div>
                <div className="subs">1.9B<span>Views ↑</span></div>
              </div>
              <svg viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,74 C200,72 380,60 480,34 C540,18 575,9 600,4 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,74 C200,72 380,60 480,34 C540,18 575,9 600,4" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
              </svg>
              <div className="axis"><span>Jan</span><span>Dec</span></div>
            </div>

            {/* Card 8: Alementary — double surge */}
            <div className="case reveal">
              <div className="chead">
                <div className="who">
                  <span className="pfp g-slate">
                    <img src="/assets/work/alementary.jpg" alt="Alementary" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                  </span>
                  <div>
                    <div className="cn">Alementary</div>
                    <div className="ch">Science Education</div>
                  </div>
                </div>
                <div className="subs">1.1B<span>Views ↑</span></div>
              </div>
              <svg viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,70 C60,50 100,40 160,35 C220,30 260,38 300,36 C350,33 400,18 460,12 C510,8 560,5 600,3 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,70 C60,50 100,40 160,35 C220,30 260,38 300,36 C350,33 400,18 460,12 C510,8 560,5 600,3" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
              </svg>
              <div className="axis"><span>Jan</span><span>Dec</span></div>
            </div>
          </div>
        </div>

        <div className="more">And more…</div>
      </div>
    </section>
  );
}
