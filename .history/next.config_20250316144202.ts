import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  ...nextConfig, // ادغام تنظیمات Next.js
  dest: "public", // مسیر ذخیره Service Worker
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // غیرفعال‌سازی PWA در حالت dev
});
