import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true, // فقط در تنظیمات Next.js
};

export default withPWA({
  pwa: {
    dest: "public", // مسیر Service Worker
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // غیرفعال در محیط dev
    buildExcludes: [/middleware-manifest.json$/], // جلوگیری از خطای Webpack
  },
})(nextConfig); // `nextConfig` را اینجا پاس می‌دهیم
