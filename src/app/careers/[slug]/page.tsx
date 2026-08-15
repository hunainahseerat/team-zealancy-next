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

      <section className="section" style={{ paddingTop: '130px', paddingBottom: '80px' }}>
        <div className="wrap">
          <div style={{ marginBottom: '32px' }}>
            <Link
              href="/careers"
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--muted)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
            >
              ← Back to all open roles
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(260px, 320px) 1fr',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Role Meta Sidebar */}
            <aside
              style={{
                background: 'var(--black)',
                color: 'var(--cream)',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid var(--line-d)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                position: 'sticky',
                top: '110px',
              }}
            >
              <div>
                <span className="label" style={{ color: 'var(--purple-lift)', display: 'block', marginBottom: '8px' }}>
                  Role Overview
                </span>
                <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--cream)', margin: 0, lineHeight: '1.2' }}>
                  {currentJob.title}
                </h2>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span className="badge" style={{ background: 'rgba(183,155,234,0.15)', color: 'var(--purple-lift)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 500 }}>
                  {currentJob.department}
                </span>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--cream)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 500 }}>
                  {currentJob.type}
                </span>
                {currentJob.location && (
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--cream)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 500 }}>
                    {currentJob.location}
                  </span>
                )}
                {currentJob.isUrgent && (
                  <span className="badge" style={{ background: 'rgba(220,53,69,0.2)', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.3)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 600 }}>
                    🔥 Urgent Hiring
                  </span>
                )}
              </div>

              <div style={{ borderTop: '1px solid var(--line-d)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--muted-d)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Department</span>
                  <strong style={{ color: 'var(--cream)' }}>{currentJob.department}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Employment</span>
                  <strong style={{ color: 'var(--cream)' }}>{currentJob.type}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Location</span>
                  <strong style={{ color: 'var(--cream)' }}>{currentJob.location || 'Remote'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Status</span>
                  <strong style={{ color: '#4ade80' }}>Actively Hiring</strong>
                </div>
              </div>

              <a
                href={applyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '15px',
                  textAlign: 'center',
                }}
              >
                Apply for this Role →
              </a>
            </aside>

            {/* Right Column: Detailed Description & Requirements */}
            <article style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              <div>
                <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 600, margin: '0 0 16px 0', lineHeight: '1.1' }}>
                  {currentJob.title}
                </h1>
                <p style={{ fontSize: '19px', color: 'var(--muted)', lineHeight: '1.6', margin: 0 }}>
                  {currentJob.shortDesc}
                </p>
              </div>

              <div style={{ background: 'var(--surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--line)' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '16px', color: 'var(--ink)' }}>
                  About the Position
                </h3>
                <p style={{ color: 'var(--muted)', lineHeight: '1.75', fontSize: '16px', margin: 0 }}>
                  {currentJob.fullDesc || currentJob.shortDesc}
                </p>
              </div>

              {currentJob.responsibilities && currentJob.responsibilities.length > 0 && (
                <div style={{ background: 'var(--surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--line)' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '16px', color: 'var(--ink)' }}>
                    Key Responsibilities
                  </h3>
                  <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--muted)', lineHeight: '1.8', fontSize: '15.5px' }}>
                    {currentJob.responsibilities.map((res, i) => (
                      <li key={i} style={{ marginBottom: '8px' }}>{res}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentJob.requirements && currentJob.requirements.length > 0 && (
                <div style={{ background: 'var(--surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--line)' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '16px', color: 'var(--ink)' }}>
                    What We Are Looking For
                  </h3>
                  <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--muted)', lineHeight: '1.8', fontSize: '15.5px' }}>
                    {currentJob.requirements.map((req, i) => (
                      <li key={i} style={{ marginBottom: '8px' }}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ background: 'linear-gradient(135deg, #1c1226, #2d1847)', padding: '36px', borderRadius: '16px', border: '1px solid var(--purple)', color: '#fff', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 600, margin: 0 }}>Ready to create high-impact content?</h3>
                <p style={{ color: 'var(--muted-d)', margin: 0, fontSize: '15px', maxWidth: '540px' }}>
                  Our team reviews every portfolio carefully. Applications take less than 3 minutes to complete.
                </p>
                <a
                  href={applyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    padding: '14px 28px',
                    borderRadius: '999px',
                    fontWeight: 600,
                    fontSize: '15px',
                    marginTop: '8px',
                  }}
                >
                  Submit Your Application →
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
