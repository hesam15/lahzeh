import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  ...nextConfig, // اضافه کردن تنظیمات عمومی Next.js
  pwa: {
    dest: "public", // محل ذخیره service worker
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // غیرفعال‌سازی PWA در حالت dev
  },
});
