'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const PHRASES = [
  'become the 1%',
  'make cool sh*t',
  'make more $$$.',
  'kill average content.',
];

export default function HeroSection() {
  /* - typewriter - */
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef    = useRef<HTMLSpanElement>(null);
  const caretRef   = useRef<HTMLSpanElement>(null);
  const srRef      = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState(PHRASES[0]);

  /* - typewriter effect - */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const heading = headingRef.current;
    const textEl  = textRef.current;
    const caret   = caretRef.current;
    const srLabel = srRef.current;
    if (!heading || !textEl || !caret) return;

    const oneLine = window.matchMedia('(min-width:761px)');
    function fit() {
      if (!heading) return;
      heading.style.fontSize = '';
      if (!oneLine.matches) {
        heading.style.whiteSpace = 'normal';
        return;
      }
      heading.style.whiteSpace = 'nowrap';
      heading.style.textAlign = 'left';
      const need = heading.scrollWidth, avail = heading.clientWidth;
      heading.style.textAlign = '';
      if (need > avail && avail > 0) {
        const size = parseFloat(getComputedStyle(heading).fontSize);
        heading.style.fontSize = `${size * (avail / need) * 0.995}px`;
      }
    }
    fit();
    document.fonts?.ready?.then(fit);
    let resizeTimer: NodeJS.Timeout;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(fit, 150); };
    window.addEventListener('resize', onResize);

    if (reduceMotion) {
      setDisplayText(PHRASES[0]);
      if (srLabel) srLabel.textContent = PHRASES[0];
      return () => window.removeEventListener('resize', onResize);
    }

    let idx = 0, chars = PHRASES[0].length;
    let tid: NodeJS.Timeout;
    const TYPE = 55, ERASE = 28, HOLD = 2000, GAP = 400;
    function typeIn() {
      const p = PHRASES[idx];
      caret?.classList.remove('blink');
      if (chars < p.length) {
        chars++;
        const s = p.slice(0, chars);
        setDisplayText(s);
        if (textEl) textEl.textContent = s;
        tid = setTimeout(typeIn, TYPE);
      } else {
        if (srLabel) srLabel.textContent = p;
        caret?.classList.add('blink');
        tid = setTimeout(eraseOut, HOLD);
      }
    }
    function eraseOut() {
      const p = PHRASES[idx];
      caret?.classList.remove('blink');
      if (chars > 0) {
        chars--;
        const s = p.slice(0, chars);
        setDisplayText(s);
        if (textEl) textEl.textContent = s;
        tid = setTimeout(eraseOut, ERASE);
      } else {
        idx = (idx + 1) % PHRASES.length;
        caret?.classList.add('blink');
        tid = setTimeout(typeIn, GAP);
      }
    }
    caret?.classList.add('blink');
    tid = setTimeout(eraseOut, HOLD);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(tid);
      clearTimeout(resizeTimer);
    };
  }, []);

  const longestPhrase = PHRASES.reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <header className="hero" id="top">
      <div className="wrap">
        {/* -
            HERO HEADLINE: DUAL FONT SPECIFICATION
            - "Join Team Zealancy to ": Clean, elegant serif in Dark Charcoal (#18181B)
            - "become the 1%": Elegant stylized italicized serif in Purple Accent (#6D28D9)
        - */}
        <h1
          ref={headingRef}
          style={{
            whiteSpace: 'nowrap',
            maxWidth: '100%',
            overflow: 'hidden',
            fontFamily: "'Playfair Display', 'Fraunces', Georgia, serif",
            fontWeight: 600,
            color: '#18181B',
            letterSpacing: '-0.02em',
          }}
        >
          Join Team Zealancy to{' '}
          <span className="rot" aria-hidden="true">
            <span className="rot-ghost">{longestPhrase}</span>
            <span className="rot-word">
              <span
                className="rot-text"
                ref={textRef}
                style={{
                  fontFamily: "'Playfair Display', 'Fraunces', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 600,
                  color: '#6D28D9',
                }}
              >
                {displayText}
              </span>
              <span
                className="rot-caret"
                ref={caretRef}
                style={{
                  display: 'inline-block',
                  width: '2.5px',
                  height: '0.88em',
                  marginLeft: '2px',
                  verticalAlign: 'baseline',
                  backgroundColor: '#6D28D9',
                }}
              />
            </span>
          </span>
          <span className="sr" ref={srRef}>become the 1%</span>
        </h1>

        {/* 
            GAME DISTRICT YOUTUBE VIDEO EMBED
            VIZITIA VIDEO EMBED PLACEHOLDER - SWAP EMBED URL HERE LATER 
        */}
        <div
          className="hero-video-container"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1060px',
            margin: '28px auto 0',
            aspectRatio: '16/9',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 24px 60px -15px rgba(25, 21, 33, 0.35), 0 0 35px rgba(109, 40, 217, 0.18)',
            border: '1px solid rgba(25, 21, 33, 0.12)',
            background: '#07040E',
          }}
        >
          {/* VIZITIA VIDEO EMBED PLACEHOLDER - SWAP EMBED URL HERE LATER */}
          <iframe
            src="https://www.youtube.com/embed/E8oHkGfYqYs?rel=0"
            title="Game District Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
              borderRadius: '24px',
            }}
            className="w-full h-full rounded-2xl"
          />
        </div>

        <div className="cta-row" style={{ marginTop: '28px' }}>
          <Link href="/careers" className="btn">See open roles →</Link>
          <a className="sbtn" href="https://www.instagram.com/teamzealancy/" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Instagram
          </a>
          <a className="sbtn" href="https://www.linkedin.com/company/zealancy" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4 0 4.75 2.5 4.75 5.8V21h-4v-5.2c0-1.24-.02-2.84-1.9-2.84-1.9 0-2.2 1.36-2.2 2.75V21h-4z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}
