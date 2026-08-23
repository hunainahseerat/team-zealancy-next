'use client';

import React from 'react';
import { motion } from 'framer-motion';

const WHY_WE_EXIST_BG_IMAGE = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop';

const CINEMATIC_STATS = [
  { value: '3.2B+', label: 'Total Views Generated' },
  { value: '50+', label: 'Active Brand Partners' },
  { value: '5M+', label: 'Audience Reached' },
  { value: '22+', label: 'Team Specialists' },
];

export default function WhyWeExist() {
  return (
    <section
      className="dark"
      id="why-we-exist"
      style={{
        backgroundImage: `url(${WHY_WE_EXIST_BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        minHeight: '85vh',
        padding: '120px 0',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Dark gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(11,9,20,0.92) 50%, rgba(0,0,0,0.95) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Ambient subtle purple radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(109,40,217,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, margin: '-80px' }}
        >
          {/* Section Tag */}
          <span
            style={{
              color: '#A855F7',
              fontWeight: 700,
              letterSpacing: '0.22em',
              fontSize: '11px',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '20px',
            }}
          >
            WHY WE EXIST
          </span>

          {/* Primary Focal Headline */}
          <h2
            style={{
              color: '#FFFFFF',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(32px, 4.8vw, 58px)',
              lineHeight: '1.18',
              margin: '0 0 28px 0',
              maxWidth: '920px',
              letterSpacing: '-0.02em',
            }}
          >
            The internet is full of{' '}
            <em style={{ fontStyle: 'italic', color: '#A855F7', fontWeight: 600 }}>
              average
            </em>{' '}
            content. We&apos;re not interested in making more of it.
          </h2>

          {/* Body Paragraph */}
          <p
            style={{
              color: '#CBD5E1',
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              lineHeight: '1.65',
              maxWidth: '680px',
              margin: '0 0 80px 0',
              fontWeight: 400,
            }}
          >
            We exist to help the top 1% of creators build work they&apos;re proud of, with a team that pushes each other to become ridiculously good at their craft.
          </p>

          {/* Border-separated Horizontal Statistics Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '40px 0',
            }}
          >
            {CINEMATIC_STATS.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 24px',
                  borderRight: idx < CINEMATIC_STATS.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 500,
                    fontSize: 'clamp(34px, 4.2vw, 56px)',
                    color: '#FFFFFF',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    color: '#94A3B8',
                    fontSize: '12px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginTop: '10px',
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
