// WordPress Configuration
// For WordPress.com sites: use your site URL (e.g., 'yoursite.wordpress.com')
// For self-hosted WordPress: use your full domain (e.g., 'blog.yoursite.com')
export const WORDPRESS_SITE_URL = process.env.WORDPRESS_SITE_URL || 'phucphanblog.wordpress.com'

// Automatically determine API URL based on site URL
// WordPress.com sites use the public API
// Self-hosted sites use the REST API at /wp-json/wp/v2
const isWordPressCom = WORDPRESS_SITE_URL.includes('.wordpress.com')
export const WORDPRESS_BASE_URL = isWordPressCom 
  ? `https://${WORDPRESS_SITE_URL}`
  : `https://${WORDPRESS_SITE_URL}`

export const WORDPRESS_API_URL = isWordPressCom
  ? `https://public-api.wordpress.com/wp/v2/sites/${WORDPRESS_SITE_URL}`
  : `https://${WORDPRESS_SITE_URL}/wp-json/wp/v2`

// Cache and pagination settings
export const REVALIDATE_TIME = parseInt(process.env.WORDPRESS_REVALIDATE_TIME || '300', 10) // 5 minutes default
export const POSTS_PER_PAGE = parseInt(process.env.WORDPRESS_POSTS_PER_PAGE || '9', 10)


