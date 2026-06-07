# 智加知识产权官网

这是智加知识产权官网项目，基于 Next.js 静态导出并通过 GitHub Pages 发布。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物会输出到 `out/`，适用于 GitHub Pages 静态托管。

## 发布

推送到 `main` 分支后，`.github/workflows/pages.yml` 会自动构建并部署到 GitHub Pages。
