// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "localhost" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://*.cloudflareinsights.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
              "img-src 'self' http://localhost:* https://localhost:* data: blob: https://*.stripe.com https://images.unsplash.com",
              "style-src 'self' 'unsafe-inline'",
              "connect-src 'self' https://api.stripe.com https://*.stripe.com https://*.cloudflareinsights.com",
              "font-src 'self' data:",
              "object-src 'none'",
              "base-uri 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
