
# Funded Algorithmic Trader – Deployable Site (Next.js 14 + Tailwind)

A Vercel-ready Next.js app that packages your roadmap, daily plan, strategies, psychology, funding links, and downloadable PDFs.

## Quick Start

```bash
# 1) Install deps
npm install

# 2) Run dev server
npm run dev

# 3) Build and start
npm run build && npm start
```

## Deploy to Vercel

- Create a new project on https://vercel.com and import this folder (or push to GitHub and import).
- Framework preset: **Next.js** (auto-detected)
- Root directory: this folder
- Node version: latest LTS
- After deploy, the PDFs are served from **/Funded_Algorithmic_Trader_Roadmap.pdf** and **/Expanded_Funded_Algorithmic_Trader_Course.pdf**.

## Notes

- Update links or content inside `app/page.tsx`.
- Tailwind is preconfigured via `tailwind.config.ts` and `app/globals.css`.
- If you add images or more documents, place them in `/public`.

