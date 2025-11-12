// Country-specific keyword mapping for SEO
export const countryKeywords = {
  // English (Global/Taiwan)
  en: {
    primary: [
      'technology consultancy',
      'AI development',
      'business automation',
      'web development',
      'startup consulting',
      'SME solutions',
      'digital transformation',
      'tech consulting Taiwan',
      'Taiwan tech consultancy',
      'software development Taiwan',
      'AI integration consulting',
      'tech consulting services',
      'business technology solutions',
    ],
    longTail: [
      'technology consultancy for SMEs Taiwan',
      'AI integration consulting services',
      'business automation solutions Taiwan',
      'web development company Taiwan',
      'startup tech consulting services',
      'digital transformation consulting Taiwan',
      'SME technology solutions Taiwan',
    ],
  },
  
  // Vietnamese (Vietnam)
  vi: {
    primary: [
      'tư vấn công nghệ',
      'phát triển AI',
      'tự động hóa doanh nghiệp',
      'phát triển web',
      'tư vấn khởi nghiệp',
      'giải pháp cho doanh nghiệp vừa và nhỏ',
      'chuyển đổi số',
      'tư vấn công nghệ Việt Nam',
      'công ty công nghệ Việt Nam',
      'phát triển phần mềm Việt Nam',
      'tư vấn công nghệ thông tin',
      'giải pháp công nghệ doanh nghiệp',
      'tự động hóa quy trình kinh doanh',
      'tích hợp AI',
      'dịch vụ tư vấn công nghệ',
    ],
    longTail: [
      'tư vấn công nghệ cho doanh nghiệp vừa và nhỏ',
      'dịch vụ tích hợp AI',
      'giải pháp tự động hóa doanh nghiệp Việt Nam',
      'công ty phát triển web Việt Nam',
      'tư vấn công nghệ cho startup',
      'chuyển đổi số doanh nghiệp',
      'giải pháp công nghệ thông tin cho doanh nghiệp',
      'tư vấn chuyển đổi số',
      'giải pháp công nghệ cho SME',
    ],
  },
  
  // Chinese (Taiwan/China)
  zh: {
    primary: [
      '技術諮詢',
      'AI開發',
      '業務自動化',
      '網頁開發',
      '新創諮詢',
      '中小企業解決方案',
      '數位轉型',
      '台灣技術諮詢',
      '台灣科技諮詢',
      '軟體開發台灣',
      '技術顧問服務',
      '企業數位化解決方案',
      '流程自動化',
      '商業自動化',
      'AI整合諮詢',
    ],
    longTail: [
      '台灣中小企業技術諮詢',
      'AI整合諮詢服務',
      '台灣業務自動化解決方案',
      '台灣網頁開發公司',
      '新創科技諮詢服務',
      '企業數位轉型顧問',
      '台灣軟體開發服務',
      '數位轉型顧問服務',
      '中小企業科技解決方案',
    ],
  },
}

// Regional variations
export const regionalKeywords = {
  vietnam: {
    en: ['tech consulting Vietnam', 'Vietnam technology services', 'Vietnam software development', 'tech consultancy Vietnam'],
    vi: ['tư vấn công nghệ Việt Nam', 'dịch vụ công nghệ Việt Nam', 'phát triển phần mềm Việt Nam', 'công ty tư vấn công nghệ Việt Nam'],
  },
  taiwan: {
    en: ['tech consulting Taiwan', 'Taiwan technology services', 'Taiwan software development', 'tech consultancy Taiwan'],
    zh: ['台灣技術諮詢', '台灣科技服務', '台灣軟體開發', '台灣技術顧問公司'],
  },
  china: {
    en: ['tech consulting China', 'China technology services', 'China software development', 'tech consultancy China'],
    zh: ['中國技術諮詢', '中國科技服務', '中國軟體開發', '中國技術顧問公司'],
  },
}

// Generate country-specific keywords for metadata
export function generateCountryKeywords(baseKeywords: string[] = []): string {
  const allKeywords = [
    ...baseKeywords,
    // English keywords
    ...countryKeywords.en.primary,
    // Vietnamese keywords
    ...countryKeywords.vi.primary,
    // Chinese keywords
    ...countryKeywords.zh.primary,
    // Regional keywords
    ...regionalKeywords.vietnam.en,
    ...regionalKeywords.vietnam.vi,
    ...regionalKeywords.taiwan.en,
    ...regionalKeywords.taiwan.zh,
    ...regionalKeywords.china.en,
    ...regionalKeywords.china.zh,
    // Brand
    'tecxmate',
  ]
  
  // Remove duplicates and join
  return [...new Set(allKeywords)].join(', ')
}

// Generate keywords for specific language
export function generateLanguageKeywords(lang: 'en' | 'vi' | 'zh', baseKeywords: string[] = []): string {
  const langKeywords = [
    ...baseKeywords,
    ...countryKeywords[lang].primary,
    ...countryKeywords[lang].longTail,
  ]
  
  if (lang === 'vi') {
    langKeywords.push(...regionalKeywords.vietnam.vi, ...regionalKeywords.vietnam.en)
  } else if (lang === 'zh') {
    langKeywords.push(...regionalKeywords.taiwan.zh, ...regionalKeywords.china.zh, ...regionalKeywords.taiwan.en, ...regionalKeywords.china.en)
  } else {
    langKeywords.push(...regionalKeywords.vietnam.en, ...regionalKeywords.taiwan.en, ...regionalKeywords.china.en)
  }
  
  langKeywords.push('tecxmate')
  
  return [...new Set(langKeywords)].join(', ')
}

