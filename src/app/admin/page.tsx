'use client';

import { useEffect, useState } from 'react';
import { getJobs } from '@/services/jobsService';
import { getApplications, getApplicationStats } from '@/services/applicationsService';
import { getTeamMembers } from '@/services/contentService';
import type { Application } from '@/types';
import { AdminLoadingState } from '@/components/admin/AdminStates';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalJobs: 0, activeJobs: 0, totalApplications: 0, newThisWeek: 0, teamSize: 0 });
  const [recent, setRecent] = useState<Application[]>([]);

  useEffect(() => {
    async function load() {
      const [jobs, appStats, applications, team] = await Promise.all([
        getJobs(),
        getApplicationStats(),
        getApplications(),
        getTeamMembers(),
      ]);
      setStats({
        totalJobs: jobs.length,
        activeJobs: jobs.filter((j) => j.status === 'active').length,
        totalApplications: appStats.total,
        newThisWeek: appStats.newThisWeek,
        teamSize: team.length,
      });
      setRecent(applications.slice(0, 5));
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <AdminLoadingState message="Loading dashboard..." />;

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Dashboard</h1>
          <p className="adm-page-sub">Welcome back — here&apos;s what&apos;s happening.</p>
        </div>
        <Link href="/admin/jobs" className="adm-btn adm-btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Post a Job
        </Link>
      </div>

      <div className="adm-stats">
        <div className="adm-stat-card">
          <div className="adm-stat-label">Total Jobs</div>
          <div className="adm-stat-value">{stats.totalJobs}</div>
          <div className="adm-stat-delta">{stats.activeJobs} active</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-label">Applications</div>
          <div className="adm-stat-value">{stats.totalApplications}</div>
          <div className="adm-stat-delta">+{stats.newThisWeek} this week</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-label">Team Size</div>
          <div className="adm-stat-value">{stats.teamSize}</div>
          <div className="adm-stat-delta">visible members</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-label">Open Positions</div>
          <div className="adm-stat-value">{stats.activeJobs}</div>
          <div className="adm-stat-delta">currently hiring</div>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-header">
          <h2 className="adm-card-title">Recent Applications</h2>
          <Link href="/admin/applications" className="adm-btn adm-btn-ghost adm-btn-sm">View all</Link>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Role</th>
                <th>Status</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((app) => (
                <tr key={app.id}>
                  <td>
                    <div className="adm-td-primary">{app.fullName}</div>
                    <div className="adm-td-muted">{app.email}</div>
                  </td>
                  <td className="adm-td-muted">{app.jobTitle}</td>
                  <td><StatusBadge status={app.status} /></td>
                  <td className="adm-td-muted">{formatDate(app.submittedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
