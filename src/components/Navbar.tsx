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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      const isHome =
        window.location.pathname === '/' ||
        window.location.pathname === '/index.html' ||
        window.location.pathname === '';
      if (isHome) {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `#${targetId}`);
        }
      }
    }
  };

  return (
    <header className="bar">
      <div className="wrap">
        {/* Logo — far left: transparent white Zealancy Z mark */}
        <Link
          href="/"
          className="logo-wrap"
          onClick={(e) => {
            setIsOpen(false);
            if (typeof window !== 'undefined') {
              const isHome =
                window.location.pathname === '/' ||
                window.location.pathname === '/index.html' ||
                window.location.pathname === '';
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }
          }}
          style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
          aria-label="Team Zealancy — scroll to top"
        >
          <img
            src="/assets/logo/z-logo-white.png"
            alt="Team Zealancy Z Logo"
            style={{ height: '32px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </Link>

        {/* Right-Aligned Grouping: Navigation Links + Divider + CTA Button */}
        <div
          className="nav-desktop-group desktop-only"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <nav
            aria-label="Section Navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '22px',
            }}
          >
            <a
              href="/#our-work"
              onClick={(e) => handleNavClick(e, 'our-work')}
              className="nav-item-link"
            >
              OUR WORK
            </a>
            <a
              href="/#why-we-exist"
              onClick={(e) => handleNavClick(e, 'why-we-exist')}
              className="nav-item-link"
            >
              WHY WE EXIST
            </a>
            <a
              href="/#benefits"
              onClick={(e) => handleNavClick(e, 'benefits')}
              className="nav-item-link"
            >
              COMPANY BENEFITS
            </a>
            <a
              href="/#open-roles"
              onClick={(e) => handleNavClick(e, 'open-roles')}
              className="nav-item-link"
            >
              OPEN ROLES
            </a>
          </nav>

          {/* Subtle vertical divider line */}
          <div
            className="nav-divider"
            style={{
              height: '16px',
              width: '1px',
              backgroundColor: 'rgba(156, 163, 175, 0.3)',
            }}
            aria-hidden="true"
          />

          {/* Primary CTA Button */}
          <Link
            href="/careers"
            className="btn sm nav-cta-btn"
            style={{
              borderRadius: '999px',
              padding: '8px 20px',
              fontWeight: 600,
              fontSize: '13px',
              whiteSpace: 'nowrap',
            }}
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          style={{ color: '#fff' }}
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

      {/* Mobile Drawer Menu */}
      <nav className={`mobile-menu ${isOpen ? 'is-open' : ''}`} aria-label="Mobile Navigation">
        <a className="mobile-nav-link" href="/#our-work" onClick={(e) => handleNavClick(e, 'our-work')} style={{ color: 'rgba(255,255,255,0.92)' }}>
          <span>OUR WORK</span>
          <span style={{ fontSize: '13px', opacity: 0.5, fontFamily: 'sans-serif' }}>01</span>
        </a>
        <a className="mobile-nav-link" href="/#why-we-exist" onClick={(e) => handleNavClick(e, 'why-we-exist')} style={{ color: 'rgba(255,255,255,0.92)' }}>
          <span>WHY WE EXIST</span>
          <span style={{ fontSize: '13px', opacity: 0.5, fontFamily: 'sans-serif' }}>02</span>
        </a>
        <a className="mobile-nav-link" href="/#benefits" onClick={(e) => handleNavClick(e, 'benefits')} style={{ color: 'rgba(255,255,255,0.92)' }}>
          <span>COMPANY BENEFITS</span>
          <span style={{ fontSize: '13px', opacity: 0.5, fontFamily: 'sans-serif' }}>03</span>
        </a>
        <a className="mobile-nav-link" href="/#open-roles" onClick={(e) => handleNavClick(e, 'open-roles')} style={{ color: 'rgba(255,255,255,0.92)' }}>
          <span>OPEN ROLES</span>
          <span style={{ fontSize: '13px', opacity: 0.5, fontFamily: 'sans-serif' }}>04</span>
        </a>
        <Link
          href="/careers"
          className="btn sm"
          style={{ marginTop: '10px', width: '100%', justifyContent: 'center', borderRadius: '999px' }}
          onClick={() => setIsOpen(false)}
        >
          Apply Now
        </Link>
      </nav>
            <div className="scrub">
        <i id="scrubFill" ref={scrubRef}></i>
      </div>
    </header>
  );
}
