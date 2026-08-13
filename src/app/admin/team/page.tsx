'use client';

import { useEffect, useState, useCallback } from 'react';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '@/services/contentService';
import type { TeamMember } from '@/types';
import { AdminLoadingState, AdminEmptyState, AdminErrorState } from '@/components/admin/AdminStates';

const EMPTY_FORM: Omit<TeamMember, 'id'> = {
  name: '', role: '', bio: '', instagramUrl: '', linkedinUrl: '', order: 1, isVisible: true,
};

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() || '?';
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2800); };

  const load = useCallback(async () => {
    try { setMembers(await getTeamMembers()); }
    catch { setError('Failed to load team members.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, order: members.length + 1 });
    setShowModal(true);
  };

  const openEdit = (m: TeamMember) => {
    setEditingId(m.id);
    setForm({ name: m.name, role: m.role, bio: m.bio, instagramUrl: m.instagramUrl ?? '', linkedinUrl: m.linkedinUrl ?? '', order: m.order, isVisible: m.isVisible });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.role.trim()) return;
    setSaving(true);
    try {
      if (editingId) await updateTeamMember(editingId, form);
      else await createTeamMember(form);
      await load();
      setShowModal(false);
      showToast(editingId ? 'Member updated.' : 'Member added.');
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteTeamMember(deleteTarget.id);
    setDeleteTarget(null);
    await load();
    showToast('Member removed.');
  };

  const toggleVisibility = async (m: TeamMember) => {
    await updateTeamMember(m.id, { isVisible: !m.isVisible });
    await load();
  };

  if (loading) return <AdminLoadingState message="Loading team members..." />;
  if (error) return <AdminErrorState message={error} />;

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Team Members</h1>
          <p className="adm-page-sub">{members.length} members · {members.filter(m => m.isVisible).length} visible on site</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={openCreate}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Member
        </button>
      </div>

      {members.length === 0 ? (
        <AdminEmptyState title="No team members" description="Add your first team member to display on the site." action={<button className="adm-btn adm-btn-primary adm-btn-sm" onClick={openCreate}>Add Member</button>} />
      ) : (
        <div className="adm-team-grid">
          {members.map((m) => (
            <div key={m.id} className="adm-team-card" style={{ opacity: m.isVisible ? 1 : 0.5 }}>
              <div className="adm-team-avatar">{initials(m.name)}</div>
              <p className="adm-team-name">{m.name}</p>
              <p className="adm-team-role">{m.role}</p>
              <p className="adm-team-bio">{m.bio}</p>
              <div className="adm-team-actions">
                <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => openEdit(m)}>Edit</button>
                <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => toggleVisibility(m)}>
                  {m.isVisible ? 'Hide' : 'Show'}
                </button>
                <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => setDeleteTarget(m)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="adm-modal-wrap" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">{editingId ? 'Edit Member' : 'Add Team Member'}</h2>
              <button className="adm-btn-icon" onClick={() => setShowModal(false)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label className="adm-label">Full Name <span className="adm-req">*</span></label>
                  <input className="adm-input" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Zain Ul Abideen" />
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Role / Title <span className="adm-req">*</span></label>
                  <input className="adm-input" value={form.role} onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Founder & Creative Director" />
                </div>
                <div className="adm-form-group full">
                  <label className="adm-label">Bio</label>
                  <textarea className="adm-textarea" value={form.bio} onChange={(e) => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Short bio..." style={{ minHeight: 90 }} />
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Instagram URL</label>
                  <input className="adm-input" value={form.instagramUrl} onChange={(e) => setForm(f => ({ ...f, instagramUrl: e.target.value }))} placeholder="https://instagram.com/..." />
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">LinkedIn URL</label>
                  <input className="adm-input" value={form.linkedinUrl} onChange={(e) => setForm(f => ({ ...f, linkedinUrl: e.target.value }))} placeholder="https://linkedin.com/..." />
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Display Order</label>
                  <input className="adm-input" type="number" min={1} value={form.order} onChange={(e) => setForm(f => ({ ...f, order: parseInt(e.target.value) || 1 }))} />
                </div>
                <div className="adm-form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <label className="adm-switch">
                    <input type="checkbox" checked={form.isVisible} onChange={(e) => setForm(f => ({ ...f, isVisible: e.target.checked }))} />
                    <span className="adm-switch-slider" />
                  </label>
                  <span style={{ fontSize: 13.5, color: '#c8c2d8' }}>Visible on site</span>
                </div>
              </div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="adm-btn adm-btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Member'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="adm-modal-wrap" onClick={(e) => { if (e.target === e.currentTarget) setDeleteTarget(null); }}>
          <div className="adm-modal" style={{ maxWidth: 420 }}>
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">Remove Member</h2>
              <button className="adm-btn-icon" onClick={() => setDeleteTarget(null)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div className="adm-modal-body">
              <p className="adm-confirm-text">Remove <span className="adm-confirm-name">{deleteTarget.name}</span> from the team?</p>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-ghost" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="adm-btn adm-btn-danger" onClick={handleDelete}>Remove</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, background: '#1a1626', border: '1px solid rgba(123,79,214,.5)', borderRadius: 10, padding: '12px 20px', fontSize: 13.5, color: '#c4a8ff', zIndex: 100, boxShadow: '0 8px 30px rgba(0,0,0,.4)', animation: 'admFadeIn .2s ease' }}>
          ✓ {toast}
        </div>
      )}
    </div>
  );
}
