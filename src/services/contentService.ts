/**
 * Content Service — WordPress REST API Integration with Fallback
 * Environment variable: NEXT_PUBLIC_API_URL
 */

import {
  MOCK_FAQ,
  MOCK_HIRING_STEPS,
  MOCK_BENEFITS,
  MOCK_HERO_WORDS,
} from '@/data/content';
import type {
  FaqItem,
  HiringStep,
  Benefit,
  HeroRotatorWord,
} from '@/types';

// Re-export team & settings for modularity
export * from './teamService';
export * from './settingsService';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const WP_CONTENT_ENDPOINT = `${API_BASE}/wp-json/zealancy/v1/content`;

let faqItems = [...MOCK_FAQ];
let hiringSteps = [...MOCK_HIRING_STEPS];
let benefits = [...MOCK_BENEFITS];
let heroWords = [...MOCK_HERO_WORDS];

// --- FAQ ---
export async function getFaq(): Promise<FaqItem[]> {
  try {
    const res = await fetch(WP_CONTENT_ENDPOINT, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.faq) && data.faq.length > 0) return data.faq;
    }
  } catch {
    // Fallback
  }
  return [...faqItems].sort((a, b) => a.order - b.order);
}
export async function updateFaq(id: string, data: Partial<FaqItem>): Promise<FaqItem> {
  faqItems = faqItems.map((f) => (f.id === id ? { ...f, ...data } : f));
  try {
    await fetch(WP_CONTENT_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ faq: faqItems }),
    });
  } catch {
    // Fallback
  }
  return faqItems.find((f) => f.id === id)!;
}
export async function createFaqItem(data: Omit<FaqItem, 'id'>): Promise<FaqItem> {
  const item: FaqItem = { ...data, id: `faq-${Date.now()}` };
  faqItems = [...faqItems, item];
  try {
    await fetch(WP_CONTENT_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ faq: faqItems }),
    });
  } catch {
    // Fallback
  }
  return item;
}
export async function deleteFaqItem(id: string): Promise<void> {
  faqItems = faqItems.filter((f) => f.id !== id);
  try {
    await fetch(WP_CONTENT_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ faq: faqItems }),
    });
  } catch {
    // Fallback
  }
}

// --- Hiring Steps ---
export async function getHiringSteps(): Promise<HiringStep[]> {
  try {
    const res = await fetch(WP_CONTENT_ENDPOINT, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.hiringSteps) && data.hiringSteps.length > 0) return data.hiringSteps;
    }
  } catch {
    // Fallback
  }
  return [...hiringSteps].sort((a, b) => a.order - b.order);
}
export async function updateHiringStep(id: string, data: Partial<HiringStep>): Promise<HiringStep> {
  hiringSteps = hiringSteps.map((s) => (s.id === id ? { ...s, ...data } : s));
  try {
    await fetch(WP_CONTENT_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hiringSteps }),
    });
  } catch {
    // Fallback
  }
  return hiringSteps.find((s) => s.id === id)!;
}

// --- Benefits ---
export async function getBenefits(): Promise<Benefit[]> {
  try {
    const res = await fetch(WP_CONTENT_ENDPOINT, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.benefits) && data.benefits.length > 0) return data.benefits;
    }
  } catch {
    // Fallback
  }
  return [...benefits].sort((a, b) => a.order - b.order);
}
export async function updateBenefit(id: string, data: Partial<Benefit>): Promise<Benefit> {
  benefits = benefits.map((b) => (b.id === id ? { ...b, ...data } : b));
  try {
    await fetch(WP_CONTENT_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ benefits }),
    });
  } catch {
    // Fallback
  }
  return benefits.find((b) => b.id === id)!;
}

// --- Hero Words ---
export async function getHeroWords(): Promise<HeroRotatorWord[]> {
  try {
    const res = await fetch(WP_CONTENT_ENDPOINT, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.heroWords) && data.heroWords.length > 0) return data.heroWords;
    }
  } catch {
    // Fallback
  }
  return [...heroWords].sort((a, b) => a.order - b.order);
}
export async function updateHeroWords(words: HeroRotatorWord[]): Promise<HeroRotatorWord[]> {
  heroWords = [...words];
  try {
    await fetch(WP_CONTENT_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ heroWords: words }),
    });
  } catch {
    // Fallback
  }
  return heroWords;
}
