import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  images: {
    domains: ['wp.bf3.com.ua'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wp.bf3.com.ua',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
