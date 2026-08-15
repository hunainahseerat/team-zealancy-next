'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast simulated loader (1.1s total)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18 + 12);
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`loading-screen ${progress >= 100 ? 'fade-out' : ''}`}
      aria-hidden={progress >= 100}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#09070d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.4s ease, visibility 0.4s ease',
      }}
    >
      <div className="loading-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div className="loading-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="/assets/logo/z-logo-white.png"
            alt="Team Zealancy Z Logo"
            style={{ width: '52px', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 4px 20px rgba(123,79,214,0.5))' }}
          />
        </div>
        <div
          className="loading-bar-track"
          style={{
            width: '140px',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            className="loading-bar-fill"
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #7B4FD6, #A885EE)',
              width: `${Math.min(progress, 100)}%`,
              transition: 'width 0.1s ease-out',
              borderRadius: '2px',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
