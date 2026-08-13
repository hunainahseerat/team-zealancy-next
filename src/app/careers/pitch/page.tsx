'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const FILLOUT_PITCH_URL = 'https://teamzealancy.fillout.com/t/6LZ2gP9HVQus';

export default function PitchPage() {
  useScrollReveal();

  // Auto-open the external Fillout form
  useEffect(() => {
    window.open(FILLOUT_PITCH_URL, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <main>
      <CursorGlow />
      <Navbar />

      <section className="section page-fade-in" style={{ borderTop: 'none', paddingTop: '110px', paddingBottom: '90px' }}>
        <div className="wrap">
          {/* Breadcrumb */}
          <Link href="/careers" className="job-back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Open Roles
          </Link>

          {/* Pitch hero */}
          <div className="pitch-hero reveal">
            <div className="pitch-hero-left">
              <span className="label" style={{ marginBottom: '16px', display: 'inline-block' }}>Open Application</span>
              <h1 className="pitch-hero-title">
                Pitch<br />Yourself.
              </h1>
              <p className="pitch-hero-desc">
                No open role that fits you? Tell us what you bring. We read every pitch that comes through — and we&apos;ve hired people into roles we didn&apos;t know we needed.
              </p>
              <a
                href={FILLOUT_PITCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn pitch-cta-btn"
              >
                OPEN PITCH FORM →
              </a>
              <p className="pitch-cta-note">
                Opens in a new tab · Takes under 10 minutes
              </p>
            </div>

            <div className="pitch-info-cards">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  ),
                  title: 'Any discipline',
                  desc: 'Editor, designer, writer, strategist, ops — we hire across every creative and operational function.',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  ),
                  title: 'Remote first',
                  desc: 'We work remotely across Pakistan. Location flexible for the right person.',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <line x1="10" y1="9" x2="8" y2="9" />
                    </svg>
                  ),
                  title: 'We read every pitch',
                  desc: 'No automated filtering. A real human reviews your submission within 3 business days.',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  ),
                  title: 'Fast decisions',
                  desc: 'If there\'s a fit — obvious or unexpected — we\'ll reach out directly.',
                },
              ].map((card) => (
                <div key={card.title} className="pitch-info-card">
                  <div className="pitch-card-icon-wrap">{card.icon}</div>
                  <div>
                    <div className="pitch-card-title">{card.title}</div>
                    <div className="pitch-card-desc">{card.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What to include */}
          <div className="pitch-what-section reveal">
            <div className="pitch-what-grid">
              <div>
                <span className="label" style={{ display: 'block', marginBottom: '12px' }}>What we need</span>
                <h2 className="pitch-what-title">
                  Make it easy for us to say yes.
                </h2>
              </div>
              <div className="pitch-checklist">
                {[
                  'Your name and contact info',
                  'What discipline you work in',
                  'A portfolio or reel link',
                  'Your CV or resume',
                  'A short Loom intro (max 1:30)',
                  'Why you want to join Zealancy',
                ].map((item, i) => (
                  <div key={i} className="pitch-check-item">
                    <span className="pitch-check-icon">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="pitch-check-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="jd-cta-banner reveal" style={{ marginTop: '48px' }}>
            <div className="jd-cta-text">
              <strong>Ready to pitch?</strong> We&apos;re listening.
            </div>
            <a
              href={FILLOUT_PITCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ padding: '14px 32px', fontSize: '14px', fontWeight: 700 }}
            >
              SEND YOUR PITCH →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
