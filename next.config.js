/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only enable static export for production builds
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export'
  }),
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    // Add domains if you're using external image sources
    domains: ['i.pravatar.cc']
  },
};

module.exports = nextConfig;
