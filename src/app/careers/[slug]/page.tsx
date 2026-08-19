import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MOCK_JOBS } from '@/data/jobs';

const FILLOUT_APPLY_URL = 'https://teamzealancy.fillout.com/t/t5KUpC3pEtus';

export async function generateStaticParams() {
  return MOCK_JOBS.map((job) => ({
    slug: job.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CareerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = MOCK_JOBS.find((j) => j.slug === slug);

  if (!job) {
    notFound();
  }

  const currentJob = job;
  const applyHref = `${FILLOUT_APPLY_URL}?role=${encodeURIComponent(currentJob.title)}`;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <Navbar />

      <section style={{ paddingTop: '90px', paddingBottom: '50px' }}>
        <div className="wrap" style={{ maxWidth: '840px', margin: '0 auto', padding: '0 20px' }}>
          {/* Breadcrumb Back Link */}
          <div style={{ marginBottom: '20px' }}>
            <Link
              href="/careers"
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--muted)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
            >
              ← Back to open roles
            </Link>
          </div>

          {/* Job Header Block (Greenhouse Reference Style) */}
          <header
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '24px',
              marginBottom: '28px',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontSize: 'clamp(26px, 4.2vw, 40px)', fontWeight: 600, color: 'var(--ink)', margin: 0, lineHeight: '1.15', letterSpacing: '-0.02em' }}>
                  {currentJob.title}
                </h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginTop: '10px', fontSize: '13.5px', color: 'var(--muted)' }}>
                  <span>📍 {currentJob.location || 'Pakistan (Remote)'}</span>
                  <span>•</span>
                  <span>💼 {currentJob.type}</span>
                  <span>•</span>
                  <span>📂 {currentJob.department}</span>
                  {currentJob.isUrgent && (
                    <>
                      <span>•</span>
                      <span style={{ color: '#e53e3e', fontWeight: 600 }}>🔥 Urgent Hiring</span>
                    </>
                  )}
                </div>
              </div>

              <a
                href={applyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  padding: '11px 26px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  borderRadius: '999px',
                  whiteSpace: 'nowrap',
                }}
              >
                Apply for this job →
              </a>
            </div>
          </header>

          {/* Job Description Content Sections — Compact, Clean, Left-Aligned */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
            {/* About Team Zealancy */}
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
                About Team Zealancy
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.65', margin: 0 }}>
                Team Zealancy is the content agency behind some of the biggest channels in the creator economy. We engineer high-performing long-form and short-form video content that generates billions of views and millions in revenue for top founders, brands, and edutainment creators.
              </p>
            </div>

            {/* About the Role */}
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
                About the Role
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.65', margin: 0 }}>
                {currentJob.fullDesc || currentJob.shortDesc}
              </p>
            </div>

            {/* Key Responsibilities */}
            {currentJob.responsibilities && currentJob.responsibilities.length > 0 && (
              <div>
                <h3 style={{ fontSize: '19px', fontWeight: 600, color: 'var(--ink)', marginBottom: '10px' }}>
                  Key Responsibilities
                </h3>
                <ul style={{ paddingLeft: '18px', margin: 0, color: 'var(--muted)', lineHeight: '1.7', fontSize: '14.5px' }}>
                  {currentJob.responsibilities.map((res, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{res}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements & Qualifications */}
            {currentJob.requirements && currentJob.requirements.length > 0 && (
              <div>
                <h3 style={{ fontSize: '19px', fontWeight: 600, color: 'var(--ink)', marginBottom: '10px' }}>
                  Qualifications &amp; Requirements
                </h3>
                <ul style={{ paddingLeft: '18px', margin: 0, color: 'var(--muted)', lineHeight: '1.7', fontSize: '14.5px' }}>
                  {currentJob.requirements.map((req, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Why Join Section */}
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
                Why Join Team Zealancy?
              </h3>
              <ul style={{ paddingLeft: '18px', margin: 0, color: 'var(--muted)', lineHeight: '1.7', fontSize: '14.5px' }}>
                <li style={{ marginBottom: '6px' }}><strong>High Impact Work:</strong> Your edits and strategy directly reach millions of viewers on major channels.</li>
                <li style={{ marginBottom: '6px' }}><strong>Fast Growth &amp; Autonomy:</strong> We reward speed, creativity, and extreme ownership.</li>
                <li style={{ marginBottom: '6px' }}><strong>Competitive Pay:</strong> Performance bonuses and top-market compensation for top 1% talent.</li>
                <li style={{ marginBottom: '6px' }}><strong>Remote-First Culture:</strong> Flexible working setup with clear, streamlined async communication.</li>
              </ul>
            </div>

            {/* Bottom Apply CTA Card */}
            <div
              style={{
                marginTop: '12px',
                padding: '24px 28px',
                borderRadius: '16px',
                background: 'var(--black)',
                color: 'var(--cream)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'flex-start',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0, color: 'var(--cream)' }}>
                Apply for this job
              </h3>
              <p style={{ color: 'var(--muted-d)', margin: 0, fontSize: '14px', maxWidth: '540px', lineHeight: '1.55' }}>
                Submit your application in under 3 minutes. Our leadership team directly reviews all portfolios and reels.
              </p>
              <a
                href={applyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  padding: '12px 28px',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '14px',
                  marginTop: '6px',
                }}
              >
                Apply for this position →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
