/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/product",
  images: {
    domains: ["png.pngtree.com", "img.freepik.com", "www.pngkey.com"], // <== Domain name
  },
};

export default nextConfig;
