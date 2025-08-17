import type { NextConfig } from "next";
import withPWA, { type PWAConfig } from "next-pwa";

const pwaConfig: PWAConfig = {
  dest: "public", // مسیر ذخیره service worker و سایر فایل‌های PWA
  register: true,
  skipWaiting: true,
};

const nextConfig: NextConfig = withPWA({
  pwa: pwaConfig, // استفاده از متغیر pwaConfig برای رفع ارور TypeScript
});

export default nextConfig;
