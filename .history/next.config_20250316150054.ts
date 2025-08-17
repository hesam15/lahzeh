import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true, // This should be at the top level of the config
  // other Next.js config options can go here
};

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest.json$/],
  // You can also add other PWA-specific configurations here if needed
};

export default withPWA({
  ...nextConfig,
  pwa: pwaConfig,
});
