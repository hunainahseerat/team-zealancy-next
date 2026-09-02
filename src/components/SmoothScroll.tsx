'use client';

import { useEffect } from 'react';

/**
 * SmoothScroll component:
 * Provides fluid, buttery-smooth scrolling and eliminates layout jumping
 * for internal anchor and section jump links across both the main page
 * and dynamic Job Description (JD) routes.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Set smooth scrolling on document element
    if (typeof document !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest<HTMLAnchorElement>('a[href^="#"], a[data-scroll], button[data-scroll]');
      if (!link) return;

      const hash = link.getAttribute('href') || link.getAttribute('data-scroll');
      if (!hash || hash === '#' || !hash.startsWith('#')) return;

      const targetEl = document.querySelector(hash);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 88;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Update URL hash without jumping
        if (window.history.pushState) {
          window.history.pushState(null, '', hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { passive: false });
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return null;
}
