import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true, // نباید درون withPWA باشد!
};

export default withPWA({
  ...nextConfig, // پیکربندی اصلی Next.js
  dest: "public", // مسیر ذخیره Service Worker
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // غیرفعال‌سازی PWA در حالت dev
  buildExcludes: [/middleware-manifest.json$/], // جلوگیری از خطاهای Webpack
});
