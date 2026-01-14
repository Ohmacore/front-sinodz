import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ],
      },
    ];
  },
  async rewrites() {
    // Use production backend by default, override with env vars for local dev
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://sinodz-backend.ohmacore.cloud/api";
    const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "https://sinodz-backend.ohmacore.cloud/storage";

    return [
      {
        // Proxy API calls to avoid CORS issues
        source: "/api/proxy/:path*",
        destination: `${apiUrl}/:path*`,
      },
      {
        // Proxy storage calls to avoid CORS issues
        source: "/storage/proxy/:path*",
        destination: `${storageUrl}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "sinodz-backend.ohmacore.cloud",
      },
      {
        protocol: "http",
        hostname: "sinodz-backend.ohmacore.cloud",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "10.1.1.101",
      },
      {
        protocol: "http",
        hostname: "10.213.68.90",
      },

    ],
    // Disable optimization in development to allow private IPs
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
