---
title: "Metadata: Categories & Tags"
category: Editing
summary: How to classify and connect wiki entries using frontmatter.
---

Each library entry has frontmatter (the YAML block at the top) that controls how it appears in the Library index and how it relates to other pages.

## Supported Fields

These are defined in `animism-site/src/content/config.ts`.

| Field | Type | Required | Purpose |
|------|------|----------|---------|
| `title` | string | yes | Display title |
| `category` | string | yes | Grouping on the Library home |
| `summary` | string | no | Short description (optional) |
| `tags` | string[] | no | Secondary grouping / facets |
| `related` | string[] | no | Manual “See also” list |

## Category Guidelines

- Keep categories stable and few in number.
- Use categories for big buckets (e.g. “Basics”, “Structure”, “Editing”, “Reference”).

## Tag Guidelines

- Use tags when categories get too broad.
- Prefer lowercase tags (`how-to`, `draft`, `reference`) and keep them short.

## Related Links

Use `related` for curated links you always want to show together, even if a term isn’t mentioned directly in the text.

## Example

```yaml
---
title: Example Page
category: Basics
summary: One sentence summary.
tags: [how-to, reference]
related: [nexus, arche]
---
```

## See also

- [Linking & Navigation](/library/linking-navigation)
- [Drafts & Stubs](/library/drafts-stubs)
