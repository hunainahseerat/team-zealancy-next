'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ──────────────────────────────────────────────
   YouTube IFrame Player API type shims
   (avoids adding a heavy @types/youtube dep)
────────────────────────────────────────────── */
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  destroy(): void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        element: HTMLElement | string,
        opts: {
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (e: { target: YTPlayer }) => void;
            onStateChange?: (e: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const PHRASES = [
  'make cool sh*t',
  'become the 1%',
  'make more $$$.',
  'kill average content.',
];

const YOUTUBE_ID = 'E8oHkGfYqYs';

export default function HeroSection() {
  /* ── typewriter refs ── */
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef    = useRef<HTMLSpanElement>(null);
  const caretRef   = useRef<HTMLSpanElement>(null);
  const srRef      = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState(PHRASES[0]);

  /* ── YouTube player ── */
  const playerDivRef  = useRef<HTMLDivElement>(null);
  const playerRef     = useRef<YTPlayer | null>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const inViewRef     = useRef(false);
  const [isMuted, setIsMuted]       = useState(true);
  const [isPlaying, setIsPlaying]   = useState(false);
  const [apiReady, setApiReady]     = useState(false);

  /* ────────────────────────────────────────────
     1. Load YouTube IFrame API (once)
  ──────────────────────────────────────────── */
  useEffect(() => {
    if (document.getElementById('yt-iframe-api-script')) {
      // Script already added – if YT is ready, fire immediately
      if (window.YT && window.YT.Player) setApiReady(true);
      return;
    }
    const tag = document.createElement('script');
    tag.id  = 'yt-iframe-api-script';
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }, []);

  /* ────────────────────────────────────────────
     2. Create YT.Player once API is ready
  ──────────────────────────────────────────── */
  useEffect(() => {
    // Hook into the global callback the API fires when ready
    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prevCallback?.();
      setApiReady(true);
    };
    // If the API loaded before this effect ran, fire now
    if (window.YT && window.YT.Player) setApiReady(true);
  }, []);

  useEffect(() => {
    if (!apiReady || !playerDivRef.current || playerRef.current) return;

    playerRef.current = new window.YT.Player(playerDivRef.current, {
      videoId: YOUTUBE_ID,
      playerVars: {
        autoplay:        0,
        mute:            1,
        controls:        1,
        rel:             0,
        playsinline:     1,
        modestbranding:  1,
        iv_load_policy:  3, // hide annotations
      },
      events: {
        onReady: (e) => {
          e.target.mute();
          // If container is already in view when player becomes ready, play
          if (inViewRef.current) {
            e.target.playVideo();
            setIsPlaying(true);
          }
        },
        onStateChange: (e) => {
          // YT.PlayerState.PLAYING = 1
          setIsPlaying(e.data === 1);
        },
      },
    });
  }, [apiReady]);

  /* ────────────────────────────────────────────
     3. IntersectionObserver: play / pause
  ──────────────────────────────────────────── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inViewRef.current = entry.isIntersecting;
          const player = playerRef.current;
          if (!player) return;
          if (entry.isIntersecting) {
            if (typeof player.playVideo === 'function') {
              player.playVideo();
              setIsPlaying(true);
            }
          } else {
            if (typeof player.pauseVideo === 'function') {
              player.pauseVideo();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  /* ────────────────────────────────────────────
     4. Mute toggle
  ──────────────────────────────────────────── */
  function toggleMute() {
    const player = playerRef.current;
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  }

  /* ────────────────────────────────────────────
     5. Play button click (also unmutes)
  ──────────────────────────────────────────── */
  function handlePlayClick() {
    const player = playerRef.current;
    if (!player) return;
    player.unMute();
    player.playVideo();
    setIsMuted(false);
    setIsPlaying(true);
  }

  /* ────────────────────────────────────────────
     6. Typewriter effect (unchanged)
  ──────────────────────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const heading  = headingRef.current;
    const textEl   = textRef.current;
    const caret    = caretRef.current;
    const srLabel  = srRef.current;

    if (!heading || !textEl || !caret) return;

    const oneLine = window.matchMedia('(min-width:761px)');

    function fit() {
      if (!heading) return;
      heading.style.fontSize = '';
      if (!oneLine.matches) return;
      heading.style.textAlign = 'left';
      const need  = heading.scrollWidth;
      const avail = heading.clientWidth;
      heading.style.textAlign = '';
      if (need > avail && avail > 0) {
        const size = parseFloat(getComputedStyle(heading).fontSize);
        heading.style.fontSize = `${size * (avail / need) * 0.995}px`;
      }
    }

    fit();
    document.fonts?.ready?.then(fit);

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(fit, 150); };
    window.addEventListener('resize', handleResize);

    if (reduceMotion) {
      setDisplayText(PHRASES[0]);
      if (srLabel) srLabel.textContent = PHRASES[0];
      return () => window.removeEventListener('resize', handleResize);
    }

    let index = 0;
    let chars = PHRASES[0].length;
    let timeoutId: NodeJS.Timeout;
    const TYPE_MS = 55, ERASE_MS = 28, HOLD_MS = 2000, GAP_MS = 400;

    function typeIn() {
      const phrase = PHRASES[index];
      if (caret) caret.classList.remove('blink');
      if (chars < phrase.length) {
        chars++;
        const s = phrase.slice(0, chars);
        setDisplayText(s);
        if (textEl) textEl.textContent = s;
        timeoutId = setTimeout(typeIn, TYPE_MS);
      } else {
        if (srLabel) srLabel.textContent = phrase;
        if (caret) caret.classList.add('blink');
        timeoutId = setTimeout(eraseOut, HOLD_MS);
      }
    }

    function eraseOut() {
      const phrase = PHRASES[index];
      if (caret) caret.classList.remove('blink');
      if (chars > 0) {
        chars--;
        const s = phrase.slice(0, chars);
        setDisplayText(s);
        if (textEl) textEl.textContent = s;
        timeoutId = setTimeout(eraseOut, ERASE_MS);
      } else {
        index = (index + 1) % PHRASES.length;
        if (caret) caret.classList.add('blink');
        timeoutId = setTimeout(typeIn, GAP_MS);
      }
    }

    if (caret) caret.classList.add('blink');
    timeoutId = setTimeout(eraseOut, HOLD_MS);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
      clearTimeout(resizeTimer);
    };
  }, []);

  const longestPhrase = PHRASES.reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <header className="hero" id="top">
      <div className="wrap">
        <h1 ref={headingRef}>
          Join Team Zealancy to <br className="h1br" />
          <span className="rot" aria-hidden="true">
            <span className="rot-ghost">{longestPhrase}</span>
            <span className="rot-word">
              <span className="rot-text" ref={textRef}>{displayText}</span>
              <span className="rot-caret" ref={caretRef}></span>
            </span>
          </span>
          <span className="sr" ref={srRef}>make cool sh*t</span>
        </h1>

        {/* ── YouTube Embedded Player ── */}
        <div
          ref={containerRef}
          className="media hero-media"
          style={{ position: 'relative', overflow: 'hidden', borderRadius: '18px', cursor: 'pointer' }}
          onClick={handlePlayClick}
        >
          {/* The div that the YT IFrame API targets */}
          <div
            ref={playerDivRef}
            id="hero-yt-player"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />

          {/* Dark gradient overlay — only shown when not playing */}
          {!isPlaying && (
            <div
              className="grade"
              style={{ background: 'linear-gradient(180deg,rgba(20,16,25,.25) 0%,rgba(20,16,25,.72) 100%)' }}
            />
          )}

          {/* Play button — shown only when paused/not started */}
          {!isPlaying && (
            <span
              className="play"
              role="img"
              aria-label="Play video"
              style={{ pointerEvents: 'none' }}
            />
          )}



          {/* Mute / Unmute toggle (shown after player is ready) */}
          {apiReady && (
            <button
              type="button"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              onClick={(e) => { e.stopPropagation(); toggleMute(); }}
              style={{
                position: 'absolute', bottom: 14, right: 14, zIndex: 20,
                background: 'rgba(0,0,0,0.52)', border: '1px solid rgba(255,255,255,.2)',
                color: '#fff', borderRadius: '999px', padding: '7px 14px',
                fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                backdropFilter: 'blur(6px)',
              }}
            >
              {isMuted ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                    <line x1="23" y1="9" x2="17" y2="15"/>
                    <line x1="17" y1="9" x2="23" y2="15"/>
                  </svg>
                  Unmute
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  </svg>
                  Mute
                </>
              )}
            </button>
          )}
        </div>

        <div className="cta-row">
          <Link href="/careers" className="btn">
            See open roles →
          </Link>
          <a
            className="sbtn"
            href="https://www.instagram.com/teamzealancy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Instagram
          </a>
          <a
            className="sbtn"
            href="https://www.linkedin.com/company/zealancy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4 0 4.75 2.5 4.75 5.8V21h-4v-5.2c0-1.24-.02-2.84-1.9-2.84-1.9 0-2.2 1.36-2.2 2.75V21h-4z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}
