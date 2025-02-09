/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
