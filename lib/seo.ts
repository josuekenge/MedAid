import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function generateMetadata({
  title = 'MedAid - Home Healthcare Coordination',
  description = 'Professional home healthcare coordination platform for nurses providing in-home patient care.',
  keywords = ['healthcare', 'nursing', 'home care', 'patient coordination', 'medical'],
  image = '/og-image.jpg',
  url = '/',
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
}: SEOProps = {}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const fullUrl = `${baseUrl}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return {
    title,
    description,
    keywords,
    authors: author ? [{ name: author }] : [{ name: 'MedAid Team' }],
    creator: 'MedAid',
    publisher: 'MedAid',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    openGraph: {
      type,
      locale: 'en_CA',
      url: fullUrl,
      title,
      description,
      siteName: 'MedAid',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
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
}

// JSON-LD structured data
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MedAid',
    description: 'Professional home healthcare coordination platform for nurses providing in-home patient care.',
    url: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-416-555-0000',
      contactType: 'customer service',
      areaServed: 'CA',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Healthcare Ave',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      postalCode: 'M5H 2N2',
      addressCountry: 'CA',
    },
    sameAs: [
      'https://twitter.com/medaid',
      'https://linkedin.com/company/medaid',
    ],
  };
}

export function generateServiceJsonLd(service: {
  name: string;
  description: string;
  price: number;
  duration: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'MedAid',
    },
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock',
    },
    duration: service.duration,
    serviceType: 'Healthcare Service',
    areaServed: {
      '@type': 'Country',
      name: 'Canada',
    },
  };
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}${item.url}`,
    })),
  };
}

export function generateFAQJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}








