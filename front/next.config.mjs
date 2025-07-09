/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // note: it's usually 'images', not 'image'
        pathname: '/**', // allow all image paths
      },
    ],
  },
};

export default nextConfig;
