import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.CREDIZZA_BUILD_DIR || '.next',
};

export default nextConfig;
