import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true, // یا هر پیکربندی دیگر که نیاز داری
  pwa: {
    dest: "public", // محل ذخیره فایل‌های مربوط به PWA (service worker)
    register: true,
    skipWaiting: true,
  },
};

export default withPWA(nextConfig);
