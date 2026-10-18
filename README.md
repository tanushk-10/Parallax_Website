# Parallax Robotics

A complete static Next.js App Router website for the 2026–27 VEX V5RC Override season. TypeScript, Tailwind CSS, GSAP ScrollTrigger + Flip, Lenis, and a separately loaded React Three Fiber / Drei concept scene.

## Run locally

Use Node.js 22.13 or newer and npm.

    npm install
    npm run dev

Open http://localhost:3000. On Windows with PowerShell script execution disabled, use `npm.cmd` in place of `npm`.

    npm run lint
    npm run typecheck
    npm run build
    npm run preview

The production output is `out/`. `npm run start` also serves this static output. There is no server runtime, CMS or database.

Packages are pinned in `package.json` and `package-lock.json`. TypeScript 6.0.3 is pinned because the current typescript-eslint parser does not support TypeScript 7. Three.js 0.182.0 and matching types are pinned because current React Three Fiber still constructs Clock, which newer Three.js versions warn about. Upgrade the pair together when Fiber adopts Timer. The webpack build is explicit for consistent Windows builds. Next.js 16 has a Windows static-export segment filename bug; `scripts/postbuild.mjs` normalizes the files automatically after every build. It does nothing on already-correct Linux exports.

## Change the content

Published records live in typed files under `src/data/`. General page headings and prose are in `copy.ts`, grouped by source route/component. Keep existing keys and edit their values.

| File           | What to edit                                                                 |
| -------------- | ---------------------------------------------------------------------------- |
| `site.ts`      | Identity, season, team number, contact endpoint, links, navigation           |
| `team.ts`      | Members, roles, groups, bios, photos and publishing                          |
| `robot.ts`     | Specs, photos, feature notes, hotspot coordinates, build phases, evolution   |
| `stats.ts`     | Counter values, suffixes and notes; members derive from the published roster |
| `sponsors.ts`  | Proposed tier amounts/benefits, sponsor placements, cost examples            |
| `outreach.ts`  | Outreach dates, places, descriptions, photos, status and optional impact     |
| `story.ts`     | Narrative chapters and the confirmed founding-to-now timeline                |
| `resources.ts` | Resources, download paths, notebook/repository links, FAQ                    |
| `copy.ts`      | Page copy, headings, labels, shared CTAs and introductory descriptions       |

Leave `teamNumber` empty until confirmed. It only appears in the hero, footer and contact once populated. Override is the featured season; Push Back appears only in historical content.

### Add a student

Fill in one of the six unpublished entries in `team.ts`, or add an entry matching the Member type. Set `published: true`, a unique id, and order. Founders sort first, then order. Filters are generated only from groups with published members. The roster and member counter update automatically. The grid supports 6–20 members: three columns on desktop, two on tablet, one on mobile.

Use a local photo path such as `/images/team/pranav.webp`, or leave `photo: ''` for an initials avatar. Never publish a placeholder student named “New member”. Replace the labeled biography text with an approved one-line bio.

### Replace photos

See `docs/PHOTO-SHOT-LIST.md` for every placeholder path, recommended dimensions and shot instructions. Add compressed WebP/AVIF photos to `public/images/` and update the corresponding data path. Keep meaningful alt text. Use consistently framed member portraits, and obtain permission for student photos.

The 3D hero is an abstract concept study. It does not represent a confirmed robot design. Actual robot photos, specs and mechanism notes remain labeled until the team supplies them.

### Update sponsors, stats and outreach

Sample stats, tier amounts, benefits and item prices have TODO comments and visible placeholder labels. Confirm values before removing those labels. Do not turn illustrative values into verified claims in prose.

Sponsor tiles are available placements, not actual supporters. Replace the name, tier, logo, URL and placeholder flag together. Eight generic tiles are supplied. Keep the placeholder disclosure while slots remain unfilled.

The outreach records are proposed formats, not completed events. Confirm dates, location, status, copy, photos and impact before publishing a completed event. Null impact values do not render a number.

### Replace documents and unknown links

These are real PDFs with prominent placeholder labels:

- `public/docs/parallax-sponsorship-packet.pdf`
- `public/docs/parallax-team-one-pager.pdf`

Overwrite them with approved documents, keeping the filenames for existing links. The packet is not an approved sponsorship agreement. Unknown notebook/repository URLs remain `#` in resources.ts and render as non-interactive “Coming soon” cards.

`npm run assets` regenerates the original placeholder SVGs, PDFs, icons and OG image. It overwrites generated assets; do not run it over approved replacements. `scripts/download-fonts.mjs` can refresh the bundled fonts.

## Contact form

Set `formEndpoint` in `src/data/site.ts` to your Formspree endpoint, for example `https://formspree.io/f/YOUR_FORM_ID`, and rebuild. Configure the recipient and allowed domain with Formspree. The endpoint is public configuration.

The form validates name, email, subject and message, includes an offscreen honeypot, sends FormData with fetch, and reports loading, success and error states without reloading. A 15-second timeout allows a retry.

With an empty endpoint, no network submission is attempted. The form validates, prepares a mailto link, and asks the visitor to open their email app, review and send. It never claims an unsent message was delivered. The public team email is also directly accessible.

## Design and motion

Edit the palette in `:root` in `src/app/globals.css`. `--accent` is electric orange; `--sand` is the warm secondary. Major colors are CSS custom properties.

Fonts are bundled locally under `public/fonts/` with SIL Open Font Licenses. Change the font paths and `--font-display` / `--font-body` in globals.css, plus the display font preload in layout.tsx, to swap them.

Shared eases, motion preference checks and scroll helpers are in `src/lib/motion.ts`. Route-scoped animation setup/cleanup live in MotionProvider.tsx. Components explain their animation at the top.

The session intro lasts about two seconds. New routes use a curtain transition and start at the top. Desktop has smooth scroll, tilt and inertial pointer depth. Touch uses native scrolling and the lightweight static concept illustration. The desktop WebGL scene loads separately after idle time, caps pixel ratio at two, and stops rendering offscreen. Reduced motion uses short opacity reveals, final counter values, static illustrations and stacked narratives.

Robot features and the build timeline pin horizontally on desktop and stack below 1024px. The story pins its chapters on desktop. Reduced motion exposes all text and panels in normal flow. The native pointer remains available.

## Deploy

### Vercel

Import the repository. `vercel.json` sets the build command to `npm run build` and the output directory to `out`. Configure parallaxrobotics.net in the host dashboard.

### Netlify

Import the repository. `netlify.toml` sets the build command/publish directory and immutable caching for hashed assets. Configure the domain in the dashboard.

### GitHub Pages

The supplied `.github/workflows/pages.yml` builds and deploys out when changes reach main, or when manually dispatched. In repository Settings → Pages, select GitHub Actions.

Root-relative links target the requested custom domain parallaxrobotics.net. `public/CNAME` contains that domain. Configure the custom domain in Pages and point DNS to GitHub Pages using GitHub's current instructions. A root user/organization Pages site also works if you remove CNAME.

A project site under /repository-name/ requires a base path in Next configuration and prefixes for public asset/download paths. The supplied configuration targets the requested root custom domain.

SEO includes per-route metadata/canonicals, Open Graph/Twitter cards, a 1200×630 OG image, Organization JSON-LD, sitemap.xml, robots.txt and SVG/PNG/apple icons. Update site.url for a different primary domain.

## Browser checks

    npm test

Tests use installed Google Chrome. If Chrome is unavailable, install a Playwright browser (`npx playwright install chromium`) and remove `channel: 'chrome'` from playwright.config.ts. Tests start the production preview automatically; run `npm run build` first.

The suite verifies all eight routes, the custom 404, metadata, images, the six requested widths, roster order/filters, menu focus trapping, lightbox, email fallback, session intro and navigation. Tests never send a real message.

See `docs/VERIFICATION.md` for recorded production QA, mobile Lighthouse scores and content configuration.
