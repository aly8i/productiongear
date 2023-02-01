/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images:{
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
        ],
      },
      compiler: {
        styledComponents: true,
      },
}

module.exports = nextConfig
