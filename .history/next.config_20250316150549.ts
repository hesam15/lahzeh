// next.config.js
import withPWA from "next-pwa";

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest.json$/],
};

const nextConfig = {
  reactStrictMode: true,
  // سایر گزینه‌های پیکربندی Next.js می‌توانند در اینجا اضافه شوند
};

export default withPWA(nextConfig, pwaConfig);
