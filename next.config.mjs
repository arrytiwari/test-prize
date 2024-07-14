/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'dweb.link',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'img.freepik.com',
            port: '',
            pathname: '/**',
          },
          {
            hostname: 'placehold.co',
          },
          {
            hostname: 'placehold.jp',
          },
          {
            hostname: 'xpocwafkdpksspefsybx.supabase.co',
          },
        ],
      },
};

export default nextConfig;
