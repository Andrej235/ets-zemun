import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.100"],
  sassOptions: {
    additionalData: `@use "@/sass/palette.scss" as *; @use "@/sass/mixins.scss" as *;`,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
