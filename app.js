/* Asociación de Recicladores MC E.S.P. — comportamiento del sitio */
(function () {
  "use strict";

  /* ---------- Números de contacto (cambiar solo aquí) ----------
     MAIN: número principal (contacto, pie, barra superior, botón flotante, PQRS, factura).
     PICKUP: número para solicitudes de recolección / ruta verde (secundario, el de Mary). */
  const CONTACT = {
    MAIN:   { e164: "573203023519", display: "320 302 3519" },   // PENDIENTE: reemplazar por el número de la señora que envió los documentos
    PICKUP: { e164: "573203023519", display: "320 302 3519" },   // Mary
  };
  const WA_NUMBER = CONTACT.MAIN.e164;
  const waLinkTo = (num, text) => `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  // Rellena todos los enlaces marcados con data-contact="main|pickup" y data-kind="tel|wa|text"
  document.querySelectorAll("[data-contact]").forEach((el) => {
    const c = CONTACT[el.dataset.contact === "pickup" ? "PICKUP" : "MAIN"];
    if (el.dataset.kind === "tel") { el.href = `tel:+${c.e164}`; if (!el.dataset.keep) el.textContent = el.dataset.prefix ? el.dataset.prefix + c.display : c.display; }
    else if (el.dataset.kind === "wa") { const u = new URL(el.href); el.href = `https://wa.me/${c.e164}` + (u.search || ""); }
    else el.textContent = c.display;
  });
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Datos editables ---------- */
  const MATERIALS = [
    { cat: "metal", icon: "i-metal", name: "Chatarra", desc: "Hierro, acero, estructuras y piezas metálicas." },
    { cat: "metal", icon: "i-metal", name: "Latas", desc: "Latas de conservas, sardinas y bebidas." },
    { cat: "metal", icon: "i-metal", name: "Aluminio", desc: "Perfiles, utensilios y envases." },
    { cat: "metal", icon: "i-metal", name: "Cobre y bronce", desc: "Cables, tubería y piezas." },
    { cat: "papel", icon: "i-paper", name: "Cartón", desc: "Cajas y corrugado, seco." },
    { cat: "papel", icon: "i-paper", name: "Papel", desc: "Archivo, periódico y revistas." },
    { cat: "plastico", icon: "i-plastic", name: "PET", desc: "Botellas de bebidas." },
    { cat: "plastico", icon: "i-plastic", name: "Plástico rígido", desc: "Envases, canastas y tapas." },
    { cat: "plastico", icon: "i-plastic", name: "Plástico flexible", desc: "Bolsas y empaques limpios." },
    { cat: "vidrio", icon: "i-glass", name: "Vidrio", desc: "Botellas y frascos." },
  ];

  // Documentos: con `file` se descarga; sin `file` se solicita por WhatsApp hasta tener la versión digital
  const DOCS = [
    { name: "Portafolio de servicios", org: "Asociación de Recicladores MC E.S.P.", file: "assets/docs/portafolio-recicladores-mc.pdf" },
    { name: "Certificado de existencia y representación legal", org: "Cámara de Comercio de Barrancabermeja", file: "assets/docs/camara-de-comercio.pdf" },
    { name: "Registro Único de Prestadores (RUPS)", org: "Superintendencia de Servicios Públicos Domiciliarios", file: "assets/docs/rups.pdf" },
    { name: "RUT vigente", org: "DIAN", file: "assets/docs/rut-2026.pdf" },
    { name: "Contrato de condiciones uniformes y concepto de legalidad", org: "Servicio público de aseo – aprovechamiento", file: "assets/docs/ccu-concepto-de-legalidad.pdf" },
    { name: "Certificado de permanencia", org: "Alcaldía de Barrancabermeja" },
    { name: "Certificado de Negocios Verdes", org: "Autoridad ambiental" },
    { name: "Concepto técnico de Bomberos", org: "Cuerpo de Bomberos de Barrancabermeja" },
    { name: "Afiliación a ARL y pensión de los recicladores", org: "Seguridad social de los asociados" },
    { name: "Certificados de competencia laboral", org: "SENA – recicladores de oficio" },
  ];

  // Eventos: fotos en assets/img/eventos/ (se agregan al recibirlas)
  const EVENTS = [
    { title: "Primer reciclatón comunitario de la comuna 3", place: "Barrio La Floresta", desc: "Jornada de separación en la fuente en la que los niños del barrio hicieron parte de la experiencia.", img: "assets/img/eventos/reciclaton-la-floresta.webp" },
    { title: "Socialización con la Secretaría de Medio Ambiente y Transición Energética", place: "Barrancabermeja", desc: "Trabajo con la comunidad en compañía de la Secretaría de Medio Ambiente y Transición Energética.", img: "assets/img/eventos/socializacion-secretaria.webp" },
    { title: "Socialización puerta a puerta", place: "Barrancabermeja", desc: "Sensibilización a hogares sobre separación en la fuente y entrega del material aprovechable.", img: "assets/img/eventos/puerta-a-puerta.webp" },
    { title: "Capacitaciones a colegios y empresas", place: "Barrancabermeja", desc: "Formación en manejo de residuos aprovechables para instituciones educativas y empresas.", img: "assets/img/eventos/capacitaciones.webp" },
    { title: "Adecuación de áreas comunes", place: "Barrancabermeja", desc: "Trabajo social con la comunidad en la adecuación de espacios comunes del barrio.", img: "assets/img/eventos/areas-comunes.webp" },
  ];

  // Aliados: con `logo` se muestra la imagen (assets/img/aliados/), sin logo se muestra el nombre
  const PARTNERS = [
    { name: "Secretaría de Medio Ambiente y Transición Energética", sub: "Alcaldía de Barrancabermeja" },
    { name: "Veolia", sub: "Operador del servicio de aseo" },
    { name: "Centro Comercial San Silvestre", sub: "Gran Reciclatón 2025" },
  ];

  const ROUTES = [
    { r: "MC-01", sector: "Comuna 1 · Centro", barrios: ["Centro", "Colombia", "Cardales", "Buenos Aires", "Palmira", "Isla del Zapato"], dias: ["Lunes", "Jueves"], franja: "7:00 – 11:00 a. m." },
    { r: "MC-02", sector: "Comuna 2 · Nororiente", barrios: ["Galán", "Primero de Mayo", "El Cerro", "Uribe Uribe", "Villarelys", "Torcoroma"], dias: ["Martes", "Viernes"], franja: "7:00 – 11:00 a. m." },
    { r: "MC-03", sector: "Comuna 3 · Sur", barrios: ["Antonio Nariño", "Rafael Rangel", "Recreo", "La Libertad", "Villa Olímpica", "Las Granjas"], dias: ["Lunes", "Jueves"], franja: "1:00 – 5:00 p. m." },
    { r: "MC-04", sector: "Comuna 4 · Suroriente", barrios: ["El Castillo", "La Península", "Las Colmenas", "Cincuentenario", "Los Nogales", "Villa Sandra"], dias: ["Miércoles", "Sábado"], franja: "7:00 – 11:00 a. m." },
    { r: "MC-05", sector: "Comuna 5 · Oriente", barrios: ["Bosques de la Cira", "La Esperanza", "Los Lirios", "Chico", "Kennedy", "Altos del Campestre"], dias: ["Martes", "Viernes"], franja: "1:00 – 5:00 p. m." },
    { r: "MC-06", sector: "Comuna 6 · Nororiente", barrios: ["Las Playas", "Los Pinos", "20 de Agosto", "Boston", "El Progreso", "Ciudadela Pipatón"], dias: ["Miércoles", "Sábado"], franja: "1:00 – 5:00 p. m." },
    { r: "MC-07", sector: "Comuna 7 · Norte", barrios: ["Villa Rosa", "Minas del Paraíso", "María Eugenia", "El Poblado", "Provivienda", "22 de Marzo"], dias: ["Lunes", "Jueves"], franja: "7:00 – 11:00 a. m." },
    { r: "MC-08", sector: "Zona comercial e industrial", barrios: ["San Silvestre", "Zona Industrial", "Pozo Siete", "Terminal", "Plaza de Mercado"], dias: ["Lunes", "Miércoles", "Viernes"], franja: "8:00 a. m. – 12:00 m." },
  ];

  const GALLERY = [
    { src: "assets/img/gal-1.svg", alt: "Recolección en ruta", cap: "Recolección en ruta" },
    { src: "assets/img/gal-2.svg", alt: "Clasificación en la ECA", cap: "Clasificación en la ECA" },
    { src: "assets/img/gal-3.svg", alt: "Jornada de sensibilización", cap: "Jornada de sensibilización" },
    { src: "assets/img/gal-4.svg", alt: "Material compactado", cap: "Material compactado" },
    { src: "assets/img/gal-5.svg", alt: "Gran Reciclatón 2025", cap: "Gran Reciclatón 2025" },
    { src: "assets/img/gal-6.svg", alt: "Equipo de asociados", cap: "Equipo de asociados" },
  ];

  /* ---------- Utilidades ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  const icon = (id, cls = "ico") => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;

  function validate(form) {
    let ok = true;
    $$("[required]", form).forEach((el) => {
      const bad = el.type === "checkbox" ? !el.checked : !el.value.trim() || (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
      el.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    return ok;
  }
  function setMsg(form, text, type) {
    const m = $(".form__msg", form);
    if (m) { m.textContent = text; m.className = "form__msg " + (type || ""); }
  }
  function openModal(html) { $("#modalBody").innerHTML = html; $("#modal").hidden = false; document.body.style.overflow = "hidden"; }
  function closeModal() { $("#modal").hidden = true; document.body.style.overflow = ""; }
  $(".modal__close").addEventListener("click", closeModal);
  $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });

  /* ---------- Navegación ---------- */
  const nav = $("#nav"), toggle = $(".nav__toggle"), backdrop = $(".nav__backdrop");
  function setNav(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    backdrop.hidden = !open;
    document.body.classList.toggle("nav-open", open);
  }
  toggle.addEventListener("click", () => setNav(!nav.classList.contains("is-open")));
  backdrop.addEventListener("click", () => setNav(false));
  $$(".nav__dd-btn").forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    const li = b.parentElement, open = !li.classList.contains("is-open");
    li.classList.toggle("is-open", open);
    b.setAttribute("aria-expanded", String(open));
  }));
  document.addEventListener("click", () => $$(".nav__item--dd.is-open").forEach((li) => { li.classList.remove("is-open"); $(".nav__dd-btn", li).setAttribute("aria-expanded", "false"); }));
  $$(".nav a").forEach((a) => a.addEventListener("click", () => {
    setNav(false);
    if (a.dataset.tab) activateTab(a.dataset.tab);
  }));
  window.addEventListener("resize", () => { if (window.innerWidth >= 1024) setNav(false); });

  // Enlace activo según la sección visible
  const navLinks = $$(".nav__list > li > a[href^='#']");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-35% 0px -60% 0px" });
  $$("main section[id]").forEach((s) => spy.observe(s));

  /* ---------- Pestañas Nosotros ---------- */
  const indicator = $(".tabbar__indicator");
  function moveIndicator() {
    const t = $(".tab.is-active"); if (!t || !indicator) return;
    indicator.style.left = t.offsetLeft + "px"; indicator.style.width = t.offsetWidth + "px";
  }
  function activateTab(id) {
    $$(".tab").forEach((t) => t.classList.toggle("is-active", t.dataset.tab === id));
    $$(".tab-panel").forEach((p) => {
      const on = p.id === "tab-" + id;
      p.classList.toggle("is-active", on);
      if (on) { $$(".reveal", p).forEach((el) => el.classList.add("is-visible")); document.dispatchEvent(new CustomEvent("tab:activated", { detail: p })); }
    });
    moveIndicator();
    const t = $(`.tab[data-tab="${id}"]`); if (t) t.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }
  $$(".tab").forEach((t) => t.addEventListener("click", () => activateTab(t.dataset.tab)));
  window.addEventListener("resize", moveIndicator);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveIndicator); else moveIndicator();
  moveIndicator();

  /* ---------- Materiales ---------- */
  const grid = $("#materialsGrid");
  function renderMaterials(filter) {
    grid.innerHTML = MATERIALS.filter((m) => filter === "todos" || m.cat === filter)
      .map((m) => `<article class="material" data-cat="${m.cat}">${icon(m.icon, "material__icon")}<h4>${esc(m.name)}</h4><p>${esc(m.desc)}</p></article>`).join("");
    document.dispatchEvent(new CustomEvent("materials:rendered"));
  }
  renderMaterials("todos");
  $$(".chip").forEach((c) => c.addEventListener("click", () => {
    $$(".chip").forEach((x) => x.classList.remove("is-active"));
    c.classList.add("is-active");
    renderMaterials(c.dataset.filter);
  }));

  /* ---------- Documentos ---------- */
  $("#docsList").innerHTML = DOCS.map((d) => d.file
    ? `<li><div><strong>${esc(d.name)}</strong><span>${esc(d.org)}</span></div><a href="${d.file}" target="_blank" rel="noopener">PDF ${icon("i-download", "ico ico--sm")}</a></li>`
    : `<li><div><strong>${esc(d.name)}</strong><span>${esc(d.org)}</span></div><a href="${waLink("Buen día. Solicito copia del documento: " + d.name)}" target="_blank" rel="noopener">Solicitar copia ${icon("i-whatsapp", "ico ico--sm")}</a></li>`).join("");

  /* ---------- Eventos ---------- */
  $("#events").innerHTML = EVENTS.map((ev) => `<article class="event">
      <div class="event__media">${ev.img ? `<img src="${ev.img}" alt="${esc(ev.title)}" loading="lazy" />` : ""}</div>
      <div class="event__body"><span class="event__place">${esc(ev.place)}</span><h3>${esc(ev.title)}</h3><p>${esc(ev.desc)}</p></div>
    </article>`).join("");
  $$(".event__media img").forEach((im) => im.addEventListener("error", () => { im.parentElement.classList.add("event__media--empty"); im.remove(); }));

  /* ---------- Aliados ---------- */
  $("#partners").innerHTML = PARTNERS.map((p) => `<li class="partner">${p.logo ? `<img src="${p.logo}" alt="${esc(p.name)}" loading="lazy" />` : `<span class="partner__name">${esc(p.name)}</span>`}<span class="partner__sub">${esc(p.sub || "")}</span></li>`).join("");

  /* ---------- Contador de visitas ---------- */
  (async () => {
    try {
      const mode = sessionStorage.getItem("mc_visit") ? "get" : "hit"; // una visita por sesión
      const r = await fetch(`https://abacus.jasoncameron.dev/${mode}/recicladores-mc-esp/visitas`, { cache: "no-store" });
      if (!r.ok) throw new Error("counter");
      const data = await r.json();
      sessionStorage.setItem("mc_visit", "1");
      $("#visits").hidden = false;
      const el = $("#visitsCount"), fmt = new Intl.NumberFormat("es-CO");
      if (window.gsap) { const o = { v: 0 }; gsap.to(o, { v: data.value, duration: 1.6, ease: "power2.out", onUpdate: () => { el.textContent = fmt.format(Math.round(o.v)); } }); }
      else el.textContent = fmt.format(data.value);
    } catch (_) { /* sin contador si el servicio no responde */ }
  })();

  /* ---------- Formularios → WhatsApp ---------- */
  $("#pickupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (!validate(f)) return setMsg(f, "Por favor complete los campos marcados.", "err");
    const d = Object.fromEntries(new FormData(f));
    const mats = $$("input[name=mat]:checked", f).map((c) => c.value).join(", ") || "No especificado";
    const text = `SOLICITUD – RUTA VERDE\n\nNombre: ${d.nombre}\nTeléfono: ${d.telefono}\nTipo de usuario: ${d.tipo}\nBarrio: ${d.barrio}\nDirección: ${d.direccion}\nMaterial: ${mats}\nObservaciones: ${d.obs || "-"}`;
    window.open(waLinkTo(CONTACT.PICKUP.e164, text), "_blank", "noopener");
    setMsg(f, "Se abrió WhatsApp con su solicitud. Gracias.", "ok");
    f.reset();
  });

  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (!validate(f)) return setMsg(f, "Por favor complete los campos marcados.", "err");
    const d = Object.fromEntries(new FormData(f));
    const text = `MENSAJE DESDE EL SITIO WEB\n\nNombre: ${d.nombre}\nTeléfono: ${d.telefono}\nCorreo: ${d.correo || "-"}\nAsunto: ${d.asunto}\n\n${d.mensaje}`;
    window.open(waLink(text), "_blank", "noopener");
    setMsg(f, "Se abrió WhatsApp con su mensaje. Le responderemos pronto.", "ok");
    f.reset();
  });

  $("#billForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (!validate(f)) return setMsg(f, "Ingrese el número de cuenta.", "err");
    window.open(waLink(`Buen día. Deseo consultar el estado de mi factura de aprovechamiento. Cuenta/contrato: ${f.cuenta.value.trim()}`), "_blank", "noopener");
    setMsg(f, "Consulta enviada por WhatsApp.", "ok");
  });

  /* ---------- PQRS ---------- */
  const STORE_KEY = "mc_pqrs";
  const loadPqrs = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch { return []; } };
  const savePqrs = (list) => { try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); } catch { /* sin almacenamiento */ } };
  const fmtDate = (iso) => new Date(iso).toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" });
  const newRadicado = () => `MC-${new Date().getFullYear()}-${Math.floor(Math.random() * 900000) + 100000}`;

  function showTrack(rad) {
    const p = loadPqrs().find((x) => x.radicado === rad.trim().toUpperCase());
    const box = $("#trackResult");
    if (!p) { box.innerHTML = `<div class="track__card">No encontramos el radicado <strong>${esc(rad)}</strong>. Verifique el número o escríbanos por WhatsApp.</div>`; return; }
    const limite = new Date(p.fecha); limite.setDate(limite.getDate() + 21);
    box.innerHTML = `<div class="track__card"><strong>${p.radicado}</strong><span class="track__status">${esc(p.estado)}</span><br>Tipo: ${esc(p.tipo)}<br>Radicado el ${fmtDate(p.fecha)}<br>Respuesta máxima: ${fmtDate(limite)}</div>`;
  }
  $("#pqrsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (!validate(f)) return setMsg(f, "Complete los campos obligatorios y acepte el tratamiento de datos.", "err");
    const d = Object.fromEntries(new FormData(f));
    const p = { radicado: newRadicado(), fecha: new Date().toISOString(), estado: "Radicada", ...d };
    savePqrs([p, ...loadPqrs()]);
    setMsg(f, "", "");
    f.reset();
    const text = `PQRS ${p.radicado}\nTipo: ${p.tipo}\nNombre: ${p.nombre}\nDocumento: ${p.documento}\nTeléfono: ${p.telefono}\nCorreo: ${p.correo || "-"}\nDirección: ${p.direccion || "-"}\n\n${p.descripcion}`;
    openModal(`<h3>PQRS radicada</h3><p>Conserve su número de radicado para consultar el estado:</p><div class="radicado">${p.radicado}</div><p class="note">Recibirá respuesta en un máximo de 15 días hábiles.</p><div class="modal__actions"><a class="btn btn--primary" target="_blank" rel="noopener" href="${waLink(text)}">Enviar copia por WhatsApp</a><button class="btn btn--outline" id="modalOk" type="button">Cerrar</button></div>`);
    $("#modalOk").addEventListener("click", closeModal);
  });
  $("#trackForm").addEventListener("submit", (e) => { e.preventDefault(); showTrack(e.target.radicado.value); });

  /* ---------- Rutas ---------- */
  const body = $("#routesBody"), search = $("#routeSearch"), daySel = $("#routeDay");
  function renderRoutes() {
    const q = norm(search.value.trim()), day = daySel.value;
    const rows = ROUTES.filter((r) => (!day || r.dias.includes(day)) && (!q || norm(r.barrios.join(" ") + " " + r.sector + " " + r.r).includes(q)));
    body.innerHTML = rows.map((r) => {
      const barrios = r.barrios.map((b) => q && norm(b).includes(q) ? `<mark>${esc(b)}</mark>` : esc(b)).join(", ");
      return `<tr><td><span class="route-tag">${r.r}</span></td><td data-label="Sector">${esc(r.sector)}</td><td data-label="Barrios">${barrios}</td><td data-label="Días">${r.dias.join(" y ")}</td><td data-label="Horario">${r.franja}</td></tr>`;
    }).join("");
    $("#routesEmpty").hidden = rows.length > 0;
  }
  search.addEventListener("input", renderRoutes);
  daySel.addEventListener("change", renderRoutes);
  renderRoutes();

  /* ---------- Galería ---------- */
  const gal = $("#gallery");
  gal.innerHTML = GALLERY.map((g, i) => `<button type="button" data-i="${i}" aria-label="Ampliar: ${esc(g.cap)}"><img src="${g.src}" alt="${esc(g.alt)}" loading="lazy" /><span>${esc(g.cap)}</span></button>`).join("");
  const lb = $("#lightbox"); let cur = 0;
  function showLb(i) {
    cur = (i + GALLERY.length) % GALLERY.length;
    const img = $("img", lb); img.src = GALLERY[cur].src; img.alt = GALLERY[cur].alt;
    $("figcaption", lb).textContent = GALLERY[cur].cap;
    lb.hidden = false; document.body.style.overflow = "hidden";
  }
  function hideLb() { lb.hidden = true; document.body.style.overflow = ""; }
  $$("button", gal).forEach((b) => b.addEventListener("click", () => showLb(+b.dataset.i)));
  $(".lightbox__close").addEventListener("click", hideLb);
  $(".lightbox__nav--prev").addEventListener("click", () => showLb(cur - 1));
  $(".lightbox__nav--next").addEventListener("click", () => showLb(cur + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) hideLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.hidden) { if (e.key === "Escape") hideLb(); if (e.key === "ArrowLeft") showLb(cur - 1); if (e.key === "ArrowRight") showLb(cur + 1); }
    if (!$("#modal").hidden && e.key === "Escape") closeModal();
    if (nav.classList.contains("is-open") && e.key === "Escape") setNav(false);
  });

  /* ---------- Animaciones (GSAP + ScrollTrigger, con respaldo) ---------- */
  const REVEAL = ".section__head, .feature, .service, .card, .datacard, .event, .partner, .highlights li, .timeline li, .quote, .mv, .values li, .bag, .steps li, .table-wrap, .place, .docs li, .gallery button, .info-list, .trust, .band__inner > *";
  // Las animaciones van siempre activas (decisión de la clienta). ?motion=0 las apaga solo para pruebas.
  const reduced = /[?&]motion=0/.test(location.search);
  const header = $(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Escenas hechas con Remotion (código en motion/, compilado en assets/js/motion.js).
  // Si el archivo no carga, se quedan el logo y el símbolo de reciclaje estáticos.
  const motion = !reduced && window.MCMotion;
  const heroBox = $(".hero__motion");
  const hero = motion && heroBox ? motion.mount(heroBox, "hero", { logoSrc: $(".hero__logo img").getAttribute("src") }) : null;
  if (hero) {
    heroBox.parentElement.classList.add("has-motion");
    // pausar cuando el inicio no está en pantalla, para no gastar batería
    new IntersectionObserver(([en]) => (en.isIntersecting ? hero.play() : hero.pause())).observe(heroBox);
  }

  if (window.gsap && window.ScrollTrigger && !reduced) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.ticker.lagSmoothing(0); // que las animaciones terminen a tiempo aunque haya frames lentos al cargar

    // Título del inicio palabra por palabra
    const h1 = $(".hero h1");
    if (h1 && !h1.dataset.split) {
      h1.dataset.split = "1";
      h1.innerHTML = h1.textContent.trim().split(/\s+/).map((w) => `<span class="w">${esc(w)}</span>`).join(" ");
      h1.style.animation = "none";
      gsap.from(".hero h1 .w", { yPercent: 110, opacity: 0, rotateX: -40, duration: .9, stagger: .07, ease: "power4.out", delay: .15 });
    }

    // Barra de progreso de lectura
    const bar = $("#progressBar");
    if (bar) gsap.to(bar, { width: "100%", ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: .3 } });

    // Línea de tiempo que se dibuja al hacer scroll
    const tl = $(".timeline");
    if (tl) gsap.fromTo(tl, { "--draw": 0 }, { "--draw": 1, ease: "none", scrollTrigger: { trigger: tl, start: "top 80%", end: "bottom 60%", scrub: .5 } });

    // Inclinación 3D en tarjetas
    const tiltable = $$(".service, .feature, .mv, .event, .partner");
    tiltable.forEach((card) => {
      card.classList.add("tilt");
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        gsap.to(card, { rotateY: x * 10, rotateX: -y * 10, y: -6, duration: .4, ease: "power2.out", transformPerspective: 900, overwrite: "auto" });
      });
      card.addEventListener("pointerleave", () => gsap.to(card, { rotateY: 0, rotateX: 0, y: 0, duration: .6, ease: "power3.out", overwrite: "auto" }));
    });

    // Materiales: entrada con escala al filtrar
    document.addEventListener("materials:rendered", () => gsap.from(".material", { scale: .85, opacity: 0, y: 14, duration: .5, stagger: .04, ease: "back.out(1.6)", clearProps: "all" }));

    // Texto que se revela palabra por palabra a medida que se baja (ligado al scroll)
    $$(".section__head h2, .section__head .section__lead, .about__lead, .band h2, .band p").forEach((el) => {
      if (el.dataset.split || el.closest(".tab-panel:not(.is-active)")) return;
      el.dataset.split = "1";
      el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="sw">${esc(w)}</span>`).join(" ");
      gsap.fromTo($$(".sw", el), { opacity: .12, y: 6 }, { opacity: 1, y: 0, stagger: .04, ease: "none",
        scrollTrigger: { trigger: el, start: "top 88%", end: "top 45%", scrub: .4 } });
    });

    // Escena "Cómo funciona": película de Remotion en tres actos que avanza con el scroll y enciende cada paso
    const scene = $("#proceso .process__grid");
    const procBox = $(".assemble__motion");
    const proc = motion && scene && procBox ? motion.mount(procBox, "proceso") : null;
    if (proc) {
      procBox.parentElement.classList.add("has-motion");
      const steps = $$("#proceso .steps li"), pin = window.innerWidth >= 1024, st = { p: 0 };
      gsap.to(st, { p: 1, ease: "none",
        // en móvil no se fija: la película corre mientras su recuadro cruza la pantalla
        scrollTrigger: pin ? { trigger: "#proceso", start: "top top", end: "+=2400", scrub: .6, pin: true, anticipatePin: 1 } : { trigger: procBox, start: "top 90%", end: "bottom 35%", scrub: .6 },
        onUpdate: () => { proc.seek(st.p); steps.forEach((s, i) => s.classList.toggle("is-on", st.p >= i / 3 + .02)); } });
    } else if (scene) {
      // Respaldo: el símbolo de reciclaje se arma flecha por flecha
      const arcs = $$(".recycle-draw .arc"), heads = $$(".recycle-draw .head"), steps = $$("#proceso .steps li");
      arcs.forEach((a) => { const L = a.getTotalLength(); a.style.strokeDasharray = L; a.style.strokeDashoffset = L; });
      const pin = window.innerWidth >= 1024;
      const tlScene = gsap.timeline({ scrollTrigger: { trigger: "#proceso", start: pin ? "top top" : "top 75%", end: pin ? "+=1600" : "bottom 40%", scrub: .6, pin, anticipatePin: 1 } });
      arcs.forEach((a, i) => {
        tlScene.to(a, { strokeDashoffset: 0, duration: 1, ease: "none" }, i * 1.3)
               .to(heads[i], { opacity: 1, scale: 1, duration: .25, ease: "back.out(2)" }, i * 1.3 + .95);
      });
      tlScene.to(".recycle-draw .core-text", { opacity: 1, duration: .4 }, arcs.length * 1.3)
             .to(".recycle-draw", { rotate: 360, duration: 1.2, ease: "power1.inOut", transformOrigin: "50% 50%" }, arcs.length * 1.3);
      // al retroceder, los pasos se apagan en orden inverso
      tlScene.eventCallback("onUpdate", () => { const p = tlScene.progress() * (arcs.length * 1.3 + 1.6); steps.forEach((s, i) => s.classList.toggle("is-on", p >= i * 1.3 + .6)); });
    }

    // Encabezados de sección marcan visible (línea del kicker) y pasos (línea conectora)
    const marks = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); marks.unobserve(en.target); } }), { threshold: .3 });
    $$(".section__head, .steps").forEach((el) => marks.observe(el));

    // Parallax suave en fondos fotográficos
    $$(".bg img").forEach((img) => {
      gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: img.closest("section"), start: "top bottom", end: "bottom top", scrub: .6 } });
    });

    // Aparición escalonada (IntersectionObserver dispara; GSAP anima)
    const items = $$(REVEAL).filter((el) => !el.closest(".hero") && !el.closest(".process__grid"));
    gsap.set(items, { y: 26, opacity: 0 });
    const show = (els) => gsap.to(els, { y: 0, opacity: 1, duration: .8, stagger: .09, ease: "power3.out", overwrite: true });
    let pending = [], flush = 0;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { pending.push(en.target); io.unobserve(en.target); } });
      cancelAnimationFrame(flush);
      flush = requestAnimationFrame(() => { if (pending.length) { show(pending); pending = []; } });
    }, { threshold: .1, rootMargin: "0px 0px -8% 0px" });
    items.forEach((el) => io.observe(el));
    // Paneles de pestañas ocultos: mostrarlos al activarse
    document.addEventListener("tab:activated", (e) => { const els = $$(REVEAL, e.detail); els.forEach((el) => io.unobserve(el)); show(els); });
    ScrollTrigger.refresh();
  } else {
    // Respaldo sin GSAP: IntersectionObserver
    const groups = new Map();
    $$(REVEAL).forEach((el) => {
      el.classList.add("reveal");
      const parent = el.parentElement, i = (groups.get(parent) || 0);
      groups.set(parent, i + 1);
      el.style.setProperty("--d", `${Math.min(i, 5) * 0.08}s`);
    });
    const revealer = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-visible"); revealer.unobserve(en.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal").forEach((el) => revealer.observe(el));
  }

  $("#year").textContent = new Date().getFullYear();
})();
