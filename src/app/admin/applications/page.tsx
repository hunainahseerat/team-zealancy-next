'use client';

import { useEffect, useState, useCallback } from 'react';
import { getApplications, updateApplicationStatus, deleteApplication } from '@/services/applicationsService';
import type { Application, ApplicationStatus } from '@/types';
import { AdminLoadingState, AdminEmptyState, AdminErrorState } from '@/components/admin/AdminStates';
import StatusBadge from '@/components/admin/StatusBadge';

const STATUSES: ApplicationStatus[] = ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'all'>('all');
  const [selected, setSelected] = useState<Application | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [notes, setNotes] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null);

  const load = useCallback(async () => {
    try { setApplications(await getApplications()); }
    catch { setError('Failed to load applications.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openDrawer = (app: Application) => { setSelected(app); setNotes(app.notes ?? ''); };
  const closeDrawer = () => setSelected(null);

  const handleStatusChange = async (status: ApplicationStatus) => {
    if (!selected) return;
    setUpdatingStatus(true);
    const updated = await updateApplicationStatus(selected.id, status, notes || undefined);
    setSelected(updated);
    await load();
    setUpdatingStatus(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteApplication(deleteTarget.id);
    setDeleteTarget(null);
    if (selected?.id === deleteTarget.id) closeDrawer();
    await load();
  };

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase();
    const match = a.fullName.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || a.jobTitle.toLowerCase().includes(q);
    const statusMatch = filterStatus === 'all' || a.status === filterStatus;
    return match && statusMatch;
  });

  if (loading) return <AdminLoadingState message="Loading applications..." />;
  if (error) return <AdminErrorState message={error} />;

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Applications</h1>
          <p className="adm-page-sub">{applications.length} total · {applications.filter(a => a.status === 'new').length} new</p>
        </div>
      </div>

      {/* Status filter pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {(['all', ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            style={{
              padding: '6px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
              background: filterStatus === s ? '#7b4fd6' : 'rgba(255,255,255,.07)',
              color: filterStatus === s ? '#fff' : '#6c6480',
              border: filterStatus === s ? '1px solid #7b4fd6' : '1px solid rgba(255,255,255,.1)',
              transition: 'all .2s',
            }}
          >
            {s === 'all' ? `All (${applications.length})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${applications.filter(a => a.status === s).length})`}
          </button>
        ))}
      </div>

      <div className="adm-filter-bar">
        <div className="adm-search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="adm-input adm-search" placeholder="Search by name, email or role..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="adm-card">
        {filtered.length === 0 ? (
          <AdminEmptyState title="No applications found" description="No applications match your current filters." />
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr key={app.id} style={{ cursor: 'pointer' }} onClick={() => openDrawer(app)}>
                    <td>
                      <div className="adm-td-primary">{app.fullName}</div>
                      <div className="adm-td-muted">{app.email}</div>
                    </td>
                    <td className="adm-td-muted">{app.jobTitle}</td>
                    <td onClick={(e) => e.stopPropagation()}><StatusBadge status={app.status} /></td>
                    <td className="adm-td-muted">{formatDate(app.submittedAt)}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="adm-btn-icon" title="View" onClick={() => openDrawer(app)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <button className="adm-btn-icon" title="Delete" style={{ color: '#fca5a5' }} onClick={() => setDeleteTarget(app)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
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

      {/* Detail Drawer */}
      {selected && (
        <div className="adm-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeDrawer(); }}>
          <div className="adm-drawer">
            <div className="adm-drawer-header">
              <h2 className="adm-drawer-title">{selected.fullName}</h2>
              <button className="adm-btn-icon" onClick={closeDrawer}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div className="adm-drawer-body">
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <StatusBadge status={selected.status} />
                <span style={{ fontSize: 12.5, color: '#6c6480', display: 'flex', alignItems: 'center' }}>Submitted {formatDate(selected.submittedAt)}</span>
              </div>

              {/* Status changer */}
              <div className="adm-form-group">
                <label className="adm-label">Update Status</label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      disabled={updatingStatus || selected.status === s}
                      onClick={() => handleStatusChange(s)}
                      style={{
                        padding: '5px 12px', borderRadius: 999, fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
                        background: selected.status === s ? '#7b4fd6' : 'rgba(255,255,255,.06)',
                        color: selected.status === s ? '#fff' : '#6c6480',
                        border: selected.status === s ? '1px solid #7b4fd6' : '1px solid rgba(255,255,255,.1)',
                        opacity: updatingStatus ? 0.6 : 1,
                      }}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="adm-detail-list">
                <div className="adm-detail-item">
                  <div className="adm-detail-label">Applied For</div>
                  <div className="adm-detail-value">{selected.jobTitle}</div>
                </div>
                <div className="adm-detail-item">
                  <div className="adm-detail-label">Email</div>
                  <div className="adm-detail-value"><a href={`mailto:${selected.email}`}>{selected.email}</a></div>
                </div>
                <div className="adm-detail-item">
                  <div className="adm-detail-label">Phone</div>
                  <div className="adm-detail-value">{selected.phone}</div>
                </div>
                {selected.linkedin && (
                  <div className="adm-detail-item">
                    <div className="adm-detail-label">LinkedIn</div>
                    <div className="adm-detail-value"><a href={selected.linkedin} target="_blank" rel="noopener">{selected.linkedin}</a></div>
                  </div>
                )}
                {selected.portfolio && (
                  <div className="adm-detail-item">
                    <div className="adm-detail-label">Portfolio / Reel</div>
                    <div className="adm-detail-value"><a href={selected.portfolio} target="_blank" rel="noopener">{selected.portfolio}</a></div>
                  </div>
                )}
                <div className="adm-detail-item">
                  <div className="adm-detail-label">Resume</div>
                  <div className="adm-detail-value">
                    <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ marginTop: 4 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      {selected.resumeFileName}
                    </button>
                  </div>
                </div>
                <div className="adm-detail-item">
                  <div className="adm-detail-label">Cover Letter</div>
                  <div className="adm-detail-para">{selected.coverLetter}</div>
                </div>
              </div>

              <div className="adm-form-group">
                <label className="adm-label">Internal Notes</label>
                <textarea className="adm-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add internal notes about this applicant..." style={{ minHeight: 90 }} />
              </div>
            </div>
            <div className="adm-drawer-footer">
              <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => { setDeleteTarget(selected); closeDrawer(); }}>Delete</button>
              <button className="adm-btn adm-btn-ghost" onClick={closeDrawer}>Close</button>
              <button className="adm-btn adm-btn-primary" disabled={updatingStatus} onClick={() => handleStatusChange(selected.status)}>
                Save Notes
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
              <h2 className="adm-modal-title">Delete Application</h2>
              <button className="adm-btn-icon" onClick={() => setDeleteTarget(null)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div className="adm-modal-body">
              <p className="adm-confirm-text">Permanently delete application from <span className="adm-confirm-name">{deleteTarget.fullName}</span>?</p>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-ghost" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="adm-btn adm-btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
