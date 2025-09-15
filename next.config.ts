// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' https://js.stripe.com",
              "frame-src https://js.stripe.com",
              "img-src 'self' https://*.stripe.com data:",
              "style-src 'self' 'unsafe-inline'",
              "connect-src 'self' https://api.stripe.com https://r.stripe.com https://q.stripe.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
