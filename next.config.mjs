/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for better development error detection
  reactStrictMode: true,

  // Security headers
  poweredByHeader: false,

  // Production optimizations
  compress: true,

  // Graceful handling of build errors in development
  typescript: {
    ignoreBuildErrors: false,
  },

  // External packages for server components (moved from experimental in Next.js 15)
  serverExternalPackages: ["@google/generative-ai", "firebase"],

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
    loader: "default",
    path: "/_next/image",
  },

  // Bundle optimization
  experimental: {
    optimizeCss: true,
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:all*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:all*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },

  // Redirects for common paths
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/work/:id*",
        destination: "/#projects",
        permanent: true,
      },
    ];
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: "vendor",
            chunks: "all",
            test: /node_modules/,
            priority: 20,
            reuseExistingChunk: true,
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          mui: {
            name: "mui",
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            chunks: "all",
            priority: 30,
            reuseExistingChunk: true,
          },
          animations: {
            name: "animations",
            test: /[\\/]node_modules[\\/](framer-motion|@emotion)[\\/]/,
            chunks: "all",
            priority: 30,
            reuseExistingChunk: true,
          },
        },
      };
    }

    config.resolve.symlinks = false;

    return config;
  },
  turbopack: {},
};

export default nextConfig;
