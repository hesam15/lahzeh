import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true, // اینجا تنظیمات Next.js میاد
  experimental: {
    scrollRestoration: true, // برای Next.js 15 پیشنهاد میشه
  },
};

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    buildExcludes: [/middleware-manifest.json$/],
  },
});
