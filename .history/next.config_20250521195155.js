// next.config.ts
import withPWA from 'next-pwa';

const baseConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.lahzeh.me'],
  },
};

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})(baseConfig);

export default config;
