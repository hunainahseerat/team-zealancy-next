'use client';

import { useState } from 'react';
import type { HiringStep } from '@/types';

const DEFAULT_STEPS = [
  {
    num: '01',
    day: 'Day 01',
    title: 'Application',
    desc: 'Apply to the role you want. The application is straightforward and takes under 10 minutes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    num: '02',
    day: 'Days 01–03',
    title: 'Internal Review',
    desc: '100% human-reviewed, no AI screening. We take the time to genuinely evaluate your work.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    num: '03',
    day: 'Day 04',
    title: 'Screening',
    desc: 'If your work stands out, expect a call from us.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L9.6 9.6a16 16 0 0 0 6 6l1.1-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" />
      </svg>
    ),
  },
  {
    num: '04',
    day: 'Day 05',
    title: 'Job Offer',
    desc: "Skip the bullsh*t interview rounds. We invite you to an in-house session to showcase your skills, and if it's a match you'll get the offer the same day.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
];

interface HiringTimelineProps {
  steps?: HiringStep[];
}

export default function HiringTimeline({ steps }: HiringTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const displaySteps = steps && steps.length > 0
    ? steps.map((s, idx) => ({
        num: s.number || `0${idx + 1}`,
        day: `Step ${s.number || idx + 1}`,
        title: s.title,
        desc: s.description,
        icon: DEFAULT_STEPS[idx % DEFAULT_STEPS.length].icon,
      }))
    : DEFAULT_STEPS;

  const handleStepClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 450);
  };

  const currentStep = displaySteps[activeIndex] || displaySteps[0];
  const progressRatio = displaySteps.length > 1 ? activeIndex / (displaySteps.length - 1) : 0;

  return (
    <section className="section" id="hiring">
      <div className="wrap">
        <div className="chapter reveal">
          <span className="cnum">04</span>
          <span className="clab">How We Hire</span>
          <span className="cline"></span>
        </div>
        <div className="sec-head reveal">
          <span className="label">How hiring works</span>
          <h2>
            Five days, <em>start to finish.</em>
          </h2>
          <p>Nothing fancy, and you&apos;ll hear back either way.</p>
        </div>

        <div className="hire reveal" style={{ marginTop: 0 }}>
          <div className="tl">
            <div
              className="tl-track"
              style={{ '--tlp': progressRatio } as React.CSSProperties}
            >
              {displaySteps.map((step, i) => (
                <button
                  key={i}
                  className={`tl-node ${i === activeIndex ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => handleStepClick(i)}
                  onFocus={() => handleStepClick(i)}
                  aria-current={i === activeIndex ? 'step' : 'false'}
                >
                  <span className="tl-dot">{step.icon}</span>
                  <span className="tl-day">{step.day}</span>
                  <span className="tl-t">{step.title}</span>
                </button>
              ))}
            </div>
            <div className={`tl-detail ${animating ? 'tl-anim' : ''}`} aria-live="polite">
              <span className="tl-dn" id="tlDNum">
                {currentStep.num}
              </span>
              <div>
                <div className="tl-dt" id="tlDT">
                  {currentStep.title}
                </div>
                <div className="tl-dp" id="tlDP">
                  {currentStep.desc}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
