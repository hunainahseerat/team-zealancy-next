/**
 * Settings Service — WordPress REST API Integration with Fallback
 * Environment variable: NEXT_PUBLIC_API_URL
 */

import { MOCK_SETTINGS } from '@/data/content';
import type { SiteSettings } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const WP_SETTINGS_ENDPOINT = `${API_BASE}/wp-json/zealancy/v1/settings`;

let fallbackSettings = { ...MOCK_SETTINGS };

export async function getSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(WP_SETTINGS_ENDPOINT, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.siteName) return { ...fallbackSettings, ...data };
    }
  } catch {
    // Fallback to mock data if WP API is offline
  }
  return { ...fallbackSettings };
}

export async function updateSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  try {
    const res = await fetch(WP_SETTINGS_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const updated = await getSettings();
      return updated;
    }
  } catch {
    // Fallback
  }
  fallbackSettings = { ...fallbackSettings, ...data };
  return { ...fallbackSettings };
}
