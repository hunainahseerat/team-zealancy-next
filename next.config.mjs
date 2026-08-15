/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    // Build time type errors ko bypass karne ke liye
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
