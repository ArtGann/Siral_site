# Design QA — SIRAL Golden Orbit

Latest gate: ultrawide correction — final result: passed. The earlier v3 overflow-only checks missed the disproportionate composition reported by the user. Converted shared dimensional declarations to rem while retaining media breakpoints in pixels; above 1800px the full design scales proportionally. Verified 390, 1440, 3440 and 7680 CSS-pixel viewports. At 7680 the service-card width grows from ~480 to ~2043px and the office photograph retains its intended composition rather than a panoramic crop. At 390/1440 root type remains 16px. No horizontal overflow in the checked states. Combined before/after visual review: `qa/v4/wide-comparison.jpg`; inspected the 3440px service grid and 7680px partnership/FAQ, including scaled icons. Tests use Chrome CSS viewports, not physical-device certification. Existing routing and interaction logic are unchanged.

Latest responsive and interaction gate: `design-qa-v3.md` — final result: passed. Combined visual evidence: `qa/v3/hero-comparison.jpg` and `qa/v3/full-comparison.jpg`. The report below is retained as the initial single-page implementation history.

final result: passed

Source: reference/selected-design.png, 893×1760.
Initial implementation: /workspace/scratch/siral-initial-desktop.jpg, 1348×3275; cloud viewport 1363×936, content width 1348, density 1.
Combined full-view comparison: qa/comparison-initial.jpg, both normalized to 670px wide without aspect distortion.
State: default first goal, no modal, motion settled.

Initial actionable findings:
- P1: Device image retained HTML intrinsic height at responsive width, vertically stretching the art and doubling the section. Fix `height:auto` and bound the section height.
- P1: Header logo cropped its bottom tagline. Fix source-image scale and offset using the alpha bounds (655,205)-(1934,1248), retaining original bytes.
- P2: Display headings smaller than the selected visual after width normalization. Increase hero and section type; keep original line breaks.
- P2: Hero and plan regions slightly too tall. Adjust region heights toward reference proportions.

## Final visual verification

All P1 and P2 findings above were corrected and recaptured. The original logo file is used without editing. Device artwork keeps its aspect ratio; its placement was refined once more after the first corrected comparison.

Final desktop: qa/verified-desktop.jpg, 1348×2760; cloud viewport 1363×936, content width 1348, density 1. State: first goal selected, services collapsed, no dialog, motion paused for a stable comparison. Reference and implementation are normalized to the same width, preserving their aspect ratios, in qa/comparison-verified.jpg. Additional region comparisons: qa/comparison-hero.jpg and qa/comparison-solutions.jpg.

The final combined comparison was visually inspected. The ivory/navy/gold direction, headline hierarchy, globe placement, goal tabs, devices, partnership image and plan layout follow the selected design. No blocking clipping, stretching, overlap or horizontal overflow remains. Minor P3 differences remain in generated artwork details, optical spacing and type metrics; this is a responsive implementation of the selected concept, not a pixel-identical bitmap reproduction.

## Interaction and responsive verification

Verified in the cloud browser:
- Main navigation and hero CTA reach their corresponding sections.
- All three goal tabs update content; arrow-key selection works.
- Service details expand and collapse.
- Plan and approach dialogs open; process tabs update the displayed step.
- The plan CTA opens the consultation dialog.
- Required form fields block empty submission; completed fields produce the review state.
- The review state creates a correctly encoded email link, copies the brief and preserves details when returning to edit. No message was sent.
- Escape closes dialogs; focus returns to the triggering control.
- The motion control changes its state; reduced-motion styling is included.
- Mobile navigation, consultation dialog and goal tabs work in a 390×844 iframe viewport. Its scrollable content width is 375px including a 15px scrollbar, with no horizontal overflow.
- No application-origin console errors or warnings were found. Browser-extension diagnostics were excluded.

Mobile evidence: qa/siral-mobile-initial.jpg, qa/siral-mobile-form.jpg and qa/siral-mobile-solutions.jpg. Consultation evidence: qa/siral-consultation.jpg.

## Scope

This is a frontend prototype. The contact journey prepares an email or copies a brief; there is no backend submission or CRM connection. Motion uses entrance effects, floating artwork and pointer/scroll response; the globe is an image asset, not an interactive 3D scene. The production site has not been changed or deployed.

Production build: `npm --offline run build` passed after the final edits. The temporary responsive QA page was removed. Original-logo SHA-256 equality verified. The cloud preview was reloaded into its default state with motion enabled and no test form data.
