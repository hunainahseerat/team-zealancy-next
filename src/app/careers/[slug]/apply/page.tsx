import { notFound } from 'next/navigation';
import Link from 'next/link';
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

export default async function CareerApplyPage({ params }: PageProps) {
  const { slug } = await params;
  const job = MOCK_JOBS.find((j) => j.slug === slug);

  if (!job) {
    notFound();
  }

  const applyUrl = `${FILLOUT_APPLY_URL}?role=${encodeURIComponent(job.title)}`;

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#09090b',
        color: '#ffffff',
        fontFamily: 'sans-serif',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <meta httpEquiv="refresh" content={`0;url=${applyUrl}`} />
      
      <div
        style={{
          maxWidth: '480px',
          background: '#141417',
          padding: '40px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Redirecting to Application...</h2>
        <p style={{ color: '#a1a1aa', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
          Applying for <strong style={{ color: '#fff' }}>{job.title}</strong> at Zealancy. If you are not redirected automatically, click below:
        </p>

        <a
          href={applyUrl}
          style={{
            display: 'inline-block',
            width: '100%',
            background: '#ffffff',
            color: '#000000',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 600,
            textDecoration: 'none',
            marginBottom: '16px',
          }}
        >
          Open Application Form →
        </a>

        <div>
          <Link
            href={`/careers/${slug}`}
            style={{
              color: '#71717a',
              fontSize: '13px',
              textDecoration: 'none',
            }}
          >
            ← Cancel and return to job details
          </Link>
        </div>
      </div>
    </main>
  );
}
