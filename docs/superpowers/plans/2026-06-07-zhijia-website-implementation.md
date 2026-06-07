# Zhijia IPR Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first runnable customer-facing website for 智加知识产权 based on the approved high-end blue-gold demo direction.

**Architecture:** Create a Next.js App Router site in the current repository, with structured service data, reusable visual components, static public pages, dynamic detail pages, and a lightweight lead form API. Public content is separated from internal notes; the original Obsidian folder remains read-only and is not modified.

**Tech Stack:** Next.js App Router, TypeScript, React, plain global CSS for the bespoke brand visual system, `next/image`, `lucide-react`, `flag-icons`, local JSONL lead storage for the first local demo.

---

## File Structure

- Create `package.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`, `eslint.config.mjs`, `postcss.config.mjs`: project configuration and scripts.
- Create `src/app/layout.tsx`: root metadata, global CSS, flag icon CSS, site shell.
- Create `src/app/globals.css`: full brand visual system, responsive layout, motion, cards, forms, detail pages.
- Create `src/app/page.tsx`: home page with brand hero, form + phone conversion, countries, process, service sections.
- Create `src/app/trademark/page.tsx`: global trademark category page.
- Create `src/app/patent-copyright/page.tsx`: patent and copyright category page.
- Create `src/app/overseas-company/page.tsx`: overseas company category page.
- Create `src/app/honor-certificates/page.tsx`: honor certificates category page.
- Create `src/app/contact/page.tsx`: contact and consultation page.
- Create `src/app/internal/page.tsx`: minimal internal entry placeholder.
- Create `src/app/trademark/[slug]/page.tsx`: trademark detail pages for EU, Madrid, Japan, USA, UK, China.
- Create `src/app/overseas-company/[slug]/page.tsx`: ODI detail page.
- Create `src/app/api/leads/route.ts`: POST endpoint for consultation form submissions, writing to `output/leads/leads.jsonl` locally.
- Create `src/components/Header.tsx`, `Footer.tsx`, `LeadForm.tsx`, `CategoryHero.tsx`, `MotionBlocks.tsx`, `ServiceSections.tsx`, `DetailPage.tsx`: reusable UI.
- Create `src/data/site.ts`, `src/data/services.ts`: structured public content and routes.
- Create `public/images/*.png`: formal image assets copied from approved demo assets.

## Task 1: Scaffold Project Configuration

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `eslint.config.mjs`
- Create: `postcss.config.mjs`
- Create: `next-env.d.ts`

- [ ] **Step 1: Add package scripts and dependencies**

Use scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit"
  }
}
```

Dependencies:

```text
next
react
react-dom
lucide-react
flag-icons
```

Dev dependencies:

```text
typescript
@types/node
@types/react
@types/react-dom
eslint
eslint-config-next
```

- [ ] **Step 2: Install dependencies**

Run:

```powershell
npm install
```

Expected: `node_modules/` and `package-lock.json` are created.

## Task 2: Add Assets and Content Data

**Files:**
- Create: `public/images/hero-global-ip.png`
- Create: `public/images/team-consulting.png`
- Create: `public/images/certificates-global.png`
- Create: `public/images/luxury-hero.png`
- Create: `public/images/patent-copyright.png`
- Create: `public/images/overseas-company.png`
- Create: `public/images/honor-certificates.png`
- Create: `src/data/site.ts`
- Create: `src/data/services.ts`

- [ ] **Step 1: Copy approved demo assets**

Copy from `.superpowers/brainstorm/manual-20260607155826/content/assets/` into `public/images/` using stable formal names.

- [ ] **Step 2: Create site constants**

Include:

```ts
export const phoneNumber = "18025488636";
export const companyName = "智加知识产权";
export const navItems = [
  { label: "首页", href: "/" },
  { label: "全球商标注册", href: "/trademark" },
  { label: "专利版权", href: "/patent-copyright" },
  { label: "海外工商", href: "/overseas-company" },
  { label: "荣誉证书", href: "/honor-certificates" },
  { label: "联系咨询", href: "/contact" }
];
```

- [ ] **Step 3: Create structured service data**

Include category data for trademark, patent/copyright, overseas company, honor certificates, and detail pages for:

```text
欧盟商标注册
马德里商标国际注册
日本商标注册
美国商标注册
英国商标注册
中国商标注册
ODI 境外直接投资备案
```

Each detail item must contain `slug`, `title`, `summary`, `materials`, `process`, `notes`, `categoryHref`, and optional `countryCode`.

## Task 3: Build Shared Components

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/LeadForm.tsx`
- Create: `src/components/CategoryHero.tsx`
- Create: `src/components/MotionBlocks.tsx`
- Create: `src/components/ServiceSections.tsx`
- Create: `src/components/DetailPage.tsx`

- [ ] **Step 1: Header and Footer**

Header must include brand, nav links, phone number, and consultation button. Footer must include main services, internal entry link, risk boundary copy, and phone conversion.

- [ ] **Step 2: Lead form**

`LeadForm` is a client component. It submits:

```ts
{
  name: string;
  phone: string;
  serviceType: string;
  region: string;
  message: string;
  source: string;
}
```

Client validation requires `name`, `phone`, and `serviceType`.

- [ ] **Step 3: Visual components**

Build category hero, route board, radar block, blueprint block, certificate wall, service cards, and detail page layout using the v12 demo direction.

## Task 4: Build Public Pages

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx`
- Create: `src/app/trademark/page.tsx`
- Create: `src/app/patent-copyright/page.tsx`
- Create: `src/app/overseas-company/page.tsx`
- Create: `src/app/honor-certificates/page.tsx`
- Create: `src/app/contact/page.tsx`
- Create: `src/app/internal/page.tsx`

- [ ] **Step 1: Global layout and styling**

Implement the blue, champagne gold, white, and ivory brand system. Include responsive rules for desktop and mobile. Import `flag-icons/css/flag-icons.min.css`.

- [ ] **Step 2: Home page**

Use a high-end hero with true image asset, form + phone conversion, country entrance cards, service overview, process section, value section, and final consultation CTA.

- [ ] **Step 3: Category pages**

Create four visually distinct category pages:

```text
/trademark
/patent-copyright
/overseas-company
/honor-certificates
```

Each page has a dedicated hero, visual block, cards, and conversion section.

- [ ] **Step 4: Contact and internal pages**

Contact page shows full form, phone, service scope, and risk boundary. Internal page is a minimal placeholder for future knowledge-base access.

## Task 5: Build Detail Pages and Lead API

**Files:**
- Create: `src/app/trademark/[slug]/page.tsx`
- Create: `src/app/overseas-company/[slug]/page.tsx`
- Create: `src/app/api/leads/route.ts`

- [ ] **Step 1: Trademark detail pages**

Generate static params from service data. Unknown slug calls `notFound()`. Render materials, process, notes, and a bottom lead form.

- [ ] **Step 2: ODI detail page**

Generate static params for overseas detail services. Render ODI materials, process, conditions, notes, and a bottom lead form.

- [ ] **Step 3: Lead API**

Validate required fields. Write JSON lines to `output/leads/leads.jsonl` with `createdAt`, user fields, and `source`. Return `{ ok: true }`.

## Task 6: Verify

**Files:**
- Modify as needed based on verification failures.

- [ ] **Step 1: Run typecheck**

Run:

```powershell
npm run typecheck
```

Expected: exits 0.

- [ ] **Step 2: Run build**

Run:

```powershell
npm run build
```

Expected: exits 0.

- [ ] **Step 3: Start dev server**

Run:

```powershell
npm run dev
```

Expected: local Next.js URL is available.

- [ ] **Step 4: Browser verification**

Open the local URL and verify:

```text
首页可见
栏目页可见
欧盟、马德里、日本、ODI 内容页可见
移动端不明显拥挤
没有乱码
没有白底白字
表单有成功/失败反馈
```

## Self-Review

- Spec coverage: covers homepage, category pages, detail pages, content data, forms, phone conversion, internal entry, and visual requirements.
- Placeholder scan: no `TBD`, `TODO`, or open implementation placeholders are left.
- Type consistency: service data is consumed by category, detail, and form components through shared TypeScript exports.
