/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ['@tanstack/react-query', 'zustand', '@react-three/drei'],
    cpus: 1,
    workerThreads: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.abzar.example' },
      { protocol: 'https', hostname: '**.arvanstorage.ir' },
      { protocol: 'https', hostname: 'api.technorextools.com' },
      { protocol: 'https', hostname: 'technorextools.com' },
      { protocol: 'https', hostname: 'www.technorextools.com' },
      { protocol: 'https', hostname: 'trustseal.enamad.ir' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
