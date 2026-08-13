/**
 * Jobs Service — WordPress REST API Integration with Fallback
 * Environment variable: NEXT_PUBLIC_API_URL
 */

import { MOCK_JOBS } from '@/data/jobs';
import type { Job, JobStatus } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const WP_JOBS_ENDPOINT = `${API_BASE}/wp-json/zealancy/v1/jobs`;

let fallbackJobs = [...MOCK_JOBS];

export async function getJobs(): Promise<Job[]> {
  try {
    const res = await fetch(WP_JOBS_ENDPOINT, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {
    // Fallback to mock data if WordPress API is offline
  }
  return fallbackJobs;
}

export async function getActiveJobs(): Promise<Job[]> {
  const jobs = await getJobs();
  return jobs.filter((j) => j.status === 'active');
}

export async function getJobById(id: string): Promise<Job | undefined> {
  const jobs = await getJobs();
  return jobs.find((j) => j.id === id);
}

export async function createJob(data: Omit<Job, 'id' | 'postedAt' | 'updatedAt'>): Promise<Job> {
  try {
    const res = await fetch(WP_JOBS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const result = await res.json();
      return {
        ...data,
        id: result.id,
        postedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  } catch {
    // Fallback
  }

  const newJob: Job = {
    ...data,
    id: `job-${Date.now()}`,
    postedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  fallbackJobs = [...fallbackJobs, newJob];
  return newJob;
}

export async function updateJob(id: string, data: Partial<Job>): Promise<Job> {
  try {
    const res = await fetch(`${WP_JOBS_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const updated = await getJobById(id);
      if (updated) return updated;
    }
  } catch {
    // Fallback
  }

  fallbackJobs = fallbackJobs.map((j) =>
    j.id === id ? { ...j, ...data, updatedAt: new Date().toISOString() } : j
  );
  return fallbackJobs.find((j) => j.id === id)!;
}

export async function updateJobStatus(id: string, status: JobStatus): Promise<Job> {
  return updateJob(id, { status });
}

export async function deleteJob(id: string): Promise<void> {
  try {
    await fetch(`${WP_JOBS_ENDPOINT}/${id}`, { method: 'DELETE' });
  } catch {
    // Fallback
  }
  fallbackJobs = fallbackJobs.filter((j) => j.id !== id);
}
