'use client';
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VOICES = [
  { id: '76pq9sletd', name: 'Muhammad Usman Laghari', role: 'SENIOR PROJECT MANAGER', quote: '"Managing complex productions daily — this team makes it genuinely exciting to deliver."' },
  { id: 'xyrx926yn6', name: 'Shehroz Khan', role: 'HEAD OF FULFILMENT', quote: '"I oversee delivery for some of the biggest channels in the world. The scale here is real."' },
  { id: 'ckriomzxeu', name: 'Fahad Ansari', role: 'JUNIOR VIDEO EDITOR', quote: '"No politics, no ego. Just people who care about the craft."' },
  { id: '74spvaapv9', name: 'Muhammad Aqib', role: 'JUNIOR VIDEO EDITOR', quote: '"Great culture and constant learning every day."' },
  { id: 'buwj25t5ln', name: 'Moazam Naqvi', role: 'CONTENT CREATOR', quote: '"Fast-paced environment with unmatched quality."' },
  { id: 'doiu7dd9iw', name: 'Ashar Ullah Khan', role: 'OPS MANAGER', quote: '"Collaborating with global talent continuously."' },
  { id: '43o80cxtqj', name: 'Shayan', role: 'JUNIOR VIDEO EDITOR', quote: '"Creating impact through powerful visual storytelling."' },
  { id: 'hccsfag3s7', name: 'Muhammad Izhan Khan', role: 'ACCOUNTANT', quote: '"High standards, incredible team support always."' },
  { id: 'ai9gc5r5f5', name: 'Syed Junaid Hussain', role: 'ASSISTANT VIDEO EDITOR', quote: '"Every project brings a fresh creative challenge."' },
  { id: 'ew2xs2jo5a', name: 'Kamal Ahmed', role: 'LEAD VIDEO EDITOR', quote: '"Building world-class content with dedicated peers."' },
  { id: 'tf6vvsadtv', name: 'Syed Zeeshan Ali', role: 'INTERN VIDEO EDITOR', quote: '"Ownership and creative freedom from day one."' },
  { id: '1wnmxc9c5q', name: 'Muhammad Ali Akbar', role: 'ADMIN ASSISTANT', quote: '"The scale of production here is genuinely exciting."' },
];

export default function TeamVoices() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft: currentLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(currentLeft > 10);
    setCanScrollRight(currentLeft + clientWidth < scrollWidth - 10);

    if (clientWidth > 0) {
      const newIndex = Math.round(currentLeft / clientWidth);
      setActiveIndex(Math.min(Math.max(newIndex, 0), Math.ceil(VOICES.length / 3) - 1));
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    checkScrollButtons();
    container.addEventListener('scroll', checkScrollButtons, { passive: true });
    return () => container.removeEventListener('scroll', checkScrollButtons);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollDistance = container.clientWidth;
    container.scrollBy({
      left: direction === 'left' ? -scrollDistance : scrollDistance,
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (pageIdx: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    container.scrollTo({
      left: pageIdx * container.clientWidth,
      behavior: 'smooth',
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const totalPages = Math.ceil(VOICES.length / 3);

  return (
    <section style={{ backgroundColor: '#FAF8F5', padding: '80px 24px', width: '100%', overflow: 'hidden' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

        .smooth-scroll-container {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          cursor: grab;
        }
        .smooth-scroll-container:active {
          cursor: grabbing;
        }
        .smooth-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .team-card {
          scroll-snap-align: start;
          flex: 0 0 calc((100% - 48px) / 3);
          transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.35s cubic-bezier(0.25, 1, 0.5, 1);
        }

        @media (max-width: 1024px) {
          .team-card {
            flex: 0 0 calc((100% - 24px) / 2);
          }
        }
        @media (max-width: 640px) {
          .team-card {
            flex: 0 0 100%;
          }
        }

        .team-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

        {/* Header row: text left, arrows right, aligned to bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <p style={{
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#6D28D9',
              fontWeight: 600,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              margin: '0 0 16px 0',
            }}>
              TEAM VOICES
            </p>

            <h2 style={{
              fontSize: 'clamp(38px, 5.2vw, 64px)',
              fontWeight: 400,
              color: '#111827',
              lineHeight: '1.15',
              margin: '0 0 16px 0',
              fontFamily: '"Playfair Display", Georgia, serif',
              letterSpacing: '-0.02em',
              maxWidth: '900px',
            }}>
              Don&apos;t take our word. Hear what your{' '}
              <span style={{
                color: '#6D28D9',
                fontStyle: 'italic',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}>
                co-workers
              </span>{' '}
              say.
            </h2>

            <p style={{
              fontSize: '16px',
              color: '#6B7280',
              margin: 0,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>
              The people already here, in their own words.
            </p>
          </div>

          {/* Arrows aligned to bottom of header */}
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button
              onClick={() => scrollByAmount('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: !canScrollLeft ? 'not-allowed' : 'pointer',
                opacity: !canScrollLeft ? 0.35 : 1,
                backgroundColor: '#FFF',
                transition: 'all 0.2s ease',
              }}
            >
              <ChevronLeft size={20} color="#111827" />
            </button>
            <button
              onClick={() => scrollByAmount('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: !canScrollRight ? 'not-allowed' : 'pointer',
                opacity: !canScrollRight ? 0.35 : 1,
                backgroundColor: '#FFF',
                transition: 'all 0.2s ease',
              }}
            >
              <ChevronRight size={20} color="#111827" />
            </button>
          </div>
        </div>

        {/* Smooth Touch & Scroll Cards */}
        <div
          ref={scrollContainerRef}
          className="smooth-scroll-container"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ padding: '8px 4px 16px 4px' }}
        >
          {VOICES.map((voice, idx) => (
            <div
              key={voice.id}
              className="team-card"
              style={{
                backgroundColor: '#F3EFEA',
                borderRadius: '24px',
                padding: '16px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '155%',
                  backgroundColor: '#1E1B18',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '20px',
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(4px)',
                  color: '#FFF',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  zIndex: 10,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>
                  VOICE {String(idx + 1).padStart(2, '0')}
                </span>
                <iframe
                  src={`https://fast.wistia.net/embed/iframe/${voice.id}?videoFoam=true`}
                  title={voice.name}
                  allow="autoplay; fullscreen"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    pointerEvents: isDragging ? 'none' : 'auto',
                  }}
                />
              </div>

              <div style={{ padding: '0 8px 12px 8px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#111827',
                  margin: '0 0 6px 0',
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  letterSpacing: '-0.01em',
                }}>
                  {voice.name}
                </h3>
                <p style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#6D28D9',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  margin: '0 0 10px 0',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>
                  {voice.role}
                </p>
                <p style={{
                  fontSize: '13.5px',
                  color: '#4B5563',
                  lineHeight: '1.5',
                  margin: 0,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>
                  {voice.quote}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '36px' }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide page ${i + 1}`}
              style={{
                height: '8px',
                width: activeIndex === i ? '28px' : '8px',
                borderRadius: '4px',
                backgroundColor: activeIndex === i ? '#6D28D9' : '#D1D5DB',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
