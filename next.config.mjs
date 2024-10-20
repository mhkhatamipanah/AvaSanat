/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGOOSE: process.env.MONGOOSE,
    JWT_KEY: process.env.JWT_KEY,
  },
};

export default nextConfig;
