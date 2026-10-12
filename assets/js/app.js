/* First Furniture — catalogue, search, language and item window.
   All pieces live in data/items.json; nothing here needs editing to add items. */
(() => {
  "use strict";

  const CONFIG = {
    whatsapp: "201287070317",            // number used by the WhatsApp button on each piece
    waMessage: "ممكن أعرف تفاصيل عن دي لو سمحت؟",
    filmDriveId: "1udxtO2lQ3W8FAebyO_ALIiDN734TgOl6",   // full film on Google Drive (must stay shared as "Anyone with the link")
    heroImages: ["salons/royal-burgundy-salon-1", "cabinets-desks/louis-xv-marquetry-commode", "bedrooms/ivory-gold-royal-bedroom-1", "salons/turquoise-swan-salon"],
    roomCovers: {                         // cover photo for each category window
      "salons": "salons/emerald-velvet-salon",
      "sofas-chairs": "sofas-chairs/rococo-carved-settee-burgundy-1",
      "bedrooms": "bedrooms/ivory-gold-royal-bedroom-1",
      "dining": "dining/taupe-velvet-dining-set",
      "tables-consoles": "tables-consoles/ivory-gold-onyx-console",
      "cabinets-desks": "cabinets-desks/gilded-turquoise-vitrine",
      "antiques-decor": "antiques-decor/bracket-clock-on-stand",
      "modern": "modern/boat-sofa-1"
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
      "photos": "{n} photos",
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
      "title": "First Furniture | Classic Hand-Carved Furniture"
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
      "photos": "{n} صور",
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
      "title": "فرست فرنيتشر | أثاث كلاسيك حفر يدوي"
    }
  };

  const $ = (s, r = document) => r.querySelector(s);
  const state = { lang: "en", cat: "all", q: "", items: [], cats: [], list: [], open: null, photo: 0 };

  /* ---------- helpers ---------- */
  const t = (k, vars) => {
    let s = (T[state.lang] && T[state.lang][k]) ?? T.en[k] ?? k;
    if (vars) for (const v in vars) s = s.replace(`{${v}}`, vars[v]);
    return s;
  };
  const num = n => state.lang === "ar" ? n.toLocaleString("ar-EG") : String(n);
  const src = (name, w) => `img/${name}-${w}.webp`;
  const srcset = name => `${src(name, 480)} 480w, ${src(name, 960)} 960w, ${src(name, 1600)} 1600w`;
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
    CONFIG.heroImages.forEach((n, i) => {
      const img = new Image();
      img.srcset = srcset(n); img.sizes = "(max-width: 860px) 100vw, 55vw"; img.src = src(n, 960); img.alt = "";
      if (i === 0) { img.fetchPriority = "high"; img.className = "is-on"; } else img.loading = "lazy";
      box.appendChild(img);
    });
    const imgs = [...box.children];
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
      frame.innerHTML = `<iframe src="https://drive.google.com/file/d/${CONFIG.filmDriveId}/preview" allow="autoplay; fullscreen" allowfullscreen title="First Furniture film"></iframe><span class="filmdlg__shield" aria-hidden="true"></span>`;
      v.pause(); dlgF.showModal(); document.body.style.overflow = "hidden";
    });
    $("#filmClose").addEventListener("click", () => dlgF.close());
    dlgF.addEventListener("click", e => { if (e.target === dlgF) dlgF.close(); });
    dlgF.addEventListener("close", () => { frame.innerHTML = ""; document.body.style.overflow = ""; if (!reduce) { const p = v.play(); p && p.catch(() => {}); } });
  }

  /* ---------- rooms ---------- */
  function renderRooms() {
    const box = $("#rooms");
    box.innerHTML = state.cats.map((c, i) => {
      const cover = CONFIG.roomCovers[c.id] || state.items.find(it => it.category === c.id)?.images[0];
      return `<button class="room reveal" style="--d:${(i % 4) * 90}ms" data-cat="${c.id}" type="button">
        <span class="room__win"><img src="${src(cover, 480)}" srcset="${src(cover, 480)} 480w, ${src(cover, 960)} 960w" sizes="(max-width: 860px) 45vw, 22vw" alt="" loading="lazy"></span>
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
        <span class="card__img">
          <img src="${src(img, 480)}" srcset="${srcset(img)}" sizes="(max-width: 520px) 92vw, (max-width: 1000px) 46vw, 30vw" alt="${esc(L.name)}" loading="lazy" decoding="async">
          ${it.images.length > 1 ? `<span class="card__multi">${t("photos", { n: num(it.images.length) })}</span>` : ""}
        </span>
        <span class="card__meta"><span>${esc(catName(it.category))}</span><span class="card__ref" dir="ltr">${it.ref}</span></span>
        <h3 class="card__name"><span>${esc(L.name)}</span></h3>
      </a>`;
    }).join("");
    grid.querySelectorAll("img").forEach(img => {
      const done = () => img.classList.add("is-loaded");
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
    if (push && location.hash !== `#item/${id}`) history.pushState({ item: id }, "", `#item/${id}`);
  }
  function closeItem(fromPop) {
    if (!dlg.open) return;
    dlg.close();
  }
  dlg.addEventListener("close", () => {
    document.body.style.overflow = "";
    const id = state.open && state.open.id; state.open = null;
    if (location.hash.startsWith("#item/")) history.pushState(null, "", location.pathname + location.search + "#collection");
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
    const multi = it.images.length > 1;
    $("#vPrev").hidden = $("#vNext").hidden = !multi;
    $("#vThumbs").hidden = !multi;
    $("#vThumbs").innerHTML = multi ? it.images.map((n, i) =>
      `<button type="button" data-i="${i}" aria-label="${i + 1}" aria-current="${i === state.photo}"><img src="${src(n, 480)}" alt=""></button>`).join("") : "";
    showPhoto(state.photo, true);
    const idx = state.list.indexOf(it);
    $("#vBack").hidden = idx <= 0; $("#vFwd").hidden = idx < 0 || idx >= state.list.length - 1;
  }
  function showPhoto(i, instant) {
    const it = state.open, n = it.images.length;
    state.photo = (i + n) % n;
    const img = $("#vImg"), name = it.images[state.photo];
    const set = () => {
      img.srcset = srcset(name); img.sizes = "(max-width: 860px) 100vw, 60vw"; img.src = src(name, 1600);
      img.alt = it[state.lang].name;
    };
    if (instant) set();
    else { img.classList.add("is-fading"); setTimeout(() => { set(); img.onload = () => img.classList.remove("is-fading"); if (img.complete) img.classList.remove("is-fading"); }, 220); }
    document.querySelectorAll("#vThumbs button").forEach(b => b.setAttribute("aria-current", +b.dataset.i === state.photo));
    // preload the neighbour so swiping feels instant
    if (n > 1) { const p = new Image(); p.src = src(it.images[(state.photo + 1) % n], 1600); }
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
  }

  function route() {
    const m = location.hash.match(/^#item\/([\w-]+)/);
    if (m) openItem(m[1], false);
    else if (dlg.open) dlg.close();
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
    const res = await fetch("data/items.json", { cache: "no-cache" });
    const data = await res.json();
    state.cats = data.categories;
    state.items = data.items.map(it => {
      const c = data.categories.find(c => c.id === it.category) || {};
      it._hay = norm([it.ref, it.en.name, it.ar.name, it.en.desc, it.ar.desc, (it.en.details || []).join(" "),
        (it.ar.details || []).join(" "), c.en, c.ar, it.tags].join(" "));
      return it;
    });
    renderRooms(); renderChips(); renderGrid();
    route();
  }
  boot();
})();
