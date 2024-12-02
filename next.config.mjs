/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'standalone',
    experimental: {
        ppr: 'incremental',
      },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'platform-lookaside.fbsbx.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'icons8.com',
            },
        ],
    },
};

export default nextConfig;
