'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface JobDetailInteractiveProps {
  jobTitle: string;
  slug: string;
}

export function DynamicTOC() {
  const [activeSection, setActiveSection] = useState<string>('role');

  useEffect(() => {
    const sectionIds = ['role', 'responsibilities', 'requirements', 'benefits'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'role', label: 'The Role' },
    { id: 'responsibilities', label: 'Responsibilities' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'benefits', label: 'Benefits & Perks' },
  ];

  return (
    <nav aria-label="Job description sections" className="jd-toc-container">
      <div className="jd-toc-track">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollTo(item.id)}
            className={`jd-toc-pill ${activeSection === item.id ? 'is-active' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function CopyShareBar({ jobTitle, slug }: JobDetailInteractiveProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return `https://teamzealancy.com/careers/${slug}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleShare = (platform: 'linkedin' | 'twitter' | 'whatsapp') => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Team Zealancy is hiring for: ${jobTitle}! Check out the role:`);

    let shareUrl = '';
    if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="jd-share-wrap">
      <div className="jd-share-label">Share this role:</div>
      <div className="jd-share-actions">
        <button
          type="button"
          onClick={handleCopy}
          className={`jd-copy-btn ${copied ? 'is-copied' : ''}`}
          aria-label="Copy job link"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy Link</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleShare('linkedin')}
          className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center transition-colors hover:bg-zinc-50"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-700">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => handleShare('twitter')}
          className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center transition-colors hover:bg-zinc-50"
          title="Share on X / Twitter"
          aria-label="Share on X / Twitter"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-700">
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => handleShare('whatsapp')}
          className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center transition-colors hover:bg-zinc-50"
          title="Share on WhatsApp"
          aria-label="Share on WhatsApp"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-700">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function ClarityFeedbackWidget() {
  const [voted, setVoted] = useState<null | 'yes' | 'no'>(null);

  return (
    <div className="jd-clarity-box">
      <div className="jd-clarity-inner">
        {voted === null ? (
          <>
            <span className="jd-clarity-question">Was this job description clear &amp; helpful?</span>
            <div className="jd-clarity-btns">
              <button
                type="button"
                onClick={() => setVoted('yes')}
                className="jd-clarity-btn jd-clarity-yes"
                aria-label="Yes, job description was clear"
              >
<ThumbsUp className="w-4 h-4 inline mr-2" /> Yes
              </button>
              <button
                type="button"
                onClick={() => setVoted('no')}
                className="jd-clarity-btn jd-clarity-no"
                aria-label="Needs more details"
              >
                <ThumbsDown className="w-4 h-4 inline mr-2" /> Needs more info
              </button>
            </div>
          </>
        ) : (
          <div className="jd-clarity-thanks">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5D2DB0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>Thank you for your feedback! It helps us keep our listings clear.</span>
          </div>
        )}
      </div>
    </div>
  );
}

