/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  ...(isGithubPages && {
    output: 'export',
    basePath: '/ajb-annual-report-2025',
  }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
