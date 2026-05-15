# Akshat Tiwari — Portfolio

A high-performance, fully-responsive personal portfolio website for **Akshat Tiwari**, Senior Software Engineer at Optum.

🔗 **Live:** [mrwick12.github.io](https://mrwick12.github.io)

---

## 🚀 Quick Start

No build step required. Open directly in a browser:

```bash
# Clone or download the repo
git clone https://github.com/mrwick12/portfolio.git
cd portfolio

# Option 1 — Python (any machine)
python -m http.server 8080
# then open http://localhost:8080

# Option 2 — Node (if installed)
npx serve .
# then open the URL shown in terminal

# Option 3 — VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

---

## 📁 Project Structure

```
.
├── index.html      # Semantic HTML5, OG/SEO meta, links to CSS + JS
├── styles.css      # BEM-inspired styles, CSS custom properties, responsive
├── main.js         # Vanilla ES6+ interactions + Three.js 3D hero
└── README.md       # This file
```

---

## ✨ Features

| Feature | Details |
|---|---|
| **3D Hero Scene** | Three.js torus-knot mesh with mouse parallax, point lights, animated particles |
| **Particle Network** | Canvas-based connecting-particle background (200 nodes) |
| **Typed Rotator** | Auto-types and deletes role phrases |
| **Custom Cursor** | Dot + ring cursor with magnetic hover state |
| **Scroll Progress** | Gradient bar at page top, compacts nav on scroll |
| **Scroll Reveal** | Intersection Observer — fade/slide elements into view |
| **KPI Counters** | Numbers count up when the About section enters viewport |
| **3D Card Tilt** | Project cards rotate on `mousemove` via CSS perspective |
| **Magnetic Buttons** | CTAs and submit button follow cursor with subtle offset |
| **Hamburger Nav** | Mobile drawer with animated burger → ✕ and backdrop |
| **Contact Form** | Client-side validation with ARIA live region feedback |
| **WCAG AA** | Color contrast ≥ 4.5 : 1, keyboard navigable, ARIA labels |
| **Responsive** | Breakpoints at 900px, 768px, 480px |
| **SEO / OG** | Full meta + Open Graph + Twitter Card tags |
| **Reduced Motion** | Respects `prefers-reduced-motion` |

---

## 🎨 Design Tokens (CSS Variables)

```css
--ink:    #04080f   /* near-black background */
--teal:   #05f5d8   /* primary accent */
--fire:   #ff4d1c   /* danger / warm accent */
--gold:   #f0b429   /* secondary warm accent */
--white:  #f0f4ff   /* text */
--mist:   #7a8aaa   /* muted text */
--mist2:  #adbbd8   /* secondary text */
```

---

## 🌐 Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile (iOS/Android) | ✅ Responsive |

> Three.js requires WebGL; falls back gracefully — the particle canvas and all content remain visible on unsupported devices.

---

## ♿ Accessibility

- **Skip navigation** link (visible on keyboard focus)
- **ARIA labels** on nav, buttons, images, live regions
- **`aria-hidden`** on decorative elements
- **`aria-live="polite"`** on form feedback and typed-text
- **Keyboard navigable** — all interactive elements reachable via Tab
- **Focus-visible** rings on all focusable elements
- **`prefers-reduced-motion`** — all animations disabled when requested
- **Color contrast** — checked against WCAG AA (4.5 : 1 minimum)

---

## 📈 Lighthouse Recommendations

- Use `loading="lazy"` if you add `<img>` tags
- Add a `manifest.json` and icons for PWA score
- Consider serving fonts via `font-display: optional` for CLS
- Use a CDN or GitHub Pages for sub-50ms TTFB

---

## 📝 Changelog

### v2.0 — Rebuild (May 2025)

**Base file used:** `index.html` (uploaded — Akshat Tiwari's single-file portfolio)

**Changes from the base:**

1. **Split into 3 files** — extracted all `<style>` to `styles.css` and all `<script>` to `main.js`; `index.html` is now clean semantic markup only.

2. **3D Hero Scene** — added `<canvas id="hero-canvas">` in the hero right column, powered by Three.js (CDN). Renders an animated torus-knot geometry with mouse parallax and coloured point lights, directly inspired by the reference 3D portfolio (`akashrmalhotra/3d-portfolio`) which uses Three.js + React Three Fiber.

3. **Mobile hamburger menu** — replaced the hidden `nav-links` with a full-screen drawer nav triggered by an accessible `<button aria-expanded>`. The original had no mobile nav at all.

4. **SEO & Open Graph** — added `<meta description>`, `<meta keywords>`, OG image/title/description, Twitter Card, and `<link rel="canonical">`.

5. **ARIA & accessibility** — added `role`, `aria-label`, `aria-live`, `aria-hidden`, `aria-expanded`, `aria-controls`, `<main id="main">`, skip-nav link, and `<article>`/`<header>` landmarks to the timeline.

6. **BEM class naming** — renamed utility classes from single-letter shortcuts (`r`, `rl`, `rr`, `d1`…) to readable BEM names (`reveal`, `reveal-left`, `reveal-right`, `delay-1`…) while keeping identical animation behaviour.

7. **KPI counter animation** — KPI numbers now count up from 0 when they enter the viewport (IntersectionObserver + `data-target` attributes).

8. **Contact form validation** — added email-format regex check and ARIA live region for screen-reader feedback.

9. **Stagger animation helper** — grid children (project cards, cert cards, skill groups) stagger their reveal delay automatically via JS.

10. **Focus-visible rings** and `prefers-reduced-motion` support added throughout.

---

## 📄 License

Content © 2025 Akshat Tiwari. Code structure MIT.
Three.js is MIT licensed. Fonts via Google Fonts (OFL).
