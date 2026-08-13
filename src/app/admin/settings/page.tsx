'use client';

import { useEffect, useState, useCallback } from 'react';
import { getSettings, updateSettings } from '@/services/contentService';
import type { SiteSettings } from '@/types';
import { AdminLoadingState, AdminErrorState } from '@/components/admin/AdminStates';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2800); };

  const load = useCallback(async () => {
    try {
      const s = await getSettings();
      setSettings(s);
      setForm({ ...s });
    } catch { setError('Failed to load settings.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    try {
      const saved = await updateSettings(form);
      setSettings(saved);
      setForm({ ...saved });
      showToast('Settings saved successfully.');
    } finally { setSaving(false); }
  };

  const handleDiscard = () => { if (settings) setForm({ ...settings }); };

  const set = (key: keyof SiteSettings, value: string | boolean) =>
    setForm((f) => f ? { ...f, [key]: value } : f);

  if (loading) return <AdminLoadingState message="Loading settings..." />;
  if (error || !form) return <AdminErrorState message={error || 'Settings unavailable.'} />;

  const isDirty = JSON.stringify(form) !== JSON.stringify(settings);

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Settings</h1>
          <p className="adm-page-sub">Global site configuration and metadata.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {isDirty && <button className="adm-btn adm-btn-ghost" onClick={handleDiscard}>Discard</button>}
          <button className="adm-btn adm-btn-primary" onClick={handleSave} disabled={saving || !isDirty}>
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      <div className="adm-card" style={{ padding: 28 }}>

        {/* General */}
        <div className="adm-settings-section">
          <p className="adm-settings-section-title">General</p>
          <div className="adm-settings-grid">
            <div className="adm-form-group">
              <label className="adm-label">Site Name</label>
              <input className="adm-input" value={form.siteName} onChange={(e) => set('siteName', e.target.value)} />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Tagline</label>
              <input className="adm-input" value={form.tagline} onChange={(e) => set('tagline', e.target.value)} />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Location — City</label>
              <input className="adm-input" value={form.locationCity} onChange={(e) => set('locationCity', e.target.value)} />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Location — Country</label>
              <input className="adm-input" value={form.locationCountry} onChange={(e) => set('locationCountry', e.target.value)} />
            </div>
          </div>
          <div className="adm-toggle-row">
            <div className="adm-toggle-info">
              <div className="adm-toggle-label">Actively Hiring</div>
              <div className="adm-toggle-desc">Shows the &ldquo;We&apos;re hiring&rdquo; indicator across the site.</div>
            </div>
            <label className="adm-switch">
              <input type="checkbox" checked={form.isOpenToWork} onChange={(e) => set('isOpenToWork', e.target.checked)} />
              <span className="adm-switch-slider" />
            </label>
          </div>
        </div>

        {/* Contact */}
        <div className="adm-settings-section">
          <p className="adm-settings-section-title">Contact & Social</p>
          <div className="adm-settings-grid">
            <div className="adm-form-group">
              <label className="adm-label">Contact Email</label>
              <input className="adm-input" type="email" value={form.contactEmail} onChange={(e) => set('contactEmail', e.target.value)} />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">WhatsApp Number</label>
              <input className="adm-input" value={form.whatsappNumber} onChange={(e) => set('whatsappNumber', e.target.value)} placeholder="+923001234567" />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Instagram URL</label>
              <input className="adm-input" value={form.instagramUrl} onChange={(e) => set('instagramUrl', e.target.value)} />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">LinkedIn URL</label>
              <input className="adm-input" value={form.linkedinUrl} onChange={(e) => set('linkedinUrl', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="adm-settings-section">
          <p className="adm-settings-section-title">Hero Section</p>
          <div className="adm-settings-grid">
            <div className="adm-form-group">
              <label className="adm-label">Headline Prefix</label>
              <input className="adm-input" value={form.heroHeadlinePrefix} onChange={(e) => set('heroHeadlinePrefix', e.target.value)} placeholder="We hire the best" />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Headline Suffix</label>
              <input className="adm-input" value={form.heroHeadlineSuffix} onChange={(e) => set('heroHeadlineSuffix', e.target.value)} placeholder="in the creator economy." />
            </div>
            <div className="adm-form-group full" style={{ gridColumn: '1 / -1' }}>
              <label className="adm-label">Hero Subtext</label>
              <textarea className="adm-textarea" value={form.heroSubtext} onChange={(e) => set('heroSubtext', e.target.value)} style={{ minHeight: 76 }} />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="adm-settings-section">
          <p className="adm-settings-section-title">SEO & Meta</p>
          <div className="adm-settings-grid">
            <div className="adm-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="adm-label">Meta Title</label>
              <input className="adm-input" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} />
            </div>
            <div className="adm-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="adm-label">Meta Description</label>
              <textarea className="adm-textarea" value={form.metaDescription} onChange={(e) => set('metaDescription', e.target.value)} style={{ minHeight: 76 }} />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Canonical URL</label>
              <input className="adm-input" value={form.canonicalUrl} onChange={(e) => set('canonicalUrl', e.target.value)} />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">OG Image URL</label>
              <input className="adm-input" value={form.ogImageUrl} onChange={(e) => set('ogImageUrl', e.target.value)} />
            </div>
          </div>
        </div>

        {/* WordPress Integration notice */}
        <div style={{ background: 'rgba(123,79,214,.06)', border: '1px solid rgba(123,79,214,.2)', borderRadius: 12, padding: '16px 20px' }}>
          <p style={{ margin: 0, fontSize: 13.5, color: '#7b4fd6', fontWeight: 600 }}>WordPress Integration</p>
          <p style={{ margin: '5px 0 0', fontSize: 13, color: '#4a4460', lineHeight: 1.55 }}>
            Once connected to WordPress, settings will be read from and saved to the WP Options API. The service layer at <code style={{ color: '#9b6ff5' }}>src/services/contentService.ts</code> is already structured for a drop-in replacement.
          </p>
        </div>

      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, background: '#1a1626', border: '1px solid rgba(123,79,214,.5)', borderRadius: 10, padding: '12px 20px', fontSize: 13.5, color: '#c4a8ff', zIndex: 100, boxShadow: '0 8px 30px rgba(0,0,0,.4)', animation: 'admFadeIn .2s ease' }}>
          ✓ {toast}
        </div>
      )}
    </div>
  );
}
