/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    // Allows production builds to complete successfully even if
    // your project has TypeScript type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
