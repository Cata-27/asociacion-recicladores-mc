/* ===== Asociación de Recicladores MC E.S.P. — lógica del sitio ===== */
(function () {
  "use strict";

  const WA_NUMBER = "573203023519";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Datos ---------- */
  const MATERIALS = [
    { cat: "metal", emoji: "🔩", name: "Chatarra / hierro", desc: "Varillas, láminas, tubería, estructuras, electrodomésticos sin refrigerante." },
    { cat: "metal", emoji: "🥫", name: "Aluminio", desc: "Latas de bebida, perfiles, ollas, marcos de ventana." },
    { cat: "metal", emoji: "🔌", name: "Cobre y bronce", desc: "Cables (pelados o con forro), tubería, motores, grifería." },
    { cat: "metal", emoji: "🔋", name: "Baterías de plomo", desc: "Baterías de carro y moto. Entrégalas cerradas y sin derrames." },
    { cat: "papel", emoji: "📦", name: "Cartón", desc: "Cajas y corrugado, desarmado y seco. Sin cintas ni grasa." },
    { cat: "papel", emoji: "📄", name: "Papel archivo", desc: "Hojas de oficina, cuadernos, sobres. Sin plastificar." },
    { cat: "papel", emoji: "📰", name: "Periódico y revistas", desc: "Prensa, revistas, plegables y directorios." },
    { cat: "plastico", emoji: "🧴", name: "PET (botellas)", desc: "Botellas de gaseosa y agua, sin líquido y aplastadas." },
    { cat: "plastico", emoji: "🪣", name: "Plástico duro (PEAD/PP)", desc: "Envases de aseo, canastas, baldes, sillas, tapas." },
    { cat: "plastico", emoji: "🛍️", name: "Plástico flexible", desc: "Bolsas, empaques y stretch film limpios y secos." },
    { cat: "vidrio", emoji: "🍾", name: "Vidrio", desc: "Botellas y frascos enteros, sin tapa. No: espejos ni bombillos." },
    { cat: "vidrio", emoji: "💻", name: "RAEE (electrónicos)", desc: "Computadores, celulares, cables. Coordinamos recolección especial." },
  ];

  const ROUTES = [
    { r: "MC-01", sector: "Comuna 1 · Centro", barrios: ["Centro", "Colombia", "Cardales", "Buenos Aires", "Palmira", "Isla del Zapato"], dias: ["Lunes", "Jueves"], franja: "7:00 – 11:00 a.m." },
    { r: "MC-02", sector: "Comuna 2 · Nororiente", barrios: ["Galán", "Primero de Mayo", "El Cerro", "Uribe Uribe", "Villarelys", "Torcoroma"], dias: ["Martes", "Viernes"], franja: "7:00 – 11:00 a.m." },
    { r: "MC-03", sector: "Comuna 3 · Sur", barrios: ["Antonio Nariño", "Rafael Rangel", "Recreo", "La Libertad", "Villa Olímpica", "Las Granjas"], dias: ["Lunes", "Jueves"], franja: "1:00 – 5:00 p.m." },
    { r: "MC-04", sector: "Comuna 4 · Suroriente", barrios: ["El Castillo", "La Península", "Las Colmenas", "Cincuentenario", "Los Nogales", "Villa Sandra"], dias: ["Miércoles", "Sábado"], franja: "7:00 – 11:00 a.m." },
    { r: "MC-05", sector: "Comuna 5 · Oriente", barrios: ["Bosques de la Cira", "La Esperanza", "Los Lirios", "Chico", "Kennedy", "Altos del Campestre"], dias: ["Martes", "Viernes"], franja: "1:00 – 5:00 p.m." },
    { r: "MC-06", sector: "Comuna 6 · Nororiente", barrios: ["Las Playas", "Los Pinos", "20 de Agosto", "Boston", "El Progreso", "Ciudadela Pipatón"], dias: ["Miércoles", "Sábado"], franja: "1:00 – 5:00 p.m." },
    { r: "MC-07", sector: "Comuna 7 · Norte", barrios: ["Villa Rosa", "Minas del Paraíso", "María Eugenia", "El Poblado", "Provivienda", "22 de Marzo"], dias: ["Lunes", "Jueves"], franja: "7:00 – 11:00 a.m." },
    { r: "MC-08", sector: "Zona industrial y comercial", barrios: ["San Silvestre", "Zona Industrial", "Pozo Siete", "Terminal", "Plaza de Mercado"], dias: ["Lunes", "Miércoles", "Viernes"], franja: "8:00 a.m. – 12:00 m." },
  ];

  const GALLERY = [
    { src: "assets/img/gal-1.svg", alt: "Recolección puerta a puerta", cap: "Recolección puerta a puerta en Barrancabermeja" },
    { src: "assets/img/gal-2.svg", alt: "Pesaje de chatarra", cap: "Pesaje y clasificación de chatarra en la ECA" },
    { src: "assets/img/gal-3.svg", alt: "Campaña educativa", cap: "Campaña educativa de separación en la fuente" },
    { src: "assets/img/gal-4.svg", alt: "Aluminio compactado", cap: "Aluminio compactado listo para comercializar" },
    { src: "assets/img/gal-5.svg", alt: "Gran Reciclatón", cap: "Gran Reciclatón junto a Veolia y C.C. San Silvestre" },
    { src: "assets/img/gal-6.svg", alt: "Nuestro equipo", cap: "Nuestros asociados: recicladores de oficio" },
  ];

  /* ---------- Utilidades ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

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
  function openModal(html) {
    $("#modalBody").innerHTML = html;
    $("#modal").hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeModal() { $("#modal").hidden = true; document.body.style.overflow = ""; }
  $(".modal__close").addEventListener("click", closeModal);
  $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });

  /* ---------- Navegación ---------- */
  const nav = $("#nav"), toggle = $(".nav-toggle");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$(".dropdown-toggle").forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    const li = b.parentElement;
    const open = li.classList.toggle("open");
    b.setAttribute("aria-expanded", open);
  }));
  document.addEventListener("click", () => $$(".has-dropdown.open").forEach((li) => li.classList.remove("open")));
  $$(".nav a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
    if (a.dataset.tab) activateTab(a.dataset.tab);
  }));

  // Resaltar enlace activo al hacer scroll
  const sections = $$("main section[id]");
  const navLinks = $$(".nav > ul > li > a[href^='#']");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => spy.observe(s));

  /* ---------- Tabs institucional ---------- */
  function activateTab(id) {
    $$(".tab").forEach((t) => t.classList.toggle("is-active", t.dataset.tab === id));
    $$(".tab-panel").forEach((p) => p.classList.toggle("is-active", p.id === "tab-" + id));
  }
  $$(".tab").forEach((t) => t.addEventListener("click", () => activateTab(t.dataset.tab)));

  /* ---------- Materiales ---------- */
  const grid = $("#materialsGrid");
  function renderMaterials(filter) {
    grid.innerHTML = MATERIALS.filter((m) => filter === "todos" || m.cat === filter)
      .map((m) => `<article class="material" data-cat="${m.cat}"><div class="emoji">${m.emoji}</div><h4>${esc(m.name)}</h4><p>${esc(m.desc)}</p></article>`).join("");
  }
  renderMaterials("todos");
  $$(".chip").forEach((c) => c.addEventListener("click", () => {
    $$(".chip").forEach((x) => x.classList.remove("is-active"));
    c.classList.add("is-active");
    renderMaterials(c.dataset.filter);
  }));

  /* ---------- Solicitud de recolección ---------- */
  $("#pickupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (!validate(f)) return setMsg(f, "Por favor completa los campos marcados.", "err");
    const d = Object.fromEntries(new FormData(f));
    const mats = $$("input[name=mat]:checked", f).map((c) => c.value).join(", ") || "No especificado";
    const text = `*SOLICITUD DE RECOLECCIÓN — Recicladores MC*\n\n👤 Nombre: ${d.nombre}\n📞 Teléfono: ${d.telefono}\n🏠 Tipo: ${d.tipo}\n📍 Barrio: ${d.barrio}\n🗺️ Dirección: ${d.direccion}\n♻️ Materiales: ${mats}\n📝 Observaciones: ${d.obs || "-"}`;
    window.open(waLink(text), "_blank", "noopener");
    setMsg(f, "✅ Abrimos WhatsApp con tu solicitud. ¡Gracias por reciclar!", "ok");
    f.reset();
  });

  /* ---------- Contacto ---------- */
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (!validate(f)) return setMsg(f, "Por favor completa los campos marcados.", "err");
    const d = Object.fromEntries(new FormData(f));
    const text = `*MENSAJE DESDE LA WEB — Recicladores MC*\n\n👤 ${d.nombre}\n📞 ${d.telefono}\n✉️ ${d.correo || "-"}\n📌 Asunto: ${d.asunto}\n\n${d.mensaje}`;
    window.open(waLink(text), "_blank", "noopener");
    setMsg(f, "✅ Mensaje listo en WhatsApp. Te responderemos pronto.", "ok");
    f.reset();
  });

  /* ---------- Factura ---------- */
  $("#billForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (!validate(f)) return setMsg(f, "Ingresa tu número de cuenta.", "err");
    const cuenta = f.cuenta.value.trim();
    window.open(waLink(`Hola, quiero consultar el estado de mi factura de aprovechamiento. Cuenta/contrato: ${cuenta}`), "_blank", "noopener");
    setMsg(f, "✅ Consulta enviada por WhatsApp.", "ok");
  });

  /* ---------- PQRS ---------- */
  const STORE_KEY = "mc_pqrs";
  const loadPqrs = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch { return []; } };
  const savePqrs = (list) => { try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); } catch {} };
  const fmtDate = (iso) => new Date(iso).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });

  function newRadicado() {
    const y = new Date().getFullYear();
    const n = String(Math.floor(Math.random() * 900000) + 100000);
    return `MC-${y}-${n}`;
  }
  function showTrack(rad) {
    const p = loadPqrs().find((x) => x.radicado === rad.trim().toUpperCase());
    const box = $("#trackResult");
    if (!p) { box.innerHTML = `<div class="track__card">❌ No encontramos el radicado <strong>${esc(rad)}</strong>. Verifica el número o escríbenos por WhatsApp.</div>`; return; }
    const limite = new Date(p.fecha); limite.setDate(limite.getDate() + 21);
    box.innerHTML = `<div class="track__card"><strong>${p.radicado}</strong> <span class="status">${esc(p.estado)}</span><br>
      <strong>Tipo:</strong> ${esc(p.tipo)} · <strong>Radicado:</strong> ${fmtDate(p.fecha)}<br>
      <strong>Respuesta máxima:</strong> ${fmtDate(limite)}<br><em>${esc(p.descripcion.slice(0, 120))}${p.descripcion.length > 120 ? "…" : ""}</em></div>`;
  }
  $("#pqrsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (!validate(f)) return setMsg(f, "Completa los campos obligatorios y acepta el tratamiento de datos.", "err");
    const d = Object.fromEntries(new FormData(f));
    const p = { radicado: newRadicado(), fecha: new Date().toISOString(), estado: "Radicada", ...d };
    savePqrs([p, ...loadPqrs()]);
    setMsg(f, "", "");
    f.reset();
    const text = `*PQRS ${p.radicado}*\nTipo: ${p.tipo}\nNombre: ${p.nombre}\nDocumento: ${p.documento}\nTel: ${p.telefono}\nCorreo: ${p.correo || "-"}\nDirección: ${p.direccion || "-"}\n\n${p.descripcion}`;
    openModal(`<h3>✅ PQRS radicada</h3><p>Guarda tu número de radicado para hacer seguimiento:</p><div class="radicado">${p.radicado}</div>
      <p class="muted small">Tendrás respuesta en máximo 15 días hábiles.</p>
      <div class="modal__actions"><a class="btn btn--primary" target="_blank" rel="noopener" href="${waLink(text)}">Enviar copia por WhatsApp</a><button class="btn btn--ghost" id="modalOk">Entendido</button></div>`);
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
      return `<tr><td><span class="route-tag">${r.r}</span></td><td>${esc(r.sector)}</td><td>${barrios}</td><td>${r.dias.join(" y ")}</td><td>${r.franja}</td></tr>`;
    }).join("");
    $("#routesEmpty").hidden = rows.length > 0;
  }
  search.addEventListener("input", renderRoutes);
  daySel.addEventListener("change", renderRoutes);
  renderRoutes();

  /* ---------- Galería + lightbox ---------- */
  const gal = $("#gallery");
  gal.innerHTML = GALLERY.map((g, i) => `<button data-i="${i}" aria-label="Ampliar: ${esc(g.cap)}"><img src="${g.src}" alt="${esc(g.alt)}" loading="lazy" /><span>${esc(g.cap)}</span></button>`).join("");
  const lb = $("#lightbox"); let cur = 0;
  function showLb(i) {
    cur = (i + GALLERY.length) % GALLERY.length;
    $("img", lb).src = GALLERY[cur].src; $("img", lb).alt = GALLERY[cur].alt;
    $("figcaption", lb).textContent = GALLERY[cur].cap;
    lb.hidden = false; document.body.style.overflow = "hidden";
  }
  function hideLb() { lb.hidden = true; document.body.style.overflow = ""; }
  $$("button", gal).forEach((b) => b.addEventListener("click", () => showLb(+b.dataset.i)));
  $(".lightbox__close").addEventListener("click", hideLb);
  $(".lightbox__nav.prev").addEventListener("click", () => showLb(cur - 1));
  $(".lightbox__nav.next").addEventListener("click", () => showLb(cur + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) hideLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.hidden) { if (e.key === "Escape") hideLb(); if (e.key === "ArrowLeft") showLb(cur - 1); if (e.key === "ArrowRight") showLb(cur + 1); }
    if (!$("#modal").hidden && e.key === "Escape") closeModal();
  });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } }), { threshold: .12 });
  $$(".reveal").forEach((el) => io.observe(el));

  $("#year").textContent = new Date().getFullYear();
})();
