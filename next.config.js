const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA(nextConfig);
