# Acadia — Game Storefront

A game storefront/platform for **Acadia**, in the spirit of Steam / Epic / Xbox.
Built with **React + Vite + Tailwind CSS**. The catalog is currently served from
local mock data, and the store includes a working checkout flow and a free
in-browser game.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`).

Other scripts:

```bash
npm run build     # production build to /dist
npm run preview   # preview the production build
```

## What's here

| Route            | Page         | Notes                                                        |
| ---------------- | ------------ | ----------------------------------------------------------- |
| `/`              | Home         | Rotating featured hero, Originals, Marketplace, New, Trending |
| `/browse`        | Store        | Full grid, filter by type/genre/price/tags, sortable         |
| `/originals`     | Store        | Browse pre-filtered to Acadia Originals                      |
| `/marketplace`   | Store        | Browse pre-filtered to third-party Marketplace titles        |
| `/game/:id`      | Game detail  | Banner, screenshot gallery, requirements, Buy / Play button  |
| `/checkout/:id`  | Checkout     | Order summary + payment form (payment is simulated)          |
| `/play/:id`      | Play         | In-browser games (e.g. Nova Sweeper, a Minesweeper)          |

- **Originals vs Marketplace** are distinguished everywhere by a colored `Badge`
  (blue = Acadia Original, green = Marketplace).
- Paid titles route to **Checkout**; the free playable title (**Nova Sweeper** by
  Sense Interactive) routes straight to **Play**.

## Payments

The checkout page is a front-end demo: there is no backend or payment processor
wired up, so **no real payment is taken and no card is charged**. The form exists
to demonstrate the purchase flow. Wiring up a real processor (e.g. Stripe) would
be the next step if this goes to production.

## Project structure

```
src/
  data/games.js        Catalog + selectors (single source of truth)
  components/           Header, Footer, HeroCarousel, GameRow, GameCard,
                        Badge, Artwork (local placeholder art), FilterBar, Minesweeper
  pages/                Home, Browse, GameDetail, Checkout, Play
  App.jsx               Routes + layout
```

## Branding / theming

- Accent color is defined **once** in `tailwind.config.js` under `theme.extend.colors.accent`.
  It's currently electric blue; change that scale to rebrand — nothing else hard-codes the accent.
- Dark theme surfaces live under `colors.ink` in the same file.

## Deployment

Hosted on Vercel, auto-deploying on push to `main`. `vercel.json` adds an SPA
fallback so client-side routes work on direct load. The `dist/` output is a
static build.
