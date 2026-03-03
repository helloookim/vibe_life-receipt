# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Life Receipt** (lifereceipt.uk) is a serverless, client-side viral web app with three services:
- **Life Receipt** (`index.html` + `script.js`) — Summarizes life statistics in a receipt format
- **Lifespan Calculator** (`lifespan.html` + `lifespan.js`) — Shows remaining lifespan with breakdowns
- **Global Wealth Rank** (`wealth.html` + `wealth.js`) — Calculates global wealth percentile

No build tools, no frameworks, no package.json. Vanilla JS + Tailwind CSS via CDN. Deploy by pushing files to Cloudflare Pages.

## Development

Open any HTML file directly in a browser — no dev server required. To test locally, use a simple HTTP server:

```
npx serve .
```

There are no tests, linters, or build steps.

## Architecture

### Project Structure

```
├── index.html / script.js          — Life Receipt service
├── lifespan.html / lifespan.js     — Lifespan Calculator service
├── wealth.html / wealth.js         — Global Wealth Rank service
├── shared.js                       — Common utilities (lang, sharing, birthdate, etc.)
├── data/
│   ├── life-expectancy.js          — WHO 2023 life expectancy by country/gender
│   └── wealth-data.js              — Income stats, PPP factors, Gini coefficients
├── blog/
│   ├── how-life-receipt-works.html — Life Receipt methodology explainer
│   ├── how-lifespan-calculator-works.html — Lifespan calculation methodology
│   └── how-wealth-percentile-works.html   — Wealth percentile methodology
├── en/ & ko/                       — Language redirect stubs (?lang= param)
├── about.html                      — About the service
├── contact.html                    — Contact form
├── privacy.html                    — Privacy policy
├── terms.html                      — Terms of service
├── robots.txt                      — Crawl rules (disallows /en/, /ko/)
├── sitemap.xml                     — Sitemap with hreflang alternates
├── og-image.png                    — OG image for Life Receipt
├── og-image-lifespan.png           — OG image for Lifespan Calculator
├── og-image-wealth.png             — OG image for Wealth Calculator
├── tools/generate-og-images.html   — Utility for generating OG images
└── life-receipt-plan.md / lifespan-calculator-plan-v2.md / wealth-percentile-plan.md
```

### Script Loading Order (per HTML page)

Each page loads scripts in this order via `<script>` tags:
1. `data/life-expectancy.js` and/or `data/wealth-data.js` — raw data globals
2. `shared.js` — common utilities and `COUNTRY_DATA`
3. Page-specific JS (`script.js`, `lifespan.js`, or `wealth.js`)

All scripts share the global scope. There are no ES modules or bundling.

### shared.js — The Common Layer

Provides globals and utilities used by all three services:

**Global State & Constants:**
- `currentLang` — global language state
- `COUNTRY_DATA` — per-country config (currency, prices, comparisons) for 10 countries
- `SITE_URL` — `'https://lifereceipt.uk'`
- `ASIAN_LANGS` — `['ko', 'ja', 'cn']`

**Language & i18n:**
- `switchLang(lang)` — toggles `.lang-{code}` class visibility on DOM elements + persists to localStorage
- `getInitialLang()` — resolution order: URL `?lang=` param → HTML `data-lang` attr → localStorage → browser locale → `'en'`
- `updateBirthdateOrder(lang)` — reorders date selects (Asian: Y-M-D, others: D-M-Y)

**Birthdate Management:**
- `initBirthdateSelects()` — populates Y/M/D dropdowns (1920–current year)
- `updateBirthdateDays(container)` — adjusts day options per month/year
- `updateBirthdateValue(container)` — syncs select values to hidden input
- `setBirthdate(dateStr)` — pre-fills from YYYY-MM-DD string

**Calculations & Formatting:**
- `calculateAge(birthdate)` — returns `{days, years}`
- `formatNumber(num)` — locale-aware formatting

**User Detection:**
- `detectUserCountry()` — maps `navigator.language` to ISO country codes (40+ locales)

**Sharing:**
- `shareToX(text, url)` — Twitter/X share popup
- `shareToFacebook(url)` — Facebook share
- `shareToThreads(text, url)` — Threads share
- `shareToLine(text, url)` — LINE share
- `shareToKakao(title, description, url)` — KakaoTalk share with fallback
- `copyLinkShared()` — copies current URL to clipboard
- `getShareUrl(path)` — builds share URL with lang parameter
- `openSharePopup(url)` — opens social share popup window

**Image Export:**
- `saveAsImage(elementId, filename, bgColor)` — uses html2canvas for image download

### Internationalization (i18n)

Supports 5 languages: `en`, `ko`, `ja`, `cn`, `es`.

Translations are done by **DOM visibility toggling** — each translatable element has a `.lang-{code}` class, and `switchLang()` shows/hides them. JavaScript-generated text uses inline translation objects keyed by language code.

The `/en/` and `/ko/` subdirectories contain redirect stubs (not full pages) that append `?lang=` params to the main URLs.

### Page Navigation Pattern

Each service is a single HTML page with multiple sections toggled via Tailwind's `.hidden` class. Forms use multi-step flows with show/hide transitions, not route changes.

### Data Files

- `data/life-expectancy.js` — `LIFE_EXPECTANCY_DATA` object: WHO 2023 life expectancy by country and gender (100+ countries)
- `data/wealth-data.js` — `WEALTH_COUNTRY_DATA` object: income stats, PPP conversion factors, Gini coefficients per country (50+ countries)

### Blog / Educational Content

Three methodology pages in `blog/` explain the science behind each calculator. Linked from the main services for SEO and user trust.

### Styling

- Tailwind CSS v3 via CDN (no local install)
- Custom CSS in `<style>` blocks within each HTML file
- Key custom classes: `.receipt-paper`, `.receipt-edge` (scalloped border), `.receipt-font` (JetBrains Mono)
- Fonts: Inter (Latin), Pretendard (CJK), JetBrains Mono (receipt text)
- Each service has its own color theme: warm white (receipt), dark (#111113, lifespan), navy (#0a192f, wealth)

### SEO

- Static OG images per service (generated via `tools/generate-og-images.html`)
- JSON-LD structured data with `inLanguage: ["en", "ko", "ja", "zh", "es"]`
- `sitemap.xml` with hreflang alternates for all pages
- `robots.txt` disallows redirect stub directories

### Cross-Service Data Sharing

Services share data via `localStorage`:
- `loadDataFromLifeReceipt()` / `saveDataForLifeReceipt()` in lifespan.js
- `loadDataFromOtherServices()` / `saveWealthData()` in wealth.js
- Common fields (birthdate, country, gender) auto-fill across services

### Planning Documents

`life-receipt-plan.md`, `lifespan-calculator-plan-v2.md`, `wealth-percentile-plan.md` contain original specifications, calculation formulas, and data sources. Consult these when modifying calculation logic.
