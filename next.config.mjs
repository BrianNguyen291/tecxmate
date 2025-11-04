/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    // Allow images from WordPress domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.wordpress.com',
      },
      {
        protocol: 'https',
        hostname: '**.wp.com',
      },
      {
        protocol: 'https',
        hostname: '**.wordpress.org',
      },
    ],
  },
  // SEO and performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Performance optimizations for development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Reduce file watching overhead
      config.watchOptions = {
        poll: false,
        aggregateTimeout: 300,
        ignored: [
          '**/node_modules/**',
          '**/.next/**',
          '**/tecxmate-main/**',
          '**/crypted.vc/**',
          '**/package-lock.json',
          '**/pnpm-lock.yaml',
          '**/yarn.lock',
          '**/.git/**',
        ],
      }
    }
    return config
  },
  // Exclude sub-projects from being processed
  experimental: {
    // Reduce bundle analysis overhead
    webpackBuildWorker: true,
  },
}

export default nextConfig
