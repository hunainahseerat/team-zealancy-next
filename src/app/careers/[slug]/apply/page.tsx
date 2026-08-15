import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import { MOCK_JOBS } from '@/data/jobs';

const FILLOUT_APPLY_URL = 'https://teamzealancy.fillout.com/t/t5KUpC3pEtus';

export async function generateStaticParams() {
  return MOCK_JOBS.map((job) => ({
    slug: job.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ApplyPage({ params }: Props) {
  const { slug } = use(params);
  const job = MOCK_JOBS.find((j) => j.slug === slug);
  if (!job) {
    notFound();
    return null;
  }

  // Immediately redirect to external form in new tab, then show a bridge page
  useEffect(() => {
    window.open(FILLOUT_APPLY_URL, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <main>
      <CursorGlow />
      <Navbar />
      <section className="section page-fade-in" style={{ borderTop: 'none', paddingTop: '110px', paddingBottom: '80px' }}>
        <div className="wrap" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: 'var(--purple)', color: '#fff',
            display: 'grid', placeItems: 'center', margin: '0 auto 28px',
            boxShadow: '0 12px 32px -10px var(--purple)',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
          <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', marginBottom: '16px' }}>Opening application form…</h1>
          <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6, maxWidth: '42ch', margin: '0 auto 32px' }}>
            The application form for <strong>{job.title}</strong> should have opened in a new tab. If it didn&apos;t, click below.
          </p>
          <a
            href={FILLOUT_APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{ padding: '14px 32px', fontSize: '15px', fontWeight: 700 }}
          >
            OPEN APPLICATION FORM →
          </a>
          <div style={{ marginTop: '24px' }}>
            <Link href={`/careers/${job.slug}`} style={{ color: 'var(--muted-d)', fontSize: '13.5px', fontWeight: 500 }}>
              ← Back to role details
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
