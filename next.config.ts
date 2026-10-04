import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  // Next 16 turns this on in development. In this environment it waits on a
  // debug stream that never finishes, so clicks and hover never hydrate.
  experimental: {
    reactDebugChannel: false,
  },
  async headers() {
    return [
      {
        source: "/builder",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
        ],
      },
    ]
  },
};

export default nextConfig;
