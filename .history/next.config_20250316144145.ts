import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

// جدا کردن تنظیمات PWA برای جلوگیری از خطای TypeScript
const pwaConfig = {
  dest: "public", // محل ذخیره Service Worker
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // غیرفعال در حالت dev
};

// ترکیب پیکربندی Next.js با PWA
export default withPWA({
  ...nextConfig,
  pwa: pwaConfig,
});
