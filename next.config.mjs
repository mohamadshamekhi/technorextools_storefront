/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // typecheck + lint already gate the deploy in CI (.github/workflows/ci-cd.yml) before this
  // image ever builds — skipping Next's own pass here saves real memory/time on the 1-core,
  // ~2GB production host, where the extra pass was a contributing factor to OOM kills.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    optimizePackageImports: ['@tanstack/react-query', '@react-three/drei'],
    cpus: 1,
    workerThreads: false,
  },
  // Disable persistent webpack filesystem cache in production builds — under memory
  // pressure (Docker, low-RAM hosts) its pack-file serialization can corrupt mid-build,
  // producing "Could not find the module ... in the React Client Manifest" on a random
  // page's static export. Trades a bit of build speed for a deterministic build.
  webpack: (config, { dev }) => {
    if (!dev) config.cache = false;
    return config;
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
