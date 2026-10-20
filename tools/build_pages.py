#!/usr/bin/env python3
"""UrbanThread v2 — 6-page generator. Bone + Ink + Signal."""

NAV = [
    ("index.html", "Home", "HM"),
    ("shop.html", "Shop", "SH"),
    ("lookbook.html", "Lookbook", "LK"),
    ("about.html", "About", "AB"),
    ("contact.html", "Contact", "CT"),
]

def nav(active):
    out = []
    for href, label, ico in NAV:
        a = ' class="active"' if active == href.split(".")[0] else ""
        out.append(f'        <a href="{href}"{a}><span class="nav-ico" aria-hidden="true">{ico}</span><span class="label">{label}</span></a>')
    return "\n".join(out)

def shell(fname, title, desc, active, body):
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,900;1,9..144,900&family=Archivo:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="scroll-progress" aria-hidden="true"></div>
<div class="drawer-backdrop" aria-hidden="true"></div>

<aside class="sidebar">
  <a href="index.html" class="sidebar-brand"><span class="wordmark">URBAN<span>THREAD</span></span></a>
  <button class="rail-toggle" aria-label="Collapse or expand sidebar">‹</button>
  <nav class="sidebar-nav" aria-label="Primary">
{nav(active)}
  </nav>
  <div class="sidebar-foot">
    <button class="cart-toggle" aria-label="Open bag"><span class="label">BAG</span><span class="cart-count">0</span></button>
    <div class="barcode" aria-hidden="true"></div>
    <p class="sidebar-tag">UT — DELHI — IN</p>
  </div>
</aside>

<div class="topbar">
  <a href="index.html" class="wordmark">URBAN<span style="color:var(--signal)">THREAD</span></a>
  <div class="topbar-tools">
    <button class="cart-toggle" aria-label="Open bag">BAG<span class="cart-count">0</span></button>
    <button class="drawer-toggle" aria-label="Open navigation menu"><span></span></button>
  </div>
</div>

<div class="main" id="main">
{body}
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-col">
      <span class="wordmark">URBAN<span style="color:var(--signal)">THREAD</span></span>
      <p>Heavyweight streetwear, built in Delhi.<br>Drop 002 live now.</p>
    </div>
    <div class="footer-col">
      <h4>Shop</h4>
      <a href="shop.html">All products</a>
      <a href="lookbook.html">Lookbook</a>
      <a href="about.html">The brand</a>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <a href="contact.html">Order &amp; custom print</a>
      <a href="https://wa.me/919876543210?text=Hi%20UrbanThread%2C%20I%20want%20to%20order" target="_blank" rel="noopener">WhatsApp orders</a>
      <a href="mailto:yo@urbanthread.in">yo@urbanthread.in</a>
    </div>
  </div>
  <p class="footer-legal"><span>© 2026 UrbanThread Apparel. Sample site by Code Liberate.</span><span>Bone + Ink + Signal — Drop 002</span></p>
</footer>
</div>

<div class="cart-backdrop" aria-hidden="true"></div>
<aside class="cart-drawer" aria-label="Shopping bag">
  <div class="cart-head"><h3>Your bag</h3><button class="cart-close" aria-label="Close bag">✕</button></div>
  <div class="cart-items" id="cartItems"></div>
  <div class="cart-foot">
    <div class="cart-total"><span>Total</span><b id="cartTotal">₹0</b></div>
    <button class="btn btn-primary btn-block" id="cartCheckout">Checkout — demo</button>
    <p class="cart-note" id="cartNote">Demo build: checkout hands off to Razorpay/UPI in the live store.</p>
  </div>
</aside>

<script src="js/main.js" defer></script>
</body>
</html>
"""
    with open(fname, "w") as f:
        f.write(html)
    print("wrote", fname)

MARQ = lambda txt, rev="": f'<div class="marquee {rev}" aria-hidden="true"><div class="marquee-track">' + (txt * 2) + '</div></div>'

MI = '<span class="marquee-item">BUILT HEAVY <span class="star">★</span> WORN LOUD <span class="star">★</span> 240 GSM <span class="star">★</span> DELHI, IN <span class="star">★</span> DROP 002 <span class="star">★</span></span>'

# ============ HOME ============
home = f"""<section class="hero">
  <div class="halftone" aria-hidden="true"></div>
  <div class="blob blob-signal" aria-hidden="true"></div>
  <div class="blob blob-deep" aria-hidden="true"></div>
  <div class="page hero-inner">
    <p class="kicker">Delhi heavyweight streetwear — drop 002</p>
    <h1 class="hero-title">
      <span class="line"><span class="line-inner it">Built heavy,</span></span>
      <span class="line"><span class="line-inner">worn <span class="it" style="color:var(--signal)">loud.</span></span></span>
    </h1>
    <p class="hero-sub">240 GSM tees. 450 GSM fleece. Zero fast fashion. Screen-printed in small batches in Delhi — when a drop sells out, it's gone.</p>
    <div class="hero-cta">
      <a href="shop.html" class="btn btn-primary btn-lg">Shop drop 002</a>
      <a href="lookbook.html" class="btn btn-ghost btn-lg">See the lookbook</a>
    </div>
  </div>
</section>
{MARQ(MI)}
<section class="section">
  <div class="page">
    <div class="section-head"><h2>Fresh off<br>the line</h2><a class="more" href="shop.html">Full shop →</a></div>
    <div class="grid products-grid" id="featuredGrid"></div>
  </div>
</section>
<section class="section section-alt">
  <div class="page">
    <div class="split">
      <div class="split-sticky">
        <h2>Heavy is a<br><span class="sig">standard,</span><br>not a vibe.</h2>
        <p>Every piece starts with a fabric spec and ends with a wear test. If it pills, sags or fades in 30 washes, it never ships.</p>
      </div>
      <div>
        <div class="mani-block"><span class="no">01</span><div><h3>240 GSM minimum</h3><p>Our lightest tee outweighs most "premium" tees. Fabric is sourced, weighed and washed before a single print goes on it.</p></div></div>
        <div class="mani-block"><span class="no">02</span><div><h3>Small batches, numbered</h3><p>Drops of 120 pieces max. Each piece carries its run number. Sold out means sold out — we reprint nothing.</p></div></div>
        <div class="mani-block"><span class="no">03</span><div><h3>Printed in Delhi</h3><p>Every print is pulled by hand at our Shahpur Jat studio. Puff ink, discharge, signal-orange blaze — done properly or not at all.</p></div></div>
        <div class="mani-block"><span class="no">04</span><div><h3>Wear-tested 30 washes</h3><p>Before a drop goes live, the sample piece gets machine-washed 30 times cold. If it survives, you get to buy it.</p></div></div>
      </div>
    </div>
  </div>
</section>
<section class="section">
  <div class="page">
    <div class="stats-band">
      <div class="card stat-card"><span class="stat-num" data-count="8">0</span><span class="stat-label">pieces in drop 002</span></div>
      <div class="card stat-card"><span class="stat-num" data-count="120" data-suffix=" max">0</span><span class="stat-label">units per run</span></div>
      <div class="card stat-card"><span class="stat-num" data-count="240" data-suffix=" GSM">0</span><span class="stat-label">lightest fabric we ship</span></div>
      <div class="card stat-card"><span class="stat-num" data-count="30" data-suffix=" washes">0</span><span class="stat-label">tested before release</span></div>
    </div>
  </div>
</section>
<div class="strip" aria-hidden="true"><div class="strip-track" id="stripTrack"></div></div>
{MARQ(MI, "marquee-rev")}
<section class="section">
  <div class="page">
    <div class="split">
      <div class="split-sticky">
        <h2>Order on<br><span class="sig">WhatsApp.</span></h2>
        <p>DM the drop list, get a fitting slot at the studio, pay on pickup or UPI. No app, no account, no algorithm between you and the clothes.</p>
        <div class="hero-cta"><a class="btn btn-primary btn-lg" href="https://wa.me/919876543210?text=Hi%20UrbanThread%2C%20I%20want%20drop%20002" target="_blank" rel="noopener">Message us</a><a class="btn btn-ghost btn-lg" href="contact.html">Custom print</a></div>
      </div>
      <div>
        <div class="mani-block"><span class="no">DM</span><div><h3>The drop list</h3><p>Sizes and colorways posted the night before each drop. First reply, first bag.</p></div></div>
        <div class="mani-block"><span class="no">FIT</span><div><h3>Studio fitting</h3><p>Shahpur Jat studio, evenings. Try the actual piece, feel the weight, pick your size right.</p></div></div>
        <div class="mani-block"><span class="no">PAY</span><div><h3>UPI or on pickup</h3><p>No prepaid gateway needed for drop orders. Paid custom prints get a 50% deposit invoice.</p></div></div>
      </div>
    </div>
  </div>
</section>
"""
shell("index.html", "UrbanThread — Heavyweight Streetwear, Delhi", "UrbanThread: heavyweight streetwear built in Delhi. 240 GSM tees, 450 GSM fleece, small numbered batches. Drop 002 live.", "index", home)

# ============ SHOP ============
shop = f"""<section class="page-hero">
  <div class="halftone" aria-hidden="true"></div>
  <div class="page" style="position:relative;z-index:2">
    <p class="kicker">Drop 002 — all pieces</p>
    <h1>THE SHOP.</h1>
    <p class="page-sub">Eight pieces. 120 units per run. Tap any piece for the full spec — fabric weight, fit, run number.</p>
  </div>
</section>
<section class="section">
  <div class="page">
    <div class="chips" id="chips"></div>
    <div class="grid products-grid" id="shopGrid"></div>
  </div>
</section>
{MARQ(MI)}
"""
shell("shop.html", "Shop — UrbanThread", "Shop UrbanThread drop 002 — heavyweight tees, fleece, bottoms, outerwear and accessories, built and printed in Delhi.", "shop", shop)

# ============ PRODUCT ============
product = f"""<section class="section" style="padding-top:5rem">
  <div class="page" id="productStage"><noscript><p>Enable JavaScript to view the catalog, or use the shop page.</p></noscript></div>
</section>
{MARQ(MI, "marquee-rev")}
"""
shell("product.html", "Product — UrbanThread", "UrbanThread product spec — fabric weight, fit, run number and sizing for each piece of drop 002.", "shop", product)

# ============ LOOKBOOK ============
lookbook = f"""<section class="page-hero">
  <div class="halftone" aria-hidden="true"></div>
  <div class="page" style="position:relative;z-index:2">
    <p class="kicker">Drop 002 — shot in the city</p>
    <h1>LOOKBOOK.</h1>
    <p class="page-sub">Six looks from the streets that made them — Hauz Khas, Shahpur Jat, midnight Ring Road.</p>
  </div>
</section>
<section class="section">
  <div class="page">
    <div class="look-grid">
      <div class="look"><div class="poster tone-ink"><div class="p-tone"></div><span class="p-num">01</span><div class="p-art"><span class="w1">MIDNIGHT</span><span class="w2">RUN</span><span class="w3">LOOK 01 · CARGO 002 + OVERCAST</span></div><span class="p-bar"></span></div><span class="look-tag">Look 01</span></div>
      <div class="look"><div class="poster tone-bone"><div class="p-tone"></div><span class="p-num">02</span><div class="p-art"><span class="w1">SIGNAL</span><span class="w2">BLAST</span><span class="w3">LOOK 02 · SIGNAL TEE + GRID CAP</span></div></div><span class="look-tag">Look 02</span></div>
      <div class="look"><div class="poster tone-smoke"><div class="p-tone"></div><span class="p-num">03</span><div class="p-art"><span class="w1">NIGHT</span><span class="w2">SHIFT</span><span class="w3">LOOK 03 · HOODIE 004</span></div><span class="p-bar"></span></div><span class="look-tag">Look 03</span></div>
      <div class="look"><div class="poster tone-signal"><div class="p-tone"></div><span class="p-num">04</span><div class="p-art"><span class="w1">HEAVY</span><span class="w2">WEIGHT</span><span class="w3">LOOK 04 · HOODIE 003 + TEE</span></div></div><span class="look-tag">Look 04</span></div>
      <div class="look"><div class="poster tone-ink"><div class="p-tone"></div><span class="p-num">05</span><div class="p-art"><span class="w1">REBAR</span><span class="w2">RAW</span><span class="w3">LOOK 05 · DENIM JACKET 008</span></div><span class="p-bar"></span></div><span class="look-tag">Look 05</span></div>
      <div class="look"><div class="poster tone-bone"><div class="p-tone"></div><span class="p-num">06</span><div class="p-art"><span class="w1">STATIC</span><span class="w2">CREW</span><span class="w3">LOOK 06 · CREWNECK 007</span></div></div><span class="look-tag">Look 06</span></div>
    </div>
    <p style="margin-top:2.6rem"><a href="shop.html" class="btn btn-primary btn-lg">Shop these looks</a></p>
  </div>
</section>
{MARQ(MI)}
"""
shell("lookbook.html", "Lookbook — UrbanThread", "UrbanThread drop 002 lookbook — six looks shot across Delhi streets. Heavyweight tees, fleece, cargos and raw denim.", "lookbook", lookbook)

# ============ ABOUT ============
about = f"""<section class="page-hero">
  <div class="halftone" aria-hidden="true"></div>
  <div class="page" style="position:relative;z-index:2">
    <p class="kicker">The brand</p>
    <h1>NO FAST<br>FASHION.</h1>
    <p class="page-sub">UrbanThread started in 2024 with one screen, one dryer and a stubborn rule: if it can't survive 30 washes, it doesn't ship.</p>
  </div>
</section>
<section class="section">
  <div class="page">
    <div class="story-grid">
      <div>
        <h3>From a Shahpur Jat courtyard</h3>
        <p>We're a two-person studio that got tired of 150 GSM "premium" tees that die in a month. So we built the opposite: heavyweight blanks sourced by GSM, printed by hand, numbered by run, and sold only in small drops.</p>
        <p>Drop 002 is live now — eight pieces, 120 units each. When they're gone, we start drop 003, and nothing from 002 gets reprinted. That's the whole scarcity story. No artificial hype, just math.</p>
        <p>Everything is made within 6 km of the studio. The fabric comes from Panipat mills, the printing happens in the courtyard, and the fitting happens on you.</p>
      </div>
      <div class="card story-card">
        <p class="big">BONE.<br>INK.<br><span class="sig">SIGNAL.</span></p>
        <p>The only three colors we ship. Bone for the daylight pieces, ink for the night, signal orange for the one line of blaze that makes it ours.</p>
      </div>
    </div>
  </div>
</section>
<section class="section section-alt">
  <div class="page">
    <div class="section-head"><h2>What we hold to</h2></div>
    <div class="grid values-grid">
      <div class="card value-card"><span class="no">01</span><h3>Weight is honest</h3><p>GSM is printed on every product page. If we say 240, the fabric scale agrees.</p></div>
      <div class="card value-card"><span class="no">02</span><h3>Numbered, never reprinted</h3><p>Every piece carries its run number. A sold-out drop stays sold out.</p></div>
      <div class="card value-card"><span class="no">03</span><h3>Made in Delhi, in the open</h3><p>Visit the studio, watch your piece get pulled off the screen. No hidden factory.</p></div>
    </div>
  </div>
</section>
<div class="strip" aria-hidden="true"><div class="strip-track" id="stripTrack"></div></div>
<section class="section">
  <div class="page">
    <div class="stats-band">
      <div class="card stat-card"><span class="stat-num" data-count="2">0</span><span class="stat-label">drops shipped</span></div>
      <div class="card stat-card"><span class="stat-num" data-count="14" data-suffix=" pieces">0</span><span class="stat-label">in the archive</span></div>
      <div class="card stat-card"><span class="stat-num" data-count="120" data-suffix="/run">0</span><span class="stat-label">hard batch cap</span></div>
      <div class="card stat-card"><span class="stat-num" data-count="6" data-suffix=" km">0</span><span class="stat-label">supply radius</span></div>
    </div>
  </div>
</section>
"""
shell("about.html", "About — UrbanThread", "UrbanThread is a two-person Delhi studio making heavyweight, numbered streetwear in small drops. No fast fashion, no reprints.", "about", about)

# ============ CONTACT ============
contact = f"""<section class="page-hero">
  <div class="halftone" aria-hidden="true"></div>
  <div class="page" style="position:relative;z-index:2">
    <p class="kicker">Orders · custom print · studio</p>
    <h1>TALK TO<br>THE STUDIO.</h1>
    <p class="page-sub">Drop orders, custom prints, collaborations or fitting slots — message us and a human replies, usually same day.</p>
  </div>
</section>
<section class="section">
  <div class="page">
    <div class="contact-grid">
      <form class="glass-form" id="contactForm" novalidate>
        <div class="field">
          <label for="cname">Your name</label>
          <input type="text" id="cname" name="name" autocomplete="name" required>
          <p class="field-error">Tell us who's asking.</p>
        </div>
        <div class="field">
          <label for="cemail">Email</label>
          <input type="email" id="cemail" name="email" autocomplete="email" required>
          <p class="field-error">Enter a valid email address.</p>
        </div>
        <div class="field">
          <label for="cphone">Phone (optional)</label>
          <input type="tel" id="cphone" name="phone" autocomplete="tel" inputmode="tel">
          <p class="field-error">Enter a valid phone number.</p>
        </div>
        <div class="field">
          <label for="cmsg">Message</label>
          <textarea id="cmsg" name="message" rows="5" required placeholder="What do you need — a drop order, custom print, collab?"></textarea>
          <p class="field-error">Give us at least a line to work with.</p>
        </div>
        <button type="submit" class="btn btn-primary btn-lg btn-block">Send message</button>
        <p class="form-note" id="cformNote" role="status"></p>
      </form>
      <div>
        <div class="card info-card"><h3>The studio</h3><p>UrbanThread, 2nd floor courtyard<br>Shahpur Jat, New Delhi 110017<br>Fittings by appointment, evenings</p></div>
        <div class="card info-card"><h3>Drop orders</h3><p><a href="https://wa.me/919876543210?text=Hi%20UrbanThread%2C%20I%20want%20drop%20002" target="_blank" rel="noopener">WhatsApp: +91 98765 43210</a><a href="mailto:yo@urbanthread.in">yo@urbanthread.in</a></p></div>
        <div class="card info-card"><h3>Custom print</h3><p>Crew orders, event merch, artist collabs. 25-piece minimum, 2-week turnaround, puff ink a specialty.</p></div>
        <div class="card info-card"><h3>Payments (live build)</h3><p>UPI and Razorpay checkout get wired in the production store. WhatsApp orders work today.</p></div>
      </div>
    </div>
  </div>
</section>
{MARQ(MI, "marquee-rev")}
"""
shell("contact.html", "Contact — UrbanThread", "Contact UrbanThread — drop orders on WhatsApp, custom prints, fitting slots and collaborations from the Shahpur Jat studio, New Delhi.", "contact", contact)

print("ALL PAGES BUILT")
