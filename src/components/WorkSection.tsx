'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const portfolioCardsData = [
  // SECTION 1: Founder-led Content
  {
    name: 'Richard Yu',
    niche: 'Finance & Investing',
    dateRange: 'OCT 2025 – PRESENT',
    stat: '160K',
    statType: 'Subs ↑',
    timelineStart: 'Jan',
    timelineEnd: 'Dec',
    avatar: '/assets/work/richard-yu.jpg',
    bgClass: 'g-violet',
    areaPath: 'M0,75 L140,74 L280,68 L400,52 L480,30 L540,14 L600,3 L600,80 L0,80 Z',
    linePath: 'M0,75 L140,74 L280,68 L400,52 L480,30 L540,14 L600,3',
  },
  {
    name: 'Assembly AI',
    niche: 'AI & Developer Tools',
    dateRange: 'OCT 2024 – AUG 2025',
    stat: '183K',
    statType: 'Subs ↑',
    timelineStart: 'Jan',
    timelineEnd: 'Dec',
    avatar: '/assets/work/assembly-ai.jpg',
    bgClass: 'g-dusk',
    areaPath: 'M0,70 L80,66 L140,18 L210,12 L280,10 L360,24 L440,25 L520,22 L600,20 L600,80 L0,80 Z',
    linePath: 'M0,70 L80,66 L140,18 L210,12 L280,10 L360,24 L440,25 L520,22 L600,20',
  },
  {
    name: 'Josh Burns',
    niche: 'Finance & Stock Trading',
    dateRange: 'MAY 2024 – JUNE/JULY',
    stat: '170K',
    statType: 'Subs ↑',
    timelineStart: 'Jan',
    timelineEnd: 'Dec',
    avatar: '/assets/work/josh-burns.jpg',
    bgClass: 'g-slate',
    areaPath: 'M0,70 L90,54 L170,36 L240,30 L300,28 L350,46 L390,48 L460,32 L530,16 L600,5 L600,80 L0,80 Z',
    linePath: 'M0,70 L90,54 L170,36 L240,30 L300,28 L350,46 L390,48 L460,32 L530,16 L600,5',
  },
  // SECTION 2: Performance Creative
  {
    name: 'Njord',
    niche: 'Outdoor Gear Brand',
    dateRange: '',
    stat: '$20M',
    statType: 'Revenue / yr',
    timelineStart: 'Yr 1',
    timelineEnd: 'Now',
    avatar: '/assets/work/njord.jpg',
    bgClass: 'g-royal',
    areaPath: 'M0,74 L120,60 L240,46 L360,32 L480,18 L600,6 L600,80 L0,80 Z',
    linePath: 'M0,74 L120,60 L240,46 L360,32 L480,18 L600,6',
  },
  {
    name: 'Nuora',
    niche: 'Beauty & Skincare',
    dateRange: '',
    stat: '$50M',
    statType: 'Revenue / yr',
    timelineStart: 'Yr 1',
    timelineEnd: 'Now',
    avatar: '/assets/work/nuora.jpg',
    pfpPadding: '6px',
    bgClass: 'g-ink',
    areaPath: 'M0,68 L80,72 L170,36 L250,38 L300,22 L390,28 L440,16 L550,14 L600,4 L600,80 L0,80 Z',
    linePath: 'M0,68 L80,72 L170,36 L250,38 L300,22 L340,42 L390,28 L440,16 L550,14 L600,4',
  },
  {
    name: 'Icon',
    niche: 'Fashion & Apparel',
    dateRange: '',
    stat: '$5M',
    statType: 'Revenue / yr',
    timelineStart: 'Yr 1',
    timelineEnd: 'Now',
    avatar: '/images/logos/icon-logo.png',
    initialLetter: 'I',
    bgClass: 'g-violet',
    areaPath: 'M0,72 L150,71 L300,69 L400,65 L460,60 L510,38 L560,16 L600,3 L600,80 L0,80 Z',
    linePath: 'M0,72 L150,71 L300,69 L400,65 L460,60 L510,38 L560,16 L600,3',
  },
  // SECTION 3: Brand & Edutainment
  {
    name: 'Iced Coffee Hour',
    niche: 'Business Podcast',
    dateRange: '',
    stat: '1.9B',
    statType: 'Views ↑',
    timelineStart: 'Jan',
    timelineEnd: 'Dec',
    avatar: '/assets/work/iced-coffee-hour.jpg',
    bgClass: 'g-plum',
    areaPath: 'M0,74 L140,72 L280,64 L400,48 L480,28 L540,12 L600,4 L600,80 L0,80 Z',
    linePath: 'M0,74 L140,72 L280,64 L400,48 L480,28 L540,12 L600,4',
  },
  {
    name: 'Alementary',
    niche: 'Science Education',
    dateRange: '',
    stat: '1.1B',
    statType: 'Views ↑',
    timelineStart: 'Jan',
    timelineEnd: 'Dec',
    avatar: '/assets/work/alementary.jpg',
    bgClass: 'g-slate',
    areaPath: 'M0,70 L60,50 L100,40 L160,35 L260,38 L350,33 L460,12 L560,5 L600,3 L600,80 L0,80 Z',
    linePath: 'M0,70 L60,50 L100,40 L160,35 L260,38 L350,33 L460,12 L560,5 L600,3',
  },
  {
    name: 'Coding with Lewis',
    niche: 'Software & Tech Education',
    dateRange: '',
    stat: '850K',
    statType: 'Subs ↑',
    timelineStart: 'Jan',
    timelineEnd: 'Dec',
    avatar: '/assets/work/coding-with-lewis.jpg',
    bgClass: 'g-dusk',
    areaPath: 'M0,75 L100,68 L200,58 L300,44 L400,28 L500,14 L600,4 L600,80 L0,80 Z',
    linePath: 'M0,75 L100,68 L200,58 L300,44 L400,28 L500,14 L600,4',
  },
];

const CATEGORY_META = [
  {
    num: '01',
    title: 'Edutainment Content',
    desc: 'We turn complex topics into content people actually want to watch pulling billions of views by making learning feel fun.',
    cases: portfolioCardsData.slice(6, 9),
  },
  {
    num: '02',
    title: 'Founder-led Content',
    desc: 'We also build personal brands for founders and experts. Mostly talking head videos that turn knowledge into authority, and authority into an audience that buys.',
    cases: portfolioCardsData.slice(0, 3),
  },
  {
    num: '03',
    title: 'Performance Marketing',
    desc: 'We run paid campaigns built to sell things. From VSLs, BoFs ADs, and full creatives built around one goal: revenue.',
    cases: portfolioCardsData.slice(3, 6),
  },
];

export default function WorkSection() {
  return (
    <section className="section" id="what-we-do">
      <div className="wrap">
        <div className="chapter">
          <span className="cnum">01</span>
          <span className="clab">The Work</span>
          <span className="cline"></span>
        </div>

        <div className="sec-head">
          <span className="label">What we do</span>
          <h2>
            We don&apos;t just sit behind screens. We <em>think</em> and <em>create.</em>
          </h2>
          <p>
            Content people remember. Story, visuals and execution that generate billions in views and millions in revenue.
          </p>
        </div>

        {/* SVG Sparkline Gradient Defs */}
        <svg style={{ height: 0, width: 0, position: 'absolute' }} aria-hidden="true">
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7B4FD6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#7B4FD6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Category Sections */}
        {CATEGORY_META.map((cat, catIdx) => (
          <div className="cat" key={catIdx}>
            <div className="cat-copy cat-copy-sticky">
              <span className="num">{cat.num}</span>
              <h3>{cat.title}</h3>
              <p className="cd">{cat.desc}</p>
            </div>

            <div className="cases">
              {cat.cases.map((c, cIdx) => (
                <motion.div
                  className="case"
                  key={cIdx}
                  initial={{ opacity: 0.15, filter: 'blur(10px)', y: 20 }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: false, margin: '-80px' }}
                  style={{
                    background: '#141019',
                    color: '#F1EEE6',
                    borderRadius: '16px',
                    padding: '22px 24px 16px',
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '180px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {/* Top Header Row */}
                  <div
                    className="chead"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '14px',
                      marginBottom: '8px',
                      position: 'relative',
                      zIndex: 10,
                      opacity: 1,
                      transform: 'none',
                    }}
                  >
                    {/* Avatar + Channel Name + Niche */}
                    <div
                      className="who"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <span
                        className={`pfp ${c.bgClass}`}
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          flexShrink: 0,
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: c.pfpPadding || '0px',
                          boxSizing: 'border-box',
                        }}
                      >
                        {c.avatar ? (
                          <img
                            src={c.avatar}
                            alt={c.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: '50%',
                              objectFit: c.pfpPadding ? 'contain' : 'cover',
                              display: 'block',
                            }}
                          />
                        ) : (
                          <span
                            style={{
                              display: 'grid',
                              placeItems: 'center',
                              width: '100%',
                              height: '100%',
                              fontWeight: 700,
                              color: '#FFFFFF',
                              fontSize: '16px',
                            }}
                          >
                            {c.initialLetter}
                          </span>
                        )}
                      </span>
                      <div>
                        <div
                          className="cn"
                          style={{
                            fontFamily: '"Bodoni Moda", "Playfair Display", Georgia, serif',
                            fontWeight: 500,
                            fontSize: '19px',
                            color: '#FFFFFF',
                            lineHeight: 1.2,
                          }}
                        >
                          {c.name}
                        </div>
                        <div
                          className="ch"
                          style={{
                            fontSize: '12.5px',
                            color: 'rgba(241, 238, 230, 0.62)',
                            marginTop: '2px',
                          }}
                        >
                          {c.niche}
                        </div>
                      </div>
                    </div>

                    {/* Metric Stat Top Right */}
                    <div
                      className="subs"
                      style={{
                        whiteSpace: 'nowrap',
                        fontFamily: '"Fraunces", "Roboto", sans-serif',
                        fontSize: '19px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        textAlign: 'right',
                      }}
                    >
                      {c.stat}{' '}
                      <span
                        style={{
                          color: 'rgba(241, 238, 230, 0.62)',
                          marginLeft: '5px',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '12px',
                          fontWeight: 400,
                        }}
                      >
                        {c.statType}
                      </span>
                    </div>
                  </div>

                  {/* Date Range if present */}
                  {c.dateRange ? (
                    <div
                      className="case-duration"
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(241, 238, 230, 0.62)',
                        opacity: 0.8,
                        marginBottom: '10px',
                        position: 'relative',
                        zIndex: 10,
                        transform: 'none',
                      }}
                    >
                      {c.dateRange}
                    </div>
                  ) : null}

                  {/* Purple Sparkline Chart SVG */}
                  <svg
                    viewBox="0 0 600 80"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    style={{
                      width: 'calc(100% + 48px)',
                      height: '78px',
                      marginLeft: '-24px',
                      marginRight: '-24px',
                      display: 'block',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <path d={c.areaPath} fill="url(#sparkFill)" />
                    <path d={c.linePath} fill="none" stroke="#7B4FD6" strokeWidth="2.5" />
                  </svg>

                  {/* Axis Labels Bottom Row */}
                  <div
                    className="axis"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      color: 'rgba(241, 238, 230, 0.62)',
                      marginTop: '4px',
                      position: 'relative',
                      zIndex: 10,
                      opacity: 1,
                      transform: 'none',
                    }}
                  >
                    <span>{c.timelineStart}</span>
                    <span>{c.timelineEnd}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <div className="more">And more…</div>
      </div>
    </section>
  );
}
