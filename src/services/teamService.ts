/**
 * Team Service — WordPress REST API Integration with Fallback
 * Environment variable: NEXT_PUBLIC_API_URL
 */

import { MOCK_TEAM, MOCK_VOICES } from '@/data/team';
import type { TeamMember, Voice } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const WP_TEAM_ENDPOINT = `${API_BASE}/wp-json/zealancy/v1/team`;

let fallbackTeam = [...MOCK_TEAM];
let fallbackVoices = [...MOCK_VOICES];

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const res = await fetch(WP_TEAM_ENDPOINT, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {
    // Fallback to mock data
  }
  return [...fallbackTeam].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function createTeamMember(data: Omit<TeamMember, 'id'>): Promise<TeamMember> {
  const member: TeamMember = { ...data, id: `team-${Date.now()}` };
  fallbackTeam = [...fallbackTeam, member];
  try {
    await fetch(WP_TEAM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fallbackTeam),
    });
  } catch {
    // Fallback
  }
  return member;
}

export async function updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
  fallbackTeam = fallbackTeam.map((m) => (m.id === id ? { ...m, ...data } : m));
  try {
    await fetch(WP_TEAM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fallbackTeam),
    });
  } catch {
    // Fallback
  }
  return fallbackTeam.find((m) => m.id === id)!;
}

export async function deleteTeamMember(id: string): Promise<void> {
  fallbackTeam = fallbackTeam.filter((m) => m.id !== id);
  try {
    await fetch(WP_TEAM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fallbackTeam),
    });
  } catch {
    // Fallback
  }
}

export async function getVoices(): Promise<Voice[]> {
  return [...fallbackVoices].sort((a, b) => a.order - b.order);
}

export async function updateVoice(id: string, data: Partial<Voice>): Promise<Voice> {
  fallbackVoices = fallbackVoices.map((v) => (v.id === id ? { ...v, ...data } : v));
  return fallbackVoices.find((v) => v.id === id)!;
}
