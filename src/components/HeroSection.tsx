'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

const PHRASES = [
  'make cool sh*t',
  'become the 1%',
  'make more $$$.',
  'kill average content.',
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const LIQUID_EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

export default function HeroSection() {
  /* ── typewriter ── */
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef    = useRef<HTMLSpanElement>(null);
  const caretRef   = useRef<HTMLSpanElement>(null);
  const srRef      = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState(PHRASES[0]);

  /* ── spring 3D tilt ── */
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 14 });
  const sy = useSpring(my, { stiffness: 120, damping: 14 });

  /* rotate derived from spring values */
  const rotateY = useTransform(sx, [0, 1], [-10, 10]);
  const rotateX = useTransform(sy, [0, 1], [8, -8]);

  /* cursor glow position */
  const [glowPos, setGlowPos] = useState({ x: '50%', y: '50%' });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    mx.set(nx);
    my.set(ny);
    setGlowPos({ x: `${nx * 100}%`, y: `${ny * 100}%` });
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    setGlowPos({ x: '50%', y: '50%' });
    setHovered(false);
  };

  /* ── typewriter effect ── */
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
      if (!oneLine.matches) return;
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
      if (chars < p.length) { chars++; const s = p.slice(0, chars); setDisplayText(s); if (textEl) textEl.textContent = s; tid = setTimeout(typeIn, TYPE); }
      else { if (srLabel) srLabel.textContent = p; caret?.classList.add('blink'); tid = setTimeout(eraseOut, HOLD); }
    }
    function eraseOut() {
      const p = PHRASES[idx];
      caret?.classList.remove('blink');
      if (chars > 0) { chars--; const s = p.slice(0, chars); setDisplayText(s); if (textEl) textEl.textContent = s; tid = setTimeout(eraseOut, ERASE); }
      else { idx = (idx + 1) % PHRASES.length; caret?.classList.add('blink'); tid = setTimeout(typeIn, GAP); }
    }
    caret?.classList.add('blink');
    tid = setTimeout(eraseOut, HOLD);
    return () => { window.removeEventListener('resize', onResize); clearTimeout(tid); clearTimeout(resizeTimer); };
  }, []);

  const longestPhrase = PHRASES.reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <header className="hero" id="top">
      <div className="wrap">
        <h1 ref={headingRef}>
          Join Team Zealancy to <br className="h1br" />
          <span className="rot" aria-hidden="true">
            <span className="rot-ghost">{longestPhrase}</span>
            <span className="rot-word">
              <span className="rot-text" ref={textRef}
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontStyle: 'italic', fontWeight: 600, color: '#5236ab' }}>
                {displayText}
              </span>
              <span className="rot-caret" ref={caretRef} />
            </span>
          </span>
          <span className="sr" ref={srRef}>make cool sh*t</span>
        </h1>

        {/* ══════════════════════════════════════════════════════════
            FRAMER MOTION — CINEMATIC HERO CARD WITH LIQUID REVEAL
        ══════════════════════════════════════════════════════════ */}
        <motion.div
          ref={cardRef}
          className="hero-media"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleLeave}
          /* STEP 0: Container reveal */
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '24px',
            border: '1px solid rgba(183,155,234,0.22)',
            background: '#07040e',
            cursor: 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '380px',
            aspectRatio: '16/8',
            marginTop: '26px',
            rotateX,
            rotateY,
            transformPerspective: 1000,
            boxShadow: hovered
              ? '0 30px 70px -20px rgba(93,45,176,0.55), 0 0 40px rgba(183,155,234,0.12)'
              : '0 20px 50px -25px rgba(0,0,0,0.8), 0 0 20px rgba(93,45,176,0.18)',
          }}
        >
          {/* Ambient pulsing mesh glow — infinite loop */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle 380px at 50% 45%, rgba(82,54,171,0.28) 0%, rgba(183,155,234,0.1) 55%, transparent 80%)',
              pointerEvents: 'none',
            }}
          />

          {/* Compact cursor glow spot (180×180) */}
          {hovered && (
            <div
              style={{
                position: 'absolute',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(140,92,245,0.35) 0%, transparent 70%)',
                transform: 'translate(-50%,-50%)',
                left: glowPos.x,
                top: glowPos.y,
                pointerEvents: 'none',
                transition: 'left 0.08s, top 0.08s',
                zIndex: 2,
              }}
            />
          )}

          {/* Dot grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(241,238,230,0.09) 1.2px, transparent 1.2px)',
            backgroundSize: '28px 28px', opacity: 0.65, pointerEvents: 'none',
          }} />

          {/* Diagonal shimmer sweep every 5s, infinite */}
          <motion.div
            animate={{ x: ['-120%', '220%'] }}
            transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 5, delay: 4 }}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '40%', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.11), transparent)',
              transform: 'skewX(-22deg)', pointerEvents: 'none', zIndex: 1,
            }}
          />

          {/* ═══ Content — staggered liquid/clip reveal ═══ */}
          <div style={{
            position: 'relative', zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '20px', padding: '44px 24px', textAlign: 'center',
          }}>

            {/* STEP 1 — Z Logo (exact header logo mark) : delay 0.8s */}
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.9, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0,   scale: 1.0, filter: 'blur(0px)' }}
              transition={{ delay: 0.8, duration: 1.1, ease: LIQUID_EASE }}
              whileHover={{ scale: 1.07 }}
              style={{
                width: '88px', height: '88px',
                position: 'relative',
                filter: 'drop-shadow(0 0 28px rgba(183,155,234,0.55))',
                display: 'grid', placeItems: 'center',
              }}
            >
              <img
                src="/assets/logo/z-logo-white.png"
                alt="Zealancy Z Logo"
                style={{ height: '72px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              {/* STEP 2 — ZEALANCY wordmark with tracking expansion: delay 1.6s */}
              <motion.span
                initial={{ opacity: 0, letterSpacing: '-2px', scale: 0.96, filter: 'blur(6px)' }}
                animate={{ opacity: 1, letterSpacing: '8px',  scale: 1.0,  filter: 'blur(0px)' }}
                transition={{ delay: 1.6, duration: 1.1, ease: LIQUID_EASE }}
                style={{
                  fontFamily: "'Bodoni Moda', 'Cinzel', Georgia, serif",
                  fontSize: 'clamp(28px, 4.5vw, 52px)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  textShadow: '0 4px 24px rgba(0,0,0,0.9), 0 0 40px rgba(183,155,234,0.32)',
                  display: 'block',
                  /* account for trailing letter-spacing indent */
                  marginRight: '-8px',
                }}
              >
                ZEALANCY
              </motion.span>

              {/* STEP 3 — Subtitle: delay 2.4s, liquid slide-up */}
              <motion.span
                initial={{ opacity: 0, y: 18, filter: 'blur(5px)',
                  clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' }}
                animate={{ opacity: 1, y: 0,  filter: 'blur(0px)',
                  clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                transition={{ delay: 2.4, duration: 1.0, ease: LIQUID_EASE }}
                style={{
                  fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(183,155,234,0.92)',
                  marginTop: '2px',
                }}
              >
                TOP 1% CREATOR CONTENT AGENCY
              </motion.span>
            </div>
          </div>

          {/* Agency badge pill — STEP 3, delay 2.4s */}
          <motion.div
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
            transition={{ delay: 2.5, duration: 0.9, ease: LIQUID_EASE }}
            style={{
              position: 'absolute', bottom: '18px', left: '20px', zIndex: 12,
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: '999px',
              background: 'rgba(16,10,26,0.82)',
              border: '1px solid rgba(183,155,234,0.28)',
              backdropFilter: 'blur(10px)',
              color: 'rgba(241,238,230,0.88)',
              fontSize: '11px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 20px rgba(93,45,176,0.28)',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%',
              background: '#B79BEA', boxShadow: '0 0 8px #B79BEA' }} />
            CREATIVE CONTENT STUDIO
          </motion.div>
        </motion.div>
        {/* ══ End Hero Card ══ */}

        <div className="cta-row">
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
