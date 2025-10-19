import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { ToastProvider } from '@/components/ui/toast';
import { Analytics } from '@/components/analytics';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'MedAid - Home Healthcare Coordination',
    template: '%s | MedAid',
  },
  description: 'Professional home healthcare coordination platform for nurses providing in-home patient care.',
  keywords: ['healthcare', 'nursing', 'home care', 'patient coordination', 'medical'],
  authors: [{ name: 'MedAid Team' }],
  creator: 'MedAid',
  publisher: 'MedAid',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: '/',
    title: 'MedAid - Home Healthcare Coordination',
    description: 'Professional home healthcare coordination platform for nurses providing in-home patient care.',
    siteName: 'MedAid',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedAid - Home Healthcare Coordination',
    description: 'Professional home healthcare coordination platform for nurses providing in-home patient care.',
    creator: '@medaid',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <ToastProvider>
              {children}
              <Analytics />
            </ToastProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
