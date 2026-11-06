import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["localhost", "127.0.0.1", "10.187.140.21"],
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
  trailingSlash: true,
};

export default nextConfig;

