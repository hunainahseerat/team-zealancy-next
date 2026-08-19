import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#5D2DB0',
};

export const metadata: Metadata = {
  title: 'Team Zealancy - Make Content for Top 1%',
  description: 'Make content for the top 1% of creators. Team Zealancy is actively hiring for creative roles.',
  openGraph: {
    title: 'Team Zealancy - Make Content for Top 1%',
    description: 'Make content for the top 1% of creators. Team Zealancy is actively hiring for creative roles.',
    url: 'https://teamzealancy.com',
    siteName: 'Team Zealancy',
    images: [
      {
        url: 'https://teamzealancy.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Team Zealancy Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team Zealancy - Make Content for Top 1%',
    description: 'Make content for the top 1% of creators. Team Zealancy is actively hiring for creative roles.',
    images: ['https://teamzealancy.com/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/favicon-32x32.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="js">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon-32x32.png" />
      </head>
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
