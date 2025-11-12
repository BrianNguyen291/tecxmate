"use client"

import Script from "next/script"

export function GoogleAnalytics({ gaId }: { gaId?: string }) {
  const measurementId = gaId || process.env.NEXT_PUBLIC_GA_ID

  if (!measurementId) {
    return null
  }

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              send_page_view: true,
            });
            
            // Track blog post views for keyword analysis
            if (window.location.pathname.includes('/blog/')) {
              gtag('event', 'blog_view', {
                event_category: 'Blog',
                event_label: window.location.pathname,
                page_path: window.location.pathname,
              });
            }
          `,
        }}
      />
    </>
  )
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

