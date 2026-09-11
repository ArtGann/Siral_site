# Prototype Instructions

Ultrawide feedback: a fixed content-width cap is insufficient. Above the 1800px design canvas, scale typography, spacing, images, controls and content bounds together with rem units. Keep responsive media thresholds in CSS pixels. Validate composition, not merely absence of horizontal overflow; include a 7680px CSS viewport for the tiny-content/extreme-photo-crop regression.

Selected visual: reference/selected-design.png (Golden Orbit, first of the latest three revised concepts). Preserve original gold SC globe / navy SIRAL Corporation logo. Light ivory backgrounds, navy typography, champagne gold, globe hero, goal tabs, device workflow, office and managed-plan split. Strong motion with reduced-motion support. Omit unconfirmed $850 pricing. Contact is a frontend email-brief flow: never claim email was sent. Do not publish without an explicit request.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Full company website extension
Current refinement: preserve the approved Golden Orbit appearance and original logo. User wants richer interaction and motion, with complete responsive behavior including ultrawide displays. Use a single bounded content frame across all full-bleed sections. Keep the globe contained in its hero. Explain expertise through useful service selection and process interactions; never invent scale, results or credentials. New motion must respect reduced-motion and the manual motion switch, and touch interactions must not depend on hover.
User requested full public-site research and all pages. Expand the selected Golden Orbit design into a coherent multipage site with the six verified service categories, About, Approach, engagement options, Contact and existing legal pages. Use original company photos and existing client logos; do not invent client results, prices, staff identities, awards or legal jurisdiction. New expanded service descriptions and engagement structures are proposed copy, requiring business confirmation before production. Preserve original routes. All primary internal links must work, including browser history and direct entry.
