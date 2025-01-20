/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  env: {
    STATIC_URL: isProd ? process.env.STATIC_URL : "",
  },
  assetPrefix: isProd ? process.env.STATIC_URL : "",
};

module.exports = nextConfig;
