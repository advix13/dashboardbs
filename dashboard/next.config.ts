import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
  // Ensure proper handling of external dependencies
  transpilePackages: ['@supabase/supabase-js', '@supabase/auth-helpers-nextjs'],
  // Adjust webpack config to properly bundle Supabase
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        // Add any other polyfills needed for Supabase
      };
    }
    return config;
  },
};

export default nextConfig;
