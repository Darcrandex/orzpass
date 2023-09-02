/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },

  // 默认情况下，env 不会被注入到前端项目
  env: {
    NEXT_APP_CLIENT_SECRET: process.env.NEXT_APP_CLIENT_SECRET,
  },
}

module.exports = nextConfig
