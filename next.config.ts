import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: [
      "app",
      "components",
      "features",
      "lib",
      "providers",
      "schemas",
      "__tests__",
    ],
  },
};

export default nextConfig;
