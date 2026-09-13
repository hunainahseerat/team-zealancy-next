'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * Thin client wrapper that activates scroll-reveal animations on the home page.
 * Lives as a separate 'use client' component so the main page can be an async
 * Server Component (needed for fetching live Sanity job data at build time).
 */
export default function HomeClient() {
  useScrollReveal();
  return null;
}
