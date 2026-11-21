ROLE
You are a senior full-stack engineer and luxury-brand UI designer. Build a complete, production-quality, two-page website for "Sri Subham Return Gifts" (tagline: "Memories that last forever"), a boutique selling traditional and modern return gifts for weddings, engagements, birthdays, baby showers, festivals and other occasions. The result must feel like an established premium Indian gifting boutique: calm, refined, confident, spacious. Quiet luxury, not flashy.

SCOPE (strict)
Only two routes: Home "/" and Shop "/shop". No admin, login, registration, customer dashboard, cart, checkout, payment, or extra standalone pages. About and Contact are anchor sections on Home. Product details open in a modal/drawer on the Shop page, not a separate page. Add a simple 404 fallback that redirects to Home.

TECH STACK
- Frontend: React 18 + Vite, React Router DOM, plain CSS3 (CSS variables, no CSS framework), Framer Motion (used sparingly, see MOTION), Lucide React icons.
- Backend: Node.js + Express REST API, mysql2 (promise pool, parameterized queries only), dotenv, cors, helmet, express-rate-limit.
- Database: MySQL 8.
- Separate /client and /server folders. Reusable components, no duplicated logic, comments only where useful.

BRAND TOKENS (client/src/styles/tokens.css; use only these variables, no hard-coded colors elsewhere)
--black:#080707; --gold:#D4AF37; --champagne:#F3D58A; --burgundy:#78143B; --burgundy-deep:#4A1028; --ivory:#FFF8EE; --cream:#F1E4C8; --espresso:#352014;
Derived: --border-gold: rgba(212,175,55,.35); --border-soft: rgba(53,32,20,.12); --shadow-card: 0 8px 28px rgba(53,32,20,.08); --shadow-hover: 0 14px 36px rgba(53,32,20,.14); --text-muted: #6B5646 (verify AA contrast on ivory and cream).
Color rules: ~65% ivory/cream surfaces, ~20% black and deep burgundy (header on scroll, hero overlay, footer, one dark band), ~10% burgundy (primary buttons, promo accents), ~5% gold (hairlines, small icons, active states, text on dark only). Never set gold body text on ivory. Cream text/gold accents on black or burgundy; espresso text on ivory/cream. No gradients except a subtle dark hero overlay; no glassmorphism, neon, heavy shadows or ornamental clutter.

TYPOGRAPHY AND LAYOUT SYSTEM
- Headings: Cormorant Garamond (weights 500/600), tight-but-airy line height 1.1 to 1.2; Body/UI: Poppins (400/500), 15 to 16px desktop, 1.65 line height. Load via Google Fonts with display=swap and preconnect.
- Scale (clamp): h1 clamp(2.4rem,5vw,4.2rem); h2 clamp(1.9rem,3.5vw,3rem); h3 1.25 to 1.5rem; eyebrow labels 12px uppercase, letter-spacing .18em, gold or burgundy.
- Container max 1240px; page padding 64px desktop, 20px mobile; section spacing 96 to 120px desktop, 56 to 72px mobile; 8px spacing grid.
- Radius: 4 to 8px (sharp-ish, jewelry-box feel; avoid pill shapes except tiny chips). Borders: 1px hairlines in --border-gold or --border-soft. Optional thin gold divider ornament (simple CSS line with a small diamond) between selected sections only.
- Buttons: Primary = burgundy fill, ivory text, 12px 28px padding, 500 weight, sentence case, hover to burgundy-deep; Secondary = 1px gold border, transparent, text espresso (or ivory on dark), hover fills champagne tint; WhatsApp button = outlined or burgundy with WhatsApp icon (no off-brand bright green except the floating button, which may use a muted/tinted green or burgundy with WhatsApp icon).
- Product card: cream surface, 1px --border-soft, 4:5 image ratio (object-fit cover, fixed aspect-ratio to avoid layout shift), name in Cormorant 1.25rem, category label small caps, price or "Price on Request" in Poppins 500, two clear buttons (View details, Enquire on WhatsApp). Consistent heights via CSS grid.
- Imagery: generous, consistent crop and color treatment; subtle dark overlay on hero only. Use real product photos supplied in client/src/assets or /public/images. If photos are missing, use tasteful neutral placeholders (cream block with the category name and a small gold icon) clearly flagged as placeholders, NEVER unrelated stock photography.
- Accessibility: WCAG AA contrast, visible focus rings (2px gold/burgundy offset), semantic landmarks, one h1 per page, alt text, keyboard-operable menu, filters and modal (focus trap, Esc to close, restore focus), skip-to-content link.

MOTION (deliberately minimal; the design should feel still and confident)
Allowed, and ONLY these:
1. Section reveal: opacity 0→1 and translateY 12px→0, 450ms, ease-out, once per element on scroll into view (Framer Motion whileInView, viewport once:true, margin -80px). Apply to section headings and the grid container as a whole, NOT to every card, NO staggering chains.
2. Hero: single gentle fade-in of the text block (600ms) on load. No parallax, no zoom, no typing effect, no looping motion.
3. Hover: product/category image scale 1.00→1.03 over 300ms inside overflow-hidden wrapper; buttons background/color transition 200ms; nav links gold underline grows from left over 200ms.
4. UI transitions: header transparent→solid on scroll (200ms), mobile menu slide/fade (200ms), product modal fade + 8px rise (200ms) with backdrop fade.
Forbidden: parallax, scroll-jacking, continuous floating/pulsing (except none), bounce/spring overshoot, marquee, cursor effects, page-transition wipes, animated counters, confetti.
Centralize in client/src/utils/motion.js (variants and durations). Respect prefers-reduced-motion by disabling all transforms and keeping at most an opacity fade (use useReducedMotion and a CSS @media block). Animate only transform and opacity.

HOME PAGE (/): sections in this exact order
1. Announcement bar: "Make Every Celebration Memorable | Discover Our Exclusive Gift Collections" (black or deep burgundy, champagne text, small, dismiss optional).
2. Sticky header: logo (client/src/assets/logo.png; use alt "Sri Subham Return Gifts"), links Home, Shop, About (#about), Contact (#contact), search icon (navigates to /shop and focuses the search input), WhatsApp enquiry icon. Transparent over hero, solid black or ivory with hairline after 40px scroll. Active-link indicator (gold underline) incl. scroll-spy for #about/#contact. Accessible hamburger menu on mobile.
3. Hero: heading "Gifts That Make Every Moment Memorable"; text "Thoughtfully curated return gifts that bring joy, elegance, and lasting memories to every celebration."; CTAs "Explore Collections" (primary, links /shop) and "Enquire on WhatsApp" (secondary). Full-bleed premium image of gift boxes, burgundy ribbons, gold details and traditional gifts, dark overlay (rgba(8,7,7,.55)) for contrast, height ~min(88vh, 780px), left-aligned text, eyebrow "Sri Subham Return Gifts". Hero image preloaded; no layout shift.
4. Brand introduction (#about): editorial two-column (image + text), eyebrow, heading "Every Gift Tells a Beautiful Story", paragraph "At Sri Subham Return Gifts, we believe every celebration deserves something special. Discover thoughtfully selected gifts that turn precious occasions into unforgettable memories." Thin gold frame offset behind the image (static CSS, no motion).
5. Shop by Category: all 15 categories from the API in a clean responsive grid (4 col desktop, 3 tablet, 2 mobile). Card: image, name, one-line description, "Explore collection" link to /shop?category=<slug>. Restrained hover (image scale only).
6. Featured Collections: Wedding Return Gifts, Traditional Collections, Silver Collection, Utility Gifts, Premium Gift Sets, Festive Collections. These are curated front-end links defined in client/src/data/collections.js, each mapping to one or more category slugs or an occasion slug (e.g., /shop?category=silver-set,silver-plate). Large image cards with name overlay on a dark gradient strip; asymmetrical editorial grid (one large + smaller tiles) instead of identical boxes. Document the mapping in the file so the owner can edit it.
7. Customer Favourites: featured products from GET /api/products/featured (limit 8), standard product cards, loading skeletons (static shimmer-free grey blocks), empty state if none, "View all products" link.
8. Why Choose Sri Subham?: four feature blocks (Thoughtfully Selected Gifts, Elegant Gift Collections, Gifts for Every Occasion, Memorable Celebrations), each with a thin-line Lucide icon in gold, a heading and one-line description written without false claims (no years in business, awards, certifications or quantities). Black or deep-burgundy band for contrast.
9. Shop by Occasion: Weddings, Engagements, Baby Showers, Birthdays, Housewarming, Seemantham, Festivals, Corporate Events from GET /api/occasions; image tiles linking to /shop?occasion=<slug>.
10. Brand CTA: heading "Make Your Special Moments Even More Special"; text "Discover beautiful gifts for every celebration with Sri Subham."; button "Explore Our Collection" (/shop). Also a bulk-gifting enquiry button opening WhatsApp with a bulk message.
11. Contact anchor (#contact) + Footer: logo, tagline, nav links, the 15 category links, contact details, WhatsApp and Instagram. Contact details, address, email, phone and social URLs come ONLY from env/config (VITE_WHATSAPP_NUMBER, VITE_INSTAGRAM_URL, VITE_CONTACT_EMAIL, VITE_ADDRESS); render an item only if its value exists and never invent any. Copyright "© {year} Sri Subham Return Gifts. All rights reserved."

SHOP PAGE (/shop)
1. Compact hero banner (black or burgundy-deep, ~220px): heading "Explore Our Gift Collections"; text "Discover thoughtfully selected return gifts for every celebration and special occasion."
2. Category navigation: horizontal scrollable chip bar on mobile/tablet (snap, edge fade, active chip highlighted with gold underline or burgundy fill), sticky category sidebar on desktop (>=1024px) listing all 15 categories plus "All". Selecting a category filters in place, without a page reload, and updates the URL query (?category=slug) so links are shareable and Back works. Support multiple comma-separated slugs from collection links.
3. Toolbar: search by product name (debounced 300ms), occasion select, price range (min/max, shown only if at least one product has a price), sort select (Featured, Newest, Price low→high, Price high→low), result count, "Clear filters" button. On mobile, filters collapse into a touch-friendly bottom sheet/drawer.
4. Product grid: 4 columns large desktop, 3 desktop, 2 mobile; pagination via "Load more" or numbered pages (use API page/limit, default 12). Skeleton loading, friendly empty state ("No gifts match your filters" + Clear filters), and error state with retry. Cards show image, name, category, size (if available), price or "Price on Request", View details, Enquire on WhatsApp. Items without price sort last when sorting by price.
5. Product modal/drawer (accessible dialog): large image with gallery navigation (arrows, thumbnails, swipe on touch) when multiple images exist, name, category, description, available designs, size, material, price or "Price on Request", availability, WhatsApp enquiry button. Hide any field that has no data rather than showing blanks. Open state reflected in URL as ?product=<slug> so it is linkable (optional but preferred); close with Esc, backdrop click, or close button.
6. WhatsApp enquiry on every card and in the modal.

WHATSAPP
- Config: VITE_WHATSAPP_NUMBER (international digits only, no "+"), documented in .env.example. Build links as https://wa.me/<number>?text=<encodeURIComponent(message)>. Centralize in client/src/utils/whatsapp.js with helpers: generalEnquiry(), productEnquiry(product), bulkEnquiry().
- Product message: "Hello Sri Subham Return Gifts, I am interested in [Product Name]. Please share the price, available designs, and bulk order details."
- General: "Hello Sri Subham Return Gifts, I would like to enquire about your return gift collections."; Bulk: "Hello Sri Subham Return Gifts, I would like to enquire about bulk return gift orders for an upcoming celebration."
- Floating WhatsApp button on both pages (bottom-right, 52px, no looping animation, appears after 300px scroll with a simple fade, safe-area padding on iPhone, never covering modal buttons). Open in a new tab with rel="noopener noreferrer". If the number is missing, hide enquiry buttons gracefully and log a dev warning.

15 CATEGORIES (exact names; generate URL-safe slugs)
1 Jar Set – Everyday Use · 2 Printed Pichwai Tin Box – 11 Inch · 3 German Silver Plate – Small Size (8 Inch) · 4 German Silver Plate – Big Size (10 Inch) · 5 Silver Set · 6 Stylish & Useful Hot Box · 7 Hot & Cold Flask Set · 8 Undiyal (Piggy Box) · 9 Cute Bottle Set · 10 Jewels Box · 11 Meenakari Plate · 12 Designing Heart Box · 13 All Functions Haldi Kumkum · 14 Silver Plate · 15 Normal & Designing Bags
Write a short, factual one-line description per category (no claims about material purity, origin or pricing). Category images must show the actual product type; use clearly labeled placeholders where real photos are not available.

DATABASE (server/database/schema.sql and seed.sql; utf8mb4, InnoDB, re-runnable with IF NOT EXISTS / safe upserts)
- categories(id PK AI, name UNIQUE, slug UNIQUE, description, image, created_at)
- products(id PK AI, category_id FK→categories ON DELETE RESTRICT, name, slug UNIQUE, description, price DECIMAL(10,2) NULL, size VARCHAR NULL, material VARCHAR NULL, designs TEXT NULL (comma- or line-separated list of available designs), image VARCHAR NULL, is_featured TINYINT(1) DEFAULT 0, availability ENUM('in_stock','made_to_order','out_of_stock') DEFAULT 'made_to_order', created_at). Indexes: category_id, is_featured, FULLTEXT or index on name, price.
- product_images(id PK AI, product_id FK ON DELETE CASCADE, image_url, display_order DEFAULT 0)
- occasions(id PK AI, name UNIQUE, slug UNIQUE, image)
- product_occasions(product_id FK, occasion_id FK, PRIMARY KEY(product_id, occasion_id), both ON DELETE CASCADE)
Seed: all 15 categories and 8 occasions. Seed 2 to 3 CLEARLY MARKED sample products per category (name prefixed "[Sample]" or flagged in a comment, price = NULL, no invented specs beyond what the category name states, a few marked is_featured) so the UI can be demonstrated; add a seed/README note explaining how to replace them with real products (SQL inserts or editing seed data). No admin UI.

BACKEND API (server/; MVC structure as listed below; all responses {success:boolean, data, meta?, error?})
Structure: server.js; config/db.js; controllers/{productController,categoryController,occasionController}.js; routes/{productRoutes,categoryRoutes,occasionRoutes}.js; middleware/errorHandler.js (+ notFound and a small validation helper); database/{schema.sql,seed.sql}.
Endpoints:
- GET /api/categories, GET /api/categories/:slug
- GET /api/products (query: search, category (one or comma-separated slugs), occasion (slug), minPrice, maxPrice, sort=featured|newest|price_asc|price_desc, page, limit), GET /api/products/featured, GET /api/products/category/:slug, GET /api/products/:id (accept numeric id; include category, gallery images ordered by display_order, occasions)
- GET /api/occasions
- GET /api/health
IMPORTANT: register /featured and /category/:slug BEFORE /:id.
Requirements: parameterized queries only (never string-concatenate user input; whitelist sort columns), validate and clamp query params (limit max 48, page >=1, numeric price ranges, slug regex), pagination meta {page, limit, total, totalPages}, consistent 400/404/500 JSON errors with no stack traces in production, helmet, CORS limited to CLIENT_URL, rate limiting (e.g., 100 req/min/IP), connection pool, graceful DB-error handling, `.env` for DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, PORT, CLIENT_URL; `.env.example` provided; credentials never exposed to the client. Image URLs returned as relative paths or absolute URLs as stored; serve /images statically from the server or client public folder (document the choice).
Frontend data layer: client/src/services/api.js with a small fetch wrapper (base URL from VITE_API_URL, error normalization, AbortController for search/filter requests), plus a custom hook (useFetch or useProducts) handling loading, error and retry. Cache categories and occasions in memory.

PROJECT STRUCTURE
client/src/: components/{Header,Footer,Hero,AnnouncementBar,CategoryCard,ProductCard,ProductModal,WhatsAppButton,SectionHeading,Skeleton,FilterBar,CategoryNav}.jsx · pages/{Home,Shop}.jsx · services/api.js · hooks/ · utils/{motion.js,whatsapp.js,format.js} · data/collections.js · styles/{tokens.css,base.css,components.css,pages.css,responsive.css} · assets/ · App.jsx · main.jsx
server/: as above.
Add ScrollToTop on route change, per-page <title> and meta description (react-helmet-async or a tiny custom hook), Open Graph tags in index.html, favicon from the logo, robots.txt, and a simple sitemap.xml for / and /shop.

RESPONSIVE AND PERFORMANCE
- Mobile-first; breakpoints around 480, 768, 1024, 1280; test iPhone and Android widths; no horizontal overflow; tap targets >=44px; two-column product grid on mobile; compact header.
- Images: WebP preferred, width/height or aspect-ratio set, loading="lazy" below the fold, fetchpriority="high" for the hero, srcset where practical.
- Code-split routes with React.lazy; no unused dependencies; no console errors; Lighthouse targets Performance >=90, Accessibility >=95, SEO >=95.
- Format prices with Intl.NumberFormat("en-IN", {style:"currency", currency:"INR", maximumFractionDigits:0}); show "Price on Request" when price is null or 0.

NON-NEGOTIABLES
No invented prices, contact details, social links, history, awards, testimonials or stock numbers. No unrelated stock imagery. No checkout, login, or admin. Escape/avoid dangerouslySetInnerHTML for any DB text. Keep animations within the MOTION rules above.

DELIVERABLES (complete code, no "rest of code here" omissions, each file in a code block labeled with its path)
1. Full client and server source in the structure above, plus package.json for each with scripts (client: dev, build, preview; server: dev with nodemon, start, db:setup to run schema + seed).
2. schema.sql, seed.sql, .env.example for both apps.
3. README.md: prerequisites, MySQL setup, running schema/seed, env variables, running both apps locally, how to add real products and images, how to change the WhatsApp number, and deployment notes (static client hosting + Node host, CORS/CLIENT_URL, HTTPS).
4. An asset checklist for the owner: logo, hero image, 15 category images, product photos (consistent background/lighting, minimum 1200px, 4:5), occasion images, WhatsApp number, Instagram URL, address and hours.
5. A final self-review confirming: all 15 categories present; filters, search, sort and pagination work; modal gallery works; WhatsApp links are correct; no invented data; animation limited to the allowed list; reduced-motion respected; responsive at 360, 768, 1024 and 1440px.

Build in this order: server (schema → seed → config/db → routes/controllers → middleware) → client tokens/base CSS → shared components → Home → Shop (filters, grid, modal) → WhatsApp utilities → SEO/meta → README and self-review.