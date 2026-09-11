# Golden Orbit — responsive and interaction refinement

Result: passed

Scope: preserve the approved ivory/navy/gold visual direction and original assets while correcting inconsistent wide-screen containers and adding useful interactions. Existing routes, original company facts and legal documents are retained.

## Visual review

- Compared the previous and current desktop hero together in `qa/v3/hero-comparison.jpg`; compared the complete pages together in `qa/v3/full-comparison.jpg`.
- The original globe is now in the hero's layout flow, with bounded motion and no overlap into the client strip. Shared section gutters align the header, hero, service sections, CTA and footer at large widths.
- Original typeface, colors, logo asset, client logos, globe, device illustration and office image remain. The device visual no longer expands beyond its grid cell. The office split and process explorer were inspected at desktop size.
- New finder invitation uses the existing warm surface, typography and buttons. Its recommendation is derived from the selected business priority and context, not invented results or credentials.

## Responsive evidence

Browser-rendered same-origin viewport fixture, removed before shipping. Desktop Chrome with real CSS iframe widths; this is not physical-device or cross-browser certification.

| Home viewport | Layout width / scroll width after fixes |
|---|---|
| 320 | 305 / 305 |
| 390 | 375 / 375 |
| 768 | 753 / 753 |
| 1024 | 1009 / 1009 |
| 1440 | 1425 / 1425 |
| 2560 | 2545 / 2545 |
| 3440 | 3425 / 3425 |

The 15px difference is Chrome's reserved scrollbar. A legacy body minimum width caused horizontal overflow at 320; removed and rechecked. The fixture found no text/control overflow at these home widths. Additional confirmed narrow checks: contact, engagements, digital marketing detail, approach. Confirmed 3440 checks: services catalog, contact and about. Mobile home and contact were visually inspected; mobile menu was exercised on the approach page. A larger route loop was interrupted by browser-tool timeouts and is not counted as completed evidence.

## Interaction checks

- Finder: open → Win more customers → Continue → long-term partner → recommendation → Discuss this direction → contact. Confirmed Digital Marketing, Growth partnership, and generated context in the inquiry form.
- Fixed a null-context render error discovered after the first choice; repeated the complete path successfully.
- Form: synthetic name/email and consent → Review my inquiry. The prepared text contains the selected service, engagement and context. No email was sent.
- Process explorer: keyboard activation of Design changes its expanded state and displays the roadmap output; screenshot inspected.
- FAQ: keyboard activation changes expanded state.
- Mobile navigation: open, inspect all destinations, Escape; expanded state returns to false.
- Motion control: switches the root to `motion-off`, then back to `motion-on`. CSS removes animations and transitions in that state; system reduced-motion is also respected. Off-screen globe animations and background-tab animation are paused.
- Fresh application-console check after the corrected flow: no application errors. Browser-extension metadata errors are external to the app.

## Build and limitations

- Vite client/SSR build and 16-route prerender succeed. Existing Sites worker tests: 4/4 passed.
- Contact remains an email preparation/copy flow. No CRM integration or automatic delivery was introduced.
- Expanded proposed service scopes, engagement copy and unresolved original legal jurisdiction still require owner review before a separate launch on the company domain.
