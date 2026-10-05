'use client'

import Script from 'next/script'

interface WistiaVideoPlayerProps {
  wistiaId?: string;
}

export default function WistiaVideoPlayer({ wistiaId = 'n7izw776pu' }: WistiaVideoPlayerProps) {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
      {/* Wistia Scripts */}
      <Script src="https://fast.wistia.com/assets/external/E-v1.js" strategy="lazyOnload" />
      <Script src={`https://fast.wistia.com/embed/medias/${wistiaId}.jsonp`} strategy="lazyOnload" />

      {/* Wistia Responsive Wrapper */}
      <div 
        className={`wistia_embed wistia_async_${wistiaId} seo=false videoFoam=true playerColor=6D28D9`} 
        style={{ position: 'relative', width: '100%', height: '100%' }}
      >
        <div 
          className="wistia_swatch" 
          style={{ 
            height: '100%', 
            left: 0, 
            opacity: 0, 
            overflow: 'hidden', 
            position: 'absolute', 
            top: 0, 
            transition: 'opacity 200ms', 
            width: '100%' 
          }}
        >
          <img 
            src={`https://fast.wistia.com/embed/medias/${wistiaId}/swatch`} 
            style={{ filter: 'blur(5px)', height: '100%', objectFit: 'contain', width: '100%' }} 
            alt="Video Thumbnail" 
            aria-hidden="true" 
          />
        </div>
        <iframe
          src={`https://fast.wistia.net/embed/iframe/${wistiaId}?videoFoam=true&playerColor=6D28D9`}
          title="Team Zealancy Video"
          allow="autoplay; fullscreen"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '20px',
          }}
          className="w-full h-full aspect-video rounded-2xl"
        />
      </div>
    </div>
  )
}
