import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true, // فعال‌سازی strict mode برای ری‌اکت
};

export default withPWA({
  ...nextConfig, // ادغام پیکربندی Next.js
  pwa: {
    dest: "public", // محل ذخیره فایل‌های PWA
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // غیرفعال کردن PWA در حالت dev
  },
} as NextConfig);
