# PRD-008: About Page Content Refresh (ScoutOS-Sourced)

## Goal

Replace placeholder About page content with accurate, high-signal ScoutOS company and product context sourced from `scoutos.com`.

## Problem Statement

Current `content/about.mdx` is too thin and does not reflect Scout's current positioning, product surface, proof points, or support model.

## Scope

- Rewrite `content/about.mdx` using verified public ScoutOS website content.
- Keep tone docs-friendly (clear, factual, concise), not homepage-marketing heavy.
- Include durable links for users who want deeper context.

## Out of Scope

- Full company history timeline.
- Legal/compliance claims not explicitly published on ScoutOS pages.
- Adding new design components beyond standard MDX content blocks.

## Firecrawl Research Inputs

Scraped from `scoutos.com` via Firecrawl:

- Homepage: `https://www.scoutos.com`
- Customers: `https://www.scoutos.com/customers`
- Changelog: `https://www.scoutos.com/changelog`

Observed themes to include:

- Scout focuses on AI agents and workflow automation, with strong GTM/sales use cases.
- Product building blocks include agents, workflows, integrations, and data/Drive context.
- White-glove onboarding and implementation support are emphasized.
- Social proof includes named customers and testimonials (e.g., Statsig, Dagster, Quipli, Wide Awake).
- Product evolves quickly; changelog should be linked for latest updates.

## Proposed About Page Structure

1. What Scout is
   - Concise definition of platform and primary outcomes.
2. What you can build
   - Agents + workflows + integrations + data context.
3. Who uses Scout
   - Short proof-point section with customer page link.
4. How Scout supports teams
   - White-glove support summary.
5. Stay current
   - Changelog link and docs navigation pointers.
6. Official links
   - Website, docs, GitHub org, changelog, customers, contact/community links.

## Content Constraints

- Prefer factual statements over promotional claims.
- Do not invent metrics.
- Keep section lengths scannable (short paragraphs + bullets).
- Preserve internal docs voice consistency.

## Implementation Plan

1. Draft new About page copy with 5-6 sections.
2. Replace minimal placeholder in `content/about.mdx`.
3. Validate links and heading hierarchy.
4. Build docs and confirm rendering on desktop/mobile.

## Success Criteria

- About page clearly explains Scout's purpose and platform capabilities.
- Page includes credible external references (website, customers, changelog).
- Content is accurate to current public ScoutOS messaging.
- Reading experience is compact and useful for first-time docs visitors.

## Validation Steps

1. Run docs build and check About page output.
2. Verify all outbound links return HTTP 200/expected destination.
3. Spot-check wording against scraped source pages for factual alignment.

## Artifacts

- Target file: `content/about.mdx`
- Source references: `https://www.scoutos.com`, `https://www.scoutos.com/customers`, `https://www.scoutos.com/changelog`
