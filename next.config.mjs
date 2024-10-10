/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        ppr: 'incremental',
      },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'platform-lookaside.fbsbx.com',
            },
        ],
    },
};

export default nextConfig;
