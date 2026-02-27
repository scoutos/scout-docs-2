# Mobile Responsive Remediation Plan

## Objective

Fix mobile and tablet experience without regressing desktop behavior.

## Device Targets

- Phone small: 360x800
- Phone large: 430x932
- Tablet portrait: 768x1024
- Tablet landscape: 1024x768
- Desktop baseline: 1280x800 and 1440x900

## Execution Phases

### Phase 1: Baseline and Evidence

- Run agent browser on localhost and capture snapshot set for all target viewports.
- Log visual and interaction defects in a shared issue matrix.
- Define severity and assign task owners.

### Phase 2: Parallel Remediation

- Execute PRD tasks `PRD-001` to `PRD-005` in parallel where safe.
- Each task must include desktop non-regression checks.
- Keep fixes scoped and avoid global style side effects.

### Phase 3: Integration and Hardening

- Run full viewport matrix again.
- Resolve collisions between task tracks.
- Freeze CSS/API surface that affects layout.

### Phase 4: Final Review and Sign-off

- Execute final visual approval run using agent browser against localhost.
- Produce before/after screenshot package and pass/fail checklist.
- Document follow-ups and known deferred items.

## Parallel Task Set

- `PRD-001-baseline-and-audit.md`
- `PRD-002-navigation-and-header.md`
- `PRD-003-content-typography-and-spacing.md`
- `PRD-004-tables-code-and-overflow.md`
- `PRD-005-cards-callouts-search-and-footer.md`
- `PRD-006-final-qa-and-acceptance.md`

## Agent Browser Validation Protocol

For every task:

1. Start local site (`npm run dev` or built preview).
2. Use agent browser to open key routes:
   - `/`
   - `/getting-started/quick-start`
   - `/agents/overview`
   - `/collections/overview`
   - `/drive/overview`
   - `/workflows/overview`
3. Capture viewport screenshots for all target sizes.
4. Validate acceptance criteria in each PRD.
5. Mark visual approval as pass/fail with evidence links.
