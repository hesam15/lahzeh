import type { NextConfig } from "next";
import withPWA, { PWAConfig } from "next-pwa";

const nextConfig: NextConfig & { pwa: PWAConfig } = {
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
};

export default withPWA(nextConfig);
