/* UrbanThread v2 — interactions
   Catalog · cart drawer (localStorage) · shop filters · product page ·
   tilt+spotlight · magnetic buttons · velocity skew · reveals · tickers ·
   sidebar rail/drawer · forms. Reduced motion respected. */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- CATALOG ---------- */
  var CATALOG = [
    { id: "ut-001", name: "OVERCAST TEE", art: ["OVER", "CAST"], cat: "tees", price: 1299, tone: "tone-bone", num: "001",
      blurb: "240 GSM heavyweight cotton tee. Boxy drop-shoulder cut, ribbed collar, screened neck label.",
      meta: [["Fabric", "240 GSM combed cotton"], ["Cut", "Boxy, drop shoulder"], ["Care", "Cold wash, hang dry"], ["Made in", "Delhi, IN"]] },
    { id: "ut-002", name: "SIGNAL TEE", art: ["SIG", "NAL"], cat: "tees", price: 1299, tone: "tone-signal", num: "002",
      blurb: "The tee that started it. Signal orange blaze on heavyweight bone. Same cut as the Overcast.",
      meta: [["Fabric", "240 GSM combed cotton"], ["Cut", "Boxy, drop shoulder"], ["Care", "Cold wash, hang dry"], ["Made in", "Delhi, IN"]] },
    { id: "ut-003", name: "HEAVYWEIGHT HOODIE", art: ["HEAVY", "WEIGHT"], cat: "fleece", price: 3499, tone: "tone-ink", num: "003",
      blurb: "450 GSM brushed fleece hoodie. Double-lined hood, kangaroo pocket, no drawcords for a clean line.",
      meta: [["Fabric", "450 GSM brushed fleece"], ["Hood", "Double lined"], ["Care", "Machine cold, inside out"], ["Made in", "Delhi, IN"]] },
    { id: "ut-004", name: "NIGHT SHIFT HOODIE", art: ["NIGHT", "SHIFT"], cat: "fleece", price: 3699, tone: "tone-smoke", num: "004",
      blurb: "Smoke-black fleece with signal-orange taping inside the hood. Built for 2 AM rides.",
      meta: [["Fabric", "450 GSM brushed fleece"], ["Detail", "Signal hood taping"], ["Care", "Machine cold, inside out"], ["Made in", "Delhi, IN"]] },
    { id: "ut-005", name: "CARGO PANT 002", art: ["CAR", "GO"], cat: "bottoms", price: 3999, tone: "tone-ink", num: "005",
      blurb: "Ripstop cargo with six pockets and a relaxed taper. Articulated knees, heavy-duty zips.",
      meta: [["Fabric", "Ripstop twill"], ["Pockets", "Six, zip secured"], ["Fit", "Relaxed taper"], ["Made in", "Delhi, IN"]] },
    { id: "ut-006", name: "GRID CAP", art: ["GRID"], cat: "accessories", price: 999, tone: "tone-bone", num: "006",
      blurb: "Six-panel dad cap, unstructured, bone canvas with tonal grid embroidery. Metal buckle strap.",
      meta: [["Material", "Washed canvas"], ["Fit", "Adjustable, metal buckle"], ["Embroidery", "Tonal grid"], ["Made in", "Delhi, IN"]] },
    { id: "ut-007", name: "STATIC CREWNECK", art: ["STA", "TIC"], cat: "fleece", price: 2499, tone: "tone-smoke", num: "007",
      blurb: "400 GSM crewneck with static-wave print across the chest. Ribbed cuffs, boxy fit.",
      meta: [["Fabric", "400 GSM loopback"], ["Print", "Static wave, puff ink"], ["Fit", "Boxy"], ["Made in", "Delhi, IN"]] },
    { id: "ut-008", name: "REBAR DENIM JACKET", art: ["RE", "BAR"], cat: "outerwear", price: 5999, tone: "tone-ink", num: "008",
      blurb: "14 oz raw denim jacket, signal-orange chainstitch at the seams. Breaks in like concrete cures.",
      meta: [["Fabric", "14 oz raw denim"], ["Stitching", "Signal chainstitch"], ["Fit", "Workwear regular"], ["Made in", "Delhi, IN"]] }
  ];
  var CATS = [["all", "All"], ["tees", "Tees"], ["fleece", "Fleece"], ["bottoms", "Bottoms"], ["outerwear", "Outerwear"], ["accessories", "Accessories"]];
  var RUPEE = "₹";
  window.UT_CATALOG = CATALOG;

  function fmt(n) { return RUPEE + n.toLocaleString("en-IN"); }

  function findProduct(id) {
    for (var i = 0; i < CATALOG.length; i++) if (CATALOG[i].id === id) return CATALOG[i];
    return null;
  }

  function posterHTML(p) {
    return '<div class="poster ' + p.tone + '" aria-hidden="true">' +
      '<div class="p-tone"></div>' +
      '<span class="p-num">' + p.num + '</span>' +
      '<div class="p-art"><span class="w1">' + p.art[0] + '</span><span class="w2">' + (p.art[1] || "&nbsp;") + '</span><span class="w3">HEAVYWEIGHT · DELHI</span></div>' +
      '<span class="p-sticker">' + fmt(p.price) + '</span>' +
      '<span class="p-bar"></span>' +
      '</div>';
  }
  window.UT_posterHTML = posterHTML;

  /* ---------- HERO LOAD ---------- */
  var hero = document.querySelector(".hero");
  if (hero) requestAnimationFrame(function () { hero.classList.add("loaded"); });

  /* ---------- SIDEBAR: rail + drawer ---------- */
  var railBtn = document.querySelector(".rail-toggle");
  if (railBtn) railBtn.addEventListener("click", function () {
    document.body.classList.toggle("rail");
  });

  var drawerBtn = document.querySelector(".drawer-toggle");
  var backdrop = document.querySelector(".drawer-backdrop");
  function closeDrawer() { document.body.classList.remove("drawer-open"); }
  if (drawerBtn) drawerBtn.addEventListener("click", function () { document.body.classList.add("drawer-open"); });
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });
  document.querySelectorAll(".sidebar-nav a").forEach(function (a) {
    a.addEventListener("click", function () { if (window.innerWidth <= 1020) closeDrawer(); });
  });

  /* ---------- SCROLL PROGRESS ---------- */
  var progress = document.querySelector(".scroll-progress");
  var pend = false;
  window.addEventListener("scroll", function () {
    if (pend || !progress) return;
    pend = true;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
      pend = false;
    });
  }, { passive: true });

  /* ---------- TILT + SPOTLIGHT ---------- */
  if (!reduced && matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".tilt").forEach(function (t) {
      var inner = t.querySelector(".tilt-inner");
      t.addEventListener("mousemove", function (e) {
        var r = t.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        if (inner) inner.style.transform = "rotateX(" + ((0.5 - y) * 10) + "deg) rotateY(" + ((x - 0.5) * 12) + "deg)";
        t.style.setProperty("--mx", x * 100 + "%");
        t.style.setProperty("--my", y * 100 + "%");
        var card = t.classList.contains("card") ? t : t.querySelector(".card");
        if (card) { card.style.setProperty("--mx", x * 100 + "%"); card.style.setProperty("--my", y * 100 + "%"); }
      });
      t.addEventListener("mouseleave", function () {
        if (inner) inner.style.transform = "rotateX(0deg) rotateY(0deg)";
      });
    });
    document.querySelectorAll(".card:not(.tilt .card)").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
      });
    });
  }

  /* ---------- MAGNETIC BUTTONS ---------- */
  if (!reduced && matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".btn").forEach(function (b) {
      b.addEventListener("mousemove", function (e) {
        var r = b.getBoundingClientRect();
        var dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        var dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        b.style.transform = "translate(" + dx * 7 + "px," + dy * 6 + "px)";
      });
      b.addEventListener("mouseleave", function () { b.style.transform = "translate(0,0)"; });
    });
  }

  /* ---------- VELOCITY SKEW on strips ---------- */
  if (!reduced) {
    var lastY = window.scrollY, curSkew = 0;
    window.addEventListener("scroll", function () {
      var v = window.scrollY - lastY;
      lastY = window.scrollY;
      var target = Math.max(-4, Math.min(4, v * 0.12));
      curSkew += (target - curSkew) * 0.3;
      document.querySelectorAll(".strip-track").forEach(function (s) {
        s.style.transform = "skewY(" + curSkew.toFixed(2) + "deg)";
      });
    }, { passive: true });
  }

  /* ---------- REVEALS ---------- */
  var targets = document.querySelectorAll(".card, .stat-card, .section-head, .mani-block, .look, .split, .glass-form, .chip-row, .chips, .info-card, .story-card, .values-grid .card, .pd-wrap, .related, .marquee-big");
  targets.forEach(function (el) { el.classList.add("js-reveal"); });
  document.querySelectorAll(".hero .kicker, .hero-sub, .hero-cta, .page-hero .kicker, .page-sub").forEach(function (el) { el.classList.add("js-reveal"); });

  if (reduced || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".js-reveal").forEach(function (el) { el.classList.add("visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    document.querySelectorAll(".js-reveal").forEach(function (el) { io.observe(el); });
  }

  function hookReveals(root) {
    if (!root) return;
    var els = root.querySelectorAll(".js-reveal:not(.visible)");
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var hio = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visible"); hio.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    els.forEach(function (el) { hio.observe(el); });
  }

  /* ---------- TICKERS ---------- */
  function tick(el) {
    var target = parseFloat(el.dataset.count), suf = el.dataset.suffix || "";
    if (reduced) { el.textContent = target + suf; return; }
    var t0 = null, dur = 1600;
    function run(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * e) + suf;
      if (p < 1) requestAnimationFrame(run);
    }
    requestAnimationFrame(run);
  }
  document.querySelectorAll("[data-count]").forEach(function (el) {
    if ("IntersectionObserver" in window) {
      var tio = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { tick(en.target); tio.unobserve(en.target); } });
      }, { threshold: 0.5 });
      tio.observe(el);
    } else tick(el);
  });

  /* ---------- CART (localStorage) ---------- */
  var KEY = "ut_cart_v2";
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }
  if (!Array.isArray(cart)) cart = [];

  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} renderCart(); }

  function addToCart(id, size, qty) {
    var key = id + "-" + size;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].key === key) { cart[i].qty += qty; save(); return true; }
    }
    var p = findProduct(id);
    if (!p) return false;
    cart.push({ key: key, id: id, size: size, qty: qty });
    save(); return true;
  }

  function cartCount() { return cart.reduce(function (s, i) { return s + i.qty; }, 0); }
  function cartTotal() { return cart.reduce(function (s, i) { var p = findProduct(i.id); return s + (p ? p.price * i.qty : 0); }, 0); }

  var cartBtns = document.querySelectorAll(".cart-toggle");
  function syncCartBtns() {
    cartBtns.forEach(function (b) {
      var c = b.querySelector(".cart-count");
      if (c) c.textContent = cartCount();
    });
  }

  function renderCart() {
    var list = document.getElementById("cartItems");
    var total = document.getElementById("cartTotal");
    if (total) total.textContent = fmt(cartTotal());
    syncCartBtns();
    if (!list) return;
    if (!cart.length) {
      list.innerHTML = '<p class="cart-empty">Your bag is empty.<br>The heavyweight stuff is in the shop.</p>';
      return;
    }
    list.innerHTML = cart.map(function (item) {
      var p = findProduct(item.id);
      return '<div class="cart-item">' +
        '<div class="cart-thumb ' + p.tone + '"></div>' +
        '<div><h4>' + p.name + '</h4><p class="ci-meta">Size ' + item.size + '</p>' +
        '<div class="ci-row"><span class="ci-qty"><button data-dec="' + item.key + '" aria-label="Decrease quantity">−</button>' + item.qty + '<button data-inc="' + item.key + '" aria-label="Increase quantity">+</button></span>' +
        '<button class="ci-remove" data-rm="' + item.key + '">Remove</button></div></div>' +
        '<div class="ci-price">' + fmt(p.price * item.qty) + '</div>' +
        '</div>';
    }).join("");
    list.querySelectorAll("[data-inc]").forEach(function (b) {
      b.addEventListener("click", function () { changeQty(b.dataset.inc, 1); });
    });
    list.querySelectorAll("[data-dec]").forEach(function (b) {
      b.addEventListener("click", function () { changeQty(b.dataset.dec, -1); });
    });
    list.querySelectorAll("[data-rm]").forEach(function (b) {
      b.addEventListener("click", function () {
        cart = cart.filter(function (i) { return i.key !== b.dataset.rm; });
        save();
      });
    });
  }

  function changeQty(key, d) {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].key === key) {
        cart[i].qty += d;
        if (cart[i].qty <= 0) cart.splice(i, 1);
        break;
      }
    }
    save();
  }

  function openCart() { document.body.classList.add("cart-open"); }
  function closeCart() { document.body.classList.remove("cart-open"); }

  cartBtns.forEach(function (b) { b.addEventListener("click", openCart); });
  var cartClose = document.querySelector(".cart-close");
  if (cartClose) cartClose.addEventListener("click", function () { closeCart(); });
  var cartBackdrop = document.querySelector(".cart-backdrop");
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeCart(); });

  window.UT_openCart = openCart;
  window.UT_addToCart = addToCart;
  window.UT_closeCart = closeCart;

  /* ---------- CARD RENDERER (shared) ---------- */
  function productCard(p, beam) {
    return '<div class="tilt js-reveal" data-cat="' + p.cat + '">' +
      '<div class="card' + (beam ? " beam" : "") + '"><div class="tilt-inner">' +
      '<a class="poster ' + p.tone + '" href="product.html?id=' + p.id + '" aria-label="View ' + p.name + '">' +
      '<div class="p-tone"></div><span class="p-num">' + p.num + '</span>' +
      '<div class="p-art"><span class="w1">' + p.art[0] + '</span><span class="w2">' + (p.art[1] || "&nbsp;") + '</span><span class="w3">HEAVYWEIGHT · DELHI</span></div>' +
      '<span class="p-sticker">' + fmt(p.price) + '</span><span class="p-bar"></span>' +
      '</a>' +
      '<div class="card-info"><div><h3>' + p.name + '</h3><p class="card-cat">' + p.cat + '</p></div><span class="price">' + fmt(p.price) + '</span></div>' +
      '</div></div></div>';
  }

  var featuredGrid = document.getElementById("featuredGrid");
  if (featuredGrid) {
    featuredGrid.innerHTML = CATALOG.slice(0, 4).map(function (p, i) { return productCard(p, i === 1); }).join("");
    if (!reduced && "IntersectionObserver" in window) {
      var fio = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visible"); fio.unobserve(en.target); } });
      }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
      featuredGrid.querySelectorAll(".js-reveal").forEach(function (el) { fio.observe(el); });
    } else {
      featuredGrid.querySelectorAll(".js-reveal").forEach(function (el) { el.classList.add("visible"); });
    }
  }

  /* ---------- SHOP PAGE ---------- */
  var shopGrid = document.getElementById("shopGrid");
  if (shopGrid) {
    var chipRow = document.getElementById("chips");
    if (chipRow) {
      chipRow.innerHTML = CATS.map(function (c, i) {
        return '<button class="chip' + (i === 0 ? " on" : "") + '" data-cat="' + c[0] + '">' + c[1] + "</button>";
      }).join("");
    }

    if (shopGrid.dataset.rendered !== "1") {
      shopGrid.innerHTML = CATALOG.map(function (p) { return productCard(p, false); }).join("");
      shopGrid.dataset.rendered = "1";
      hookReveals(shopGrid);
    }

    if (chipRow) {
      chipRow.addEventListener("click", function (e) {
        var chip = e.target.closest(".chip");
        if (!chip) return;
        chipRow.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("on"); });
        chip.classList.add("on");
        var cat = chip.dataset.cat;
        shopGrid.querySelectorAll("[data-cat]").forEach(function (c) {
          var show = cat === "all" || c.dataset.cat === cat;
          c.style.display = show ? "" : "none";
        });
      });
    }
  }

  /* ---------- INFINITE STRIP ---------- */
  var strip = document.getElementById("stripTrack");
  if (strip) {
    var items = CATALOG.concat(CATALOG);
    strip.innerHTML = items.map(function (p) {
      return '<div class="strip-item"><div class="poster ' + p.tone + '">' +
        '<div class="p-tone"></div><span class="p-num">' + p.num + '</span>' +
        '<div class="p-art"><span class="w1">' + p.art[0] + '</span><span class="w2">' + (p.art[1] || "&nbsp;") + '</span></div>' +
        '</div></div>';
    }).join("");
  }

  /* ---------- PRODUCT PAGE ---------- */
  var stage = document.getElementById("productStage");
  if (stage) {
    var id = new URLSearchParams(location.search).get("id") || "ut-001";
    var p = findProduct(id) || CATALOG[0];
    document.title = p.name + " — UrbanThread";
    stage.innerHTML =
      '<div class="pd-wrap">' +
      '<div class="pd-poster"><div class="poster ' + p.tone + '">' +
      '<div class="p-tone"></div><span class="p-num">' + p.num + '</span>' +
      '<div class="p-art"><span class="w1">' + p.art[0] + '</span><span class="w2">' + (p.art[1] || "&nbsp;") + '</span><span class="w3">HEAVYWEIGHT · DELHI</span></div>' +
      '<span class="p-sticker">' + fmt(p.price) + '</span><span class="p-bar"></span></div></div>' +
      '<div>' +
      '<p class="kicker">' + p.cat + ' · drop 002</p>' +
      '<h1 class="pd-name">' + p.name + '</h1>' +
      '<p class="pd-price">' + fmt(p.price) + '</p>' +
      '<p class="pd-blurb">' + p.blurb + '</p>' +
      '<ul class="pd-meta">' + p.meta.map(function (m) { return '<li><b>' + m[0] + "</b><span>" + m[1] + "</span></li>"; }).join("") + '</ul>' +
      '<p class="size-label">Pick a size</p>' +
      '<div class="sizes" id="sizes">' + ["S", "M", "L", "XL", "XXL"].map(function (s) { return '<button class="size-btn" data-size="' + s + '">' + s + "</button>"; }).join("") + '</div>' +
      '<p class="size-error" id="sizeError">Pick a size first — the fit matters.</p>' +
      '<div class="qty-row"><div class="qty"><button id="qtyDec" aria-label="Decrease quantity">−</button><span id="qtyVal">1</span><button id="qtyInc" aria-label="Increase quantity">+</button></div>' +
      '<button class="btn btn-primary btn-lg" id="pdAdd" style="flex:1;min-width:200px">Add to bag</button></div>' +
      '<p class="form-note" id="pdNote" role="status"></p>' +
      '</div></div>' +
      '<div class="related"><div class="section-head"><h2>More from the drop</h2><a class="more" href="shop.html">Full shop</a></div>' +
      '<div class="grid products-grid">' + CATALOG.filter(function (x) { return x.id !== p.id; }).slice(0, 4).map(function (x) {
        return productCardLite(x);
      }).join("") + '</div></div>';

    function productCardLite(x) {
      return '<div class="tilt js-reveal"><div class="card"><div class="tilt-inner">' +
        '<a class="poster ' + x.tone + '" href="product.html?id=' + x.id + '"><div class="p-tone"></div><span class="p-num">' + x.num + '</span>' +
        '<div class="p-art"><span class="w1">' + x.art[0] + '</span><span class="w2">' + (x.art[1] || "&nbsp;") + '</span></div>' +
        '<span class="p-sticker">' + fmt(x.price) + '</span></a>' +
        '<div class="card-info"><div><h3>' + x.name + '</h3><p class="card-cat">' + x.cat + '</p></div><span class="price">' + fmt(x.price) + '</span></div>' +
        '</div></div></div>';
    }

    hookReveals(stage);

    var size = null, qty = 1;
    stage.querySelectorAll("#sizes .size-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        stage.querySelectorAll("#sizes .size-btn").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        size = b.dataset.size;
        document.getElementById("sizeError").classList.remove("show");
      });
    });
    document.getElementById("qtyDec").addEventListener("click", function () { qty = Math.max(1, qty - 1); document.getElementById("qtyVal").textContent = qty; });
    document.getElementById("qtyInc").addEventListener("click", function () { qty = Math.min(9, qty + 1); document.getElementById("qtyVal").textContent = qty; });
    document.getElementById("pdAdd").addEventListener("click", function () {
      if (!size) { document.getElementById("sizeError").classList.add("show"); return; }
      addToCart(p.id, size, qty);
      var note = document.getElementById("pdNote");
      note.className = "form-note success";
      note.textContent = p.name + " (size " + size + ", qty " + qty + ") is in your bag.";
      openCart();
    });
  }

  renderCart();
  syncCartBtns();

  /* ---------- QUICK ADD (shop cards) ---------- */
  document.addEventListener("click", function (e) {
    var add = e.target.closest("[data-add]");
    if (!add) return;
    e.preventDefault();
    addToCart(add.dataset.add, add.dataset.size || "M", 1);
    openCart();
  });

  /* ---------- CHECKOUT (demo) ---------- */
  var checkout = document.getElementById("cartCheckout");
  if (checkout) {
    checkout.addEventListener("click", function () {
      var note = document.getElementById("cartNote");
      if (!cart.length) {
        note.className = "cart-note";
        note.textContent = "Bag is empty — add something heavyweight first.";
        return;
      }
      note.className = "cart-note";
      note.textContent = "Demo checkout: in the live build this hands off to Razorpay/UPI. Your bag (" + fmt(cartTotal()) + ") is safe.";
      setTimeout(function () { closeCart(); }, 1600);
    });
  }

  /* ---------- CONTACT FORM ---------- */
  var cform = document.getElementById("contactForm");
  if (cform) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    cform.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      function flag(el, bad) { el.parentElement.classList.toggle("invalid", bad); if (bad) ok = false; }
      var n = document.getElementById("cname"), m = document.getElementById("cemail"), msg = document.getElementById("cmsg"), ph = document.getElementById("cphone");
      flag(n, n.value.trim().length < 2);
      flag(m, !re.test(m.value.trim()));
      flag(msg, msg.value.trim().length < 10);
      flag(ph, ph.value.trim() !== "" && ph.value.replace(/\D/g, "").length < 10);
      var note = document.getElementById("cformNote");
      if (!ok) { note.className = "form-note error"; note.textContent = "A few fields need attention."; return; }
      note.className = "form-note success";
      note.textContent = "Sent. We reply from @urbanthread.in, usually same day, " + n.value.trim().split(" ")[0] + ".";
      cform.reset();
    });
    ["cname", "cemail", "cmsg", "cphone"].forEach(function (id) {
      var el = document.getElementById(id);
      el.addEventListener("input", function () { el.parentElement.classList.remove("invalid"); });
    });
  }
})();
