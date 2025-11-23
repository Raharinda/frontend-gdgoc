/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gpu.id',
        pathname: '/data-gpu/**',
      },
      {
        protocol: 'https',
        hostname: '**.herokuapp.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Tambahkan ini untuk fix preload warning
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Disable image optimization di development
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      optimizePackageImports: ['lucide-react'],
    },
  }),
};

export default nextConfig;