/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },

  webpack: function (config, options) {
    console.log(options.webpack.version) // 5.x

    config.resolve.fallback = { crypto: require.resolve('crypto-js') }

    return config
  },
}

module.exports = nextConfig
