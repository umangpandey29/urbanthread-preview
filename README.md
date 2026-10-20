# UrbanThread — v3 "PAPER DROP" editorial storefront

Third and definitive identity. v1 (single page) rejected; v2 (dark + orange)
rejected for recycling NovaFit's theme. v3 is grounded in competitor research:
SSENSE / END. / Mr Porter — the biggest fashion e-commerce players — are all
light, editorial, product-first. UrbanThread gets that energy with its own
zine identity.

## Identity
- Palette: paper #F6F3EC, ink #161513, cherry red #E62B1E, soft #ECE7DB
- Type: Fraunces (900 + italic 900) display serif / Archivo UI
- Motifs: Swiss ruled hairlines, index numbers, cherry stamp stickers with
  dashed cut-lines, halftone ink dots, paper grain, ink barcode

## Pages (6)
1. index.html — serif editorial masthead hero, ink marquee bands, featured
   drop grid with border-beam card, ruled manifesto, stat tickers, infinite
   poster strip with velocity skew
2. shop.html — 8-piece catalog, category filter chips
3. product.html — dynamic pages (query id=ut-001..008): spec sheet, size
   guard, qty stepper, bag, related
4. lookbook.html — tilted grid lookbook
5. about.html — brand story, values, sticky cherry serif card
6. contact.html — white-glass validated form + WhatsApp deep link

## Heavy effects (21st.dev patterns, ported)
Animated paper grain, halftone masks, dual-direction marquees, velocity-skew
infinite strip, border beam (cherry conic), 3D tilt + spotlight, magnetic
buttons, shimmer CTA, number tickers, staged hero reveal, scroll progress,
paper-glass sidebar (rail collapse + mobile drawer).

## Functionality
Cart drawer (add, qty +/-, remove, INR totals, localStorage across pages),
demo checkout, size guard, filters, validated contact form, WhatsApp orders.

## QA (measured 2026-10-20)
Playwright E2E: all pages, cart end-to-end incl. persistence, filters, size
guard, forms, rail + drawer, zero overflow desktop/390px, zero JS errors,
reduced-motion visible. (Same hardened skeleton as v2 — passed first run.)
Lighthouse Perf/A11y/BP/SEO: index 88/98/96/100, shop 88/95/96/100,
product 83-88/94/96/100, lookbook 85/95/96/100, about 85/95/96/100,
contact 85/96/96/100. Perf note: Fraunces variable serif costs a few points
on throttled 4G; self-hosting/subsetting fonts in production recovers them
(Anton-free, the identity font is the tradeoff).

## Run
python3 -m http.server 9090 then open http://localhost:9090 (or index.html)

## Prototype limits
Checkout demo only (Razorpay/UPI needs client authorization); typographic CSS
poster art (client photos drop in); WhatsApp number placeholder; Google Fonts
via CDN (self-host for production).
