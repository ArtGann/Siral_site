# Design QA — SIRAL full website

final result: passed

Scope: selected Golden Orbit expanded at the user's request into 15 content pages and 404. This gate covers frontend design and interactions, not backend delivery, legal validity or full WCAG certification.

Reference: `reference/selected-design.png`, 893×1760. Desktop viewport 1363×936; content width 1348px. Mobile iframe 390×844; content width 375px plus 15px scrollbar. Default goal selected, menus closed; motion paused where necessary for stable captures.

Combined images opened and inspected: `qa/v2/hero-comparison.jpg` and `qa/v2/full-comparison.jpg`. Both sides normalized to equal widths with aspect ratio preserved. Palette, headline hierarchy, original logo and globe placement follow the reference. Client, service, process and FAQ sections are intentional expansion. Minor P3 type metrics/artwork differences remain.

Home, services, service detail, About, Approach, Plans, Contact and Privacy desktop captures inspected. No blocking stretching, clipping or overlap found. Mobile default service text was truncated (P2); shortened to “Not sure — help me choose”, recaptured and visually checked in `qa/v2/siral-v2-mobile-contact-fixed.jpg`. Added mobile form anchor and compacted contact facts. Final form and catalog measured 375px client / 375px scroll width.

Verified: catalog filters; service CTA and prefill; engagement prefill; browser Back; native required-field validation; completed inquiry review; encoded mailto; clipboard copy; edit retention; goal and approach keyboard tabs; FAQ aria-expanded; mobile menu; Escape and focus return; legal contents hash; direct service entry; Terms; Disclaimer; 404; motion toggle. No email sent.

Earlier Vite reload error during editing was resolved. Fresh final navigation produced no application-origin console errors or warnings. Mobile final console check also clean. Browser-extension diagnostics excluded.

Build passed with 16 prerendered routes. Internal links and single-H1 integrity were checked with no failures. Sites worker tests 4/4 passed. Temporary mobile QA page removed before final build.

Limits: inquiry prepares email/copy, no backend or CRM; expanded service scopes/process/formats need owner confirmation; legal source contains an unresolved jurisdiction placeholder; preview is noindex; final production HTTP 404 and domain metadata require configuration before SEO launch.
