import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Keep this outside of withPWA
};

export default withPWA({
  ...nextConfig, // Spread the main Next.js config
  pwa: {
    dest: "public", // Path for Service Worker
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
    buildExcludes: [/middleware-manifest.json$/], // Prevent Webpack errors
  },
});
