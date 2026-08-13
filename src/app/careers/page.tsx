'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import { MOCK_JOBS } from '@/data/jobs';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const INITIAL_SHOW_COUNT = 4;

export default function CareersPage() {
  useScrollReveal();
  const [showAll, setShowAll] = useState(false);

  const activeJobs = MOCK_JOBS.filter((j) => j.status === 'active');
  const displayedJobs = showAll ? activeJobs : activeJobs.slice(0, INITIAL_SHOW_COUNT);
  const extraCount = activeJobs.length - INITIAL_SHOW_COUNT;
  const hasMore = extraCount > 0;

  useEffect(() => {
    document.title = 'Open Roles — Team Zealancy Careers';
  }, []);

  return (
    <main>
      <CursorGlow />
      <Navbar />

      {/* Page Header */}
      <section className="section careers-page-hero" style={{ borderTop: 'none', paddingTop: '110px' }}>
        <div className="wrap">
          <div className="sec-head reveal" style={{ maxWidth: '720px' }}>
            <span className="label">Open Roles</span>
            <h1 style={{ fontSize: 'clamp(38px,5.8vw,64px)' }}>
              We don&apos;t hire often. Right now{' '}
              <em>a few seats are open.</em>
            </h1>
            <p>
              Real work from day one. Every role here ships to channels with millions of viewers.
              If your portfolio is strong, we want to hear from you.
            </p>
          </div>

          {/* Only apply if */}
          <div className="applyif reveal">
            <span className="ai-label">Only apply if</span>
            <div className="ai-grid">
              <div className="ai-item">
                <span className="ai-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13z" />
                  </svg>
                </span>
                <p>Your work makes us say <em>&ldquo;f*ck, we need you&rdquo;</em></p>
              </div>
              <div className="ai-item">
                <span className="ai-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="4.5" />
                    <circle cx="12" cy="12" r="1" fill="currentColor" />
                  </svg>
                </span>
                <p>You care about <em>quality</em></p>
              </div>
              <div className="ai-item">
                <span className="ai-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3c3 2 5 5 5 8.5a5 5 0 0 1-10 0C7 8 9 5 12 3z" />
                    <path d="M9.5 21h5" />
                  </svg>
                </span>
                <p>You love solving <em>creative problems</em></p>
              </div>
              <div className="ai-item">
                <span className="ai-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
                  </svg>
                </span>
                <p>You&apos;re willing to <em>put in the work</em></p>
              </div>
            </div>
            <p className="ai-close">If that&apos;s you, <em>we&apos;d love to meet you.</em></p>
          </div>

          {/* Job Listings */}
          <div className="rgrid" id="roles">
            {displayedJobs.map((job, idx) => (
              <article
                key={job.id}
                className="rcard reveal in"
                style={{
                  animation: idx >= INITIAL_SHOW_COUNT ? 'jobFadeIn 0.4s cubic-bezier(0.2,0.7,0.2,1) both' : undefined
                }}
              >
                {job.isUrgent && (
                  <span className="hot">
                    <span className="hot-dot"></span>
                    {job.urgentLabel || 'Hiring urgently'}
                  </span>
                )}
                <h2 className="rtitle">{job.title}</h2>
                <div className="rmeta">
                  <span>{job.mode}</span>
                  <i>&middot;</i>
                  <span>{job.type}</span>
                  <i>&middot;</i>
                  <span>{job.experience}</span>
                </div>
                <p className="rdesc">{job.description}</p>
                <Link href={`/careers/${job.slug}`} className="rapply" target="_blank" rel="noopener noreferrer">
                  View Role{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>

          {/* SEE MORE JOBS Toggle Button */}
          {hasMore && (
            <div className="jobs-expand-wrap">
              <button
                type="button"
                className="jobs-expand-btn"
                onClick={() => setShowAll((prev) => !prev)}
                aria-expanded={showAll}
              >
                {showAll ? 'SHOW LESS ↑' : `SEE MORE JOBS (${extraCount}) →`}
              </button>
            </div>
          )}

          {/* Pitch Yourself */}
          <div className="pitch reveal">
            <div className="pitch-in">
              <h3>
                Don&apos;t see your role? <em>Pitch yourself.</em>
              </h3>
              <p>Any discipline. Send your reel or portfolio and tell us where you&apos;d fit. We read every one.</p>
            </div>
            <Link href="/careers/pitch" className="btn">
              Open application →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
