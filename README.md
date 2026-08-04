# Acadia — Storefront Prototype

An internal, non-public prototype of a game storefront/platform for **Acadia**,
in the spirit of Steam / Epic / Xbox. Built with **React + Vite + Tailwind CSS**
and driven entirely by **mock data** — there is no backend, database, accounts,
or payment processing.

> **Internal Prototype — Not for Public Release.**
> All game titles, publishers, and descriptions are fictional. Cover/screenshot
> art is generated locally, so the app needs no external image assets.

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
| `/originals`     | Store        | Browse pre-filtered to Acadia Originals                     |
| `/marketplace`   | Store        | Browse pre-filtered to third-party Marketplace titles        |
| `/game/:id`      | Game detail  | Banner, screenshot gallery, requirements, "Buy Now" modal    |

- **Originals vs Marketplace** are distinguished everywhere by a colored `Badge`
  (blue = Acadia Original, green = Marketplace).
- **Buy Now** opens a "Prototype Preview — Purchasing Not Yet Available" modal.
  No payment flow exists.

## Project structure

```
src/
  data/games.js        Mock catalog + selectors (single source of truth)
  components/           Header, Footer, HeroCarousel, GameRow, GameCard,
                        Badge, Artwork (local placeholder art), FilterBar, BuyModal
  pages/                Home, Browse, GameDetail
  App.jsx               Routes + layout
```

## Branding / theming

- Accent color is defined **once** in `tailwind.config.js` under `theme.extend.colors.accent`.
  It's currently electric blue; change that scale to rebrand (e.g. to amber) —
  nothing else hard-codes the accent.
- Dark theme surfaces live under `colors.ink` in the same file.

## Not in scope yet

Real checkout/payments, user accounts/login, marketplace licensing integration,
and an About/team page are intentionally left out until real requirements exist.
