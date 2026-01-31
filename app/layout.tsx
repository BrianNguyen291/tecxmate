import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BackToTop } from "@/components/back-to-top"
import { GoogleAnalytics } from "@/components/google-analytics"
import { FirebaseAnalytics } from "@/components/firebase-analytics"
import { Analytics } from '@vercel/analytics/react'
import { LanguageProvider } from "@/components/language-provider"
import { ContactFormProvider } from "@/components/contact-form-provider"
import { generateCountryKeywords } from "@/lib/keywords"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"
const gtmId = process.env.NEXT_PUBLIC_GTM_ID

export const metadata: Metadata = {
  title: {
    default: "Tecxmate - Premier Technology Consultancy for SMEs & Startups | AI Development & Web Solutions",
    template: "%s | Tecxmate"
  },
  description: "Transform your business with Tecxmate's cutting-edge technology solutions. Expert AI integration, web development, business automation, and digital transformation services. Fast delivery, innovative solutions for SMEs and founders. Book your free consultation today.",
  generator: 'Next.js',
  keywords: generateCountryKeywords([
    "technology consultancy",
    "AI development",
    "business automation",
    "web development",
    "startup consulting",
    "SME solutions",
    "digital transformation",
    "software development",
    "AI integration",
    "tech consulting",
    "business technology",
    "blockchain development",
    "mobile app development",
    "enterprise solutions"
  ]),
  authors: [{ name: 'Tecxmate', url: baseUrl }],
  creator: 'Tecxmate',
  publisher: 'Tecxmate',
  metadataBase: new URL(baseUrl),
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'en': baseUrl,
      'en-TW': baseUrl,
      'en-VN': baseUrl,
      'en-CN': baseUrl,
      // Note: Language routes don't exist yet - pointing to English for now
      'vi': baseUrl, // Will be `${baseUrl}/vi` when route exists
      'vi-VN': baseUrl,
      'zh': baseUrl, // Will be `${baseUrl}/zh` when route exists
      'zh-TW': baseUrl,
      'zh-CN': baseUrl,
      'x-default': baseUrl,
    },
  },
  openGraph: {
    title: "Tecxmate - Premier Technology Consultancy for SMEs & Startups",
    description: "Transform your business with AI-powered solutions, web development, and business automation. Fast delivery, innovative technology consulting for SMEs and founders. Book your free discovery call.",
    url: baseUrl,
    siteName: "Tecxmate",
    locale: "en_US",
    alternateLocale: ["en_TW", "en_VN", "en_CN", "vi_VN", "zh_TW", "zh_CN"],
    type: "website",
    images: [
      {
        url: `${baseUrl}/tecxmate-logo-cropped.png`,
        width: 1200,
        height: 630,
        alt: "Tecxmate - Premier Technology Consultancy for SMEs and Startups",
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tecxmate - Premier Technology Consultancy for SMEs & Startups",
    description: "Transform your business with AI-powered solutions, web development, and business automation. Fast delivery, innovative technology consulting.",
    images: [`${baseUrl}/tecxmate-logo-cropped.png`],
    creator: "@tecxmate",
  },
  verification: {
    // Add when you have verification codes
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    'theme-color': '#8c52ff',
    'color-scheme': 'light',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    // Note: Geo tags are in <head> section, not in metadata.other
    // Next.js metadata.other doesn't support colons in keys like 'geo.region:VN'
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="language" content="English" />
        <meta name="geo.region" content="VN" />
        <meta name="geo.placename" content="Ho Chi Minh City" />
        <meta name="geo.region:VN" content="VN" />
        <meta name="geo.region:CN" content="CN" />
        <meta name="geo.country" content="VN" />
        <meta name="rating" content="General" />
        <meta name="referrer" content="origin-when-cross-origin" />
        {/* Note: Hreflang tags are automatically generated from metadata.alternates.languages */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
        <link rel="dns-prefetch" href="https://assets.apollo.io" />
        <link rel="preload" as="image" href="/tecxmate-logo-cropped.png" />
        <link rel="alternate" type="application/rss+xml" title="Tecxmate Blog RSS Feed" href={`${baseUrl}/feed.xml`} />
        <link rel="manifest" href="/manifest.json" />
        {gtmId ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `.trim(),
            }}
          />
        ) : null}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
              o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
              o.onload=function(){window.trackingFunctions.onLoad({appId:"69148ff4be91700011721b4b"})},
              document.head.appendChild(o)}initApollo();
            `.trim(),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function initApolloInbound() {
                var TIMEOUT_MS = 15000;
                var timeoutId;
                var style = document.createElement('style');
                style.id = 'apollo-form-prehide-css';
                style.textContent = 'form:has(input[type="email" i]),form:has(input[name="email" i]),.hs-form-iframe{position:relative!important}form:has(input[type="email" i])::before,form:has(input[name="email" i])::before,.hs-form-iframe::before{content:"";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;width:50px;height:50px;margin:auto;border:2.5px solid #e1e1e1;border-top:2.5px solid #9ea3a6;border-radius:50%;animation:spin 1s linear infinite;background-color:transparent;pointer-events:auto;z-index:999999;opacity:1}form:has(input[type="email" i]) *,form:has(input[name="email" i]) *,.hs-form-iframe *{opacity:0!important;user-select:none!important;pointer-events:none!important}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}';
                (document.head || document.documentElement).appendChild(style);
                function cleanup() {
                  var styleEl = document.getElementById('apollo-form-prehide-css');
                  if (styleEl) styleEl.remove();
                  if (timeoutId) clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(function() {
                  console.warn('[Apollo] Form enrichment timeout after 15s - revealing forms. Check network and console for errors.');
                  cleanup();
                }, TIMEOUT_MS);
                var nocache = Math.random().toString(36).substring(7);
                var script = document.createElement('script');
                script.src = 'https://assets.apollo.io/js/apollo-inbound.js?nocache=' + nocache;
                script.defer = true;
                script.onerror = function() {
                  console.error('[Apollo] Failed to load form enrichment script');
                  cleanup();
                };
                script.onload = function() {
                  try {
                    window.ApolloInbound.formEnrichment.init({
                      appId: '697e2150debbc30011588d61',
                      onReady: function() { cleanup(); },
                      onError: function(err) {
                        console.error('[Apollo] Form enrichment init error:', err);
                        cleanup();
                      }
                    });
                  } catch (err) {
                    console.error('[Apollo] Error initializing form enrichment:', err);
                    cleanup();
                  }
                };
                document.head.appendChild(script);
              })();
            `.trim(),
          }}
        />
      </head>
      <body>
        {gtmId ? (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`.trim(),
            }}
          />
        ) : null}
        <GoogleAnalytics />
        <FirebaseAnalytics />
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <ContactFormProvider>
              {children}
              <BackToTop />
            </ContactFormProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
