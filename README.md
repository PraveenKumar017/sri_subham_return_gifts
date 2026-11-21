# Sri Subham Return Gifts — Demo Website

Two-page React + Vite demo website for **Sri Subham Return Gifts** with hardcoded catalog data (no database/backend).

## Routes
- `/` — Home (announcement, hero, about, categories, collections, featured products, why choose us, occasions, CTA, footer/contact)
- `/shop` — Shop (category chips/sidebar, search, occasion filter, price filter, sort, product grid, load more, product modal, WhatsApp enquiry)
- Unknown routes redirect to `/`

## Tech
- React 18 + Vite
- React Router DOM
- Plain CSS3 with CSS variables
- Framer Motion (minimal, respects `prefers-reduced-motion`)
- Lucide React icons

## Run locally
```bash
npm install
npm run dev
```
Build:
```bash
npm run build
npm run preview
```

## Edit demo data
- `src/data/catalog.js` — categories, occasions, products, WhatsApp number (`WHATSAPP_NUMBER`)
- `src/data/collections.js` — featured collection card mappings
- `src/utils/whatsapp.js` — WhatsApp message templates

## Replace placeholder assets
Current images in `public/images/` are SVG placeholders for demo use. Replace with real photos:
- `public/images/hero.svg` and `public/images/about.svg`
- `public/images/categories/*.svg` (15 category images)
- `public/images/products/*.svg` (product/gallery images)
- `public/images/occasions/*.svg` and `public/images/collections/*.svg`
- `public/favicon.svg` / logo as needed

Keep consistent 4:5 crops for catalog images where possible.

## Notes
- Prices are demo/sample values or `Price on Request`.
- WhatsApp number is a placeholder; set real number in `src/data/catalog.js` as international digits only.
- No cart, checkout, login, admin, or backend is included in this demo build.
