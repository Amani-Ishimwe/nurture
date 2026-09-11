/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  typescript: {
    // Typechecking is handled by `tsc --noEmit` to prevent TypeScript 5.7 Windows slash debug assert crash
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
