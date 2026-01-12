# WikiAstro (Astro Wiki Site)

A simple, multi-page wiki-style site built with Astro. Content lives in Markdown files and is rendered via Astro Content Collections.

## Stack

- Astro 5 (static output)
- Markdown/MDX content collections (`astro:content`)
- React islands for interactive UI (navbar + wiki sidebar search)
- Phosphor icons

## Content

- Top-level content pages: `src/content/pages/*.md` (rendered at `/<slug>`)
- Wiki entries: `src/content/wiki/*.md` (rendered at `/library/<slug>`)

## Common commands

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

## Project layout (high level)

```text
src/
  content/
    pages/        # Markdown pages (About, Getting Started, etc.)
    wiki/         # Markdown wiki entries
    config.ts     # Content collection schemas
  layouts/        # PageLayout + WikiLayout
  pages/          # Astro routes (index, dynamic slugs, library)
  components/     # React UI components (Navbar, WikiSidebar)
  styles/         # Global typography + theme variables
```

## Deploy

The site is built as a static bundle in `dist/`. It includes Netlify config under `netlify/` and `netlify.toml`.
