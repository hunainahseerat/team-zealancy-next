'use client';

import React, { useEffect, useState } from 'react';

const PASSCODE = 'zealancy2026';
const AUTH_KEY = 'tz_authenticated';

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [inputPassword, setInputPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedAuth = sessionStorage.getItem(AUTH_KEY);
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch {
      // sessionStorage unavailable fallback
    } finally {
      setIsChecking(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === PASSCODE) {
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch {
        // sessionStorage unavailable fallback
      }
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect passcode. Please try again.');
      setInputPassword('');
    }
  };

  if (isChecking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#080510',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#080510',
          color: '#F1EEE6',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: "'Inter', sans-serif",
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient background glow */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '450px',
            height: '450px',
            background:
              'radial-gradient(circle, rgba(93, 45, 176, 0.28) 0%, rgba(183, 155, 234, 0.05) 50%, transparent 75%)',
            pointerEvents: 'none',
            borderRadius: '50%',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '380px',
            backgroundColor: 'rgba(16, 11, 26, 0.85)',
            border: '1px solid rgba(183, 155, 234, 0.25)',
            borderRadius: '20px',
            padding: '40px 32px',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(93, 45, 176, 0.2)',
            backdropFilter: 'blur(16px)',
            textAlign: 'center',
          }}
        >
          {/* Logo Mark */}
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <img
              src="/assets/logo/z-logo-white.png"
              alt="Team Zealancy Logo"
              style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          <h1
            style={{
              fontFamily: "'Bodoni Moda', Georgia, serif",
              fontSize: '26px',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: '0 0 6px 0',
              letterSpacing: '-0.01em',
            }}
          >
            Team Zealancy
          </h1>

          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'rgba(183, 155, 234, 0.85)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              margin: '0 0 28px 0',
            }}
          >
            Staging Access Required
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <input
                type="password"
                value={inputPassword}
                onChange={(e) => {
                  setInputPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter passcode"
                autoFocus
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(25, 18, 40, 0.9)',
                  border: error ? '1px solid #FF5252' : '1px solid rgba(183, 155, 234, 0.3)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              />
              {error && (
                <div
                  style={{
                    color: '#FF5252',
                    fontSize: '12px',
                    marginTop: '6px',
                    textAlign: 'left',
                  }}
                >
                  {error}
                </div>
              )}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #5D2DB0 0%, #7B4FD6 100%)',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 20px -4px rgba(93, 45, 176, 0.5)',
                transition: 'opacity 0.2s, transform 0.15s',
              }}
            >
              Unlock Access →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
