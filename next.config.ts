import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true" && Boolean(repositoryName);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPagesBuild ? `/${repositoryName}` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPagesBuild ? `/${repositoryName}` : ""
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
