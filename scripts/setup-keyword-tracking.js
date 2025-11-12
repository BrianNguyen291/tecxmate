#!/usr/bin/env node

/**
 * Setup script for keyword tracking
 * This script helps you set up keyword tracking for SEO monitoring
 */

const fs = require('fs')
const path = require('path')

// Target keywords for tracking
const keywords = {
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
  ],
  vi: [
    'tư vấn công nghệ',
    'phát triển AI',
    'tự động hóa doanh nghiệp',
    'phát triển web',
    'chuyển đổi số',
    'tư vấn công nghệ Việt Nam',
  ],
  zh: [
    '技術諮詢',
    'AI開發',
    '業務自動化',
    '網頁開發',
    '數位轉型',
    '台灣技術諮詢',
  ],
}

// Generate CSV template for keyword tracking
function generateCSVTemplate() {
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
  
  const rows = []
  const today = new Date().toISOString().split('T')[0]
  
  // Add English keywords
  keywords.en.forEach(keyword => {
    ['TW', 'VN', 'CN', 'US'].forEach(country => {
      rows.push([
        today,
        keyword,
        'en',
        country,
        '',
        '',
        '',
        '',
        '',
        '',
        'Initial tracking',
      ])
    })
  })
  
  // Add Vietnamese keywords
  keywords.vi.forEach(keyword => {
    ['VN', 'US'].forEach(country => {
      rows.push([
        today,
        keyword,
        'vi',
        country,
        '',
        '',
        '',
        '',
        '',
        '',
        'Initial tracking',
      ])
    })
  })
  
  // Add Chinese keywords
  keywords.zh.forEach(keyword => {
    ['TW', 'CN', 'US'].forEach(country => {
      rows.push([
        today,
        keyword,
        'zh',
        country,
        '',
        '',
        '',
        '',
        '',
        '',
        'Initial tracking',
      ])
    })
  })
  
  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n')
  
  return csv
}

// Generate Google Search Console URLs
function generateSearchConsoleUrls() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'tecxmate.com'
  const domain = siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
  
  const urls = []
  
  Object.entries(keywords).forEach(([lang, keywordsList]) => {
    keywordsList.forEach(keyword => {
      const countries = lang === 'en' ? ['TW', 'VN', 'CN'] : lang === 'vi' ? ['VN'] : ['TW', 'CN']
      
      countries.forEach(country => {
        urls.push({
          keyword,
          language: lang,
          country,
          url: `https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain:${domain}&query=${encodeURIComponent(keyword)}`,
        })
      })
    })
  })
  
  return urls
}

// Main execution
function main() {
  console.log('🚀 Setting up keyword tracking...\n')
  
  // Generate CSV template
  const csv = generateCSVTemplate()
  const csvPath = path.join(process.cwd(), 'keyword-tracking.csv')
  fs.writeFileSync(csvPath, csv, 'utf-8')
  console.log('✅ Created keyword tracking CSV:', csvPath)
  
  // Generate Search Console URLs
  const urls = generateSearchConsoleUrls()
  const urlsPath = path.join(process.cwd(), 'keyword-search-console-urls.json')
  fs.writeFileSync(urlsPath, JSON.stringify(urls, null, 2), 'utf-8')
  console.log('✅ Created Search Console URLs:', urlsPath)
  
  // Generate tracking guide
  console.log('\n📊 Keyword Tracking Setup Complete!')
  console.log('\nNext steps:')
  console.log('1. Open keyword-tracking.csv in Google Sheets or Excel')
  console.log('2. Set up Google Search Console: https://search.google.com/search-console')
  console.log('3. Submit sitemap: https://tecxmate.com/sitemap.xml')
  console.log('4. Start tracking keywords weekly')
  console.log('5. Use keyword-search-console-urls.json to quickly access Search Console')
  console.log('\n📖 See KEYWORD_RANKING_TRACKING_GUIDE.md for detailed instructions')
}

if (require.main === module) {
  main()
}

module.exports = { generateCSVTemplate, generateSearchConsoleUrls }

