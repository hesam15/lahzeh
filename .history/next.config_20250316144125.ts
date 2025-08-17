import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

// با این روش TypeScript دیگر خطا نمی‌دهد
export default withPWA({
  ...nextConfig,
  pwa: {
    dest: "public", // مسیر ذخیره Service Worker
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // PWA در حالت dev غیرفعال شود
  },
} as NextConfig);
