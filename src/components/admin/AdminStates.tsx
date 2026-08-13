import React from 'react';

export function AdminLoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="adm-state-wrap">
      <div className="adm-spinner" />
      <p className="adm-state-msg">{message}</p>
    </div>
  );
}

export function AdminEmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="adm-state-wrap">
      <div className="adm-empty-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="adm-empty-title">{title}</h3>
      {description && <p className="adm-state-msg">{description}</p>}
      {action && <div style={{ marginTop: '16px' }}>{action}</div>}
    </div>
  );
}

export function AdminErrorState({ message = 'Something went wrong.' }: { message?: string }) {
  return (
    <div className="adm-state-wrap">
      <div className="adm-error-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>
      <h3 className="adm-empty-title">Error</h3>
      <p className="adm-state-msg">{message}</p>
    </div>
  );
}
