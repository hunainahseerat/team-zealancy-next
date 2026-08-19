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
            <div className="case reveal" style={{ transitionDelay: '0s' }}>
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
                <path d="M0,75 L140,74 L280,68 L400,52 L480,30 L540,14 L600,3 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,75 L140,74 L280,68 L400,52 L480,30 L540,14 L600,3" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
              </svg>
              <div className="axis"><span>Jan</span><span>Dec</span></div>
            </div>

            {/* Card 2: Assembly AI — viral spike then plateau */}
            <div className="case reveal" style={{ transitionDelay: '0.15s' }}>
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
                <path d="M0,70 L80,66 L140,18 L210,12 L280,10 L360,24 L440,25 L520,22 L600,20 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,70 L80,66 L140,18 L210,12 L280,10 L360,24 L440,25 L520,22 L600,20" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
              </svg>
              <div className="axis"><span>Jan</span><span>Dec</span></div>
            </div>

            {/* Card 3: Josh Burns — growth, dip, strong recovery */}
            <div className="case reveal" style={{ transitionDelay: '0.3s' }}>
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
                <path d="M0,70 L90,54 L170,36 L240,30 L300,28 L350,46 L390,48 L460,32 L530,16 L600,5 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,70 L90,54 L170,36 L240,30 L300,28 L350,46 L390,48 L460,32 L530,16 L600,5" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
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
            <div className="case reveal" style={{ transitionDelay: '0s' }}>
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
            <div className="case reveal" style={{ transitionDelay: '0.15s' }}>
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
                <path d="M0,68 L50,58 L80,72 L130,52 L170,36 L200,55 L250,38 L300,22 L340,42 L390,28 L440,16 L500,30 L550,14 L600,4 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,68 L50,58 L80,72 L130,52 L170,36 L200,55 L250,38 L300,22 L340,42 L390,28 L440,16 L500,30 L550,14 L600,4" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
              </svg>
              <div className="axis"><span>Yr 1</span><span>Now</span></div>
            </div>

            {/* Card 6: Icon — sharp hockey stick */}
            <div className="case reveal" style={{ transitionDelay: '0.3s' }}>
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
                <path d="M0,72 L150,71 L300,69 L400,65 L460,60 L510,38 L560,16 L600,3 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,72 L150,71 L300,69 L400,65 L460,60 L510,38 L560,16 L600,3" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
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
            <div className="case reveal" style={{ transitionDelay: '0s' }}>
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
                <path d="M0,74 L140,72 L280,64 L400,48 L480,28 L540,12 L600,4 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,74 L140,72 L280,64 L400,48 L480,28 L540,12 L600,4" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
              </svg>
              <div className="axis"><span>Jan</span><span>Dec</span></div>
            </div>

            {/* Card 8: Alementary — double surge */}
            <div className="case reveal" style={{ transitionDelay: '0.15s' }}>
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
                <path d="M0,70 L60,50 L100,40 L160,35 L220,30 L260,38 L300,36 L380,24 L460,12 L540,7 L600,3 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,70 L60,50 L100,40 L160,35 L220,30 L260,38 L300,36 L380,24 L460,12 L540,7 L600,3" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
              </svg>
              <div className="axis"><span>Jan</span><span>Dec</span></div>
            </div>

            {/* Card 9: Coding with Lewis */}
            <div className="case reveal" style={{ transitionDelay: '0.3s' }}>
              <div className="chead">
                <div className="who">
                  <span className="pfp g-dusk">
                    <img src="/assets/work/coding-with-lewis.jpg" alt="Coding with Lewis" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                  </span>
                  <div>
                    <div className="cn">Coding with Lewis</div>
                    <div className="ch">Software &amp; Tech Education</div>
                  </div>
                </div>
                <div className="subs">850K<span>Subs ↑</span></div>
              </div>
              <svg viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,75 L100,68 L200,58 L300,44 L400,28 L500,14 L600,4 L600,80 L0,80 Z" fill="url(#sparkFill)" />
                <path d="M0,75 L100,68 L200,58 L300,44 L400,28 L500,14 L600,4" fill="none" stroke="#9A6CF0" strokeWidth="2.5" />
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
