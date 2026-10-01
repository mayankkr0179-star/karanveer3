# Karanveer Singh — HR Portfolio

A single-page, fully static portfolio for Karanveer Singh, MBA (HR) at Lovely Professional University. Sections: hero, about, academics, experience, projects, certifications, skills, networking and contact.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:8080.

## Deploy to GitHub Pages (free)
1. Push this project to a GitHub repository (branch `main`).
2. In the repo go to **Settings → Pages → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes the static files.

All images and documents live in `public/` and are linked with relative paths, so the site works on `username.github.io` and `username.github.io/repo-name`.

## Updating content
- Photos: `public/profile.webp`, `public/profile-2.webp`
- Resume: `public/resume.pdf`
- Certificates: `public/certs/`
- Text: `src/routes/index.tsx`
