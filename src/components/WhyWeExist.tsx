'use client';

import { useEffect, useRef } from 'react';

// ASSET: Drop the background image at public/assets/images/why-we-exist-bg.jpg
// When the file is present, it will render automatically as the section background.
const WHY_WE_EXIST_BG_IMAGE = '/assets/images/why-we-exist-bg.jpg';

const STATS_DATA = [
  { initial: '3.2B+', label: 'Views shipped' },
  { initial: '50+', label: 'Channels grown' },
  { initial: '5M+', label: 'Followers added' },
  { initial: '22+', label: 'People on the team' },
];

export default function WhyWeExist() {
  const statWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const statWrap = statWrapRef.current;
    if (!statWrap) return;

    const figures = statWrap.querySelectorAll<HTMLElement>('.stat .sv');
    figures.forEach((el) => {
      el.dataset.final = el.textContent?.trim() || '';
    });

    function countUp(el: HTMLElement, delay: number) {
      const finalVal = el.dataset.final || '';
      const parts = finalVal.match(/^([\d.]+)(.*)$/);
      if (!parts) return;

      const target = parseFloat(parts[1]);
      const suffix = parts[2];
      const dot = parts[1].indexOf('.');
      const decimals = dot === -1 ? 0 : parts[1].length - dot - 1;
      const duration = 2600;
      let startedAt: number | null = null;

      el.textContent = (0).toFixed(decimals) + suffix;

      function frame(now: number) {
        if (startedAt === null) startedAt = now;
        const p = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);

        if (p < 1) {
          el.textContent = (eased * target).toFixed(decimals) + suffix;
          requestAnimationFrame(frame);
        } else {
          el.textContent = finalVal;
        }
      }

      setTimeout(() => {
        requestAnimationFrame(frame);
      }, delay);
    }

    if (!reduceMotion && 'IntersectionObserver' in window && figures.length) {
      let counted = false;
      const statObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || counted) return;
            counted = true;
            statWrap.classList.add('counted');
            figures.forEach((el, i) => countUp(el, i * 150));
            statObserver.disconnect();
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -12% 0px' }
      );

      statObserver.observe(statWrap);
      return () => statObserver.disconnect();
    } else {
      statWrap.classList.add('counted');
    }
  }, []);

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
      }}
    >
      {/* Dark overlay — ensures legibility over background image */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(20,16,25,0.84)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="sec-head" style={{ maxWidth: '760px', marginBottom: 0 }}>
          <span className="label">Why we exist</span>
          <h2 style={{ color: 'var(--cream)' }}>
            The internet is full of <em>average</em> content. We're not interested in making more of it.
          </h2>
          <p>
            We exist to help the top 1% of creators build work they're proud of, with a team that pushes each other to become ridiculously good at their craft.
          </p>
        </div>
        <div className="stats" ref={statWrapRef}>
          {STATS_DATA.map((item, index) => (
            <div key={index} className="stat reveal">
              <div className="sv">{item.initial}</div>
              <div className="sl">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
