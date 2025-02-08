/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
