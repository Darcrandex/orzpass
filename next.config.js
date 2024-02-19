/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  // 客户端需要使用这些变量，需要做映射
  env: {
    NEXT_ENCODE_TIMES: process.env.NEXT_ENCODE_TIMES,
  },
}

if (process.env.NODE_ENV === 'development') {
  const t = setTimeout(() => {
    const address = require('address')
    const port = process.env.PORT || 3000
    const ip = address.ip()

    console.clear()
    console.log('Next.js development server:\n')
    console.log('- Local:\t', `http://localhost:${port}`)
    console.log('- Network:\t', `http://${ip}:${port}`)

    clearTimeout(t)
  }, 2000)
}

module.exports = nextConfig
