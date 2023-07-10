/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/osrs-api/:path*",
        destination: "https://secure.runescape.com/m=hiscore_oldschool/:path*"
      },
    ]
  }
}

module.exports = nextConfig
