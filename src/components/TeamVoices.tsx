'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

const TEAM_VOICES_DATA = [
  {
    id: '01',
    name: 'Muhammad Usman Laghari',
    role: 'Senior Project Manager',
    quote: '"Managing complex productions daily — this team makes it genuinely exciting to deliver."',
    wistiaId: '76pq9sletd',
    bgClass: 'g-violet',
  },
  {
    id: '02',
    name: 'Shehroz Khan',
    role: 'Head of Fulfilment',
    quote: '"I oversee delivery for some of the biggest channels in the world. The scale here is real."',
    wistiaId: 'xyrx926yn6',
    bgClass: 'g-plum',
  },
  {
    id: '03',
    name: 'Fahad Ansari',
    role: 'Junior Video Editor',
    quote: '"No politics, no ego. Just people who care about the craft."',
    wistiaId: 'ckriomzxeu',
    bgClass: 'g-dusk',
  },
  {
    id: '04',
    name: 'Muhammad Aqib',
    role: 'Junior Video Editor',
    quote: '"I\'ve grown more here in one year than anywhere else I\'ve worked."',
    wistiaId: '74spvaapv9',
    bgClass: 'g-slate',
  },
  {
    id: '05',
    name: 'Moazam Naqvi',
    role: 'Content Creator',
    quote: '"Creating content that reaches millions — every single week. The opportunity here is unmatched."',
    wistiaId: 'buwj25t5ln',
    bgClass: 'g-royal',
  },
  {
    id: '06',
    name: 'Ashar Ullah Khan',
    role: 'OPS Manager',
    quote: '"The speed of execution here is unlike any agency I\'ve been part of."',
    wistiaId: 'doiu7dd9iw',
    bgClass: 'g-violet',
  },
  {
    id: '07',
    name: 'Shayan',
    role: 'Junior Video Editor',
    quote: '"High standards and full support — you\'re pushed to be genuinely great here."',
    wistiaId: '43o80cxtqj',
    bgClass: 'g-plum',
  },
  {
    id: '08',
    name: 'Muhammad Izhan Khan',
    role: 'Accountant',
    quote: '"Numbers meet creativity. Working behind the scenes of industry-leading productions."',
    wistiaId: 'hccsfag3s7',
    bgClass: 'g-dusk',
  },
  {
    id: '09',
    name: 'Syed Junaid Hussain',
    role: 'Assistant Video Editor',
    quote: '"Every edit matters. This team has taught me that obsession over detail is the standard."',
    wistiaId: 'ai9gc5r5f5',
    bgClass: 'g-slate',
  },
  {
    id: '10',
    name: 'Kamal Ahmed',
    role: 'Lead Video Editor',
    quote: '"Leading edits for channels with hundreds of millions of views — real work, real impact."',
    wistiaId: 'ew2xs2jo5a',
    bgClass: 'g-royal',
  },
  {
    id: '11',
    name: 'Syed Zeeshan Ali',
    role: 'Intern Video Editor',
    quote: '"From day one I was working on real productions. The learning curve is steep and worth it."',
    wistiaId: 'tf6vvsadtv',
    bgClass: 'g-violet',
  },
  {
    id: '12',
    name: 'Muhammad Ali Akbar',
    role: 'Admin Assistant',
    quote: '"I keep the engine running. Zealancy moves fast and it\'s energising to be part of it."',
    wistiaId: '1wnmxc9c5q',
    bgClass: 'g-plum',
  },
];

export default function TeamVoices() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dotWrapRef = useRef<HTMLDivElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePrev = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    scroller.scrollBy({
      left: -scroller.clientWidth,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  const handleNext = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    scroller.scrollBy({
      left: scroller.clientWidth,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scroller = scrollerRef.current;
    const dotWrap = dotWrapRef.current;
    if (!scroller || !dotWrap) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const behavior = reduceMotion ? 'auto' : 'smooth';

    const slides = scroller.querySelectorAll<HTMLElement>('.voice');
    dotWrap.innerHTML = '';

    if (slides.length) {
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);

        dot.addEventListener('click', () => {
          const step = slides[0].getBoundingClientRect().width + 16;
          scroller.scrollTo({ left: i * step, behavior });
        });

        dotWrap.appendChild(dot);
      }

      const dots = dotWrap.querySelectorAll<HTMLButtonElement>('button');
      let dotQueued = false;

      function syncDots() {
        const step = slides[0].getBoundingClientRect().width + 16;
        const idx = step > 0 ? Math.round(scroller!.scrollLeft / step) : 0;
        const clampedIdx = Math.max(0, Math.min(idx, dots.length - 1));

        dots.forEach((dot, k) => {
          dot.classList.toggle('on', k === clampedIdx);
        });
        dotQueued = false;
      }

      const onScroll = () => {
        if (!dotQueued) {
          dotQueued = true;
          requestAnimationFrame(syncDots);
        }
      };

      scroller.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', syncDots);
      syncDots();

      return () => {
        scroller.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', syncDots);
      };
    }
  }, []);

  return (
    <>
      <Script src="https://fast.wistia.net/assets/external/E-v1.js" strategy="lazyOnload" />

      <section className="section" id="team-voices">
        <div className="wrap">
          <div className="chapter reveal">
            <span className="cnum">02</span>
            <span className="clab">Team Voices</span>
            <span className="cline"></span>
          </div>
          <div className="sec-head reveal" style={{ marginBottom: '32px' }}>
            <span className="label">Team voices</span>
            <h2>
              Don&apos;t take our word. Hear what your <em>co-workers</em> say.
            </h2>
            <p>The people already here, in their own words.</p>
          </div>

          <div className="voice-head">
            <span className="vt">Team voices (12 stories)</span>
            <div className="voice-nav">
              <button id="vPrev" aria-label="Previous" onClick={handlePrev}>
                ‹
              </button>
              <button id="vNext" aria-label="Next" onClick={handleNext}>
                ›
              </button>
            </div>
          </div>

          <div className="voice-scroller" id="voices" ref={scrollerRef}>
            {TEAM_VOICES_DATA.map((item) => {
              const isPlaying = playingId === item.id;
              return (
                <div
                  key={item.id}
                  className="voice reveal"
                  style={{ position: 'relative' }}
                >
                  <div
                    className={`vid ${item.bgClass}`}
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      width: '100%',
                      height: '100%',
                      minHeight: '380px',
                    }}
                  >
                    {isPlaying ? (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          zIndex: 25,
                        }}
                      >
                        <iframe
                          src={`https://fast.wistia.net/embed/iframe/${item.wistiaId}?autoPlay=1&muted=false`}
                          title={`${item.name} Voice Story`}
                          allow="autoplay; fullscreen"
                          allowTransparency={true}
                          frameBorder="0"
                          scrolling="no"
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'block',
                            border: 'none',
                          }}
                        />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingId(item.id);
                        }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          zIndex: 20,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        aria-label={`Play ${item.name} video`}
                      >
                        <span
                          className="play"
                          style={{
                            pointerEvents: 'none',
                          }}
                        />
                      </button>
                    )}

                    <span
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 12,
                        zIndex: isPlaying ? 5 : 22,
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '.12em',
                        color: 'rgba(255,255,255,0.85)',
                        background: 'rgba(0,0,0,0.45)',
                        padding: '3px 8px',
                        borderRadius: '999px',
                        backdropFilter: 'blur(4px)',
                        pointerEvents: 'none',
                      }}
                    >
                      VOICE {item.id}
                    </span>
                  </div>

                  <div className="vb">
                    <div className="vn">{item.name}</div>
                    <div className="vr">{item.role}</div>
                    <p className="vq">{item.quote}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="vdots"
            id="vdots"
            ref={dotWrapRef}
            role="tablist"
            aria-label="Testimonial position"
          ></div>
        </div>
      </section>
    </>
  );
}
