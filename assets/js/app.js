/* First Furniture — catalogue, search, language and item window.
   All pieces live in data/items.json; nothing here needs editing to add items. */
(() => {
  "use strict";

  const CONFIG = {
    whatsapp: "201222129569",            // number used by the WhatsApp button on each piece
    waMessage: "ممكن أعرف تفاصيل عن دي لو سمحت؟",
    film: "media/film/film.m3u8",       // full film, streamed in small pieces from the site itself
    hlsLib: { src: "https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.20/hls.min.js",
              integrity: "sha384-V5ruNBgmYcC3SJRUQeNykAAAgde5gOFq/Hu0CZj7bygDP0yRIhkvX8+w0u/7mRvr" },
    heroImages: ["salons/royal-burgundy-salon-1", "cabinets-desks/louis-xv-marquetry-commode", "bedrooms/ivory-gold-royal-bedroom-1", "salons/turquoise-swan-salon"],
    roomCovers: {                         // cover photo for each category window
      "salons": "salons/emerald-velvet-salon",
      "sofas-chairs": "sofas-chairs/rococo-carved-settee-burgundy-1",
      "bedrooms": "bedrooms/ivory-gold-royal-bedroom-1",
      "dining": "dining/ivory-gold-dining-room",
      "tables-consoles": "tables-consoles/ivory-gold-onyx-console",
      "cabinets-desks": "cabinets-desks/gilded-turquoise-vitrine",
      "antiques-decor": "antiques-decor/bracket-clock-on-stand",
      "modern": "modern/boat-sofa-1",
      "interiors": "interiors/grand-hall-painted-ceiling-1"
    }
  };

  const T = {
    en: {
      "skip": "Skip to the collection",
      "nav.collection": "Collection", "nav.film": "Film", "nav.about": "About", "nav.contact": "Contact",
      "hero.title": "Carved, gilded <br>and upholstered <br><em>by hand.</em>",
      "hero.lede": "Salons, bedrooms, dining rooms and antiques, classic and modern.",
      "hero.cta": "View the collection", "hero.film": "Watch the film",
      "film.eyebrow": "Film", "film.title": "Inside one of our projects",
      "film.watch": "Watch the full film", "film.length": "27 minutes",
      "rooms.title": "Browse by room",
      "collection.title": "The collection",
      "search.placeholder": "Search: salon, gilded, bedroom, velvet…",
      "search.empty": "No results. Try another word, or ask us on WhatsApp.",
      "search.reset": "Show everything",
      "all": "All",
      "count.results": "{n} results", "count.one": "1 result",
      "photos": "{n} photos", "video": "Video",
      "about.eyebrow": "Founder & designer", "about.name": "Mahmoud Metwally",
      "about.years": "years in furniture design and making",
      "about.bio": "From a single carved piece to a fully furnished home, every project is designed in 3D before it goes into production.",
      "craft.1.t": "Design", "craft.1.d": "3D design before production",
      "craft.2.t": "Joinery", "craft.2.d": "Solid-wood frames",
      "craft.3.t": "Carving", "craft.3.d": "Fully hand-carved",
      "craft.4.t": "Finishing & gilding", "craft.4.d": "Gold leaf, antique and lacquer finishes",
      "craft.5.t": "Upholstery", "craft.5.d": "Velvet, button tufting and trims",
      "contact.eyebrow": "Contact", "contact.title": "Ask about any piece",
      "contact.lede": "Tap WhatsApp on any piece and its details reach us directly.",
      "contact.eg": "Egypt", "contact.bh": "Bahrain", "contact.call": "Call", "contact.email": "Email", "contact.wa": "WhatsApp",
      "footer.top": "Back to top ↑",
      "viewer.ask": "Ask about this piece", "viewer.share": "Copy link", "viewer.copied": "Link copied",
      "viewer.prevItem": "← Previous", "viewer.nextItem": "Next →",
      "title": "First Furniture"
    },
    ar: {
      "skip": "انتقل إلى المجموعة",
      "nav.collection": "المجموعة", "nav.film": "الفيلم", "nav.about": "من نحن", "nav.contact": "تواصل معنا",
      "hero.title": "أثاث يُحفر <br>ويُذهَّب ويُنجَّد <br><em>باليد.</em>",
      "hero.lede": "صالونات، غرف نوم، سفرة، وأنتيكات. كلاسيك ومودرن.",
      "hero.cta": "تصفّح المجموعة", "hero.film": "شاهد الفيلم",
      "film.eyebrow": "الفيلم", "film.title": "جولة داخل أحد مشاريعنا",
      "film.watch": "شاهد الفيلم كاملاً", "film.length": "٢٧ دقيقة",
      "rooms.title": "تصفّح حسب القسم",
      "collection.title": "المجموعة",
      "search.placeholder": "ابحث: صالون، مدهب، غرفة نوم، قطيفة…",
      "search.empty": "لا توجد نتائج. جرّب كلمة أخرى أو اسألنا على واتساب.",
      "search.reset": "عرض الكل",
      "all": "الكل",
      "count.results": "{n} نتيجة", "count.one": "نتيجة واحدة",
      "photos": "{n} صور", "video": "فيديو",
      "about.eyebrow": "المؤسس والمصمم", "about.name": "محمود متولي",
      "about.years": "عاماً في تصميم وتصنيع الأثاث",
      "about.bio": "من القطعة الواحدة إلى فرش البيت بالكامل، كل مشروع يُصمَّم 3D قبل التنفيذ.",
      "craft.1.t": "التصميم", "craft.1.d": "تصميم 3D قبل التنفيذ",
      "craft.2.t": "النجارة", "craft.2.d": "هياكل من الخشب الطبيعي",
      "craft.3.t": "الأويما", "craft.3.d": "حفر يدوي بالكامل",
      "craft.4.t": "الدهان والتذهيب", "craft.4.d": "ورق ذهب، أنتيك، ولاكيه",
      "craft.5.t": "التنجيد", "craft.5.d": "قطيفة، كابتونيه، وشراشيب",
      "contact.eyebrow": "تواصل معنا", "contact.title": "اسألنا عن أي قطعة",
      "contact.lede": "اضغط واتساب في أي قطعة وتصلنا تفاصيلها مباشرة.",
      "contact.eg": "مصر", "contact.bh": "البحرين", "contact.call": "اتصال", "contact.email": "البريد الإلكتروني", "contact.wa": "واتساب",
      "footer.top": "↑ العودة للأعلى",
      "viewer.ask": "اسأل عن هذه القطعة", "viewer.share": "نسخ الرابط", "viewer.copied": "تم نسخ الرابط",
      "viewer.prevItem": "→ السابق", "viewer.nextItem": "التالي ←",
      "title": "First Furniture"
    }
  };

  const $ = (s, r = document) => r.querySelector(s);
  const state = { lang: "en", cat: "all", q: "", items: [], cats: [], list: [], open: null, photo: 0, thumbs: {}, pushed: false, popClosing: false };

  /* ---------- helpers ---------- */
  const t = (k, vars) => {
    let s = (T[state.lang] && T[state.lang][k]) ?? T.en[k] ?? k;
    if (vars) for (const v in vars) s = s.replace(`{${v}}`, vars[v]);
    return s;
  };
  const num = n => state.lang === "ar" ? n.toLocaleString("ar-EG") : String(n);
  const src = (name, w, ext = "webp") => `img/${name}-${w}.${ext}`;
  const srcset = (name, ext = "webp", ws = [480, 960, 1600]) => ws.map(w => `${src(name, w, ext)} ${w}w`).join(", ");
  // <picture>: AVIF (about half the size) where supported, WebP everywhere else.
  const pic = (name, sizes, attrs = "", ws) =>
    `<picture><source type="image/avif" srcset="${srcset(name, "avif", ws)}" sizes="${sizes}"><img src="${src(name, 480)}" srcset="${srcset(name, "webp", ws)}" sizes="${sizes}" ${attrs}></picture>`;
  const thumb = name => state.thumbs[name] ? `background-image:url(${state.thumbs[name]})` : "";
  let avifOK = null;   // learnt from the first image the browser picks
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Arabic-aware normaliser so "مذهب", "مُذهّب", "مدهب" all match, and English is case-insensitive.
  const norm = s => String(s || "").toLowerCase()
    .replace(/[ً-ٰٟـ]/g, "")      // tashkeel + tatweel
    .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
    .replace(/ذ/g, "د")                                // Egyptian spelling: مدهب = مذهب
    .replace(/[éèêë]/g, "e").replace(/[àâ]/g, "a").replace(/[ç]/g, "c")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ").trim();

  /* ---------- language ---------- */
  function pickInitialLang() {
    const p = new URLSearchParams(location.search).get("lang");
    if (p === "ar" || p === "en") return p;
    try { const s = localStorage.getItem("ff-lang"); if (s) return s; } catch (e) {}
    return (navigator.language || "").toLowerCase().startsWith("ar") ? "ar" : "en";
  }
  function applyLang(lang) {
    state.lang = lang;
    const root = document.documentElement;
    root.lang = lang; root.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = t("title");
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll("[data-i18n-alt]").forEach(el => { el.alt = t(el.dataset.i18nAlt); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    try { localStorage.setItem("ff-lang", lang); } catch (e) {}
    if (state.items.length) { renderRooms(); renderChips(); renderGrid(); if (state.open) fillViewer(); }
  }

  /* ---------- reveal on scroll ---------- */
  const io = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: .08 }) : null;
  const observe = (els) => els.forEach(el => io ? io.observe(el) : el.classList.add("is-in"));

  /* ---------- hero ---------- */
  function hero() {
    const box = $("#heroSlides");
    box.innerHTML = CONFIG.heroImages.map((n, i) =>
      pic(n, "(max-width: 860px) 100vw, 45vw", i === 0 ? 'alt="" class="is-on" fetchpriority="high"' : 'alt="" loading="lazy"')).join("");
    const imgs = [...box.querySelectorAll("img")];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || imgs.length < 2) return;
    let i = 0;
    setInterval(() => {
      if (document.hidden) return;
      imgs[i].classList.remove("is-on"); i = (i + 1) % imgs.length; imgs[i].classList.add("is-on");
    }, 6500);
  }

  /* ---------- theme ---------- */
  function theme() {
    const root = document.documentElement, mq = matchMedia("(prefers-color-scheme: dark)");
    const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : mq.matches;
    const paint = () => document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.content = isDark() ? "#13151C" : "#F5F0E6");
    $("#themeToggle").addEventListener("click", () => {
      root.dataset.theme = isDark() ? "light" : "dark";
      try { localStorage.setItem("ff-theme", root.dataset.theme); } catch (e) {}
      paint();
    });
    mq.addEventListener && mq.addEventListener("change", paint);
    paint();
  }

  /* ---------- film ---------- */
  let hls = null, hlsPromise = null;
  const loadHls = () => hlsPromise || (hlsPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = CONFIG.hlsLib.src; s.integrity = CONFIG.hlsLib.integrity; s.crossOrigin = "anonymous"; s.referrerPolicy = "no-referrer";
    s.onload = () => window.Hls && window.Hls.isSupported() ? resolve(window.Hls) : reject();
    s.onerror = reject; document.head.appendChild(s);
  }));
  function film() {
    const v = $("#filmLoop"), dlgF = $("#filmDlg"), frame = $("#filmFrame");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      // Full-resolution loop on large screens; 720p on phones/tablets or when the visitor has data-saver on.
      const small = matchMedia("(max-width: 1100px)").matches || (navigator.connection && navigator.connection.saveData);
      v.src = small ? "media/film-loop-720.mp4" : "media/film-loop-hd.mp4";
      const vo = "IntersectionObserver" in window ? new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { const p = v.play(); p && p.catch(() => {}); } else v.pause();
      }, { threshold: .15 }) : null;
      vo ? vo.observe(v) : v.play();
    }
    $("#filmOpen").addEventListener("click", () => {
      v.pause(); dlgF.showModal(); document.body.style.overflow = "hidden";
      // The browser's own player: proper progress bar, pause and fullscreen on every phone and computer.
      frame.innerHTML = `<video controls playsinline preload="metadata" controlslist="nodownload" poster="media/film-still.webp" title="First Furniture film"></video>`;
      const fv = frame.querySelector("video");
      fv.addEventListener("contextmenu", e => e.preventDefault());
      const go = () => { const p = fv.play(); p && p.catch(() => {}); };
      if (fv.canPlayType("application/vnd.apple.mpegurl")) { fv.src = CONFIG.film; go(); }   // iPhone, iPad, Safari, Android
      else loadHls().then(Hls => {                                                          // Chrome / Firefox / Edge on computers
        if (!dlgF.open) return;
        hls = new Hls({ maxBufferLength: 30 }); hls.loadSource(CONFIG.film); hls.attachMedia(fv);
        hls.on(Hls.Events.MANIFEST_PARSED, go);
      }).catch(() => { fv.src = CONFIG.film; });
    });
    $("#filmClose").addEventListener("click", () => dlgF.close());
    dlgF.addEventListener("click", e => { if (e.target === dlgF) dlgF.close(); });
    dlgF.addEventListener("close", () => { if (hls) { hls.destroy(); hls = null; } frame.innerHTML = ""; document.body.style.overflow = ""; if (!reduce) { const p = v.play(); p && p.catch(() => {}); } });
  }

  /* ---------- rooms ---------- */
  function renderRooms() {
    const box = $("#rooms");
    box.innerHTML = state.cats.map((c, i) => {
      const cover = CONFIG.roomCovers[c.id] || state.items.find(it => it.category === c.id)?.images[0];
      return `<button class="room reveal" style="--d:${(i % 4) * 90}ms" data-cat="${c.id}" type="button">
        <span class="room__win" style="${thumb(cover)}">${pic(cover, "(max-width: 860px) 45vw, 22vw", 'alt="" loading="lazy" decoding="async"', [480, 960])}</span>
        <span class="room__name">${esc(c[state.lang])}</span>
      </button>`;
    }).join("");
    observe(box.querySelectorAll(".reveal"));
  }

  /* ---------- chips ---------- */
  function renderChips() {
    const all = [{ id: "all", label: t("all") }, ...state.cats.map(c => ({ id: c.id, label: c[state.lang] }))];
    $("#chips").innerHTML = all.map(c =>
      `<button class="chip" role="tab" type="button" data-cat="${c.id}" aria-selected="${c.id === state.cat}">${esc(c.label)}</button>`).join("");
  }

  /* ---------- grid ---------- */
  function filtered() {
    const terms = norm(state.q).split(" ").filter(Boolean);
    return state.items.filter(it =>
      (state.cat === "all" || it.category === state.cat) &&
      terms.every(term => it._hay.includes(term)));
  }
  function renderGrid() {
    state.list = filtered();
    const grid = $("#grid");
    const catName = id => state.cats.find(c => c.id === id)?.[state.lang] || "";
    grid.innerHTML = state.list.map((it, i) => {
      const L = it[state.lang], img = it.images[0];
      return `<a class="card reveal" style="--d:${(i % 3) * 80}ms" href="#item/${it.id}" data-id="${it.id}">
        <span class="card__img" style="${thumb(img)}">
          ${pic(img, "(max-width: 560px) 92vw, (max-width: 1000px) 46vw, 30vw", `alt="${esc(L.name)}" loading="lazy" decoding="async"`)}
          ${it.video ? `<span class="card__multi">▶ ${t("video")}</span>` : it.images.length > 1 ? `<span class="card__multi">${t("photos", { n: num(it.images.length) })}</span>` : ""}
        </span>
        <span class="card__meta"><span>${esc(catName(it.category))}</span><span class="card__ref" dir="ltr">${it.ref}</span></span>
        <h3 class="card__name"><span>${esc(L.name)}</span></h3>
      </a>`;
    }).join("");
    grid.querySelectorAll("img").forEach(img => {
      const done = () => { img.classList.add("is-loaded"); if (avifOK === null && img.currentSrc) avifOK = img.currentSrc.endsWith(".avif"); };
      img.complete ? done() : img.addEventListener("load", done, { once: true });
    });
    observe(grid.querySelectorAll(".reveal"));
    const n = state.list.length;
    $("#count").textContent = state.q.trim() ? (n === 1 ? t("count.one") : t("count.results", { n: num(n) })) : "";
    $("#empty").hidden = n > 0;
  }

  function setCat(cat, scroll) {
    state.cat = cat;
    document.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-selected", c.dataset.cat === cat));
    renderGrid();
    if (scroll) $("#collection").scrollIntoView({ behavior: "smooth" });
    // Centre the active chip inside the chip row only (never scroll the page sideways).
    const row = $("#chips"), chip = row.querySelector(`.chip[data-cat="${cat}"]`);
    if (chip && row.scrollWidth > row.clientWidth) {
      const c = chip.getBoundingClientRect(), r = row.getBoundingClientRect();
      row.scrollBy({ left: (c.left + c.width / 2) - (r.left + r.width / 2), behavior: "smooth" });
    }
  }

  /* ---------- item window ---------- */
  const dlg = $("#viewer");
  function openItem(id, push = true) {
    const it = state.items.find(x => x.id === id);
    if (!it) return;
    state.open = it; state.photo = 0;
    fillViewer();
    if (!dlg.open) dlg.showModal();
    $(".viewer__panel").scrollTop = 0; $(".viewer__info").scrollTop = 0;
    document.body.style.overflow = "hidden";
    if (push && location.hash !== `#item/${id}`) { history.pushState({ item: id }, "", `#item/${id}`); state.pushed = true; }
  }
  function closeItem(fromPop) {
    if (!dlg.open) return;
    dlg.close();
  }
  dlg.addEventListener("close", () => {
    const vv = $("#vVid"); vv.pause(); vv.removeAttribute("src"); vv.load();
    document.body.style.overflow = "";
    const id = state.open && state.open.id; state.open = null;
    // Leave the item's address: step back if we added it, otherwise just clean the URL.
    if (state.popClosing) state.popClosing = false;
    else if (location.hash.startsWith("#item/")) {
      if (state.pushed) history.back(); else history.replaceState(null, "", location.pathname + location.search);
    }
    state.pushed = false;
    const card = id && document.querySelector(`.card[data-id="${id}"]`);
    card && card.focus({ preventScroll: true });
  });

  function fillViewer() {
    const it = state.open, L = it[state.lang];
    $("#vCat").textContent = state.cats.find(c => c.id === it.category)?.[state.lang] || "";
    $("#vRef").textContent = it.ref;
    $("#vName").textContent = L.name;
    $("#vDesc").textContent = L.desc;
    $("#vDetails").innerHTML = (L.details || []).map(d => `<li>${esc(d)}</li>`).join("");
    const url = location.origin + location.pathname + "#item/" + it.id;
    const msg = `${CONFIG.waMessage}\n\n${it.ar.name} (${it.ref})\n${url}`;
    $("#vWa").href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
    $("#vShare").textContent = t("viewer.share");
    const multi = slides(it) > 1;
    $("#vPrev").hidden = $("#vNext").hidden = !multi;
    $("#vThumbs").hidden = !multi;
    $("#vThumbs").innerHTML = multi ? it.images.map((n, i) =>
      `<button type="button" data-i="${i}" aria-label="${i + 1}" aria-current="${i === state.photo}"><img src="${src(n, 480)}" alt=""></button>`).join("")
      + (it.video ? `<button type="button" class="is-video" data-i="${it.images.length}" aria-label="${t("video")}" aria-current="false"><img src="${src(it.images[0], 480)}" alt=""><span class="play" aria-hidden="true"></span></button>` : "") : "";
    showPhoto(state.photo, true);
    const idx = state.list.indexOf(it);
    $("#vBack").hidden = idx <= 0; $("#vFwd").hidden = idx < 0 || idx >= state.list.length - 1;
  }
  // An item's gallery: its photos, then its video (if it has one).
  const slides = it => it.images.length + (it.video ? 1 : 0);
  function showPhoto(i, instant) {
    const it = state.open, n = slides(it);
    state.photo = (i + n) % n;
    const vid = $("#vVid"), pic = $("#vImg").parentElement;
    if (it.video && state.photo === it.images.length) {
      pic.hidden = true; vid.hidden = false;
      if (vid.getAttribute("src") !== it.video) { vid.poster = src(it.images[0], 960); vid.src = it.video; }
      document.querySelectorAll("#vThumbs button").forEach(b => b.setAttribute("aria-current", +b.dataset.i === state.photo));
      return;
    }
    vid.pause(); vid.hidden = true; pic.hidden = false;
    const img = $("#vImg"), name = it.images[state.photo];
    const set = () => {
      const s = $("#vSrc"); s.srcset = srcset(name, "avif"); s.sizes = "(max-width: 860px) 100vw, 60vw";
      img.srcset = srcset(name); img.sizes = "(max-width: 860px) 100vw, 60vw"; img.src = src(name, 960);
      img.alt = it[state.lang].name;
    };
    if (instant) set();
    else { img.classList.add("is-fading"); setTimeout(() => { set(); img.onload = () => img.classList.remove("is-fading"); if (img.complete) img.classList.remove("is-fading"); }, 220); }
    document.querySelectorAll("#vThumbs button").forEach(b => b.setAttribute("aria-current", +b.dataset.i === state.photo));
    // preload the neighbour so swiping feels instant
    const nx = it.images[(state.photo + 1) % it.images.length];
    if (it.images.length > 1) { const p = new Image(); p.sizes = "(max-width: 860px) 100vw, 60vw"; p.srcset = srcset(nx, avifOK ? "avif" : "webp"); }
  }
  function stepItem(d) {
    const idx = state.list.indexOf(state.open), next = state.list[idx + d];
    if (next) { openItem(next.id, false); history.replaceState({ item: next.id }, "", `#item/${next.id}`); }
  }

  /* ---------- events ---------- */
  function bind() {
    $("#langToggle").addEventListener("click", () => applyLang(state.lang === "ar" ? "en" : "ar"));

    const masthead = $(".masthead");
    const onScroll = () => masthead.classList.toggle("is-stuck", scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true }); onScroll();

    $("#rooms").addEventListener("click", e => { const b = e.target.closest(".room"); if (b) setCat(b.dataset.cat, true); });
    $("#chips").addEventListener("click", e => { const b = e.target.closest(".chip"); if (b) setCat(b.dataset.cat, false); });

    let timer;
    const input = $("#search");
    input.addEventListener("input", () => {
      $("#searchClear").hidden = !input.value;
      clearTimeout(timer);
      timer = setTimeout(() => { state.q = input.value; renderGrid(); }, 120);
    });
    input.addEventListener("keydown", e => { if (e.key === "Enter") input.blur(); });
    const reset = () => { input.value = ""; state.q = ""; $("#searchClear").hidden = true; setCat("all"); };
    $("#searchClear").addEventListener("click", () => { reset(); input.focus(); });
    $("#resetSearch").addEventListener("click", reset);

    $("#grid").addEventListener("click", e => {
      const a = e.target.closest(".card"); if (!a) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault(); openItem(a.dataset.id);
    });

    $("#vClose").addEventListener("click", () => closeItem());
    dlg.addEventListener("click", e => { if (e.target === dlg) closeItem(); });
    $("#vPrev").addEventListener("click", () => showPhoto(state.photo - 1));
    $("#vNext").addEventListener("click", () => showPhoto(state.photo + 1));
    $("#vThumbs").addEventListener("click", e => { const b = e.target.closest("button"); if (b) showPhoto(+b.dataset.i); });
    $("#vBack").addEventListener("click", () => stepItem(-1));
    $("#vFwd").addEventListener("click", () => stepItem(1));
    $("#vShare").addEventListener("click", async () => {
      const url = location.origin + location.pathname + "#item/" + state.open.id;
      try {
        if (navigator.share && matchMedia("(pointer: coarse)").matches) await navigator.share({ title: state.open[state.lang].name, url });
        else { await navigator.clipboard.writeText(url); $("#vShare").textContent = t("viewer.copied"); }
      } catch (e) {}
    });
    dlg.addEventListener("keydown", e => {
      const rtl = state.lang === "ar";
      if (e.key === "ArrowRight") showPhoto(state.photo + (rtl ? -1 : 1));
      if (e.key === "ArrowLeft") showPhoto(state.photo + (rtl ? 1 : -1));
    });
    // swipe between photos
    let x0 = null;
    const stage = $("#vStage");
    stage.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", e => {
      if (x0 === null || state.open.images.length < 2) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) showPhoto(state.photo + ((dx < 0) !== (state.lang === "ar") ? 1 : -1));
    });

    addEventListener("popstate", route);
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute("href").startsWith("#item/")) return;
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
  }

  function route() {
    const m = location.hash.match(/^#item\/([\w-]+)/);
    if (m) openItem(m[1], false);
    else if (dlg.open) { state.popClosing = true; dlg.close(); }
  }

  /* ---------- boot ---------- */
  async function boot() {
    document.documentElement.classList.remove("no-js");
    $("#year").textContent = new Date().getFullYear();
    applyLang(pickInitialLang());
    hero();
    theme();
    film();
    observe(document.querySelectorAll(".reveal"));
    bind();
    // Opening or refreshing always starts at the top, unless the link points at a piece.
    if (!/^#item\//.test(location.hash)) {
      if (location.hash) history.replaceState(null, "", location.pathname + location.search);
      scrollTo(0, 0);
    }
    const [data, thumbs] = await Promise.all([
      fetch("data/items.json", { cache: "no-cache" }).then(r => r.json()),
      fetch("data/thumbs.json").then(r => r.json()).catch(() => ({}))
    ]);
    state.thumbs = thumbs;
    state.cats = data.categories;
    state.items = data.items.map(it => {
      const c = data.categories.find(c => c.id === it.category) || {};
      it._hay = norm([it.ref, it.en.name, it.ar.name, it.en.desc, it.ar.desc, (it.en.details || []).join(" "),
        (it.ar.details || []).join(" "), c.en, c.ar, it.tags].join(" "));
      return it;
    });
    renderRooms(); renderChips(); renderGrid();
    // Refreshed while a piece was open: reopen it, with its card in view behind.
    const m = location.hash.match(/^#item\/([\w-]+)/);
    if (m) { const card = document.querySelector(`.card[data-id="${m[1]}"]`); card && card.scrollIntoView({ block: "center" }); }
    route();
  }
  boot();
})();
