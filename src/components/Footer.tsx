'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        {/* fgrid2 navigation */}
        <div className="fgrid2">
          <div className="fcol fbrand">
            <Link href="/" className="logo-wrap" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '14px' }} aria-label="Team Zealancy Homepage">
              <img src="/assets/logo/z-white.svg" alt="Team Zealancy Z Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
            </Link>
            <p className="fblurb">
              The content agency behind some of the biggest channels in the creator economy.
            </p>
            <div className="fsoc">
              <a href="https://www.instagram.com/teamzealancy/" target="_blank" rel="noopener noreferrer" aria-label="Team Zealancy Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
              <a href="https://www.linkedin.com/company/zealancy" target="_blank" rel="noopener noreferrer" aria-label="Team Zealancy LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
          <div className="fcol">
            <h4>Explore</h4>
            <a href="/#what-we-do">What We Do</a>
            <a href="/#why-we-exist">Why We Exist</a>
            <a href="/#team-voices">Team Voices</a>
            <a href="/#company-benefits">Benefits</a>
          </div>
          <div className="fcol">
            <h4>Join us</h4>
            <a href="/#core-leadership">Core Leadership</a>
            <Link href="/careers">Open Roles</Link>
            <a href="/#hiring">How Hiring Works</a>
            <a href="/#faq">Before You Apply</a>
            <Link href="/careers/pitch">Pitch Yourself</Link>
          </div>
          <div className="fcol">
            <h4>Get in touch</h4>
            <a href="mailto:hiring@teamzealancy.com">hiring@teamzealancy.com</a>
            <a href="https://wa.me/923272987768" target="_blank" rel="noopener noreferrer">
              +92 327 2987768
            </a>
          </div>
        </div>

        <div className="fbottom">
          <span>© 2026 Team Zealancy. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link href="/careers" style={{ color: 'var(--muted-d)', fontSize: '12.5px', fontWeight: 500, letterSpacing: '.08em' }}>
              SEE MORE →
            </Link>
            <span>&nbsp;·&nbsp;</span>
            <a role="button" tabIndex={0} style={{ color: 'var(--muted-d)', cursor: 'default' }}>Privacy</a>
            <span>&nbsp;·&nbsp;</span>
            <a role="button" tabIndex={0} style={{ color: 'var(--muted-d)', cursor: 'default' }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
