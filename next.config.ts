import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Official BID website — hotlink approved for BID-owned images
      {
        protocol: "https",
        hostname: "forestavenuebid.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.forestavenuebid.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
