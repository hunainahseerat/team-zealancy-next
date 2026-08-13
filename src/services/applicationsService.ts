/**
 * Applications Service — WordPress REST API Integration with Fallback
 * Environment variable: NEXT_PUBLIC_API_URL
 */

import { MOCK_APPLICATIONS } from '@/data/applications';
import type { Application, ApplicationStatus } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const WP_APPLICATIONS_ENDPOINT = `${API_BASE}/wp-json/zealancy/v1/applications`;

let fallbackApps = [...MOCK_APPLICATIONS];

export async function getApplications(): Promise<Application[]> {
  try {
    const res = await fetch(WP_APPLICATIONS_ENDPOINT, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {
    // Fallback to mock data if WP API is offline
  }
  return [...fallbackApps].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

export async function getApplicationById(id: string): Promise<Application | undefined> {
  const apps = await getApplications();
  return apps.find((a) => a.id === id);
}

export async function getApplicationsByJob(jobId: string): Promise<Application[]> {
  const apps = await getApplications();
  return apps.filter((a) => a.jobId === jobId);
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  notes?: string
): Promise<Application> {
  try {
    await fetch(`${WP_APPLICATIONS_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
    });
  } catch {
    // Fallback
  }

  fallbackApps = fallbackApps.map((a) =>
    a.id === id ? { ...a, status, notes: notes ?? a.notes } : a
  );
  return fallbackApps.find((a) => a.id === id)!;
}

export async function deleteApplication(id: string): Promise<void> {
  try {
    await fetch(`${WP_APPLICATIONS_ENDPOINT}/${id}`, { method: 'DELETE' });
  } catch {
    // Fallback
  }
  fallbackApps = fallbackApps.filter((a) => a.id !== id);
}

export async function getApplicationStats() {
  const all = await getApplications();
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return {
    total: all.length,
    newThisWeek: all.filter((a) => new Date(a.submittedAt) >= weekAgo).length,
    byStatus: {
      new: all.filter((a) => a.status === 'new').length,
      reviewing: all.filter((a) => a.status === 'reviewing').length,
      shortlisted: all.filter((a) => a.status === 'shortlisted').length,
      rejected: all.filter((a) => a.status === 'rejected').length,
      hired: all.filter((a) => a.status === 'hired').length,
    },
  };
}
