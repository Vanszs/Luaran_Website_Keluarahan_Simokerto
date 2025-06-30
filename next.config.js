const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'components'),
    };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig;
