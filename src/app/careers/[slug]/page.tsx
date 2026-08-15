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

  const applyHref = `${FILLOUT_APPLY_URL}?role=${encodeURIComponent(job.title)}`;

  return (
    <main>
      <Navbar />

      <section className="section" style={{ paddingTop: '140px', minHeight: '80vh' }}>
        <div className="wrap">
          <div style={{ marginBottom: '24px' }}>
            <Link
              href="/careers"
              style={{
                fontSize: '14px',
                color: 'var(--muted)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              ← Back to all roles
            </Link>
          </div>

          <div className="sec-head" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span className="badge">{job.department}</span>
              <span className="badge">{job.type}</span>
              <span className="badge">{job.location}</span>
              {job.isUrgent && <span className="badge badge-urgent">Urgent</span>}
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', margin: '0 0 16px 0' }}>
              {job.title}
            </h1>

            <p style={{ fontSize: '18px', color: 'var(--muted)', maxWidth: '680px' }}>
              {job.shortDesc}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              marginTop: '40px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h3 style={{ marginBottom: '16px' }}>About the Role</h3>
                <p style={{ color: 'var(--muted)', lineHeight: '1.7' }}>
                  {job.fullDesc || job.shortDesc}
                </p>
              </div>

              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: '16px' }}>What We Are Looking For</h3>
                  <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--muted)' }}>
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <div
                style={{
                  background: 'var(--surface-dark, #141417)',
                  padding: '32px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  position: 'sticky',
                  top: '120px',
                }}
              >
                <h3 style={{ marginBottom: '12px' }}>Interested in this role?</h3>
                <p style={{ color: 'var(--muted)', marginBottom: '24px', fontSize: '14px' }}>
                  Join our fast-moving production engine. Applications take less than 3 minutes.
                </p>

                <a
                  href={applyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '14px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Apply for this Role →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
