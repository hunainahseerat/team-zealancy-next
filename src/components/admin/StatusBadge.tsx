'use client';

import type { ApplicationStatus, JobStatus } from '@/types';

interface StatusBadgeProps {
  status: ApplicationStatus | JobStatus;
}

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  // Job statuses
  active:     { label: 'Active',      cls: 'badge-active' },
  paused:     { label: 'Paused',      cls: 'badge-paused' },
  archived:   { label: 'Archived',    cls: 'badge-archived' },
  // Application statuses
  new:        { label: 'New',         cls: 'badge-new' },
  reviewing:  { label: 'Reviewing',   cls: 'badge-reviewing' },
  shortlisted:{ label: 'Shortlisted', cls: 'badge-shortlisted' },
  rejected:   { label: 'Rejected',    cls: 'badge-rejected' },
  hired:      { label: 'Hired ✓',     cls: 'badge-hired' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = STATUS_MAP[status] ?? { label: status, cls: 'badge-default' };
  return <span className={`adm-badge ${cfg.cls}`}>{cfg.label}</span>;
}
