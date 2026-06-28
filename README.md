# TanTam — The Art of Corporate Gifting

A premium React website for **TanTam**, an enterprise corporate-gifting partner. The
experience is staged as a gift‑unboxing journey — a wax‑sealed invitation envelope
opens into a scroll‑driven 3D gift‑box hero, with festive, editorial sections throughout.

## Highlights

- **Envelope launch screen** — a realistic wax‑sealed invitation that opens into the site.
- **3D unboxing hero** — a procedural WebGL gift box (Three.js) wrapped in a festive
  red‑&‑gold pattern with a cloth ribbon + star, choreographed to scroll.
- **Vintage postcard contact page** — the enquiry form styled as an addressed postcard.
- **Festive sections** — draped bunting, geometric mosaics and hand‑drawn gift doodles.
- **Crimson & Gold design system** — Helvetica Neue type, soft pill UI, editorial photo blends.
- Multi‑route app (Solutions, Categories, Occasions, Experiential, Diwali, About, Shop,
  Enquiry) and responsive down to 320px.

## Tech stack

- **Vite** + **React 18**
- **Tailwind CSS**
- **Three.js** (WebGL gift box)
- **GSAP / ScrollTrigger** + **Lenis** smooth scroll
- **Framer Motion**, **react-pageflip**, **react-router-dom**

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/   reusable UI, 3D scene, hero, nav, footer, decorative SVGs
  pages/        route pages (Landing, About, Categories, Enquiry, …)
  data/         site content (routes, collections, copy)
  lib/          motion + smooth-scroll hooks
public/assets/  imagery
```
