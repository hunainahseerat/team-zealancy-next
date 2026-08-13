'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import { MOCK_JOBS } from '@/data/jobs';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const FILLOUT_APPLY_URL = 'https://teamzealancy.fillout.com/t/t5KUpC3pEtus';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function JobDetailPage({ params }: Props) {
  const { slug } = use(params);
  useScrollReveal();

  const job = MOCK_JOBS.find((j) => j.slug === slug);
  if (!job) {
    notFound();
    return null;
  }

  return (
    <main>
      <CursorGlow />
      <Navbar />

      <section className="section page-fade-in" style={{ borderTop: 'none', paddingTop: '110px', paddingBottom: '60px' }}>
        <div className="wrap">

          {/* Breadcrumb */}
          <Link href="/careers" className="job-back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Careers
          </Link>

          {/* Hero Header */}
          <div className="jd-hero reveal">
            <div className="jd-hero-left">
              {job.isUrgent && (
                <span className="hot" style={{ position: 'static', display: 'inline-flex', marginBottom: '20px' }}>
                  <span className="hot-dot" />
                  {job.urgentLabel || 'Hiring urgently'}
                </span>
              )}
              <h1 className="jd-title">{job.title}</h1>
              <div className="jd-meta-row">
                <span className="jd-meta-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  </svg>
                  {job.department}
                </span>
                <span className="jd-meta-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                  </svg>
                  {job.type}
                </span>
                <span className="jd-meta-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" />
                  </svg>
                  {job.mode}
                </span>
                <span className="jd-meta-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                    <path d="M12 2l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V5z" />
                  </svg>
                  {job.experience} experience
                </span>
              </div>
            </div>
            <div className="jd-hero-cta">
              <a
                href={FILLOUT_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn jd-apply-btn"
              >
                APPLY NOW →
              </a>
              <p className="jd-apply-note">Takes under 10 minutes</p>
            </div>
          </div>

          {/* Divider */}
          <div className="jd-divider" />

          {/* Two-column body */}
          <div className="jd-body reveal">

            {/* Main content */}
            <div className="jd-content">

              <div className="jd-section">
                <h2 className="jd-section-title">About the role</h2>
                <p className="jd-text">{job.description}</p>
              </div>

              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="jd-section">
                  <h2 className="jd-section-title">What you'll do</h2>
                  <ul className="jd-list">
                    {job.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="jd-section">
                <h2 className="jd-section-title">What we're looking for</h2>
                <ul className="jd-list">
                  {job.requirements && job.requirements.length > 0 ? (
                    job.requirements.map((r, i) => <li key={i}>{r}</li>)
                  ) : (
                    <>
                      <li>A portfolio that speaks for itself — work that makes us stop scrolling</li>
                      <li>Someone who cares deeply about the quality of their craft</li>
                      <li>Someone who takes ownership without being told to</li>
                      <li>Someone who uses feedback to get meaningfully better</li>
                      <li>{job.experience} of relevant hands-on experience</li>
                    </>
                  )}
                </ul>
              </div>

              {job.niceToHave && job.niceToHave.length > 0 && (
                <div className="jd-section">
                  <h2 className="jd-section-title">Nice to have</h2>
                  <ul className="jd-list jd-list-soft">
                    {job.niceToHave.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="jd-section">
                <h2 className="jd-section-title">Why join Team Zealancy</h2>
                <div className="jd-perks-grid">
                  {[
                    { icon: '💰', title: 'Above-market pay', desc: 'Performance bonuses on top of your base salary.' },
                    { icon: '🏥', title: 'Full health insurance', desc: 'Coverage for you and your family.' },
                    { icon: '📚', title: 'Learning budget', desc: 'Annual budget to level up your skills.' },
                    { icon: '⏰', title: 'Flexible hours', desc: 'We count output, not seat time.' },
                    { icon: '🎉', title: 'Eid bonuses', desc: 'On top of your base salary, every year.' },
                    { icon: '🚀', title: 'Real ownership', desc: 'A team that pushes you to become genuinely great.' },
                  ].map((p) => (
                    <div key={p.title} className="jd-perk-card">
                      <span className="jd-perk-icon">{p.icon}</span>
                      <div>
                        <div className="jd-perk-title">{p.title}</div>
                        <div className="jd-perk-desc">{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="jd-sidebar">
              <div className="jd-sidebar-card">
                <div className="jd-sidebar-head">
                  <span className="jd-sidebar-label">Ready to apply?</span>
                  <h3 className="jd-sidebar-title">{job.title}</h3>
                  <p className="jd-sidebar-meta">{job.mode} · {job.type} · {job.experience}</p>
                </div>
                <div className="jd-sidebar-divider" />
                <p className="jd-sidebar-note">
                  The application takes under 10 minutes. We review every portfolio personally — no AI screening.
                </p>
                <a
                  href={FILLOUT_APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px 24px' }}
                >
                  APPLY NOW →
                </a>
                <p className="jd-sidebar-alt">
                  Not this role?{' '}
                  <Link href="/careers" style={{ color: 'var(--purple)', fontWeight: 600 }}>
                    See all open roles
                  </Link>
                </p>
              </div>

              {/* Process steps */}
              <div className="jd-process-card">
                <div className="jd-process-title">How hiring works</div>
                {[
                  'Apply via the form',
                  'We review your portfolio',
                  'Short intro call',
                  'Paid trial task',
                  'Offer',
                ].map((step, i) => (
                  <div key={i} className="jd-process-step">
                    <span className="jd-process-num">{i + 1}</span>
                    <span className="jd-process-text">{step}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          {/* Bottom CTA banner */}
          <div className="jd-cta-banner reveal">
            <div className="jd-cta-text">
              <strong>Convinced?</strong> We&apos;d love to see your work.
            </div>
            <a
              href={FILLOUT_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ padding: '14px 32px', fontSize: '14px', fontWeight: 700 }}
            >
              APPLY FOR THIS ROLE →
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
