import { config } from "@/config";
import createNextMdxPlugin from "@next/mdx";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withMDX = createNextMdxPlugin();
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  experimental: {
    staleTimes: {
      dynamic: 1000 * 60 * 5, // 5 minutes
      static: config.defaults.staleTimeMs,
    },
  },
};

export default withMDX(withNextIntl(nextConfig));
