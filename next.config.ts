import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
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
