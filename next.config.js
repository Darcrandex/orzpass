/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  // 客户端需要使用这些变量，需要做映射
  env: {
    NEXT_ENCODE_TIMES: process.env.NEXT_ENCODE_TIMES,
  },
}

module.exports = nextConfig
