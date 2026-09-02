'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Copy } from 'lucide-react';
import { FaLinkedinIn, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';

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
      <div className="jd-share-actions flex gap-3 items-center">
        <button
          type="button"
          onClick={handleCopy}
          className={`h-11 px-4 rounded-full border border-zinc-200/60 bg-stone-100/80 flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-purple-600 hover:text-white hover:border-purple-600 hover:shadow-md ${copied ? 'bg-purple-600 text-white border-purple-600' : 'text-zinc-700'}`}
          aria-label="Copy job link"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span className="font-medium text-sm">Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              <span className="font-medium text-sm">Copy Link</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleShare('linkedin')}
          className="jd-share-icon-btn linkedin"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedinIn className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => handleShare('twitter')}
          className="jd-share-icon-btn x-twitter"
          title="Share on X / Twitter"
          aria-label="Share on X / Twitter"
        >
          <FaXTwitter className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => handleShare('whatsapp')}
          className="jd-share-icon-btn whatsapp"
          title="Share on WhatsApp"
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp className="w-4 h-4" />
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

