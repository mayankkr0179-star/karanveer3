# Karanveer Singh — HR Portfolio (complete rebuild + leftover items)

This project is currently empty, so the full portfolio from your brief will be built here, including the items usually left out last time (GitHub Pages setup, certificate gallery, resume download, dark mode, favicon).

## What you will get
- One scrolling page with a sticky navbar, coral "Download Resume" button, coral scroll progress bar, back-to-top button, light/dark toggle.
- Hero (deep teal): eyebrow, name, headline, tagline, career focus, 4 buttons, photo with coral offset frame (navy blazer photo), 5 key-strength chips, animated stat strip.
- Section 01 About: second photo + ~100-word first-person story + 4 value cards.
- Section 02 Academic timeline (MBA, B.Tech, Intermediate).
- Section 03 Experience timeline (Marriott with "Excellent" badge, The Leading Solutions).
- Section 04 Projects: 3 large numbered cards with Problem / Approach / Outcome, coral flow strip, tags. ₹11,000 appears only on the HR Dashboard card.
- Section 05 Certifications: 4 cards (NPTEL, Marriott letter, Leading Solutions certificate, Specialization doc) with click-to-zoom viewer, generated from your uploaded PDFs.
- Section 06 Skills (grouped chips, no ratings) + coral closing strip.
- Section 07 LinkedIn card, closing quote band, "Let's talk HR." contact with mailto + Copy email, footer.
- Palette teal #005A63, coral #EB5F3D, off-white #FDFBF9, blue-grey #ECF3F6; Fraunces headings, Inter body; subtle scroll-reveal respecting reduced motion.
- SEO + Open Graph tags, "KS" favicon.

## Leftover / GitHub Pages items
- Site prerendered to plain static HTML so it can be hosted on GitHub Pages.
- `.github/workflows/deploy.yml` (build on push to main, deploy with configure-pages / upload-pages-artifact / deploy-pages).
- `public/.nojekyll`, `404.html` redirecting to index, relative asset paths.
- README with overview, local run, and deploy steps (Settings → Pages → Source: GitHub Actions).

## Questions answered by assumption
- Resume: no resume PDF was uploaded. I will use the Job_Training_HR.pdf as a placeholder for "Download Resume" unless you upload your resume.
- Phone numbers, roll numbers, QR codes, CIN numbers will be cropped/blurred out of certificate images where visible.

## Technical details
- Rebuild in TanStack Start with `prerender` enabled for `/` (static output), framer-motion for reveals.
- Certificate PDFs converted to PNG previews (pdftoppm), redacted, stored as images; photos and PDFs placed in `public/` so links stay relative for GitHub Pages.
- Design tokens in `src/styles.css`, section components under `src/components/portfolio/`.
