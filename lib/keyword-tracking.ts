// Keyword tracking utilities for SEO monitoring
// This file provides helper functions for tracking keyword performance

export interface KeywordTrackingData {
  keyword: string
  language: 'en' | 'vi' | 'zh'
  country: 'TW' | 'VN' | 'CN' | 'US'
  position: number
  url: string
  date: string
  impressions?: number
  clicks?: number
  ctr?: number
}

// Target keywords to track
export const targetKeywords = {
  // English keywords
  en: [
    'tech consulting',
    'AI development',
    'business automation',
    'web development',
    'startup consulting',
    'SME solutions',
    'digital transformation',
    'tech consulting Taiwan',
    'tech consulting Vietnam',
    'tech consulting China',
    'Taiwan tech consultancy',
    'Vietnam technology services',
    'China technology services',
  ],
  
  // Vietnamese keywords
  vi: [
    'tư vấn công nghệ',
    'phát triển AI',
    'tự động hóa doanh nghiệp',
    'phát triển web',
    'chuyển đổi số',
    'tư vấn công nghệ Việt Nam',
    'tư vấn khởi nghiệp',
    'giải pháp cho doanh nghiệp vừa và nhỏ',
    'dịch vụ tư vấn công nghệ',
    'công ty công nghệ Việt Nam',
  ],
  
  // Chinese keywords
  zh: [
    '技術諮詢',
    'AI開發',
    '業務自動化',
    '網頁開發',
    '數位轉型',
    '台灣技術諮詢',
    '新創諮詢',
    '中小企業解決方案',
    '技術顧問服務',
    '台灣科技服務',
  ],
}

// Get all keywords for tracking
export function getAllTrackingKeywords(): Array<{
  keyword: string
  language: 'en' | 'vi' | 'zh'
  countries: Array<'TW' | 'VN' | 'CN' | 'US'>
}> {
  return [
    // English keywords - target all countries
    ...targetKeywords.en.map(keyword => ({
      keyword,
      language: 'en' as const,
      countries: ['TW', 'VN', 'CN', 'US'] as const,
    })),
    
    // Vietnamese keywords - target Vietnam
    ...targetKeywords.vi.map(keyword => ({
      keyword,
      language: 'vi' as const,
      countries: ['VN', 'US'] as const,
    })),
    
    // Chinese keywords - target Taiwan and China
    ...targetKeywords.zh.map(keyword => ({
      keyword,
      language: 'zh' as const,
      countries: ['TW', 'CN', 'US'] as const,
    })),
  ]
}

// Generate Google Search Console query for keyword tracking
export function generateSearchConsoleQuery(keyword: string, country?: string): string {
  const baseUrl = 'https://search.google.com/search-console'
  const params = new URLSearchParams({
    resource_id: `sc-domain:${process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '') || 'tecxmate.com'}`,
    query: keyword,
  })
  
  if (country) {
    params.append('country', country)
  }
  
  return `${baseUrl}?${params.toString()}`
}

// Track keyword event in Google Analytics
export function trackKeywordSearch(keyword: string, language: string, country: string) {
  if (typeof window === 'undefined' || !window.gtag) return
  
  window.gtag('event', 'keyword_search', {
    event_category: 'SEO',
    event_label: keyword,
    keyword: keyword,
    language: language,
    country: country,
  })
}

// Track blog post view for keyword analysis
export function trackBlogPostView(slug: string, title: string, category?: string, tags?: string[]) {
  if (typeof window === 'undefined' || !window.gtag) return
  
  window.gtag('event', 'blog_post_view', {
    event_category: 'Blog',
    event_label: title,
    post_slug: slug,
    post_category: category,
    post_tags: tags?.join(', '),
    page_path: `/blog/${slug}`,
  })
}

// Export keyword list for manual tracking
export function exportKeywordsForTracking(): string {
  const allKeywords = getAllTrackingKeywords()
  
  const csv = [
    'Keyword,Language,Countries,Priority',
    ...allKeywords.map(kw => 
      `"${kw.keyword}",${kw.language},"${kw.countries.join(';')}",High`
    ),
  ].join('\n')
  
  return csv
}

// Generate tracking spreadsheet template
export function generateTrackingSpreadsheetTemplate(): string {
  const headers = [
    'Date',
    'Keyword',
    'Language',
    'Country',
    'Position',
    'URL',
    'Impressions',
    'Clicks',
    'CTR',
    'Change',
    'Notes',
  ]
  
  const keywords = getAllTrackingKeywords()
  
  const rows = keywords.flatMap(kw => 
    kw.countries.map(country => [
      new Date().toISOString().split('T')[0],
      kw.keyword,
      kw.language,
      country,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ])
  )
  
  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n')
  
  return csv
}

