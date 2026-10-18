# Verification record

Checked October 18, 2026 against the production static export.

## Build and code

- npm run build: passed, with no build errors or warnings.
- Strict TypeScript checking: passed as part of the production build.
- npm run lint: passed with zero warnings.
- npm test: all 10 browser tests passed.
- Production output: out/.
- Windows Next.js segment-file normalization runs automatically after the build.

## Browser coverage

Google Chrome was used against the local production server.

- All eight routes returned HTTP 200, with one h1 and page-specific metadata/canonicals.
- The custom missing-page route returned HTTP 404 and the branded recovery link.
- Images decoded successfully and all have alt attributes.
- Eight routes were checked at 360, 640, 768, 1024, 1280 and 1536 pixels: 48 layout combinations, with no horizontal document overflow.
- The team grid used one, two or three columns as specified.
- Exactly six published members appeared in the supplied order. Build/Code filters and the join card worked; unpublished entries stayed hidden.
- The mobile menu trapped focus, closed with Escape, returned focus, and navigated.
- The evolution lightbox supported arrows, Tab, Escape and focus return.
- Desktop robot features, build timeline and story narrative pinned and responded to scroll.
- The preloader completed once per session; route navigation and the reduced-motion layout worked.
- The 3D scene rendered, pointer depth responded, and no browser console warnings/errors were emitted during that test.
- Contact validation and the explicit email handoff worked without reloading the page.
- Both document download URLs returned valid PDF files.

Desktop home, mobile home, sponsorship tiers, contact layout and team layout were visually reviewed. Both placeholder PDFs were rendered and inspected, with no clipping or missing text.

## Mobile Lighthouse

The local production home page scored:

| Category       | Score |
| -------------- | ----- |
| Performance    | 93    |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 100   |

The recorded mobile JavaScript transfer was 217.2 KiB. Desktop WebGL loads separately after idle time; touch devices retain the lightweight concept illustration. The lightbox is separately loaded.

Machine-readable results, browser information and measured paint/layout metrics are in lighthouse-mobile.json. These are local mobile-emulation results; hosting and network conditions can change scores.

## Content and configuration

Photos, robot specifications, biographies, sample counters, sponsorship amounts/costs and outreach plans remain explicitly labeled. Only confirmed team facts are presented as established information. Push Back appears as history; Override 2026–27 is the featured season.

The form endpoint is intentionally empty because none was supplied. The working default prepares an email for the visitor to review and send. Network loading/success/error handling is implemented for a configured Formspree endpoint; actual delivery to the team's account cannot be verified until that endpoint is supplied.

The sponsorship packet and team flyer are genuine, labeled placeholder PDFs. Replace them with approved documents before treating them as final fundraising material.

Vercel, Netlify and GitHub Pages deployment configuration is supplied. No live site or DNS configuration was changed. GitHub Pages targets the requested root custom domain; see the README for setup.
