'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const scrubRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const scrub = scrubRef.current;
    if (!scrub) return;
    let queued = false;
    function draw() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.pageYOffset / max, 0), 1) : 0;
      if (scrub) scrub.style.transform = `scaleX(${p})`;
      queued = false;
    }
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(draw); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', draw);
    draw();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', draw); };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <header className="bar">
      <div className="wrap row">
        {/* Logo → homepage */}
        <Link href="/" className="logo-wrap" onClick={() => setIsOpen(false)} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <img src="/assets/logo/logo.png" alt="Team Zealancy" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
        </Link>

        {/* Desktop CTA → careers page */}
        <Link href="/careers" className="btn sm desktop-only">
          See open roles
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </div>

      <nav className={`mobile-menu ${isOpen ? 'is-open' : ''}`} aria-label="Mobile Navigation">
        <a className="mobile-nav-link" href="/#what-we-do" onClick={() => setIsOpen(false)}>
          <span>What We Do</span>
          <span style={{ fontSize: '13px', opacity: 0.6, fontFamily: 'sans-serif' }}>01</span>
        </a>
        <a className="mobile-nav-link" href="/#why-we-exist" onClick={() => setIsOpen(false)}>
          <span>Why We Exist</span>
          <span style={{ fontSize: '13px', opacity: 0.6, fontFamily: 'sans-serif' }}>02</span>
        </a>
        <a className="mobile-nav-link" href="/#team-voices" onClick={() => setIsOpen(false)}>
          <span>Team Voices</span>
        </a>
        <a className="mobile-nav-link" href="/#company-benefits" onClick={() => setIsOpen(false)}>
          <span>Benefits</span>
        </a>
        <a className="mobile-nav-link" href="/#core-leadership" onClick={() => setIsOpen(false)}>
          <span>Leadership</span>
        </a>
        <a className="mobile-nav-link" href="/careers" onClick={() => setIsOpen(false)}>
          <span>Open Roles</span>
          <span style={{ fontSize: '13px', opacity: 0.6, fontFamily: 'sans-serif' }}>03</span>
        </a>
        <a className="mobile-nav-link" href="/#hiring" onClick={() => setIsOpen(false)}>
          <span>Hiring Process</span>
        </a>
        <a className="mobile-nav-link" href="/#faq" onClick={() => setIsOpen(false)}>
          <span>FAQ</span>
        </a>
        <Link href="/careers" className="btn sm"
          style={{ marginTop: '8px', width: '100%', justifyContent: 'center' }}
          onClick={() => setIsOpen(false)}>
          See open roles →
        </Link>
      </nav>

      <div className="scrub">
        <i id="scrubFill" ref={scrubRef}></i>
      </div>
    </header>
  );
}
