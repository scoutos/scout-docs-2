# PRD-001 Baseline Report and Defect Matrix

Date: 2026-02-27
Environment: localhost (`http://127.0.0.1:3000`)

## Coverage Check

- Routes captured: 6/6
  - `/`
  - `/getting-started/quick-start/`
  - `/agents/overview/`
  - `/collections/overview/`
  - `/drive/overview/`
  - `/workflows/overview/`
- Viewports captured: 6/6
  - Phone small `360x800`
  - Phone large `430x932`
  - Tablet portrait `768x1024`
  - Tablet landscape `1024x768`
  - Desktop `1280x800`
  - Desktop `1440x900`
- Screenshot count: 36/36
- Screenshot location: `docs/mobile-responsive-plan/baseline-evidence/*.png`

## Priority Defect Matrix

| ID | Severity | Issue | Routes | Viewports | Reproducibility | Likely CSS/Component Suspect | Remediation PRD |
|---|---|---|---|---|---|---|---|
| D-001 | P0 | Primary content column collapses to narrow width on phone (roughly half viewport), making docs difficult to read. | All 6 target routes | 360x800, 430x932 | Always | Layout interaction around floating page controls in article header (copy-page block) and mobile `main`/`article` overrides in `app/custom.css` | PRD-003 (primary), PRD-005 |
| D-002 | P0 | Page-level horizontal overflow on phone (`scrollWidth = viewport + 16px`) causes body-level side scroll risk. | All 6 target routes | 360x800, 430x932 | Always | Mobile table and code overrides in `app/custom.css`, including broad `main table` rules and negative-margin code block rules (`pre { margin: 1rem -1rem; width: calc(100% + 2rem); }`) | PRD-004 |
| D-003 | P1 | Code samples are frequently wider than container on phone and tablet portrait; independent code scrolling is inconsistent. | `/getting-started/quick-start/`, `/collections/overview/`, `/drive/overview/`, `/workflows/overview/` | 360x800, 430x932, 768x1024 | Always on code-heavy pages | `pre` and inline-code global overrides in `app/custom.css` (`pre`, `.nextra-content pre`, `article pre`) and mobile width/spacing choices | PRD-004 |
| D-004 | P1 | Tables still force aggressive horizontal compression/overflow behavior on phone, reducing readability. | `/`, `/agents/overview/`, `/collections/overview/`, `/drive/overview/`, `/workflows/overview/` | 360x800, 430x932 | Always on table-bearing sections | Table display conversion and cell min-width constraints in `app/custom.css` (`table { display:block; ... }`, `th/td min-width`) | PRD-004 |
| D-005 | P2 | Tablet portrait keeps dense left navigation/sidebar footprint, reducing main reading column for long docs. | Most docs routes | 768x1024 | Consistent | Sidebar breakpoint behavior (desktop sidebar remains active at tablet portrait) and nav/header breakpoint policy | PRD-002, PRD-003 |

## Quantitative Audit Signals

- Phone overflow is global in baseline:
  - 360x800: 6/6 routes with horizontal overflow.
  - 430x932: 6/6 routes with horizontal overflow.
- Tablet and desktop baseline are stable for page-level overflow:
  - 768x1024, 1024x768, 1280x800, 1440x900: 0/24 route-viewport captures with page-level overflow.
- Code/table concentration aligns with defects:
  - `drive/overview` has the highest code pressure in baseline and repeated wide code/table sections.
  - `collections/overview` and `workflows/overview` show mixed table + code stress on mobile.

## Evidence Notes

- Representative narrow-content screenshots:
  - `docs/mobile-responsive-plan/baseline-evidence/getting-started-quick-start__phone-small.png`
  - `docs/mobile-responsive-plan/baseline-evidence/collections-overview__phone-small.png`
- Representative overflow-prone technical pages:
  - `docs/mobile-responsive-plan/baseline-evidence/drive-overview__phone-small.png`
  - `docs/mobile-responsive-plan/baseline-evidence/workflows-overview__phone-small.png`
- Tablet baseline reference:
  - `docs/mobile-responsive-plan/baseline-evidence/home__tablet-portrait.png`

## Task Mapping for Parallel Remediation

- PRD-002 (`navigation-and-header`)
  - Resolve tablet sidebar/nav breakpoint density and any header control overlap risk.
- PRD-003 (`content-typography-and-spacing`)
  - Restore full-width readable mobile content column and normalize content rhythm.
- PRD-004 (`tables-code-and-overflow`)
  - Remove body-level overflow and confine table/code overflow to component-level scroll.
- PRD-005 (`cards-callouts-search-and-footer`)
  - Validate secondary component behavior after core layout fixes (search, callouts, footer, misc controls).

## Visual Approval Checkpoint

- Baseline capture and defect triage completed on localhost using `agent-browser`.
- PRD-001 status: complete.
