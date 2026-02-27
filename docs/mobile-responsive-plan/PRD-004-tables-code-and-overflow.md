# PRD-004: Tables, Code Blocks and Horizontal Overflow

## Goal

Prevent horizontal breakage and preserve readability for technical content on phone and tablet.

## Scope

- Table overflow behavior and cell sizing.
- Code block width, scroll affordance and copy button placement.
- Inline code wrapping and long-token handling.

## Out of Scope

- Header/nav and global typographic scale.

## Implementation Notes

- Ensure table wrappers do not clip parent containers.
- Avoid negative margins that create viewport overflow.
- Keep code UX usable without forcing body-level horizontal scroll.

## Success Criteria

- No page-level horizontal scroll on target routes.
- Tables remain readable with clear horizontal scroll affordance.
- Code blocks scroll independently and copy buttons remain accessible.
- Desktop table and code rendering remain visually intact.
- Visual approval pass in agent browser with table-heavy and code-heavy pages.

## Validation Steps

1. Validate pages with large tables and long code samples.
2. Confirm body width equals viewport width across target sizes.
3. Capture desktop parity screenshots.

## Execution Artifacts

- Implementation report: `docs/mobile-responsive-plan/PRD-002-004-implementation-report.md`
- After screenshots: `docs/mobile-responsive-plan/after-prd002-prd004/`
