# SIRAL production SEO release checklist

## Implemented in this package

- `robots.txt` allows crawling and points to the production sitemap.
- `sitemap.xml` is generated with production `https://siralstrategy.com` URLs.
- Every prerendered page has a canonical URL.
- Every prerendered page has Open Graph and Twitter metadata.
- Branded 1200×630 social preview image added at `/assets/og-siral.jpg`.
- Favicon, Apple Touch Icon, 192×192 and 512×512 app icons added.
- Web manifest added.
- Organization JSON-LD structured data added.
- Unknown HTML URLs return the branded 404 page with a real HTTP `404` status.
- Basic security response headers added at the Worker layer.
- Production root domain remains configured in `wrangler.jsonc`.

## Manual account actions after deployment

1. Google Search Console
   - Add `siralstrategy.com` as a Domain property.
   - Complete DNS verification if Google asks for a TXT record.
   - Submit `https://siralstrategy.com/sitemap.xml`.
   - Request indexing for the home page after deployment.

2. Cloudflare / email
   - Keep the existing Private Email MX, SPF and DKIM records.
   - Add a DMARC TXT record only after confirming the desired policy and reporting mailbox.

3. Final live checks
   - `https://siralstrategy.com/robots.txt` returns 200.
   - `https://siralstrategy.com/sitemap.xml` returns 200.
   - A fake URL returns HTTP 404, not 200.
   - `www.siralstrategy.com/*` returns a 301 to the same path on the root domain.
   - Share the site once in a social preview debugger to refresh cached OG metadata.
