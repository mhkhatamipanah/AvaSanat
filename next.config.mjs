/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
    MONGOOSE: process.env.MONGOOSE,
    JWT_KEY: process.env.JWT_KEY,
  },
};

export default nextConfig;
