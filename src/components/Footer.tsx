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
              <img src="/assets/logo/z-logo-white.png" alt="Team Zealancy Z Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
            </Link>
            <p className="fblurb">
              The content agency behind some of the biggest channels in the creator economy.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/teamzealancy/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ display: 'block', flexShrink: 0 }}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>Instagram</span>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/zealancy" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ display: 'block', flexShrink: 0 }}
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="fcol">
            <h4>Explore</h4>
            <a href="/#what-we-do">What We Do</a>
            <a href="/#why-we-exist">Why We Exist</a>
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
        </div>
      </div>
    </footer>
  );
}
