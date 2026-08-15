'use client';

import { useEffect, useState, useCallback } from 'react';
import { getJobs, createJob, updateJob, deleteJob } from '@/services/jobsService';
import type { Job, JobStatus } from '@/types';
import { AdminLoadingState, AdminEmptyState, AdminErrorState } from '@/components/admin/AdminStates';
import StatusBadge from '@/components/admin/StatusBadge';

const DEPARTMENTS = ['Video Production', 'Design', 'Strategy', 'Operations', 'Other'];
const TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract'] as const;
const MODES = ['Remote', 'Hybrid', 'On-site'] as const;
const STATUSES: JobStatus[] = ['active', 'paused', 'archived'];

const EMPTY_FORM = {
  slug: '',
  title: '',
  department: 'Video Production',
  type: 'Full-time' as typeof TYPES[number],
  mode: 'Remote' as typeof MODES[number],
  experience: '',
  description: '',
  status: 'active' as JobStatus,
  isUrgent: false,
  urgentLabel: '',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<JobStatus | 'all'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);

  const load = useCallback(async () => {
    try {
      setJobs(await getJobs());
    } catch {
      setError('Failed to load jobs.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditingJob(null);
    setForm({ ...EMPTY_FORM });
    setShowModal(true);
  };

  const openEdit = (job: Job) => {
    setEditingJob(job);
    setForm({
      slug: job.slug || '',
      title: job.title,
      department: job.department,
      type: job.type as typeof TYPES[number],
      mode: job.mode as typeof MODES[number],
      experience: job.experience,
      description: job.description,
      status: job.status,
      isUrgent: job.isUrgent,
      urgentLabel: job.urgentLabel ?? '',
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.experience.trim()) return;
    setSaving(true);
    const slug = form.slug.trim() || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const payload = { ...form, slug };
    try {
      if (editingJob) await updateJob(editingJob.id, payload);
      else await createJob(payload);
      await load();
      setShowModal(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteJob(deleteTarget.id);
    setDeleteTarget(null);
    await load();
  };

  const filtered = jobs.filter((j) => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.department.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || j.status === filterStatus;
    return matchSearch && matchStatus;
  });

  if (loading) return <AdminLoadingState message="Loading jobs..." />;
  if (error) return <AdminErrorState message={error} />;

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Jobs</h1>
          <p className="adm-page-sub">{jobs.filter((j) => j.status === 'active').length} active positions</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={openCreate}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Job
        </button>
      </div>

      <div className="adm-filter-bar">
        <div className="adm-search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input className="adm-input adm-search" placeholder="Search jobs..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="adm-select" style={{ width: 'auto', minWidth: 130 }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as JobStatus | 'all')}>
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="adm-card">
        {filtered.length === 0 ? (
          <AdminEmptyState title="No jobs found" description="Try adjusting your search or filters." action={<button className="adm-btn adm-btn-primary adm-btn-sm" onClick={openCreate}>Add first job</button>} />
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Title / Department</th>
                  <th>Type</th>
                  <th>Mode</th>
                  <th>Status</th>
                  <th>Posted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="adm-td-primary">{job.title}</span>
                        {job.isUrgent && (
                          <span className="adm-urgent">
                            <span className="adm-urgent-dot" />
                            {job.urgentLabel || 'Urgent'}
                          </span>
                        )}
                      </div>
                      <div className="adm-td-muted">{job.department}</div>
                    </td>
                    <td className="adm-td-muted">{job.type}</td>
                    <td className="adm-td-muted">{job.mode}</td>
                    <td><StatusBadge status={job.status} /></td>
                    <td className="adm-td-muted">{formatDate(job.postedAt)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="adm-btn-icon" title="Edit" onClick={() => openEdit(job)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button className="adm-btn-icon" title="Delete" onClick={() => setDeleteTarget(job)} style={{ color: '#fca5a5' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="adm-modal-wrap" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
              <button className="adm-btn-icon" onClick={() => setShowModal(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label className="adm-label">Job Title <span className="adm-req">*</span></label>
                  <input className="adm-input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. Creative Video Editor" />
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Department</label>
                  <select className="adm-select" value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}>
                    {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Type</label>
                  <select className="adm-select" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as typeof TYPES[number] }))}>
                    {TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Mode</label>
                  <select className="adm-select" value={form.mode} onChange={(e) => setForm((f) => ({ ...f, mode: e.target.value as typeof MODES[number] }))}>
                    {MODES.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Experience <span className="adm-req">*</span></label>
                  <input className="adm-input" value={form.experience} onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))} placeholder="e.g. 2+ years" />
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Status</label>
                  <select className="adm-select" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as JobStatus }))}>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="adm-form-group full">
                  <label className="adm-label">Description <span className="adm-req">*</span></label>
                  <textarea className="adm-textarea" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Describe the role..." style={{ minHeight: 110 }} />
                </div>
                <div className="adm-form-group full" style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <label className="adm-switch">
                    <input type="checkbox" checked={form.isUrgent} onChange={(e) => setForm((f) => ({ ...f, isUrgent: e.target.checked }))} />
                    <span className="adm-switch-slider" />
                  </label>
                  <span style={{ fontSize: 13.5, color: '#c8c2d8' }}>Mark as urgent</span>
                  {form.isUrgent && (
                    <input className="adm-input" style={{ flex: 1 }} value={form.urgentLabel} onChange={(e) => setForm((f) => ({ ...f, urgentLabel: e.target.value }))} placeholder="e.g. Hiring urgently" />
                  )}
                </div>
              </div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="adm-btn adm-btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : editingJob ? 'Save Changes' : 'Create Job'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="adm-modal-wrap" onClick={(e) => { if (e.target === e.currentTarget) setDeleteTarget(null); }}>
          <div className="adm-modal" style={{ maxWidth: 420 }}>
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">Delete Job</h2>
              <button className="adm-btn-icon" onClick={() => setDeleteTarget(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="adm-modal-body">
              <p className="adm-confirm-text">
                Are you sure you want to delete <span className="adm-confirm-name">{deleteTarget.title}</span>? This cannot be undone.
              </p>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-ghost" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="adm-btn adm-btn-danger" onClick={handleDelete}>Delete Job</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
