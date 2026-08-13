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
    >
      <div className="loading-content">
        <div className="loading-logo">
          Team Zealancy<span className="dot">.</span>
        </div>
        <div className="loading-bar-track">
          <div
            className="loading-bar-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
