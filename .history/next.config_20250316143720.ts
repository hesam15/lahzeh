import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true, // این نباید داخل پیکربندی PWA باشد
};

export default withPWA({
  ...nextConfig, // پیکربندی عمومی Next.js را اضافه می‌کنیم
  pwa: {
    dest: "public", // محل ذخیره فایل‌های PWA
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // غیر فعال کردن PWA در حالت توسعه
  },
});
