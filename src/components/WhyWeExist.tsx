'use client';

import React from 'react';
import { motion } from 'framer-motion';

const OFFICE_BG_IMAGE = '/assets/office-bg.jpg';

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
        backgroundImage: `url(${OFFICE_BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative',
        minHeight: 'auto',
        padding: '76px 0 68px 0',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Mandatory Strong Linear Dark Gradient Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(13,11,18,0.92) 0%, rgba(13,11,18,0.75) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        className="wrap"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 32px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, margin: '-60px' }}
        >
          {/* Section Tag */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, margin: '-60px' }}
            style={{
              color: '#C084FC',
              fontWeight: 700,
              letterSpacing: '0.22em',
              fontSize: '11px',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            WHY WE EXIST
          </motion.span>

          {/* Primary Focal Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, margin: '-60px' }}
            style={{
              color: '#FFFFFF',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(32px, 4.4vw, 54px)',
              lineHeight: '1.18',
              margin: '0 0 20px 0',
              maxWidth: '960px',
              letterSpacing: '-0.02em',
            }}
          >
            The internet is full of{' '}
            <em style={{ fontStyle: 'italic', color: '#C084FC', fontWeight: 700 }}>
              average
            </em>{' '}
            content. We&apos;re not interested in making more of it.
          </motion.h2>

          {/* Body Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, margin: '-60px' }}
            style={{
              color: '#E2E8F0',
              fontSize: 'clamp(15px, 1.6vw, 18.5px)',
              lineHeight: '1.6',
              maxWidth: '720px',
              margin: '0 0 44px 0',
              fontWeight: 400,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            We exist to help the top 1% of creators build work they&apos;re proud of, with a team that pushes each other to become ridiculously good at their craft.
          </motion.p>

          {/* Border-separated Horizontal Statistics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, margin: '-60px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '28px 0',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            {CINEMATIC_STATS.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 24px',
                  borderRight: idx < CINEMATIC_STATS.length - 1 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 700,
                    fontSize: 'clamp(32px, 3.8vw, 50px)',
                    color: '#FFFFFF',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    color: '#D1D5DB',
                    fontSize: '11.5px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginTop: '8px',
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
