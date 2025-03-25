import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/dashboardbs' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/dashboardbs' : '',
  images: {
    unoptimized: true,
  },
  typescript: {
    // !! WARN !!
    // Ignoring TypeScript errors for deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // !! WARN !!
    // Ignoring ESLint errors for deployment
    ignoreDuringBuilds: true,
  },
  // Disable dynamic route handling for static export
  trailingSlash: true,
};

export default nextConfig;
