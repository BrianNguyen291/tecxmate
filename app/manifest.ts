import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"
  
  return {
    name: 'Tecxmate - Technology Consultancy',
    short_name: 'Tecxmate',
    description: 'Technology consultancy and solutions for SMEs and Founders',
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F3F1',
    theme_color: '#F6F3F1',
    icons: [
      {
        src: '/tecxmate-logo-cropped.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
    categories: ['business', 'technology', 'consulting'],
    lang: 'en',
    orientation: 'portrait',
  }
}

