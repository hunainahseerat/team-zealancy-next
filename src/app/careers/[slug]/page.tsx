import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Briefcase, Clock, Globe, Check, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MOCK_JOBS } from '@/data/jobs';
import { DynamicTOC, CopyShareBar, ClarityFeedbackWidget } from './JobDetailInteractive';

const FILLOUT_APPLY_URL = 'https://teamzealancy.fillout.com/t/t5KUpC3pEtus';

export function getRoleBannerImage(slug: string): string {
  switch (slug) {
    // -- Video Production (Unique per role) --
    case 'long-form-video-editor':
      return 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1600&auto=format&fit=crop';
    case 'short-form-video-editor-ugc-ads':
      return 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1600&auto=format&fit=crop';
    case 'higgsfield-expert-ai-generations':
      return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop';
    case 'senior-video-editor':
      return 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=1600&auto=format&fit=crop';

    // -- Design & Creative (Unique per role) --
    case 'thumbnail-designer':
      return 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1600&auto=format&fit=crop';
    case 'graphics-designer':
      return 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1600&auto=format&fit=crop';

    // -- Content & Writing (Unique per role) --
    case 'content-writer':
      return 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1600&auto=format&fit=crop';
    case 'scriptwriter':
      return 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1600&auto=format&fit=crop';

    // -- Business Development (Unique per role) --
    case 'business-development-representative':
      return 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1600&auto=format&fit=crop';
    case 'proposal-writer':
      return 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop';
    case 'business-development-manager':
      return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop';

    // -- Engineering & Tech (Unique per role) --
    case 'full-stack-developer':
      return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop';
    case 'it-system-administrator':
      return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop';

    // -- Operations & Management (Unique per role) --
    case 'project-manager':
      return 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1600&auto=format&fit=crop';
    case 'account-manager':
      return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop';
    case 'operations-manager':
      return 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop';
    case 'admin':
      return 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop';

    // -- People & Culture (Unique per role) --
    case 'creative-recruiter':
      return 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1600&auto=format&fit=crop';
    case 'hr-people-operations':
      return 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop';

    default:
      return 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1600&auto=format&fit=crop';
  }
}

export async function generateStaticParams() {
  return MOCK_JOBS.map((job) => ({
    slug: job.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = MOCK_JOBS.find((j) => j.slug === slug);

  if (!job) {
    return {
      title: 'Role Not Found - Team Zealancy Careers',
      description: 'The requested job opening could not be found.',
    };
  }

  const title = `${job.title} - Team Zealancy Careers`;
  const description = job.shortDesc || job.description || `Join Team Zealancy as a ${job.title}. Apply now for open positions.`;
  const bannerImage = getRoleBannerImage(job.slug);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://teamzealancy.com/careers/${job.slug}`,
      images: [
        {
          url: bannerImage,
          width: 1200,
          height: 630,
          alt: `${job.title} at Team Zealancy`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [bannerImage],
    },
  };
}

export default async function DynamicJobDescriptionPage({ params }: PageProps) {
  const { slug } = await params;
  const job = MOCK_JOBS.find((j) => j.slug === slug);

  if (!job) {
    notFound();
  }

  const bannerImage = getRoleBannerImage(job.slug);
  const applyHref = `${FILLOUT_APPLY_URL}?role=${encodeURIComponent(job.title)}`;

  return (
    <div className="jd-artifact-root">
      {/* Site-wide Navbar */}
      <Navbar />

      <main className="jd-main-wrap">
        <div className="wrap">
          {/* Breadcrumb Back Link */}
          <div className="jd-breadcrumb-bar">
            <Link href="/careers" className="jd-back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back to all open roles</span>
            </Link>
          </div>

          {/* 100% Frozen Visual Template: Hero Banner with Role-Specific Background & Soft Purple Linear Gradient Overlay */}
          <header
            className="banner"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(88, 28, 135, 0.65) 0%, rgba(15, 12, 20, 0.78) 100%), url(${bannerImage})`,
            }}
          >
            <div className="banner-content">
              <div className="banner-badge-row">
                <span className="banner-dept-tag">{job.department}</span>
                {job.isUrgent && (
                  <span className="banner-urgent-tag">
                    <span className="hot-dot" />
                    {job.urgentLabel || 'Urgent Hiring'}
                  </span>
                )}
              </div>

              <h1>{job.title}</h1>

              <p className="sub">
                {job.shortDesc || 'Make content for the top 1% of creators and high-growth brands.'}
              </p>
            </div>
          </header>

          {/* Info-bar Metadata (.meta-row) */}
          <div className="meta-row">
            <div className="meta-item">
              <span className="meta-icon"><MapPin className="w-4 h-4 text-purple-600 inline mr-1" /></span>
              <span className="meta-label">Location:</span>
              <span className="meta-val">{job.location || 'Pakistan (Remote)'}</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item">
              <span className="meta-icon"><Briefcase className="w-4 h-4 text-purple-600 inline mr-1" /></span>
              <span className="meta-label">Employment:</span>
              <span className="meta-val">{job.type || 'Full-time'}</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item">
              <span className="meta-icon"><Clock className="w-4 h-4 text-purple-600 inline mr-1" /></span>
              <span className="meta-label">Experience:</span>
              <span className="meta-val">{job.experience || '2+ years'}</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item">
              <span className="meta-icon"><Globe className="w-4 h-4 text-purple-600 inline mr-1" /></span>
              <span className="meta-label">Mode:</span>
              <span className="meta-val">{job.mode || 'Remote'}</span>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="jd-grid-layout">
            {/* Left Content Column */}
            <article className="jd-content-col">
              {/* Dynamic Table of Contents */}
              <DynamicTOC />

              {/* Section 1: The Role */}
              <section id="role" className="jd-section">
                <div className="jd-sec-header">
                  <span className="jd-sec-num">01</span>
                  <h2>The Role</h2>
                </div>
                <p>
                  {job.fullDesc || job.description || job.shortDesc}
                </p>
              </section>

              {/* Section 2: Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <section id="responsibilities" className="jd-section">
                  <div className="jd-sec-header">
                    <span className="jd-sec-num">02</span>
                    <h2>Responsibilities</h2>
                  </div>
                  <ul className="reqs">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Section 3: Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <section id="requirements" className="jd-section">
                  <div className="jd-sec-header">
                    <span className="jd-sec-num">03</span>
                    <h2>Requirements &amp; Qualifications</h2>
                  </div>
                  <ul className="reqs">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>

                  {job.niceToHave && job.niceToHave.length > 0 && (
                    <div className="jd-nice-to-have">
                      <h3>Bonus Points / Nice to Have</h3>
                      <ul className="reqs nice-reqs">
                        {job.niceToHave.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}

              {/* Section 4: Company Benefits - 100% Synced with Live Site Grid & Symmetry */}
              <section id="benefits" className="jd-section jd-benefits-section">
                <div className="jd-sec-header">
                  <span className="jd-sec-num">04</span>
                  <div>
                    <span className="label" style={{ display: 'block', marginBottom: '4px' }}>Company Benefits</span>
                    <h2>More than a <em>paycheck.</em></h2>
                  </div>
                </div>
                
                <p className="jd-benefits-intro">
                  We go after the best people in the country. If you&apos;re one of them, you never have to worry about a thing.
                </p>

                {/* Symmetrical 2-Column Benefits Grid */}
                <div className="jd-perks-grid">
                  <div className="jd-perk-card">
                    <span className="jd-pico">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v10M9.5 9.5c0-1 1-1.7 2.5-1.7s2.5.7 2.5 1.7c0 2.6-5 1.6-5 4.4 0 1 1 1.8 2.5 1.8s2.5-.8 2.5-1.8" />
                      </svg>
                    </span>
                    <div className="jd-perk-body">
                      <h3>Above-market pay</h3>
                      <p>A base that beats agency rates, with commission on top.</p>
                    </div>
                  </div>

                  <div className="jd-perk-card">
                    <span className="jd-pico">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    </span>
                    <div className="jd-perk-body">
                      <h3>Health insurance</h3>
                      <p>Full medical cover for you and your loved ones.</p>
                    </div>
                  </div>

                  <div className="jd-perk-card">
                    <span className="jd-pico">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3.5" y="9" width="17" height="11.5" rx="1" />
                        <path d="M3.5 13h17M12 9v11.5" />
                        <path d="M12 9C11 6.5 9.4 5.6 7.9 6.1S6.8 8.8 9 9zM12 9c1-2.5 2.6-3.4 4.1-2.9s1.1 2.7-1.1 2.9z" />
                      </svg>
                    </span>
                    <div className="jd-perk-body">
                      <h3>Eid bonuses</h3>
                      <p>Extra pay at both Eids, on top of your salary.</p>
                    </div>
                  </div>

                  <div className="jd-perk-card">
                    <span className="jd-pico">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3c3 2 5 5 5 9a5 5 0 0 1-10 0c0-4 2-7 5-9z" />
                        <path d="M9 21h6" />
                      </svg>
                    </span>
                    <div className="jd-perk-body">
                      <h3>Learning budget</h3>
                      <p>Real money every year to level up your craft.</p>
                    </div>
                  </div>

                  <div className="jd-perk-card">
                    <span className="jd-pico">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" />
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                    </span>
                    <div className="jd-perk-body">
                      <h3>Paid time off</h3>
                      <p>Paid leave, sponsored retreats, and team meals.</p>
                    </div>
                  </div>

                  <div className="jd-perk-card">
                    <span className="jd-pico">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3.5 2" />
                      </svg>
                    </span>
                    <div className="jd-perk-body">
                      <h3>Flexible hours</h3>
                      <p>Own your schedule. We count output, not hours.</p>
                    </div>
                  </div>

                  {/* Performance Feature Banner matching Landing Page */}
                  <div className="jd-perk-feature">
                    <svg
                      className="jd-pf-rings"
                      viewBox="0 0 120 120"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <g transform="translate(4 18) scale(3.1)">
                        <path d="M12 2.6v18.8" />
                        <path d="M16.4 7.9c0-1.9-2-3.1-4.4-3.1s-4.4 1.2-4.4 3.1c0 4.5 8.8 2.6 8.8 7 0 1.9-2 3.1-4.4 3.1s-4.4-1.2-4.4-3.1" />
                      </g>
                      <g transform="translate(52 4) scale(2.1)" opacity=".7">
                        <path d="M12 2.6v18.8" />
                        <path d="M16.4 7.9c0-1.9-2-3.1-4.4-3.1s-4.4 1.2-4.4 3.1c0 4.5 8.8 2.6 8.8 7 0 1.9-2 3.1-4.4 3.1s-4.4-1.2-4.4-3.1" />
                      </g>
                    </svg>
                    <div className="jd-pf-inner">
                      <span className="jd-pf-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                          <path d="M12 2.6v18.8" />
                          <path d="M16.4 7.9c0-1.9-2-3.1-4.4-3.1s-4.4 1.2-4.4 3.1c0 4.5 8.8 2.6 8.8 7 0 1.9-2 3.1-4.4 3.1s-4.4-1.2-4.4-3.1" />
                        </svg>
                        For outperformers
                      </span>
                      <h3>Performance <em>Partnership.</em></h3>
                      <p>
                        The people who drive real results don&apos;t stop at a salary. They come in as partners and share in what they help build. Open to anyone who reaches that level.
                      </p>
                      <div className="jd-pf-tc">Terms and conditions apply.</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Interactive Clarity Feedback Widget */}
              <ClarityFeedbackWidget />
            </article>

            {/* Right Sticky Sidebar Column */}
            <aside className="jd-sidebar-col">
              <div className="jd-apply-card">
                <div className="jd-apply-badge">Open Role</div>
                <h3 className="jd-sidebar-role-title">{job.title}</h3>
                <div className="jd-sidebar-meta">
                  <span>{job.department}</span>
                  <i>•</i>
                  <span>{job.type}</span>
                </div>

                <div className="jd-sidebar-divider" />

                <div className="jd-sidebar-highlights">
                  <div className="jd-highlight-item">
                    <span className="hl-icon"><Check className="w-4 h-4 text-purple-600 inline mr-1" /></span>
                    <span>Direct review by leadership</span>
                  </div>
                  <div className="jd-highlight-item">
                    <span className="hl-icon"><Clock className="w-4 h-4 text-purple-600 inline mr-1" /></span>
                    <span>24-48h initial review time</span>
                  </div>
                  <div className="jd-highlight-item">
                    <span className="hl-icon"><Briefcase className="w-4 h-4 text-purple-600 inline mr-1" /></span>
                    <span>{job.mode} setup</span>
                  </div>
                </div>

                <a
                  href={applyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn jd-sidebar-apply-btn"
                >
                  Apply Now <ArrowUpRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <p className="jd-sidebar-apply-note">
                  Quick 3-minute application. Please have your portfolio or reel ready.
                </p>

                <div className="jd-sidebar-divider" />

                {/* Interactive Copy & Share Buttons */}
                <CopyShareBar jobTitle={job.title} slug={job.slug} />
              </div>

              {/* Pitch Alternative Card */}
              <div className="jd-pitch-mini-card">
                <h4>Have a different vision?</h4>
                <p>If you think your specific skillset can elevate Team Zealancy in a custom role, we&apos;d love to hear from you.</p>
                <Link href="/careers/pitch" className="jd-pitch-link">
                  Pitch a custom role â†’
                </Link>
              </div>
            </aside>
          </div>

          {/* Bottom Full-Width Apply Banner */}
          <section className="jd-bottom-apply-banner">
            <div className="jd-bottom-apply-content">
              <h3>Ready to join Team Zealancy?</h3>
              <p>
                We are actively looking for exceptional talent to fill the <strong>{job.title}</strong> role. Applications are reviewed on a rolling basis.
              </p>
            </div>
            <a
              href={applyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn jd-bottom-btn"
            >
              Apply for {job.title} â†’
            </a>
          </section>
        </div>
      </main>

      {/* Site-wide Footer */}
      <Footer />

      <style>{`
        /* =========================================================
           Claude Artifact 100% Frozen Visual Template & Design System
           Light Theme: #F4F1E9 (Paper), #5D2DB0 (Purple), #191521 (Ink)
           Headings: Fraunces Serif | Body: Inter Sans-serif
           ========================================================= */

        .jd-artifact-root {
          background: #F4F1E9;
          color: #191521;
          min-height: 100vh;
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .jd-main-wrap {
          padding-top: 48px;
          padding-bottom: 24px;
        }

        .jd-breadcrumb-bar {
          margin-bottom: 22px;
        }

        .jd-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 600;
          color: #6C6575;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .jd-back-link:hover {
          color: #5D2DB0;
          transform: translateX(-3px);
        }

        /* Hero Banner (.banner) - Exact radial gradient overlay & compact padding */
        .banner {
          position: relative;
          border-radius: 24px;
          background-size: cover;
          background-position: center;
          padding: 46px 40px;
          color: #F1EEE6;
          overflow: hidden;
          box-shadow: 0 16px 44px -16px rgba(25, 21, 33, 0.35);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 250px;
        }

        .banner-content {
          position: relative;
          z-index: 2;
          max-width: 780px;
        }

        .banner-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }

        .banner-dept-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #B79BEA;
          background: rgba(93, 45, 176, 0.35);
          border: 1px solid rgba(183, 155, 234, 0.3);
          padding: 5px 12px;
          border-radius: 999px;
          backdrop-filter: blur(8px);
        }

        .banner-urgent-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 700;
          color: #FF6B6B;
          background: rgba(255, 107, 107, 0.18);
          border: 1px solid rgba(255, 107, 107, 0.35);
          padding: 5px 12px;
          border-radius: 999px;
          backdrop-filter: blur(8px);
        }

        .banner h1 {
          font-family: "Fraunces", Georgia, serif;
          font-size: clamp(30px, 4.4vw, 48px);
          font-weight: 600;
          line-height: 1.1;
          color: #FFFFFF;
          margin: 0 0 12px;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
        }

        .banner .sub {
          font-size: 15.5px;
          line-height: 1.6;
          color: rgba(241, 238, 230, 0.88);
          margin: 0;
          max-width: 650px;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);
        }

        /* Info-bar Metadata (.meta-row) */
        .meta-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          background: #FFFFFF;
          border: 1px solid rgba(25, 21, 33, 0.12);
          border-radius: 18px;
          padding: 16px 24px;
          margin-top: 20px;
          margin-bottom: 36px;
          box-shadow: 0 6px 20px -8px rgba(25, 21, 33, 0.08);
        }

        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13.5px;
        }

        .meta-icon {
          font-size: 15px;
        }

        .meta-label {
          color: #6C6575;
          font-weight: 500;
        }

        .meta-val {
          color: #191521;
          font-weight: 600;
        }

        .meta-divider {
          width: 1px;
          height: 18px;
          background: rgba(25, 21, 33, 0.12);
        }

        /* Main Grid Layout */
        .jd-grid-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 48px;
          align-items: start;
        }

        .jd-content-col {
          display: flex;
          flex-direction: column;
          gap: 36px;
          min-width: 0;
        }

        /* Dynamic TOC Component */
        .jd-toc-container {
          position: sticky;
          top: 86px;
          z-index: 10;
          background: rgba(244, 241, 233, 0.94);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 8px 0;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(25, 21, 33, 0.08);
        }

        .jd-toc-track {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 4px 0;
        }
        .jd-toc-track::-webkit-scrollbar {
          display: none;
        }

        .jd-toc-pill {
          background: #FFFFFF;
          border: 1px solid rgba(25, 21, 33, 0.12);
          color: #6C6575;
          font-size: 12.5px;
          font-weight: 600;
          padding: 7px 16px;
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .jd-toc-pill:hover {
          color: #5D2DB0;
          border-color: #5D2DB0;
          background: rgba(93, 45, 176, 0.05);
        }

        .jd-toc-pill.is-active {
          background: #5D2DB0;
          color: #FFFFFF;
          border-color: #5D2DB0;
          box-shadow: 0 4px 12px -2px rgba(93, 45, 176, 0.35);
        }

        /* Section Layouts */
        .jd-section {
          background: #FFFFFF;
          border: 1px solid rgba(25, 21, 33, 0.1);
          border-radius: 20px;
          padding: 34px 36px;
          box-shadow: 0 4px 20px -6px rgba(25, 21, 33, 0.05);
          scroll-margin-top: 140px;
        }

        .jd-sec-header {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 18px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(25, 21, 33, 0.08);
        }

        .jd-sec-num {
          font-family: "Fraunces", Georgia, serif;
          font-style: italic;
          font-size: 17px;
          color: #5D2DB0;
          font-weight: 600;
        }

        .jd-sec-header h2 {
          font-family: "Fraunces", Georgia, serif;
          font-size: 23px;
          font-weight: 600;
          color: #191521;
          margin: 0;
          letter-spacing: -0.015em;
        }
        .jd-sec-header h2 em {
          font-style: italic;
          color: #5D2DB0;
        }

        .jd-section p {
          font-size: 15.5px;
          line-height: 1.72;
          color: #4A4353;
          margin: 0 0 16px;
        }
        .jd-section p:last-child {
          margin-bottom: 0;
        }

        /* Responsibilities & Requirements Lists (.reqs) */
        ul.reqs {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        ul.reqs li {
          position: relative;
          padding-left: 26px;
          font-size: 15px;
          line-height: 1.65;
          color: #4A4353;
        }

        ul.reqs li::before {
          content: "";
          position: absolute;
          left: 4px;
          top: 10px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #5D2DB0;
          box-shadow: 0 0 0 3px rgba(93, 45, 176, 0.15);
        }

        .jd-nice-to-have {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px dashed rgba(25, 21, 33, 0.12);
        }

        .jd-nice-to-have h3 {
          font-family: "Fraunces", Georgia, serif;
          font-size: 18px;
          font-weight: 600;
          color: #191521;
          margin: 0 0 14px;
        }

        ul.nice-reqs li::before {
          background: #B79BEA;
          box-shadow: 0 0 0 3px rgba(183, 155, 234, 0.2);
        }

        /* Company Benefits Section Alignment & Perks Grid */
        .jd-benefits-intro {
          font-size: 15.5px;
          color: #6C6575;
          line-height: 1.65;
          margin-bottom: 24px;
        }

        .jd-perks-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .jd-perk-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 22px;
          background: #FBF9F3;
          border: 1px solid rgba(25, 21, 33, 0.08);
          border-radius: 16px;
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .jd-perk-card:hover {
          border-color: #5D2DB0;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px -10px rgba(93, 45, 176, 0.18);
        }

        .jd-pico {
          flex: none;
          color: #5D2DB0;
          margin-top: 2px;
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(93, 45, 176, 0.08);
        }

        .jd-perk-body h3 {
          font-family: "Fraunces", Georgia, serif;
          font-size: 18px;
          font-weight: 600;
          color: #191521;
          margin: 0 0 6px;
          line-height: 1.2;
        }

        .jd-perk-body p {
          font-size: 13.5px;
          color: #6C6575;
          margin: 0;
          line-height: 1.5;
        }

        /* Performance Feature Card in Benefits */
        .jd-perk-feature {
          grid-column: 1 / -1;
          position: relative;
          overflow: hidden;
          margin-top: 8px;
          padding: 36px 38px;
          border: 1px solid rgba(183, 155, 234, 0.28);
          border-radius: 20px;
          color: #F1EEE6;
          background: radial-gradient(120% 150% at 88% -30%, rgba(93, 45, 176, 0.5), transparent 55%), linear-gradient(120deg, #1b1426, #141019);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .jd-perk-feature:hover {
          transform: translateY(-2px);
          box-shadow: 0 24px 50px -20px rgba(93, 45, 176, 0.55);
        }

        .jd-pf-inner {
          position: relative;
          z-index: 1;
          max-width: 540px;
        }

        .jd-pf-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #B79BEA;
          background: rgba(183, 155, 234, 0.14);
          border: 1px solid rgba(183, 155, 234, 0.3);
          padding: 5px 12px;
          border-radius: 999px;
          margin-bottom: 14px;
        }

        .jd-perk-feature h3 {
          font-family: "Fraunces", Georgia, serif;
          font-size: clamp(22px, 3vw, 28px);
          margin: 0 0 10px;
          color: #FFFFFF;
        }
        .jd-perk-feature h3 em {
          font-style: italic;
          color: #B79BEA;
        }

        .jd-perk-feature p {
          color: rgba(241, 238, 230, 0.78);
          font-size: 14.5px;
          line-height: 1.6;
          margin: 0;
        }

        .jd-pf-tc {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid rgba(241, 238, 230, 0.15);
          color: rgba(241, 238, 230, 0.5);
          font-size: 12px;
        }

        .jd-pf-rings {
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          width: 240px;
          height: 240px;
          color: #B79BEA;
          opacity: 0.15;
          z-index: 0;
          pointer-events: none;
        }

        /* Clarity Feedback Widget */
        .jd-clarity-box {
          background: #FBF9F3;
          border: 1px dashed rgba(93, 45, 176, 0.35);
          border-radius: 16px;
          padding: 18px 24px;
        }

        .jd-clarity-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }

        .jd-clarity-question {
          font-size: 14px;
          font-weight: 600;
          color: #191521;
        }

        .jd-clarity-btns {
          display: flex;
          gap: 10px;
        }

        .jd-clarity-btn {
          background: #FFFFFF;
          border: 1px solid rgba(25, 21, 33, 0.14);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 500;
          color: #191521;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .jd-clarity-btn:hover {
          border-color: #5D2DB0;
          color: #5D2DB0;
          background: rgba(93, 45, 176, 0.06);
        }

        .jd-clarity-thanks {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 600;
          color: #5D2DB0;
        }

        /* Sidebar Column */
        .jd-sidebar-col {
          position: sticky;
          top: 96px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .jd-apply-card {
          background: #FFFFFF;
          border: 1px solid rgba(25, 21, 33, 0.12);
          border-radius: 22px;
          padding: 30px 28px;
          box-shadow: 0 12px 36px -12px rgba(25, 21, 33, 0.12);
        }

        .jd-apply-badge {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #5D2DB0;
          background: rgba(93, 45, 176, 0.08);
          border: 1px solid rgba(93, 45, 176, 0.2);
          padding: 4px 10px;
          border-radius: 999px;
          margin-bottom: 12px;
        }

        .jd-sidebar-role-title {
          font-family: "Fraunces", Georgia, serif;
          font-size: 22px;
          font-weight: 600;
          color: #191521;
          margin: 0 0 6px;
          line-height: 1.2;
        }

        .jd-sidebar-meta {
          font-size: 13px;
          color: #6C6575;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .jd-sidebar-divider {
          height: 1px;
          background: rgba(25, 21, 33, 0.1);
          margin: 20px 0;
        }

        .jd-sidebar-highlights {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 22px;
        }

        .jd-highlight-item {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          color: #4A4353;
          font-weight: 500;
        }

        .hl-icon {
          font-size: 14px;
        }

        .jd-sidebar-apply-btn {
          width: 100%;
          justify-content: center;
          font-size: 14.5px;
          font-weight: 700;
          padding: 14px 24px;
          border-radius: 999px;
          background: #5D2DB0;
          color: #FFFFFF;
          box-shadow: 0 8px 24px -6px rgba(93, 45, 176, 0.45);
        }
        .jd-sidebar-apply-btn:hover {
          background: #4F2699;
          box-shadow: 0 12px 28px -4px rgba(93, 45, 176, 0.55);
        }

        .jd-sidebar-apply-note {
          font-size: 12px;
          color: #6C6575;
          line-height: 1.45;
          text-align: center;
          margin: 12px 0 0;
        }

        /* Share & Copy Bar */
        .jd-share-wrap {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .jd-share-label {
          font-size: 12px;
          font-weight: 600;
          color: #6C6575;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .jd-share-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .jd-copy-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #FBF9F3;
          border: 1px solid rgba(25, 21, 33, 0.14);
          border-radius: 999px;
          padding: 8px 14px;
          font-size: 12.5px;
          font-weight: 600;
          color: #191521;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .jd-copy-btn:hover {
          background: #FFFFFF;
          border-color: #5D2DB0;
          color: #5D2DB0;
        }

        .jd-copy-btn.is-copied {
          background: rgba(93, 45, 176, 0.1);
          border-color: #5D2DB0;
          color: #5D2DB0;
        }

        .jd-share-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FBF9F3;
          border: 1px solid rgba(25, 21, 33, 0.14);
          color: #6C6575;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .jd-share-icon-btn:hover {
          background: #FFFFFF;
          border-color: #5D2DB0;
          color: #5D2DB0;
          transform: translateY(-2px);
        }

        /* Pitch Mini Card */
        .jd-pitch-mini-card {
          background: #FFFFFF;
          border: 1px solid rgba(25, 21, 33, 0.1);
          border-radius: 18px;
          padding: 22px 24px;
        }

        .jd-pitch-mini-card h4 {
          font-family: "Fraunces", Georgia, serif;
          font-size: 16px;
          font-weight: 600;
          color: #191521;
          margin: 0 0 6px;
        }

        .jd-pitch-mini-card p {
          font-size: 13px;
          color: #6C6575;
          line-height: 1.5;
          margin: 0 0 12px;
        }

        .jd-pitch-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 600;
          color: #5D2DB0;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .jd-pitch-link:hover {
          text-decoration: underline;
        }

        /* Bottom Full-Width Apply Banner */
        .jd-bottom-apply-banner {
          margin-top: 36px;
          margin-bottom: 0;
          background: #141019;
          color: #F1EEE6;
          border-radius: 24px;
          padding: 36px 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.4);
        }

        .jd-bottom-apply-content h3 {
          font-family: "Fraunces", Georgia, serif;
          font-size: clamp(22px, 2.8vw, 30px);
          font-weight: 600;
          color: #FFFFFF;
          margin: 0 0 8px;
        }

        .jd-bottom-apply-content p {
          font-size: 15px;
          color: rgba(241, 238, 230, 0.75);
          margin: 0;
          max-width: 580px;
          line-height: 1.55;
        }

        .jd-bottom-apply-content strong {
          color: #B79BEA;
        }

        .jd-bottom-btn {
          flex: none;
          font-size: 14.5px;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 999px;
          background: #5D2DB0;
          color: #FFFFFF;
          white-space: nowrap;
          box-shadow: 0 8px 24px -6px rgba(93, 45, 176, 0.5);
        }
        .jd-bottom-btn:hover {
          background: #4F2699;
          box-shadow: 0 12px 28px -4px rgba(93, 45, 176, 0.65);
        }

        /* Mobile Breakpoints */
        @media (max-width: 900px) {
          .banner {
            padding: 32px 24px;
            min-height: 200px;
          }
          .meta-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 16px 20px;
          }
          .meta-divider {
            display: none;
          }
          .jd-grid-layout {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .jd-sidebar-col {
            position: static;
          }
          .jd-perks-grid {
            grid-template-columns: 1fr;
          }
          .jd-bottom-apply-banner {
            flex-direction: column;
            align-items: flex-start;
            padding: 28px 24px;
          }
          .jd-bottom-btn {
            width: 100%;
            justify-content: center;
          }
          .jd-section {
            padding: 24px 20px;
          }
        }
      `}</style>
    </div>
  );
}

