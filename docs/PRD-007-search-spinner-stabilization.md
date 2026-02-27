# PRD-007: Search Spinner Stabilization (Static Pagefind)

## Goal

Make docs search reliably return results in production with no indefinite loading spinner.

## Problem Statement

Users report search remains in a loading state (spinner) instead of returning results.

The site is intended to use Nextra + Pagefind with a static, frontend-only index (no backend dependency).

## Scope

- Diagnose search runtime behavior on deployed docs.
- Validate Pagefind static assets and fetchability from production.
- Fix build/deploy/runtime configuration causing spinner state.
- Add guardrails so future deploys cannot silently ship broken search.

## Out of Scope

- Adding Algolia/Meilisearch/any server-side search service.

## Current State

- Build is configured to generate Pagefind index into `out/_pagefind`.
- Nextra search client loads `/_pagefind/pagefind.js` and then WASM/index assets.
- Production symptom indicates runtime load or query flow is not completing.

## Likely Failure Modes

1. One or more `/_pagefind/*` assets are not publicly reachable in production.
2. `pagefind.js` loads, but WASM/index requests fail (404, MIME/CORS, or host rule).
3. Client-side exception during Pagefind import/search leaves `isLoading` true.
4. Stale CDN/browser cache serving old app bundle without matching index assets.

## Implementation Plan

1. Reproduce in deployed environment
   - Verify spinner on desktop and mobile.
   - Capture console/network evidence for `/_pagefind/*` requests.
2. Asset health verification
   - Check `200` responses for:
     - `/_pagefind/pagefind.js`
     - `/_pagefind/wasm.en.pagefind`
     - `/_pagefind/pagefind-entry.json`
   - Confirm response headers are compatible (especially WASM content type handling).
3. Runtime hardening
   - Ensure user-visible error fallback renders when Pagefind import/search fails.
   - Ensure loading state is always cleared on all error paths.
4. Build/deploy guardrail
   - Add CI/deploy check to fail if required `out/_pagefind` artifacts are missing.
   - Add a post-deploy smoke test for one known query returning >=1 result.
5. Documentation update
   - Add troubleshooting steps to docs runbook for search regressions.

## Success Criteria

- Typing a valid query returns results in <=2s on production.
- No indefinite spinner state under normal network conditions.
- If search cannot initialize, clear error text appears (no silent failure).
- Automated guardrail catches missing/broken index assets before release.

## Validation Steps

1. Build locally and confirm `out/_pagefind` contains required files.
2. Deploy and run production smoke checks against `/_pagefind/*` URLs.
3. Execute manual query tests across 5 representative docs pages.
4. Verify mobile search behavior (open, type, navigate to result) on iPhone-sized viewport.

## Artifacts

- Runtime config: `package.json`
- Search mount/load path: custom Pagefind client component via layout
- Deployment script: `deploy.mjs`
