'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        {/* fgrid2 navigation */}
        <div className="fgrid2">
          <div className="fcol fbrand">
            <Link href="/" className="logo-wrap" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <img src="/assets/logo/logo.png" alt="Team Zealancy logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
            </Link>
            <p className="fblurb">
              The content agency behind some of the biggest channels in the creator economy.
            </p>
            <div className="fsoc">
              <a href="https://www.instagram.com/teamzealancy/" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
              <a href="https://www.linkedin.com/company/zealancy" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4 0 4.75 2.5 4.75 5.8V21h-4v-5.2c0-1.24-.02-2.84-1.9-2.84-1.9 0-2.2 1.36-2.2 2.75V21h-4z" />
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
            <span className="floc">
              Based in Karachi, Pakistan.<br />
              Hiring remotely across the country.
            </span>
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
