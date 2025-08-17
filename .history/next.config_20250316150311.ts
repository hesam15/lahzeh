   // next.config.js
   import withPWA from "next-pwa";

   const nextConfig = {
     reactStrictMode: true,
     // سایر گزینه‌های پیکربندی Next.js می‌توانند در اینجا اضافه شوند
   };

   const pwaConfig = {
     dest: "public",
     register: true,
     skipWaiting: true,
     disable: process.env.NODE_ENV === "development",
     buildExcludes: [/middleware-manifest.json$/],
   };

   export default withPWA(nextConfig, pwaConfig);
   
