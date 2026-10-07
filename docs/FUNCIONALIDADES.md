# Funcionalidades del sitio y cómo funcionan

> Inventario técnico de todo lo que hace la página, cómo está implementado y qué falta para producción. Actualizar cada vez que se agregue o cambie una funcionalidad.

## Stack

- **HTML + CSS + JavaScript puro.** Sin frameworks, sin build, sin dependencias de npm. Se abre directamente o con cualquier servidor estático.
- Archivos: `index.html` (estructura y contenido), `styles.css` (diseño), `app.js` (comportamiento), `assets/` (imágenes y PDFs).
- Fuentes: Google Fonts (Manrope), cargada por CDN.
- Íconos: SVG en línea (sprite `<symbol>` al inicio de `index.html`). No se usan emojis ni librerías de íconos.
- Marca: logotipo oficial en alta resolución (`assets/img/logo-hd.webp`, 640 px, fondo transparente). Fuente: `docs/referencias/logo-hd-fuente.jpg`, al que se le eliminó el fondo de cuadros. Se usa en cabecera, inicio y pie. Si llega una versión vectorial (SVG), reemplazar ese archivo.
- Hosting: **Vercel** (URL para la clienta) y GitHub Pages (respaldo). Ambos se actualizan solos al hacer push a `main`.

## Funcionalidades

| # | Funcionalidad | Dónde | Cómo funciona | Estado |
|---|---|---|---|---|
| 1 | Menú responsive con dropdown "Nosotros" | `index.html` header · `app.js` "Navegación" | Mobile-first: en móvil/tablet (<1024 px) es un panel lateral con botón hamburguesa, fondo oscurecido, cierre con Esc o tocando fuera. En escritorio el dropdown abre al pasar el mouse. El enlace activo se resalta según la sección visible. | ✅ |
| 2 | Pestañas Nosotros (Quiénes somos, Reseña, Misión y visión, Valores) | `#nosotros` · `app.js` "Pestañas Nosotros" | Barra de pestañas con indicador deslizante; cada panel entra con animación. Quiénes somos: texto + destacados con íconos + ficha institucional. Reseña: línea de tiempo + cita. Misión y visión: tarjetas con degradado. Valores: rejilla de 6 tarjetas con hover. Los enlaces del menú activan la pestaña correspondiente. | ✅ textos por validar |
| 3 | Servicios (6 tarjetas) | `#servicios` | Contenido estático. | ✅ |
| 4 | Materiales filtrables | `#materiales` · `app.js` `MATERIALS` | Lista de 12 materiales en un arreglo JS; los chips filtran por categoría (metal, papel, plástico, vidrio/otros). Para agregar un material: añadir un objeto al arreglo `MATERIALS`. | ✅ lista por validar |
| 5 | Guía de bolsas (blanca/negra/verde) | `#materiales` | Estático, según Resolución 2184 de 2019. | ✅ |
| 6 | Cómo vender (3 pasos) | `#proceso` | Estático + botón a WhatsApp. | ✅ |
| 7 | Solicitar recolección | `#solicitar` · `app.js` "Solicitud de recolección" | Formulario con validación en el navegador. Al enviar, arma un mensaje con los datos y abre WhatsApp (`wa.me/573203023519`) con el texto listo. **No guarda nada en servidor.** | ✅ (MVP) |
| 8 | Documentos descargables | `#documentacion` · `assets/docs/*.pdf` | Enlaces directos a PDFs. Reemplazar los archivos manteniendo el mismo nombre y no hay que tocar código. | ⚠️ PDFs de muestra |
| 9 | Sede con mapa | `#ecas` | Google Maps embebido (iframe gratuito, sin API key) + botón "Cómo llegar". | ✅ horario por confirmar |
| 10 | Rutas de recolección con buscador | `#rutas` · `app.js` `ROUTES` | Tabla generada desde el arreglo `ROUTES`. Buscador por barrio (ignora tildes) y filtro por día. En móvil cada fila se muestra como tarjeta (CSS `data-label`). Para editar rutas: modificar el arreglo. | ⚠️ datos inventados |
| 11 | Galería con lightbox | `#galeria` · `app.js` `GALLERY` | Cuadrícula generada desde el arreglo `GALLERY`; clic abre visor a pantalla completa con flechas y teclado (←, →, Esc). | ⚠️ ilustraciones |
| 12 | Contacto | `#contacto` | Formulario → WhatsApp, igual que el #7. | ✅ falta correo |
| 13 | Pague su factura | `#factura` | Explicación de cómo se cobra el aprovechamiento + consulta de cuenta por WhatsApp. | ⚠️ sin pasarela |
| 14 | PQRS con radicado | `#pqrs` · `app.js` "PQRS" | Al radicar, genera un número `MC-AAAA-NNNNNN`, lo muestra en un modal y ofrece enviar copia por WhatsApp. El radicado se guarda en el `localStorage` del navegador del usuario (solo él puede consultarlo desde ese mismo equipo). | ⚠️ sin backend |
| 15 | Botón flotante de WhatsApp | global | Enlace `wa.me` con mensaje predefinido. | ✅ |
| 16 | Animaciones | `styles.css` keyframes · `app.js` "Animaciones" · GSAP 3.12 + ScrollTrigger (cdnjs) | Entrada del inicio en CSS puro (título, texto, botones, logo, franja de confianza). Con GSAP: parallax suave en los fondos fotográficos y aparición escalonada de tarjetas y bloques (IntersectionObserver dispara, GSAP anima). Si GSAP no carga o el usuario pide "reducir movimiento", hay respaldo con IntersectionObserver + CSS. `?motion=1` en la URL fuerza las animaciones para pruebas. | ✅ |
| 17 | Fondos fotográficos | `.bg` en inicio, "Cómo funciona" y banda Empresas · `assets/img/bg-*.webp` | Imágenes generadas con IA (Higgsfield, gpt-image) en paleta azul/verde, sin personas identificables ni texto. Dos tamaños por imagen (`-sm` 960 px para móvil, 1920 px escritorio) vía `srcset`; capa oscura degradada encima para legibilidad. Reemplazables por fotos reales de la asociación con el mismo nombre + versión. | ✅ (IA, sustituir por fotos reales) |
| 18 | Banda Empresas e instituciones | `#empresas` | Llamado a la acción para clientes corporativos (certificados, plan de manejo) con enlace a Contacto. | ✅ |
| 19 | SEO básico | `<head>` | Título, descripción, Open Graph, favicon, `theme-color`. | ✅ |

## Cómo editar contenido sin saber programar

| Quiero cambiar… | Dónde |
|---|---|
| Teléfono / WhatsApp | Buscar `573203023519` en `index.html` y `app.js` (constante `WA_NUMBER`) |
| Dirección, NIT, textos | `index.html`, buscar el texto |
| Materiales | `app.js` → arreglo `MATERIALS` |
| Rutas | `app.js` → arreglo `ROUTES` |
| Fotos de galería | Subir a `assets/img/` y actualizar `app.js` → arreglo `GALLERY` (hoy hay marcadores neutros `gal-*.svg`) |
| Logotipo | Reemplazar `assets/img/logo-hd.webp` (cuadrado, fondo transparente) y `assets/img/favicon-hd.png`. **Importante:** los assets se sirven con caché de 7 días; al cambiar una imagen, cambiar también su nombre de archivo (ej. `logo-v3.webp`) para que los navegadores descarguen la nueva. |
| PDFs | Reemplazar en `assets/docs/` con el mismo nombre |
| Colores | `styles.css` → variables al inicio (`:root`) |

## Manejo de espacio y archivos pesados

GitHub recomienda repos < 1 GB y archivos < 50 MB; Vercel sirve estáticos sin problema hasta ~100 MB por deploy en plan gratuito. Reglas para no llenarlo:

1. **Fotos**: comprimir antes de subir. Máximo ~1600 px de ancho y < 300 KB cada una. Formato **WebP** o JPG. Herramientas gratis: [squoosh.app](https://squoosh.app) o [tinypng.com](https://tinypng.com).
2. **PDFs**: < 5 MB cada uno. Si un documento pesa más, comprimirlo (ej. [ilovepdf.com/compress](https://www.ilovepdf.com/compress_pdf)).
3. **Videos**: **nunca al repo.** Subirlos a YouTube (como "no listado") y embeber el iframe.
4. **Muchas fotos** (más de ~50): usar un servicio de imágenes gratuito (Cloudinary, plan gratis 25 GB) y enlazarlas por URL en `GALLERY`.
5. Nombres de archivo sin espacios ni tildes: `sede-bascula.webp`, no `Foto Báscula.JPG`.

## Pendientes para producción (orden sugerido)

1. Reemplazar datos provisionales (rutas, textos de Nosotros, horario, PDFs, fotos) → ver `docs/INFORMACION-EMPRESA.md`.
2. Formularios: pasar de "abrir WhatsApp" a envío real por correo. Opción gratis sin backend: **Formspree** o **Web3Forms** (se agrega un `action` al formulario). Las PQRS podrían ir a una hoja de Google Sheets con **Google Apps Script**.
3. Correo institucional y redes sociales en el pie de página.
4. Pasarela de pago (PSE) — requiere convenio con Wompi/PayU/ePayco a nombre de la asociación.
5. Dominio `.com.co` conectado a Vercel (ver `docs/DESPLIEGUE.md`).
6. Google Analytics o similar, si quieren medir visitas.
