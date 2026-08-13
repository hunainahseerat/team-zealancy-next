'use client';

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    // Smooth scrolling for data-scroll elements
    const handleScrollClick = (e: MouseEvent) => {
      const targetEl = e.currentTarget as HTMLElement;
      const hash = targetEl.getAttribute('data-scroll');
      if (!hash) return;
      e.preventDefault();
      const section = document.querySelector(hash);
      if (section) {
        section.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    };

    const scrollTriggers = document.querySelectorAll<HTMLElement>('[data-scroll]');
    scrollTriggers.forEach((el) => {
      el.addEventListener('click', handleScrollClick as EventListener);
    });

    // Magnetic Buttons effect for desktop mouse pointers
    const isFine = window.matchMedia('(pointer:fine)').matches;
    const magneticBtns = document.querySelectorAll<HTMLElement>('.btn');
    const cleanups: (() => void)[] = [];

    if (isFine && !reduceMotion) {
      magneticBtns.forEach((btn) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const relX = e.clientX - (rect.left + rect.width / 2);
          const relY = e.clientY - (rect.top + rect.height / 2);
          btn.style.transform = `translate3d(${relX * 0.18}px, ${relY * 0.18}px, 0)`;
        };

        const handleMouseLeave = () => {
          btn.style.transform = '';
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);

        cleanups.push(() => {
          btn.removeEventListener('mousemove', handleMouseMove);
          btn.removeEventListener('mouseleave', handleMouseLeave);
        });
      });
    }

    // Reveal animations
    const reveals = document.querySelectorAll<HTMLElement>('.reveal');

    if (!reduceMotion && 'IntersectionObserver' in window && reveals.length) {
      const order: HTMLElement[] = [];

      reveals.forEach((el) => {
        const parent = el.parentNode as HTMLElement;
        const slot = order.filter((r) => r === parent).length;
        order.push(parent);
        if (slot) {
          el.style.transitionDelay = `${Math.min(slot, 5) * 110}ms`;
        }

        const line = el.querySelector<SVGPathElement>('svg path[stroke]');
        if (line && line.getTotalLength) {
          const len = line.getTotalLength();
          line.style.strokeDasharray = `${len}`;
          line.style.strokeDashoffset = `${len}`;
          line.style.transition = 'stroke-dashoffset 1.1s ease .15s';
        }
      });

      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in');
            const line = entry.target.querySelector<SVGPathElement>('svg path[stroke]');
            if (line) line.style.strokeDashoffset = '0';
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -4% 0px' }
      );

      reveals.forEach((el) => revealObserver.observe(el));

      return () => {
        scrollTriggers.forEach((el) => {
          el.removeEventListener('click', handleScrollClick as EventListener);
        });
        cleanups.forEach((fn) => fn());
        revealObserver.disconnect();
      };
    } else {
      reveals.forEach((el) => el.classList.add('in'));
      return () => {
        scrollTriggers.forEach((el) => {
          el.removeEventListener('click', handleScrollClick as EventListener);
        });
        cleanups.forEach((fn) => fn());
      };
    }
  }, []);
}
