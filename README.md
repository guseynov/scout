# Community Deals

A Next.js marketplace demo for discovering community-curated products with shareable filters and cached on-demand details.

# Live demo
https://scout-deals-fawn.vercel.app/

## Features

- Server-rendered product catalog backed by DummyJSON
- Runtime API validation with Zod and DTO-to-UI mapping
- Search and category filters stored in URL parameters
- Debounced search updates with browser back/forward support
- Comfortable and dense grid layouts managed with Zustand
- Hover and keyboard-focus product previews powered by TanStack Query
- Cached detail requests with loading and error states
- Responsive product cards with defensive text truncation
- Route-level loading and error boundaries

## Tech Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- TanStack Query 5
- Zustand 5
- Zod 4
- Lucide React

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The catalog is available at `/deals`.

## Available Commands

```bash
npm run dev     # Start the development server
npm run lint    # Run ESLint
npm run build   # Create and validate a production build
npm run start   # Serve the production build
npx tsc --noEmit # Run TypeScript checks without emitting files
```

## Filtering

The catalog stores active filters in the URL so views can be refreshed, shared, and navigated with browser history.

| Parameter | Example | Purpose |
| --- | --- | --- |
| `q` | `/deals?q=phone` | Searches titles, descriptions, and categories |
| `category` | `/deals?category=beauty` | Selects an API-provided category |

Default values are omitted from the URL, invalid categories fall back to the full collection, and unrelated query parameters are preserved.

## Data Flow

The initial catalog is fetched on the server from:

```text
https://dummyjson.com/products
```

Hovering or focusing a card fetches additional details on the client from:

```text
https://dummyjson.com/product/{id}
```

TanStack Query caches detail responses by product ID. Detail queries remain fresh for five minutes and are removed after fifteen minutes without use.

## Architecture

- `app/deals/page.tsx` fetches the catalog and scopes the query provider to the deals experience.
- `app/deals/DealFilters.tsx` owns URL filtering, debounced search, and layout selection.
- `app/deals/DealCard.tsx` handles image presentation and hover/focus preview visibility.
- `app/deals/DealDetailsPreview.tsx` renders query loading, error, and detail states.
- `app/lib/deals.ts` validates and maps the catalog response.
- `app/lib/dealDetails.ts` defines TanStack Query options for individual products.
- `app/types/deal.ts` contains Zod schemas and inferred API/UI types.
- `app/deals/store.ts` owns the Zustand grid-layout state.
- `app/components/QueryProvider.tsx` configures query caching and development tools.

## Current Limitations

- DummyJSON is a demonstration API; product availability and content are not controlled by this project.
- Layout selection is held in memory and resets after a full page reload.
- Automated component and end-to-end tests are not configured yet.
