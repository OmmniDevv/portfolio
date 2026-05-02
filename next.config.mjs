/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "mosaic.scdn.co" },
      { protocol: "https", hostname: "rerollcdn.com" },
      { protocol: "https", hostname: "api.genshin.dev" },
      { protocol: "https", hostname: "genshin.jmp.blue" },
      { protocol: "https", hostname: "cdn.myanimelist.net" },
      { protocol: "https", hostname: "s4.anilist.co" },
    ],
  },
};

export default nextConfig;
