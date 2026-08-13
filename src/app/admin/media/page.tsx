'use client';

export default function AdminMediaPage() {
  const placeholders = Array.from({ length: 12 });

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Media</h1>
          <p className="adm-page-sub">Manage images and files. Will connect to WordPress Media Library.</p>
        </div>
        <button className="adm-btn adm-btn-primary" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Upload
        </button>
      </div>

      <div className="adm-card">
        <div className="adm-card-header">
          <h2 className="adm-card-title">Media Library</h2>
          <span style={{ fontSize: 12, color: '#4a4460', background: 'rgba(123,79,214,.12)', border: '1px solid rgba(123,79,214,.25)', borderRadius: 6, padding: '3px 10px' }}>
            WordPress integration pending
          </span>
        </div>
        <div style={{ padding: '28px 20px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(123,79,214,.08)', border: '1px dashed rgba(123,79,214,.3)', borderRadius: 12, padding: '18px 32px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7b4fd6" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span style={{ fontSize: 13.5, color: '#7b4fd6' }}>Drag &amp; drop files to upload (coming soon)</span>
          </div>
        </div>
        <div className="adm-media-grid">
          {placeholders.map((_, i) => (
            <div key={i} className="adm-media-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 12.5, color: '#3a3452', textAlign: 'center', marginTop: 12 }}>
        Media uploads will be handled by WordPress. This view will display and manage the WP Media Library once connected.
      </p>
    </div>
  );
}
