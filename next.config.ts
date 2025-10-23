import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sofanacaixa.com.br',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
