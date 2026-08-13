import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#5D2DB0',
};

export const metadata: Metadata = {
  title: 'Careers at Team Zealancy - Make Content for Top 1%',
  description: 'Make content for the top 1% of creators. Team Zealancy is actively hiring for creative roles.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://teamzealancy.com/career',
  },
  openGraph: {
    type: 'website',
    siteName: 'Team Zealancy',
    title: 'Careers at Team Zealancy - Make Content for Top 1%',
    description: 'Make content for the top 1% of creators. Team Zealancy is actively hiring for creative roles.',
    url: 'https://teamzealancy.com/career',
    images: [
      {
        url: 'https://teamzealancy.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Join Team Zealancy, make your career in the creator economy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at Team Zealancy - Make Content for Top 1%',
    description: 'Make content for the top 1% of creators. Team Zealancy is actively hiring for creative roles.',
    images: ['https://teamzealancy.com/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="js">
      <body>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7B4FD6" stopOpacity=".55" />
              <stop offset="1" stopColor="#7B4FD6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
