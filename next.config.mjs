/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: [''],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/**',
            },
        ]
    }
};

export default nextConfig;
