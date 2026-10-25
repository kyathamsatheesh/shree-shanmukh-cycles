import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Weekly photos are served from /public. SVG placeholders are allowed so the
    // site works before real photos are added (replace them with .jpg/.webp).
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/llms.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
    ];
  },
};

export default nextConfig;
