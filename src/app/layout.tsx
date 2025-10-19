import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { ErrorBoundary } from '@/components/error-boundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MedAid - Healthcare Management System',
  description: 'Comprehensive healthcare management system for nurses, patients, and medical facilities.',
  keywords: ['healthcare', 'nursing', 'patient management', 'medical', 'healthcare software'],
  authors: [{ name: 'MedAid Team' }],
  creator: 'MedAid',
  publisher: 'MedAid',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://medaid.com'),
  openGraph: {
    title: 'MedAid - Healthcare Management System',
    description: 'Comprehensive healthcare management system for nurses, patients, and medical facilities.',
    url: 'https://medaid.com',
    siteName: 'MedAid',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MedAid Healthcare Management System',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedAid - Healthcare Management System',
    description: 'Comprehensive healthcare management system for nurses, patients, and medical facilities.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              {children}
            </QueryProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

