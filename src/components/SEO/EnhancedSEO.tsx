import { Helmet } from 'react-helmet-async';

interface EnhancedSEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'event' | 'profile' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  structuredData?: object;
  eventData?: {
    name: string;
    startDate: string;
    endDate?: string;
    location: {
      name: string;
      address: string;
    };
    performer?: string;
    price?: number;
    currency?: string;
    availability?: string;
    image?: string;
  };
  businessData?: {
    name: string;
    address: string;
    telephone?: string;
    priceRange?: string;
    servesCuisine?: string;
    openingHours?: string[];
    image?: string;
    rating?: number;
    reviewCount?: number;
  };
}

export const EnhancedSEO = ({
  title,
  description,
  keywords,
  canonical,
  image = 'https://sypot.com/og-image.jpg',
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  noindex = false,
  structuredData,
  eventData,
  businessData
}: EnhancedSEOProps) => {
  const siteUrl = 'https://sypot.com';
  const fullTitle = `${title} | Sypot - Discover Events & Experiences`;
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined;
  
  // Organization structured data (for all pages)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sypot",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": "Discover and attend amazing events in your city with Sypot",
    "sameAs": [
      "https://www.facebook.com/sypot",
      "https://twitter.com/sypot",
      "https://www.instagram.com/sypot",
      "https://www.linkedin.com/company/sypot"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": ["English"]
    }
  };

  // Website structured data (for homepage)
  const websiteSchema = type === 'website' ? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sypot",
    "url": siteUrl,
    "description": description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  } : null;

  // Event structured data
  const eventSchema = eventData ? {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": eventData.name,
    "startDate": eventData.startDate,
    "endDate": eventData.endDate || eventData.startDate,
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": eventData.location.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": eventData.location.address
      }
    },
    "image": eventData.image || image,
    "description": description,
    "offers": eventData.price ? {
      "@type": "Offer",
      "url": fullCanonical,
      "price": eventData.price,
      "priceCurrency": eventData.currency || "USD",
      "availability": eventData.availability || "https://schema.org/InStock",
      "validFrom": new Date().toISOString()
    } : undefined,
    "performer": eventData.performer ? {
      "@type": "PerformingGroup",
      "name": eventData.performer
    } : undefined,
    "organizer": {
      "@type": "Organization",
      "name": "Sypot",
      "url": siteUrl
    }
  } : null;

  // Local Business structured data
  const businessSchema = businessData ? {
    "@context": "https://schema.org",
    "@type": businessData.servesCuisine ? "Restaurant" : "LocalBusiness",
    "name": businessData.name,
    "image": businessData.image || image,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessData.address
    },
    "telephone": businessData.telephone,
    "url": fullCanonical,
    "priceRange": businessData.priceRange,
    "servesCuisine": businessData.servesCuisine,
    "openingHoursSpecification": businessData.openingHours?.map(hours => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": hours
    })),
    "aggregateRating": businessData.rating ? {
      "@type": "AggregateRating",
      "ratingValue": businessData.rating,
      "reviewCount": businessData.reviewCount
    } : undefined
  } : null;

  // BreadcrumbList structured data
  const breadcrumbSchema = canonical ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": fullCanonical
      }
    ]
  } : null;

  // Combine all structured data
  const allStructuredData = [
    organizationSchema,
    websiteSchema,
    eventSchema,
    businessSchema,
    breadcrumbSchema,
    structuredData
  ].filter(Boolean);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Canonical URL */}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      
      {/* Robots Meta */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical || siteUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Sypot" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific OG tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sypot" />
      <meta name="twitter:creator" content="@sypot" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags for SEO */}
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="Sypot" />
      
      {/* Structured Data */}
      {allStructuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* Language alternatives */}
      <link rel="alternate" hrefLang="en" href={fullCanonical || siteUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonical || siteUrl} />
    </Helmet>
  );
};