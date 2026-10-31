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
npm test
npm run build
```

The build copies the website into `dist/`, ready for a static host. `index.html` is the page source, `assets/styles.css` contains the visual system, and `assets/site.js` drives the accessible workflow tabs.

## Early access

The header and hero link to the registration form at `#early-access`. Only email is required; name, company, discipline, and a short note are optional. The form uses Formspree to store registrations and notify the verified recipient configured in the Formspree dashboard. The `email` field sets the notification's Reply-To address.

The public endpoint belongs in the `action` attribute of `#interest-form` in `index.html`; no account credentials or API secrets belong in this repository. `assets/interest.js` submits asynchronously, prevents duplicate requests while sending, and shows confirmation only after Formspree accepts the submission. Errors preserve the visitor's entries for retry. `assets/interest.css` contains the form styling.

Manage notification recipients, spam protection, submissions, and account limits in Formspree. Test delivery after changing the endpoint or notification settings. The free plan has a monthly submission allowance and limited dashboard retention; monitor usage before a launch campaign. Submitting this form does not create a product account or send an automatic confirmation email.

## GitHub Pages deployment

The final 83-second product film is hosted with the site at `assets/media/shiprooms-film.mp4`, linked from the hero and shown in the `#film` section. Playback is visitor initiated (`preload="none"`), with native controls, inline mobile playback, English captions, and an expandable transcript. `film.css` and `film.js` provide the glass frame and initial play button. Without JavaScript, the native player remains usable. The video is the approved V7 export, with the website brand mark throughout and the unchanged Laurel narration/music mix. The poster is its opening masthead; no external video host or cookies are required.

The `.github/workflows/deploy-pages.yml` workflow checks and builds the site on every push to `main`, then deploys only `dist/` to GitHub Pages. It can also be run manually from the repository’s Actions tab. No third-party hosting account or deployment secret is needed.

Repository Settings → Pages → Build and deployment should use **GitHub Actions** as the source. The production URL is **https://shiprooms.ai/**; GitHub manages its TLS certificate, and **Enforce HTTPS** is enabled.

DNS is managed at GoDaddy. The apex (`@`) has four A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`. The `www` CNAME points to `dalamgir.github.io`. GitHub redirects `www` to the apex domain. Preserve these records when changing other domain services.

HTML asset links are relative to the page, and CSS image URLs are relative to their stylesheets. This supports both the GitHub Pages project path and hosting at a domain root.

To publish an update, commit the source changes and push `main`. Watch **Deploy Shiprooms to GitHub Pages** in Actions for the result. The existing private Sites preview is managed separately.

## Design and accessibility

- Responsive layouts for mobile, tablet, and desktop.
- Keyboard-operated workflow tabs, visible focus states, and a skip link.
- Reduced-motion support; no scroll hijacking or automatic tab switching.
- All product examples are illustrative concepts, not claims of a released application.
- Google Fonts supplies Manrope and DM Sans, with system fallbacks.
- No analytics or tracking scripts.
