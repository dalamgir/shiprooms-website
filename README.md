# Shiprooms

A responsive coming-soon website for Shiprooms, positioned as an AI software factory for the enterprise. Graphite, silver, translucent glass, and a product narrative spanning business intent, cross-functional collaboration, human accountability, and production operations.

The interactive lifecycle walkthrough covers Define, Design, Build, Verify, Ship, and Evolve. Each stage explains the roles of people and AI agents and the shared result.

The audience includes product and business, design and research, engineering and architecture, quality, security/risk/compliance, platform and operations, delivery management, and technology/business leadership. Messaging describes the product vision; it does not claim shipped enterprise capabilities or compliance certifications.

## Local development

Requires Node.js 20 or newer. No dependencies to install.

```sh
npm run dev
```

Open http://127.0.0.1:4173. Set `PORT` to use another port.

```sh
npm run check
npm run build
```

The build copies the website into `dist/`, ready for a static host. `index.html` is the page source, `assets/styles.css` contains the visual system, and `assets/site.js` drives the accessible workflow tabs.

## Early access

Set `SIGNUP_URL` at the top of `assets/site.js` to a published HTTPS form URL. This changes the header and hero buttons to early-access links and reveals the closing signup button. Without a URL, the site presents an honest coming-soon state and collects no personal data.

## GitHub Pages deployment

The `.github/workflows/deploy-pages.yml` workflow checks and builds the site on every push to `main`, then deploys only `dist/` to GitHub Pages. It can also be run manually from the repository’s Actions tab. No third-party hosting account or deployment secret is needed.

Repository Settings → Pages → Build and deployment should use **GitHub Actions** as the source. The default project URL is https://dalamgir.github.io/shiprooms-website/.

HTML asset links are relative to the page, and CSS image URLs are relative to their stylesheets. This supports both the GitHub Pages project path and hosting at a domain root.

To publish an update, commit the source changes and push `main`. Watch **Deploy Shiprooms to GitHub Pages** in Actions for the result. The existing private Sites preview is managed separately.

## Design and accessibility

- Responsive layouts for mobile, tablet, and desktop.
- Keyboard-operated workflow tabs, visible focus states, and a skip link.
- Reduced-motion support; no scroll hijacking or automatic tab switching.
- All product examples are illustrative concepts, not claims of a released application.
- Google Fonts supplies Manrope and DM Sans, with system fallbacks.
- No analytics or tracking scripts.
